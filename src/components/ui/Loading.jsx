/**
 * Loading Component
 * Various loading indicators
 */

import { motion } from 'framer-motion';

// Spinner
export function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
    xl: 'w-12 h-12 border-4',
  };

  return (
    <div
      className={`
        ${sizes[size] || sizes.md}
        border-[var(--color-gold-muted)]
        border-t-[var(--color-gold)]
        rounded-full
        animate-spin
        ${className}
      `}
    />
  );
}

// Dots loading animation
export function LoadingDots({ className = '' }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 bg-[var(--color-gold)] rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

// Skeleton loading
export function Skeleton({
  width = '100%',
  height = '20px',
  rounded = 'md',
  className = '',
}) {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-[var(--radius-sm)]',
    md: 'rounded-[var(--radius-md)]',
    lg: 'rounded-[var(--radius-lg)]',
    xl: 'rounded-[var(--radius-xl)]',
    full: 'rounded-full',
  };

  return (
    <div
      className={`
        bg-[var(--color-lacquer-light)]
        ${roundedClasses[rounded] || roundedClasses.md}
        animate-pulse
        ${className}
      `}
      style={{ width, height }}
    />
  );
}

// Full page loading overlay
export function LoadingOverlay({
  message = 'Đang tải...',
  transparent = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`
        fixed inset-0 z-[var(--z-overlay)]
        flex flex-col items-center justify-center gap-4
        ${transparent ? 'bg-black/50' : 'bg-[var(--color-ink)]'}
      `}
    >
      {/* Animated mystical symbol */}
      <div className="relative w-16 h-16">
        <motion.div
          className="absolute inset-0 border-2 border-[var(--color-gold)] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-2 border-2 border-[var(--color-jade)] rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[var(--color-gold)] text-2xl">✦</span>
        </div>
      </div>

      <p className="text-[var(--color-mist)] text-sm">{message}</p>
    </motion.div>
  );
}

// Default export - main Loading component
export default function Loading({
  variant = 'spinner',
  size = 'md',
  message,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      {variant === 'spinner' && <Spinner size={size} />}
      {variant === 'dots' && <LoadingDots />}
      {message && (
        <p className="text-[var(--color-mist)] text-sm">{message}</p>
      )}
    </div>
  );
}
