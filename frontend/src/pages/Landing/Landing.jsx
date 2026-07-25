import { Features } from '../../components/Features/Features';
import { Footer } from '../../components/Footer/Footer';
import { Hero } from '../../components/Hero/Hero';
import { LeadForm } from '../../components/LeadForm/LeadForm';
import { Navbar } from '../../components/Navbar/Navbar';

export const Landing = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
};
