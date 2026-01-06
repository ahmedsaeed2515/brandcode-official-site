import { Navbar } from '@/components/UI/Navbar';
import { Hero } from '@/components/Hero/Hero';
import { ServicesSection } from '@/components/Sections/ServicesSection';
import { CaseStudiesSection } from '@/components/Sections/CaseStudiesSection';
import { WhyUsSection } from '@/components/Sections/WhyUsSection';
import { AboutSection } from '@/components/Sections/AboutSection';
import { ContactSection } from '@/components/Sections/ContactSection';
import { Footer } from '@/components/Sections/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <Hero />
        <ServicesSection />
        <CaseStudiesSection />
        <WhyUsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
