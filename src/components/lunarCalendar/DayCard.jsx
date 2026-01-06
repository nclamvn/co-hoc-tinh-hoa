/**
 * DayCard Component - Tờ Lịch Bloc Truyền Thống Việt Nam
 * Thiết kế như tờ lịch treo tường với đầy đủ thông tin
 */

import { motion } from 'framer-motion';

export default function DayCard({ dayInfo, size = 'large', showDetails = true }) {
  if (!dayInfo) return null;

  const {
    solar,
    lunar,
    canChi,
    zodiac,
    napAm,
    truc,
    sao,
    hoangDao,
    dayQuality,
    activities,
    jieQi,
    festivals,
    clash,
    moonPhase
  } = dayInfo;

  const isSunday = solar.isSunday;
  const isWeekend = solar.isWeekend;

  // Filter giờ Hoàng Đạo
  const hoangDaoHours = hoangDao?.filter(h => h.isHoangDao) || [];

  // Check for festivals
  const hasFestival = (festivals?.solar?.length > 0) ||
    (festivals?.lunar?.length > 0) ||
    (festivals?.other?.length > 0);

  const allFestivals = [
    ...(festivals?.solar || []),
    ...(festivals?.lunar || []),
    ...(festivals?.other || [])
  ];

  return (
    <motion.div
      className={`day-card ${size}`}
      initial={{ opacity: 0, rotateY: -90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Top decorative border */}
      <div className="border-top" />

      {/* Nail holes decoration */}
      <div className="nail-holes">
        <span className="nail-hole" />
        <span className="nail-hole" />
      </div>

      {/* Weekday */}
      <div className={`weekday-section ${isSunday ? 'sunday' : ''}`}>
        {solar.weekDayName.toUpperCase()}
      </div>

      {/* Solar Day - Big Number */}
      <div className="solar-day-section">
        <span className={`solar-day ${isSunday ? 'sunday' : isWeekend ? 'weekend' : ''}`}>
          {solar.day}
        </span>
      </div>

      {/* Solar Month Year */}
      <div className="solar-month-year">
        THÁNG {solar.month} NĂM {solar.year}
      </div>

      {/* Divider */}
      <div className="divider gold" />

      {/* Lunar Day - Chinese Characters */}
      <div className="lunar-section">
        <div className="lunar-day-chinese">
          {lunar.dayNameChinese}
        </div>
        <div className="lunar-day-vietnamese">
          ({lunar.dayName})
        </div>
        <div className="lunar-month">
          {lunar.monthName} {lunar.isLeapMonth ? '(Nhuận)' : ''}
        </div>
      </div>

      {/* Divider */}
      <div className="divider thin" />

      {/* Can Chi Year + Zodiac */}
      <div className="canchi-section">
        <div className="canchi-year-chinese">
          {canChi.yearChinese}
        </div>
        <div className="canchi-year-vietnamese">
          {canChi.year} {zodiac.yearEmoji}
        </div>
      </div>

      {/* Full Can Chi Info */}
      <div className="canchi-full">
        <span>Ngày: <strong>{canChi.day}</strong></span>
        <span className="separator">•</span>
        <span>Tháng: <strong>{canChi.month}</strong></span>
      </div>

      {/* Nạp Âm */}
      <div className="napam-section">
        {napAm.day}
      </div>

      {/* Divider */}
      <div className="divider gold" />

      {/* Truc & Sao */}
      {showDetails && (
        <div className="truc-sao-section">
          <div className="truc-info">
            <span className="icon">🌙</span>
            <div className="info-content">
              <span className={`value ${truc.type}`}>{truc.name}</span>
              <span className="label">
                {truc.type === 'hoangDao' ? 'Hoàng Đạo' : truc.type === 'hacDao' ? 'Hắc Đạo' : 'Trung Bình'}
              </span>
            </div>
          </div>
          <div className="sao-info">
            <span className="icon">⭐</span>
            <div className="info-content">
              <span className={`value ${sao.type}`}>{sao.name}</span>
              <span className="label">{sao.type === 'tot' ? 'Cát Tinh' : 'Hung Tinh'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Moon Phase */}
      <div className="moon-phase">
        <span className="moon-emoji">{moonPhase.emoji}</span>
        <span className="moon-name">{moonPhase.name}</span>
      </div>

      {/* Hoang Dao Hours */}
      {showDetails && (
        <div className="hoangdao-section">
          <div className="section-title">
            <span className="icon">⏰</span> GIỜ HOÀNG ĐẠO:
          </div>
          <div className="hoangdao-hours">
            {hoangDaoHours.slice(0, 6).map((h, i) => (
              <span key={i} className="hour-badge">
                {h.name} ({h.period.split(' - ')[0]})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Activities - Good & Bad */}
      {showDetails && (activities?.good?.length > 0 || activities?.bad?.length > 0) && (
        <div className="activities-section">
          {activities.good?.length > 0 && (
            <div className="good-activities">
              <span className="label">✅ NÊN:</span>
              <span className="value">{activities.good.slice(0, 4).join(', ')}</span>
            </div>
          )}
          {activities.bad?.length > 0 && (
            <div className="bad-activities">
              <span className="label">❌ KIÊNG:</span>
              <span className="value">{activities.bad.slice(0, 3).join(', ')}</span>
            </div>
          )}
        </div>
      )}

      {/* Jie Qi & Festivals */}
      {showDetails && (jieQi.current || hasFestival) && (
        <div className="special-section">
          {jieQi.current && jieQi.currentInfo && (
            <div className="jieqi-info">
              📅 Tiết: <strong>{jieQi.currentInfo.name}</strong>
              <span className="meaning">({jieQi.currentInfo.meaning})</span>
            </div>
          )}
          {hasFestival && (
            <div className="festival-info">
              🎉 {allFestivals.slice(0, 2).join(', ')}
            </div>
          )}
        </div>
      )}

      {/* Divider */}
      <div className="divider thin" />

      {/* Clash Info */}
      {showDetails && (
        <div className="clash-section">
          <span>😈 Xung: Tuổi {clash.zodiac}</span>
          <span>👹 Sát: {clash.evilDirection || clash.evil}</span>
        </div>
      )}

      {/* Day Quality Footer */}
      <div className={`quality-footer quality-${dayQuality.color}`}>
        {dayQuality.emoji} {dayQuality.label} ({dayQuality.score}/100)
      </div>

      {/* Bottom decorative border */}
      <div className="border-bottom" />

      <style jsx>{`
        .day-card {
          position: relative;
          background: linear-gradient(180deg, #FFF8E7 0%, #FFF0D4 50%, #FFE8C0 100%);
          border: 4px solid #8B4513;
          border-radius: 12px;
          overflow: hidden;
          box-shadow:
            0 10px 30px rgba(0, 0, 0, 0.3),
            inset 0 0 20px rgba(139, 69, 19, 0.1);
          font-family: 'Playfair Display', serif;
        }

        .day-card.large {
          width: 320px;
        }

        .day-card.medium {
          width: 280px;
        }

        .day-card.small {
          width: 200px;
        }

        .border-top {
          height: 8px;
          background: linear-gradient(90deg, #D4AF37, #FFD700, #D4AF37);
        }

        .border-bottom {
          height: 8px;
          background: linear-gradient(90deg, #8B4513, #D4AF37, #8B4513);
        }

        .nail-holes {
          display: flex;
          justify-content: center;
          gap: 60px;
          padding: 8px 0;
          background: linear-gradient(180deg, rgba(139, 69, 19, 0.1), transparent);
        }

        .nail-hole {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(135deg, #333, #666);
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .weekday-section {
          text-align: center;
          padding: 8px;
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: 3px;
          color: #333;
          background: rgba(255, 255, 255, 0.5);
        }

        .weekday-section.sunday {
          color: #B22222;
          background: rgba(178, 34, 34, 0.1);
        }

        .solar-day-section {
          text-align: center;
          padding: 10px 0;
          background: rgba(255, 255, 255, 0.6);
        }

        .solar-day {
          font-size: 5rem;
          font-weight: 700;
          color: #333;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
          line-height: 1;
        }

        .solar-day.sunday {
          color: #B22222;
        }

        .solar-day.weekend {
          color: #1E90FF;
        }

        .solar-month-year {
          text-align: center;
          padding: 6px;
          font-size: 0.9rem;
          color: #555;
          letter-spacing: 1px;
        }

        .divider {
          margin: 0 16px;
          border-top: 1px dashed #D4AF37;
        }

        .divider.gold {
          border-top: 2px solid #D4AF37;
        }

        .divider.thin {
          border-top: 1px solid rgba(139, 69, 19, 0.3);
        }

        .lunar-section {
          text-align: center;
          padding: 12px;
          background: rgba(139, 0, 0, 0.05);
        }

        .lunar-day-chinese {
          font-size: 2.5rem;
          color: #8B0000;
          font-weight: 600;
        }

        .lunar-day-vietnamese {
          font-size: 1rem;
          color: #8B4513;
          margin-top: 4px;
        }

        .lunar-month {
          font-size: 0.9rem;
          color: #666;
          margin-top: 4px;
        }

        .canchi-section {
          text-align: center;
          padding: 10px;
          background: rgba(212, 175, 55, 0.1);
        }

        .canchi-year-chinese {
          font-size: 1.5rem;
          color: #8B4513;
        }

        .canchi-year-vietnamese {
          font-size: 1.1rem;
          color: #333;
          margin-top: 4px;
        }

        .canchi-full {
          text-align: center;
          padding: 6px;
          font-size: 0.8rem;
          color: #666;
        }

        .canchi-full .separator {
          margin: 0 8px;
          color: #D4AF37;
        }

        .napam-section {
          text-align: center;
          padding: 4px;
          font-size: 0.85rem;
          color: #8B4513;
          font-style: italic;
        }

        .truc-sao-section {
          display: flex;
          justify-content: space-around;
          padding: 10px;
          background: rgba(255, 255, 255, 0.4);
        }

        .truc-info,
        .sao-info {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .truc-info .icon,
        .sao-info .icon {
          font-size: 1.2rem;
        }

        .info-content {
          display: flex;
          flex-direction: column;
        }

        .info-content .value {
          font-weight: 700;
          font-size: 0.95rem;
        }

        .info-content .value.hoangDao,
        .info-content .value.tot {
          color: #228B22;
        }

        .info-content .value.hacDao,
        .info-content .value.xau {
          color: #B22222;
        }

        .info-content .value.trungBinh {
          color: #4169E1;
        }

        .info-content .label {
          font-size: 0.7rem;
          color: #888;
        }

        .moon-phase {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 6px;
          font-size: 0.85rem;
          color: #666;
        }

        .moon-emoji {
          font-size: 1.2rem;
        }

        .hoangdao-section {
          padding: 8px 12px;
          background: rgba(0, 100, 0, 0.05);
        }

        .section-title {
          font-size: 0.75rem;
          color: #006400;
          font-weight: 600;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .hoangdao-hours {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .hour-badge {
          padding: 2px 6px;
          background: rgba(0, 100, 0, 0.1);
          border-radius: 4px;
          font-size: 0.7rem;
          color: #006400;
        }

        .activities-section {
          padding: 8px 12px;
          font-size: 0.75rem;
        }

        .good-activities,
        .bad-activities {
          display: flex;
          gap: 6px;
          margin-bottom: 4px;
          line-height: 1.4;
        }

        .good-activities .label {
          color: #228B22;
          font-weight: 600;
          white-space: nowrap;
        }

        .bad-activities .label {
          color: #B22222;
          font-weight: 600;
          white-space: nowrap;
        }

        .good-activities .value,
        .bad-activities .value {
          color: #555;
        }

        .special-section {
          padding: 6px 12px;
          background: rgba(75, 0, 130, 0.05);
          font-size: 0.8rem;
        }

        .jieqi-info {
          color: #4B0082;
          margin-bottom: 2px;
        }

        .jieqi-info .meaning {
          color: #888;
          font-size: 0.75rem;
          margin-left: 4px;
        }

        .festival-info {
          color: #8B0000;
        }

        .clash-section {
          display: flex;
          justify-content: space-between;
          padding: 6px 12px;
          font-size: 0.75rem;
          color: #888;
        }

        .quality-footer {
          text-align: center;
          padding: 10px;
          font-size: 1rem;
          font-weight: 700;
        }

        .quality-footer.quality-gold {
          background: linear-gradient(90deg, #FFD700, #FFA500);
          color: #8B4513;
        }

        .quality-footer.quality-green {
          background: #228B22;
          color: white;
        }

        .quality-footer.quality-blue {
          background: #4169E1;
          color: white;
        }

        .quality-footer.quality-red {
          background: #B22222;
          color: white;
        }

        /* Responsive */
        @media (max-width: 400px) {
          .day-card.large {
            width: 100%;
            max-width: 320px;
          }

          .solar-day {
            font-size: 4rem;
          }

          .lunar-day-chinese {
            font-size: 2rem;
          }
        }
      `}</style>
    </motion.div>
  );
}
