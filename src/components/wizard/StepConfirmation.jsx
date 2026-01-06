import { motion } from 'framer-motion';
import { User, Calendar, MapPin, Clock, Check, Star, FileText, Hand, Smile } from 'lucide-react';
import { Solar, Lunar } from 'lunar-javascript';
import { BIRTH_HOURS, getBirthHourFromTime, TIME_PERIODS, VIETNAM_PROVINCES } from '../../utils/birthHourMapping';

export default function StepConfirmation({ data, updateData }) {
  // Calculate lunar date
  const getLunarDate = () => {
    try {
      if (!data.birthYear || !data.birthMonth || !data.birthDay) return null;
      const solar = Solar.fromYmd(
        parseInt(data.birthYear),
        parseInt(data.birthMonth),
        parseInt(data.birthDay)
      );
      const lunar = solar.getLunar();
      return {
        day: lunar.getDay(),
        month: lunar.getMonth(),
        year: lunar.getYear(),
        yearGanZhi: lunar.getYearInGanZhi(),
        monthGanZhi: lunar.getMonthInGanZhi(),
        dayGanZhi: lunar.getDayInGanZhi()
      };
    } catch (e) {
      return null;
    }
  };

  const lunarDate = getLunarDate();

  // Get birth hour info
  const getBirthHourInfo = () => {
    if (data.birthTimeType === 'exact' && data.birthHour) {
      return getBirthHourFromTime(parseInt(data.birthHour), parseInt(data.birthMinute || 0));
    } else if (data.birthTimeType === 'period' && data.birthPeriod) {
      const period = TIME_PERIODS.find(p => p.id === data.birthPeriod);
      if (period) {
        return getBirthHourFromTime(period.defaultHour);
      }
    } else {
      // Unknown - use Ngọ
      return BIRTH_HOURS.find(h => h.id === 'ngo');
    }
    return null;
  };

  const birthHour = getBirthHourInfo();

  // Get province name
  const getProvinceName = () => {
    if (data.birthPlaceType === 'vietnam' && data.birthProvince) {
      const province = VIETNAM_PROVINCES.find(p => p.id === data.birthProvince);
      return province ? province.name : '';
    } else if (data.birthPlaceType === 'foreign') {
      return `${data.birthCity}, ${data.birthCountry}`;
    }
    return 'Không xác định';
  };

  const handleSectionToggle = (section) => {
    updateData({ [section]: !data[section] });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-gold)]/20 border border-[var(--color-gold)]/30 mb-4"
        >
          <Check size={28} className="text-[var(--color-gold)]" />
        </motion.div>
        <h2 className="font-display text-2xl text-[var(--color-ivory)] mb-2">
          Xác Nhận Thông Tin
        </h2>
        <p className="text-[var(--color-mist)] text-sm">
          Kiểm tra lại thông tin trước khi bắt đầu phân tích
        </p>
      </div>

      {/* Info Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[var(--color-charcoal)] to-[var(--color-obsidian)] rounded-2xl p-6 border border-[var(--color-gold)]/30"
      >
        <div className="space-y-4">
          {/* Name & Gender */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center">
              <User size={20} className="text-[var(--color-gold)]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-display text-[var(--color-ivory)]">
                {data.fullName}
                {data.nickname && <span className="text-[var(--color-mist)]"> ({data.nickname})</span>}
              </h3>
              <p className="text-sm text-[var(--color-mist)]">
                {data.gender === 'male' ? '♂ Nam' : data.gender === 'female' ? '♀ Nữ' : '☯ Khác'}
              </p>
            </div>
          </div>

          {/* Birth Date */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--color-jade)]/20 flex items-center justify-center">
              <Calendar size={20} className="text-[var(--color-jade)]" />
            </div>
            <div className="flex-1">
              <p className="text-[var(--color-ivory)]">
                {data.birthDay}/{data.birthMonth}/{data.birthYear}
              </p>
              {lunarDate && (
                <p className="text-sm text-[var(--color-gold)]">
                  Âm lịch: {lunarDate.day}/{lunarDate.month}/{lunarDate.yearGanZhi}
                </p>
              )}
            </div>
          </div>

          {/* Birth Time */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--color-fire)]/20 flex items-center justify-center">
              <Clock size={20} className="text-[var(--color-fire)]" />
            </div>
            <div className="flex-1">
              {birthHour && (
                <div className="flex items-center gap-2">
                  <span className="text-xl">{birthHour.emoji}</span>
                  <div>
                    <p className="text-[var(--color-ivory)]">
                      Giờ {birthHour.name} ({birthHour.timeRange})
                    </p>
                    <p className="text-xs text-[var(--color-mist)]">{birthHour.characteristics}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Birth Place */}
          {data.birthPlaceType !== 'skip' && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--color-water)]/20 flex items-center justify-center">
                <MapPin size={20} className="text-[var(--color-water)]" />
              </div>
              <div className="flex-1">
                <p className="text-[var(--color-ivory)]">{getProvinceName()}</p>
                {data.birthPlaceType === 'vietnam' && (
                  <p className="text-xs text-[var(--color-mist)]">Múi giờ: GMT+7</p>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Analysis Options */}
      <div className="space-y-3">
        <h3 className="font-display text-lg text-[var(--color-pearl)]">
          Chọn phương pháp phân tích:
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {[
            {
              key: 'includeAstrology',
              label: 'Tử Vi',
              desc: 'Lá số 12 cung',
              icon: Star,
              color: 'fire',
              required: false
            },
            {
              key: 'includeNumerology',
              label: 'Thần Số Học',
              desc: 'Pythagorean',
              icon: FileText,
              color: 'jade',
              required: false
            },
            {
              key: 'includePalmistry',
              label: 'Tướng Tay',
              desc: 'Nhập thủ công',
              icon: Hand,
              color: 'water',
              required: false
            },
            {
              key: 'includePhysiognomy',
              label: 'Tướng Mặt',
              desc: 'Nhập thủ công',
              icon: Smile,
              color: 'gold',
              required: false
            }
          ].map((option) => {
            const Icon = option.icon;
            const isSelected = data[option.key];

            return (
              <motion.button
                key={option.key}
                type="button"
                onClick={() => handleSectionToggle(option.key)}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                  isSelected
                    ? `border-[var(--color-${option.color})] bg-[var(--color-${option.color})]/15`
                    : 'border-[var(--color-smoke)] hover:border-[var(--color-gold)]/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                  isSelected
                    ? `border-[var(--color-${option.color})] bg-[var(--color-${option.color})]`
                    : 'border-[var(--color-mist)]'
                }`}>
                  {isSelected && <Check size={14} className="text-white" />}
                </div>
                <Icon size={20} className={isSelected ? `text-[var(--color-${option.color})]` : 'text-[var(--color-mist)]'} />
                <div>
                  <p className={`text-sm font-medium ${isSelected ? 'text-[var(--color-ivory)]' : 'text-[var(--color-pearl)]'}`}>
                    {option.label}
                  </p>
                  <p className="text-xs text-[var(--color-mist)]">{option.desc}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Ready Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center p-4 bg-[var(--color-gold)]/5 rounded-xl border border-[var(--color-gold)]/20"
      >
        <p className="text-[var(--color-gold)] text-sm">
          ✨ Sẵn sàng khám phá vận mệnh của bạn!
        </p>
        <p className="text-xs text-[var(--color-mist)] mt-1">
          Nhấn "Khám Phá Vận Mệnh" để bắt đầu phân tích
        </p>
      </motion.div>
    </div>
  );
}
