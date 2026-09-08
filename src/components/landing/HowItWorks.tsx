import SectionWrapper from '@/components/ui/SectionWrapper';
import { TOPPER_JOURNEY_STEPS } from '@/lib/constants';

export default function HowItWorks() {
  return (
    <SectionWrapper className="bg-white" id="how-it-works">
      <div className="text-center mb-12">
        <span className="inline-block bg-secondary/15 text-dark font-bold rounded-full px-4 py-1.5 text-xs sm:text-sm uppercase tracking-wider mb-3 font-hindi">
          STUDENT SUCCESS ROADMAP
        </span>
        <h2 className="section-heading font-hindi">
          TOPPER बनने की 5-Step Journey
        </h2>
        <p className="text-center text-primary font-bold font-hindi text-base sm:text-lg max-w-2xl mx-auto">
          "हर दिन थोड़ा बेहतर बनो, Result खुद बेहतर होगा!"
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 max-w-6xl mx-auto">
        {TOPPER_JOURNEY_STEPS.map((step, index) => (
          <div key={index} className="relative group">
            {/* Connector arrow (desktop only) */}
            {index < TOPPER_JOURNEY_STEPS.length - 1 && (
              <div className="hidden lg:block absolute top-10 -right-3 text-primary/30 text-xl font-bold z-10">
                →
              </div>
            )}

            <div className="bg-background hover:bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 text-primary rounded-xl text-sm font-extrabold">
                    {step.number}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-secondary opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-bold text-dark text-base sm:text-lg mb-2 font-hindi leading-snug">
                  {step.title}
                </h3>
                <p className="text-gray-600 font-hindi text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
