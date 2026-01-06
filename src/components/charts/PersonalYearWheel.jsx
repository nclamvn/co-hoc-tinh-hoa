import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sun, Moon, Star } from 'lucide-react';
import { PERSONAL_YEAR_MEANINGS } from '../../data/numerologyMeanings';

/**
 * Personal Year Wheel Component
 * Interactive wheel showing 9-year cycle with current position
 */
export default function PersonalYearWheel({ calculator, currentYear = new Date().getFullYear() }) {
  const [selectedYear, setSelectedYear] = useState(currentYear);

  if (!calculator) return null;

  // Generate 9-year cycle data
  const cycleData = useMemo(() => {
    const data = [];
    const startYear = selectedYear - 4; // Center selected year

    for (let i = 0; i < 9; i++) {
      const year = startYear + i;
      const py = calculator.getPersonalYear(year);
      data.push({
        year,
        personalYear: py.value,
        isCurrent: year === currentYear,
        isSelected: year === selectedYear
      });
    }
    return data;
  }, [calculator, selectedYear, currentYear]);

  // Get current personal year details
  const currentPY = calculator.getPersonalYear(selectedYear);
  const pyMeaning = PERSONAL_YEAR_MEANINGS[currentPY.value];

  // Navigate years
  const goToYear = (direction) => {
    setSelectedYear(prev => prev + direction);
  };

  // SVG Wheel calculation
  const wheelRadius = 120;
  const centerX = 150;
  const centerY = 150;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center">
        <h3 className="font-display text-lg text-[var(--color-gold)]">Bánh Xe Năm Cá Nhân</h3>
        <p className="text-xs text-[var(--color-mist)]">Chu kỳ 9 năm của bạn</p>
      </div>

      {/* Year Navigation */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => goToYear(-1)}
          className="p-2 rounded-lg hover:bg-[var(--color-smoke)] transition-colors"
        >
          <ChevronLeft size={24} className="text-[var(--color-mist)]" />
        </button>
        <div className="text-center">
          <motion.div
            key={selectedYear}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-display font-bold text-[var(--color-gold)]"
          >
            {selectedYear}
          </motion.div>
          {selectedYear === currentYear && (
            <span className="text-xs text-[var(--color-jade)]">Năm hiện tại</span>
          )}
        </div>
        <button
          onClick={() => goToYear(1)}
          className="p-2 rounded-lg hover:bg-[var(--color-smoke)] transition-colors"
        >
          <ChevronRight size={24} className="text-[var(--color-mist)]" />
        </button>
      </div>

      {/* Wheel Visualization */}
      <div className="relative flex justify-center">
        <svg width="300" height="300" viewBox="0 0 300 300">
          {/* Background Circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={wheelRadius + 10}
            fill="none"
            stroke="var(--color-gold)"
            strokeOpacity="0.1"
            strokeWidth="2"
          />

          {/* Year Nodes */}
          {cycleData.map((item, idx) => {
            const angle = (idx * 40 - 90) * (Math.PI / 180); // Start from top
            const x = centerX + wheelRadius * Math.cos(angle);
            const y = centerY + wheelRadius * Math.sin(angle);

            return (
              <g key={item.year}>
                {/* Connection Line */}
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={x}
                  y2={y}
                  stroke="var(--color-gold)"
                  strokeOpacity="0.1"
                  strokeWidth="1"
                />

                {/* Year Circle */}
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedYear(item.year)}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={item.isSelected ? 28 : 22}
                    fill={item.isSelected ? 'var(--color-gold)' : 'var(--color-charcoal)'}
                    stroke={item.isCurrent ? 'var(--color-jade)' : 'var(--color-gold)'}
                    strokeWidth={item.isCurrent ? 3 : 1}
                    strokeOpacity={item.isSelected ? 1 : 0.3}
                  />
                  <text
                    x={x}
                    y={y - 4}
                    textAnchor="middle"
                    fill={item.isSelected ? 'var(--color-obsidian)' : 'var(--color-gold)'}
                    fontSize="14"
                    fontWeight="bold"
                  >
                    {item.personalYear}
                  </text>
                  <text
                    x={x}
                    y={y + 10}
                    textAnchor="middle"
                    fill={item.isSelected ? 'var(--color-obsidian)' : 'var(--color-mist)'}
                    fontSize="8"
                  >
                    {item.year}
                  </text>
                </motion.g>
              </g>
            );
          })}

          {/* Center Circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r="40"
            fill="var(--color-charcoal)"
            stroke="var(--color-gold)"
            strokeWidth="2"
          />
          <text
            x={centerX}
            y={centerY - 8}
            textAnchor="middle"
            fill="var(--color-gold)"
            fontSize="24"
            fontWeight="bold"
          >
            {currentPY.value}
          </text>
          <text
            x={centerX}
            y={centerY + 10}
            textAnchor="middle"
            fill="var(--color-mist)"
            fontSize="10"
          >
            Năm Cá Nhân
          </text>
        </svg>

        {/* Current Position Indicator */}
        {cycleData.find(d => d.isSelected)?.isCurrent && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-2 right-2 p-2 bg-[var(--color-jade)]/20 rounded-lg"
          >
            <Star size={16} className="text-[var(--color-jade)]" fill="currentColor" />
          </motion.div>
        )}
      </div>

      {/* Personal Year Details */}
      {pyMeaning && (
        <motion.div
          key={selectedYear}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-[var(--color-charcoal)] rounded-xl border border-[var(--color-gold)]/20"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-gold)]/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-[var(--color-gold)]">{currentPY.value}</span>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--color-gold)]">{pyMeaning.title}</h4>
              <p className="text-xs text-[var(--color-mist)]">{pyMeaning.theme}</p>
            </div>
          </div>

          {/* Opportunities */}
          <div className="mb-3">
            <p className="text-xs text-[var(--color-jade)] mb-2">✨ Cơ hội trong năm:</p>
            <div className="flex flex-wrap gap-2">
              {pyMeaning.opportunities.map((opp, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs bg-[var(--color-jade)]/10 text-[var(--color-jade)] rounded"
                >
                  {opp}
                </span>
              ))}
            </div>
          </div>

          {/* Advice */}
          <div className="p-3 bg-[var(--color-smoke)] rounded-lg">
            <p className="text-xs text-[var(--color-gold)]">💡 Lời khuyên:</p>
            <p className="text-sm text-[var(--color-pearl)] mt-1">{pyMeaning.advice}</p>
          </div>
        </motion.div>
      )}

      {/* Monthly Forecast Mini */}
      <div className="grid grid-cols-6 gap-1">
        {Array.from({ length: 12 }, (_, i) => {
          const pm = calculator.getPersonalMonth(selectedYear, i + 1);
          const monthNames = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
          const currentMonth = new Date().getMonth();
          const isCurrent = selectedYear === currentYear && i === currentMonth;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className={`
                p-2 rounded-lg text-center transition-all cursor-default
                ${isCurrent
                  ? 'bg-[var(--color-jade)]/20 border border-[var(--color-jade)]/50'
                  : 'bg-[var(--color-charcoal)] border border-[var(--color-gold)]/10'
                }
              `}
              title={`Tháng ${i + 1}: Năng lượng số ${pm.value}`}
            >
              <p className="text-xs text-[var(--color-mist)]">{monthNames[i]}</p>
              <p className={`text-lg font-bold ${isCurrent ? 'text-[var(--color-jade)]' : 'text-[var(--color-gold)]'}`}>
                {pm.value}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 text-xs text-[var(--color-mist)]">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[var(--color-jade)]" />
          <span>Hiện tại</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[var(--color-gold)]" />
          <span>Đã chọn</span>
        </div>
      </div>
    </div>
  );
}
