'use client';
import { useState } from 'react';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-5 px-6 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-dark font-hindi text-base md:text-lg pr-4">
          {question}
        </span>
        <span
          className={`text-primary text-2xl transition-transform duration-300 flex-shrink-0 ${
            isOpen ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="px-6 pb-5 text-gray-600 font-hindi leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: { q: string; a: string }[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y-0">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.q}
          answer={item.a}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}
