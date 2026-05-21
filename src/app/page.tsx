import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Portfolio } from "@/components/sections/Portfolio";
import { Team } from "@/components/sections/Team";
import { Larkins } from "@/components/sections/Larkins";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Freelancers } from "@/components/sections/Freelancers";

/**
 * Lark Freelance — home.
 * Flow is built for conversion: value → proof → objections → contact.
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Portfolio />
        <Team />
        <Larkins />
        <FAQ />
        <Contact />
        <Freelancers />
      </main>
      <Footer />
    </>
  );
}
