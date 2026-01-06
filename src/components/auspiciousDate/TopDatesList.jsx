/**
 * Top Dates List Component
 * Hiển thị danh sách các ngày tốt nhất
 */

import { motion } from 'framer-motion';

export function TopDatesList({ dates, selectedDate, onSelectDate, eventInfo }) {
  if (!dates || dates.length === 0) {
    return (
      <div className="no-dates">
        <span className="no-dates-icon">📅</span>
        <p>Không tìm thấy ngày tốt trong khoảng thời gian đã chọn.</p>
        <p className="suggestion">Hãy thử mở rộng khoảng thời gian tìm kiếm.</p>
      </div>
    );
  }

  return (
    <div className="top-dates-list">
      <div className="list-header">
        <h3 className="list-title">
          <span className="title-icon">🏆</span>
          Top {dates.length} Ngày Tốt Nhất
        </h3>
        <p className="list-subtitle">cho {eventInfo.name}</p>
      </div>

      <div className="dates-list">
        {dates.map((dateItem, index) => {
          const { date, dateStr, weekday, evaluation } = dateItem;
          const { total, category, truc, sao, bestHours } = evaluation;
          const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

          return (
            <motion.div
              key={date.toISOString()}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`date-item ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectDate(date)}
            >
              <div className="date-rank" style={{ background: getRankGradient(index) }}>
                #{index + 1}
              </div>

              <div className="date-main">
                <div className="date-header">
                  <span className="date-str">{dateStr}</span>
                  <span className="date-weekday">{weekday}</span>
                </div>

                <div className="date-details">
                  <span className="detail-item">
                    <span className="detail-label">Trực:</span>
                    <span className={`detail-value ${truc.type}`}>{truc.name}</span>
                  </span>
                  <span className="detail-item">
                    <span className="detail-label">Sao:</span>
                    <span className={`detail-value ${sao.type}`}>{sao.name}</span>
                  </span>
                  <span className="detail-item">
                    <span className="detail-label">Giờ tốt:</span>
                    <span className="detail-value hours">
                      {bestHours.slice(0, 2).map(h => h.name).join(', ')}
                    </span>
                  </span>
                </div>
              </div>

              <div className="date-score">
                <div className="score-circle" style={{ borderColor: category.color }}>
                  <span className="score-value" style={{ color: category.color }}>
                    {total}
                  </span>
                </div>
                <span className="score-label" style={{ color: category.color }}>
                  {category.label}
                </span>
              </div>

              <div className="date-arrow">→</div>
            </motion.div>
          );
        })}
      </div>

      <style jsx>{`
        .top-dates-list {
          background: var(--color-bg-card);
          border: 1px solid var(--color-gold-dim);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .no-dates {
          text-align: center;
          padding: 3rem 1.5rem;
          color: var(--color-text-dim);
        }

        .no-dates-icon {
          font-size: 3rem;
          display: block;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .suggestion {
          font-size: 0.9rem;
          margin-top: 0.5rem;
          color: var(--color-gold);
        }

        .list-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .list-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          color: var(--color-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .title-icon {
          font-size: 1.5rem;
        }

        .list-subtitle {
          color: var(--color-text-dim);
          font-size: 0.9rem;
          margin-top: 0.25rem;
        }

        .dates-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .date-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--color-gold-dim);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .date-item:hover {
          background: rgba(139, 69, 19, 0.2);
          border-color: var(--color-gold);
          transform: translateX(5px);
        }

        .date-item.selected {
          background: rgba(212, 175, 55, 0.15);
          border-color: var(--color-gold);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
        }

        .date-rank {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--color-bg);
          flex-shrink: 0;
        }

        .date-main {
          flex: 1;
          min-width: 0;
        }

        .date-header {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .date-str {
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--color-text);
        }

        .date-weekday {
          font-size: 0.9rem;
          color: var(--color-text-dim);
        }

        .date-details {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
        }

        .detail-label {
          color: var(--color-text-dim);
        }

        .detail-value {
          font-weight: 500;
        }

        .detail-value.hoangDao {
          color: #90EE90;
        }

        .detail-value.hacDao {
          color: #FF6B6B;
        }

        .detail-value.trungBinh {
          color: #87CEEB;
        }

        .detail-value.tot {
          color: #90EE90;
        }

        .detail-value.xau {
          color: #FF6B6B;
        }

        .detail-value.hours {
          color: var(--color-gold);
        }

        .date-score {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          flex-shrink: 0;
        }

        .score-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.3);
        }

        .score-value {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .score-label {
          font-size: 0.7rem;
          font-weight: 600;
        }

        .date-arrow {
          color: var(--color-gold-dim);
          font-size: 1.2rem;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .date-item:hover .date-arrow {
          color: var(--color-gold);
          transform: translateX(5px);
        }

        @media (max-width: 600px) {
          .top-dates-list {
            padding: 1rem;
          }

          .date-item {
            flex-wrap: wrap;
            padding: 0.75rem;
          }

          .date-rank {
            width: 32px;
            height: 32px;
            font-size: 0.75rem;
          }

          .date-str {
            font-size: 1rem;
          }

          .date-details {
            gap: 0.25rem 0.75rem;
          }

          .detail-item {
            font-size: 0.75rem;
          }

          .score-circle {
            width: 40px;
            height: 40px;
          }

          .score-value {
            font-size: 0.95rem;
          }

          .date-arrow {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

function getRankGradient(index) {
  if (index === 0) return 'linear-gradient(135deg, #FFD700, #FFA500)';
  if (index === 1) return 'linear-gradient(135deg, #C0C0C0, #A0A0A0)';
  if (index === 2) return 'linear-gradient(135deg, #CD7F32, #8B4513)';
  return 'linear-gradient(135deg, var(--color-gold-dim), rgba(139, 69, 19, 0.5))';
}

export default TopDatesList;
