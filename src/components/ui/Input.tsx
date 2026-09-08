import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="mb-4">
        <label className="form-label">{label}</label>
        <input
          ref={ref}
          className={`form-input ${error ? 'border-accent ring-1 ring-accent/30' : ''} ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-accent font-hindi">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
