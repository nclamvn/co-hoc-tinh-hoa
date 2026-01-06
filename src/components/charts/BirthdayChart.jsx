import { motion } from 'framer-motion';
import { NUMBER_MEANINGS } from '../../utils/numerologyAdvanced';

/**
 * Birthday Chart - 3x3 Grid Visualization
 * Shows which numbers appear in the birth date
 */
export default function BirthdayChart({ chartData }) {
  if (!chartData) return null;

  const { counts, planes, arrows, missingNumbers, dominantNumbers } = chartData;

  const getCellStyle = (num) => {
    const count = counts[num] || 0;
    const meaning = NUMBER_MEANINGS[num];

    if (count === 0) {
      return {
        bg: 'bg-[var(--color-smoke)]/20',
        border: 'border-[var(--color-smoke)]/30',
        text: 'text-[var(--color-mist)]/30',
        filled: false
      };
    }

    return {
      bg: count > 1 ? 'bg-[var(--color-gold)]/20' : 'bg-[var(--color-jade)]/10',
      border: count > 1 ? 'border-[var(--color-gold)]' : 'border-[var(--color-jade)]/50',
      text: 'text-[var(--color-ivory)]',
      color: meaning?.color || 'var(--color-gold)',
      filled: true
    };
  };

  const gridLayout = [
    [3, 6, 9], // Mental plane
    [2, 5, 8], // Emotional plane
    [1, 4, 7], // Physical plane
  ];

  const planeLabels = ['Trí Não', 'Tình Cảm', 'Thể Chất'];
  const columnLabels = ['Suy Nghĩ', 'Ý Chí', 'Hành Động'];

  return (
    <div className="space-y-4">
      {/* Chart Title */}
      <div className="text-center mb-4">
        <h3 className="font-display text-lg text-[var(--color-gold)]">Biểu Đồ Ngày Sinh</h3>
        <p className="text-xs text-[var(--color-mist)]">Các con số xuất hiện trong ngày sinh của bạn</p>
      </div>

      {/* 3x3 Grid */}
      <div className="relative">
        {/* Column Labels */}
        <div className="grid grid-cols-3 gap-2 mb-2 ml-16">
          {columnLabels.map((label, i) => (
            <div key={i} className="text-center text-[10px] text-[var(--color-mist)]">
              {label}
            </div>
          ))}
        </div>

        <div className="flex">
          {/* Row Labels */}
          <div className="flex flex-col justify-around pr-2 w-14">
            {planeLabels.map((label, i) => (
              <div key={i} className="text-right text-[10px] text-[var(--color-mist)] py-4">
                {label}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex-1 grid grid-cols-3 gap-2">
            {gridLayout.flat().map((num, i) => {
              const style = getCellStyle(num);
              const count = counts[num] || 0;

              return (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`aspect-square rounded-xl border-2 ${style.bg} ${style.border} flex flex-col items-center justify-center relative overflow-hidden`}
                >
                  {/* Background glow for filled cells */}
                  {style.filled && (
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: `radial-gradient(circle at center, ${style.color} 0%, transparent 70%)`
                      }}
                    />
                  )}

                  {/* Number */}
                  <span
                    className={`text-2xl md:text-3xl font-display ${style.text} relative z-10`}
                    style={style.filled ? { color: style.color } : {}}
                  >
                    {num}
                  </span>

                  {/* Count indicator */}
                  {count > 0 && (
                    <div className="absolute bottom-1 right-1 flex gap-0.5">
                      {[...Array(Math.min(count, 4))].map((_, j) => (
                        <div
                          key={j}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: style.color }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Arrows Found */}
      {arrows.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <h4 className="text-sm font-display text-[var(--color-pearl)]">Mũi Tên Đặc Biệt</h4>
          <div className="flex flex-wrap gap-2">
            {arrows.map((arrow, i) => (
              <div
                key={i}
                className="px-3 py-2 rounded-lg bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30"
              >
                <span className="text-sm text-[var(--color-gold)]">{arrow.name}</span>
                <p className="text-[10px] text-[var(--color-mist)]">{arrow.meaning}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Analysis Summary */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {/* Missing Numbers */}
        <div className="p-3 rounded-xl bg-[var(--color-smoke)]/20 border border-[var(--color-smoke)]/30">
          <h4 className="text-xs font-display text-[var(--color-mist)] mb-2">Số Thiếu</h4>
          {missingNumbers.length > 0 ? (
            <div className="flex gap-1">
              {missingNumbers.map(num => (
                <span key={num} className="w-6 h-6 rounded bg-[var(--color-smoke)]/30 text-[var(--color-mist)] text-sm flex items-center justify-center">
                  {num}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-xs text-[var(--color-jade)]">Không có số thiếu!</span>
          )}
        </div>

        {/* Dominant Numbers */}
        <div className="p-3 rounded-xl bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30">
          <h4 className="text-xs font-display text-[var(--color-gold)] mb-2">Số Nổi Bật</h4>
          {dominantNumbers.length > 0 ? (
            <div className="flex gap-1">
              {dominantNumbers.map(({ number, count }) => (
                <span
                  key={number}
                  className="px-2 py-1 rounded text-sm flex items-center gap-1"
                  style={{
                    backgroundColor: `${NUMBER_MEANINGS[number]?.color}20`,
                    color: NUMBER_MEANINGS[number]?.color
                  }}
                >
                  {number} <span className="text-[10px]">×{count}</span>
                </span>
              ))}
            </div>
          ) : (
            <span className="text-xs text-[var(--color-mist)]">Các số xuất hiện đều</span>
          )}
        </div>
      </div>

      {/* Planes Analysis */}
      <div className="space-y-2 mt-4">
        <h4 className="text-sm font-display text-[var(--color-pearl)]">Phân Tích Bình Diện</h4>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(planes).slice(0, 3).map(([key, plane]) => (
            <div
              key={key}
              className="p-2 rounded-lg bg-[var(--color-smoke)]/20 text-center"
            >
              <div className="text-lg font-bold text-[var(--color-gold)]">{plane.total}</div>
              <div className="text-[10px] text-[var(--color-mist)]">
                {key === 'mental' ? 'Trí Não' : key === 'emotional' ? 'Tình Cảm' : 'Thể Chất'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
