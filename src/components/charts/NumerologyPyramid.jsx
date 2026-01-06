import { motion } from 'framer-motion';
import { NUMBER_MEANINGS } from '../../utils/numerologyAdvanced';

/**
 * Numerology Pyramid - Pinnacles & Challenges Visualization
 */
export default function NumerologyPyramid({ pyramidData, currentAge = 0 }) {
  if (!pyramidData) return null;

  const { foundation, pinnacles, challenges } = pyramidData;

  const getNumberColor = (num) => {
    return NUMBER_MEANINGS[num]?.color || 'var(--color-gold)';
  };

  const isCurrentPinnacle = (pinnacle) => {
    if (!pinnacle.endAge) return currentAge >= pinnacle.startAge;
    return currentAge >= pinnacle.startAge && currentAge <= pinnacle.endAge;
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center">
        <h3 className="font-display text-lg text-[var(--color-gold)]">Kim Tự Tháp Đỉnh Cao</h3>
        <p className="text-xs text-[var(--color-mist)]">Các giai đoạn đỉnh cao trong cuộc đời</p>
      </div>

      {/* Pyramid Visualization */}
      <div className="relative py-8">
        {/* Pinnacle 4 - Top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mb-4"
        >
          <PinnacleNode
            pinnacle={pinnacles[3]}
            color={getNumberColor(pinnacles[3].number)}
            isCurrent={isCurrentPinnacle(pinnacles[3])}
            level={4}
          />
        </motion.div>

        {/* Pinnacle 2 & 3 - Middle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-16 md:gap-24 mb-4"
        >
          <PinnacleNode
            pinnacle={pinnacles[1]}
            color={getNumberColor(pinnacles[1].number)}
            isCurrent={isCurrentPinnacle(pinnacles[1])}
            level={2}
          />
          <PinnacleNode
            pinnacle={pinnacles[2]}
            color={getNumberColor(pinnacles[2].number)}
            isCurrent={isCurrentPinnacle(pinnacles[2])}
            level={3}
          />
        </motion.div>

        {/* Pinnacle 1 - Base pinnacle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-4"
        >
          <PinnacleNode
            pinnacle={pinnacles[0]}
            color={getNumberColor(pinnacles[0].number)}
            isCurrent={isCurrentPinnacle(pinnacles[0])}
            level={1}
            isBase
          />
        </motion.div>

        {/* Foundation - Day/Month/Year */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-8 md:gap-16 pt-4 border-t border-[var(--color-gold)]/20"
        >
          <FoundationNode label="Ngày" value={foundation.day} />
          <FoundationNode label="Tháng" value={foundation.month} />
          <FoundationNode label="Năm" value={foundation.year} />
        </motion.div>

        {/* Connecting Lines (decorative) */}
        <svg className="absolute inset-0 pointer-events-none opacity-20" viewBox="0 0 300 200">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-gold)" />
              <stop offset="100%" stopColor="var(--color-jade)" />
            </linearGradient>
          </defs>
          {/* Lines from foundation to pinnacle 1 */}
          <line x1="75" y1="170" x2="150" y2="130" stroke="url(#lineGradient)" strokeWidth="1" />
          <line x1="225" y1="170" x2="150" y2="130" stroke="url(#lineGradient)" strokeWidth="1" />
          {/* Lines from pinnacle 1 to pinnacle 2&3 */}
          <line x1="150" y1="130" x2="90" y2="80" stroke="url(#lineGradient)" strokeWidth="1" />
          <line x1="150" y1="130" x2="210" y2="80" stroke="url(#lineGradient)" strokeWidth="1" />
          {/* Lines from pinnacle 2&3 to pinnacle 4 */}
          <line x1="90" y1="80" x2="150" y2="30" stroke="url(#lineGradient)" strokeWidth="1" />
          <line x1="210" y1="80" x2="150" y2="30" stroke="url(#lineGradient)" strokeWidth="1" />
        </svg>
      </div>

      {/* Pinnacles Detail List */}
      <div className="space-y-2">
        <h4 className="text-sm font-display text-[var(--color-pearl)]">Chi Tiết Đỉnh Cao</h4>
        <div className="grid grid-cols-2 gap-2">
          {pinnacles.map((pinnacle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className={`p-3 rounded-lg border ${
                isCurrentPinnacle(pinnacle)
                  ? 'bg-[var(--color-gold)]/10 border-[var(--color-gold)]'
                  : 'bg-[var(--color-smoke)]/20 border-[var(--color-smoke)]/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[var(--color-mist)]">Đỉnh cao {i + 1}</span>
                <span
                  className="text-lg font-bold"
                  style={{ color: getNumberColor(pinnacle.number) }}
                >
                  {pinnacle.number}
                </span>
              </div>
              <p className="text-[10px] text-[var(--color-mist)]">{pinnacle.period}</p>
              <p className="text-xs text-[var(--color-pearl)] mt-1">{pinnacle.meaning}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Challenges */}
      <div className="space-y-2">
        <h4 className="text-sm font-display text-[var(--color-fire)]">Thử Thách Cuộc Đời</h4>
        <div className="grid grid-cols-2 gap-2">
          {challenges.map((challenge, i) => (
            <div
              key={i}
              className="p-2 rounded-lg bg-[var(--color-fire)]/5 border border-[var(--color-fire)]/20"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--color-mist)]">Thử thách {i + 1}</span>
                <span className="text-sm font-bold text-[var(--color-fire)]">{challenge.number}</span>
              </div>
              <p className="text-[10px] text-[var(--color-mist)] mt-1">{challenge.meaning}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Pinnacle Node Component
function PinnacleNode({ pinnacle, color, isCurrent, level, isBase }) {
  return (
    <motion.div
      className={`relative flex flex-col items-center ${isCurrent ? 'scale-110' : ''}`}
      whileHover={{ scale: 1.1 }}
    >
      {/* Glow effect for current */}
      {isCurrent && (
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-30"
          style={{ backgroundColor: color }}
        />
      )}

      {/* Number circle */}
      <div
        className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 relative z-10 ${
          isCurrent ? 'border-2' : 'border'
        }`}
        style={{
          borderColor: color,
          backgroundColor: isCurrent ? `${color}20` : 'var(--color-charcoal)'
        }}
      >
        <span
          className="text-xl md:text-2xl font-bold"
          style={{ color }}
        >
          {pinnacle.number}
        </span>
      </div>

      {/* Period label */}
      <span className="text-[9px] md:text-[10px] text-[var(--color-mist)] mt-1 text-center whitespace-nowrap">
        {pinnacle.period}
      </span>

      {/* Current indicator */}
      {isCurrent && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[var(--color-jade)] border border-white"
        />
      )}
    </motion.div>
  );
}

// Foundation Node Component
function FoundationNode({ label, value }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 rounded-lg bg-[var(--color-smoke)]/30 flex items-center justify-center">
        <span className="text-lg font-bold text-[var(--color-ivory)]">{value}</span>
      </div>
      <span className="text-[10px] text-[var(--color-mist)] mt-1">{label}</span>
    </div>
  );
}
