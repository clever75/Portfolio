import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// === Rate limiting en mémoire (simple, pour un seul serveur) ===
const rateLimit = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_MAX = 3; // 3 messages max
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // par heure (en ms)

function checkRateLimit(ip: string): { ok: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return { ok: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { ok: false, remaining: 0 };
  }

  record.count++;
  return { ok: true, remaining: RATE_LIMIT_MAX - record.count };
}

// === Vérification Turnstile ===
async function verifyTurnstile(token: string): Promise<boolean> {
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
      }
    );

    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verify error:", err);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nom, email, sujet, message, clever_hp_check, turnstileToken } = body;

    // === 1. Honeypot (champ caché) ===
    if (clever_hp_check) {
      console.warn("Bot détecté (honeypot)");
      return NextResponse.json({ success: true });
    }

    // === 2. Rate limiting par IP ===
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const { ok: rateOk, remaining } = checkRateLimit(ip);
    if (!rateOk) {
      return NextResponse.json(
        { error: "Trop de messages envoyés. Réessayez dans une heure." },
        { status: 429 }
      );
    }

    // === 3. Validation des champs ===
    if (!nom || !email || !message) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants." },
        { status: 400 }
      );
    }

    if (
      nom.length > 100 ||
      email.length > 200 ||
      (sujet && sujet.length > 200)
    ) {
      return NextResponse.json(
        { error: "Un champ est trop long." },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Le message est trop long (5000 caractères max)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }

    // === 4. Vérification Turnstile ===
    if (!turnstileToken) {
      return NextResponse.json(
        { error: "Vérification anti-bot manquante." },
        { status: 400 }
      );
    }

    const turnstileOk = await verifyTurnstile(turnstileToken);
    if (!turnstileOk) {
      return NextResponse.json(
        { error: "Vérification anti-bot échouée." },
        { status: 400 }
      );
    }

    // === 5. Envoi via Resend ===
    const { data, error } = await resend.emails.send({
      from: "Portfolio Clever <onboarding@resend.dev>",
      to: ["cleverassan696@gmail.com"],
      replyTo: email,
      subject: sujet
        ? `[Portfolio] ${sujet}`
        : `[Portfolio] Nouveau message de ${nom}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Nouveau message depuis ton portfolio</h2>
          <p><strong>Nom :</strong> ${nom}</p>
          <p><strong>Email :</strong> ${email}</p>
          ${sujet ? `<p><strong>Sujet :</strong> ${sujet}</p>` : ""}
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p style="white-space: pre-wrap;">${message}</p>
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

    return NextResponse.json({
      success: true,
      id: data?.id,
      remaining,
    });
  } catch (err) {
    console.error("Erreur serveur:", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}