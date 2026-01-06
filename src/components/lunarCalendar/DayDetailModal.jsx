/**
 * DayDetailModal Component
 * Modal hiển thị chi tiết ngày được chọn với tờ lịch bloc
 */

import { motion, AnimatePresence } from 'framer-motion';
import DayCard from './DayCard';

export default function DayDetailModal({ dayInfo, onClose }) {
  if (!dayInfo) return null;

  const { solar, lunar, canChi, zodiac, truc, sao, hoangDao, activities, spirits } = dayInfo;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          <button className="close-btn" onClick={onClose}>×</button>

          <div className="modal-layout">
            {/* Left: Day Card */}
            <div className="card-section">
              <DayCard dayInfo={dayInfo} size="medium" showDetails={false} />
            </div>

            {/* Right: Details */}
            <div className="details-section">
              {/* Header */}
              <div className="details-header">
                <h2 className="title">Chi Tiết Ngày</h2>
                <p className="subtitle">
                  {solar.weekDayName}, {solar.dateStr}
                </p>
              </div>

              {/* Can Chi Details */}
              <div className="detail-card">
                <h3 className="card-title">🐲 Can Chi</h3>
                <div className="canchi-grid">
                  <div className="canchi-item">
                    <span className="label">Năm</span>
                    <span className="value">{canChi.year}</span>
                    <span className="chinese">{canChi.yearChinese}</span>
                    <span className="emoji">{zodiac.yearEmoji}</span>
                  </div>
                  <div className="canchi-item">
                    <span className="label">Tháng</span>
                    <span className="value">{canChi.month}</span>
                    <span className="chinese">{canChi.monthChinese}</span>
                  </div>
                  <div className="canchi-item">
                    <span className="label">Ngày</span>
                    <span className="value">{canChi.day}</span>
                    <span className="chinese">{canChi.dayChinese}</span>
                  </div>
                </div>
              </div>

              {/* Truc & Sao */}
              <div className="detail-card">
                <h3 className="card-title">🌙 Trực & Sao</h3>
                <div className="truc-sao-grid">
                  <div className={`info-box ${truc.type}`}>
                    <span className="box-label">Trực</span>
                    <span className="box-value">{truc.name}</span>
                    <span className="box-type">
                      {truc.type === 'hoangDao' ? 'Hoàng Đạo' : truc.type === 'hacDao' ? 'Hắc Đạo' : 'Trung Bình'}
                    </span>
                    <span className="box-meaning">{truc.meaning}</span>
                  </div>
                  <div className={`info-box ${sao.type === 'tot' ? 'hoangDao' : 'hacDao'}`}>
                    <span className="box-label">Sao</span>
                    <span className="box-value">{sao.name}</span>
                    <span className="box-type">
                      {sao.type === 'tot' ? 'Cát Tinh' : 'Hung Tinh'}
                    </span>
                    <span className="box-meaning">{sao.meaning}</span>
                  </div>
                </div>
              </div>

              {/* Hoang Dao Hours */}
              <div className="detail-card">
                <h3 className="card-title">⏰ Giờ Hoàng Đạo / Hắc Đạo</h3>
                <div className="hours-grid">
                  {hoangDao?.map((hour, i) => (
                    <div
                      key={i}
                      className={`hour-item ${hour.isHoangDao ? 'hoang-dao' : 'hac-dao'}`}
                    >
                      <span className="hour-icon">
                        {hour.isHoangDao ? '☀️' : '🌙'}
                      </span>
                      <span className="hour-name">{hour.name}</span>
                      <span className="hour-period">{hour.period}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div className="detail-card">
                <h3 className="card-title">📋 Việc Nên & Không Nên</h3>
                <div className="activities-grid">
                  <div className="activity-box good">
                    <span className="activity-label">✅ NÊN LÀM</span>
                    <ul className="activity-list">
                      {activities?.good?.slice(0, 8).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="activity-box bad">
                    <span className="activity-label">❌ KHÔNG NÊN</span>
                    <ul className="activity-list">
                      {activities?.bad?.slice(0, 6).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Spirits */}
              {(spirits?.good?.length > 0 || spirits?.bad?.length > 0) && (
                <div className="detail-card">
                  <h3 className="card-title">👼 Thần Sát</h3>
                  <div className="spirits-grid">
                    {spirits?.good?.length > 0 && (
                      <div className="spirit-box good">
                        <span className="spirit-label">Cát Thần</span>
                        <span className="spirit-value">
                          {spirits.good.slice(0, 5).join(', ')}
                        </span>
                      </div>
                    )}
                    {spirits?.bad?.length > 0 && (
                      <div className="spirit-box bad">
                        <span className="spirit-label">Hung Thần</span>
                        <span className="spirit-value">
                          {spirits.bad.slice(0, 5).join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <style jsx>{`
          .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: flex-start;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
            overflow-y: auto;
          }

          .modal-content {
            background: linear-gradient(135deg, var(--color-bg) 0%, #1a0a00 100%);
            border: 1px solid var(--color-gold-dim);
            border-radius: 20px;
            width: 100%;
            max-width: 900px;
            position: relative;
            margin: 20px 0;
          }

          .close-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(139, 69, 19, 0.3);
            border: 1px solid var(--color-gold-dim);
            color: var(--color-text);
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 10;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .close-btn:hover {
            background: rgba(212, 175, 55, 0.3);
            border-color: var(--color-gold);
          }

          .modal-layout {
            display: flex;
            gap: 24px;
            padding: 24px;
          }

          .card-section {
            flex-shrink: 0;
          }

          .details-section {
            flex: 1;
            min-width: 0;
          }

          .details-header {
            margin-bottom: 20px;
          }

          .details-header .title {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            color: var(--color-gold);
            margin-bottom: 4px;
          }

          .details-header .subtitle {
            color: var(--color-text-dim);
            font-size: 0.95rem;
          }

          .detail-card {
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid var(--color-gold-dim);
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 16px;
          }

          .card-title {
            font-size: 1rem;
            color: var(--color-gold);
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid var(--color-gold-dim);
          }

          .canchi-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }

          .canchi-item {
            text-align: center;
            padding: 12px;
            background: rgba(139, 69, 19, 0.2);
            border-radius: 8px;
          }

          .canchi-item .label {
            display: block;
            font-size: 0.75rem;
            color: var(--color-text-dim);
            margin-bottom: 4px;
          }

          .canchi-item .value {
            display: block;
            font-size: 1rem;
            font-weight: 600;
            color: var(--color-text);
          }

          .canchi-item .chinese {
            display: block;
            font-size: 1.2rem;
            color: var(--color-gold);
            margin-top: 4px;
          }

          .canchi-item .emoji {
            font-size: 1.5rem;
          }

          .truc-sao-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .info-box {
            padding: 12px;
            border-radius: 8px;
            text-align: center;
          }

          .info-box.hoangDao {
            background: rgba(34, 197, 94, 0.15);
            border: 1px solid rgba(34, 197, 94, 0.3);
          }

          .info-box.hacDao {
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid rgba(239, 68, 68, 0.3);
          }

          .info-box.trungBinh {
            background: rgba(59, 130, 246, 0.15);
            border: 1px solid rgba(59, 130, 246, 0.3);
          }

          .box-label {
            display: block;
            font-size: 0.75rem;
            color: var(--color-text-dim);
          }

          .box-value {
            display: block;
            font-size: 1.3rem;
            font-weight: 700;
            color: var(--color-text);
            margin: 4px 0;
          }

          .box-type {
            display: block;
            font-size: 0.8rem;
            color: var(--color-gold);
          }

          .box-meaning {
            display: block;
            font-size: 0.75rem;
            color: var(--color-text-dim);
            margin-top: 4px;
          }

          .hours-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
          }

          .hour-item {
            padding: 8px;
            border-radius: 8px;
            text-align: center;
            font-size: 0.8rem;
          }

          .hour-item.hoang-dao {
            background: rgba(34, 197, 94, 0.1);
            border: 1px solid rgba(34, 197, 94, 0.3);
          }

          .hour-item.hac-dao {
            background: rgba(100, 100, 100, 0.1);
            border: 1px solid rgba(100, 100, 100, 0.3);
            opacity: 0.7;
          }

          .hour-icon {
            font-size: 1rem;
          }

          .hour-name {
            display: block;
            font-weight: 600;
            color: var(--color-text);
          }

          .hour-period {
            display: block;
            font-size: 0.7rem;
            color: var(--color-text-dim);
          }

          .activities-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .activity-box {
            padding: 12px;
            border-radius: 8px;
          }

          .activity-box.good {
            background: rgba(34, 197, 94, 0.1);
          }

          .activity-box.bad {
            background: rgba(239, 68, 68, 0.1);
          }

          .activity-label {
            display: block;
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 8px;
          }

          .activity-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .activity-list li {
            font-size: 0.8rem;
            color: var(--color-text-dim);
            padding: 2px 0;
          }

          .spirits-grid {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .spirit-box {
            padding: 8px 12px;
            border-radius: 8px;
          }

          .spirit-box.good {
            background: rgba(34, 197, 94, 0.1);
          }

          .spirit-box.bad {
            background: rgba(239, 68, 68, 0.1);
          }

          .spirit-label {
            font-size: 0.8rem;
            font-weight: 600;
            margin-right: 8px;
          }

          .spirit-value {
            font-size: 0.8rem;
            color: var(--color-text-dim);
          }

          @media (max-width: 768px) {
            .modal-layout {
              flex-direction: column;
              align-items: center;
            }

            .card-section {
              width: 100%;
              display: flex;
              justify-content: center;
            }

            .canchi-grid,
            .truc-sao-grid,
            .activities-grid {
              grid-template-columns: 1fr;
            }

            .hours-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}
