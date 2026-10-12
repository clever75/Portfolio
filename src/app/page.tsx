import Hero from "@/components/Hero";
import About from "@/components/About";
import Projets from "@/components/Projets";
import Competences from "@/components/Competences";
import Parcours from "@/components/Parcours";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projets />
      <Competences />
      <Parcours />
      <Contact />
    </main>
  );
}