import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-main relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              SMART EXAM PREPARATION SYSTEM
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-dark font-hindi leading-tight mb-6">
              Syllabus पूरा करें।{' '}
              <span className="text-primary">Revision मजबूत करें।</span>{' '}
              Exam में बेहतर Perform करें।
            </h1>

            {/* Subheadline */}
            <p className="text-gray-600 font-hindi text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              EXAM CRACK SYSTEM एक practical Hindi ebook है जो आपको syllabus planning, smart revision, PYQ, mock tests, mistake analysis और final exam strategy को एक complete system में organize करना सिखाती है.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/checkout" className="btn-accent text-center">
                अभी Ebook खरीदें →
              </Link>
              <a href="#whats-inside" className="btn-secondary text-center">
                Ebook के अंदर क्या मिलेगा?
              </a>
            </div>

            {/* Trust Line */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Instant Digital Delivery
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Hindi Ebook
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Practical Study System
              </span>
            </div>
          </div>

          {/* Right: Ebook Mockup Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Soft glow background */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/10 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Actual Ebook Cover Image */}
              <div className="relative z-10 transition-transform duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1">
                <Image
                  src="/assets/ebook-cover.png"
                  alt="TOPPERS SECRET - STRATEGIES SYSTEM Ebook Cover"
                  width={340}
                  height={510}
                  priority
                  className="w-auto max-h-[440px] sm:max-h-[500px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)] rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
