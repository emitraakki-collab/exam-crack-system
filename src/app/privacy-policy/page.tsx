import Link from 'next/link';
import { BRAND_NAME, SUPPORT_EMAIL } from '@/lib/constants';

export const metadata = { title: `Privacy Policy | ${BRAND_NAME}` };

export default function PrivacyPolicyPage() {
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
        <h1 className="text-3xl font-bold text-dark mb-8">Privacy Policy</h1>
        
        <div className="prose prose-gray max-w-none space-y-6">
          <p className="text-gray-600 font-hindi leading-relaxed">
            यह Privacy Policy बताती है कि {BRAND_NAME} आपकी personal information को कैसे collect, use और protect करता है.
          </p>

          <h2 className="text-xl font-bold text-dark mt-8">Information We Collect</h2>
          <p className="text-gray-600 font-hindi leading-relaxed">
            जब आप हमारी ebook purchase करते हैं, तो हम निम्नलिखित information collect करते हैं:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Full Name (पूरा नाम)</li>
            <li>Email Address</li>
            <li>Mobile Number</li>
            <li>Payment Information (processed securely through payment gateway)</li>
          </ul>

          <h2 className="text-xl font-bold text-dark mt-8">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 font-hindi">
            <li>Purchase को process करने और ebook deliver करने के लिए</li>
            <li>Payment verification के लिए</li>
            <li>Customer support provide करने के लिए</li>
            <li>Order records maintain करने के लिए</li>
          </ul>

          <h2 className="text-xl font-bold text-dark mt-8">Data Security</h2>
          <p className="text-gray-600 font-hindi leading-relaxed">
            हम आपकी personal information की security के लिए appropriate technical और organizational measures use करते हैं. Payment information directly payment gateway द्वारा securely process की जाती है.
          </p>

          <h2 className="text-xl font-bold text-dark mt-8">Third-Party Services</h2>
          <p className="text-gray-600 font-hindi leading-relaxed">
            हम payment processing के लिए third-party payment gateway use करते हैं. आपकी payment information उनकी privacy policy के अनुसार handle होती है.
          </p>

          <h2 className="text-xl font-bold text-dark mt-8">Contact</h2>
          <p className="text-gray-600">
            Privacy-related queries के लिए contact करें: {SUPPORT_EMAIL}
          </p>

          <p className="text-gray-400 text-sm mt-8">
            Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </main>
    </div>
  );
}
