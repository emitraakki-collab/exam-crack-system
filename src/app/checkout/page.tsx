'use client';

import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND_NAME, EBOOK_TITLE, EBOOK_COVER_IMAGE, DISPLAY_PRICE, DISPLAY_ORIGINAL_PRICE } from '@/lib/constants';
import type { CreateOrderResponse, RazorpayResponse } from '@/types';

export default function CheckoutPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'कृपया अपना पूरा नाम दर्ज करें';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'कृपया valid email address दर्ज करें';
    }
    if (!mobile.trim() || !/^[6-9]\d{9}$/.test(mobile)) {
      newErrors.mobile = 'कृपया valid 10-digit mobile number दर्ज करें';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    setLoading(true);

    try {
      // Create order
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: fullName.trim(), email: email.trim(), mobile: mobile.trim() }),
      });

      const data: CreateOrderResponse = await res.json();

      if (!data.success) {
        setError(data.error || 'Order creation failed. Please try again.');
        setLoading(false);
        return;
      }

      // Open Razorpay
      if (typeof window.Razorpay === 'undefined') {
        setError('Payment gateway not loaded. Please refresh and try again.');
        setLoading(false);
        return;
      }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: BRAND_NAME,
        description: data.productName,
        order_id: data.razorpayOrderId,
        prefill: {
          name: fullName.trim(),
          email: email.trim(),
          contact: mobile.trim(),
        },
        theme: {
          color: '#173B7A',
        },
        handler: function (response: RazorpayResponse) {
          // Redirect to payment success page for verification
          const params = new URLSearchParams({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: data.orderId,
          });
          window.location.href = `/payment-success?${params.toString()}`;
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-container mx-auto flex items-center justify-between py-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-dark transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">EC</span>
            </div>
            <span className="font-bold text-sm text-dark">{BRAND_NAME}</span>
          </div>
          <div className="w-16" /> {/* Spacer */}
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-8 md:py-12">
        <h1 className="text-2xl font-bold text-dark text-center mb-2 font-hindi">Checkout</h1>
        <p className="text-gray-500 text-center font-hindi mb-8">अपनी details भरें और payment complete करें</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-accent rounded-lg p-4 mb-6 text-sm font-hindi">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Order Summary */}
          <div className="bg-primary/5 px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Image
                  src={EBOOK_COVER_IMAGE}
                  alt={EBOOK_TITLE}
                  width={60}
                  height={90}
                  className="w-14 h-auto object-contain drop-shadow-md rounded"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Product</p>
                <p className="font-bold text-dark text-sm sm:text-base leading-tight truncate">{EBOOK_TITLE}</p>
                <p className="text-xs text-gray-500 font-hindi mt-0.5">Author: Akshay Sikligar</p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-gray-400 line-through text-xs sm:text-sm block">{DISPLAY_ORIGINAL_PRICE}</span>
                <span className="text-xl sm:text-2xl font-extrabold text-primary">{DISPLAY_PRICE}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="form-label">पूरा नाम *</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="अपना पूरा नाम लिखें"
                className={`form-input ${errors.fullName ? 'border-accent ring-1 ring-accent/30' : ''}`}
                disabled={loading}
              />
              {errors.fullName && <p className="mt-1 text-sm text-accent font-hindi">{errors.fullName}</p>}
            </div>

            <div>
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className={`form-input ${errors.email ? 'border-accent ring-1 ring-accent/30' : ''}`}
                disabled={loading}
              />
              {errors.email && <p className="mt-1 text-sm text-accent font-hindi">{errors.email}</p>}
            </div>

            <div>
              <label className="form-label">Mobile Number *</label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="9876543210"
                className={`form-input ${errors.mobile ? 'border-accent ring-1 ring-accent/30' : ''}`}
                disabled={loading}
              />
              {errors.mobile && <p className="mt-1 text-sm text-accent font-hindi">{errors.mobile}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-accent w-full !mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                '🔒 Secure Payment करें'
              )}
            </button>
          </form>

          {/* Trust Elements */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                Secure Checkout
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Digital Delivery
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Payment Verification
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
