import SectionWrapper from '@/components/ui/SectionWrapper';
import { SOLUTION_FEATURES } from '@/lib/constants';

export default function SolutionSection() {
  return (
    <SectionWrapper className="bg-background" id="solution">
      <h2 className="section-heading font-hindi">
        एक ही Ebook में आपकी पूरी Exam Preparation Strategy
      </h2>
      <p className="text-center text-gray-500 font-hindi mb-12 max-w-2xl mx-auto">
        इस ebook को सिर्फ पढ़ने के लिए नहीं, बल्कि apply करने के लिए बनाया गया है.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SOLUTION_FEATURES.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-primary/20 transition-colors">
              {feature.icon}
            </div>
            <h3 className="font-bold text-dark text-base mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-500 font-hindi text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
