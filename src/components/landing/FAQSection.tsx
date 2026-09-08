import SectionWrapper from '@/components/ui/SectionWrapper';
import Accordion from '@/components/ui/Accordion';
import { FAQ_ITEMS } from '@/lib/constants';

export default function FAQSection() {
  return (
    <SectionWrapper className="bg-background" id="faq">
      <h2 className="section-heading">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-gray-500 font-hindi mb-10 max-w-2xl mx-auto">
        आपके सवालों के जवाब.
      </p>

      <div className="max-w-2xl mx-auto">
        <Accordion items={FAQ_ITEMS} />
      </div>
    </SectionWrapper>
  );
}
