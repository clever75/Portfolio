import { Resend } from "resend";
import { NextResponse } from "next/server";

// ============================================================
// Limites de longueur (une seule source de vérité)
// ============================================================
const LIMITES = {
  nom: 100,
  email: 200,
  sujet: 200,
  message: 5000,
} as const;

// ============================================================
// Rate limiting en mémoire (simple, pour un seul serveur)
// ============================================================
const rateLimit = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_MAX = 3; // 3 messages max
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // par heure (en ms)

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  // Ménage : on retire les entrées expirées, sinon la Map grossit
  // indéfiniment (une entrée par visiteur, jamais supprimée).
  if (rateLimit.size > 500) {
    for (const [cle, enregistrement] of rateLimit) {
      if (now > enregistrement.resetAt) rateLimit.delete(cle);
    }
  }

  const record = rateLimit.get(ip);

  if (!record || now > record.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) return false;

  record.count++;
  return true;
}

// ============================================================
// Sécurité : échapper le HTML
// ============================================================
// Tout ce qui vient d'un visiteur est "non fiable". Avant de le placer
// dans du HTML, on remplace les caractères spéciaux par leur version
// "texte" : le navigateur (ou le client mail) les affiche au lieu de les
// interpréter comme des balises.
// ATTENTION à l'ordre : "&" doit être remplacé EN PREMIER, sinon on
// ré-échapperait les "&" créés par les autres remplacements.
function escapeHtml(valeur: string): string {
  return valeur
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ============================================================
// Vérification Turnstile (anti-bot Cloudflare)
// ============================================================
async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY manquante");
    return false;
  }

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, response: token }),
        // Sans délai maximum, une panne de Cloudflare bloquerait la requête.
        signal: AbortSignal.timeout(5000),
      }
    );

    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verify error:", err);
    return false;
  }
}

// ============================================================
// Route POST /api/contact
// ============================================================
export async function POST(request: Request) {
  try {
    // --- Lecture du corps : on ne fait confiance à rien ---
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
    }

    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
    }

    const data = body as Record<string, unknown>;

    // === 1. Honeypot (champ caché) ===
    // Le formulaire (Contact.tsx) envoie ce champ sous le nom "website".
    // Un humain ne le voit pas, donc il reste vide. Un bot qui remplit
    // tous les champs le remplit aussi. On répond "succès" pour ne pas
    // lui apprendre qu'il a été détecté.
    if (data.website) {
      console.warn("Bot détecté (honeypot)");
      return NextResponse.json({ success: true });
    }

    // === 2. Lecture + nettoyage des champs ===
    // JSON permet n'importe quel type (nombre, objet, tableau...). On
    // n'accepte que du texte, sinon on obtient une chaîne vide.
    const lireTexte = (valeur: unknown): string =>
      typeof valeur === "string" ? valeur.trim() : "";

    const nom = lireTexte(data.nom);
    const email = lireTexte(data.email);
    const sujet = lireTexte(data.sujet);
    const message = lireTexte(data.message);
    const turnstileToken = lireTexte(data.turnstileToken);

    // === 3. Validation des champs ===
    if (!nom || !email || !message) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants." },
        { status: 400 }
      );
    }

    if (
      nom.length > LIMITES.nom ||
      email.length > LIMITES.email ||
      sujet.length > LIMITES.sujet
    ) {
      return NextResponse.json(
        { error: "Un champ est trop long." },
        { status: 400 }
      );
    }

    if (message.length > LIMITES.message) {
      return NextResponse.json(
        { error: "Le message est trop long (5000 caractères max)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }

    // === 4. Configuration du serveur ===
    // Le client Resend est créé ICI, pas au chargement du fichier :
    // `new Resend(undefined)` lève une erreur immédiatement. Au niveau
    // du module, une variable d'environnement manquante ferait planter
    // tout le fichier avant même qu'une requête arrive.
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY manquante");
      return NextResponse.json(
        { error: "Le service d'envoi n'est pas configuré." },
        { status: 500 }
      );
    }

    // === 5. Rate limiting par IP ===
    // Placé APRÈS la validation : une faute de frappe du visiteur ne
    // consomme pas son quota, et AVANT les appels réseau (Turnstile,
    // Resend) qui sont les opérations coûteuses.
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Trop de messages envoyés. Réessayez dans une heure." },
        { status: 429 }
      );
    }

    // === 6. Vérification Turnstile ===
    if (!turnstileToken) {
      return NextResponse.json(
        { error: "Vérification anti-bot manquante." },
        { status: 400 }
      );
    }

    if (!(await verifyTurnstile(turnstileToken))) {
      return NextResponse.json(
        { error: "Vérification anti-bot échouée." },
        { status: 400 }
      );
    }

    // === 7. Envoi via Resend ===
    const resend = new Resend(apiKey);

    // Un retour à la ligne dans un objet d'e-mail n'a pas de sens :
    // on les remplace par un espace.
    const sujetPropre = sujet.replace(/[\r\n]+/g, " ");

    const { error } = await resend.emails.send({
      from: "Portfolio Clever <onboarding@resend.dev>",
      to: ["cleverassan696@gmail.com"],
      replyTo: email,
      subject: sujetPropre
        ? `[Portfolio] ${sujetPropre}`
        : `[Portfolio] Nouveau message de ${nom.replace(/[\r\n]+/g, " ")}`,
      // Chaque valeur venant du visiteur passe par escapeHtml.
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Nouveau message depuis ton portfolio</h2>
          <p><strong>Nom :</strong> ${escapeHtml(nom)}</p>
          <p><strong>Email :</strong> ${escapeHtml(email)}</p>
          ${sujet ? `<p><strong>Sujet :</strong> ${escapeHtml(sujet)}</p>` : ""}
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi." },
        { status: 500 }
      );
    }

    // On ne renvoie que le strict nécessaire (pas d'id interne ni de quota).
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur serveur:", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}