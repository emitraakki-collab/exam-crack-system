import SectionWrapper from '@/components/ui/SectionWrapper';
import { FOR_WHOM } from '@/lib/constants';

export default function ForWhomSection() {
  return (
    <SectionWrapper className="bg-white">
      <h2 className="section-heading font-hindi">
        यह Ebook किन Students के लिए है?
      </h2>

      <div className="max-w-xl mx-auto mt-10 space-y-4">
        {FOR_WHOM.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-success/5 rounded-xl p-5 border border-success/10 hover:border-success/25 transition-colors"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-success/10 text-success rounded-full flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="font-hindi text-dark text-base leading-relaxed">
              {item}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
