/**
 * SƠN MÀI LUXURY - Premium Color System
 * Lấy cảm hứng từ: Sơn mài Bình Dương, Tranh đông hồ, Áo dài cung đình Huế
 *
 * Triết lý: "Như nghệ thuật sơn mài Việt Nam - nhiều lớp chồng lên nhau
 *           tạo chiều sâu vô tận, ánh vàng son le lói trong bóng tối huyền bí"
 */

// ==============================================
// GRADIENT BACKGROUNDS
// ==============================================

export const LUXURY_GRADIENTS = {
  // Nền chính - Sơn mài đen với depth
  obsidian: `
    radial-gradient(ellipse at top, #1a1614 0%, #0d0b0a 50%, #050404 100%)
  `,

  // Nền card - Ấm hơn với subtle glow
  lacquerCard: `
    linear-gradient(145deg, #1e1915 0%, #141110 50%, #0f0d0b 100%)
  `,

  // Gold shimmer - Cho highlights
  goldShimmer: `
    linear-gradient(135deg, #d4a84b 0%, #c49a3d 25%, #f2d479 50%, #c49a3d 75%, #a67c28 100%)
  `,

  // Gold subtle - Cho text gradient
  goldSubtle: `
    linear-gradient(135deg, #c49a3d 0%, #f2d479 50%, #c49a3d 100%)
  `,

  // Vermillion glow - Cho accents đặc biệt
  vermillionGlow: `
    linear-gradient(135deg, #8b3a3a 0%, #c45c5c 50%, #8b3a3a 100%)
  `,

  // Jade subtle - Cho positive states
  jadeSubtle: `
    linear-gradient(135deg, #2d4a3e 0%, #3d6352 50%, #2d4a3e 100%)
  `,

  // Hero background - Dramatic với ambient glow
  heroGradient: `
    radial-gradient(ellipse at center top, rgba(196,154,61,0.15) 0%, transparent 50%),
    radial-gradient(ellipse at center, #0d0b0a 0%, #050404 100%)
  `,

  // Section divider gradient
  sectionDivider: `
    linear-gradient(180deg, transparent 0%, rgba(196,154,61,0.05) 50%, transparent 100%)
  `,

  // Card hover glow
  cardHoverGlow: `
    radial-gradient(circle at center, rgba(196,154,61,0.15) 0%, transparent 70%)
  `,
};

// ==============================================
// GLOW EFFECTS
// ==============================================

export const LUXURY_GLOWS = {
  // Gold glows - Ánh vàng son
  gold: '0 0 40px rgba(196, 154, 61, 0.3)',
  goldIntense: '0 0 60px rgba(196, 154, 61, 0.5), 0 0 100px rgba(196, 154, 61, 0.2)',
  goldSoft: '0 0 30px rgba(196, 154, 61, 0.2)',
  goldAmbient: '0 0 80px rgba(196, 154, 61, 0.1)',

  // Vermillion glows - Đỏ son
  vermillion: '0 0 30px rgba(196, 92, 92, 0.3)',
  vermillionIntense: '0 0 50px rgba(196, 92, 92, 0.5)',

  // Jade glows - Ngọc bích
  jade: '0 0 30px rgba(61, 99, 82, 0.3)',
  jadeIntense: '0 0 50px rgba(74, 124, 101, 0.4)',

  // Text glows
  textGold: '0 0 40px rgba(196, 154, 61, 0.5), 0 0 80px rgba(196, 154, 61, 0.3)',
  textHero: '0 0 60px rgba(196, 154, 61, 0.4), 0 0 100px rgba(196, 154, 61, 0.2)',
};

// ==============================================
// SOLID COLORS (REFINED)
// ==============================================

export const LUXURY_COLORS = {
  // Primary - Sơn mài
  ink: '#050404',
  inkLight: '#0a0908',
  lacquer: '#0f0d0b',
  lacquerMid: '#141110',
  lacquerLight: '#1a1614',
  lacquerLighter: '#1e1915',
  lacquerWarm: '#241e19',

  // Gold spectrum - Vàng son
  goldBright: '#f2d479',
  goldLight: '#e8c65a',
  gold: '#c49a3d',
  goldMuted: '#9a7a30',
  goldDark: '#6b5520',
  goldDeep: '#4a3a15',

  // Vermillion - Đỏ son
  vermillionLight: '#d87070',
  vermillion: '#c45c5c',
  vermillionDark: '#8b3a3a',
  vermillionDeep: '#5c2525',

  // Jade - Ngọc bích
  jadeLight: '#5a8c75',
  jade: '#4a7c65',
  jadeMuted: '#3d6352',
  jadeDark: '#2d4a3e',
  jadeDeep: '#1e3329',

  // Neutrals - Trung tính
  ivory: '#f0ebe3',
  ivoryMuted: '#d4cfc5',
  ivoryDark: '#b8b3a8',
  mist: '#8a847a',
  mistDark: '#6a645a',
  ash: '#5a5550',
  ashDark: '#3a3835',
};

// ==============================================
// BORDER COLORS
// ==============================================

export const LUXURY_BORDERS = {
  // Opacity variants
  subtle: 'rgba(196, 154, 61, 0.08)',
  light: 'rgba(196, 154, 61, 0.12)',
  default: 'rgba(196, 154, 61, 0.2)',
  medium: 'rgba(196, 154, 61, 0.3)',
  strong: 'rgba(196, 154, 61, 0.4)',
  intense: 'rgba(196, 154, 61, 0.6)',

  // Vermillion borders
  vermillionSubtle: 'rgba(196, 92, 92, 0.15)',
  vermillionDefault: 'rgba(196, 92, 92, 0.3)',

  // Jade borders
  jadeSubtle: 'rgba(74, 124, 101, 0.15)',
  jadeDefault: 'rgba(74, 124, 101, 0.3)',
};

// ==============================================
// LAYERED SHADOWS (DEPTH)
// ==============================================

export const LUXURY_SHADOWS = {
  // Card shadows - Nhiều lớp tạo chiều sâu
  card: `
    0 2px 4px rgba(0,0,0,0.3),
    0 4px 8px rgba(0,0,0,0.25),
    0 8px 16px rgba(0,0,0,0.2),
    0 16px 32px rgba(0,0,0,0.15)
  `,

  cardHover: `
    0 4px 8px rgba(0,0,0,0.3),
    0 8px 16px rgba(0,0,0,0.25),
    0 16px 32px rgba(0,0,0,0.2),
    0 32px 64px rgba(0,0,0,0.15),
    0 0 60px rgba(196, 154, 61, 0.15)
  `,

  cardElevated: `
    0 8px 16px rgba(0,0,0,0.4),
    0 16px 32px rgba(0,0,0,0.3),
    0 32px 64px rgba(0,0,0,0.2)
  `,

  // Floating elements
  float: `
    0 10px 20px rgba(0,0,0,0.3),
    0 20px 40px rgba(0,0,0,0.2)
  `,

  // Modal/overlay
  modal: `
    0 25px 50px rgba(0,0,0,0.5),
    0 50px 100px rgba(0,0,0,0.3)
  `,

  // Inner highlights
  innerGlow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
  innerGlowStrong: 'inset 0 1px 0 rgba(255,255,255,0.1)',
  innerShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',

  // Combined card with inner glow
  cardWithGlow: `
    0 2px 4px rgba(0,0,0,0.3),
    0 4px 8px rgba(0,0,0,0.25),
    0 8px 16px rgba(0,0,0,0.2),
    inset 0 1px 0 rgba(255,255,255,0.03)
  `,
};

// ==============================================
// AMBIENT PATTERNS
// ==============================================

export const LUXURY_PATTERNS = {
  // Subtle ambient glow spots
  ambientGlow: `
    radial-gradient(circle at 20% 80%, rgba(196, 154, 61, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(196, 154, 61, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(196, 92, 92, 0.02) 0%, transparent 30%)
  `,

  // Noise texture SVG
  noiseTexture: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,

  // Star pattern for mystical feel
  starPattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c49a3d' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
};

// ==============================================
// ANIMATION EASINGS
// ==============================================

export const LUXURY_EASINGS = {
  // Smooth cinematic
  cinematic: [0.25, 0.1, 0.25, 1],
  cinematicIn: [0.4, 0, 1, 1],
  cinematicOut: [0, 0, 0.2, 1],

  // Bouncy
  bounce: [0.68, -0.55, 0.265, 1.55],
  bounceOut: [0.34, 1.56, 0.64, 1],

  // Smooth
  smooth: [0.4, 0, 0.2, 1],

  // Sharp
  sharp: [0.4, 0, 0.6, 1],
};

// ==============================================
// TIMING
// ==============================================

export const LUXURY_TIMING = {
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 800,
  cinematic: 1200,
  dramatic: 1500,
};

// ==============================================
// CSS VARIABLES GENERATOR
// ==============================================

export const generateLuxuryCSSVariables = () => `
  :root {
    /* === Luxury Solid Colors === */
    --lux-ink: ${LUXURY_COLORS.ink};
    --lux-ink-light: ${LUXURY_COLORS.inkLight};
    --lux-lacquer: ${LUXURY_COLORS.lacquer};
    --lux-lacquer-mid: ${LUXURY_COLORS.lacquerMid};
    --lux-lacquer-light: ${LUXURY_COLORS.lacquerLight};
    --lux-lacquer-lighter: ${LUXURY_COLORS.lacquerLighter};
    --lux-lacquer-warm: ${LUXURY_COLORS.lacquerWarm};

    --lux-gold-bright: ${LUXURY_COLORS.goldBright};
    --lux-gold-light: ${LUXURY_COLORS.goldLight};
    --lux-gold: ${LUXURY_COLORS.gold};
    --lux-gold-muted: ${LUXURY_COLORS.goldMuted};
    --lux-gold-dark: ${LUXURY_COLORS.goldDark};

    --lux-vermillion-light: ${LUXURY_COLORS.vermillionLight};
    --lux-vermillion: ${LUXURY_COLORS.vermillion};
    --lux-vermillion-dark: ${LUXURY_COLORS.vermillionDark};

    --lux-jade-light: ${LUXURY_COLORS.jadeLight};
    --lux-jade: ${LUXURY_COLORS.jade};
    --lux-jade-dark: ${LUXURY_COLORS.jadeDark};

    --lux-ivory: ${LUXURY_COLORS.ivory};
    --lux-ivory-muted: ${LUXURY_COLORS.ivoryMuted};
    --lux-mist: ${LUXURY_COLORS.mist};
    --lux-ash: ${LUXURY_COLORS.ash};

    /* === Luxury Gradients === */
    --lux-gradient-obsidian: ${LUXURY_GRADIENTS.obsidian};
    --lux-gradient-card: ${LUXURY_GRADIENTS.lacquerCard};
    --lux-gradient-gold: ${LUXURY_GRADIENTS.goldShimmer};
    --lux-gradient-gold-subtle: ${LUXURY_GRADIENTS.goldSubtle};
    --lux-gradient-hero: ${LUXURY_GRADIENTS.heroGradient};

    /* === Luxury Glows === */
    --lux-glow-gold: ${LUXURY_GLOWS.gold};
    --lux-glow-gold-intense: ${LUXURY_GLOWS.goldIntense};
    --lux-glow-gold-soft: ${LUXURY_GLOWS.goldSoft};
    --lux-glow-vermillion: ${LUXURY_GLOWS.vermillion};
    --lux-glow-jade: ${LUXURY_GLOWS.jade};
    --lux-glow-text: ${LUXURY_GLOWS.textGold};
    --lux-glow-hero: ${LUXURY_GLOWS.textHero};

    /* === Luxury Borders === */
    --lux-border-subtle: ${LUXURY_BORDERS.subtle};
    --lux-border-light: ${LUXURY_BORDERS.light};
    --lux-border-default: ${LUXURY_BORDERS.default};
    --lux-border-medium: ${LUXURY_BORDERS.medium};
    --lux-border-strong: ${LUXURY_BORDERS.strong};

    /* === Luxury Shadows === */
    --lux-shadow-card: ${LUXURY_SHADOWS.card};
    --lux-shadow-card-hover: ${LUXURY_SHADOWS.cardHover};
    --lux-shadow-elevated: ${LUXURY_SHADOWS.cardElevated};
    --lux-shadow-float: ${LUXURY_SHADOWS.float};
    --lux-shadow-modal: ${LUXURY_SHADOWS.modal};
  }
`;

// ==============================================
// DEFAULT EXPORT
// ==============================================

const luxuryTheme = {
  colors: LUXURY_COLORS,
  gradients: LUXURY_GRADIENTS,
  glows: LUXURY_GLOWS,
  borders: LUXURY_BORDERS,
  shadows: LUXURY_SHADOWS,
  patterns: LUXURY_PATTERNS,
  easings: LUXURY_EASINGS,
  timing: LUXURY_TIMING,
  generateCSSVariables: generateLuxuryCSSVariables,
};

export default luxuryTheme;
