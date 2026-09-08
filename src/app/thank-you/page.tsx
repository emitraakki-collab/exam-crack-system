'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND_NAME, EBOOK_TITLE, EBOOK_COVER_IMAGE, SUPPORT_EMAIL, SUPPORT_WHATSAPP } from '@/lib/constants';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const [valid, setValid] = useState<boolean | null>(null);
  const orderId = searchParams.get('orderId');
  const token = searchParams.get('token');

  useEffect(() => {
    if (!orderId || !token) {
      setValid(false);
      return;
    }
    // Simple validation — the actual security is in the download endpoint
    setValid(true);
  }, [orderId, token]);

  if (valid === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!valid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-10 text-center">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-dark mb-2">Access Denied</h1>
          <p className="text-gray-500 font-hindi text-sm mb-6">
            यह page सिर्फ successful payment के बाद accessible है. कृपया पहले purchase करें.
          </p>
          <Link href="/" className="btn-primary w-full block text-center">
            Homepage पर जाएं
          </Link>
        </div>
      </div>
    );
  }

  const downloadUrl = `/api/download?token=${encodeURIComponent(token!)}&orderId=${encodeURIComponent(orderId!)}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-success/5 to-background flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-success to-success-600 px-6 py-8 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">🎉 Payment Successful!</h1>
            <p className="text-white/80 font-hindi text-sm">
              धन्यवाद! आपकी Ebook purchase successfully complete हो गई है.
            </p>
          </div>

          {/* Order Details */}
          <div className="px-6 py-6 border-b border-gray-100">
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
              <Image
                src={EBOOK_COVER_IMAGE}
                alt={EBOOK_TITLE}
                width={50}
                height={75}
                className="w-12 h-auto object-contain rounded drop-shadow-md flex-shrink-0"
              />
              <div>
                <p className="font-bold text-dark text-sm sm:text-base leading-tight">{EBOOK_TITLE}</p>
                <p className="text-xs text-gray-500 font-hindi mt-0.5">Author: Akshay Sikligar • Hindi Edition</p>
              </div>
            </div>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Order ID</span>
                <span className="font-mono text-dark text-xs">{orderId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date</span>
                <span className="text-dark">{new Date().toLocaleDateString('hi-IN')}</span>
              </div>
            </div>
          </div>

          {/* Download Section */}
          <div className="px-6 py-8 text-center">
            <h2 className="text-lg font-bold text-dark mb-2 font-hindi">
              📚 आपकी Ebook तैयार है
            </h2>
            <p className="text-gray-500 text-sm font-hindi mb-6">
              नीचे button पर click करके अपनी ebook download करें.
            </p>
            <a
              href={downloadUrl}
              className="btn-success w-full block text-center"
            >
              📥 Ebook Download करें
            </a>
            <p className="text-xs text-gray-400 mt-4 font-hindi">
              इस page को सुरक्षित रखें. आपकी download access आपके purchase verification से जुड़ी है.
            </p>
          </div>

          {/* Support */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center font-hindi">
              Download में समस्या? Support से संपर्क करें: {SUPPORT_EMAIL}
            </p>
          </div>
        </div>

        {/* Back to Website */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-primary hover:underline">
            ← Website पर वापस जाएं
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
