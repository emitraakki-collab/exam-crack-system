import Link from 'next/link';
import { BRAND_NAME, SUPPORT_EMAIL, SUPPORT_WHATSAPP } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-300">
      <div className="container-main py-12 px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Product */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EC</span>
              </div>
              <span className="font-bold text-lg text-white">{BRAND_NAME}</span>
            </div>
            <p className="text-gray-400 font-hindi text-sm leading-relaxed">
              Syllabus completion, revision, PYQ, mock test और exam strategy के लिए practical Hindi ebook.
            </p>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Important Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">
                📧 {SUPPORT_EMAIL}
              </li>
              <li className="text-gray-400 text-sm">
                📱 WhatsApp: {SUPPORT_WHATSAPP}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {BRAND_NAME}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
