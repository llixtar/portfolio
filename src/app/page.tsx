import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import DigitalRain from "@/components/DigitalRain";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505] overflow-x-hidden">
      {/* Глобальний фоновий цифровий дощ по всьому сайту */}
      <DigitalRain />

      <Hero />
      <Projects />
      {/* Наступні блоки (Послуги, Про мене, Контакти) додамо далі */}
    </main>
  );
}
