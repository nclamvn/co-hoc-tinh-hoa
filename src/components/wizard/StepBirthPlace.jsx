import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, X } from 'lucide-react';
import { VIETNAM_PROVINCES } from '../../utils/birthHourMapping';

export default function StepBirthPlace({ data, updateData }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProvinces = VIETNAM_PROVINCES.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedProvinces = {
    north: filteredProvinces.filter(p => p.region === 'north'),
    central: filteredProvinces.filter(p => p.region === 'central'),
    south: filteredProvinces.filter(p => p.region === 'south')
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-water)]/20 border border-[var(--color-water)]/30 mb-4"
        >
          <span className="text-3xl">📍</span>
        </motion.div>
        <h2 className="font-display text-2xl text-[var(--color-ivory)] mb-2">
          Nơi Bạn Cất Tiếng Khóc Chào Đời
        </h2>
        <p className="text-[var(--color-mist)] text-sm">
          Thông tin này giúp xác định múi giờ chính xác (tùy chọn)
        </p>
      </div>

      {/* Birth Place Type Selection */}
      <div className="space-y-4">
        {/* Option 1: Vietnam */}
        <motion.div
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            data.birthPlaceType === 'vietnam'
              ? 'border-[var(--color-fire)] bg-[var(--color-fire)]/10'
              : 'border-[var(--color-smoke)] hover:border-[var(--color-fire)]/50'
          }`}
          onClick={() => updateData({ birthPlaceType: 'vietnam' })}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              data.birthPlaceType === 'vietnam' ? 'border-[var(--color-fire)]' : 'border-[var(--color-mist)]'
            }`}>
              {data.birthPlaceType === 'vietnam' && (
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-fire)]" />
              )}
            </div>
            <span className="text-xl">🇻🇳</span>
            <span className={data.birthPlaceType === 'vietnam' ? 'text-[var(--color-fire)]' : 'text-[var(--color-pearl)]'}>
              Việt Nam
            </span>
          </div>

          {data.birthPlaceType === 'vietnam' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="ml-8 space-y-3"
            >
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm tỉnh/thành phố..."
                  className="input-mystical w-full rounded-lg pr-10"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-mist)] hover:text-[var(--color-ivory)]"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Province List */}
              <div className="max-h-60 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
                {Object.entries(groupedProvinces).map(([region, provinces]) => (
                  provinces.length > 0 && (
                    <div key={region}>
                      <h4 className="text-xs text-[var(--color-mist)] uppercase tracking-wider mb-2">
                        {region === 'north' ? 'Miền Bắc' : region === 'central' ? 'Miền Trung' : 'Miền Nam'}
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {provinces.map((province) => (
                          <button
                            key={province.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateData({ birthProvince: province.id });
                            }}
                            className={`px-3 py-2 rounded-lg text-sm text-left transition-all ${
                              data.birthProvince === province.id
                                ? 'bg-[var(--color-fire)] text-white'
                                : 'bg-[var(--color-smoke)]/50 text-[var(--color-pearl)] hover:bg-[var(--color-smoke)]'
                            }`}
                          >
                            {province.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Option 2: Foreign */}
        <motion.div
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            data.birthPlaceType === 'foreign'
              ? 'border-[var(--color-jade)] bg-[var(--color-jade)]/10'
              : 'border-[var(--color-smoke)] hover:border-[var(--color-jade)]/50'
          }`}
          onClick={() => updateData({ birthPlaceType: 'foreign' })}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              data.birthPlaceType === 'foreign' ? 'border-[var(--color-jade)]' : 'border-[var(--color-mist)]'
            }`}>
              {data.birthPlaceType === 'foreign' && (
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-jade)]" />
              )}
            </div>
            <Globe size={20} className={data.birthPlaceType === 'foreign' ? 'text-[var(--color-jade)]' : 'text-[var(--color-mist)]'} />
            <span className={data.birthPlaceType === 'foreign' ? 'text-[var(--color-jade)]' : 'text-[var(--color-pearl)]'}>
              Nước ngoài
            </span>
          </div>

          {data.birthPlaceType === 'foreign' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="ml-8 grid grid-cols-2 gap-3"
            >
              <div>
                <label className="text-xs text-[var(--color-mist)] mb-1 block">Quốc gia</label>
                <input
                  type="text"
                  value={data.birthCountry}
                  onChange={(e) => updateData({ birthCountry: e.target.value })}
                  placeholder="Ví dụ: USA, Japan..."
                  className="input-mystical w-full rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div>
                <label className="text-xs text-[var(--color-mist)] mb-1 block">Thành phố</label>
                <input
                  type="text"
                  value={data.birthCity}
                  onChange={(e) => updateData({ birthCity: e.target.value })}
                  placeholder="Ví dụ: Los Angeles..."
                  className="input-mystical w-full rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Option 3: Skip */}
        <motion.div
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            data.birthPlaceType === 'skip'
              ? 'border-[var(--color-mist)] bg-[var(--color-mist)]/10'
              : 'border-[var(--color-smoke)] hover:border-[var(--color-mist)]/50'
          }`}
          onClick={() => updateData({ birthPlaceType: 'skip' })}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              data.birthPlaceType === 'skip' ? 'border-[var(--color-mist)]' : 'border-[var(--color-mist)]'
            }`}>
              {data.birthPlaceType === 'skip' && (
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-mist)]" />
              )}
            </div>
            <div>
              <span className={data.birthPlaceType === 'skip' ? 'text-[var(--color-ivory)]' : 'text-[var(--color-pearl)]'}>
                Không muốn cung cấp
              </span>
              <p className="text-xs text-[var(--color-mist)]">
                Sẽ sử dụng múi giờ Việt Nam (GMT+7) làm mặc định
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Info Note */}
      <div className="bg-[var(--color-charcoal)] rounded-xl p-4 border border-[var(--color-gold)]/10">
        <p className="text-xs text-[var(--color-mist)]">
          <MapPin size={14} className="inline mr-1 text-[var(--color-gold)]" />
          Nơi sinh giúp xác định múi giờ chính xác để tính toán lá số Tử Vi chuẩn xác nhất.
          Tuy nhiên, nếu bạn sinh tại Việt Nam sau năm 1975, múi giờ đều là GMT+7.
        </p>
      </div>
    </div>
  );
}
