import SectionWrapper from '@/components/ui/SectionWrapper';
import { PROBLEMS } from '@/lib/constants';

export default function ProblemSection() {
  return (
    <SectionWrapper className="bg-white">
      <h2 className="section-heading font-hindi">
        क्या आपकी तैयारी में भी ये problems हैं?
      </h2>
      <p className="text-center text-gray-500 font-hindi mb-10 max-w-2xl mx-auto">
        अगर इनमें से कोई भी problem आपकी है, out आप अकेले नहीं हैं.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {PROBLEMS.map((problem, index) => (
          <div
            key={index}
            className="flex items-start gap-3 bg-red-50/60 border border-red-100 rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:border-red-200"
          >
            <span className="flex-shrink-0 w-7 h-7 bg-accent/10 text-accent rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
              ✕
            </span>
            <p className="font-hindi text-dark text-sm md:text-base leading-relaxed">
              {problem}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
