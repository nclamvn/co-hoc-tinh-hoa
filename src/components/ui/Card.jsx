/**
 * Card Component
 * Versatile card with multiple variants following the design system
 */

import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const variants = {
  default: `
    bg-[var(--color-lacquer)]
    border border-[rgba(196,163,90,0.2)]
    hover:border-[rgba(196,163,90,0.4)]
  `,
  elevated: `
    bg-gradient-to-br from-[var(--color-lacquer-light)] to-[var(--color-lacquer)]
    border border-[rgba(196,163,90,0.3)]
  `,
  glass: `
    bg-[rgba(26,21,18,0.8)]
    backdrop-blur-[10px]
    border border-[rgba(139,115,85,0.3)]
  `,
  outline: `
    bg-transparent
    border border-[var(--color-gold-muted)]
    hover:border-[var(--color-gold)]
  `,
  premium: `
    bg-gradient-to-br from-[rgba(196,163,90,0.15)] to-[rgba(74,107,93,0.15)]
    border border-[var(--color-gold)]
    shadow-[var(--shadow-glow-gold-soft)]
  `,
};

const paddings = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
};

const Card = forwardRef(({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = true,
  clickable = false,
  className = '',
  onClick,
  ...props
}, ref) => {
  const Component = clickable ? motion.button : motion.div;

  const baseClasses = `
    rounded-[var(--radius-xl)]
    shadow-[var(--shadow-card)]
    transition-all duration-[var(--duration-normal)] ease-[var(--ease-default)]
    ${clickable ? 'cursor-pointer w-full text-left' : ''}
  `;

  const hoverAnimation = hoverable ? {
    y: -4,
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
  } : {};

  return (
    <Component
      ref={ref}
      className={`
        ${baseClasses}
        ${variants[variant] || variants.default}
        ${paddings[padding] || paddings.md}
        ${className}
      `}
      onClick={onClick}
      whileHover={hoverAnimation}
      whileTap={clickable ? { scale: 0.98 } : {}}
      {...props}
    >
      {children}
    </Component>
  );
});

Card.displayName = 'Card';

// Card Header sub-component
export const CardHeader = ({ children, className = '', ...props }) => (
  <div
    className={`
      pb-4 mb-4
      border-b border-[rgba(196,163,90,0.2)]
      ${className}
    `}
    {...props}
  >
    {children}
  </div>
);

// Card Title sub-component
export const CardTitle = ({ children, className = '', as: Tag = 'h3', ...props }) => (
  <Tag
    className={`
      font-display text-xl font-semibold
      text-[var(--color-gold)]
      ${className}
    `}
    {...props}
  >
    {children}
  </Tag>
);

// Card Description sub-component
export const CardDescription = ({ children, className = '', ...props }) => (
  <p
    className={`
      text-sm text-[var(--color-mist)]
      mt-1
      ${className}
    `}
    {...props}
  >
    {children}
  </p>
);

// Card Content sub-component
export const CardContent = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

// Card Footer sub-component
export const CardFooter = ({ children, className = '', ...props }) => (
  <div
    className={`
      pt-4 mt-4
      border-t border-[rgba(196,163,90,0.2)]
      flex items-center gap-3
      ${className}
    `}
    {...props}
  >
    {children}
  </div>
);

export default Card;
