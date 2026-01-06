/**
 * Hour Selector Component
 * Hiển thị tất cả giờ trong ngày với phân loại Hoàng Đạo / Hắc Đạo
 */

import { motion } from 'framer-motion';

export function HourSelector({ hours, selectedHour, onSelectHour }) {
  return (
    <div className="hour-selector">
      <div className="hours-grid">
        {hours.map((hour, index) => (
          <motion.div
            key={hour.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
            className={`hour-card ${hour.isHoangDao ? 'hoang-dao' : 'hac-dao'} ${selectedHour === hour.name ? 'selected' : ''}`}
            onClick={() => onSelectHour?.(hour.name)}
          >
            <span className="hour-type-icon">
              {hour.isHoangDao ? '☀️' : '🌙'}
            </span>
            <span className="hour-name">
              {hour.name}
            </span>
            <span className="hour-period">
              {hour.period}
            </span>
            <span className={`hour-type-label ${hour.isHoangDao ? 'good' : 'bad'}`}>
              {hour.isHoangDao ? 'Hoàng Đạo' : 'Hắc Đạo'}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="hour-legend">
        <div className="legend-item">
          <span className="legend-icon">☀️</span>
          <span>Giờ Hoàng Đạo - Tốt cho mọi việc</span>
        </div>
        <div className="legend-item">
          <span className="legend-icon">🌙</span>
          <span>Giờ Hắc Đạo - Nên tránh việc lớn</span>
        </div>
      </div>

      <style jsx>{`
        .hour-selector {
          margin-top: 0.5rem;
        }

        .hours-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
        }

        .hour-card {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--color-gold-dim);
          border-radius: 10px;
          padding: 0.75rem 0.5rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .hour-card:hover {
          transform: translateY(-2px);
        }

        .hour-card.hoang-dao {
          background: linear-gradient(135deg, rgba(144, 238, 144, 0.1), rgba(144, 238, 144, 0.05));
          border-color: rgba(144, 238, 144, 0.4);
        }

        .hour-card.hoang-dao:hover {
          border-color: rgba(144, 238, 144, 0.7);
          box-shadow: 0 0 15px rgba(144, 238, 144, 0.2);
        }

        .hour-card.hac-dao {
          background: linear-gradient(135deg, rgba(100, 100, 100, 0.1), rgba(100, 100, 100, 0.05));
          border-color: rgba(150, 150, 150, 0.3);
          opacity: 0.7;
        }

        .hour-card.hac-dao:hover {
          opacity: 1;
          border-color: rgba(150, 150, 150, 0.5);
        }

        .hour-card.selected {
          border-color: var(--color-gold);
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
        }

        .hour-type-icon {
          font-size: 1.2rem;
        }

        .hour-name {
          font-weight: 600;
          color: var(--color-text);
          font-size: 0.95rem;
        }

        .hour-period {
          font-size: 0.75rem;
          color: var(--color-text-dim);
        }

        .hour-type-label {
          font-size: 0.7rem;
          padding: 0.15rem 0.5rem;
          border-radius: 10px;
          margin-top: 0.25rem;
        }

        .hour-type-label.good {
          background: rgba(144, 238, 144, 0.2);
          color: #90EE90;
        }

        .hour-type-label.bad {
          background: rgba(150, 150, 150, 0.2);
          color: #999;
        }

        .hour-legend {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 1rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--color-gold-dim);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--color-text-dim);
        }

        .legend-icon {
          font-size: 1rem;
        }

        @media (max-width: 600px) {
          .hours-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
          }

          .hour-card {
            padding: 0.5rem;
          }

          .hour-type-icon {
            font-size: 1rem;
          }

          .hour-name {
            font-size: 0.85rem;
          }

          .hour-period {
            font-size: 0.65rem;
          }

          .hour-type-label {
            font-size: 0.6rem;
          }

          .hour-legend {
            flex-direction: column;
            gap: 0.5rem;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}

export default HourSelector;
