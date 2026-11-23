import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import WorkStages from "@/components/WorkStages";
import AboutMe from "@/components/AboutMe";
import Footer from "@/components/Footer";
import StickyTelegram from "@/components/StickyTelegram";
import DigitalRain from "@/components/DigitalRain";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505] overflow-x-hidden">
      {/* Глобальний фоновий цифровий дощ по всьому сайту */}
      <DigitalRain />

      {/* Головний екран */}
      <Hero />

      {/* Портфоліо проєктів */}
      <Projects />

      {/* Етапи роботи */}
      <WorkStages />

      {/* Блок "Про мене" */}
      <AboutMe />

      {/* Футер */}
      <Footer />

      {/* Стікі контакт-хаб (Telegram + WhatsApp + FAQ) */}
      <StickyTelegram />
    </main>
  );
}
