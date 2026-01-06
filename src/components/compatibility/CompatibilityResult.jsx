import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Star, AlertTriangle, CheckCircle, ChevronDown, ChevronUp,
  Sparkles, RefreshCw, Download, Share2
} from 'lucide-react';
import CompatibilityRadar from './CompatibilityRadar';

export default function CompatibilityResult({ result, onReset }) {
  const [expandedSection, setExpandedSection] = useState(null);

  if (!result) return null;

  const { person1, person2, relationshipType, result: compatResult } = result;
  const { overall, category, breakdown, strengths, challenges, advice, insights } = compatResult;

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Score circle animation
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (overall / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Header with Both People */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-gradient-to-r from-[var(--color-vermillion)]/10 via-[var(--color-gold)]/10 to-[var(--color-jade)]/10 rounded-2xl border border-[var(--color-gold)]/20"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Person 1 */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[var(--color-vermillion)]/20 flex items-center justify-center text-2xl">
              {person1.zodiacInfo?.emoji || '👤'}
            </div>
            <div>
              <p className="font-semibold text-[var(--color-pearl)]">{person1.name}</p>
              <p className="text-sm text-[var(--color-mist)]">
                {person1.zodiacInfo?.animal} • {person1.elementInfo?.name}
              </p>
            </div>
          </div>

          {/* Heart with Score */}
          <motion.div
            className="relative"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg width="100" height="100" className="transform -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="var(--color-charcoal)"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke={category.color}
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference - (overall / 100) * circumference }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold" style={{ color: category.color }}>
                {overall}%
              </span>
              <span className="text-lg">{category.emoji}</span>
            </div>
          </motion.div>

          {/* Person 2 */}
          <div className="flex items-center gap-3 flex-row-reverse">
            <div className="w-14 h-14 rounded-full bg-[var(--color-jade)]/20 flex items-center justify-center text-2xl">
              {person2.zodiacInfo?.emoji || '👤'}
            </div>
            <div className="text-right">
              <p className="font-semibold text-[var(--color-pearl)]">{person2.name}</p>
              <p className="text-sm text-[var(--color-mist)]">
                {person2.zodiacInfo?.animal} • {person2.elementInfo?.name}
              </p>
            </div>
          </div>
        </div>

        {/* Category Label */}
        <div className="text-center mt-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl font-display"
            style={{ color: category.color }}
          >
            {category.label}
          </motion.p>
          <p className="text-sm text-[var(--color-mist)] mt-1">
            {relationshipType.name} • {relationshipType.icon}
          </p>
        </div>
      </motion.div>

      {/* Radar Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="p-6 bg-[var(--color-charcoal)] rounded-2xl"
      >
        <h3 className="font-semibold text-[var(--color-gold)] mb-4 flex items-center gap-2">
          <Star size={18} />
          Biểu Đồ Tương Hợp
        </h3>
        <CompatibilityRadar breakdown={breakdown} />
      </motion.div>

      {/* Detailed Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-3"
      >
        <h3 className="font-semibold text-[var(--color-gold)] flex items-center gap-2">
          <Sparkles size={18} />
          Phân Tích Chi Tiết
        </h3>

        {Object.entries(breakdown).map(([key, data], idx) => {
          const labels = {
            zodiac: { name: 'Hợp Con Giáp', icon: '🐲' },
            element: { name: 'Hợp Ngũ Hành', icon: '🔥' },
            lifePath: { name: 'Hợp Số Chủ Đạo', icon: '#️⃣' },
            expression: { name: 'Hợp Số Biểu Đạt', icon: '✨' },
            soulUrge: { name: 'Hợp Số Linh Hồn', icon: '💫' }
          };

          const label = labels[key] || { name: key, icon: '📊' };

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="bg-[var(--color-charcoal)] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection(key)}
                className="w-full p-4 flex items-center justify-between hover:bg-[var(--color-smoke)] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{label.icon}</span>
                  <span className="text-[var(--color-pearl)]">{label.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-[var(--color-smoke)] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: data.score >= 75 ? 'var(--color-jade)' :
                          data.score >= 55 ? 'var(--color-gold)' : 'var(--color-vermillion)'
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${data.score}%` }}
                      transition={{ duration: 0.8, delay: 0.5 + idx * 0.1 }}
                    />
                  </div>
                  <span className="text-sm font-medium text-[var(--color-gold)] w-10">
                    {data.score}%
                  </span>
                  {expandedSection === key ? (
                    <ChevronUp size={18} className="text-[var(--color-mist)]" />
                  ) : (
                    <ChevronDown size={18} className="text-[var(--color-mist)]" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {expandedSection === key && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-4"
                  >
                    <div className="pt-2 border-t border-[var(--color-gold)]/10">
                      {data.meaning && (
                        <p className="text-sm text-[var(--color-pearl)] mb-2">{data.meaning}</p>
                      )}
                      {data.description && (
                        <p className="text-sm text-[var(--color-mist)]">{data.description}</p>
                      )}
                      {data.detail && (
                        <p className="text-sm text-[var(--color-mist)] mt-1">{data.detail}</p>
                      )}
                      {data.person1 !== undefined && data.person2 !== undefined && (
                        <div className="flex gap-4 mt-2 text-sm">
                          <span className="text-[var(--color-vermillion)]">
                            {person1.name.split(' ').pop()}: {data.person1?.zodiac || data.person1?.element || data.person1}
                          </span>
                          <span className="text-[var(--color-jade)]">
                            {person2.name.split(' ').pop()}: {data.person2?.zodiac || data.person2?.element || data.person2}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Strengths & Challenges */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Strengths */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="p-4 bg-[var(--color-jade)]/10 rounded-xl border border-[var(--color-jade)]/20"
        >
          <h4 className="font-semibold text-[var(--color-jade)] mb-3 flex items-center gap-2">
            <CheckCircle size={18} />
            Điểm Mạnh
          </h4>
          {strengths.length > 0 ? (
            <ul className="space-y-2">
              {strengths.map((s, i) => (
                <li key={i} className="text-sm text-[var(--color-pearl)] flex items-start gap-2">
                  <span className="text-[var(--color-jade)]">•</span>
                  {s.description}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[var(--color-mist)]">Đang phân tích...</p>
          )}
        </motion.div>

        {/* Challenges */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="p-4 bg-[var(--color-vermillion)]/10 rounded-xl border border-[var(--color-vermillion)]/20"
        >
          <h4 className="font-semibold text-[var(--color-vermillion)] mb-3 flex items-center gap-2">
            <AlertTriangle size={18} />
            Cần Chú Ý
          </h4>
          {challenges.length > 0 ? (
            <ul className="space-y-2">
              {challenges.map((c, i) => (
                <li key={i} className="text-sm text-[var(--color-pearl)] flex items-start gap-2">
                  <span className="text-[var(--color-vermillion)]">•</span>
                  {c.description}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[var(--color-jade)]">Không có điểm cần chú ý đặc biệt!</p>
          )}
        </motion.div>
      </div>

      {/* Advice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="p-6 bg-gradient-to-br from-[var(--color-gold)]/10 to-[var(--color-jade)]/10 rounded-2xl border border-[var(--color-gold)]/20"
      >
        <h4 className="font-semibold text-[var(--color-gold)] mb-3 flex items-center gap-2">
          <Sparkles size={18} />
          Lời Khuyên Từ Đại Sư
        </h4>
        <div className="space-y-3">
          {advice.map((a, i) => (
            <p key={i} className="text-sm text-[var(--color-pearl)]">
              {a.text}
            </p>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        <button
          onClick={onReset}
          className="px-6 py-3 bg-[var(--color-charcoal)] border border-[var(--color-gold)]/30 text-[var(--color-gold)] rounded-xl hover:bg-[var(--color-gold)]/10 transition-colors flex items-center gap-2"
        >
          <RefreshCw size={18} />
          Xem Cặp Khác
        </button>
        <button className="px-6 py-3 bg-[var(--color-charcoal)] border border-[var(--color-jade)]/30 text-[var(--color-jade)] rounded-xl hover:bg-[var(--color-jade)]/10 transition-colors flex items-center gap-2">
          <Download size={18} />
          Tải Báo Cáo
        </button>
        <button className="px-6 py-3 bg-[var(--color-charcoal)] border border-[var(--color-pearl)]/30 text-[var(--color-pearl)] rounded-xl hover:bg-[var(--color-pearl)]/10 transition-colors flex items-center gap-2">
          <Share2 size={18} />
          Chia Sẻ
        </button>
      </motion.div>
    </div>
  );
}
