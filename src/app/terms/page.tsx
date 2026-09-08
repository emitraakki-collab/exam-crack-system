import Link from 'next/link';
import { BRAND_NAME, SUPPORT_EMAIL } from '@/lib/constants';

export const metadata = { title: `Terms & Conditions | ${BRAND_NAME}` };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-container mx-auto flex items-center justify-between py-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">EC</span>
            </div>
            <span className="font-bold text-sm text-dark">{BRAND_NAME}</span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold text-dark mb-8">Terms & Conditions</h1>
        
        <div className="prose prose-gray max-w-none space-y-6">
          <p className="text-gray-600 font-hindi leading-relaxed">
            {BRAND_NAME} की website और products use करने से पहले कृपया ये terms and conditions ध्यान से पढ़ें.
          </p>

          <h2 className="text-xl font-bold text-dark mt-8">Product Description</h2>
          <p className="text-gray-600 font-hindi leading-relaxed">
            {BRAND_NAME} एक digital ebook (PDF format) है जो exam preparation strategies और study planning methods provide करती है. यह एक educational resource है.
          </p>

          <h2 className="text-xl font-bold text-dark mt-8">No Guarantee</h2>
          <p className="text-gray-600 font-hindi leading-relaxed">
            यह ebook किसी exam में selection या success की guarantee नहीं देती. Results आपकी individual preparation, effort और exam performance पर depend करते हैं.
          </p>

          <h2 className="text-xl font-bold text-dark mt-8">Digital Delivery</h2>
          <p className="text-gray-600 font-hindi leading-relaxed">
            Successful payment के बाद ebook digitally deliver की जाती है. यह एक downloadable PDF file है.
          </p>

          <h2 className="text-xl font-bold text-dark mt-8">Intellectual Property</h2>
          <p className="text-gray-600 font-hindi leading-relaxed">
            इस ebook का सभी content copyright protected है. Purchase करने पर आपको personal use का license मिलता है. इसे redistribute, resell, या share करना prohibited है.
          </p>

          <h2 className="text-xl font-bold text-dark mt-8">Payment</h2>
          <p className="text-gray-600 font-hindi leading-relaxed">
            सभी payments secure payment gateway के through process होते हैं. Prices Indian Rupees (₹) में हैं.
          </p>

          <h2 className="text-xl font-bold text-dark mt-8">Contact</h2>
          <p className="text-gray-600">
            Questions? Contact: {SUPPORT_EMAIL}
          </p>
        </div>
      </main>
    </div>
  );
}
