/**
 * LUXURY HOME PAGE - Cổ Học Tinh Hoa
 * Premium design with Sơn Mài aesthetic
 * 100% Vietnamese - No Chinese characters
 */

import { motion } from 'framer-motion';
import {
  Sparkles,
  Hand,
  User,
  Hash,
  ArrowRight,
  Star,
  Moon,
  Sun,
  Heart,
  Calendar,
  Compass
} from 'lucide-react';

// Luxury Animations
import {
  CinematicReveal,
  GoldShimmerText,
  FloatingParticles,
  GlowingOrb,
  StaggerContainer,
  StaggerItem,
  RevealOnScroll,
  TiltCard,
  MagneticHover,
} from '../components/animations';

// ==============================================
// DATA - 100% Vietnamese
// ==============================================

const features = [
  {
    id: 'astrology',
    icon: Sparkles,
    title: 'Tử Vi',
    subtitle: 'Lá số mệnh vận',
    description: 'Khám phá vận mệnh qua hệ thống Can Chi và 12 Con Giáp theo truyền thống Á Đông.',
    color: 'vermillion',
    colorVar: 'var(--lux-vermillion)'
  },
  {
    id: 'numerology',
    icon: Hash,
    title: 'Thần Số Học',
    subtitle: 'Con số định mệnh',
    description: 'Giải mã bản đồ số mệnh từ tên và ngày sinh theo phương pháp Pythagorean & Chaldean.',
    color: 'jade',
    colorVar: 'var(--lux-jade)'
  },
  {
    id: 'palmistry',
    icon: Hand,
    title: 'Chỉ Tay Học',
    subtitle: 'Nghệ thuật đọc vân tay',
    description: 'Phân tích đường vân tay theo nghệ thuật Chỉ Tay Học cổ xưa Á Đông.',
    color: 'gold',
    colorVar: 'var(--lux-gold)'
  },
  {
    id: 'physiognomy',
    icon: User,
    title: 'Nhân Tướng Học',
    subtitle: 'Thuật xem tướng mạo',
    description: 'Đọc ngũ quan theo Nhân Tướng Học - nghệ thuật xem tướng mạo cổ truyền.',
    color: 'water',
    colorVar: 'var(--lux-mist)'
  }
];

const premiumFeatures = [
  {
    id: 'compatibility',
    icon: Heart,
    title: 'Xem Hợp Tuổi',
    subtitle: 'Tình duyên & đối tác',
    description: 'Phân tích độ hợp đôi qua Con Giáp, Ngũ Hành và Thần Số Học. Khám phá mức độ tương hợp trong tình yêu, hôn nhân.',
    color: 'vermillion',
    colorVar: 'var(--lux-vermillion)'
  },
  {
    id: 'auspicious-date',
    icon: Calendar,
    title: 'Xem Ngày Tốt',
    subtitle: 'Hoàng đạo & cát nhật',
    description: 'Tìm ngày lành tháng tốt theo 12 Trực, 28 Sao và Giờ Hoàng Đạo cho các sự kiện quan trọng.',
    color: 'jade',
    colorVar: 'var(--lux-jade)'
  },
  {
    id: 'lunar-calendar',
    icon: Moon,
    title: 'Lịch Vạn Niên',
    subtitle: 'Âm lịch chi tiết',
    description: 'Tra cứu âm lịch, tiết khí, can chi và thông tin phong thủy cho mọi ngày trong năm.',
    color: 'gold',
    colorVar: 'var(--lux-gold)'
  }
];

// ==============================================
// COMPONENT
// ==============================================

export default function HomePage({ onNavigate }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <GlowingOrb
          size={400}
          color="gold"
          className="absolute -top-40 -left-40 opacity-40"
        />
        <GlowingOrb
          size={500}
          color="jade"
          className="absolute -bottom-60 -right-60 opacity-30"
        />
        <GlowingOrb
          size={300}
          color="vermillion"
          className="absolute top-1/3 right-1/4 opacity-20"
        />
      </div>

      {/* Floating Particles */}
      <FloatingParticles count={30} />

      {/* ========== HERO SECTION ========== */}
      <section className="relative pt-28 md:pt-36 pb-24 px-4">
        <CinematicReveal delay={0.2}>
          <div className="max-w-5xl mx-auto text-center">

            {/* Decorative Header */}
            <motion.div
              className="flex items-center justify-center gap-4 mb-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Moon size={18} className="text-[var(--lux-gold-dim)]" />
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--lux-gold)] to-transparent" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Star size={24} className="text-[var(--lux-gold)]" />
              </motion.div>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--lux-gold)] to-transparent" />
              <Sun size={18} className="text-[var(--lux-gold-dim)]" />
            </motion.div>

            {/* Main Title */}
            <h1 className="font-display text-luxury-hero mb-8">
              <GoldShimmerText className="block">
                Cổ Học
              </GoldShimmerText>
              <span className="text-[var(--lux-ivory)] block mt-2">
                Tinh Hoa
              </span>
            </h1>

            {/* Tagline */}
            <motion.p
              className="font-display text-2xl md:text-3xl text-[var(--lux-mist)] italic mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              "Khám phá vận mệnh qua lăng kính cổ xưa"
            </motion.p>

            {/* Description */}
            <motion.p
              className="max-w-2xl mx-auto text-[var(--lux-pearl)] text-lg md:text-xl leading-relaxed mb-14"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              Nền tảng tử vi và tướng số kết hợp trí tuệ nhân tạo,
              mang đến phân tích sâu sắc dựa trên phương pháp truyền thống Á Đông.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <MagneticHover strength={0.2}>
                <motion.button
                  onClick={() => onNavigate('numerology')}
                  className="btn-luxury rounded-full text-lg group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Bắt Đầu Khám Phá</span>
                  <ArrowRight size={20} className="inline ml-3 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </MagneticHover>

              <MagneticHover strength={0.2}>
                <motion.button
                  onClick={() => onNavigate('astrology')}
                  className="px-10 py-4 rounded-full border border-[var(--lux-gold)]/40 text-[var(--lux-gold)] hover:bg-[var(--lux-gold)]/10 hover:border-[var(--lux-gold)]/60 transition-all duration-500 font-display text-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Xem Tử Vi
                </motion.button>
              </MagneticHover>
            </motion.div>
          </div>
        </CinematicReveal>
      </section>

      {/* Divider */}
      <div className="max-w-xl mx-auto px-4">
        <div className="luxury-divider">
          <Compass size={18} className="luxury-divider-icon" />
        </div>
      </div>

      {/* ========== FEATURES SECTION ========== */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Section Header */}
          <RevealOnScroll direction="up" className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-[var(--lux-ivory)] mb-5">
              Các Phương Pháp
            </h2>
            <p className="text-[var(--lux-mist)] text-lg">
              Khám phá bốn phương pháp huyền học cổ xưa
            </p>
          </RevealOnScroll>

          {/* Feature Cards Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" staggerDelay={0.15}>
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <StaggerItem key={feature.id}>
                  <TiltCard maxTilt={5} glareOpacity={0.08}>
                    <motion.div
                      className="luxury-card rounded-2xl p-7 md:p-8 cursor-pointer group h-full"
                      onClick={() => onNavigate(feature.id)}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start gap-5">
                        {/* Icon */}
                        <div
                          className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                          style={{
                            background: `linear-gradient(135deg, ${feature.colorVar}20, ${feature.colorVar}10)`,
                            border: `1px solid ${feature.colorVar}40`,
                            boxShadow: `0 0 20px ${feature.colorVar}20`
                          }}
                        >
                          <Icon size={28} style={{ color: feature.colorVar }} />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-baseline gap-3 mb-3">
                            <h3 className="font-display text-2xl text-[var(--lux-ivory)] group-hover:text-[var(--lux-gold)] transition-colors duration-300">
                              {feature.title}
                            </h3>
                            <span className="text-xs text-[var(--lux-mist)] tracking-wider">
                              {feature.subtitle}
                            </span>
                          </div>
                          <p className="text-[var(--lux-pearl)] leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>

                      {/* Hover Arrow */}
                      <motion.div
                        className="absolute bottom-6 right-6 text-[var(--lux-gold)] opacity-0 group-hover:opacity-100 transition-all duration-300"
                        initial={{ x: -5 }}
                        whileHover={{ x: 0 }}
                      >
                        <ArrowRight size={20} />
                      </motion.div>
                    </motion.div>
                  </TiltCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-xl mx-auto px-4">
        <div className="luxury-divider">
          <Heart size={18} className="luxury-divider-icon" />
        </div>
      </div>

      {/* ========== PREMIUM FEATURES ========== */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Section Header */}
          <RevealOnScroll direction="up" className="text-center mb-16">
            <motion.span
              className="inline-block px-5 py-2 bg-[var(--lux-gold)]/10 border border-[var(--lux-gold)]/30 rounded-full text-[var(--lux-gold)] text-sm mb-5"
              whileHover={{ scale: 1.05 }}
            >
              Công Cụ Cao Cấp
            </motion.span>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--lux-ivory)] mb-5">
              Dịch Vụ Đặc Biệt
            </h2>
            <p className="text-[var(--lux-mist)] text-lg">
              Công cụ phân tích chuyên sâu cho các quyết định quan trọng
            </p>
          </RevealOnScroll>

          {/* Premium Cards Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.15}>
            {premiumFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <StaggerItem key={feature.id}>
                  <TiltCard maxTilt={6} glareOpacity={0.1}>
                    <motion.div
                      className="relative luxury-card rounded-2xl p-7 md:p-8 cursor-pointer group overflow-hidden h-full"
                      onClick={() => onNavigate(feature.id)}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Premium Gradient Accent */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{
                          background: `linear-gradient(135deg, ${feature.colorVar}15 0%, transparent 50%, ${feature.colorVar}10 100%)`
                        }}
                      />

                      <div className="relative">
                        {/* Icon */}
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110"
                          style={{
                            background: `linear-gradient(135deg, ${feature.colorVar}25, ${feature.colorVar}10)`,
                            border: `1px solid ${feature.colorVar}40`,
                            boxShadow: `0 0 25px ${feature.colorVar}20`
                          }}
                        >
                          <Icon size={26} style={{ color: feature.colorVar }} />
                        </div>

                        {/* Content */}
                        <h3 className="font-display text-2xl text-[var(--lux-ivory)] mb-2 group-hover:text-[var(--lux-gold)] transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <span className="text-xs text-[var(--lux-mist)] tracking-wider block mb-4">
                          {feature.subtitle}
                        </span>
                        <p className="text-[var(--lux-pearl)] leading-relaxed text-sm">
                          {feature.description}
                        </p>
                      </div>

                      {/* Hover Arrow */}
                      <motion.div
                        className="absolute bottom-6 right-6 text-[var(--lux-gold)] opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <ArrowRight size={18} />
                      </motion.div>
                    </motion.div>
                  </TiltCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

    </div>
  );
}
