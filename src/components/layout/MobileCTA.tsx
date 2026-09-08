'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DISPLAY_PRICE } from '@/lib/constants';

export default function MobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-40 md:hidden transition-transform duration-300 pb-safe ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <p className="text-xs text-gray-500 font-hindi">Premium Ebook</p>
          <p className="text-lg font-bold text-primary">{DISPLAY_PRICE}</p>
        </div>
        <Link href="/checkout" className="btn-primary !py-3 !px-6 !text-sm">
          अभी खरीदें →
        </Link>
      </div>
    </div>
  );
}
