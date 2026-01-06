/**
 * Event Selector Component
 * Grid hiển thị các loại sự kiện để chọn
 */

import { motion } from 'framer-motion';
import { EVENT_TYPES } from '../../utils/auspiciousDate';

export function EventSelector({ selectedEvent, onSelect }) {
  const events = Object.values(EVENT_TYPES);

  return (
    <div className="event-selector">
      <h3 className="selector-title">Chọn Loại Sự Kiện</h3>

      <div className="events-grid">
        {events.map((event, index) => (
          <motion.button
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`event-card ${selectedEvent === event.id ? 'selected' : ''}`}
            onClick={() => onSelect(event.id)}
          >
            <span className="event-icon">{event.icon}</span>
            <span className="event-name">{event.name}</span>
            <span className="event-desc">{event.description}</span>
            {selectedEvent === event.id && (
              <motion.div
                layoutId="event-selection"
                className="selection-indicator"
                initial={false}
              />
            )}
          </motion.button>
        ))}
      </div>

      <style jsx>{`
        .event-selector {
          margin-bottom: 2rem;
        }

        .selector-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          color: var(--color-gold);
          margin-bottom: 1rem;
          text-align: center;
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1rem;
        }

        .event-card {
          position: relative;
          background: rgba(139, 69, 19, 0.2);
          border: 1px solid var(--color-gold-dim);
          border-radius: 12px;
          padding: 1.2rem 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          overflow: hidden;
        }

        .event-card:hover {
          background: rgba(139, 69, 19, 0.3);
          border-color: var(--color-gold);
          transform: translateY(-2px);
        }

        .event-card.selected {
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(139, 69, 19, 0.3));
          border-color: var(--color-gold);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
        }

        .event-icon {
          font-size: 2rem;
        }

        .event-name {
          font-weight: 600;
          color: var(--color-text);
          font-size: 0.9rem;
          text-align: center;
        }

        .event-desc {
          font-size: 0.75rem;
          color: var(--color-text-dim);
          text-align: center;
          line-height: 1.3;
        }

        .selection-indicator {
          position: absolute;
          inset: 0;
          border: 2px solid var(--color-gold);
          border-radius: 12px;
          pointer-events: none;
        }

        @media (max-width: 600px) {
          .events-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }

          .event-card {
            padding: 1rem 0.75rem;
          }

          .event-icon {
            font-size: 1.5rem;
          }

          .event-name {
            font-size: 0.8rem;
          }

          .event-desc {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default EventSelector;
