/**
 * ĐÔNG PHƯƠNG TINH HOA - Design System
 * Eastern Essence Design Tokens
 *
 * Triết lý: "Sự tinh tế trong từng chi tiết,
 *           sự thanh lịch trong sự đơn giản"
 */

// ==============================================
// COLOR PALETTE
// ==============================================

export const COLORS = {
  // PRIMARY - Nền tảng thương hiệu
  primary: {
    ink: '#0A0A0A',           // Nền chính, text đậm
    lacquer: '#1A1512',        // Nền card, elevated surfaces
    lacquerLight: '#241E19',   // Card hover state
    gold: '#C4A35A',           // Brand chính, CTA, highlights
    goldLight: '#D4B76A',      // Hover state
    goldMuted: '#8B7355',      // Borders, subtle elements
    goldDark: '#9B8445',       // Pressed state
  },

  // ACCENT - Điểm nhấn
  accent: {
    vermillion: '#B8514B',     // Warning, important, lịch đỏ
    vermillionLight: '#D06860',
    vermillionDark: '#9A423D',
    jade: '#4A6B5D',           // Success, tích cực
    jadeLight: '#5A7B6D',
    jadeDark: '#3A5B4D',
    ivory: '#E8E4DC',          // Text chính trên nền tối
    mist: '#9B958C',           // Text phụ, placeholder
    mistLight: '#B5AFA6',
  },

  // SEMANTIC - Trạng thái
  semantic: {
    success: '#4A6B5D',        // Jade for success
    warning: '#C4A35A',        // Gold for warnings
    error: '#B8514B',          // Vermillion for errors
    info: '#6B8A9A',           // Muted blue for info
  },

  // FIVE ELEMENTS - Ngũ Hành
  elements: {
    metal: '#C4A35A',          // Kim - Gold
    wood: '#4A6B5D',           // Mộc - Jade
    water: '#4A5B6B',          // Thủy - Deep blue
    fire: '#B8514B',           // Hỏa - Vermillion
    earth: '#8B7355',          // Thổ - Earth brown
  },

  // TRANSPARENT VARIANTS
  alpha: {
    gold10: 'rgba(196, 163, 90, 0.1)',
    gold20: 'rgba(196, 163, 90, 0.2)',
    gold30: 'rgba(196, 163, 90, 0.3)',
    gold50: 'rgba(196, 163, 90, 0.5)',
    ink50: 'rgba(10, 10, 10, 0.5)',
    ink80: 'rgba(10, 10, 10, 0.8)',
    ivory10: 'rgba(232, 228, 220, 0.1)',
    ivory20: 'rgba(232, 228, 220, 0.2)',
    white5: 'rgba(255, 255, 255, 0.05)',
    white10: 'rgba(255, 255, 255, 0.1)',
  },

  // GRADIENTS
  gradients: {
    goldShine: 'linear-gradient(135deg, #C4A35A 0%, #D4B76A 50%, #C4A35A 100%)',
    lacquerCard: 'linear-gradient(145deg, #241E19 0%, #1A1512 100%)',
    inkDeep: 'linear-gradient(180deg, #0A0A0A 0%, #050505 100%)',
    goldRadial: 'radial-gradient(circle at center, rgba(196,163,90,0.15) 0%, transparent 70%)',
    jadeGlow: 'radial-gradient(circle at center, rgba(74,107,93,0.2) 0%, transparent 60%)',
  },
};


// ==============================================
// TYPOGRAPHY
// ==============================================

export const TYPOGRAPHY = {
  // Font Families
  fonts: {
    display: "'Playfair Display', Georgia, 'Times New Roman', serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    chinese: "'Noto Serif SC', 'Songti SC', 'SimSun', serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },

  // Display Scale - For headings and titles
  display: {
    hero: {
      fontSize: '64px',
      lineHeight: 1.1,
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h1: {
      fontSize: '48px',
      lineHeight: 1.1,
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '36px',
      lineHeight: 1.2,
      fontWeight: 600,
      letterSpacing: '0',
    },
    h3: {
      fontSize: '28px',
      lineHeight: 1.3,
      fontWeight: 600,
      letterSpacing: '0',
    },
    h4: {
      fontSize: '24px',
      lineHeight: 1.3,
      fontWeight: 600,
      letterSpacing: '0',
    },
    h5: {
      fontSize: '20px',
      lineHeight: 1.4,
      fontWeight: 600,
      letterSpacing: '0',
    },
  },

  // Body Scale - For content
  body: {
    large: {
      fontSize: '18px',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    base: {
      fontSize: '16px',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    small: {
      fontSize: '14px',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    tiny: {
      fontSize: '12px',
      lineHeight: 1.4,
      fontWeight: 400,
    },
    micro: {
      fontSize: '10px',
      lineHeight: 1.4,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
  },

  // Special - For decorative numbers, labels
  special: {
    number: {
      fontFamily: "'Playfair Display', serif",
      fontSize: '72px',
      lineHeight: 1,
      fontWeight: 700,
    },
    label: {
      fontSize: '11px',
      lineHeight: 1.3,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
    chinese: {
      fontFamily: "'Noto Serif SC', serif",
      fontSize: '24px',
      lineHeight: 1.2,
      fontWeight: 400,
    },
  },
};


// ==============================================
// SPACING SYSTEM (8px base)
// ==============================================

export const SPACING = {
  px: '1px',
  0: '0',
  0.5: '2px',
  1: '4px',      // xs
  2: '8px',      // sm
  3: '12px',
  4: '16px',     // md
  5: '20px',
  6: '24px',     // lg
  8: '32px',     // xl
  10: '40px',
  12: '48px',    // 2xl
  16: '64px',    // 3xl
  20: '80px',
  24: '96px',    // 4xl
  32: '128px',
};

// Semantic spacing
export const SPACING_SEMANTIC = {
  component: {
    xs: SPACING[1],    // 4px - tight spacing
    sm: SPACING[2],    // 8px - default gap
    md: SPACING[4],    // 16px - comfortable
    lg: SPACING[6],    // 24px - spacious
    xl: SPACING[8],    // 32px - very spacious
  },
  section: {
    sm: SPACING[8],    // 32px
    md: SPACING[12],   // 48px
    lg: SPACING[16],   // 64px
    xl: SPACING[24],   // 96px
  },
  page: {
    x: SPACING[4],     // 16px horizontal
    y: SPACING[6],     // 24px vertical
    maxWidth: '1200px',
    maxWidthNarrow: '800px',
  },
};


// ==============================================
// BORDER RADIUS
// ==============================================

export const RADIUS = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
};


// ==============================================
// SHADOWS & ELEVATION
// ==============================================

export const SHADOWS = {
  // Elevation levels
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.2)',
  md: '0 4px 6px rgba(0, 0, 0, 0.3)',
  lg: '0 8px 25px rgba(0, 0, 0, 0.4)',
  xl: '0 25px 50px rgba(0, 0, 0, 0.5)',

  // Card shadows
  card: '0 4px 20px rgba(0, 0, 0, 0.3)',
  cardHover: '0 8px 30px rgba(0, 0, 0, 0.4)',

  // Modal/overlay
  modal: '0 25px 50px rgba(0, 0, 0, 0.6)',
  dropdown: '0 10px 30px rgba(0, 0, 0, 0.5)',

  // Glow effects
  goldGlow: '0 0 20px rgba(196, 163, 90, 0.3)',
  goldGlowStrong: '0 0 40px rgba(196, 163, 90, 0.4)',
  goldGlowSoft: '0 0 40px rgba(196, 163, 90, 0.15)',
  jadeGlow: '0 0 20px rgba(74, 107, 93, 0.3)',
  vermillionGlow: '0 0 20px rgba(184, 81, 75, 0.3)',

  // Inner shadows
  innerSoft: 'inset 0 1px 4px rgba(0, 0, 0, 0.2)',
  innerDeep: 'inset 0 2px 8px rgba(0, 0, 0, 0.3)',

  // Text shadows
  textGlow: '0 0 20px rgba(196, 163, 90, 0.5), 0 0 40px rgba(196, 163, 90, 0.3)',
};


// ==============================================
// BORDERS
// ==============================================

export const BORDERS = {
  width: {
    thin: '1px',
    medium: '2px',
    thick: '3px',
  },
  style: {
    solid: 'solid',
    dashed: 'dashed',
  },
  // Pre-defined borders
  default: `1px solid ${COLORS.primary.goldMuted}`,
  subtle: `1px solid rgba(139, 115, 85, 0.3)`,
  accent: `1px solid ${COLORS.primary.gold}`,
  card: `1px solid rgba(196, 163, 90, 0.2)`,
  cardHover: `1px solid rgba(196, 163, 90, 0.4)`,
  input: `1px solid rgba(139, 115, 85, 0.4)`,
  inputFocus: `2px solid ${COLORS.primary.gold}`,
};


// ==============================================
// TRANSITIONS & ANIMATIONS
// ==============================================

export const TRANSITIONS = {
  // Easing functions
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Durations
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '250ms',
    slow: '400ms',
    slower: '600ms',
    slowest: '800ms',
  },

  // Pre-composed transitions
  default: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
  fast: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
  color: 'color 200ms ease, background-color 200ms ease, border-color 200ms ease',
  transform: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  opacity: 'opacity 200ms ease',
};

// Animation keyframes (for use in styled-components or CSS)
export const KEYFRAMES = {
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  fadeOut: `
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `,
  slideUp: `
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `,
  slideDown: `
    @keyframes slideDown {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `,
  float: `
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `,
  pulseGlow: `
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 20px rgba(196, 163, 90, 0.3); }
      50% { box-shadow: 0 0 40px rgba(196, 163, 90, 0.5); }
    }
  `,
  shimmer: `
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `,
  rotate: `
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `,
};


// ==============================================
// Z-INDEX SCALE
// ==============================================

export const Z_INDEX = {
  hide: -1,
  base: 0,
  raised: 1,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  popover: 500,
  tooltip: 600,
  toast: 700,
  max: 9999,
};


// ==============================================
// BREAKPOINTS
// ==============================================

export const BREAKPOINTS = {
  xs: '320px',
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Media query helpers
export const MEDIA = {
  xs: `@media (min-width: ${BREAKPOINTS.xs})`,
  sm: `@media (min-width: ${BREAKPOINTS.sm})`,
  md: `@media (min-width: ${BREAKPOINTS.md})`,
  lg: `@media (min-width: ${BREAKPOINTS.lg})`,
  xl: `@media (min-width: ${BREAKPOINTS.xl})`,
  '2xl': `@media (min-width: ${BREAKPOINTS['2xl']})`,
  // Max-width queries
  maxXs: `@media (max-width: ${BREAKPOINTS.xs})`,
  maxSm: `@media (max-width: ${BREAKPOINTS.sm})`,
  maxMd: `@media (max-width: ${BREAKPOINTS.md})`,
  maxLg: `@media (max-width: ${BREAKPOINTS.lg})`,
  // Hover capability
  hover: '@media (hover: hover)',
  touch: '@media (hover: none)',
};


// ==============================================
// COMPONENT TOKENS
// ==============================================

export const COMPONENTS = {
  // Button variants
  button: {
    primary: {
      background: COLORS.gradients.goldShine,
      color: COLORS.primary.ink,
      border: 'none',
      hoverShadow: SHADOWS.goldGlow,
    },
    secondary: {
      background: 'transparent',
      color: COLORS.primary.gold,
      border: BORDERS.accent,
      hoverBackground: COLORS.alpha.gold10,
    },
    ghost: {
      background: 'transparent',
      color: COLORS.accent.ivory,
      border: 'none',
      hoverBackground: COLORS.alpha.white5,
    },
    danger: {
      background: COLORS.accent.vermillion,
      color: COLORS.accent.ivory,
      border: 'none',
      hoverBackground: COLORS.accent.vermillionLight,
    },
  },

  // Card variants
  card: {
    default: {
      background: COLORS.primary.lacquer,
      border: BORDERS.card,
      borderRadius: RADIUS.xl,
      shadow: SHADOWS.card,
    },
    elevated: {
      background: COLORS.gradients.lacquerCard,
      border: BORDERS.cardHover,
      borderRadius: RADIUS.xl,
      shadow: SHADOWS.cardHover,
    },
    glass: {
      background: 'rgba(26, 21, 18, 0.8)',
      backdropFilter: 'blur(10px)',
      border: BORDERS.subtle,
      borderRadius: RADIUS.xl,
    },
  },

  // Input variants
  input: {
    default: {
      background: COLORS.alpha.ink50,
      border: BORDERS.input,
      borderRadius: RADIUS.lg,
      color: COLORS.accent.ivory,
      placeholder: COLORS.accent.mist,
      focusBorder: COLORS.primary.gold,
      focusShadow: SHADOWS.goldGlowSoft,
    },
  },

  // Navigation
  nav: {
    height: '72px',
    heightMobile: '64px',
    background: 'rgba(10, 10, 10, 0.95)',
    backdropFilter: 'blur(12px)',
    border: `1px solid ${COLORS.alpha.gold10}`,
  },

  // Modal
  modal: {
    background: COLORS.primary.lacquer,
    border: BORDERS.card,
    borderRadius: RADIUS['2xl'],
    shadow: SHADOWS.modal,
    overlay: 'rgba(0, 0, 0, 0.85)',
  },
};


// ==============================================
// UTILITY - CSS Variables Generator
// ==============================================

export const generateCSSVariables = () => `
  :root {
    /* Primary Colors */
    --color-ink: ${COLORS.primary.ink};
    --color-lacquer: ${COLORS.primary.lacquer};
    --color-lacquer-light: ${COLORS.primary.lacquerLight};
    --color-gold: ${COLORS.primary.gold};
    --color-gold-light: ${COLORS.primary.goldLight};
    --color-gold-muted: ${COLORS.primary.goldMuted};
    --color-gold-dark: ${COLORS.primary.goldDark};

    /* Accent Colors */
    --color-vermillion: ${COLORS.accent.vermillion};
    --color-vermillion-light: ${COLORS.accent.vermillionLight};
    --color-jade: ${COLORS.accent.jade};
    --color-jade-light: ${COLORS.accent.jadeLight};
    --color-ivory: ${COLORS.accent.ivory};
    --color-mist: ${COLORS.accent.mist};
    --color-mist-light: ${COLORS.accent.mistLight};

    /* Semantic */
    --color-success: ${COLORS.semantic.success};
    --color-warning: ${COLORS.semantic.warning};
    --color-error: ${COLORS.semantic.error};
    --color-info: ${COLORS.semantic.info};

    /* Five Elements */
    --color-metal: ${COLORS.elements.metal};
    --color-wood: ${COLORS.elements.wood};
    --color-water: ${COLORS.elements.water};
    --color-fire: ${COLORS.elements.fire};
    --color-earth: ${COLORS.elements.earth};

    /* Typography */
    --font-display: ${TYPOGRAPHY.fonts.display};
    --font-body: ${TYPOGRAPHY.fonts.body};
    --font-chinese: ${TYPOGRAPHY.fonts.chinese};
    --font-mono: ${TYPOGRAPHY.fonts.mono};

    /* Spacing */
    --spacing-xs: ${SPACING[1]};
    --spacing-sm: ${SPACING[2]};
    --spacing-md: ${SPACING[4]};
    --spacing-lg: ${SPACING[6]};
    --spacing-xl: ${SPACING[8]};
    --spacing-2xl: ${SPACING[12]};
    --spacing-3xl: ${SPACING[16]};

    /* Border Radius */
    --radius-sm: ${RADIUS.sm};
    --radius-md: ${RADIUS.md};
    --radius-lg: ${RADIUS.lg};
    --radius-xl: ${RADIUS.xl};
    --radius-2xl: ${RADIUS['2xl']};
    --radius-full: ${RADIUS.full};

    /* Shadows */
    --shadow-sm: ${SHADOWS.sm};
    --shadow-md: ${SHADOWS.md};
    --shadow-lg: ${SHADOWS.lg};
    --shadow-card: ${SHADOWS.card};
    --shadow-glow-gold: ${SHADOWS.goldGlow};
    --shadow-glow-jade: ${SHADOWS.jadeGlow};

    /* Transitions */
    --ease-default: ${TRANSITIONS.easing.default};
    --duration-fast: ${TRANSITIONS.duration.fast};
    --duration-normal: ${TRANSITIONS.duration.normal};
    --duration-slow: ${TRANSITIONS.duration.slow};

    /* Z-index */
    --z-dropdown: ${Z_INDEX.dropdown};
    --z-sticky: ${Z_INDEX.sticky};
    --z-overlay: ${Z_INDEX.overlay};
    --z-modal: ${Z_INDEX.modal};
    --z-tooltip: ${Z_INDEX.tooltip};

    /* Component specific */
    --nav-height: ${COMPONENTS.nav.height};
    --nav-height-mobile: ${COMPONENTS.nav.heightMobile};
    --page-max-width: ${SPACING_SEMANTIC.page.maxWidth};
  }
`;


// ==============================================
// DEFAULT EXPORT
// ==============================================

const designSystem = {
  colors: COLORS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  spacingSemantic: SPACING_SEMANTIC,
  radius: RADIUS,
  shadows: SHADOWS,
  borders: BORDERS,
  transitions: TRANSITIONS,
  keyframes: KEYFRAMES,
  zIndex: Z_INDEX,
  breakpoints: BREAKPOINTS,
  media: MEDIA,
  components: COMPONENTS,
  generateCSSVariables,
};

export default designSystem;
