/**
 * Date Finder Form Component
 * Form nhập thông tin để tìm ngày tốt
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { EventSelector } from './EventSelector';
import { EVENT_TYPES } from '../../utils/auspiciousDate';

export function DateFinderForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    eventType: 'khai-truong',
    person1: {
      name: '',
      birthDate: ''
    },
    person2: {
      name: '',
      birthDate: ''
    },
    dateRange: {
      start: getDefaultStartDate(),
      end: getDefaultEndDate()
    }
  });

  const [errors, setErrors] = useState({});

  function getDefaultStartDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  function getDefaultEndDate() {
    const end = new Date();
    end.setMonth(end.getMonth() + 3);
    return end.toISOString().split('T')[0];
  }

  const handleEventSelect = (eventId) => {
    setFormData(prev => ({ ...prev, eventType: eventId }));
    setErrors({});
  };

  const handlePerson1Change = (field, value) => {
    setFormData(prev => ({
      ...prev,
      person1: { ...prev.person1, [field]: value }
    }));
    setErrors(prev => ({ ...prev, person1: null }));
  };

  const handlePerson2Change = (field, value) => {
    setFormData(prev => ({
      ...prev,
      person2: { ...prev.person2, [field]: value }
    }));
  };

  const handleDateRangeChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      dateRange: { ...prev.dateRange, [field]: value }
    }));
    setErrors(prev => ({ ...prev, dateRange: null }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate person1 (required)
    if (!formData.person1.birthDate) {
      newErrors.person1 = 'Vui lòng nhập ngày sinh';
    }

    // Validate date range
    if (!formData.dateRange.start || !formData.dateRange.end) {
      newErrors.dateRange = 'Vui lòng chọn khoảng thời gian';
    } else {
      const start = new Date(formData.dateRange.start);
      const end = new Date(formData.dateRange.end);
      if (start >= end) {
        newErrors.dateRange = 'Ngày kết thúc phải sau ngày bắt đầu';
      }
      // Limit to 6 months max
      const sixMonths = 180 * 24 * 60 * 60 * 1000;
      if (end - start > sixMonths) {
        newErrors.dateRange = 'Khoảng thời gian tối đa là 6 tháng';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const selectedEvent = EVENT_TYPES[formData.eventType];
  const requiresTwoPeople = selectedEvent?.requiresTwoPeople;

  return (
    <motion.form
      className="date-finder-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <EventSelector
        selectedEvent={formData.eventType}
        onSelect={handleEventSelect}
      />

      <div className="form-sections">
        {/* Person 1 */}
        <motion.div
          className="form-section person-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="section-title">
            {requiresTwoPeople ? 'Người Thứ Nhất' : 'Thông Tin Của Bạn'}
          </h4>

          <div className="form-group">
            <label>Tên (không bắt buộc)</label>
            <input
              type="text"
              value={formData.person1.name}
              onChange={(e) => handlePerson1Change('name', e.target.value)}
              placeholder="Nhập tên..."
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Ngày Sinh *</label>
            <input
              type="date"
              value={formData.person1.birthDate}
              onChange={(e) => handlePerson1Change('birthDate', e.target.value)}
              className={`form-input ${errors.person1 ? 'error' : ''}`}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.person1 && (
              <span className="error-text">{errors.person1}</span>
            )}
          </div>
        </motion.div>

        {/* Person 2 (for events requiring 2 people) */}
        {requiresTwoPeople && (
          <motion.div
            className="form-section person-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="section-title">Người Thứ Hai</h4>

            <div className="form-group">
              <label>Tên (không bắt buộc)</label>
              <input
                type="text"
                value={formData.person2.name}
                onChange={(e) => handlePerson2Change('name', e.target.value)}
                placeholder="Nhập tên..."
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Ngày Sinh</label>
              <input
                type="date"
                value={formData.person2.birthDate}
                onChange={(e) => handlePerson2Change('birthDate', e.target.value)}
                className="form-input"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </motion.div>
        )}

        {/* Date Range */}
        <motion.div
          className="form-section date-range-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="section-title">Khoảng Thời Gian Tìm Kiếm</h4>

          <div className="date-range-inputs">
            <div className="form-group">
              <label>Từ ngày</label>
              <input
                type="date"
                value={formData.dateRange.start}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                className={`form-input ${errors.dateRange ? 'error' : ''}`}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <span className="date-separator">→</span>

            <div className="form-group">
              <label>Đến ngày</label>
              <input
                type="date"
                value={formData.dateRange.end}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                className={`form-input ${errors.dateRange ? 'error' : ''}`}
                min={formData.dateRange.start}
              />
            </div>
          </div>
          {errors.dateRange && (
            <span className="error-text center">{errors.dateRange}</span>
          )}
        </motion.div>
      </div>

      <motion.button
        type="submit"
        className="submit-button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="button-icon">🔮</span>
        Tìm Ngày Tốt
      </motion.button>

      <style jsx>{`
        .date-finder-form {
          background: var(--color-bg-card);
          border: 1px solid var(--color-gold-dim);
          border-radius: 16px;
          padding: 2rem;
        }

        .form-sections {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .form-section {
          background: rgba(139, 69, 19, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          color: var(--color-gold);
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--color-gold-dim);
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group:last-child {
          margin-bottom: 0;
        }

        .form-group label {
          display: block;
          font-size: 0.9rem;
          color: var(--color-text-dim);
          margin-bottom: 0.5rem;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--color-gold-dim);
          border-radius: 8px;
          color: var(--color-text);
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--color-gold);
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
        }

        .form-input.error {
          border-color: #dc3545;
        }

        .error-text {
          display: block;
          color: #dc3545;
          font-size: 0.8rem;
          margin-top: 0.5rem;
        }

        .error-text.center {
          text-align: center;
        }

        .date-range-inputs {
          display: flex;
          align-items: flex-end;
          gap: 1rem;
        }

        .date-range-inputs .form-group {
          flex: 1;
          margin-bottom: 0;
        }

        .date-separator {
          color: var(--color-gold);
          font-size: 1.5rem;
          padding-bottom: 0.75rem;
        }

        .submit-button {
          width: 100%;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, var(--color-gold), var(--color-gold-dark));
          border: none;
          border-radius: 12px;
          color: var(--color-bg);
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: all 0.3s ease;
        }

        .submit-button:hover {
          box-shadow: 0 0 30px rgba(212, 175, 55, 0.4);
        }

        .button-icon {
          font-size: 1.3rem;
        }

        @media (max-width: 600px) {
          .date-finder-form {
            padding: 1.5rem;
          }

          .date-range-inputs {
            flex-direction: column;
            gap: 1rem;
          }

          .date-separator {
            display: none;
          }
        }
      `}</style>
    </motion.form>
  );
}

export default DateFinderForm;
