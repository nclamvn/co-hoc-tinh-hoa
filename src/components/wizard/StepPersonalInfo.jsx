import { motion } from 'framer-motion';
import { User, Sparkles } from 'lucide-react';

export default function StepPersonalInfo({ data, updateData }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-gold)]/20 border border-[var(--color-gold)]/30 mb-4"
        >
          <Sparkles size={28} className="text-[var(--color-gold)]" />
        </motion.div>
        <h2 className="font-display text-2xl text-[var(--color-ivory)] mb-2">
          Bắt Đầu Hành Trình Khám Phá Vận Mệnh
        </h2>
        <p className="text-[var(--color-mist)] text-sm">
          Hãy cho chúng tôi biết một chút về bạn
        </p>
      </div>

      {/* Full Name */}
      <div>
        <label className="flex items-center gap-2 text-[var(--color-pearl)] mb-3 font-display">
          <User size={18} className="text-[var(--color-gold)]" />
          Họ và Tên đầy đủ <span className="text-[var(--color-fire)]">*</span>
        </label>
        <input
          type="text"
          value={data.fullName}
          onChange={(e) => updateData({ fullName: e.target.value })}
          placeholder="Nguyễn Văn An"
          className="input-mystical w-full rounded-xl text-lg"
          autoFocus
        />
        <p className="text-[var(--color-mist)] text-xs mt-2">
          Tên đầy đủ giúp tính toán Thần Số Học chính xác
        </p>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-[var(--color-pearl)] mb-3 font-display">
          Giới tính <span className="text-[var(--color-fire)]">*</span>
        </label>
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: 'male', label: 'Nam', icon: '♂', desc: 'Dương' },
            { value: 'female', label: 'Nữ', icon: '♀', desc: 'Âm' },
            { value: 'other', label: 'Khác', icon: '☯', desc: 'Trung hòa' }
          ].map((option) => (
            <motion.button
              key={option.value}
              type="button"
              onClick={() => updateData({ gender: option.value })}
              className={`flex flex-col items-center p-4 rounded-xl border transition-all ${
                data.gender === option.value
                  ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/20'
                  : 'border-[var(--color-smoke)] hover:border-[var(--color-gold)]/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={`text-2xl mb-1 ${
                data.gender === option.value ? 'text-[var(--color-gold)]' : 'text-[var(--color-mist)]'
              }`}>
                {option.icon}
              </span>
              <span className={`text-sm ${
                data.gender === option.value ? 'text-[var(--color-gold)]' : 'text-[var(--color-ivory)]'
              }`}>
                {option.label}
              </span>
              <span className="text-xs text-[var(--color-mist)]">{option.desc}</span>
            </motion.button>
          ))}
        </div>
        <p className="text-[var(--color-mist)] text-xs mt-2">
          Giới tính ảnh hưởng đến cách tính Đại vận trong Tử Vi
        </p>
      </div>

      {/* Nickname (Optional) */}
      <div>
        <label className="block text-[var(--color-pearl)] mb-3 font-display">
          Tên thường gọi <span className="text-[var(--color-mist)] text-xs">(tùy chọn)</span>
        </label>
        <input
          type="text"
          value={data.nickname}
          onChange={(e) => updateData({ nickname: e.target.value })}
          placeholder="An"
          className="input-mystical w-full rounded-xl"
        />
        <p className="text-[var(--color-mist)] text-xs mt-2">
          Chúng tôi sẽ sử dụng tên này trong báo cáo của bạn
        </p>
      </div>
    </div>
  );
}
