import SectionWrapper from '@/components/ui/SectionWrapper';
import { CORE_STRATEGIES } from '@/lib/constants';

export default function StrategyPreview() {
  return (
    <SectionWrapper className="bg-gradient-to-b from-primary/5 to-background" id="strategies">
      <h2 className="section-heading font-hindi">
        Ebook की 10 Core Strategies
      </h2>
      <p className="text-center text-gray-500 font-hindi mb-12 max-w-2xl mx-auto">
        हर strategy को practical और actionable तरीके से explain किया गया है.
      </p>

      <div className="max-w-2xl mx-auto">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/60 to-primary/20" />

          <div className="space-y-4">
            {CORE_STRATEGIES.map((strategy, index) => (
              <div key={index} className="relative flex items-center gap-5 group">
                {/* Node */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-white border-2 border-primary rounded-full flex items-center justify-center font-bold text-primary text-sm shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {String(index + 1).padStart(2, '0')}
                </div>
                {/* Content */}
                <div className="flex-1 bg-white rounded-xl px-5 py-4 border border-gray-100 shadow-sm group-hover:shadow-md group-hover:border-primary/20 transition-all duration-300">
                  <h3 className="font-semibold text-dark text-base">
                    {strategy}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
