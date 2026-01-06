/**
 * MonthCalendar Component
 * Lịch tháng hiển thị cả âm lịch và dương lịch
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { lunarEngine } from '../../utils/lunarCalendar';

export default function MonthCalendar({
  year,
  month,
  onSelectDate,
  selectedDate,
  onMonthChange
}) {
  const [direction, setDirection] = useState(0);

  const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  // Get month info and all days data
  const { monthInfo, daysData } = useMemo(() => {
    const info = lunarEngine.getMonthInfo(year, month);
    const days = [];

    // Add empty slots for days before the 1st
    for (let i = 0; i < info.firstDayWeekDay; i++) {
      days.push(null);
    }

    // Add all days in the month
    for (let day = 1; day <= info.daysInMonth; day++) {
      const dayInfo = lunarEngine.getFullDayInfo(year, month, day);
      days.push(dayInfo);
    }

    return { monthInfo: info, daysData: days };
  }, [year, month]);

  const goToPrevMonth = () => {
    setDirection(-1);
    if (month === 1) {
      onMonthChange(year - 1, 12);
    } else {
      onMonthChange(year, month - 1);
    }
  };

  const goToNextMonth = () => {
    setDirection(1);
    if (month === 12) {
      onMonthChange(year + 1, 1);
    } else {
      onMonthChange(year, month + 1);
    }
  };

  const goToToday = () => {
    const today = new Date();
    onMonthChange(today.getFullYear(), today.getMonth() + 1);
  };

  const isSelected = (dayInfo) => {
    if (!dayInfo || !selectedDate) return false;
    return dayInfo.solar.year === selectedDate.year &&
      dayInfo.solar.month === selectedDate.month &&
      dayInfo.solar.day === selectedDate.day;
  };

  const isToday = (dayInfo) => {
    if (!dayInfo) return false;
    const today = new Date();
    return dayInfo.solar.year === today.getFullYear() &&
      dayInfo.solar.month === today.getMonth() + 1 &&
      dayInfo.solar.day === today.getDate();
  };

  return (
    <div className="month-calendar">
      {/* Header */}
      <div className="calendar-header">
        <button className="nav-btn" onClick={goToPrevMonth}>
          ◀◀
        </button>
        <button className="nav-btn" onClick={goToPrevMonth}>
          ◀
        </button>

        <div className="month-title">
          <div className="solar-title">
            THÁNG {month} - {year}
          </div>
          <div className="lunar-title">
            {monthInfo.lunarInfo.yearGanZhi} {monthInfo.lunarInfo.zodiacEmoji}
          </div>
        </div>

        <button className="nav-btn" onClick={goToNextMonth}>
          ▶
        </button>
        <button className="nav-btn" onClick={goToNextMonth}>
          ▶▶
        </button>
      </div>

      {/* Today button */}
      <div className="today-btn-container">
        <button className="today-btn" onClick={goToToday}>
          📅 Hôm nay
        </button>
      </div>

      {/* Week days header */}
      <div className="weekdays-header">
        {weekDays.map((day, idx) => (
          <div
            key={day}
            className={`weekday ${idx === 0 ? 'sunday' : ''}`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${year}-${month}`}
          className="days-grid"
          initial={{ opacity: 0, x: direction * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 50 }}
          transition={{ duration: 0.2 }}
        >
          {daysData.map((dayInfo, index) => {
            if (!dayInfo) {
              return <div key={`empty-${index}`} className="day-cell empty" />;
            }

            const selected = isSelected(dayInfo);
            const today = isToday(dayInfo);
            const quality = dayInfo.dayQuality;
            const isSunday = dayInfo.solar.isSunday;
            const isMungMot = dayInfo.lunar.isMungMot;
            const isRam = dayInfo.lunar.isRam;

            return (
              <motion.button
                key={dayInfo.solar.day}
                className={`
                  day-cell
                  ${selected ? 'selected' : ''}
                  ${today ? 'today' : ''}
                  ${isSunday ? 'sunday' : ''}
                  quality-${quality.color}
                `}
                onClick={() => onSelectDate(dayInfo)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Solar day */}
                <span className="solar-day">{dayInfo.solar.day}</span>

                {/* Lunar day */}
                <span className={`lunar-day ${isMungMot || isRam ? 'special' : ''}`}>
                  {isMungMot ? dayInfo.lunar.monthNameChinese : dayInfo.lunar.dayNameChinese}
                </span>

                {/* Quality indicator */}
                <span className="quality-dot">{quality.emoji}</span>

                {/* Moon phase for special days */}
                {(isMungMot || isRam) && (
                  <span className="moon-indicator">
                    {isMungMot ? '🌑' : '🌕'}
                  </span>
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Legend */}
      <div className="calendar-legend">
        <div className="legend-item">
          <span className="dot gold">⭐</span>
          <span>Đại Cát</span>
        </div>
        <div className="legend-item">
          <span className="dot green">●</span>
          <span>Tốt</span>
        </div>
        <div className="legend-item">
          <span className="dot blue">○</span>
          <span>Bình</span>
        </div>
        <div className="legend-item">
          <span className="dot red">✗</span>
          <span>Xấu</span>
        </div>
        <div className="legend-item">
          <span className="moon">🌑</span>
          <span>Mùng 1</span>
        </div>
        <div className="legend-item">
          <span className="moon">🌕</span>
          <span>Rằm</span>
        </div>
      </div>

      <style jsx>{`
        .month-calendar {
          background: var(--color-bg-card);
          border: 1px solid var(--color-gold-dim);
          border-radius: 16px;
          overflow: hidden;
        }

        .calendar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(139, 69, 19, 0.15));
          border-bottom: 1px solid var(--color-gold-dim);
        }

        .nav-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(139, 69, 19, 0.2);
          border: 1px solid var(--color-gold-dim);
          color: var(--color-gold);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          background: rgba(212, 175, 55, 0.3);
          border-color: var(--color-gold);
        }

        .month-title {
          text-align: center;
        }

        .solar-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          color: var(--color-gold);
          font-weight: 600;
        }

        .lunar-title {
          font-size: 0.9rem;
          color: var(--color-text-dim);
          margin-top: 2px;
        }

        .today-btn-container {
          display: flex;
          justify-content: center;
          padding: 8px;
        }

        .today-btn {
          padding: 6px 16px;
          background: rgba(212, 175, 55, 0.2);
          border: 1px solid var(--color-gold-dim);
          border-radius: 20px;
          color: var(--color-gold);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .today-btn:hover {
          background: rgba(212, 175, 55, 0.3);
          border-color: var(--color-gold);
        }

        .weekdays-header {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          padding: 8px 12px;
          background: rgba(0, 0, 0, 0.2);
        }

        .weekday {
          text-align: center;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-dim);
          padding: 8px 0;
        }

        .weekday.sunday {
          color: #EF4444;
        }

        .days-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          padding: 12px;
        }

        .day-cell {
          aspect-ratio: 1;
          min-height: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.15);
          border: 1px solid transparent;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          padding: 4px;
        }

        .day-cell.empty {
          background: transparent;
          cursor: default;
        }

        .day-cell:not(.empty):hover {
          background: rgba(139, 69, 19, 0.3);
          border-color: var(--color-gold-dim);
        }

        .day-cell.selected {
          background: rgba(212, 175, 55, 0.3);
          border-color: var(--color-gold);
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
        }

        .day-cell.today {
          border: 2px solid var(--color-gold);
        }

        .day-cell.sunday .solar-day {
          color: #EF4444;
        }

        .day-cell.quality-gold {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 215, 0, 0.05));
        }

        .day-cell.quality-green {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(34, 197, 94, 0.05));
        }

        .day-cell.quality-blue {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.03));
        }

        .day-cell.quality-red {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.03));
        }

        .solar-day {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-text);
        }

        .lunar-day {
          font-size: 0.6rem;
          color: var(--color-text-dim);
          margin-top: 2px;
        }

        .lunar-day.special {
          color: var(--color-gold);
          font-weight: 600;
        }

        .quality-dot {
          position: absolute;
          top: 2px;
          right: 4px;
          font-size: 0.5rem;
        }

        .moon-indicator {
          position: absolute;
          bottom: 2px;
          left: 4px;
          font-size: 0.6rem;
        }

        .calendar-legend {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          padding: 12px;
          background: rgba(0, 0, 0, 0.2);
          border-top: 1px solid var(--color-gold-dim);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          color: var(--color-text-dim);
        }

        .legend-item .dot.gold { color: #FFD700; }
        .legend-item .dot.green { color: #22C55E; }
        .legend-item .dot.blue { color: #3B82F6; }
        .legend-item .dot.red { color: #EF4444; }

        @media (max-width: 500px) {
          .day-cell {
            min-height: 50px;
          }

          .solar-day {
            font-size: 0.95rem;
          }

          .lunar-day {
            font-size: 0.5rem;
          }

          .calendar-legend {
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}
