'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BRAND_NAME } from '@/lib/constants';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container-main flex items-center justify-between py-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">EC</span>
          </div>
          <span className="font-bold text-lg text-dark hidden sm:inline">
            {BRAND_NAME}
          </span>
        </Link>

        <Link
          href="/checkout"
          className="btn-primary !py-2.5 !px-5 !text-sm"
        >
          अभी खरीदें
        </Link>
      </div>
    </header>
  );
}
