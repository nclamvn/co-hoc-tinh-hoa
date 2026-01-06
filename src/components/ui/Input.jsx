/**
 * Input Component
 * Form input with label, error states, and icons
 */

import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = forwardRef(({
  label,
  error,
  hint,
  icon,
  iconRight,
  type = 'text',
  className = '',
  containerClassName = '',
  required = false,
  disabled = false,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const baseInputClasses = `
    w-full
    bg-[rgba(10,10,10,0.5)]
    border rounded-[var(--radius-lg)]
    text-[var(--color-ivory)]
    font-body text-base
    py-3 px-4
    transition-all duration-[var(--duration-fast)] ease-[var(--ease-default)]
    placeholder:text-[var(--color-mist)]
    focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const borderClasses = error
    ? 'border-[var(--color-vermillion)] focus:border-[var(--color-vermillion)] focus:shadow-[var(--shadow-glow-vermillion)]'
    : 'border-[rgba(139,115,85,0.4)] focus:border-[var(--color-gold)] focus:shadow-[var(--shadow-glow-gold-soft)]';

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-[var(--color-ivory)]">
          {label}
          {required && <span className="ml-1 text-[var(--color-vermillion)]">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-mist)]">
            {icon}
          </span>
        )}

        <input
          ref={ref}
          type={inputType}
          disabled={disabled}
          className={`
            ${baseInputClasses}
            ${borderClasses}
            ${icon ? 'pl-12' : ''}
            ${iconRight || isPassword ? 'pr-12' : ''}
            ${className}
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-mist)] hover:text-[var(--color-gold)] transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}

        {iconRight && !isPassword && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-mist)]">
            {iconRight}
          </span>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-[var(--color-vermillion)]">
          {error}
        </p>
      )}

      {hint && !error && (
        <p className="mt-2 text-sm text-[var(--color-mist)]">
          {hint}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
