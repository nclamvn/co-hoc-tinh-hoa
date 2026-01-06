import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ARROW_MEANINGS } from '../../data/numerologyMeanings';

/**
 * Lo Shu Grid / Inclusion Chart Component
 * 3x3 grid showing number frequency from name + birthdate
 */
export default function InclusionChart({ data, onNumberClick }) {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [showArrowDetails, setShowArrowDetails] = useState(null);

  if (!data) return null;

  const { grid, arrows } = data;

  // Grid layout: 3 6 9 / 2 5 8 / 1 4 7
  const gridLayout = [
    [3, 6, 9],
    [2, 5, 8],
    [1, 4, 7]
  ];

  const planeLabels = {
    0: { name: 'Trí Tuệ', icon: '🧠' },
    1: { name: 'Cảm Xúc', icon: '❤️' },
    2: { name: 'Thực Tế', icon: '💪' }
  };

  const getNumberStyle = (count) => {
    if (count === 0) return 'bg-gray-800/50 text-gray-600 border-gray-700';
    if (count === 1) return 'bg-[var(--color-jade)]/20 text-[var(--color-jade)] border-[var(--color-jade)]/30';
    if (count === 2) return 'bg-[var(--color-gold)]/20 text-[var(--color-gold)] border-[var(--color-gold)]/30';
    if (count >= 3) return 'bg-[var(--color-vermillion)]/20 text-[var(--color-vermillion)] border-[var(--color-vermillion)]/30';
    return '';
  };

  const handleNumberClick = (num) => {
    setSelectedNumber(num);
    if (onNumberClick) onNumberClick(num, grid[num]);
  };

  // Render arrow indicators
  const renderArrows = () => {
    const arrowComponents = [];

    // Horizontal arrows (rows)
    arrows.strength.forEach((arrow, idx) => {
      if (arrow.positions.toString() === '3,6,9') {
        arrowComponents.push(
          <motion.div
            key={`arrow-strength-${idx}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -right-8 top-4 text-[var(--color-jade)] cursor-pointer"
            onClick={() => setShowArrowDetails(arrow)}
          >
            <ArrowRight size={20} />
          </motion.div>
        );
      }
      if (arrow.positions.toString() === '2,5,8') {
        arrowComponents.push(
          <motion.div
            key={`arrow-strength-mid-${idx}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -right-8 top-1/2 -translate-y-1/2 text-[var(--color-jade)] cursor-pointer"
            onClick={() => setShowArrowDetails(arrow)}
          >
            <ArrowRight size={20} />
          </motion.div>
        );
      }
      if (arrow.positions.toString() === '1,4,7') {
        arrowComponents.push(
          <motion.div
            key={`arrow-strength-bottom-${idx}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -right-8 bottom-4 text-[var(--color-jade)] cursor-pointer"
            onClick={() => setShowArrowDetails(arrow)}
          >
            <ArrowRight size={20} />
          </motion.div>
        );
      }
    });

    // Weakness arrows shown in red
    arrows.weakness.forEach((arrow, idx) => {
      if (arrow.positions.toString() === '3,6,9') {
        arrowComponents.push(
          <motion.div
            key={`arrow-weak-${idx}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -right-8 top-4 text-[var(--color-vermillion)] cursor-pointer opacity-50"
            onClick={() => setShowArrowDetails(arrow)}
          >
            <ArrowRight size={20} strokeDasharray="4 2" />
          </motion.div>
        );
      }
    });

    return arrowComponents;
  };

  return (
    <div className="relative">
      {/* Chart Title */}
      <div className="text-center mb-4">
        <h3 className="font-display text-lg text-[var(--color-gold)]">Biểu Đồ Bao Gồm</h3>
        <p className="text-xs text-[var(--color-mist)]">Lo Shu Grid / Inclusion Chart</p>
      </div>

      {/* Main Grid */}
      <div className="relative max-w-[280px] mx-auto">
        <div className="grid grid-cols-3 gap-2 p-4 bg-[var(--color-obsidian)] rounded-xl border border-[var(--color-gold)]/20">
          {gridLayout.map((row, rowIdx) => (
            row.map((num, colIdx) => {
              const count = grid[num] || 0;
              return (
                <motion.button
                  key={num}
                  onClick={() => handleNumberClick(num)}
                  className={`
                    relative aspect-square rounded-lg border-2 flex flex-col items-center justify-center
                    transition-all duration-300 hover:scale-105
                    ${getNumberStyle(count)}
                    ${selectedNumber === num ? 'ring-2 ring-[var(--color-gold)]' : ''}
                  `}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (rowIdx * 3 + colIdx) * 0.05 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl font-display font-bold">{num}</span>
                  {count > 0 && (
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: Math.min(count, 4) }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-current"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        />
                      ))}
                      {count > 4 && <span className="text-xs">+{count - 4}</span>}
                    </div>
                  )}
                  {count === 0 && (
                    <span className="text-xs text-gray-600 mt-1">Thiếu</span>
                  )}
                </motion.button>
              );
            })
          ))}
        </div>

        {/* Plane Labels */}
        <div className="absolute -left-16 top-4 bottom-4 flex flex-col justify-between text-xs text-[var(--color-mist)]">
          {Object.values(planeLabels).map((plane, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <span>{plane.icon}</span>
              <span className="hidden sm:inline">{plane.name}</span>
            </div>
          ))}
        </div>

        {/* Arrow Indicators */}
        {renderArrows()}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-gray-800/50 border border-gray-700" />
          <span className="text-gray-500">Thiếu</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-[var(--color-jade)]/20 border border-[var(--color-jade)]/30" />
          <span className="text-[var(--color-jade)]">1</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-[var(--color-gold)]/20 border border-[var(--color-gold)]/30" />
          <span className="text-[var(--color-gold)]">2</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-[var(--color-vermillion)]/20 border border-[var(--color-vermillion)]/30" />
          <span className="text-[var(--color-vermillion)]">3+</span>
        </div>
      </div>

      {/* Arrows Summary */}
      {(arrows.strength.length > 0 || arrows.weakness.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-[var(--color-charcoal)] rounded-xl"
        >
          <h4 className="text-sm font-semibold text-[var(--color-gold)] mb-3">Các Mũi Tên</h4>

          {arrows.strength.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-[var(--color-jade)] mb-2">✓ Điểm mạnh:</p>
              <div className="flex flex-wrap gap-2">
                {arrows.strength.map((arrow, idx) => (
                  <button
                    key={idx}
                    onClick={() => setShowArrowDetails(arrow)}
                    className="px-3 py-1.5 text-xs bg-[var(--color-jade)]/10 text-[var(--color-jade)] rounded-lg hover:bg-[var(--color-jade)]/20 transition-colors"
                  >
                    {arrow.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {arrows.weakness.length > 0 && (
            <div>
              <p className="text-xs text-[var(--color-vermillion)] mb-2">⚠ Cần cải thiện:</p>
              <div className="flex flex-wrap gap-2">
                {arrows.weakness.map((arrow, idx) => (
                  <button
                    key={idx}
                    onClick={() => setShowArrowDetails(arrow)}
                    className="px-3 py-1.5 text-xs bg-[var(--color-vermillion)]/10 text-[var(--color-vermillion)] rounded-lg hover:bg-[var(--color-vermillion)]/20 transition-colors"
                  >
                    {arrow.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Arrow Details Modal */}
      <AnimatePresence>
        {showArrowDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowArrowDetails(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[var(--color-charcoal)] rounded-2xl p-6 max-w-md w-full border border-[var(--color-gold)]/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display text-xl text-[var(--color-gold)]">
                    {showArrowDetails.name}
                  </h3>
                  <p className="text-sm text-[var(--color-mist)]">
                    Vị trí: {showArrowDetails.positions.join(' - ')}
                  </p>
                </div>
                <button
                  onClick={() => setShowArrowDetails(null)}
                  className="p-2 hover:bg-[var(--color-smoke)] rounded-lg transition-colors"
                >
                  <X size={20} className="text-[var(--color-mist)]" />
                </button>
              </div>

              {/* Get meaning from database */}
              {(() => {
                const key = showArrowDetails.positions.join('-');
                const meaningType = showArrowDetails.type;
                const meaning = ARROW_MEANINGS[meaningType]?.[key];

                if (meaning) {
                  return (
                    <div className="space-y-3">
                      <p className="text-[var(--color-pearl)]">{meaning.description}</p>

                      {meaning.traits && (
                        <div className="flex flex-wrap gap-2">
                          {meaning.traits.map((trait, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs bg-[var(--color-jade)]/20 text-[var(--color-jade)] rounded"
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      )}

                      {meaning.advice && (
                        <div className="p-3 bg-[var(--color-smoke)] rounded-lg">
                          <p className="text-sm text-[var(--color-gold)]">💡 Lời khuyên:</p>
                          <p className="text-sm text-[var(--color-pearl)] mt-1">{meaning.advice}</p>
                        </div>
                      )}
                    </div>
                  );
                }

                return <p className="text-[var(--color-mist)]">Không có thông tin chi tiết.</p>;
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
