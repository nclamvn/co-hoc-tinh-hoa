/**
 * Button Component
 * Reusable button with multiple variants following the design system
 */

import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary: `
    bg-gradient-to-r from-[var(--color-gold)] via-[var(--color-gold-light)] to-[var(--color-gold)]
    text-[var(--color-ink)] font-semibold
    hover:shadow-[var(--shadow-glow-gold)]
  `,
  secondary: `
    bg-transparent border border-[var(--color-gold)]
    text-[var(--color-gold)]
    hover:bg-[rgba(196,163,90,0.1)]
  `,
  ghost: `
    bg-transparent
    text-[var(--color-ivory)]
    hover:bg-[rgba(255,255,255,0.05)]
  `,
  danger: `
    bg-[var(--color-vermillion)]
    text-[var(--color-ivory)]
    hover:bg-[var(--color-vermillion-light)]
  `,
  jade: `
    bg-[var(--color-jade)]
    text-[var(--color-ivory)]
    hover:bg-[var(--color-jade-light)]
  `,
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2',
  xl: 'px-8 py-4 text-lg gap-3',
};

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}, ref) => {
  const baseClasses = `
    inline-flex items-center justify-center
    rounded-[var(--radius-lg)]
    font-medium
    transition-all duration-[var(--duration-normal)] ease-[var(--ease-default)]
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]
  `;

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      onClick={onClick}
      whileHover={!disabled ? { y: -2, scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      {...props}
    >
      {loading ? (
        <span className="animate-spin mr-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </span>
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}

      {children}

      {iconRight && !loading && (
        <span className="flex-shrink-0">{iconRight}</span>
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
