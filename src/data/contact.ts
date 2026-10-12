export const contact = {
  nom: "ASSAN Ablavi Clever",
  email: "cleverassan696@gmail.com",
  whatsappAffiche: "+228 97 46 50 34",
  whatsappNumero: "22897465034",
  github: "https://github.com/clever75",
  linkedin: "https://www.linkedin.com/in/clever-assan-9b119233a",
  disponibilite: "Stage + missions freelance",
} as const;

export const contactLinks = {
  email: `mailto:${contact.email}`,
  whatsapp: `https://wa.me/${contact.whatsappNumero}`,
  github: contact.github,
  linkedin: contact.linkedin,
} as const;