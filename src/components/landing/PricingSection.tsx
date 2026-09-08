import Link from 'next/link';
import Image from 'next/image';
import SectionWrapper from '@/components/ui/SectionWrapper';
import {
  BRAND_NAME,
  EBOOK_TITLE,
  EBOOK_COVER_IMAGE,
  DISPLAY_PRICE,
  DISPLAY_ORIGINAL_PRICE,
  PRODUCT_FEATURES,
  AUTHOR_NAME,
} from '@/lib/constants';

export default function PricingSection() {
  return (
    <SectionWrapper className="bg-background" id="pricing">
      <div className="text-center mb-12">
        <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-3 font-hindi">
          OFFICIAL EBOOK EDITION
        </span>
        <h2 className="section-heading font-hindi">
          अपनी Exam Preparation को एक Systematic Direction दें
        </h2>
        <p className="text-gray-500 font-hindi max-w-2xl mx-auto">
          Syllabus completion से लेकर final exam success तक की complete practical roadmap.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="relative">
          {/* Subtle Outer Glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-primary/15 via-secondary/20 to-primary/15 rounded-3xl blur-xl" />

          {/* Premium Product Card */}
          <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Book Cover Image */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-lg opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                  <div className="relative z-10 transition-transform duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1">
                    <Image
                      src={EBOOK_COVER_IMAGE}
                      alt={`${EBOOK_TITLE} Cover`}
                      width={300}
                      height={450}
                      className="w-auto max-h-[380px] sm:max-h-[420px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.25)] rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Details & Pricing */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                  <span>Author: {AUTHOR_NAME}</span>
                  <span>•</span>
                  <span>Hindi Edition</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight mb-3">
                  {EBOOK_TITLE}
                </h3>

                <p className="text-gray-600 font-hindi text-sm sm:text-base leading-relaxed mb-6">
                  यह ebook आपको <strong>syllabus complete</strong> करने, <strong>smart time planning</strong>, <strong>spaced revision</strong>, और <strong>PYQ + mock test analysis</strong> को एक व्यवस्थित system में बदलना सिखाती है.
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-4 mb-6 bg-primary/5 p-4 rounded-xl border border-primary/10 w-fit">
                  <div>
                    <span className="text-xs text-gray-400 block font-hindi">Special Limited Price</span>
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl sm:text-4xl font-extrabold text-primary">
                        {DISPLAY_PRICE}
                      </span>
                      <span className="text-gray-400 line-through text-base sm:text-lg">
                        {DISPLAY_ORIGINAL_PRICE}
                      </span>
                    </div>
                  </div>
                  <span className="bg-secondary text-dark text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                    Save 67%
                  </span>
                </div>

                {/* Features List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                  {PRODUCT_FEATURES.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-dark font-hindi text-xs sm:text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div>
                  <Link href="/checkout" className="btn-accent w-full sm:w-auto text-center block !py-4 !px-10 text-lg shadow-lg">
                    🔒 अभी Ebook खरीदें ({DISPLAY_PRICE}) →
                  </Link>
                  <p className="text-xs text-gray-400 font-hindi mt-3 text-center sm:text-left">
                    ⚡ Instant Digital Delivery • Secure Payment • Lifetime Access
                  </p>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
