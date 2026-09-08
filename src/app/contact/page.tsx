import Link from 'next/link';
import { BRAND_NAME, SUPPORT_EMAIL, SUPPORT_WHATSAPP } from '@/lib/constants';

export const metadata = { title: `Contact | ${BRAND_NAME}` };

export default function ContactPage() {
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

      <main className="max-w-xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold text-dark mb-2 text-center">Contact Us</h1>
        <p className="text-gray-500 font-hindi text-center mb-10">हमसे संपर्क करें</p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Email */}
          <div className="flex items-start gap-4 p-6 border-b border-gray-100">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
              📧
            </div>
            <div>
              <h3 className="font-semibold text-dark mb-1">Email</h3>
              <p className="text-gray-500 text-sm font-hindi mb-1">किसी भी query या support के लिए email करें</p>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary font-medium text-sm hover:underline">
                {SUPPORT_EMAIL}
              </a>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="flex items-start gap-4 p-6 border-b border-gray-100">
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
              📱
            </div>
            <div>
              <h3 className="font-semibold text-dark mb-1">WhatsApp</h3>
              <p className="text-gray-500 text-sm font-hindi mb-1">Quick support के लिए WhatsApp करें</p>
              <a
                href={`https://wa.me/${SUPPORT_WHATSAPP.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-success font-medium text-sm hover:underline"
              >
                {SUPPORT_WHATSAPP}
              </a>
            </div>
          </div>

          {/* Response Time */}
          <div className="flex items-start gap-4 p-6">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
              ⏰
            </div>
            <div>
              <h3 className="font-semibold text-dark mb-1">Response Time</h3>
              <p className="text-gray-500 text-sm font-hindi">
                हम आपके message का reply 24-48 hours में देने का प्रयास करते हैं.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-sm text-primary hover:underline">
            ← Homepage पर वापस जाएं
          </Link>
        </div>
      </main>
    </div>
  );
}
