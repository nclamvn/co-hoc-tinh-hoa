/**
 * LUXURY DAY CARD - Tờ lịch cao cấp 100% tiếng Việt
 * Không sử dụng chữ Hán - Hoàn toàn tiếng Việt
 */

import { motion } from 'framer-motion';
import {
  FloatingParticles,
  NumberCounter,
  GoldShimmerText
} from '../animations/LuxuryAnimations';

// ==============================================
// VIETNAMESE CONVERTERS - Chuyển đổi sang tiếng Việt
// ==============================================

/**
 * Chuyển ngày âm sang tiếng Việt đẹp
 */
const getLunarDayVN = (day) => {
  const specialDays = {
    1: 'Mùng Một', 2: 'Mùng Hai', 3: 'Mùng Ba', 4: 'Mùng Bốn', 5: 'Mùng Năm',
    6: 'Mùng Sáu', 7: 'Mùng Bảy', 8: 'Mùng Tám', 9: 'Mùng Chín', 10: 'Mùng Mười',
    11: 'Mười Một', 12: 'Mười Hai', 13: 'Mười Ba', 14: 'Mười Bốn', 15: 'Rằm',
    16: 'Mười Sáu', 17: 'Mười Bảy', 18: 'Mười Tám', 19: 'Mười Chín',
    20: 'Hai Mươi', 21: 'Hăm Mốt', 22: 'Hăm Hai', 23: 'Hăm Ba', 24: 'Hăm Bốn',
    25: 'Hăm Lăm', 26: 'Hăm Sáu', 27: 'Hăm Bảy', 28: 'Hăm Tám', 29: 'Hăm Chín',
    30: 'Ba Mươi',
  };
  return specialDays[day] || `Ngày ${day}`;
};

/**
 * Tháng âm tiếng Việt
 */
const getLunarMonthVN = (month, isLeap = false) => {
  const months = ['', 'Giêng', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu',
                  'Bảy', 'Tám', 'Chín', 'Mười', 'Mười Một', 'Chạp'];
  const monthName = months[Math.abs(month)] || month;
  return `Tháng ${monthName}${isLeap ? ' Nhuận' : ''}`;
};

/**
 * Con giáp tiếng Việt
 */
const getZodiacVN = (chi) => {
  const zodiacMap = {
    'Tý': { name: 'Tý', animal: 'Chuột', emoji: '🐀' },
    'Sửu': { name: 'Sửu', animal: 'Trâu', emoji: '🐃' },
    'Dần': { name: 'Dần', animal: 'Hổ', emoji: '🐅' },
    'Mão': { name: 'Mão', animal: 'Mèo', emoji: '🐈' },
    'Thìn': { name: 'Thìn', animal: 'Rồng', emoji: '🐉' },
    'Tỵ': { name: 'Tỵ', animal: 'Rắn', emoji: '🐍' },
    'Ngọ': { name: 'Ngọ', animal: 'Ngựa', emoji: '🐴' },
    'Mùi': { name: 'Mùi', animal: 'Dê', emoji: '🐐' },
    'Thân': { name: 'Thân', animal: 'Khỉ', emoji: '🐒' },
    'Dậu': { name: 'Dậu', animal: 'Gà', emoji: '🐓' },
    'Tuất': { name: 'Tuất', animal: 'Chó', emoji: '🐕' },
    'Hợi': { name: 'Hợi', animal: 'Lợn', emoji: '🐖' },
  };
  return zodiacMap[chi] || { name: chi, animal: '', emoji: '🔮' };
};

/**
 * Trích chi từ can chi
 */
const extractChi = (canChi) => {
  if (!canChi) return '';
  const chiList = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
  for (const chi of chiList) {
    if (canChi.includes(chi)) return chi;
  }
  return '';
};

// ==============================================
// MAIN COMPONENT
// ==============================================

export default function LuxuryDayCard({ dayInfo, isSelected = false, size = 'large' }) {
  if (!dayInfo) return null;

  const { solar, lunar, canChi, truc, sao, hoangDao, dayQuality, activities } = dayInfo;

  const isWeekend = solar.weekDay === 0 || solar.weekDay === 6;
  const isSunday = solar.weekDay === 0;

  // Get zodiac info from year chi
  const yearChi = extractChi(canChi?.year);
  const zodiacInfo = getZodiacVN(yearChi);

  // Size classes
  const sizeClasses = {
    small: 'max-w-[280px]',
    medium: 'max-w-[320px]',
    large: 'max-w-[380px]',
  };

  return (
    <motion.div
      className={`relative w-full ${sizeClasses[size]} mx-auto`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
    >
      {/* Ambient glow khi selected */}
      {isSelected && (
        <motion.div
          className="absolute -inset-4 rounded-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(196,154,61,0.2) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Main Card */}
      <div className="relative luxury-card p-0 overflow-hidden">

        {/* Floating particles */}
        <FloatingParticles count={8} />

        {/* Top decorative line */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[var(--lux-gold)] to-transparent" />

        {/* === THỨ TRONG TUẦN === */}
        <motion.div
          className={`
            py-4 text-center font-display text-lg tracking-[0.3em] uppercase
            ${isSunday
              ? 'bg-gradient-to-b from-[#3d1f1f] to-transparent text-[var(--lux-vermillion)]'
              : 'bg-gradient-to-b from-[#1f2d1f] to-transparent text-[var(--lux-jade)]'
            }
          `}
        >
          {solar.weekDayName}
        </motion.div>

        {/* === NGÀY DƯƠNG - SỐ LỚN === */}
        <div className="relative py-8 flex flex-col items-center">
          {/* Background glow */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at center, ${isSunday ? 'rgba(196,92,92,0.1)' : 'rgba(196,154,61,0.1)'} 0%, transparent 70%)`,
            }}
          />

          {/* Số ngày */}
          <motion.div
            className={`
              relative font-display font-semibold
              ${isSunday ? 'text-[var(--lux-vermillion)]' : isWeekend ? 'text-[var(--lux-jade)]' : 'text-[var(--lux-ivory)]'}
            `}
            style={{
              fontSize: size === 'small' ? '4rem' : 'clamp(5rem, 15vw, 8rem)',
              textShadow: isSunday
                ? '0 0 60px rgba(196,92,92,0.5)'
                : '0 0 60px rgba(196,154,61,0.3)',
              lineHeight: 1,
            }}
          >
            <NumberCounter value={solar.day} />
          </motion.div>

          {/* Tháng năm dương */}
          <div className="mt-2 text-[var(--lux-mist)] text-sm tracking-[0.2em] uppercase">
            Tháng {solar.month} · {solar.year}
          </div>
        </div>

        {/* === DIVIDER === */}
        <div className="flex items-center gap-4 px-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[var(--lux-gold)]/30" />
          <div className="text-[var(--lux-gold)] text-xs">✦</div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[var(--lux-gold)]/30" />
        </div>

        {/* === NGÀY ÂM LỊCH - TIẾNG VIỆT === */}
        <div className="py-6 text-center">
          <GoldShimmerText className="font-display text-2xl md:text-3xl font-medium">
            {getLunarDayVN(lunar.day)}
          </GoldShimmerText>
          <div className="mt-2 text-[var(--lux-mist)] text-sm">
            {getLunarMonthVN(lunar.month, lunar.isLeapMonth)} · Năm {canChi?.year?.split(' ')[1] || lunar.year}
          </div>
        </div>

        {/* === DIVIDER === */}
        <div className="mx-8 h-px bg-[var(--lux-gold)]/20" />

        {/* === NĂM CAN CHI + CON GIÁP === */}
        <div className="py-5 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="text-[var(--lux-gold)] font-display text-xl tracking-wider">
              {canChi?.year || 'N/A'}
            </span>
            <motion.span
              className="text-3xl"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {zodiacInfo.emoji}
            </motion.span>
          </div>
          <div className="mt-1 text-[var(--lux-mist)] text-xs tracking-widest uppercase">
            Năm {zodiacInfo.animal}
          </div>
        </div>

        {/* === CAN CHI CHI TIẾT === */}
        <div className="px-6 py-3 bg-black/20 text-center">
          <div className="flex justify-center gap-6 text-xs text-[var(--lux-mist)]">
            <span>Ngày: <span className="text-[var(--lux-ivory)]">{canChi?.day || 'N/A'}</span></span>
            <span>Tháng: <span className="text-[var(--lux-ivory)]">{canChi?.month || 'N/A'}</span></span>
          </div>
        </div>

        {/* === DIVIDER === */}
        <div className="mx-8 h-px bg-[var(--lux-gold)]/20" />

        {/* === TRỰC & SAO === */}
        <div className="grid grid-cols-2 divide-x divide-[var(--lux-gold)]/10">
          <div className="py-4 text-center">
            <div className="text-[var(--lux-mist)] text-xs mb-1 uppercase tracking-wider">Trực</div>
            <div className={`font-medium ${truc?.type === 'hoangDao' ? 'text-[var(--lux-jade)]' : 'text-[var(--lux-vermillion)]'}`}>
              {truc?.name || 'N/A'}
            </div>
            <div className={`text-xs mt-0.5 px-2 py-0.5 rounded-full inline-block
              ${truc?.type === 'hoangDao'
                ? 'bg-[var(--lux-jade)]/20 text-[var(--lux-jade)]'
                : 'bg-[var(--lux-vermillion)]/20 text-[var(--lux-vermillion)]'
              }
            `}>
              {truc?.type === 'hoangDao' ? 'Hoàng Đạo' : 'Hắc Đạo'}
            </div>
          </div>

          <div className="py-4 text-center">
            <div className="text-[var(--lux-mist)] text-xs mb-1 uppercase tracking-wider">Sao</div>
            <div className={`font-medium ${sao?.type === 'tot' ? 'text-[var(--lux-jade)]' : 'text-[var(--lux-vermillion)]'}`}>
              {sao?.name || 'N/A'}
            </div>
            <div className={`text-xs mt-0.5 px-2 py-0.5 rounded-full inline-block
              ${sao?.type === 'tot'
                ? 'bg-[var(--lux-jade)]/20 text-[var(--lux-jade)]'
                : 'bg-[var(--lux-vermillion)]/20 text-[var(--lux-vermillion)]'
              }
            `}>
              {sao?.type === 'tot' ? 'Cát Tinh' : 'Hung Tinh'}
            </div>
          </div>
        </div>

        {/* === GIỜ HOÀNG ĐẠO === */}
        {hoangDao && hoangDao.length > 0 && (
          <div className="px-6 py-4 bg-black/20">
            <div className="text-[var(--lux-gold)] text-xs mb-2 flex items-center gap-2">
              <span className="text-base">⏰</span>
              <span className="uppercase tracking-wider">Giờ Hoàng Đạo</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {hoangDao.filter(h => h.isHoangDao).slice(0, 6).map((h, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs bg-[var(--lux-jade)]/20 text-[var(--lux-jade)] rounded"
                >
                  {h.name} ({h.period})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* === NÊN / KIÊNG === */}
        {activities && (
          <div className="px-6 py-4">
            {activities.good && activities.good.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center gap-2 text-[var(--lux-jade)] text-xs mb-1">
                  <span>✓</span>
                  <span className="uppercase tracking-wider">Nên làm</span>
                </div>
                <p className="text-[var(--lux-ivory)] text-sm">
                  {activities.good.slice(0, 4).join(' · ')}
                </p>
              </div>
            )}
            {activities.bad && activities.bad.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-[var(--lux-vermillion)] text-xs mb-1">
                  <span>✗</span>
                  <span className="uppercase tracking-wider">Kiêng kỵ</span>
                </div>
                <p className="text-[var(--lux-ivory)] text-sm">
                  {activities.bad.slice(0, 3).join(' · ')}
                </p>
              </div>
            )}
          </div>
        )}

        {/* === QUALITY SCORE FOOTER === */}
        {dayQuality && (
          <div
            className={`
              py-4 text-center font-medium tracking-wider
              ${dayQuality.score >= 80
                ? 'bg-gradient-to-r from-[var(--lux-gold)]/20 via-[var(--lux-gold)]/30 to-[var(--lux-gold)]/20 text-[var(--lux-gold-bright)]'
                : dayQuality.score >= 60
                  ? 'bg-gradient-to-r from-[var(--lux-jade)]/20 via-[var(--lux-jade)]/30 to-[var(--lux-jade)]/20 text-[var(--lux-jade)]'
                  : 'bg-gradient-to-r from-[var(--lux-vermillion)]/20 via-[var(--lux-vermillion)]/30 to-[var(--lux-vermillion)]/20 text-[var(--lux-vermillion)]'
              }
            `}
          >
            <span className="text-2xl font-display">{dayQuality.score}</span>
            <span className="text-sm ml-1">/100</span>
            <span className="ml-3 text-sm uppercase tracking-widest">{dayQuality.label}</span>
          </div>
        )}

        {/* Bottom decorative line */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[var(--lux-gold)] to-transparent" />
      </div>
    </motion.div>
  );
}

// ==============================================
// COMPACT VERSION - Phiên bản nhỏ gọn
// ==============================================

export function LuxuryDayCardCompact({ dayInfo, onClick, isSelected = false }) {
  if (!dayInfo) return null;

  const { solar, lunar, canChi, dayQuality, truc } = dayInfo;
  const isSunday = solar.weekDay === 0;
  const isWeekend = solar.weekDay === 0 || solar.weekDay === 6;

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative w-full p-4 text-left luxury-card
        ${isSelected ? 'border-[var(--lux-gold)]/50 shadow-[var(--lux-glow-gold)]' : ''}
      `}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-4">
        {/* Ngày dương */}
        <div
          className={`
            text-3xl font-display font-semibold
            ${isSunday ? 'text-[var(--lux-vermillion)]' : isWeekend ? 'text-[var(--lux-jade)]' : 'text-[var(--lux-ivory)]'}
          `}
        >
          {solar.day}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="text-sm text-[var(--lux-ivory)]">
            {getLunarDayVN(lunar.day)}
          </div>
          <div className="text-xs text-[var(--lux-mist)]">
            {canChi?.day} · {truc?.name}
          </div>
        </div>

        {/* Quality indicator */}
        {dayQuality && (
          <div
            className={`
              w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
              ${dayQuality.score >= 80
                ? 'bg-[var(--lux-gold)]/20 text-[var(--lux-gold)]'
                : dayQuality.score >= 60
                  ? 'bg-[var(--lux-jade)]/20 text-[var(--lux-jade)]'
                  : 'bg-[var(--lux-vermillion)]/20 text-[var(--lux-vermillion)]'
              }
            `}
          >
            {dayQuality.score}
          </div>
        )}
      </div>
    </motion.button>
  );
}
