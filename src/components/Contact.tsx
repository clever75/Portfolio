"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  FileText,
  MapPin,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { contact, contactLinks } from "@/data/contact";

type FormState = "idle" | "loading" | "success" | "error";

const infosContact = [
  {
    icon: Mail,
    label: "Email",
    valeur: contact.email,
    href: contactLinks.email,
  },
  {
    icon: Phone,
    label: "Téléphone / WhatsApp",
    valeur: contact.telephoneAffiche,
    href: contactLinks.whatsapp,
    externe: true,
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    valeur: "clever-assan",
    href: contactLinks.linkedin,
    externe: true,
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    valeur: "clever75",
    href: contactLinks.github,
    externe: true,
  },
  {
    icon: FileText,
    label: "CV",
    valeur: "Télécharger le PDF",
    href: contact.cv,
    download: true,
  },
  {
    icon: MapPin,
    label: "Localisation",
    valeur: contact.localisation,
    href: null,
  },
];

export default function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!turnstileToken) {
      setErrorMsg("Veuillez patienter, vérification en cours…");
      setFormState("error");
      setTimeout(() => setFormState("idle"), 3000);
      return;
    }

    setFormState("loading");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const data = {
      nom: formData.get("nom"),
      email: formData.get("email"),
      sujet: formData.get("sujet"),
      message: formData.get("message"),
      website: formData.get("website"),
      turnstileToken,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Erreur d'envoi");

      setFormState("success");
      (e.target as HTMLFormElement).reset();
      turnstileRef.current?.reset();
      setTurnstileToken(null);
      setTimeout(() => setFormState("idle"), 6000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Erreur inconnue");
      setFormState("error");
      turnstileRef.current?.reset();
      setTurnstileToken(null);
      setTimeout(() => setFormState("idle"), 6000);
    }
  }

  return (
    <Section id="contact">
      <SectionTitle
        number="04"
        label="Contact"
        title="Travaillons ensemble"
        subtitle="Un projet à construire, une mission à confier ? Parlons-en — je réponds sous 48h."
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
        {/* === FORMULAIRE === */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="space-y-5 lg:col-span-3"
        >
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              width: "1px",
              height: "1px",
              opacity: 0,
            }}
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="nom"
                className="mb-2 block font-mono text-xs uppercase tracking-widest text-encre-douce"
              >
                Nom *
              </label>
              <input
                id="nom"
                name="nom"
                type="text"
                required
                maxLength={100}
                placeholder="Votre nom"
                className="w-full rounded-xl border border-trait bg-fond-doux px-4 py-3 text-encre placeholder:text-encre-douce/50 transition-colors focus:border-indigo focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-mono text-xs uppercase tracking-widest text-encre-douce"
              >
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={200}
                placeholder="votre@email.com"
                className="w-full rounded-xl border border-trait bg-fond-doux px-4 py-3 text-encre placeholder:text-encre-douce/50 transition-colors focus:border-indigo focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="sujet"
              className="mb-2 block font-mono text-xs uppercase tracking-widest text-encre-douce"
            >
              Sujet <span className="text-encre-douce/50">(optionnel)</span>
            </label>
            <input
              id="sujet"
              name="sujet"
              type="text"
              maxLength={200}
              placeholder="De quoi s'agit-il ?"
              className="w-full rounded-xl border border-trait bg-fond-doux px-4 py-3 text-encre placeholder:text-encre-douce/50 transition-colors focus:border-indigo focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block font-mono text-xs uppercase tracking-widest text-encre-douce"
            >
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              maxLength={5000}
              placeholder="Votre message…"
              className="w-full resize-none rounded-xl border border-trait bg-fond-doux px-4 py-3 text-encre placeholder:text-encre-douce/50 transition-colors focus:border-indigo focus:outline-none"
            />
          </div>

          <div className="flex justify-start">
            <Turnstile
              ref={turnstileRef}
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              options={{
                theme: "dark",
                size: "flexible",
                appearance: "interaction-only",
              }}
              onSuccess={(token) => setTurnstileToken(token)}
              onError={() => {
                setErrorMsg("Erreur de vérification anti-bot.");
                setFormState("error");
              }}
              onExpire={() => setTurnstileToken(null)}
            />
          </div>

          <button
            type="submit"
            disabled={formState === "loading" || !turnstileToken}
            className="group inline-flex items-center gap-2 rounded-full bg-indigo px-6 py-3 font-sous font-medium text-fond transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-fonce hover:shadow-lg hover:shadow-indigo/25 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {formState === "loading" ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Envoi en cours…
              </>
            ) : (
              <>
                <Send
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
                Envoyer le message
              </>
            )}
          </button>

          {/* Mention "écrivez-moi directement" */}
          <p className="text-xs text-encre-douce/70">
            Ou écrivez-moi directement :{" "}
            <a
              href={contactLinks.email}
              className="font-medium text-indigo underline-offset-4 transition hover:text-indigo-fonce hover:underline"
            >
              {contact.email}
            </a>
          </p>

          {/* Messages */}
          {formState === "success" && (
            <div className="flex items-center gap-2 rounded-xl border border-dispo/40 bg-dispo/10 px-4 py-3 text-sm text-dispo">
              <CheckCircle2 size={16} />
              Message envoyé ! Je vous réponds sous 48h.
            </div>
          )}
          {formState === "error" && (
            <div className="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <AlertCircle size={16} />
              {errorMsg || "Une erreur est survenue. Réessayez."}
            </div>
          )}
        </motion.form>

        {/* === TABLEAU INFOS === */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-2"
        >
          <div className="overflow-hidden rounded-2xl border border-trait bg-fond-doux">
            {infosContact.map((info, index) => {
              const Icon = info.icon;
              const isLast = index === infosContact.length - 1;

              const content = (
                <>
                  <div className="flex items-center gap-2">
                    <Icon size={14} className="text-indigo" aria-hidden="true" />
                    <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-encre-douce">
                      {info.label}
                    </span>
                  </div>
                  <span className="font-sous text-sm font-medium text-encre transition-colors group-hover:text-indigo">
                    {info.valeur}
                  </span>
                </>
              );

              const className = `
                group flex flex-col gap-2 px-5 py-5 transition-colors
                ${!isLast ? "border-b border-trait" : ""}
                ${info.href ? "hover:bg-violet-doux/50 cursor-pointer" : ""}
              `;

              if (info.href) {
                return (
                  <a
                    key={info.label}
                    href={info.href}
                    {...(info.externe
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    {...(info.download ? { download: "" } : {})}
                    className={className}
                  >
                    {content}
                  </a>
                );
              }

              return (
                <div key={info.label} className={className}>
                  {content}
                </div>
              );
            })}
          </div>

          {/* Disponibilité + Fuseau horaire */}
          <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-dispo/30 bg-dispo/5 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-dispo opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-dispo" />
              </span>
              <p className="font-sous text-sm font-medium text-encre">
                {contact.disponibilite}
              </p>
            </div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-encre-douce">
              Lomé • GMT+0
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}