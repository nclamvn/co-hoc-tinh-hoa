/**
 * Date Detail Modal Component
 * Modal hiển thị chi tiết ngày được chọn
 */

import { motion, AnimatePresence } from 'framer-motion';
import { HourSelector } from './HourSelector';

export function DateDetailModal({ dateDetails, eventInfo, onClose }) {
  if (!dateDetails) return null;

  const { date, dateStr, weekday, evaluation, allHours, person1, person2 } = dateDetails;
  const { total, dayChi, truc, sao, zodiac, bestHours, category } = evaluation;

  const getScoreColor = (score) => {
    if (score >= 90) return '#FFD700';
    if (score >= 75) return '#90EE90';
    if (score >= 65) return '#87CEEB';
    if (score >= 50) return '#DDA0DD';
    return '#FF6B6B';
  };

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
          <button className="close-button" onClick={onClose}>×</button>

          {/* Header */}
          <div className="modal-header">
            <div className="date-badge" style={{ borderColor: category.color }}>
              <span className="category-emoji">{category.emoji}</span>
              <span className="category-label">{category.label}</span>
            </div>
            <h2 className="date-title">{dateStr}</h2>
            <p className="date-weekday">{weekday}</p>
          </div>

          {/* Main Score */}
          <div className="score-section">
            <div className="main-score" style={{ color: getScoreColor(total) }}>
              {total}
              <span className="score-unit">/100</span>
            </div>
            <p className="score-desc">Điểm đánh giá cho {eventInfo.name}</p>
          </div>

          {/* Detail Breakdown */}
          <div className="details-section">
            {/* Trực */}
            <div className="detail-card">
              <div className="detail-header">
                <span className="detail-icon">📅</span>
                <span className="detail-title">Trực: {truc.name}</span>
              </div>
              <div className="detail-body">
                <div className="detail-row">
                  <span>Loại:</span>
                  <span className={`badge ${truc.type}`}>
                    {truc.type === 'hoangDao' ? 'Hoàng Đạo' : truc.type === 'hacDao' ? 'Hắc Đạo' : 'Trung Bình'}
                  </span>
                </div>
                <div className="detail-row">
                  <span>Điểm:</span>
                  <span style={{ color: getScoreColor(truc.score) }}>{truc.score}</span>
                </div>
                <p className="detail-reason">{truc.reason}</p>
              </div>
            </div>

            {/* Sao */}
            <div className="detail-card">
              <div className="detail-header">
                <span className="detail-icon">⭐</span>
                <span className="detail-title">Sao: {sao.name}</span>
              </div>
              <div className="detail-body">
                <div className="detail-row">
                  <span>Loại:</span>
                  <span className={`badge ${sao.type}`}>
                    {sao.type === 'tot' ? 'Cát Tinh' : 'Hung Tinh'}
                  </span>
                </div>
                <div className="detail-row">
                  <span>Điểm:</span>
                  <span style={{ color: getScoreColor(sao.score) }}>{sao.score}</span>
                </div>
              </div>
            </div>

            {/* Chi ngày */}
            <div className="detail-card">
              <div className="detail-header">
                <span className="detail-icon">🐲</span>
                <span className="detail-title">Địa Chi: {dayChi}</span>
              </div>
              <div className="detail-body">
                {zodiac.warnings.length > 0 ? (
                  <div className="warnings">
                    {zodiac.warnings.map((w, i) => (
                      <p key={i} className="warning-text">⚠️ {w}</p>
                    ))}
                  </div>
                ) : (
                  <p className="success-text">✓ Không xung với tuổi của bạn</p>
                )}
              </div>
            </div>
          </div>

          {/* Best Hours */}
          <div className="hours-section">
            <h3 className="section-title">
              <span className="title-icon">⏰</span>
              Giờ Tốt Nhất
            </h3>
            <div className="best-hours">
              {bestHours.map((hour, index) => (
                <div key={hour.name} className="best-hour-card">
                  <span className="hour-rank">#{index + 1}</span>
                  <span className="hour-name">Giờ {hour.name}</span>
                  <span className="hour-period">{hour.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* All Hours */}
          <div className="all-hours-section">
            <h3 className="section-title">
              <span className="title-icon">🕐</span>
              Tất Cả Giờ Trong Ngày
            </h3>
            <HourSelector hours={allHours} />
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <motion.button
              className="action-button primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
            >
              Đóng
            </motion.button>
          </div>
        </motion.div>

        <style jsx>{`
          .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.85);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 1rem;
            overflow-y: auto;
          }

          .modal-content {
            background: linear-gradient(135deg, var(--color-bg) 0%, #1a0a00 100%);
            border: 1px solid var(--color-gold-dim);
            border-radius: 20px;
            width: 100%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            padding: 2rem;
          }

          .close-button {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: rgba(139, 69, 19, 0.3);
            border: 1px solid var(--color-gold-dim);
            color: var(--color-text);
            font-size: 1.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .close-button:hover {
            background: rgba(212, 175, 55, 0.3);
            border-color: var(--color-gold);
          }

          .modal-header {
            text-align: center;
            margin-bottom: 1.5rem;
          }

          .date-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            background: rgba(0, 0, 0, 0.3);
            border: 2px solid;
            border-radius: 30px;
            margin-bottom: 0.75rem;
          }

          .category-emoji {
            font-size: 1.2rem;
          }

          .category-label {
            font-weight: 600;
            color: var(--color-text);
          }

          .date-title {
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            color: var(--color-gold);
            margin-bottom: 0.25rem;
          }

          .date-weekday {
            color: var(--color-text-dim);
            font-size: 1.1rem;
          }

          .score-section {
            text-align: center;
            padding: 1.5rem;
            background: rgba(139, 69, 19, 0.2);
            border-radius: 16px;
            margin-bottom: 1.5rem;
          }

          .main-score {
            font-size: 4rem;
            font-weight: 700;
            line-height: 1;
          }

          .score-unit {
            font-size: 1.5rem;
            color: var(--color-text-dim);
            font-weight: 400;
          }

          .score-desc {
            color: var(--color-text-dim);
            margin-top: 0.5rem;
          }

          .details-section {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }

          .detail-card {
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid var(--color-gold-dim);
            border-radius: 12px;
            overflow: hidden;
          }

          .detail-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 1rem;
            background: rgba(139, 69, 19, 0.2);
            border-bottom: 1px solid var(--color-gold-dim);
          }

          .detail-icon {
            font-size: 1.2rem;
          }

          .detail-title {
            font-weight: 600;
            color: var(--color-gold);
          }

          .detail-body {
            padding: 1rem;
          }

          .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
          }

          .detail-row span:first-child {
            color: var(--color-text-dim);
          }

          .badge {
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
          }

          .badge.hoangDao {
            background: rgba(144, 238, 144, 0.2);
            color: #90EE90;
          }

          .badge.hacDao {
            background: rgba(255, 107, 107, 0.2);
            color: #FF6B6B;
          }

          .badge.trungBinh {
            background: rgba(135, 206, 235, 0.2);
            color: #87CEEB;
          }

          .badge.tot {
            background: rgba(144, 238, 144, 0.2);
            color: #90EE90;
          }

          .badge.xau {
            background: rgba(255, 107, 107, 0.2);
            color: #FF6B6B;
          }

          .detail-reason {
            font-size: 0.9rem;
            color: var(--color-text-dim);
            font-style: italic;
            margin-top: 0.5rem;
          }

          .warnings {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .warning-text {
            color: #FFA500;
            font-size: 0.9rem;
          }

          .success-text {
            color: #90EE90;
            font-size: 0.9rem;
          }

          .hours-section,
          .all-hours-section {
            margin-bottom: 1.5rem;
          }

          .section-title {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-family: 'Playfair Display', serif;
            font-size: 1.1rem;
            color: var(--color-gold);
            margin-bottom: 1rem;
          }

          .title-icon {
            font-size: 1.2rem;
          }

          .best-hours {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
          }

          .best-hour-card {
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(139, 69, 19, 0.2));
            border: 1px solid var(--color-gold-dim);
            border-radius: 12px;
            padding: 1rem;
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }

          .hour-rank {
            font-size: 0.8rem;
            color: var(--color-gold);
            font-weight: 600;
          }

          .hour-name {
            font-weight: 600;
            color: var(--color-text);
          }

          .hour-period {
            font-size: 0.85rem;
            color: var(--color-text-dim);
          }

          .modal-actions {
            display: flex;
            justify-content: center;
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--color-gold-dim);
          }

          .action-button {
            padding: 0.75rem 2rem;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .action-button.primary {
            background: linear-gradient(135deg, var(--color-gold), var(--color-gold-dark));
            border: none;
            color: var(--color-bg);
          }

          .action-button.primary:hover {
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
          }

          @media (max-width: 600px) {
            .modal-content {
              padding: 1.5rem;
            }

            .date-title {
              font-size: 1.5rem;
            }

            .main-score {
              font-size: 3rem;
            }

            .best-hours {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}

export default DateDetailModal;
