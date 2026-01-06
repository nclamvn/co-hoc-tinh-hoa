import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { BIRTH_HOURS, TIME_PERIODS, getBirthHourFromTime } from '../../utils/birthHourMapping';

export default function StepBirthDateTime({ data, updateData }) {
  const [showHourInfo, setShowHourInfo] = useState(false);

  const selectedBirthHour = data.birthHour && data.birthMinute
    ? getBirthHourFromTime(parseInt(data.birthHour), parseInt(data.birthMinute))
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-jade)]/20 border border-[var(--color-jade)]/30 mb-4"
        >
          <span className="text-3xl">🌙</span>
        </motion.div>
        <h2 className="font-display text-2xl text-[var(--color-ivory)] mb-2">
          Thời Khắc Bạn Chào Đời
        </h2>
        <p className="text-[var(--color-mist)] text-sm">
          Ngày giờ sinh là nền tảng của mọi phương pháp luận đoán
        </p>
      </div>

      {/* Birth Date */}
      <div>
        <label className="flex items-center gap-2 text-[var(--color-pearl)] mb-3 font-display">
          <Calendar size={18} className="text-[var(--color-gold)]" />
          Ngày sinh dương lịch <span className="text-[var(--color-fire)]">*</span>
        </label>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <input
              type="number"
              value={data.birthDay}
              onChange={(e) => updateData({ birthDay: e.target.value })}
              placeholder="Ngày"
              min="1"
              max="31"
              className="input-mystical w-full rounded-xl text-center text-lg"
            />
            <span className="text-xs text-[var(--color-mist)] block text-center mt-1">Ngày</span>
          </div>
          <div>
            <input
              type="number"
              value={data.birthMonth}
              onChange={(e) => updateData({ birthMonth: e.target.value })}
              placeholder="Tháng"
              min="1"
              max="12"
              className="input-mystical w-full rounded-xl text-center text-lg"
            />
            <span className="text-xs text-[var(--color-mist)] block text-center mt-1">Tháng</span>
          </div>
          <div>
            <input
              type="number"
              value={data.birthYear}
              onChange={(e) => updateData({ birthYear: e.target.value })}
              placeholder="Năm"
              min="1900"
              max="2100"
              className="input-mystical w-full rounded-xl text-center text-lg"
            />
            <span className="text-xs text-[var(--color-mist)] block text-center mt-1">Năm</span>
          </div>
        </div>
      </div>

      {/* Birth Time Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-[var(--color-pearl)] font-display">
            <Clock size={18} className="text-[var(--color-jade)]" />
            Giờ sinh
          </label>
          <button
            type="button"
            onClick={() => setShowHourInfo(!showHourInfo)}
            className="flex items-center gap-1 text-xs text-[var(--color-gold)] hover:underline"
          >
            <Info size={14} />
            Tại sao giờ sinh quan trọng?
            {showHourInfo ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Hour Info Expandable */}
        <AnimatePresence>
          {showHourInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-[var(--color-charcoal)] rounded-xl p-4 border border-[var(--color-gold)]/20">
                <p className="text-sm text-[var(--color-pearl)] mb-3">
                  Trong Tử Vi Đẩu Số, giờ sinh quyết định vị trí của <strong className="text-[var(--color-gold)]">Cung Mệnh</strong> -
                  nơi an vị các sao chính, ảnh hưởng trực tiếp đến tính cách và vận mệnh.
                </p>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {BIRTH_HOURS.map((hour) => (
                    <div key={hour.id} className="text-center p-2 bg-[var(--color-smoke)]/30 rounded-lg">
                      <span className="text-lg">{hour.emoji}</span>
                      <p className="text-xs text-[var(--color-gold)]">{hour.name}</p>
                      <p className="text-[10px] text-[var(--color-mist)]">{hour.timeRange}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Birth Time Type Selection */}
        <div className="space-y-3">
          {/* Option 1: Exact Time */}
          <motion.div
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              data.birthTimeType === 'exact'
                ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10'
                : 'border-[var(--color-smoke)] hover:border-[var(--color-gold)]/50'
            }`}
            onClick={() => updateData({ birthTimeType: 'exact' })}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                data.birthTimeType === 'exact' ? 'border-[var(--color-gold)]' : 'border-[var(--color-mist)]'
              }`}>
                {data.birthTimeType === 'exact' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-gold)]" />
                )}
              </div>
              <span className={data.birthTimeType === 'exact' ? 'text-[var(--color-gold)]' : 'text-[var(--color-pearl)]'}>
                Biết chính xác giờ sinh
              </span>
            </div>

            {data.birthTimeType === 'exact' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="ml-8 flex items-center gap-2"
              >
                <input
                  type="number"
                  value={data.birthHour}
                  onChange={(e) => updateData({ birthHour: e.target.value })}
                  placeholder="Giờ"
                  min="0"
                  max="23"
                  className="input-mystical w-20 rounded-lg text-center"
                />
                <span className="text-[var(--color-gold)] text-xl">:</span>
                <input
                  type="number"
                  value={data.birthMinute}
                  onChange={(e) => updateData({ birthMinute: e.target.value })}
                  placeholder="Phút"
                  min="0"
                  max="59"
                  className="input-mystical w-20 rounded-lg text-center"
                />

                {selectedBirthHour && (
                  <div className="ml-4 flex items-center gap-2 text-sm">
                    <span className="text-xl">{selectedBirthHour.emoji}</span>
                    <span className="text-[var(--color-gold)]">Giờ {selectedBirthHour.name}</span>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Option 2: Approximate Period */}
          <motion.div
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              data.birthTimeType === 'period'
                ? 'border-[var(--color-jade)] bg-[var(--color-jade)]/10'
                : 'border-[var(--color-smoke)] hover:border-[var(--color-jade)]/50'
            }`}
            onClick={() => updateData({ birthTimeType: 'period' })}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                data.birthTimeType === 'period' ? 'border-[var(--color-jade)]' : 'border-[var(--color-mist)]'
              }`}>
                {data.birthTimeType === 'period' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-jade)]" />
                )}
              </div>
              <span className={data.birthTimeType === 'period' ? 'text-[var(--color-jade)]' : 'text-[var(--color-pearl)]'}>
                Chỉ biết khoảng thời gian
              </span>
            </div>

            {data.birthTimeType === 'period' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="ml-8"
              >
                <select
                  value={data.birthPeriod}
                  onChange={(e) => updateData({ birthPeriod: e.target.value })}
                  className="input-mystical w-full rounded-lg"
                >
                  <option value="">-- Chọn khoảng thời gian --</option>
                  {TIME_PERIODS.map((period) => (
                    <option key={period.id} value={period.id}>
                      {period.label}
                    </option>
                  ))}
                </select>
              </motion.div>
            )}
          </motion.div>

          {/* Option 3: Unknown */}
          <motion.div
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              data.birthTimeType === 'unknown'
                ? 'border-[var(--color-mist)] bg-[var(--color-mist)]/10'
                : 'border-[var(--color-smoke)] hover:border-[var(--color-mist)]/50'
            }`}
            onClick={() => updateData({ birthTimeType: 'unknown', birthHour: '12', birthMinute: '0' })}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                data.birthTimeType === 'unknown' ? 'border-[var(--color-mist)]' : 'border-[var(--color-mist)]'
              }`}>
                {data.birthTimeType === 'unknown' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-mist)]" />
                )}
              </div>
              <div>
                <span className={data.birthTimeType === 'unknown' ? 'text-[var(--color-ivory)]' : 'text-[var(--color-pearl)]'}>
                  Không biết giờ sinh
                </span>
                <p className="text-xs text-[var(--color-mist)]">
                  Sẽ sử dụng giờ Ngọ (12:00) - thời điểm trung hòa nhất
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
