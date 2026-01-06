/**
 * Auspicious Date Page
 * Trang Xem Ngày Tốt
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DateFinderForm,
  CalendarView,
  TopDatesList,
  DateDetailModal
} from '../components/auspiciousDate';
import { AuspiciousDateFinder, EVENT_TYPES } from '../utils/auspiciousDate';
import { LoadingOracle } from '../components/animations';

export function AuspiciousDatePage() {
  const [stage, setStage] = useState('input'); // 'input' | 'loading' | 'results'
  const [finder, setFinder] = useState(null);
  const [results, setResults] = useState(null);
  const [formData, setFormData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateDetails, setDateDetails] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'

  const handleSubmit = useCallback((data) => {
    setFormData(data);
    setStage('loading');

    // Simulate loading for better UX
    setTimeout(() => {
      const person1 = data.person1.birthDate ? {
        name: data.person1.name || 'Bạn',
        birthDate: data.person1.birthDate
      } : null;

      const person2 = data.person2?.birthDate ? {
        name: data.person2.name || 'Người thứ hai',
        birthDate: data.person2.birthDate
      } : null;

      const newFinder = new AuspiciousDateFinder(data.eventType, person1, person2);

      const auspiciousDates = newFinder.findAuspiciousDates(
        data.dateRange.start,
        data.dateRange.end,
        20 // Get top 20 dates
      );

      setFinder(newFinder);
      setResults({
        dates: auspiciousDates,
        eventInfo: EVENT_TYPES[data.eventType],
        dateRange: data.dateRange,
        person1,
        person2
      });

      setStage('results');
    }, 2000);
  }, []);

  const handleSelectDate = useCallback((date) => {
    if (!finder) return;
    setSelectedDate(date);
    const details = finder.getDateDetails(date);
    setDateDetails(details);
  }, [finder]);

  const handleCloseModal = useCallback(() => {
    setDateDetails(null);
  }, []);

  const handleReset = useCallback(() => {
    setStage('input');
    setFinder(null);
    setResults(null);
    setFormData(null);
    setSelectedDate(null);
    setDateDetails(null);
  }, []);

  return (
    <div className="auspicious-date-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="page-title">Xem Ngày Tốt</h1>
        <p className="page-subtitle">
          Tìm ngày lành tháng tốt cho các sự kiện quan trọng
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {stage === 'input' && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <DateFinderForm onSubmit={handleSubmit} />
          </motion.div>
        )}

        {stage === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="loading-container"
          >
            <LoadingOracle
              type="auspicious"
              messages={[
                'Đang tra cứu lịch âm dương...',
                'Phân tích 12 Trực...',
                'Xem xét 28 Sao...',
                'Tính toán giờ Hoàng Đạo...',
                'Kiểm tra xung tuổi...',
                'Tìm ngày đẹp nhất...'
              ]}
            />
          </motion.div>
        )}

        {stage === 'results' && results && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="results-container"
          >
            {/* Results Header */}
            <div className="results-header">
              <div className="results-info">
                <div className="event-badge">
                  <span className="event-icon">{results.eventInfo.icon}</span>
                  <span className="event-name">{results.eventInfo.name}</span>
                </div>
                <p className="date-range-info">
                  Từ {formatDate(results.dateRange.start)} đến {formatDate(results.dateRange.end)}
                </p>
                {results.person1 && (
                  <p className="person-info">
                    Tuổi: {results.person1.name}
                    {results.person2 && ` & ${results.person2.name}`}
                  </p>
                )}
              </div>

              <div className="results-actions">
                <div className="view-toggle">
                  <button
                    className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    📋 Danh sách
                  </button>
                  <button
                    className={`toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
                    onClick={() => setViewMode('calendar')}
                  >
                    📅 Lịch
                  </button>
                </div>
                <button className="reset-btn" onClick={handleReset}>
                  Tìm lại
                </button>
              </div>
            </div>

            {/* View Content */}
            <AnimatePresence mode="wait">
              {viewMode === 'list' ? (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <TopDatesList
                    dates={results.dates}
                    selectedDate={selectedDate}
                    onSelectDate={handleSelectDate}
                    eventInfo={results.eventInfo}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <CalendarView
                    auspiciousDates={results.dates}
                    selectedDate={selectedDate}
                    onSelectDate={handleSelectDate}
                    startDate={results.dateRange.start}
                    endDate={results.dateRange.end}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Summary Stats */}
            <div className="summary-stats">
              <div className="stat-card">
                <span className="stat-value">{results.dates.length}</span>
                <span className="stat-label">Ngày tốt tìm được</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">
                  {results.dates.filter(d => d.evaluation.total >= 90).length}
                </span>
                <span className="stat-label">Ngày Đại Cát</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">
                  {results.dates[0]?.evaluation.total || '-'}
                </span>
                <span className="stat-label">Điểm cao nhất</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Date Detail Modal */}
      {dateDetails && (
        <DateDetailModal
          dateDetails={dateDetails}
          eventInfo={results?.eventInfo}
          onClose={handleCloseModal}
        />
      )}

      <style jsx>{`
        .auspicious-date-page {
          max-width: 800px;
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

        .loading-container {
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .results-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--color-bg-card);
          border: 1px solid var(--color-gold-dim);
          border-radius: 16px;
        }

        .results-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .event-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(139, 69, 19, 0.2));
          border: 1px solid var(--color-gold-dim);
          border-radius: 30px;
          width: fit-content;
        }

        .event-icon {
          font-size: 1.2rem;
        }

        .event-name {
          font-weight: 600;
          color: var(--color-gold);
        }

        .date-range-info,
        .person-info {
          font-size: 0.9rem;
          color: var(--color-text-dim);
        }

        .results-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.75rem;
        }

        .view-toggle {
          display: flex;
          gap: 0.5rem;
          background: rgba(0, 0, 0, 0.3);
          padding: 0.25rem;
          border-radius: 10px;
        }

        .toggle-btn {
          padding: 0.5rem 1rem;
          background: transparent;
          border: none;
          border-radius: 8px;
          color: var(--color-text-dim);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .toggle-btn.active {
          background: rgba(212, 175, 55, 0.2);
          color: var(--color-gold);
        }

        .toggle-btn:hover:not(.active) {
          color: var(--color-text);
        }

        .reset-btn {
          padding: 0.5rem 1rem;
          background: rgba(139, 69, 19, 0.3);
          border: 1px solid var(--color-gold-dim);
          border-radius: 8px;
          color: var(--color-text);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .reset-btn:hover {
          background: rgba(139, 69, 19, 0.5);
          border-color: var(--color-gold);
        }

        .summary-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .stat-card {
          background: var(--color-bg-card);
          border: 1px solid var(--color-gold-dim);
          border-radius: 12px;
          padding: 1.25rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-gold);
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--color-text-dim);
        }

        @media (max-width: 600px) {
          .auspicious-date-page {
            padding: 5rem 1rem 1rem;
          }

          .page-title {
            font-size: 2rem;
          }

          .results-header {
            flex-direction: column;
            align-items: stretch;
          }

          .results-actions {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }

          .summary-stats {
            grid-template-columns: 1fr;
          }

          .stat-card {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }

          .stat-value {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

export default AuspiciousDatePage;
