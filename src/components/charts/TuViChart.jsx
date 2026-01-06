import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Info } from 'lucide-react';

/**
 * Tu Vi Chart - 12 Palace Visualization
 * Traditional square layout with interactive cells
 */
export default function TuViChart({ chartData, onPalaceClick }) {
  const [selectedPalace, setSelectedPalace] = useState(null);

  if (!chartData || !chartData.palaces) {
    return (
      <div className="text-center p-8 text-[var(--color-mist)]">
        Không có dữ liệu lá số
      </div>
    );
  }

  // Map palaces to grid positions (traditional layout)
  // Grid layout:
  //  3  4  5  6
  //  2        7
  //  1        8
  //  0 11 10  9
  const gridPositions = [
    { row: 4, col: 1 }, // 0 - Tý (bottom-left)
    { row: 3, col: 1 }, // 1 - Sửu
    { row: 2, col: 1 }, // 2 - Dần
    { row: 1, col: 1 }, // 3 - Mão (top-left)
    { row: 1, col: 2 }, // 4 - Thìn
    { row: 1, col: 3 }, // 5 - Tỵ
    { row: 1, col: 4 }, // 6 - Ngọ (top-right)
    { row: 2, col: 4 }, // 7 - Mùi
    { row: 3, col: 4 }, // 8 - Thân
    { row: 4, col: 4 }, // 9 - Dậu (bottom-right)
    { row: 4, col: 3 }, // 10 - Tuất
    { row: 4, col: 2 }, // 11 - Hợi
  ];

  const handlePalaceClick = (palace) => {
    setSelectedPalace(palace);
    if (onPalaceClick) onPalaceClick(palace);
  };

  const getPalaceColor = (palace) => {
    if (palace.isMenh) return 'var(--color-gold)';
    if (palace.isThan) return 'var(--color-jade)';
    if (palace.mainStars.length >= 2) return 'var(--color-fire)';
    return 'var(--color-mist)';
  };

  const getStarRating = (count) => {
    return '★'.repeat(Math.min(count, 4)) + '☆'.repeat(Math.max(0, 4 - count));
  };

  return (
    <div className="relative">
      {/* Chart Grid */}
      <div className="grid grid-cols-4 gap-1 md:gap-2 aspect-square max-w-xl mx-auto">
        {/* Top Row */}
        {[3, 4, 5, 6].map((idx) => (
          <PalaceCell
            key={idx}
            palace={chartData.palaces[idx]}
            color={getPalaceColor(chartData.palaces[idx])}
            onClick={() => handlePalaceClick(chartData.palaces[idx])}
            position="top"
          />
        ))}

        {/* Middle Rows */}
        {/* Row 2: Left side, center info, right side */}
        <PalaceCell
          palace={chartData.palaces[2]}
          color={getPalaceColor(chartData.palaces[2])}
          onClick={() => handlePalaceClick(chartData.palaces[2])}
          position="left"
        />

        {/* Center Info - spans 2x2 */}
        <div className="col-span-2 row-span-2 bg-gradient-to-br from-[var(--color-charcoal)] to-[var(--color-obsidian)] rounded-xl border border-[var(--color-gold)]/30 p-3 md:p-4 flex flex-col items-center justify-center">
          <div className="text-3xl md:text-4xl mb-2">
            {chartData.lunarDate?.yearGanZhi?.includes('Tý') ? '🐀' :
             chartData.lunarDate?.yearGanZhi?.includes('Sửu') ? '🐂' :
             chartData.lunarDate?.yearGanZhi?.includes('Dần') ? '🐅' :
             chartData.lunarDate?.yearGanZhi?.includes('Mão') ? '🐇' :
             chartData.lunarDate?.yearGanZhi?.includes('Thìn') ? '🐉' :
             chartData.lunarDate?.yearGanZhi?.includes('Tỵ') ? '🐍' :
             chartData.lunarDate?.yearGanZhi?.includes('Ngọ') ? '🐴' :
             chartData.lunarDate?.yearGanZhi?.includes('Mùi') ? '🐐' :
             chartData.lunarDate?.yearGanZhi?.includes('Thân') ? '🐒' :
             chartData.lunarDate?.yearGanZhi?.includes('Dậu') ? '🐓' :
             chartData.lunarDate?.yearGanZhi?.includes('Tuất') ? '🐕' : '🐖'}
          </div>
          <h3 className="font-display text-lg md:text-xl text-[var(--color-gold)] text-center">
            {chartData.lunarDate?.yearGanZhi}
          </h3>
          <p className="text-xs md:text-sm text-[var(--color-jade)] mt-1">
            {chartData.cuc?.name}
          </p>
          <div className="mt-2 text-center">
            <p className="text-[10px] md:text-xs text-[var(--color-mist)]">
              {chartData.gender === 'male' ? 'Nam' : chartData.gender === 'female' ? 'Nữ' : 'Khác'} • {chartData.currentAge} tuổi
            </p>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="px-2 py-1 rounded bg-[var(--color-gold)]/20 text-[var(--color-gold)]">
              Mệnh: {chartData.menhChi}
            </span>
            <span className="px-2 py-1 rounded bg-[var(--color-jade)]/20 text-[var(--color-jade)]">
              Thân: {chartData.thanChi}
            </span>
          </div>
        </div>

        <PalaceCell
          palace={chartData.palaces[7]}
          color={getPalaceColor(chartData.palaces[7])}
          onClick={() => handlePalaceClick(chartData.palaces[7])}
          position="right"
        />

        {/* Row 3 */}
        <PalaceCell
          palace={chartData.palaces[1]}
          color={getPalaceColor(chartData.palaces[1])}
          onClick={() => handlePalaceClick(chartData.palaces[1])}
          position="left"
        />
        {/* Center continues */}
        <PalaceCell
          palace={chartData.palaces[8]}
          color={getPalaceColor(chartData.palaces[8])}
          onClick={() => handlePalaceClick(chartData.palaces[8])}
          position="right"
        />

        {/* Bottom Row */}
        {[0, 11, 10, 9].map((idx) => (
          <PalaceCell
            key={idx}
            palace={chartData.palaces[idx]}
            color={getPalaceColor(chartData.palaces[idx])}
            onClick={() => handlePalaceClick(chartData.palaces[idx])}
            position="bottom"
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[var(--color-gold)]" />
          <span className="text-[var(--color-mist)]">Mệnh</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[var(--color-jade)]" />
          <span className="text-[var(--color-mist)]">Thân</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[var(--color-fire)]" />
          <span className="text-[var(--color-mist)]">Đa sao</span>
        </div>
      </div>

      {/* Palace Detail Modal */}
      <AnimatePresence>
        {selectedPalace && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={() => setSelectedPalace(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[var(--color-charcoal)] rounded-2xl p-6 max-w-md w-full border border-[var(--color-gold)]/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                    style={{ backgroundColor: `${getPalaceColor(selectedPalace)}20`, color: getPalaceColor(selectedPalace) }}
                  >
                    {selectedPalace.diaChi}
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-[var(--color-ivory)]">
                      Cung {selectedPalace.palace?.name}
                    </h3>
                    <p className="text-sm text-[var(--color-mist)]">
                      {selectedPalace.palace?.meaning}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPalace(null)}
                  className="text-[var(--color-mist)] hover:text-[var(--color-ivory)]"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Tags */}
              <div className="flex gap-2 mb-4">
                {selectedPalace.isMenh && (
                  <span className="px-2 py-1 rounded text-xs bg-[var(--color-gold)]/20 text-[var(--color-gold)]">
                    Cung Mệnh
                  </span>
                )}
                {selectedPalace.isThan && (
                  <span className="px-2 py-1 rounded text-xs bg-[var(--color-jade)]/20 text-[var(--color-jade)]">
                    Cung Thân
                  </span>
                )}
                <span className="px-2 py-1 rounded text-xs bg-[var(--color-smoke)] text-[var(--color-mist)]">
                  {selectedPalace.palace?.ageRange}
                </span>
              </div>

              {/* Stars */}
              <div className="space-y-3">
                <h4 className="text-sm font-display text-[var(--color-pearl)]">
                  <Star size={14} className="inline mr-2 text-[var(--color-gold)]" />
                  Sao trong cung
                </h4>
                {selectedPalace.mainStars.length > 0 ? (
                  <div className="space-y-2">
                    {selectedPalace.mainStars.map((star, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-[var(--color-smoke)]/30 border border-[var(--color-gold)]/10"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[var(--color-gold)] font-medium">{star.name}</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-[var(--color-gold)]/10 text-[var(--color-gold)]">
                            {star.element}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--color-mist)] mt-1">{star.nature}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[var(--color-mist)] italic">
                    Không có chính tinh trong cung này
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Individual Palace Cell Component
function PalaceCell({ palace, color, onClick, position }) {
  if (!palace) return <div className="bg-[var(--color-smoke)]/20 rounded-lg" />;

  const hasStars = palace.mainStars && palace.mainStars.length > 0;

  return (
    <motion.button
      onClick={onClick}
      className={`relative p-1.5 md:p-2 rounded-lg border transition-all text-left ${
        palace.isMenh
          ? 'bg-[var(--color-gold)]/10 border-[var(--color-gold)]/50'
          : palace.isThan
          ? 'bg-[var(--color-jade)]/10 border-[var(--color-jade)]/50'
          : 'bg-[var(--color-smoke)]/20 border-[var(--color-smoke)]/50 hover:border-[var(--color-gold)]/30'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Position Name */}
      <div className="flex items-center justify-between mb-1">
        <span
          className="text-[10px] md:text-xs font-bold"
          style={{ color }}
        >
          {palace.diaChi}
        </span>
        {(palace.isMenh || palace.isThan) && (
          <span className="text-[8px] md:text-[10px] text-[var(--color-gold)]">
            {palace.isMenh ? '命' : '身'}
          </span>
        )}
      </div>

      {/* Palace Name */}
      <div className="text-[8px] md:text-[10px] text-[var(--color-mist)] mb-1">
        {palace.palace?.name}
      </div>

      {/* Stars */}
      {hasStars && (
        <div className="space-y-0.5">
          {palace.mainStars.slice(0, 2).map((star, idx) => (
            <div
              key={idx}
              className="text-[8px] md:text-[10px] text-[var(--color-gold)] truncate"
            >
              ★ {star.name}
            </div>
          ))}
          {palace.mainStars.length > 2 && (
            <div className="text-[8px] text-[var(--color-mist)]">
              +{palace.mainStars.length - 2} sao
            </div>
          )}
        </div>
      )}

      {/* Star Rating Dots */}
      <div className="absolute bottom-1 right-1 flex gap-0.5">
        {[...Array(Math.min(palace.mainStars?.length || 0, 4))].map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </motion.button>
  );
}
