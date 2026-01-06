import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight, RotateCcw, Moon, Sun, Bot, Loader2, ChevronDown, ChevronUp, Star, Home, Heart } from 'lucide-react';
import { fullAstrologyAnalysis, ZODIAC_INFO } from '../utils/astrology';
import { streamAnalysis } from '../utils/openai';
import { getCungMeaning, getAllCungNames } from '../data/tuViMeanings/index';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Tính Mệnh Cung đơn giản dựa trên tháng âm lịch
// Đây là công thức đơn giản hóa từ Tử Vi
const CUNG_NAMES = ['Mệnh', 'Phụ Mẫu', 'Phúc Đức', 'Điền Trạch', 'Quan Lộc', 'Nô Bộc', 'Thiên Di', 'Tật Ách', 'Tài Bạch', 'Tử Tức', 'Phu Thê', 'Huynh Đệ'];

function calculateSimpleMenhCung(lunarMonth, lunarYear) {
  // Công thức đơn giản: Mệnh cung dựa trên tháng âm lịch
  // Tháng Giêng -> Cung Dần (index 0 trong chu kỳ)
  const monthIndex = lunarMonth - 1;
  // Điều chỉnh theo năm sinh (can chi năm)
  const yearMod = lunarYear % 12;
  const cungIndex = (monthIndex + yearMod) % 12;
  return CUNG_NAMES[cungIndex];
}

// Component hiển thị Cung với expand/collapse
function CungDetailCard({ cungName, isMainCung = false }) {
  const [expanded, setExpanded] = useState(isMainCung);
  const cungMeaning = getCungMeaning(cungName);

  if (!cungMeaning) return null;

  return (
    <motion.div
      className={`card-mystical rounded-xl overflow-hidden ${isMainCung ? 'border-[var(--color-gold)]/50' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center gap-4 hover:bg-[var(--color-smoke)]/30 transition-colors"
      >
        <div className={`w-10 h-10 rounded-full ${isMainCung ? 'bg-[var(--color-gold)]/20 border-[var(--color-gold)]/30' : 'bg-[var(--color-jade)]/20 border-[var(--color-jade)]/30'} border flex items-center justify-center`}>
          <Home size={18} className={isMainCung ? 'text-[var(--color-gold)]' : 'text-[var(--color-jade)]'} />
        </div>
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <span className={`font-display ${isMainCung ? 'text-[var(--color-gold)]' : 'text-[var(--color-ivory)]'}`}>
              {cungMeaning.name}
            </span>
            {isMainCung && <span className="px-2 py-0.5 text-xs bg-[var(--color-gold)]/20 text-[var(--color-gold)] rounded-full">Mệnh Cung</span>}
          </div>
          <p className="text-xs text-[var(--color-mist)]">{cungMeaning.overview?.short?.slice(0, 60)}...</p>
        </div>
        <div className="text-[var(--color-mist)]">
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-4 border-t border-[var(--color-gold)]/10">
              {/* Keywords/AltNames */}
              {cungMeaning.altNames && (
                <div className="flex flex-wrap gap-2">
                  {cungMeaning.altNames.map((name, i) => (
                    <span key={i} className="px-2 py-1 rounded-full bg-[var(--color-smoke)]/50 text-[var(--color-mist)] text-xs">{name}</span>
                  ))}
                </div>
              )}

              {/* Overview */}
              {cungMeaning.overview?.short && (
                <p className="text-[var(--color-pearl)] leading-relaxed">{cungMeaning.overview.short}</p>
              )}

              {/* Key aspects */}
              {cungMeaning.keyAspects && (
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(cungMeaning.keyAspects).slice(0, 4).map(([key, value], i) => (
                    <div key={i} className="p-3 rounded-lg bg-[var(--color-smoke)]/30">
                      <h5 className="text-xs text-[var(--color-gold)] mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h5>
                      <p className="text-sm text-[var(--color-pearl)]">{value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Body Part */}
              {cungMeaning.bodyPart && (
                <p className="text-xs text-[var(--color-mist)]">
                  <span className="text-[var(--color-jade)]">Bộ phận cơ thể:</span> {cungMeaning.bodyPart}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AstrologyPage() {
  const [formData, setFormData] = useState({ day: '', month: '', year: '' });
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [menhCung, setMenhCung] = useState(null);
  const [show12Cung, setShow12Cung] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.day || !formData.month || !formData.year) return;

    setIsAnalyzing(true);
    setAiAnalysis('');

    const analysis = fullAstrologyAnalysis(
      parseInt(formData.year),
      parseInt(formData.month),
      parseInt(formData.day)
    );
    setResult(analysis);

    // Calculate simplified Mệnh Cung
    const calculatedMenhCung = calculateSimpleMenhCung(analysis.lunar.month, analysis.lunar.year);
    setMenhCung(calculatedMenhCung);
    setIsAnalyzing(false);

    // Start AI analysis
    setIsAiLoading(true);
    try {
      const prompt = `Phân tích tử vi Á Đông chi tiết cho người sinh:
- Ngày dương lịch: ${formData.day}/${formData.month}/${formData.year}
- Ngày âm lịch: ${analysis.lunar.day}/${analysis.lunar.month}/${analysis.lunar.year}
- Can Chi năm sinh: ${analysis.canChi.fullName}
- Nạp Âm: ${analysis.canChi.napAm}
- Con giáp: ${analysis.zodiac.name} (${analysis.zodiac.animal})
- Ngũ hành bản mệnh: ${analysis.element.name}
- Âm/Dương: ${analysis.yinYang}
- Tuổi thực: ${analysis.age.real} - Tuổi mụ: ${analysis.age.vietnamese}

Hãy phân tích chi tiết theo thuật tử vi Á Đông:
1. **Tổng Quan Lá Số**: Ý nghĩa của Can Chi ${analysis.canChi.fullName} và Nạp Âm ${analysis.canChi.napAm}
2. **Tính Cách & Số Mệnh**: Phân tích sâu về con người tuổi ${analysis.zodiac.animal} mệnh ${analysis.element.name}
3. **Ngũ Hành Tương Sinh Tương Khắc**: ${analysis.element.name} sinh/khắc với gì, cách cân bằng
4. **Vận Hạn Năm ${new Date().getFullYear()}** (Năm ${new Date().getFullYear() >= 2024 ? 'Giáp Thìn' : 'Quý Mão'}): Dự báo tổng quan
5. **Sự Nghiệp & Tài Lộc**: Hướng phát triển phù hợp
6. **Tình Duyên & Gia Đạo**: Tuổi hợp và lời khuyên
7. **Lời Khuyên Phong Thủy**: Màu sắc, hướng, vật phẩm hợp mệnh`;

      await streamAnalysis(prompt, (content) => {
        setAiAnalysis(content);
      });
    } catch (error) {
      setAiAnalysis('Không thể kết nối với AI. Vui lòng thử lại sau.');
    }
    setIsAiLoading(false);
  };

  const reset = () => {
    setResult(null);
    setAiAnalysis('');
    setMenhCung(null);
    setShow12Cung(false);
    setFormData({ day: '', month: '', year: '' });
  };

  const zodiacInfo = result ? ZODIAC_INFO[result.zodiac.name] : null;

  // Simple markdown renderer
  const renderMarkdown = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-xl font-display text-[var(--color-gold)] mt-6 mb-3">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-2xl font-display text-[var(--color-gold)] mt-6 mb-3">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('# ')) {
        return <h1 key={i} className="text-3xl font-display text-[var(--color-gold)] mt-6 mb-4">{line.replace('# ', '')}</h1>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-semibold text-[var(--color-ivory)] mt-4 mb-2">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.startsWith('- ')) {
        return <li key={i} className="text-[var(--color-pearl)] ml-4 mb-1">{line.replace('- ', '')}</li>;
      }
      if (line.trim() === '') {
        return <br key={i} />;
      }
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className="text-[var(--color-pearl)] leading-relaxed mb-2">
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j} className="text-[var(--color-ivory)]">{part.replace(/\*\*/g, '')}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-mystical pt-24 pb-16 px-4">
      <motion.div className="max-w-4xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
        {/* Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-fire)]/20 border border-[var(--color-fire)]/30 mb-6">
            <Sparkles size={32} className="text-[var(--color-fire)]" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-[var(--color-ivory)] mb-4">Tử Vi</h1>
          <p className="text-[var(--color-mist)] max-w-xl mx-auto">Khám phá vận mệnh qua hệ thống Can Chi và 12 Con Giáp Á Đông</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.form key="form" onSubmit={handleSubmit} className="card-mystical rounded-2xl p-6 md:p-10" variants={itemVariants} exit={{ opacity: 0, y: -20 }}>
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-[var(--color-pearl)] mb-3 font-display">
                    <Calendar size={18} className="text-[var(--color-gold)]" /> Ngày Sinh Dương Lịch
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <input type="number" value={formData.day} onChange={(e) => setFormData({...formData, day: e.target.value})} placeholder="Ngày" min="1" max="31" className="input-mystical rounded-xl text-center" required />
                    <input type="number" value={formData.month} onChange={(e) => setFormData({...formData, month: e.target.value})} placeholder="Tháng" min="1" max="12" className="input-mystical rounded-xl text-center" required />
                    <input type="number" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} placeholder="Năm" min="1900" max="2100" className="input-mystical rounded-xl text-center" required />
                  </div>
                  <p className="text-xs text-[var(--color-mist)] mt-2 flex items-center gap-1">
                    <Moon size={12} /> Hệ thống sẽ tự động chuyển đổi sang Âm lịch
                  </p>
                </div>

                <motion.button type="submit" disabled={isAnalyzing} className="btn-mystical w-full rounded-xl text-lg" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  {isAnalyzing ? (
                    <span className="flex items-center justify-center gap-3"><Sparkles className="animate-spin" size={20} /> Đang luận giải...</span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">Xem Tử Vi <ArrowRight size={20} /></span>
                  )}
                </motion.button>
              </div>
            </motion.form>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Zodiac Card */}
              <div className="card-mystical rounded-2xl p-6 md:p-10 text-center">
                <motion.div className="text-7xl md:text-9xl mb-4" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", duration: 0.8 }}>
                  {result.zodiac.emoji}
                </motion.div>
                <h2 className="font-display text-3xl md:text-4xl text-gradient-gold mb-2">Tuổi {result.zodiac.animal}</h2>
                <p className="text-xl text-[var(--color-ivory)]">{result.canChi.fullName}</p>
                <p className="text-[var(--color-mist)] mt-2">{result.canChi.napAm}</p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="card-mystical rounded-xl p-4 text-center">
                  <Sun size={20} className="mx-auto text-[var(--color-gold)] mb-2" />
                  <div className="text-lg text-[var(--color-ivory)]">{result.solar.day}/{result.solar.month}/{result.solar.year}</div>
                  <div className="text-xs text-[var(--color-mist)]">Dương lịch</div>
                </div>
                <div className="card-mystical rounded-xl p-4 text-center">
                  <Moon size={20} className="mx-auto text-[var(--color-jade)] mb-2" />
                  <div className="text-lg text-[var(--color-ivory)]">{result.lunar.day}/{result.lunar.month}/{result.lunar.year}</div>
                  <div className="text-xs text-[var(--color-mist)]">Âm lịch</div>
                </div>
                <div className="card-mystical rounded-xl p-4 text-center">
                  <div className="w-5 h-5 rounded-full mx-auto mb-2" style={{ backgroundColor: result.element.color }} />
                  <div className="text-lg text-[var(--color-ivory)]">{result.element.name}</div>
                  <div className="text-xs text-[var(--color-mist)]">Ngũ Hành</div>
                </div>
                <div className="card-mystical rounded-xl p-4 text-center">
                  <div className="text-2xl mb-1">{result.yinYang === 'dương' ? '☀️' : '🌙'}</div>
                  <div className="text-lg text-[var(--color-ivory)] capitalize">{result.yinYang}</div>
                  <div className="text-xs text-[var(--color-mist)]">Âm Dương</div>
                </div>
              </div>

              {/* Zodiac Details */}
              {zodiacInfo && (
                <div className="card-mystical rounded-2xl p-6 md:p-8">
                  <h3 className="font-display text-xl text-[var(--color-gold)] mb-4">Tính Cách Tuổi {result.zodiac.animal}</h3>
                  <p className="text-[var(--color-pearl)] leading-relaxed mb-6">{zodiacInfo.personality}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-[var(--color-jade)] font-display mb-2">Điểm mạnh</h4>
                      <div className="flex flex-wrap gap-2">
                        {zodiacInfo.strengths.map((s, i) => (
                          <span key={i} className="px-3 py-1 rounded-full bg-[var(--color-jade)]/20 text-[var(--color-jade)] text-sm">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[var(--color-fire)] font-display mb-2">Điểm yếu</h4>
                      <div className="flex flex-wrap gap-2">
                        {zodiacInfo.weaknesses.map((w, i) => (
                          <span key={i} className="px-3 py-1 rounded-full bg-[var(--color-fire)]/20 text-[var(--color-fire)] text-sm">{w}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-[var(--color-gold)]/20">
                    <div>
                      <h4 className="text-[var(--color-ivory)] font-display mb-2">Hợp tuổi</h4>
                      <p className="text-[var(--color-pearl)]">{zodiacInfo.compatibility.join(', ')}</p>
                    </div>
                    <div>
                      <h4 className="text-[var(--color-ivory)] font-display mb-2">Xung khắc</h4>
                      <p className="text-[var(--color-mist)]">{zodiacInfo.incompatibility.join(', ')}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Element Info */}
              <div className="card-mystical rounded-xl p-6" style={{ borderColor: `${result.element.color}40` }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${result.element.color}20` }}>
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: result.element.color }} />
                  </div>
                  <div>
                    <h4 className="font-display text-lg" style={{ color: result.element.color }}>Mệnh {result.element.name}</h4>
                    <p className="text-[var(--color-pearl)] text-sm">{result.element.meaning}</p>
                  </div>
                </div>
              </div>

              {/* 12 Cung Tử Vi Section */}
              {menhCung && (
                <div className="card-mystical rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-xl text-[var(--color-gold)] flex items-center gap-2">
                      <Star size={20} /> 12 Cung Tử Vi
                    </h3>
                    <button
                      onClick={() => setShow12Cung(!show12Cung)}
                      className="text-sm text-[var(--color-jade)] hover:text-[var(--color-gold)] transition-colors flex items-center gap-1"
                    >
                      {show12Cung ? 'Thu gọn' : 'Xem tất cả 12 cung'}
                      {show12Cung ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>

                  {/* Main Cung - Mệnh */}
                  <CungDetailCard cungName={menhCung} isMainCung={true} />

                  {/* Other important Cung */}
                  <div className="grid md:grid-cols-3 gap-3 mt-4">
                    {['Tài Bạch', 'Quan Lộc', 'Phu Thê'].map((cung) => {
                      const meaning = getCungMeaning(cung);
                      return (
                        <div key={cung} className="p-3 rounded-lg bg-[var(--color-smoke)]/30">
                          <h5 className="text-sm font-display text-[var(--color-ivory)] mb-1">Cung {cung}</h5>
                          <p className="text-xs text-[var(--color-mist)]">{meaning?.overview?.short?.slice(0, 50)}...</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Show all 12 Cung */}
                  <AnimatePresence>
                    {show12Cung && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 space-y-3 overflow-hidden"
                      >
                        <p className="text-sm text-[var(--color-mist)] mb-3">
                          ℹ️ Đây là tổng quan 12 cung trong Tử Vi. Vị trí cụ thể của các sao cần được tính toán chính xác dựa trên giờ sinh.
                        </p>
                        <div className="grid md:grid-cols-2 gap-3">
                          {CUNG_NAMES.filter(c => c !== menhCung && !['Tài Bạch', 'Quan Lộc', 'Phu Thê'].includes(c)).map((cungName) => (
                            <CungDetailCard key={cungName} cungName={cungName} />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* AI Analysis Section */}
              <motion.div
                className="card-mystical rounded-2xl p-6 md:p-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-fire)]/20 border border-[var(--color-fire)]/30 flex items-center justify-center">
                    <Bot size={20} className="text-[var(--color-fire)]" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-[var(--color-ivory)]">Luận Giải AI Chuyên Sâu</h3>
                    <p className="text-xs text-[var(--color-mist)]">Powered by GPT-4</p>
                  </div>
                  {isAiLoading && (
                    <Loader2 className="ml-auto animate-spin text-[var(--color-gold)]" size={20} />
                  )}
                </div>

                <div className="prose prose-invert max-w-none">
                  {aiAnalysis ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[var(--color-pearl)]"
                    >
                      {renderMarkdown(aiAnalysis)}
                    </motion.div>
                  ) : (
                    <div className="flex items-center gap-3 text-[var(--color-mist)]">
                      <Loader2 className="animate-spin" size={16} />
                      <span>Đang luận giải lá số tử vi của bạn...</span>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.button onClick={reset} className="flex items-center gap-2 mx-auto text-[var(--color-mist)] hover:text-[var(--color-gold)] transition-colors" whileHover={{ scale: 1.05 }}>
                <RotateCcw size={18} /> Xem lại
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
