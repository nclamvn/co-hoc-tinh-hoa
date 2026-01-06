import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Star, Mountain, Flame } from 'lucide-react';
import { PINNACLE_MEANINGS, CHALLENGE_MEANINGS } from '../../data/numerologyMeanings';

/**
 * Life Timeline Component
 * Shows Life Cycles, Pinnacles, and Challenges across age ranges
 */
export default function LifeTimeline({ lifeCycles, pinnacles, challenges, currentAge = 30 }) {
  const [activeView, setActiveView] = useState('timeline'); // timeline, pinnacles, challenges

  if (!lifeCycles || !pinnacles || !challenges) return null;

  // Calculate current period
  const getCurrentPinnacle = () => {
    const { pinnacles: pins, firstEnd } = pinnacles;
    if (currentAge <= firstEnd) return 0;
    if (currentAge <= firstEnd + 9) return 1;
    if (currentAge <= firstEnd + 18) return 2;
    return 3;
  };

  const getCurrentCycle = () => {
    const { firstCycleEnd, secondCycleEnd } = lifeCycles;
    if (currentAge <= firstCycleEnd) return 0;
    if (currentAge <= secondCycleEnd) return 1;
    return 2;
  };

  const currentPinnacleIdx = getCurrentPinnacle();
  const currentCycleIdx = getCurrentCycle();

  return (
    <div className="space-y-6">
      {/* View Tabs */}
      <div className="flex justify-center gap-2">
        {[
          { id: 'timeline', label: 'Tổng Quan', icon: Calendar },
          { id: 'pinnacles', label: 'Đỉnh Cao', icon: Mountain },
          { id: 'challenges', label: 'Thử Thách', icon: Flame }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveView(id)}
            className={`
              px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all
              ${activeView === id
                ? 'bg-[var(--color-gold)]/20 text-[var(--color-gold)] border border-[var(--color-gold)]/30'
                : 'text-[var(--color-mist)] hover:text-[var(--color-pearl)] hover:bg-[var(--color-smoke)]'
              }
            `}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {/* Timeline View */}
      {activeView === 'timeline' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative"
        >
          {/* Current Age Marker */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-gold)]/20 rounded-full">
              <Star size={16} className="text-[var(--color-gold)]" />
              <span className="text-[var(--color-gold)] font-medium">Tuổi hiện tại: {currentAge}</span>
            </div>
          </div>

          {/* Life Cycles */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-[var(--color-gold)] mb-4 flex items-center gap-2">
              <Calendar size={16} />
              Chu Kỳ Đời
            </h4>
            <div className="flex gap-2">
              {lifeCycles.cycles.map((cycle, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`
                    flex-1 p-4 rounded-xl border-2 transition-all
                    ${currentCycleIdx === idx
                      ? 'bg-[var(--color-jade)]/20 border-[var(--color-jade)]/50'
                      : 'bg-[var(--color-charcoal)] border-[var(--color-gold)]/10'
                    }
                  `}
                >
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-[var(--color-gold)]">
                      {cycle.value}
                    </div>
                    <p className="text-xs text-[var(--color-mist)] mt-1">{cycle.name}</p>
                    <p className="text-xs text-[var(--color-pearl)] mt-2">Tuổi: {cycle.ageRange}</p>
                    <p className="text-xs text-[var(--color-mist)]">{cycle.source}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pinnacles Timeline */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-[var(--color-gold)] mb-4 flex items-center gap-2">
              <Mountain size={16} />
              Đỉnh Cao
            </h4>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[var(--color-gold)]/20" />

              <div className="relative flex justify-between">
                {pinnacles.pinnacles.map((pin, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.15 }}
                    className="relative flex flex-col items-center"
                    style={{ width: idx < 3 ? '20%' : '40%' }}
                  >
                    <div
                      className={`
                        w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold
                        border-2 transition-all z-10 bg-[var(--color-charcoal)]
                        ${currentPinnacleIdx === idx
                          ? 'border-[var(--color-gold)] text-[var(--color-gold)] shadow-lg shadow-[var(--color-gold)]/20'
                          : 'border-[var(--color-gold)]/30 text-[var(--color-mist)]'
                        }
                      `}
                    >
                      {pin.value}
                    </div>
                    <p className="text-xs text-center text-[var(--color-mist)] mt-2">{pin.ageRange}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Challenges */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-vermillion)] mb-4 flex items-center gap-2">
              <Flame size={16} />
              Thử Thách
            </h4>
            <div className="flex gap-2">
              {challenges.challenges.map((ch, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex-1 p-3 bg-[var(--color-charcoal)] rounded-lg border border-[var(--color-vermillion)]/20 text-center"
                >
                  <div className="text-2xl font-display font-bold text-[var(--color-vermillion)]">
                    {ch.value}
                  </div>
                  <p className="text-xs text-[var(--color-mist)]">{ch.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Pinnacles Detail View */}
      {activeView === 'pinnacles' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {pinnacles.pinnacles.map((pin, idx) => {
            const meaning = PINNACLE_MEANINGS[pin.value];
            const isCurrent = currentPinnacleIdx === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`
                  p-4 rounded-xl border-2 transition-all
                  ${isCurrent
                    ? 'bg-[var(--color-gold)]/10 border-[var(--color-gold)]/50'
                    : 'bg-[var(--color-charcoal)] border-[var(--color-gold)]/10'
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`
                      w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold shrink-0
                      ${isCurrent
                        ? 'bg-[var(--color-gold)] text-[var(--color-obsidian)]'
                        : 'bg-[var(--color-smoke)] text-[var(--color-gold)]'
                      }
                    `}
                  >
                    {pin.value}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-[var(--color-pearl)]">{pin.name}</h4>
                      {isCurrent && (
                        <span className="px-2 py-0.5 text-xs bg-[var(--color-gold)] text-[var(--color-obsidian)] rounded-full">
                          Hiện tại
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--color-mist)] mb-2">
                      Tuổi: {pin.ageRange} • Công thức: {pin.calculation}
                    </p>
                    {meaning && (
                      <>
                        <p className="text-sm text-[var(--color-gold)]">{meaning.title}</p>
                        <p className="text-sm text-[var(--color-pearl)] mt-1">{meaning.description}</p>
                        <p className="text-xs text-[var(--color-jade)] mt-2">
                          🎯 Tập trung: {meaning.focus}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Challenges Detail View */}
      {activeView === 'challenges' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {challenges.challenges.map((ch, idx) => {
            const meaning = CHALLENGE_MEANINGS[ch.value];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 rounded-xl bg-[var(--color-charcoal)] border border-[var(--color-vermillion)]/20"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[var(--color-vermillion)]/20 flex items-center justify-center text-2xl font-bold text-[var(--color-vermillion)] shrink-0">
                    {ch.value}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[var(--color-pearl)] mb-1">{ch.name}</h4>
                    <p className="text-xs text-[var(--color-mist)] mb-2">
                      Công thức: {ch.calculation}
                    </p>
                    {meaning && (
                      <>
                        <p className="text-sm text-[var(--color-vermillion)]">{meaning.title}</p>
                        <p className="text-sm text-[var(--color-pearl)] mt-1">{meaning.description}</p>
                        <p className="text-xs text-[var(--color-jade)] mt-2">
                          📚 Bài học: {meaning.lesson}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
