import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Heart, Users, Briefcase, Home, ChevronRight } from 'lucide-react';

const RELATIONSHIP_TYPES = [
  { id: 'love', label: 'Tình Yêu', icon: Heart, color: 'vermillion' },
  { id: 'friendship', label: 'Bạn Bè', icon: Users, color: 'jade' },
  { id: 'business', label: 'Công Việc', icon: Briefcase, color: 'gold' },
  { id: 'family', label: 'Gia Đình', icon: Home, color: 'pearl' }
];

export default function CompatibilityForm({ onSubmit }) {
  const [person1, setPerson1] = useState({ name: '', birthDate: '', gender: 'male' });
  const [person2, setPerson2] = useState({ name: '', birthDate: '', gender: 'female' });
  const [relationshipType, setRelationshipType] = useState('love');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!person1.name.trim()) newErrors.person1Name = 'Vui lòng nhập tên';
    if (!person1.birthDate) newErrors.person1Date = 'Vui lòng chọn ngày sinh';
    if (!person2.name.trim()) newErrors.person2Name = 'Vui lòng nhập tên';
    if (!person2.birthDate) newErrors.person2Date = 'Vui lòng chọn ngày sinh';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ person1, person2, relationshipType });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Two Person Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Person 1 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 bg-[var(--color-charcoal)] rounded-2xl border border-[var(--color-gold)]/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[var(--color-vermillion)]/20 flex items-center justify-center">
              <User size={20} className="text-[var(--color-vermillion)]" />
            </div>
            <h3 className="font-semibold text-[var(--color-pearl)]">Người 1</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[var(--color-mist)] mb-1.5">
                Họ và Tên
              </label>
              <input
                type="text"
                value={person1.name}
                onChange={(e) => setPerson1({ ...person1, name: e.target.value })}
                placeholder="Nguyễn Văn A"
                className={`w-full px-4 py-2.5 bg-[var(--color-smoke)] border rounded-lg text-[var(--color-pearl)] placeholder-[var(--color-mist)]/50 focus:outline-none focus:border-[var(--color-gold)]/50 transition-colors ${
                  errors.person1Name ? 'border-[var(--color-vermillion)]' : 'border-[var(--color-gold)]/10'
                }`}
              />
              {errors.person1Name && (
                <p className="text-xs text-[var(--color-vermillion)] mt-1">{errors.person1Name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-[var(--color-mist)] mb-1.5">
                <Calendar size={14} className="inline mr-1" />
                Ngày sinh
              </label>
              <input
                type="date"
                value={person1.birthDate}
                onChange={(e) => setPerson1({ ...person1, birthDate: e.target.value })}
                className={`w-full px-4 py-2.5 bg-[var(--color-smoke)] border rounded-lg text-[var(--color-pearl)] focus:outline-none focus:border-[var(--color-gold)]/50 transition-colors ${
                  errors.person1Date ? 'border-[var(--color-vermillion)]' : 'border-[var(--color-gold)]/10'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm text-[var(--color-mist)] mb-1.5">Giới tính</label>
              <div className="flex gap-3">
                {['male', 'female'].map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => setPerson1({ ...person1, gender })}
                    className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
                      person1.gender === gender
                        ? 'bg-[var(--color-gold)]/20 text-[var(--color-gold)] border border-[var(--color-gold)]/30'
                        : 'bg-[var(--color-smoke)] text-[var(--color-mist)] border border-transparent'
                    }`}
                  >
                    {gender === 'male' ? '👨 Nam' : '👩 Nữ'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Heart Icon in Center (desktop) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-14 h-14 rounded-full bg-[var(--color-vermillion)] flex items-center justify-center shadow-lg"
          >
            <Heart size={24} className="text-white" fill="white" />
          </motion.div>
        </div>

        {/* Person 2 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 bg-[var(--color-charcoal)] rounded-2xl border border-[var(--color-jade)]/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[var(--color-jade)]/20 flex items-center justify-center">
              <User size={20} className="text-[var(--color-jade)]" />
            </div>
            <h3 className="font-semibold text-[var(--color-pearl)]">Người 2</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[var(--color-mist)] mb-1.5">
                Họ và Tên
              </label>
              <input
                type="text"
                value={person2.name}
                onChange={(e) => setPerson2({ ...person2, name: e.target.value })}
                placeholder="Trần Thị B"
                className={`w-full px-4 py-2.5 bg-[var(--color-smoke)] border rounded-lg text-[var(--color-pearl)] placeholder-[var(--color-mist)]/50 focus:outline-none focus:border-[var(--color-jade)]/50 transition-colors ${
                  errors.person2Name ? 'border-[var(--color-vermillion)]' : 'border-[var(--color-jade)]/10'
                }`}
              />
              {errors.person2Name && (
                <p className="text-xs text-[var(--color-vermillion)] mt-1">{errors.person2Name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-[var(--color-mist)] mb-1.5">
                <Calendar size={14} className="inline mr-1" />
                Ngày sinh
              </label>
              <input
                type="date"
                value={person2.birthDate}
                onChange={(e) => setPerson2({ ...person2, birthDate: e.target.value })}
                className={`w-full px-4 py-2.5 bg-[var(--color-smoke)] border rounded-lg text-[var(--color-pearl)] focus:outline-none focus:border-[var(--color-jade)]/50 transition-colors ${
                  errors.person2Date ? 'border-[var(--color-vermillion)]' : 'border-[var(--color-jade)]/10'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm text-[var(--color-mist)] mb-1.5">Giới tính</label>
              <div className="flex gap-3">
                {['male', 'female'].map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => setPerson2({ ...person2, gender })}
                    className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
                      person2.gender === gender
                        ? 'bg-[var(--color-jade)]/20 text-[var(--color-jade)] border border-[var(--color-jade)]/30'
                        : 'bg-[var(--color-smoke)] text-[var(--color-mist)] border border-transparent'
                    }`}
                  >
                    {gender === 'male' ? '👨 Nam' : '👩 Nữ'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Relationship Type */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label className="block text-sm text-[var(--color-mist)] mb-3">
          Loại quan hệ muốn xem:
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {RELATIONSHIP_TYPES.map(({ id, label, icon: Icon, color }) => (
            <button
              key={id}
              type="button"
              onClick={() => setRelationshipType(id)}
              className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all ${
                relationshipType === id
                  ? `bg-[var(--color-${color})]/20 border-2 border-[var(--color-${color})]/50`
                  : 'bg-[var(--color-charcoal)] border-2 border-transparent hover:border-[var(--color-gold)]/20'
              }`}
            >
              <Icon
                size={24}
                className={relationshipType === id ? `text-[var(--color-${color})]` : 'text-[var(--color-mist)]'}
              />
              <span className={`text-sm ${
                relationshipType === id ? `text-[var(--color-${color})]` : 'text-[var(--color-mist)]'
              }`}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full py-4 bg-gradient-to-r from-[var(--color-vermillion)] to-[var(--color-gold)] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Heart size={20} />
        Xem Độ Hợp Của Hai Người
        <ChevronRight size={20} />
      </motion.button>
    </form>
  );
}
