import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div className={`card ${hover ? '' : 'hover:translate-y-0 hover:shadow-sm'} ${className}`}>
      {children}
    </div>
  );
}
