/**
 * TodayWidget Component
 * Widget nhỏ gọn hiển thị thông tin hôm nay
 */

import { motion } from 'framer-motion';

export default function TodayWidget({ dayInfo, onClick }) {
  if (!dayInfo) return null;

  const { solar, lunar, canChi, zodiac, truc, sao, dayQuality, hoangDao } = dayInfo;

  const hoangDaoHours = hoangDao?.filter(h => h.isHoangDao).slice(0, 4) || [];

  return (
    <motion.div
      className="today-widget"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="widget-header">
        <span className="icon">📅</span>
        <span className="title">HÔM NAY</span>
      </div>

      <div className="widget-content">
        {/* Mini Calendar Card */}
        <div className="mini-card">
          <div className={`weekday ${solar.isSunday ? 'sunday' : ''}`}>
            {solar.weekDayName}
          </div>
          <div className={`solar-day ${solar.isSunday ? 'sunday' : solar.isWeekend ? 'weekend' : ''}`}>
            {solar.day}
          </div>
          <div className="solar-month">
            Tháng {solar.month}, {solar.year}
          </div>
          <div className="divider" />
          <div className="lunar-day">
            {lunar.dayNameChinese}
          </div>
          <div className="lunar-month">
            {lunar.monthName}
          </div>
          <div className="canchi">
            {canChi.year} {zodiac.yearEmoji}
          </div>
        </div>

        {/* Quick Info */}
        <div className="quick-info">
          <div className="info-row">
            <span className="icon">🌙</span>
            <span className="label">Trực:</span>
            <span className={`value ${truc.type}`}>{truc.name}</span>
            <span className="badge">{truc.type === 'hoangDao' ? 'Hoàng Đạo' : truc.type === 'hacDao' ? 'Hắc Đạo' : 'Bình'}</span>
          </div>

          <div className="info-row">
            <span className="icon">⭐</span>
            <span className="label">Sao:</span>
            <span className={`value ${sao.type}`}>{sao.name}</span>
            <span className="badge">{sao.type === 'tot' ? 'Tốt' : 'Xấu'}</span>
          </div>

          <div className="info-row">
            <span className="icon">📊</span>
            <span className="label">Điểm:</span>
            <span className={`value quality-${dayQuality.color}`}>
              {dayQuality.score}/100
            </span>
            <span className={`badge quality-${dayQuality.color}`}>
              {dayQuality.label}
            </span>
          </div>

          <div className="info-row hours">
            <span className="icon">⏰</span>
            <span className="label">Giờ tốt:</span>
            <span className="hours-list">
              {hoangDaoHours.map(h => h.name).join(', ')}
            </span>
          </div>
        </div>
      </div>

      <div className="widget-footer">
        Xem chi tiết →
      </div>

      <style jsx>{`
        .today-widget {
          background: var(--color-bg-card);
          border: 1px solid var(--color-gold-dim);
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .today-widget:hover {
          border-color: var(--color-gold);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
        }

        .widget-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(139, 69, 19, 0.2));
          border-bottom: 1px solid var(--color-gold-dim);
        }

        .widget-header .icon {
          font-size: 1.2rem;
        }

        .widget-header .title {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-gold);
          letter-spacing: 2px;
        }

        .widget-content {
          display: flex;
          gap: 16px;
          padding: 16px;
        }

        .mini-card {
          flex-shrink: 0;
          width: 120px;
          text-align: center;
          background: linear-gradient(180deg, #FFF8E7 0%, #FFF0D4 100%);
          border: 2px solid #8B4513;
          border-radius: 8px;
          padding: 8px;
        }

        .mini-card .weekday {
          font-size: 0.75rem;
          font-weight: 600;
          color: #333;
          padding: 4px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 4px;
        }

        .mini-card .weekday.sunday {
          color: #B22222;
          background: rgba(178, 34, 34, 0.1);
        }

        .mini-card .solar-day {
          font-size: 2.5rem;
          font-weight: 700;
          color: #333;
          line-height: 1.1;
        }

        .mini-card .solar-day.sunday {
          color: #B22222;
        }

        .mini-card .solar-day.weekend {
          color: #1E90FF;
        }

        .mini-card .solar-month {
          font-size: 0.65rem;
          color: #666;
        }

        .mini-card .divider {
          height: 1px;
          background: #D4AF37;
          margin: 6px 0;
        }

        .mini-card .lunar-day {
          font-size: 1.2rem;
          color: #8B0000;
          font-weight: 600;
        }

        .mini-card .lunar-month {
          font-size: 0.65rem;
          color: #8B4513;
        }

        .mini-card .canchi {
          font-size: 0.7rem;
          color: #666;
          margin-top: 4px;
        }

        .quick-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
        }

        .info-row .icon {
          font-size: 1rem;
        }

        .info-row .label {
          color: var(--color-text-dim);
        }

        .info-row .value {
          font-weight: 600;
          color: var(--color-text);
        }

        .info-row .value.hoangDao,
        .info-row .value.tot {
          color: #22C55E;
        }

        .info-row .value.hacDao,
        .info-row .value.xau {
          color: #EF4444;
        }

        .info-row .value.quality-gold {
          color: #FFD700;
        }

        .info-row .value.quality-green {
          color: #22C55E;
        }

        .info-row .value.quality-blue {
          color: #3B82F6;
        }

        .info-row .value.quality-red {
          color: #EF4444;
        }

        .info-row .badge {
          font-size: 0.65rem;
          padding: 2px 6px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.1);
          color: var(--color-text-dim);
        }

        .info-row .badge.quality-gold {
          background: rgba(255, 215, 0, 0.2);
          color: #FFD700;
        }

        .info-row .badge.quality-green {
          background: rgba(34, 197, 94, 0.2);
          color: #22C55E;
        }

        .info-row .badge.quality-blue {
          background: rgba(59, 130, 246, 0.2);
          color: #3B82F6;
        }

        .info-row .badge.quality-red {
          background: rgba(239, 68, 68, 0.2);
          color: #EF4444;
        }

        .info-row.hours {
          flex-wrap: wrap;
        }

        .hours-list {
          color: var(--color-gold);
          font-weight: 500;
        }

        .widget-footer {
          text-align: center;
          padding: 10px;
          background: rgba(139, 69, 19, 0.1);
          color: var(--color-gold);
          font-size: 0.85rem;
          font-weight: 500;
          border-top: 1px solid var(--color-gold-dim);
        }

        @media (max-width: 400px) {
          .widget-content {
            flex-direction: column;
            align-items: center;
          }

          .mini-card {
            width: 100%;
            max-width: 150px;
          }
        }
      `}</style>
    </motion.div>
  );
}
