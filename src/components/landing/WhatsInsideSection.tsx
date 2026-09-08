import SectionWrapper from '@/components/ui/SectionWrapper';
import { WHATS_INSIDE } from '@/lib/constants';

export default function WhatsInsideSection() {
  return (
    <SectionWrapper className="bg-white" id="whats-inside">
      <h2 className="section-heading font-hindi">
        Ebook में आपको क्या मिलेगा?
      </h2>
      <p className="text-center text-gray-500 font-hindi mb-12 max-w-2xl mx-auto">
        एक comprehensive exam preparation toolkit जो आपको organized और focused रखेगी.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {WHATS_INSIDE.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-gradient-to-r from-primary/5 to-transparent rounded-xl p-4 border border-primary/10 hover:border-primary/25 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-sm">
              {String(index + 1).padStart(2, '0')}
            </div>
            <div>
              <span className="text-lg mr-2">{item.icon}</span>
              <span className="font-hindi text-dark text-sm font-medium">
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
