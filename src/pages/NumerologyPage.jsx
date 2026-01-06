import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hash, Calendar, User, Sparkles, ArrowRight, RotateCcw, Info, Bot, Loader2, ChevronDown, ChevronUp, Star, Heart, Briefcase, Shield } from 'lucide-react';
import { fullNumerologyAnalysis, NUMBER_MEANINGS } from '../utils/numerology';
import { streamAnalysis } from '../utils/openai';
import {
  getLifePathMeaning,
  getExpressionMeaning,
  getSoulUrgeMeaning,
  getPersonalityMeaning,
  getBirthdayMeaning,
  calculatePinnacles,
  calculateChallenges,
  getPinnacleMeaning,
  getChallengeMeaning
} from '../data/numerologyMeanings/index';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Component hiển thị chi tiết một con số với expand/collapse
function NumberDetailCard({ title, subtitle, number, meaning, icon: Icon, color = 'jade', defaultExpanded = false }) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  if (!meaning) return null;

  const colorClasses = {
    jade: 'text-[var(--color-jade)] bg-[var(--color-jade)]/20 border-[var(--color-jade)]/30',
    gold: 'text-[var(--color-gold)] bg-[var(--color-gold)]/20 border-[var(--color-gold)]/30',
    crimson: 'text-[var(--color-crimson)] bg-[var(--color-crimson)]/20 border-[var(--color-crimson)]/30',
    purple: 'text-purple-400 bg-purple-400/20 border-purple-400/30'
  };

  return (
    <motion.div
      className="card-mystical rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center gap-4 hover:bg-[var(--color-smoke)]/30 transition-colors"
      >
        <div className={`w-12 h-12 rounded-full ${colorClasses[color]} border flex items-center justify-center`}>
          {Icon && <Icon size={20} />}
        </div>
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-display text-gradient-gold">{number}</span>
            <span className="text-[var(--color-ivory)] font-display">{title}</span>
          </div>
          <p className="text-sm text-[var(--color-mist)]">{subtitle}</p>
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
              {/* Keywords */}
              {meaning.keywords && (
                <div className="flex flex-wrap gap-2">
                  {meaning.keywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-[var(--color-jade)]/20 text-[var(--color-jade)] text-sm">
                      {kw}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              {meaning.overview && (
                <p className="text-[var(--color-pearl)] leading-relaxed">
                  {typeof meaning.overview === 'string' ? meaning.overview : meaning.overview.short}
                </p>
              )}

              {/* Strengths */}
              {meaning.strengths && (
                <div>
                  <h4 className="text-[var(--color-jade)] font-display mb-2 flex items-center gap-2">
                    <Star size={16} /> Điểm Mạnh
                  </h4>
                  {Array.isArray(meaning.strengths) ? (
                    <ul className="text-[var(--color-pearl)] text-sm space-y-1">
                      {meaning.strengths.map((s, i) => <li key={i} className="flex items-start gap-2"><span className="text-[var(--color-gold)]">•</span> {s}</li>)}
                    </ul>
                  ) : (
                    <p className="text-[var(--color-pearl)] text-sm">{meaning.strengths}</p>
                  )}
                </div>
              )}

              {/* Weaknesses/Challenges */}
              {(meaning.weaknesses || meaning.challenges) && (
                <div>
                  <h4 className="text-[var(--color-crimson)] font-display mb-2 flex items-center gap-2">
                    <Shield size={16} /> Thách Thức
                  </h4>
                  {Array.isArray(meaning.weaknesses || meaning.challenges) ? (
                    <ul className="text-[var(--color-pearl)] text-sm space-y-1">
                      {(meaning.weaknesses || meaning.challenges).map((w, i) => <li key={i} className="flex items-start gap-2"><span className="text-[var(--color-crimson)]">•</span> {w}</li>)}
                    </ul>
                  ) : (
                    <p className="text-[var(--color-pearl)] text-sm">{meaning.weaknesses || meaning.challenges}</p>
                  )}
                </div>
              )}

              {/* Career/Finance for Life Path */}
              {meaning.careerFinance && (
                <div>
                  <h4 className="text-[var(--color-gold)] font-display mb-2 flex items-center gap-2">
                    <Briefcase size={16} /> Sự Nghiệp & Tài Chính
                  </h4>
                  <p className="text-[var(--color-pearl)] text-sm mb-2">{meaning.careerFinance.overview}</p>
                  {meaning.careerFinance.bestCareers && (
                    <div className="flex flex-wrap gap-2">
                      {meaning.careerFinance.bestCareers.slice(0, 5).map((c, i) => (
                        <span key={i} className="px-2 py-1 rounded bg-[var(--color-gold)]/10 text-[var(--color-gold)] text-xs">{c}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Relationships */}
              {meaning.relationships && (
                <div>
                  <h4 className="text-pink-400 font-display mb-2 flex items-center gap-2">
                    <Heart size={16} /> Tình Cảm
                  </h4>
                  <p className="text-[var(--color-pearl)] text-sm">{meaning.relationships.style || meaning.relationships.overview}</p>
                </div>
              )}

              {/* Talents for Birthday */}
              {meaning.talents && (
                <div>
                  <h4 className="text-[var(--color-jade)] font-display mb-2 flex items-center gap-2">
                    <Star size={16} /> Tài Năng Bẩm Sinh
                  </h4>
                  <ul className="text-[var(--color-pearl)] text-sm space-y-1">
                    {meaning.talents.map((t, i) => <li key={i} className="flex items-start gap-2"><span className="text-[var(--color-gold)]">•</span> {t}</li>)}
                  </ul>
                </div>
              )}

              {/* Life Lesson */}
              {meaning.lifeLesson && (
                <div className="p-3 bg-[var(--color-gold)]/10 rounded-lg border border-[var(--color-gold)]/20">
                  <p className="text-[var(--color-ivory)] text-sm italic">
                    💡 {typeof meaning.lifeLesson === 'string' ? meaning.lifeLesson : meaning.lifeLesson.primary}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function NumerologyPage() {
  const [formData, setFormData] = useState({ fullName: '', day: '', month: '', year: '', system: 'pythagorean' });
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [detailedMeanings, setDetailedMeanings] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.day || !formData.month || !formData.year) return;

    setIsAnalyzing(true);
    setAiAnalysis('');

    const day = parseInt(formData.day);
    const month = parseInt(formData.month);
    const year = parseInt(formData.year);

    const analysis = fullNumerologyAnalysis(
      formData.fullName,
      day,
      month,
      year,
      formData.system
    );
    setResult(analysis);

    // Fetch detailed meanings from new data
    const meanings = {
      lifePath: getLifePathMeaning(analysis.lifePath),
      expression: getExpressionMeaning(analysis.expression),
      soulUrge: getSoulUrgeMeaning(analysis.soulUrge),
      personality: getPersonalityMeaning(analysis.personality),
      birthday: getBirthdayMeaning(day),
      pinnacles: calculatePinnacles(day, month, year),
      challenges: calculateChallenges(day, month, year)
    };
    setDetailedMeanings(meanings);
    setIsAnalyzing(false);

    // Start AI analysis
    setIsAiLoading(true);
    try {
      const prompt = `Phân tích thần số học chi tiết cho:
- Họ tên: ${formData.fullName}
- Ngày sinh: ${formData.day}/${formData.month}/${formData.year}
- Hệ thống: ${formData.system === 'pythagorean' ? 'Pythagorean (Phương Tây)' : 'Chaldean (Babylon cổ đại)'}
- Số Đường Đời (Life Path): ${analysis.lifePath}
- Số Biểu Đạt (Expression): ${analysis.expression}
- Số Linh Hồn (Soul Urge): ${analysis.soulUrge}
- Số Nhân Cách (Personality): ${analysis.personality}
- Số Sinh: ${analysis.birthdayNumber}
- Số Trưởng Thành: ${analysis.maturity}
- Năm Cá Nhân: ${analysis.personalYear}

Hãy phân tích chi tiết theo văn hóa Á Đông:
1. **Tổng Quan Bản Mệnh**: Ý nghĩa tổng hợp của bộ số này
2. **Điểm Mạnh & Tiềm Năng**: Những tài năng bẩm sinh
3. **Thách Thức Cần Vượt Qua**: Bài học cuộc đời
4. **Sự Nghiệp Phù Hợp**: Lĩnh vực nên theo đuổi
5. **Năm ${new Date().getFullYear()} - Năm Cá Nhân ${analysis.personalYear}**: Dự báo và lời khuyên
6. **Lời Khuyên Phát Triển**: Hướng dẫn thực hành`;

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
    setDetailedMeanings(null);
    setFormData({ fullName: '', day: '', month: '', year: '', system: 'pythagorean' });
  };

  // Simple markdown renderer for AI response
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
      // Handle inline bold
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-jade)]/20 border border-[var(--color-jade)]/30 mb-6">
            <Hash size={32} className="text-[var(--color-jade)]" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-[var(--color-ivory)] mb-4">Thần Số Học</h1>
          <p className="text-[var(--color-mist)] max-w-xl mx-auto">Giải mã số phận qua con số định mệnh từ tên và ngày sinh của bạn</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.form key="form" onSubmit={handleSubmit} className="card-mystical rounded-2xl p-6 md:p-10" variants={itemVariants} exit={{ opacity: 0, y: -20 }}>
              <div className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="flex items-center gap-2 text-[var(--color-pearl)] mb-3 font-display">
                    <User size={18} className="text-[var(--color-gold)]" /> Họ và Tên
                  </label>
                  <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} placeholder="Nguyễn Văn An" className="input-mystical w-full rounded-xl" required />
                  <p className="text-xs text-[var(--color-mist)] mt-2">Nhập tên không dấu để tính chính xác hơn (VD: Nguyen Van An)</p>
                </div>

                {/* Birthdate */}
                <div>
                  <label className="flex items-center gap-2 text-[var(--color-pearl)] mb-3 font-display">
                    <Calendar size={18} className="text-[var(--color-gold)]" /> Ngày Sinh
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <input type="number" value={formData.day} onChange={(e) => setFormData({...formData, day: e.target.value})} placeholder="Ngày" min="1" max="31" className="input-mystical rounded-xl text-center" required />
                    <input type="number" value={formData.month} onChange={(e) => setFormData({...formData, month: e.target.value})} placeholder="Tháng" min="1" max="12" className="input-mystical rounded-xl text-center" required />
                    <input type="number" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} placeholder="Năm" min="1900" max="2100" className="input-mystical rounded-xl text-center" required />
                  </div>
                </div>

                {/* System Select */}
                <div>
                  <label className="flex items-center gap-2 text-[var(--color-pearl)] mb-3 font-display">
                    <Info size={18} className="text-[var(--color-gold)]" /> Hệ Thống
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {['pythagorean', 'chaldean'].map((sys) => (
                      <button key={sys} type="button" onClick={() => setFormData({...formData, system: sys})}
                        className={`p-4 rounded-xl border transition-all ${formData.system === sys ? 'border-[var(--color-jade)] bg-[var(--color-jade)]/10 text-[var(--color-jade)]' : 'border-[var(--color-smoke)] text-[var(--color-mist)] hover:border-[var(--color-gold)]/30'}`}>
                        <span className="font-display text-lg capitalize">{sys}</span>
                        <p className="text-xs mt-1 opacity-70">{sys === 'pythagorean' ? 'Phương Tây hiện đại' : 'Cổ đại Babylon'}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button type="submit" disabled={isAnalyzing} className="btn-mystical w-full rounded-xl text-lg mt-4" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  {isAnalyzing ? (
                    <span className="flex items-center justify-center gap-3"><Sparkles className="animate-spin" size={20} /> Đang phân tích...</span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">Khám Phá Số Mệnh <ArrowRight size={20} /></span>
                  )}
                </motion.button>
              </div>
            </motion.form>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Header Card with Summary */}
              <div className="card-mystical rounded-2xl p-6 md:p-10">
                <div className="text-center mb-8">
                  <p className="text-[var(--color-ivory)] font-display text-xl mb-2">{result.inputData.fullName}</p>
                  <p className="text-sm text-[var(--color-mist)]">{result.inputData.day}/{result.inputData.month}/{result.inputData.year}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Số Chủ Đạo', value: result.lifePath, desc: 'Life Path' },
                    { label: 'Số Biểu Đạt', value: result.expression, desc: 'Expression' },
                    { label: 'Số Linh Hồn', value: result.soulUrge, desc: 'Soul Urge' },
                    { label: 'Số Nhân Cách', value: result.personality, desc: 'Personality' }
                  ].map((item, i) => (
                    <motion.div key={i} className="text-center p-4 rounded-xl bg-[var(--color-smoke)]/50" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }}>
                      <div className="text-4xl md:text-5xl font-display text-gradient-gold mb-2">{item.value}</div>
                      <div className="text-sm text-[var(--color-ivory)]">{item.label}</div>
                      <div className="text-xs text-[var(--color-mist)]">{item.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Detailed Meanings Cards */}
              {detailedMeanings && (
                <div className="space-y-4">
                  <h3 className="font-display text-xl text-[var(--color-gold)] mb-4">📖 Kiến Giải Chi Tiết</h3>

                  {/* Life Path - expanded by default */}
                  <NumberDetailCard
                    title={detailedMeanings.lifePath?.name || NUMBER_MEANINGS[result.lifePath]?.title || 'Số Chủ Đạo'}
                    subtitle="Con đường định mệnh - Sứ mệnh cuộc đời"
                    number={result.lifePath}
                    meaning={detailedMeanings.lifePath}
                    icon={Sparkles}
                    color="gold"
                    defaultExpanded={true}
                  />

                  {/* Expression */}
                  <NumberDetailCard
                    title={detailedMeanings.expression?.name || 'Số Biểu Đạt'}
                    subtitle="Cách bạn thể hiện bản thân với thế giới"
                    number={result.expression}
                    meaning={detailedMeanings.expression}
                    icon={User}
                    color="jade"
                  />

                  {/* Soul Urge */}
                  <NumberDetailCard
                    title={detailedMeanings.soulUrge?.name || 'Số Linh Hồn'}
                    subtitle="Khát khao sâu thẳm trong tâm hồn"
                    number={result.soulUrge}
                    meaning={detailedMeanings.soulUrge}
                    icon={Heart}
                    color="crimson"
                  />

                  {/* Personality */}
                  <NumberDetailCard
                    title={detailedMeanings.personality?.name || 'Số Nhân Cách'}
                    subtitle="Ấn tượng bạn tạo ra với người khác"
                    number={result.personality}
                    meaning={detailedMeanings.personality}
                    icon={Shield}
                    color="purple"
                  />

                  {/* Birthday */}
                  <NumberDetailCard
                    title={detailedMeanings.birthday?.name || 'Số Sinh'}
                    subtitle="Tài năng bẩm sinh từ ngày sinh"
                    number={result.birthdayNumber}
                    meaning={detailedMeanings.birthday}
                    icon={Calendar}
                    color="gold"
                  />
                </div>
              )}

              {/* Additional Numbers Summary */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Số Sinh', value: result.birthdayNumber, desc: 'Birthday' },
                  { label: 'Số Trưởng Thành', value: result.maturity, desc: 'Maturity' },
                  { label: 'Năm Cá Nhân', value: result.personalYear, desc: 'Personal Year' }
                ].map((item, i) => (
                  <div key={i} className="card-mystical rounded-xl p-4 text-center">
                    <div className="text-2xl font-display text-[var(--color-gold)]">{item.value}</div>
                    <div className="text-xs text-[var(--color-ivory)]">{item.label}</div>
                    <div className="text-xs text-[var(--color-mist)]">{item.desc}</div>
                  </div>
                ))}
              </div>

              {/* Pinnacles & Challenges */}
              {detailedMeanings?.pinnacles && (
                <div className="card-mystical rounded-2xl p-6">
                  <h3 className="font-display text-xl text-[var(--color-gold)] mb-4">🏔️ Đỉnh Cao & Thử Thách</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Pinnacles */}
                    <div>
                      <h4 className="text-[var(--color-jade)] font-display mb-3">Các Đỉnh Cao (Pinnacles)</h4>
                      <div className="space-y-2">
                        {detailedMeanings.pinnacles.periods.map((period, i) => {
                          const pinnacleMeaning = getPinnacleMeaning(period.pinnacle);
                          return (
                            <div key={i} className="p-3 rounded-lg bg-[var(--color-smoke)]/50">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[var(--color-ivory)] font-display">Đỉnh {i + 1}: {period.pinnacle}</span>
                                <span className="text-xs text-[var(--color-mist)]">
                                  {period.from} - {period.to === 'lifetime' ? '∞' : period.to} tuổi
                                </span>
                              </div>
                              {pinnacleMeaning && (
                                <p className="text-xs text-[var(--color-pearl)]">{pinnacleMeaning.name}</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Challenges */}
                    <div>
                      <h4 className="text-[var(--color-crimson)] font-display mb-3">Các Thử Thách (Challenges)</h4>
                      <div className="space-y-2">
                        {detailedMeanings.challenges.challenges.map((challenge, i) => {
                          const challengeMeaning = getChallengeMeaning(challenge);
                          return (
                            <div key={i} className="p-3 rounded-lg bg-[var(--color-smoke)]/50">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[var(--color-ivory)] font-display">Thử thách {i + 1}: {challenge}</span>
                              </div>
                              {challengeMeaning && (
                                <p className="text-xs text-[var(--color-pearl)]">{challengeMeaning.name}</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
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
                  <div className="w-10 h-10 rounded-full bg-[var(--color-jade)]/20 border border-[var(--color-jade)]/30 flex items-center justify-center">
                    <Bot size={20} className="text-[var(--color-jade)]" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-[var(--color-ivory)]">Phân Tích AI Chuyên Sâu</h3>
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
                      <span>Đang phân tích bản mệnh của bạn...</span>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.button onClick={reset} className="flex items-center gap-2 mx-auto text-[var(--color-mist)] hover:text-[var(--color-gold)] transition-colors" whileHover={{ scale: 1.05 }}>
                <RotateCcw size={18} /> Phân tích lại
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
