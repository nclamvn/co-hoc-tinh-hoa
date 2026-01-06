/**
 * Badge Component
 * Small labels for status, categories, and tags
 */

const variants = {
  gold: `
    bg-[rgba(196,163,90,0.2)]
    text-[var(--color-gold)]
    border-[rgba(196,163,90,0.4)]
  `,
  jade: `
    bg-[rgba(74,107,93,0.2)]
    text-[var(--color-jade-light)]
    border-[rgba(74,107,93,0.4)]
  `,
  vermillion: `
    bg-[rgba(184,81,75,0.2)]
    text-[var(--color-vermillion-light)]
    border-[rgba(184,81,75,0.4)]
  `,
  mist: `
    bg-[rgba(155,149,140,0.2)]
    text-[var(--color-mist-light)]
    border-[rgba(155,149,140,0.4)]
  `,
  premium: `
    bg-gradient-to-r from-[rgba(196,163,90,0.3)] to-[rgba(74,107,93,0.3)]
    text-[var(--color-gold)]
    border-[var(--color-gold)]
  `,
  // Five Elements
  metal: `
    bg-[rgba(196,163,90,0.2)]
    text-[var(--color-metal)]
    border-[rgba(196,163,90,0.4)]
  `,
  wood: `
    bg-[rgba(74,107,93,0.2)]
    text-[var(--color-wood)]
    border-[rgba(74,107,93,0.4)]
  `,
  water: `
    bg-[rgba(74,91,107,0.2)]
    text-[#7B9BAB]
    border-[rgba(74,91,107,0.4)]
  `,
  fire: `
    bg-[rgba(184,81,75,0.2)]
    text-[var(--color-fire)]
    border-[rgba(184,81,75,0.4)]
  `,
  earth: `
    bg-[rgba(139,115,85,0.2)]
    text-[#AB9575]
    border-[rgba(139,115,85,0.4)]
  `,
};

const sizes = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

export default function Badge({
  children,
  variant = 'gold',
  size = 'md',
  icon,
  className = '',
  ...props
}) {
  return (
    <span
      className={`
        inline-flex items-center gap-1
        border rounded-full
        font-medium
        whitespace-nowrap
        ${variants[variant] || variants.gold}
        ${sizes[size] || sizes.md}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
