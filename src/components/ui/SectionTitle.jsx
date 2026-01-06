/**
 * SectionTitle Component
 * Decorative section headers with optional ornaments
 */

import { motion } from 'framer-motion';

const variants = {
  default: {
    title: 'text-[var(--color-gold)]',
    subtitle: 'text-[var(--color-mist)]',
  },
  light: {
    title: 'text-[var(--color-ivory)]',
    subtitle: 'text-[var(--color-mist)]',
  },
  gradient: {
    title: 'text-gradient-gold',
    subtitle: 'text-[var(--color-mist)]',
  },
};

const sizes = {
  sm: {
    title: 'text-lg',
    subtitle: 'text-sm',
  },
  md: {
    title: 'text-xl md:text-2xl',
    subtitle: 'text-sm md:text-base',
  },
  lg: {
    title: 'text-2xl md:text-3xl',
    subtitle: 'text-base md:text-lg',
  },
  xl: {
    title: 'text-3xl md:text-4xl',
    subtitle: 'text-lg',
  },
};

export default function SectionTitle({
  title,
  subtitle,
  icon,
  variant = 'default',
  size = 'md',
  align = 'center',
  ornament = false,
  className = '',
}) {
  const currentVariant = variants[variant] || variants.default;
  const currentSize = sizes[size] || sizes.md;

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${alignClasses[align]} ${className}`}
    >
      {icon && (
        <div className={`mb-3 ${align === 'center' ? 'flex justify-center' : ''}`}>
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(196,163,90,0.1)] text-[var(--color-gold)]">
            {icon}
          </span>
        </div>
      )}

      {ornament && align === 'center' && (
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-[var(--color-gold-muted)]" />
          <span className="text-[var(--color-gold)] text-lg">✦</span>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-[var(--color-gold-muted)]" />
        </div>
      )}

      <h2 className={`font-display font-semibold ${currentVariant.title} ${currentSize.title}`}>
        {title}
      </h2>

      {subtitle && (
        <p className={`mt-2 ${currentVariant.subtitle} ${currentSize.subtitle}`}>
          {subtitle}
        </p>
      )}

      {ornament && align === 'center' && (
        <div className="flex items-center justify-center mt-4">
          <span className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-gold-muted)] to-transparent" />
        </div>
      )}
    </motion.div>
  );
}
