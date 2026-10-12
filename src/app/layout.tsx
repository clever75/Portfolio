import type { Metadata } from "next";
import {
  Playfair_Display,
  Space_Grotesk,
  Geist,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Clever | Développeuse d'applications",
    template: "%s | Clever",
  },
  description:
    "Portfolio de Clever, développeuse d'applications basée à Lomé, Togo. Je conçois du code qui fonctionne, qui se lit, et qui se maintient.",
  keywords: [
    "développeuse",
    "développeur web",
    "Next.js",
    "React",
    "TypeScript",
    "Lomé",
    "Togo",
    "portfolio",
  ],
  authors: [{ name: "ASSAN Ablavi Clever" }],
  creator: "ASSAN Ablavi Clever",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Clever | Développeuse d'applications",
    description:
      "Portfolio de Clever, développeuse d'applications basée à Lomé, Togo.",
    siteName: "Clever",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clever | Développeuse d'applications",
    description:
      "Portfolio de Clever, développeuse d'applications basée à Lomé, Togo.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${spaceGrotesk.variable} ${geist.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-fond font-texte text-encre antialiased">
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}