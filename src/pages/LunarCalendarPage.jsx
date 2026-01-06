/**
 * LunarCalendarPage - Trang Lịch Vạn Niên
 * Lịch Âm Dương truyền thống Việt Nam
 */

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { lunarEngine } from '../utils/lunarCalendar';
import {
  DayCard,
  TodayWidget,
  MonthCalendar,
  DayDetailModal
} from '../components/lunarCalendar';
import { SOLAR_HOLIDAYS, LUNAR_HOLIDAYS } from '../data/vietnameseHolidays';

export default function LunarCalendarPage() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [selectedDayInfo, setSelectedDayInfo] = useState(null);
  const [todayInfo, setTodayInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [lookupDate, setLookupDate] = useState('');

  // Load today's info
  useEffect(() => {
    const info = lunarEngine.getToday();
    setTodayInfo(info);
  }, []);

  // Get holidays for current month
  const monthHolidays = lunarEngine.getHolidaysInMonth(currentYear, currentMonth);

  // Handle month change
  const handleMonthChange = useCallback((year, month) => {
    setCurrentYear(year);
    setCurrentMonth(month);
  }, []);

  // Handle day select
  const handleSelectDate = useCallback((dayInfo) => {
    setSelectedDayInfo(dayInfo);
    setShowModal(true);
  }, []);

  // Handle today widget click
  const handleTodayClick = useCallback(() => {
    if (todayInfo) {
      setSelectedDayInfo(todayInfo);
      setShowModal(true);
    }
  }, [todayInfo]);

  // Handle date lookup
  const handleLookup = useCallback(() => {
    if (!lookupDate) return;
    const [year, month, day] = lookupDate.split('-').map(Number);
    if (year && month && day) {
      const dayInfo = lunarEngine.getFullDayInfo(year, month, day);
      setSelectedDayInfo(dayInfo);
      setShowModal(true);
      setCurrentYear(year);
      setCurrentMonth(month);
    }
  }, [lookupDate]);

  // Quick date buttons
  const goToDate = useCallback((daysOffset) => {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    const dayInfo = lunarEngine.getFullDayInfo(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
    setSelectedDayInfo(dayInfo);
    setShowModal(true);
  }, []);

  return (
    <div className="lunar-calendar-page">
      {/* Header */}
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="page-title">Lịch Vạn Niên</h1>
        <p className="page-subtitle">
          Âm Dương Lịch Việt Nam
        </p>
      </motion.div>

      <div className="page-content">
        {/* Left Column: Today Widget + Calendar */}
        <div className="main-column">
          {/* Today Widget */}
          {todayInfo && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <TodayWidget dayInfo={todayInfo} onClick={handleTodayClick} />
            </motion.div>
          )}

          {/* Month Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="calendar-section"
          >
            <MonthCalendar
              year={currentYear}
              month={currentMonth}
              onSelectDate={handleSelectDate}
              selectedDate={selectedDayInfo?.solar}
              onMonthChange={handleMonthChange}
            />
          </motion.div>

          {/* Holidays in Month */}
          {monthHolidays.length > 0 && (
            <motion.div
              className="holidays-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="section-title">
                <span className="icon">🎉</span>
                Sự Kiện & Ngày Lễ Trong Tháng
              </h3>
              <div className="holidays-list">
                {monthHolidays.slice(0, 6).map((holiday, i) => (
                  <div key={i} className="holiday-item">
                    <div className="holiday-date">
                      <span className="solar">{holiday.solarDay}/{currentMonth}</span>
                      <span className="lunar">({holiday.lunarDay}/{holiday.lunarMonth} Âm)</span>
                    </div>
                    <div className="holiday-names">
                      {holiday.festivals.map((f, j) => (
                        <span key={j} className="festival-tag">{f}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column: Day Card + Lookup */}
        <div className="side-column">
          {/* Selected Day Card */}
          {selectedDayInfo ? (
            <motion.div
              className="day-card-section"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              key={`${selectedDayInfo.solar.year}-${selectedDayInfo.solar.month}-${selectedDayInfo.solar.day}`}
            >
              <DayCard dayInfo={selectedDayInfo} size="large" />
            </motion.div>
          ) : todayInfo ? (
            <motion.div
              className="day-card-section"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
            >
              <DayCard dayInfo={todayInfo} size="large" />
            </motion.div>
          ) : null}

          {/* Date Lookup */}
          <motion.div
            className="lookup-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="section-title">
              <span className="icon">🔍</span>
              Tra Cứu Ngày
            </h3>

            <div className="lookup-form">
              <input
                type="date"
                value={lookupDate}
                onChange={(e) => setLookupDate(e.target.value)}
                className="date-input"
              />
              <button className="lookup-btn" onClick={handleLookup}>
                Xem ngày
              </button>
            </div>

            <div className="quick-buttons">
              <button className="quick-btn" onClick={() => goToDate(0)}>
                Hôm nay
              </button>
              <button className="quick-btn" onClick={() => goToDate(1)}>
                Ngày mai
              </button>
              <button className="quick-btn" onClick={() => goToDate(7)}>
                Tuần sau
              </button>
            </div>
          </motion.div>

          {/* Year Info */}
          <motion.div
            className="year-info-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="section-title">
              <span className="icon">📆</span>
              Năm {currentYear}
            </h3>
            {todayInfo && (
              <div className="year-details">
                <div className="year-row">
                  <span className="label">Can Chi:</span>
                  <span className="value">{todayInfo.canChi.year}</span>
                </div>
                <div className="year-row">
                  <span className="label">Con Giáp:</span>
                  <span className="value">
                    {todayInfo.zodiac.year} {todayInfo.zodiac.yearEmoji}
                  </span>
                </div>
                <div className="year-row">
                  <span className="label">Nạp Âm:</span>
                  <span className="value">{todayInfo.napAm.year}</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Day Detail Modal */}
      {showModal && selectedDayInfo && (
        <DayDetailModal
          dayInfo={selectedDayInfo}
          onClose={() => setShowModal(false)}
        />
      )}

      <style jsx>{`
        .lunar-calendar-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 1rem 2rem;
        }

        .page-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .page-title {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 500;
          background: linear-gradient(135deg, var(--lux-gold), var(--lux-gold-bright));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
          line-height: 1.3;
          padding-top: 0.2em;
        }

        .page-subtitle {
          color: var(--color-text-dim);
          font-size: 1.1rem;
        }

        .page-content {
          display: flex;
          gap: 2rem;
        }

        .main-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .side-column {
          width: 350px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .calendar-section {
          width: 100%;
        }

        .day-card-section {
          display: flex;
          justify-content: center;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          color: var(--color-gold);
          margin-bottom: 1rem;
        }

        .section-title .icon {
          font-size: 1.3rem;
        }

        .holidays-section {
          background: var(--color-bg-card);
          border: 1px solid var(--color-gold-dim);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .holidays-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .holiday-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px;
          background: rgba(139, 69, 19, 0.1);
          border-radius: 8px;
        }

        .holiday-date {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 70px;
        }

        .holiday-date .solar {
          font-weight: 600;
          color: var(--color-text);
        }

        .holiday-date .lunar {
          font-size: 0.75rem;
          color: var(--color-text-dim);
        }

        .holiday-names {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .festival-tag {
          padding: 4px 10px;
          background: rgba(212, 175, 55, 0.2);
          border-radius: 20px;
          font-size: 0.85rem;
          color: var(--color-gold);
        }

        .lookup-section {
          background: var(--color-bg-card);
          border: 1px solid var(--color-gold-dim);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .lookup-form {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }

        .date-input {
          flex: 1;
          padding: 10px 12px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--color-gold-dim);
          border-radius: 8px;
          color: var(--color-text);
          font-size: 0.95rem;
        }

        .date-input:focus {
          outline: none;
          border-color: var(--color-gold);
        }

        .lookup-btn {
          padding: 10px 16px;
          background: linear-gradient(135deg, var(--color-gold), var(--color-gold-dark));
          border: none;
          border-radius: 8px;
          color: var(--color-bg);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .lookup-btn:hover {
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
        }

        .quick-buttons {
          display: flex;
          gap: 8px;
        }

        .quick-btn {
          flex: 1;
          padding: 8px 12px;
          background: rgba(139, 69, 19, 0.2);
          border: 1px solid var(--color-gold-dim);
          border-radius: 8px;
          color: var(--color-text);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .quick-btn:hover {
          background: rgba(139, 69, 19, 0.4);
          border-color: var(--color-gold);
        }

        .year-info-section {
          background: var(--color-bg-card);
          border: 1px solid var(--color-gold-dim);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .year-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .year-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid rgba(212, 175, 55, 0.1);
        }

        .year-row:last-child {
          border-bottom: none;
        }

        .year-row .label {
          color: var(--color-text-dim);
          font-size: 0.9rem;
        }

        .year-row .value {
          color: var(--color-gold);
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .page-content {
            flex-direction: column;
          }

          .side-column {
            width: 100%;
          }

          .day-card-section {
            order: -1;
          }
        }

        @media (max-width: 500px) {
          .page-title {
            font-size: 2rem;
          }

          .lunar-calendar-page {
            padding: 5rem 1rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}
