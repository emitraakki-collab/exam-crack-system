import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileCTA from '@/components/layout/MobileCTA';
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import SolutionSection from '@/components/landing/SolutionSection';
import WhatsInsideSection from '@/components/landing/WhatsInsideSection';
import StrategyPreview from '@/components/landing/StrategyPreview';
import HowItWorks from '@/components/landing/HowItWorks';
import PricingSection from '@/components/landing/PricingSection';
import ForWhomSection from '@/components/landing/ForWhomSection';
import FAQSection from '@/components/landing/FAQSection';
import FinalCTA from '@/components/landing/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <WhatsInsideSection />
        <StrategyPreview />
        <HowItWorks />
        <PricingSection />
        <ForWhomSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
