/**
 * PageLayout Component
 * Consistent page wrapper with header spacing, max-width, and background
 */

import { motion } from 'framer-motion';

const variants = {
  default: 'bg-[var(--color-ink)]',
  mystical: 'bg-mystical',
  gradient: 'bg-gradient-to-b from-[var(--color-ink)] to-[var(--color-lacquer)]',
};

const containerSizes = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

export default function PageLayout({
  children,
  variant = 'default',
  containerSize = 'xl',
  noPadding = false,
  noTopPadding = false,
  className = '',
}) {
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`
        min-h-screen
        ${variants[variant] || variants.default}
        ${className}
      `}
    >
      <div
        className={`
          mx-auto
          ${containerSizes[containerSize] || containerSizes.xl}
          ${noPadding ? '' : 'px-4 sm:px-6 lg:px-8'}
          ${noTopPadding ? '' : 'pt-20 md:pt-24'}
          pb-12
        `}
      >
        {children}
      </div>
    </motion.div>
  );
}

// Page Header sub-component
export function PageHeader({
  title,
  subtitle,
  icon,
  backButton,
  actions,
  centered = true,
  className = '',
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`mb-8 ${centered ? 'text-center' : ''} ${className}`}
    >
      {backButton && (
        <div className="mb-4">
          {backButton}
        </div>
      )}

      <div className={`flex ${centered ? 'flex-col items-center' : 'items-start justify-between'}`}>
        <div className={centered ? 'text-center' : ''}>
          {icon && (
            <div className={`mb-4 ${centered ? '' : 'inline-block'}`}>
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[rgba(196,163,90,0.15)] text-[var(--color-gold)] text-2xl">
                {icon}
              </span>
            </div>
          )}

          <h1 className="font-display text-3xl md:text-4xl font-semibold text-gradient-gold">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-3 text-[var(--color-mist)] text-base md:text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className={`flex items-center gap-3 ${centered ? 'mt-6' : ''}`}>
            {actions}
          </div>
        )}
      </div>
    </motion.header>
  );
}

// Page Section sub-component
export function PageSection({
  children,
  title,
  subtitle,
  icon,
  actions,
  className = '',
  delay = 0,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      className={`mb-12 ${className}`}
    >
      {(title || actions) && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {icon && (
              <span className="text-[var(--color-gold)] text-xl">{icon}</span>
            )}
            <div>
              {title && (
                <h2 className="font-display text-xl md:text-2xl font-semibold text-[var(--color-gold)]">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-sm text-[var(--color-mist)] mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      )}

      {children}
    </motion.section>
  );
}

// Two Column Layout
export function TwoColumnLayout({
  children,
  sidebar,
  sidebarPosition = 'right',
  sidebarWidth = '350px',
  gap = 'lg',
  reverseOnMobile = false,
  className = '',
}) {
  const gaps = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };

  return (
    <div
      className={`
        flex flex-col lg:flex-row
        ${gaps[gap] || gaps.lg}
        ${className}
      `}
    >
      <div
        className={`
          flex-1 min-w-0
          ${sidebarPosition === 'left' ? 'lg:order-2' : ''}
          ${reverseOnMobile && sidebarPosition === 'right' ? 'order-2 lg:order-1' : ''}
        `}
      >
        {children}
      </div>

      <div
        className={`
          w-full lg:flex-shrink-0
          ${sidebarPosition === 'left' ? 'lg:order-1' : ''}
          ${reverseOnMobile && sidebarPosition === 'right' ? 'order-1 lg:order-2' : ''}
        `}
        style={{ maxWidth: sidebarWidth }}
      >
        {sidebar}
      </div>
    </div>
  );
}

// Grid Layout
export function GridLayout({
  children,
  columns = 3,
  gap = 'md',
  className = '',
}) {
  const gaps = {
    sm: 'gap-3',
    md: 'gap-4 md:gap-6',
    lg: 'gap-6 md:gap-8',
  };

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div
      className={`
        grid
        ${gridCols[columns] || gridCols[3]}
        ${gaps[gap] || gaps.md}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
