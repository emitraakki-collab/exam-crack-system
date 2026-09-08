'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { BRAND_NAME, SUPPORT_EMAIL } from '@/lib/constants';

function PaymentVerification() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifyPayment = async () => {
      const razorpay_order_id = searchParams.get('razorpay_order_id');
      const razorpay_payment_id = searchParams.get('razorpay_payment_id');
      const razorpay_signature = searchParams.get('razorpay_signature');
      const orderId = searchParams.get('orderId');

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
        setStatus('error');
        setErrorMessage('Missing payment details. Please contact support.');
        return;
      }

      try {
        const res = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderId,
          }),
        });

        const data = await res.json();

        if (data.success) {
          setStatus('success');
          // Redirect to thank you page
          setTimeout(() => {
            window.location.href = `/thank-you?orderId=${data.orderId}&token=${data.downloadToken}`;
          }, 1500);
        } else {
          setStatus('error');
          setErrorMessage(data.error || 'Payment verification failed.');
        }
      } catch (err) {
        console.error('Verification error:', err);
        setStatus('error');
        setErrorMessage('Verification failed. Please contact support.');
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {status === 'verifying' && (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
            <h1 className="text-xl font-bold text-dark mb-2">Payment Verify हो रहा है...</h1>
            <p className="text-gray-500 font-hindi text-sm">
              कृपया इस page को बंद न करें. आपका payment verify हो रहा है.
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-dark mb-2">Payment Verified! ✅</h1>
            <p className="text-gray-500 font-hindi text-sm">
              Redirecting to download page...
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-dark mb-2">Payment Verification Failed</h1>
            <p className="text-gray-500 font-hindi text-sm mb-6">{errorMessage}</p>
            <div className="space-y-3">
              <Link href="/checkout" className="btn-primary w-full block text-center">
                फिर से try करें
              </Link>
              <p className="text-xs text-gray-400">
                Support: {SUPPORT_EMAIL}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PaymentVerification />
    </Suspense>
  );
}
