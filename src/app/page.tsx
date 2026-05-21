import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Portfolio } from "@/components/sections/Portfolio";
import { Team } from "@/components/sections/Team";
import { Larkins } from "@/components/sections/Larkins";
import { Freelancers } from "@/components/sections/Freelancers";

/**
 * Lark Freelance — home.
 * Section order follows the master brief:
 * Hero → Кто мы → Услуги → Процесс → Портфолио → Команда → Larkins → Фрилансеры.
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="hairline shell" />
        <About />
        <Services />
        <Process />
        <Portfolio />
        <Team />
        <Larkins />
        <Freelancers />
      </main>
      <Footer />
    </>
  );
}
