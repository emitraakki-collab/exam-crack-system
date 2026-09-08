import Link from 'next/link';
import { BRAND_NAME } from '@/lib/constants';

export default function FinalCTA() {
  return (
    <section className="bg-gradient-to-br from-dark via-primary-900 to-dark py-20 md:py-28 px-4 sm:px-6">
      <div className="container-main text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white font-hindi leading-tight mb-6 max-w-3xl mx-auto">
          अब सिर्फ पढ़ाई मत कीजिए — अपनी Preparation को{' '}
          <span className="text-secondary">System</span> बनाइए.
        </h2>
        <p className="text-gray-300 font-hindi text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          आज से अपनी syllabus completion, revision और mock-test strategy को व्यवस्थित करें.
        </p>
        <Link href="/checkout" className="btn-accent !text-xl !py-5 !px-12">
          {BRAND_NAME} खरीदें →
        </Link>
      </div>
    </section>
  );
}
