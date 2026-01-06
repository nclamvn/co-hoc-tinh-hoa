/**
 * Select Component
 * Custom styled select dropdown
 */

import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef(({
  label,
  error,
  hint,
  options = [],
  placeholder = 'Chọn...',
  className = '',
  containerClassName = '',
  required = false,
  disabled = false,
  ...props
}, ref) => {
  const baseSelectClasses = `
    w-full
    appearance-none
    bg-[rgba(10,10,10,0.5)]
    border rounded-[var(--radius-lg)]
    text-[var(--color-ivory)]
    font-body text-base
    py-3 px-4 pr-12
    transition-all duration-[var(--duration-fast)] ease-[var(--ease-default)]
    cursor-pointer
    focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const borderClasses = error
    ? 'border-[var(--color-vermillion)] focus:border-[var(--color-vermillion)]'
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
        <select
          ref={ref}
          disabled={disabled}
          className={`
            ${baseSelectClasses}
            ${borderClasses}
            ${className}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={20}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-mist)] pointer-events-none"
        />
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

Select.displayName = 'Select';

export default Select;
