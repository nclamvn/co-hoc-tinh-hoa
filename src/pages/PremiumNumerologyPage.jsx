import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Hash, User, Calendar, Sparkles, ChevronRight, ChevronDown,
  Star, Heart, Briefcase, Brain, AlertTriangle, TrendingUp,
  Grid3X3, Mountain, Clock, Circle, Loader2, Download
} from 'lucide-react';

// Components
import { LoadingOracle, NumberReveal, SacredGeometry } from '../components/animations';
import {
  InclusionChart,
  LifeTimeline,
  PersonalYearWheel,
  NumerologyPyramid
} from '../components/charts';

// Utils & Data
import { NumerologyCalculator } from '../utils/numerologyMaster';
import { normalizeVietnamese, parseVietnameseName } from '../utils/vietnameseNameAdapter';
import {
  LIFE_PATH_MEANINGS,
  EXPRESSION_MEANINGS,
  SOUL_URGE_MEANINGS,
  PERSONALITY_MEANINGS,
  KARMIC_DEBT_MEANINGS
} from '../data/numerologyMeanings';
import {
  generateNumerologyAnalysisPrompt,
  NUMEROLOGY_SYSTEM_PROMPT
} from '../utils/numerologyAIPrompts';

/**
 * Premium Numerology Page
 * Comprehensive numerology analysis with AI insights
 */
export default function PremiumNumerologyPage() {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: ''
  });
  const [currentAge, setCurrentAge] = useState(30);

  // UI state
  const [stage, setStage] = useState('input'); // input, loading, reveal, dashboard
  const [activeSection, setActiveSection] = useState('overview');
  const [revealedNumbers, setRevealedNumbers] = useState([]);
  const [aiReport, setAiReport] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Calculate profile
  const calculator = useMemo(() => {
    if (!formData.fullName || !formData.birthDate) return null;
    try {
      return new NumerologyCalculator(formData.fullName, formData.birthDate);
    } catch (e) {
      console.error('Calculator error:', e);
      return null;
    }
  }, [formData.fullName, formData.birthDate]);

  const profile = useMemo(() => {
    if (!calculator) return null;
    return calculator.getFullProfile();
  }, [calculator]);

  // Calculate age from birthdate
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.birthDate) return;

    setCurrentAge(calculateAge(formData.birthDate));
    setStage('loading');

    // Simulate loading, then reveal
    setTimeout(() => {
      setStage('reveal');
    }, 3000);
  };

  // Handle number revealed
  const handleNumberRevealed = (type) => {
    setRevealedNumbers(prev => [...prev, type]);

    // After all core numbers revealed, show dashboard
    if (revealedNumbers.length >= 5) {
      setTimeout(() => setStage('dashboard'), 500);
    }
  };

  // Generate AI report
  const generateAIReport = async () => {
    if (!profile || isGeneratingAI) return;

    setIsGeneratingAI(true);
    setAiReport('');

    try {
      const prompt = generateNumerologyAnalysisPrompt(profile);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: NUMEROLOGY_SYSTEM_PROMPT },
            { role: 'user', content: prompt }
          ],
          temperature: 0.8,
          max_tokens: 4000
        })
      });

      const data = await response.json();
      setAiReport(data.choices[0].message.content);
    } catch (error) {
      console.error('AI Error:', error);
      setAiReport('Đã xảy ra lỗi khi tạo báo cáo. Vui lòng thử lại sau.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // Render input form
  const renderInputForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30 mb-4"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles size={16} className="text-[var(--color-gold)]" />
          <span className="text-sm text-[var(--color-gold)]">Premium Numerology</span>
        </motion.div>
        <h1 className="font-display text-3xl md:text-4xl text-gradient-gold mb-2">
          Bản Đồ Số Mệnh
        </h1>
        <p className="text-[var(--color-mist)]">
          Khám phá 20+ con số định mệnh trong tên và ngày sinh của bạn
        </p>
      </div>

      {/* Sacred Geometry Background */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 -z-10">
        <SacredGeometry type="flower-of-life" size={400} opacity={0.05} />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm text-[var(--color-pearl)] mb-2">
            <User size={14} className="inline mr-2" />
            Họ và Tên đầy đủ (theo giấy khai sinh)
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
            placeholder="Nguyễn Văn Anh"
            className="w-full px-4 py-3 bg-[var(--color-charcoal)] border border-[var(--color-gold)]/20 rounded-xl text-[var(--color-pearl)] placeholder-[var(--color-mist)]/50 focus:border-[var(--color-gold)]/50 focus:outline-none transition-colors"
            required
          />
          {formData.fullName && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-[var(--color-mist)] mt-1"
            >
              Chuẩn hóa: {normalizeVietnamese(formData.fullName).toUpperCase()}
            </motion.p>
          )}
        </div>

        {/* Birth Date */}
        <div>
          <label className="block text-sm text-[var(--color-pearl)] mb-2">
            <Calendar size={14} className="inline mr-2" />
            Ngày sinh (dương lịch)
          </label>
          <input
            type="date"
            value={formData.birthDate}
            onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
            className="w-full px-4 py-3 bg-[var(--color-charcoal)] border border-[var(--color-gold)]/20 rounded-xl text-[var(--color-pearl)] focus:border-[var(--color-gold)]/50 focus:outline-none transition-colors"
            required
          />
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-dim)] text-[var(--color-obsidian)] font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!formData.fullName || !formData.birthDate}
        >
          <Hash size={20} />
          Khám Phá Số Mệnh
          <ChevronRight size={20} />
        </motion.button>
      </form>

      {/* Preview Numbers */}
      <div className="mt-8 p-4 bg-[var(--color-charcoal)] rounded-xl border border-[var(--color-gold)]/10">
        <p className="text-xs text-[var(--color-mist)] text-center mb-3">Bạn sẽ khám phá:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {['Đường Đời', 'Biểu Đạt', 'Linh Hồn', 'Nhân Cách', 'Ngày Sinh', 'Trưởng Thành', '+14 số ẩn'].map((num, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs bg-[var(--color-gold)]/10 text-[var(--color-gold)] rounded"
            >
              {num}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // Render loading
  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <LoadingOracle />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-[var(--color-mist)] mt-8"
      >
        Đang giải mã {formData.fullName}...
      </motion.p>
    </div>
  );

  // Render reveal
  const renderReveal = () => {
    if (!profile) return null;

    const coreNumbers = [
      { key: 'lifePath', title: 'Số Đường Đời', subtitle: 'Life Path', value: profile.coreNumbers.lifePath.value, color: 'gold' },
      { key: 'expression', title: 'Số Biểu Đạt', subtitle: 'Expression', value: profile.coreNumbers.expression.value, color: 'jade' },
      { key: 'soulUrge', title: 'Số Linh Hồn', subtitle: 'Soul Urge', value: profile.coreNumbers.soulUrge.value, color: 'vermillion' },
      { key: 'personality', title: 'Số Nhân Cách', subtitle: 'Personality', value: profile.coreNumbers.personality.value, color: 'gold' },
      { key: 'birthday', title: 'Số Ngày Sinh', subtitle: 'Birthday', value: profile.coreNumbers.birthday.value, color: 'jade' },
      { key: 'maturity', title: 'Số Trưởng Thành', subtitle: 'Maturity', value: profile.coreNumbers.maturity.value, color: 'vermillion' }
    ];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl text-gradient-gold mb-2">
            {formData.fullName}
          </h2>
          <p className="text-[var(--color-mist)]">6 Số Cốt Lõi của bạn</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {coreNumbers.map((num, idx) => (
            <motion.div
              key={num.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.5 }}
              className="flex flex-col items-center"
            >
              <NumberReveal
                number={num.value}
                title={num.title}
                subtitle={num.subtitle}
                color={num.color}
                size="medium"
                onComplete={() => handleNumberRevealed(num.key)}
              />
            </motion.div>
          ))}
        </div>

        {revealedNumbers.length >= 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8"
          >
            <button
              onClick={() => setStage('dashboard')}
              className="px-6 py-3 bg-[var(--color-gold)] text-[var(--color-obsidian)] font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto"
            >
              Xem Phân Tích Chi Tiết
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}
      </motion.div>
    );
  };

  // Render dashboard
  const renderDashboard = () => {
    if (!profile) return null;

    const sections = [
      { id: 'overview', label: 'Tổng Quan', icon: Star },
      { id: 'core', label: '6 Số Cốt Lõi', icon: Hash },
      { id: 'hidden', label: 'Số Ẩn', icon: Brain },
      { id: 'charts', label: 'Biểu Đồ', icon: Grid3X3 },
      { id: 'timeline', label: 'Dòng Thời Gian', icon: Clock },
      { id: 'forecast', label: 'Dự Báo', icon: TrendingUp },
      { id: 'ai-report', label: 'AI Analysis', icon: Sparkles }
    ];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl md:text-3xl text-gradient-gold">
              {formData.fullName}
            </h1>
            <p className="text-[var(--color-mist)]">
              Sinh ngày {new Date(formData.birthDate).toLocaleDateString('vi-VN')} • {currentAge} tuổi
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button
              onClick={() => setStage('input')}
              className="px-4 py-2 text-sm border border-[var(--color-gold)]/30 text-[var(--color-gold)] rounded-lg hover:bg-[var(--color-gold)]/10 transition-colors"
            >
              Phân tích mới
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all
                ${activeSection === id
                  ? 'bg-[var(--color-gold)]/20 text-[var(--color-gold)] border border-[var(--color-gold)]/30'
                  : 'text-[var(--color-mist)] hover:text-[var(--color-pearl)] hover:bg-[var(--color-smoke)]'
                }
              `}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="min-h-[400px]"
          >
            {activeSection === 'overview' && renderOverview()}
            {activeSection === 'core' && renderCoreNumbers()}
            {activeSection === 'hidden' && renderHiddenNumbers()}
            {activeSection === 'charts' && renderCharts()}
            {activeSection === 'timeline' && renderTimeline()}
            {activeSection === 'forecast' && renderForecast()}
            {activeSection === 'ai-report' && renderAIReport()}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  };

  // Section: Overview
  const renderOverview = () => {
    const lp = profile.coreNumbers.lifePath.value;
    const lpMeaning = LIFE_PATH_MEANINGS[lp];

    return (
      <div className="grid md:grid-cols-2 gap-6">
        {/* Life Path Highlight */}
        <div className="p-6 bg-gradient-to-br from-[var(--color-gold)]/20 to-transparent rounded-2xl border border-[var(--color-gold)]/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-2xl bg-[var(--color-gold)] flex items-center justify-center">
              <span className="text-4xl font-display font-bold text-[var(--color-obsidian)]">{lp}</span>
            </div>
            <div>
              <h3 className="font-display text-xl text-[var(--color-gold)]">Số Đường Đời</h3>
              <p className="text-[var(--color-pearl)]">{lpMeaning?.title}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {lpMeaning?.keywords.map((kw, i) => (
              <span key={i} className="px-2 py-1 text-xs bg-[var(--color-gold)]/10 text-[var(--color-gold)] rounded">
                {kw}
              </span>
            ))}
          </div>
          <p className="text-sm text-[var(--color-pearl)]">{lpMeaning?.lifePurpose}</p>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Biểu Đạt', value: profile.coreNumbers.expression.value, color: 'jade' },
              { label: 'Linh Hồn', value: profile.coreNumbers.soulUrge.value, color: 'vermillion' },
              { label: 'Nhân Cách', value: profile.coreNumbers.personality.value, color: 'gold' }
            ].map(({ label, value, color }) => (
              <div key={label} className="p-4 bg-[var(--color-charcoal)] rounded-xl text-center">
                <p className="text-2xl font-bold" style={{ color: `var(--color-${color})` }}>{value}</p>
                <p className="text-xs text-[var(--color-mist)]">{label}</p>
              </div>
            ))}
          </div>

          {/* Karmic Alert */}
          {profile.hiddenNumbers.karmicDebt.hasDebt && (
            <div className="p-4 bg-[var(--color-vermillion)]/10 rounded-xl border border-[var(--color-vermillion)]/30">
              <div className="flex items-center gap-2 text-[var(--color-vermillion)] mb-2">
                <AlertTriangle size={18} />
                <span className="font-semibold">Có Nợ Nghiệp</span>
              </div>
              <p className="text-sm text-[var(--color-pearl)]">
                {profile.hiddenNumbers.karmicDebt.debts.map(d => `Số ${d.number}`).join(', ')}
              </p>
            </div>
          )}

          {/* Personal Year */}
          <div className="p-4 bg-[var(--color-charcoal)] rounded-xl">
            <p className="text-xs text-[var(--color-mist)] mb-1">Năm Cá Nhân {new Date().getFullYear()}</p>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-[var(--color-gold)]">
                {profile.cycles.personalYear.value}
              </span>
              <p className="text-sm text-[var(--color-pearl)]">
                {profile.cycles.personalYear.calculation}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Section: Core Numbers
  const renderCoreNumbers = () => {
    const numbers = [
      { key: 'lifePath', title: 'Số Đường Đời', data: profile.coreNumbers.lifePath, meanings: LIFE_PATH_MEANINGS },
      { key: 'expression', title: 'Số Biểu Đạt', data: profile.coreNumbers.expression, meanings: EXPRESSION_MEANINGS },
      { key: 'soulUrge', title: 'Số Linh Hồn', data: profile.coreNumbers.soulUrge, meanings: SOUL_URGE_MEANINGS },
      { key: 'personality', title: 'Số Nhân Cách', data: profile.coreNumbers.personality, meanings: PERSONALITY_MEANINGS },
      { key: 'birthday', title: 'Số Ngày Sinh', data: profile.coreNumbers.birthday },
      { key: 'maturity', title: 'Số Trưởng Thành', data: profile.coreNumbers.maturity }
    ];

    return (
      <div className="space-y-4">
        {numbers.map(({ key, title, data, meanings }) => {
          const meaning = meanings?.[data.value];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-[var(--color-charcoal)] rounded-xl border border-[var(--color-gold)]/10"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-[var(--color-gold)]/20 flex items-center justify-center shrink-0">
                  <span className="text-2xl font-bold text-[var(--color-gold)]">{data.value}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-[var(--color-gold)]">{title}</h4>
                  <p className="text-xs text-[var(--color-mist)] mb-2">{data.calculation}</p>
                  {meaning && (
                    <>
                      <p className="text-sm text-[var(--color-pearl)]">{meaning.title || meaning.description}</p>
                      {meaning.keywords && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {meaning.keywords.slice(0, 4).map((kw, i) => (
                            <span key={i} className="px-2 py-0.5 text-xs bg-[var(--color-smoke)] text-[var(--color-mist)] rounded">
                              {kw}
                            </span>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  // Section: Hidden Numbers
  const renderHiddenNumbers = () => {
    const hidden = profile.hiddenNumbers;

    return (
      <div className="grid md:grid-cols-2 gap-4">
        {/* Karmic Debt */}
        <div className="p-4 bg-[var(--color-charcoal)] rounded-xl">
          <h4 className="font-semibold text-[var(--color-vermillion)] mb-3 flex items-center gap-2">
            <AlertTriangle size={16} />
            Nợ Nghiệp (Karmic Debt)
          </h4>
          {hidden.karmicDebt.hasDebt ? (
            hidden.karmicDebt.debts.map((debt, i) => (
              <div key={i} className="mb-2">
                <span className="text-lg font-bold text-[var(--color-vermillion)]">{debt.number}</span>
                <span className="text-sm text-[var(--color-mist)]"> - {debt.source}</span>
                <p className="text-sm text-[var(--color-pearl)] mt-1">
                  {KARMIC_DEBT_MEANINGS[debt.number]?.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-[var(--color-jade)]">Không có nợ nghiệp</p>
          )}
        </div>

        {/* Karmic Lessons */}
        <div className="p-4 bg-[var(--color-charcoal)] rounded-xl">
          <h4 className="font-semibold text-[var(--color-gold)] mb-3">Bài Học Nghiệp</h4>
          {hidden.karmicLessons.hasMissing ? (
            <div className="flex flex-wrap gap-2">
              {hidden.karmicLessons.missingNumbers.map(num => (
                <span key={num} className="w-10 h-10 rounded-lg bg-[var(--color-gold)]/10 flex items-center justify-center text-[var(--color-gold)] font-bold">
                  {num}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-[var(--color-jade)]">Không thiếu số nào</p>
          )}
        </div>

        {/* Hidden Passion */}
        <div className="p-4 bg-[var(--color-charcoal)] rounded-xl">
          <h4 className="font-semibold text-[var(--color-gold)] mb-3">Đam Mê Ẩn</h4>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-[var(--color-gold)]">
              {hidden.hiddenPassion.values.join(', ')}
            </span>
            <span className="text-sm text-[var(--color-mist)]">
              (xuất hiện {hidden.hiddenPassion.count} lần)
            </span>
          </div>
        </div>

        {/* Balance */}
        <div className="p-4 bg-[var(--color-charcoal)] rounded-xl">
          <h4 className="font-semibold text-[var(--color-gold)] mb-3">Số Cân Bằng</h4>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-[var(--color-gold)]">
              {hidden.balance.value}
            </span>
            <p className="text-xs text-[var(--color-mist)]">
              {hidden.balance.calculation}
            </p>
          </div>
        </div>

        {/* Subconscious Self */}
        <div className="p-4 bg-[var(--color-charcoal)] rounded-xl">
          <h4 className="font-semibold text-[var(--color-gold)] mb-3">Tiềm Thức</h4>
          <span className="text-3xl font-bold text-[var(--color-gold)]">
            {hidden.subconsciousSelf.value}
          </span>
        </div>

        {/* Rational Thought */}
        <div className="p-4 bg-[var(--color-charcoal)] rounded-xl">
          <h4 className="font-semibold text-[var(--color-gold)] mb-3">Tư Duy Logic</h4>
          <span className="text-3xl font-bold text-[var(--color-gold)]">
            {hidden.rationalThought.value}
          </span>
        </div>
      </div>
    );
  };

  // Section: Charts
  const renderCharts = () => {
    // Prepare pyramid data structure
    const pyramidData = {
      foundation: {
        day: profile.coreNumbers.birthday?.value || 0,
        month: new Date(formData.birthDate).getMonth() + 1,
        year: profile.coreNumbers.lifePath?.value || 0
      },
      pinnacles: profile.cycles.pinnacles?.pinnacles || [],
      challenges: profile.cycles.challenges?.challenges || []
    };

    return (
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-[var(--color-charcoal)] rounded-2xl">
          <InclusionChart data={profile.charts.inclusion} />
        </div>
        <div className="p-6 bg-[var(--color-charcoal)] rounded-2xl">
          <NumerologyPyramid
            pyramidData={pyramidData}
            currentAge={currentAge}
          />
        </div>
      </div>
    );
  };

  // Section: Timeline
  const renderTimeline = () => (
    <div className="p-6 bg-[var(--color-charcoal)] rounded-2xl">
      <LifeTimeline
        lifeCycles={profile.cycles.lifeCycles}
        pinnacles={profile.cycles.pinnacles}
        challenges={profile.cycles.challenges}
        currentAge={currentAge}
      />
    </div>
  );

  // Section: Forecast
  const renderForecast = () => (
    <div className="p-6 bg-[var(--color-charcoal)] rounded-2xl">
      <PersonalYearWheel
        calculator={calculator}
        currentYear={new Date().getFullYear()}
      />
    </div>
  );

  // Section: AI Report
  const renderAIReport = () => (
    <div className="space-y-6">
      {!aiReport && !isGeneratingAI && (
        <div className="text-center p-8">
          <SacredGeometry type="metatron" size={150} opacity={0.1} className="mx-auto mb-4" />
          <h3 className="font-display text-xl text-[var(--color-gold)] mb-2">
            AI Deep Analysis
          </h3>
          <p className="text-[var(--color-mist)] mb-6">
            Để AI phân tích chuyên sâu hồ sơ số học của bạn với 1500-2000 từ chi tiết
          </p>
          <button
            onClick={generateAIReport}
            className="px-6 py-3 bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-jade)] text-[var(--color-obsidian)] font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto"
          >
            <Sparkles size={20} />
            Tạo Báo Cáo AI
          </button>
        </div>
      )}

      {isGeneratingAI && (
        <div className="text-center p-8">
          <Loader2 size={40} className="animate-spin text-[var(--color-gold)] mx-auto mb-4" />
          <p className="text-[var(--color-mist)]">Đang phân tích hồ sơ...</p>
        </div>
      )}

      {aiReport && (
        <div className="prose prose-invert max-w-none">
          <div
            className="text-[var(--color-pearl)] leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: aiReport
                .replace(/### (.*)/g, '<h3 class="text-[var(--color-gold)] font-display text-lg mt-6 mb-3">$1</h3>')
                .replace(/## (.*)/g, '<h2 class="text-[var(--color-gold)] font-display text-xl mt-8 mb-4">$1</h2>')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--color-gold)]">$1</strong>')
                .replace(/- (.*)/g, '<li class="ml-4">$1</li>')
            }}
          />
          <div className="mt-6 flex justify-center">
            <button
              onClick={generateAIReport}
              className="px-4 py-2 border border-[var(--color-gold)]/30 text-[var(--color-gold)] rounded-lg hover:bg-[var(--color-gold)]/10 transition-colors"
            >
              Tạo lại báo cáo
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-gold)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-jade)]/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {stage === 'input' && renderInputForm()}
        {stage === 'loading' && renderLoading()}
        {stage === 'reveal' && renderReveal()}
        {stage === 'dashboard' && renderDashboard()}
      </AnimatePresence>
    </div>
  );
}
