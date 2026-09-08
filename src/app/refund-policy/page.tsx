import Link from 'next/link';
import { BRAND_NAME, SUPPORT_EMAIL } from '@/lib/constants';

export const metadata = { title: `Refund Policy | ${BRAND_NAME}` };

export default function RefundPolicyPage() {
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
        <h1 className="text-3xl font-bold text-dark mb-8">Refund Policy</h1>
        
        <div className="prose prose-gray max-w-none space-y-6">
          <p className="text-gray-600 font-hindi leading-relaxed">
            कृपया purchase करने से पहले यह refund policy ध्यान से पढ़ें.
          </p>

          <h2 className="text-xl font-bold text-dark mt-8">Digital Product</h2>
          <p className="text-gray-600 font-hindi leading-relaxed">
            {BRAND_NAME} एक digital product (downloadable PDF ebook) है. Digital products की nature के कारण, एक बार download होने के बाद refund generally applicable नहीं होता.
          </p>

          <h2 className="text-xl font-bold text-dark mt-8">Exceptions</h2>
          <p className="text-gray-600 font-hindi leading-relaxed">
            निम्न cases में refund पर विचार किया जा सकता है:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 font-hindi">
            <li>Duplicate payment हो जाने पर</li>
            <li>Payment successful हो लेकिन ebook access न मिले</li>
            <li>Technical issues जिनका resolution possible न हो</li>
          </ul>

          <h2 className="text-xl font-bold text-dark mt-8">Refund Process</h2>
          <p className="text-gray-600 font-hindi leading-relaxed">
            Refund request करने के लिए अपने Order ID और payment details के साथ {SUPPORT_EMAIL} पर email करें. हम 7 working days में response देंगे.
          </p>

          <h2 className="text-xl font-bold text-dark mt-8">Contact</h2>
          <p className="text-gray-600">
            Refund queries: {SUPPORT_EMAIL}
          </p>
        </div>
      </main>
    </div>
  );
}
