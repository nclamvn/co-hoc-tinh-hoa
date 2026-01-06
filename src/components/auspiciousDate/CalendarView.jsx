/**
 * Calendar View Component
 * Hiển thị lịch với các ngày tốt được đánh dấu
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CalendarView({ auspiciousDates, selectedDate, onSelectDate, startDate, endDate }) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const start = new Date(startDate);
    return new Date(start.getFullYear(), start.getMonth(), 1);
  });

  // Create a map of auspicious dates for quick lookup
  const dateMap = useMemo(() => {
    const map = {};
    auspiciousDates.forEach(d => {
      const key = d.date.toDateString();
      map[key] = d;
    });
    return map;
  }, [auspiciousDates]);

  const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty slots for days before the 1st
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days in the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const goToPrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const isInRange = (date) => {
    if (!date) return false;
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    return date >= start && date <= end;
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const getDateCategory = (date) => {
    if (!date) return null;
    const auspicious = dateMap[date.toDateString()];
    return auspicious?.evaluation?.category;
  };

  const days = getDaysInMonth(currentMonth);
  const canGoPrev = currentMonth > new Date(startDate);
  const canGoNext = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1) <= new Date(endDate);

  return (
    <div className="calendar-view">
      {/* Month Navigation */}
      <div className="calendar-header">
        <button
          className="nav-button"
          onClick={goToPrevMonth}
          disabled={!canGoPrev}
        >
          ←
        </button>
        <h3 className="month-title">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          className="nav-button"
          onClick={goToNextMonth}
          disabled={!canGoNext}
        >
          →
        </button>
      </div>

      {/* Week days header */}
      <div className="weekdays">
        {weekDays.map(day => (
          <div key={day} className={`weekday ${day === 'CN' ? 'sunday' : ''}`}>
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMonth.toISOString()}
          className="days-grid"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {days.map((date, index) => {
            const inRange = isInRange(date);
            const selected = isSelected(date);
            const category = getDateCategory(date);
            const auspicious = date ? dateMap[date.toDateString()] : null;

            return (
              <motion.button
                key={index}
                className={`day-cell ${!date ? 'empty' : ''} ${!inRange ? 'out-of-range' : ''} ${selected ? 'selected' : ''} ${category ? `category-${category.level}` : ''}`}
                onClick={() => date && inRange && auspicious && onSelectDate(date)}
                disabled={!date || !inRange || !auspicious}
                whileHover={date && inRange && auspicious ? { scale: 1.1 } : {}}
                whileTap={date && inRange && auspicious ? { scale: 0.95 } : {}}
              >
                {date && (
                  <>
                    <span className="day-number">{date.getDate()}</span>
                    {category && (
                      <span className="day-indicator" title={category.label}>
                        {category.emoji}
                      </span>
                    )}
                    {auspicious && (
                      <span className="day-score">{auspicious.evaluation.total}</span>
                    )}
                  </>
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Legend */}
      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-dot excellent">⭐</span>
          <span>Đại Cát (90+)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot good">●</span>
          <span>Ngày Tốt (75+)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot fair">○</span>
          <span>Khá Tốt (65+)</span>
        </div>
      </div>

      <style jsx>{`
        .calendar-view {
          background: var(--color-bg-card);
          border: 1px solid var(--color-gold-dim);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .calendar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .month-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          color: var(--color-gold);
        }

        .nav-button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(139, 69, 19, 0.3);
          border: 1px solid var(--color-gold-dim);
          color: var(--color-gold);
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-button:hover:not(:disabled) {
          background: rgba(212, 175, 55, 0.2);
          border-color: var(--color-gold);
        }

        .nav-button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          margin-bottom: 0.5rem;
        }

        .weekday {
          text-align: center;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-dim);
          padding: 0.5rem;
        }

        .weekday.sunday {
          color: var(--color-red);
        }

        .days-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }

        .day-cell {
          aspect-ratio: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid transparent;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          min-height: 50px;
        }

        .day-cell.empty {
          background: transparent;
          cursor: default;
        }

        .day-cell.out-of-range {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .day-cell:not(.empty):not(.out-of-range):hover {
          background: rgba(139, 69, 19, 0.3);
          border-color: var(--color-gold-dim);
        }

        .day-cell.selected {
          background: rgba(212, 175, 55, 0.3);
          border-color: var(--color-gold);
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
        }

        .day-cell.category-excellent {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1));
          border-color: rgba(255, 215, 0, 0.5);
        }

        .day-cell.category-good {
          background: linear-gradient(135deg, rgba(144, 238, 144, 0.2), rgba(144, 238, 144, 0.1));
          border-color: rgba(144, 238, 144, 0.5);
        }

        .day-cell.category-fair {
          background: linear-gradient(135deg, rgba(135, 206, 235, 0.2), rgba(135, 206, 235, 0.1));
          border-color: rgba(135, 206, 235, 0.5);
        }

        .day-number {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--color-text);
        }

        .day-indicator {
          font-size: 0.6rem;
          position: absolute;
          top: 2px;
          right: 4px;
        }

        .day-score {
          font-size: 0.65rem;
          color: var(--color-gold);
          position: absolute;
          bottom: 2px;
          right: 4px;
        }

        .calendar-legend {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid var(--color-gold-dim);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--color-text-dim);
        }

        .legend-dot {
          font-size: 0.9rem;
        }

        .legend-dot.excellent {
          color: #FFD700;
        }

        .legend-dot.good {
          color: #90EE90;
        }

        .legend-dot.fair {
          color: #87CEEB;
        }

        @media (max-width: 600px) {
          .calendar-view {
            padding: 1rem;
          }

          .day-cell {
            min-height: 40px;
          }

          .day-number {
            font-size: 0.8rem;
          }

          .calendar-legend {
            gap: 0.75rem;
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
}

export default CalendarView;
