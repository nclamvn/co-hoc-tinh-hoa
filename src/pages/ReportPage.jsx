import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollText, Calendar, User, ArrowRight, Bot, Loader2, RotateCcw, Sparkles, Download, Star, Moon, FileText, Sun, Check, Hand, Smile } from 'lucide-react';
import { fullNumerologyAnalysis } from '../utils/numerology';
import { fullAstrologyAnalysis } from '../utils/astrology';
import { generatePDF } from '../services/pdfGenerator';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export default function ReportPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    day: '',
    month: '',
    year: '',
    gender: '',
    goal: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [report, setReport] = useState('');
  const [numerologyData, setNumerologyData] = useState(null);
  const [astrologyData, setAstrologyData] = useState(null);
  const [palmistryData, setPalmistryData] = useState(null);
  const [physiognomyData, setPhysiognomyData] = useState(null);
  const reportRef = useRef(null);

  // PDF Options
  const [pdfTheme, setPdfTheme] = useState('dark'); // 'dark' or 'light'
  const [includeSections, setIncludeSections] = useState({
    astrology: true,
    numerology: true,
    palmistry: false,
    physiognomy: false
  });

  // Palmistry manual input
  const [palmistryInput, setPalmistryInput] = useState({
    lifeLine: '',
    heartLine: '',
    headLine: '',
    fateLine: ''
  });

  // Physiognomy manual input
  const [physiognomyInput, setPhysiognomyInput] = useState({
    faceShape: '',
    forehead: '',
    eyebrows: '',
    eyes: '',
    nose: '',
    mouth: '',
    chin: '',
    ears: ''
  });

  const palmLineOptions = {
    lifeLine: ['Dài và rõ', 'Ngắn', 'Đứt đoạn', 'Uốn cong', 'Nhiều nhánh'],
    heartLine: ['Thẳng dài', 'Cong lên', 'Ngắn', 'Nhiều nhánh', 'Đứt đoạn'],
    headLine: ['Thẳng dài', 'Cong xuống', 'Ngắn', 'Đậm nét', 'Mờ nhạt'],
    fateLine: ['Rõ ràng', 'Mờ nhạt', 'Đứt đoạn', 'Không có', 'Nhiều đường']
  };

  const faceFeatureOptions = {
    faceShape: ['Trái xoan', 'Tròn', 'Vuông', 'Dài', 'Tam giác', 'Kim cương'],
    forehead: ['Cao rộng', 'Thấp hẹp', 'Vừa phải', 'Dô ra', 'Phẳng'],
    eyebrows: ['Đậm dày', 'Mỏng thưa', 'Cong vút', 'Thẳng ngang', 'Xếch lên'],
    eyes: ['To tròn', 'Dài hẹp', 'Một mí', 'Hai mí', 'Sâu'],
    nose: ['Cao thẳng', 'Tẹt', 'Khoằm', 'Nhỏ xinh', 'To bè'],
    mouth: ['Rộng', 'Nhỏ', 'Môi dày', 'Môi mỏng', 'Cân đối'],
    chin: ['Nhọn', 'Vuông', 'Tròn', 'Thụt', 'Chẻ đôi'],
    ears: ['To', 'Nhỏ', 'Dài', 'Sát đầu', 'Vểnh ra']
  };

  const handleSectionToggle = (section) => {
    setIncludeSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.day || !formData.month || !formData.year) return;

    setIsGenerating(true);
    setReport('');
    setExportSuccess(false);

    // Numerology Analysis
    const numAnalysis = fullNumerologyAnalysis(
      formData.fullName,
      parseInt(formData.day),
      parseInt(formData.month),
      parseInt(formData.year),
      'pythagorean'
    );
    setNumerologyData(numAnalysis);

    // Astrology Analysis
    const astroAnalysis = fullAstrologyAnalysis(
      parseInt(formData.year),
      parseInt(formData.month),
      parseInt(formData.day)
    );
    setAstrologyData(astroAnalysis);

    // Palmistry Data (if included)
    let palmData = null;
    if (includeSections.palmistry && Object.values(palmistryInput).some(v => v)) {
      palmData = palmistryInput;
      setPalmistryData(palmData);
    }

    // Physiognomy Data (if included)
    let physioData = null;
    if (includeSections.physiognomy && Object.values(physiognomyInput).some(v => v)) {
      physioData = physiognomyInput;
      setPhysiognomyData(physioData);
    }

    try {
      // Build prompt with all included sections
      let promptSections = `
**THÔNG TIN:**
- Họ tên: ${formData.fullName}
- Ngày sinh: ${formData.day}/${formData.month}/${formData.year}
- Giới tính: ${formData.gender || 'Không xác định'}
- Mục tiêu: ${formData.goal || 'Không xác định'}
`;

      if (includeSections.numerology) {
        promptSections += `
**THẦN SỐ HỌC:**
- Số Chủ Đạo: ${numAnalysis.lifePath}
- Số Biểu Đạt: ${numAnalysis.expression}
- Số Linh Hồn: ${numAnalysis.soulUrge}
- Số Nhân Cách: ${numAnalysis.personality}
- Năm Cá Nhân: ${numAnalysis.personalYear}
`;
      }

      if (includeSections.astrology) {
        promptSections += `
**TỬ VI:**
- Con giáp: ${astroAnalysis.zodiac.animal}
- Can Chi: ${astroAnalysis.canChi.fullName}
- Nạp Âm: ${astroAnalysis.canChi.napAm}
- Ngũ Hành: ${astroAnalysis.element.name}
`;
      }

      if (includeSections.palmistry && palmData) {
        promptSections += `
**TƯỚNG TAY:**
- Đường Sinh Mệnh: ${palmData.lifeLine || 'Không xác định'}
- Đường Tình Cảm: ${palmData.heartLine || 'Không xác định'}
- Đường Trí Tuệ: ${palmData.headLine || 'Không xác định'}
- Đường Sự Nghiệp: ${palmData.fateLine || 'Không xác định'}
`;
      }

      if (includeSections.physiognomy && physioData) {
        promptSections += `
**TƯỚNG MẶT:**
- Hình dáng khuôn mặt: ${physioData.faceShape || 'Không xác định'}
- Trán: ${physioData.forehead || 'Không xác định'}
- Lông mày: ${physioData.eyebrows || 'Không xác định'}
- Mắt: ${physioData.eyes || 'Không xác định'}
- Mũi: ${physioData.nose || 'Không xác định'}
- Miệng: ${physioData.mouth || 'Không xác định'}
- Cằm: ${physioData.chin || 'Không xác định'}
- Tai: ${physioData.ears || 'Không xác định'}
`;
      }

      // Build sections request
      let reportSections = `
## I. TỔNG QUAN BẢN MỆNH
## II. TÍNH CÁCH VÀ NỘI TÂM
## III. TIỀM NĂNG VÀ TÀI NĂNG
## IV. THÁCH THỨC CUỘC ĐỜI
## V. SỰ NGHIỆP VÀ TÀI LỘC
## VI. TÌNH DUYÊN
## VII. SỨC KHỎE`;

      if (includeSections.palmistry && palmData) {
        reportSections += `
## VIII. LUẬN GIẢI TƯỚNG TAY`;
      }

      if (includeSections.physiognomy && physioData) {
        reportSections += `
## IX. LUẬN GIẢI TƯỚNG MẶT`;
      }

      reportSections += `
## X. VẬN HẠN NĂM ${new Date().getFullYear()}
## XI. LỜI KHUYÊN TỔNG HỢP`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `Bạn là chuyên gia huyền học Á Đông uyên bác. Phong cách: Đẳng cấp, trưởng thành, tinh tế.
Tránh mê tín, tập trung vào văn hóa và phát triển bản thân. Format Markdown.
Kết hợp tất cả thông tin được cung cấp để tạo báo cáo tổng hợp toàn diện.`
          },
          {
            role: 'user',
            content: `Tạo BÁO CÁO TỔNG HỢP HUYỀN HỌC cho:
${promptSections}

Tạo báo cáo chi tiết với các phần:
${reportSections}`
          }
        ],
        max_tokens: 4000
      });

      setReport(response.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
      setReport('Không thể tạo báo cáo. Vui lòng thử lại sau.');
    }
    setIsGenerating(false);
  };

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    setExportSuccess(false);
    try {
      const filename = `bao-cao-${formData.fullName.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`;

      // Apply theme temporarily for PDF export
      const element = reportRef.current;
      const originalBg = element.style.backgroundColor;
      const originalColor = element.style.color;

      if (pdfTheme === 'light') {
        element.style.backgroundColor = '#F5F0E8';
        element.querySelectorAll('[data-pdf-text]').forEach(el => {
          el.dataset.originalColor = el.style.color;
          el.style.color = '#1A1A1A';
        });
      }

      await generatePDF(element, filename, {
        backgroundColor: pdfTheme === 'light' ? '#F5F0E8' : '#0D0D0D'
      });

      // Restore original styles
      if (pdfTheme === 'light') {
        element.style.backgroundColor = originalBg;
        element.querySelectorAll('[data-pdf-text]').forEach(el => {
          el.style.color = el.dataset.originalColor;
        });
      }

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 5000);
    } catch (error) {
      console.error('PDF export error:', error);
      alert('Không thể xuất PDF. Vui lòng thử lại.');
    }
    setIsExporting(false);
  };

  const reset = () => {
    setReport('');
    setNumerologyData(null);
    setAstrologyData(null);
    setPalmistryData(null);
    setPhysiognomyData(null);
    setExportSuccess(false);
    setFormData({ fullName: '', day: '', month: '', year: '', gender: '', goal: '' });
    setPalmistryInput({ lifeLine: '', heartLine: '', headLine: '', fateLine: '' });
    setPhysiognomyInput({ faceShape: '', forehead: '', eyebrows: '', eyes: '', nose: '', mouth: '', chin: '', ears: '' });
  };

  const renderMarkdown = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-display text-[#0A6B5E] mt-5 mb-2">{line.replace('### ', '')}</h3>;
      if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-display text-[#C9A227] mt-6 mb-3 pb-2 border-b border-[#C9A227]/20">{line.replace('## ', '')}</h2>;
      if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-display text-[#C9A227] mt-4 mb-4">{line.replace('# ', '')}</h1>;
      if (line.startsWith('- ')) return <li key={i} className="text-[#E8E0D5] ml-4 mb-1 text-sm">{line.replace('- ', '')}</li>;
      if (line.trim() === '') return <br key={i} />;
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className="text-[#E8E0D5] leading-relaxed mb-2 text-sm" data-pdf-text>
          {parts.map((part, j) => part.startsWith('**') && part.endsWith('**') ? <strong key={j} className="text-[#F5F0E8]">{part.replace(/\*\*/g, '')}</strong> : part)}
        </p>
      );
    });
  };

  // Theme colors based on selection
  const themeColors = pdfTheme === 'light'
    ? { bg: '#F5F0E8', card: '#FFFFFF', text: '#1A1A1A', muted: '#666666', border: '#C9A227' }
    : { bg: '#0D0D0D', card: '#1A1A1A', text: '#F5F0E8', muted: '#B8B0A5', border: '#C9A227' };

  return (
    <div className="min-h-screen bg-mystical pt-24 pb-16 px-4">
      <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-earth)]/20 border border-[var(--color-earth)]/30 mb-6">
            <ScrollText size={32} className="text-[var(--color-earth)]" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-[var(--color-ivory)] mb-4">Báo Cáo Tổng Hợp</h1>
          <p className="text-[var(--color-mist)] max-w-xl mx-auto">Kết hợp Tử Vi, Thần Số Học, Tướng Tay và Tướng Mặt</p>
        </div>

        <AnimatePresence mode="wait">
          {!report ? (
            <motion.form key="form" onSubmit={handleSubmit} className="card-mystical rounded-2xl p-6 md:p-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="space-y-8">
                {/* Personal Info Section */}
                <div className="space-y-6">
                  <h2 className="font-display text-xl text-[var(--color-gold)] border-b border-[var(--color-gold)]/20 pb-2">Thông Tin Cá Nhân</h2>

                  <div>
                    <label className="flex items-center gap-2 text-[var(--color-pearl)] mb-3 font-display">
                      <User size={18} className="text-[var(--color-gold)]" /> Họ và Tên
                    </label>
                    <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} placeholder="Nguyễn Văn An" className="input-mystical w-full rounded-xl" required />
                  </div>

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

                  <div>
                    <label className="block text-[var(--color-pearl)] mb-3 font-display">Giới tính</label>
                    <div className="flex gap-4">
                      {['Nam', 'Nữ', 'Khác'].map((g) => (
                        <button key={g} type="button" onClick={() => setFormData({...formData, gender: g})}
                          className={`flex-1 py-3 rounded-xl border transition-all ${formData.gender === g ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/20 text-[var(--color-gold)]' : 'border-[var(--color-smoke)] text-[var(--color-mist)] hover:border-[var(--color-gold)]/50'}`}>
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[var(--color-pearl)] mb-3 font-display">Mục tiêu cuộc sống (tùy chọn)</label>
                    <div className="flex flex-wrap gap-2">
                      {['Sự nghiệp', 'Tình duyên', 'Tài chính', 'Sức khỏe', 'Gia đình', 'Phát triển bản thân'].map((goal) => (
                        <button key={goal} type="button" onClick={() => setFormData({...formData, goal: formData.goal === goal ? '' : goal})}
                          className={`px-4 py-2 rounded-lg border transition-all text-sm ${formData.goal === goal ? 'border-[var(--color-jade)] bg-[var(--color-jade)]/20 text-[var(--color-jade)]' : 'border-[var(--color-smoke)] text-[var(--color-mist)] hover:border-[var(--color-jade)]/50'}`}>
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section Selection */}
                <div className="space-y-4">
                  <h2 className="font-display text-xl text-[var(--color-gold)] border-b border-[var(--color-gold)]/20 pb-2">Chọn Nội Dung Báo Cáo</h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { key: 'astrology', label: 'Tử Vi', icon: Star, color: 'fire' },
                      { key: 'numerology', label: 'Thần Số Học', icon: FileText, color: 'jade' },
                      { key: 'palmistry', label: 'Tướng Tay', icon: Hand, color: 'water' },
                      { key: 'physiognomy', label: 'Tướng Mặt', icon: Smile, color: 'gold' }
                    ].map((section) => (
                      <button
                        key={section.key}
                        type="button"
                        onClick={() => handleSectionToggle(section.key)}
                        className={`flex items-center gap-2 p-4 rounded-xl border transition-all ${
                          includeSections[section.key]
                            ? `border-[var(--color-${section.color})] bg-[var(--color-${section.color})]/20 text-[var(--color-${section.color})]`
                            : 'border-[var(--color-smoke)] text-[var(--color-mist)] hover:border-[var(--color-gold)]/50'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          includeSections[section.key] ? `border-[var(--color-${section.color})] bg-[var(--color-${section.color})]` : 'border-[var(--color-mist)]'
                        }`}>
                          {includeSections[section.key] && <Check size={12} className="text-white" />}
                        </div>
                        <section.icon size={18} />
                        <span className="text-sm">{section.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Palmistry Input - Only show if selected */}
                {includeSections.palmistry && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <h2 className="font-display text-xl text-[var(--color-water)] border-b border-[var(--color-water)]/20 pb-2 flex items-center gap-2">
                      <Hand size={20} /> Thông Tin Tướng Tay
                    </h2>
                    <p className="text-sm text-[var(--color-mist)]">Chọn đặc điểm các đường chỉ tay của bạn:</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { key: 'lifeLine', label: 'Đường Sinh Mệnh' },
                        { key: 'heartLine', label: 'Đường Tình Cảm' },
                        { key: 'headLine', label: 'Đường Trí Tuệ' },
                        { key: 'fateLine', label: 'Đường Sự Nghiệp' }
                      ].map((line) => (
                        <div key={line.key}>
                          <label className="block text-sm text-[var(--color-pearl)] mb-2">{line.label}</label>
                          <select
                            value={palmistryInput[line.key]}
                            onChange={(e) => setPalmistryInput({...palmistryInput, [line.key]: e.target.value})}
                            className="input-mystical w-full rounded-xl"
                          >
                            <option value="">-- Chọn --</option>
                            {palmLineOptions[line.key].map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Physiognomy Input - Only show if selected */}
                {includeSections.physiognomy && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <h2 className="font-display text-xl text-[var(--color-gold)] border-b border-[var(--color-gold)]/20 pb-2 flex items-center gap-2">
                      <Smile size={20} /> Thông Tin Tướng Mặt
                    </h2>
                    <p className="text-sm text-[var(--color-mist)]">Chọn đặc điểm khuôn mặt của bạn:</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { key: 'faceShape', label: 'Hình dáng mặt' },
                        { key: 'forehead', label: 'Trán' },
                        { key: 'eyebrows', label: 'Lông mày' },
                        { key: 'eyes', label: 'Mắt' },
                        { key: 'nose', label: 'Mũi' },
                        { key: 'mouth', label: 'Miệng' },
                        { key: 'chin', label: 'Cằm' },
                        { key: 'ears', label: 'Tai' }
                      ].map((feature) => (
                        <div key={feature.key}>
                          <label className="block text-xs text-[var(--color-pearl)] mb-2">{feature.label}</label>
                          <select
                            value={physiognomyInput[feature.key]}
                            onChange={(e) => setPhysiognomyInput({...physiognomyInput, [feature.key]: e.target.value})}
                            className="input-mystical w-full rounded-lg text-sm py-2"
                          >
                            <option value="">-- Chọn --</option>
                            {faceFeatureOptions[feature.key].map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* PDF Theme Selection */}
                <div className="space-y-4">
                  <h2 className="font-display text-xl text-[var(--color-gold)] border-b border-[var(--color-gold)]/20 pb-2">Theme PDF</h2>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setPdfTheme('dark')}
                      className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
                        pdfTheme === 'dark'
                          ? 'border-[var(--color-gold)] bg-[var(--color-charcoal)]'
                          : 'border-[var(--color-smoke)] hover:border-[var(--color-gold)]/50'
                      }`}
                    >
                      <Moon size={20} className={pdfTheme === 'dark' ? 'text-[var(--color-gold)]' : 'text-[var(--color-mist)]'} />
                      <span className={pdfTheme === 'dark' ? 'text-[var(--color-gold)]' : 'text-[var(--color-mist)]'}>Tối (Dark)</span>
                      {pdfTheme === 'dark' && <Check size={16} className="text-[var(--color-gold)]" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setPdfTheme('light')}
                      className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
                        pdfTheme === 'light'
                          ? 'border-[var(--color-gold)] bg-[var(--color-ivory)]/10'
                          : 'border-[var(--color-smoke)] hover:border-[var(--color-gold)]/50'
                      }`}
                    >
                      <Sun size={20} className={pdfTheme === 'light' ? 'text-[var(--color-gold)]' : 'text-[var(--color-mist)]'} />
                      <span className={pdfTheme === 'light' ? 'text-[var(--color-gold)]' : 'text-[var(--color-mist)]'}>Sáng (Light)</span>
                      {pdfTheme === 'light' && <Check size={16} className="text-[var(--color-gold)]" />}
                    </button>
                  </div>
                </div>

                <motion.button type="submit" disabled={isGenerating} className="btn-mystical w-full rounded-xl text-lg mt-4" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  {isGenerating ? (
                    <span className="flex items-center justify-center gap-3"><Sparkles className="animate-spin" size={20} /> Đang tạo báo cáo...</span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">Tạo Báo Cáo Tổng Hợp <ArrowRight size={20} /></span>
                  )}
                </motion.button>
              </div>
            </motion.form>
          ) : (
            <motion.div key="result" className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Success Message */}
              <AnimatePresence>
                {exportSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-[var(--color-jade)]/20 border border-[var(--color-jade)] rounded-xl p-4 flex items-center gap-3"
                  >
                    <Check size={24} className="text-[var(--color-jade)]" />
                    <div>
                      <p className="text-[var(--color-jade)] font-medium">Xuất PDF thành công!</p>
                      <p className="text-sm text-[var(--color-mist)]">File đã được tải về máy của bạn.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* PDF Export Content */}
              <div ref={reportRef} className="bg-[#0D0D0D]" style={{ backgroundColor: themeColors.bg }}>
                {/* PDF Header */}
                <div className="text-center py-8 px-6 border-b" style={{ borderColor: `${themeColors.border}30` }}>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Star size={16} style={{ color: themeColors.border }} />
                    <Moon size={20} style={{ color: themeColors.border }} />
                    <Star size={16} style={{ color: themeColors.border }} />
                  </div>
                  <h1 className="font-display text-3xl mb-2" style={{ color: themeColors.border }}>Cổ Học Tinh Hoa</h1>
                  <p className="text-sm italic" style={{ color: themeColors.muted }}>Ancient Wisdom</p>
                  <div className="w-32 h-px mx-auto mt-4" style={{ background: `linear-gradient(to right, transparent, ${themeColors.border}, transparent)` }} />
                </div>

                {/* Personal Info */}
                <div className="p-6 border-b" style={{ borderColor: `${themeColors.border}20` }}>
                  <div className="rounded-xl p-5 border" style={{ backgroundColor: themeColors.card, borderColor: `${themeColors.border}20` }}>
                    <h2 className="font-display text-lg mb-4 flex items-center gap-2" style={{ color: themeColors.border }}>
                      <User size={18} /> Thông Tin Cá Nhân
                    </h2>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span style={{ color: themeColors.muted }}>Họ tên:</span>
                        <span className="ml-2" style={{ color: themeColors.text }}>{formData.fullName}</span>
                      </div>
                      <div>
                        <span style={{ color: themeColors.muted }}>Ngày sinh:</span>
                        <span className="ml-2" style={{ color: themeColors.text }}>{formData.day}/{formData.month}/{formData.year}</span>
                      </div>
                      <div>
                        <span style={{ color: themeColors.muted }}>Giới tính:</span>
                        <span className="ml-2" style={{ color: themeColors.text }}>{formData.gender || 'Không xác định'}</span>
                      </div>
                      <div>
                        <span style={{ color: themeColors.muted }}>Mục tiêu:</span>
                        <span className="ml-2" style={{ color: themeColors.text }}>{formData.goal || 'Không xác định'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary Cards */}
                <div className="p-6 grid grid-cols-2 gap-4">
                  {includeSections.numerology && numerologyData && (
                    <div className="rounded-xl p-5 border" style={{ backgroundColor: themeColors.card, borderColor: '#0A6B5E30' }}>
                      <h3 className="font-display text-base mb-4" style={{ color: '#0A6B5E' }}>Thần Số Học</h3>
                      <div className="grid grid-cols-4 gap-2 text-center">
                        {[
                          { label: 'Chủ Đạo', value: numerologyData.lifePath },
                          { label: 'Biểu Đạt', value: numerologyData.expression },
                          { label: 'Linh Hồn', value: numerologyData.soulUrge },
                          { label: 'Nhân Cách', value: numerologyData.personality }
                        ].map((item, i) => (
                          <div key={i}>
                            <div className="text-2xl font-display" style={{ color: themeColors.border }}>{item.value}</div>
                            <div className="text-[10px]" style={{ color: themeColors.muted }}>{item.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {includeSections.astrology && astrologyData && (
                    <div className="rounded-xl p-5 border" style={{ backgroundColor: themeColors.card, borderColor: '#C4453630' }}>
                      <h3 className="font-display text-base mb-4" style={{ color: '#C44536' }}>Tử Vi</h3>
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{astrologyData.zodiac.emoji}</div>
                        <div>
                          <div className="text-base" style={{ color: themeColors.text }}>Tuổi {astrologyData.zodiac.animal}</div>
                          <div className="text-xs" style={{ color: themeColors.muted }}>{astrologyData.canChi.fullName}</div>
                          <div className="text-xs" style={{ color: themeColors.muted }}>Mệnh {astrologyData.element.name}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Palmistry & Physiognomy Cards */}
                {(palmistryData || physiognomyData) && (
                  <div className="px-6 pb-6 grid grid-cols-2 gap-4">
                    {includeSections.palmistry && palmistryData && (
                      <div className="rounded-xl p-5 border" style={{ backgroundColor: themeColors.card, borderColor: '#3D5A8030' }}>
                        <h3 className="font-display text-base mb-4 flex items-center gap-2" style={{ color: '#3D5A80' }}>
                          <Hand size={16} /> Tướng Tay
                        </h3>
                        <div className="space-y-2 text-sm">
                          {palmistryData.lifeLine && <div><span style={{ color: themeColors.muted }}>Sinh Mệnh:</span> <span style={{ color: themeColors.text }}>{palmistryData.lifeLine}</span></div>}
                          {palmistryData.heartLine && <div><span style={{ color: themeColors.muted }}>Tình Cảm:</span> <span style={{ color: themeColors.text }}>{palmistryData.heartLine}</span></div>}
                          {palmistryData.headLine && <div><span style={{ color: themeColors.muted }}>Trí Tuệ:</span> <span style={{ color: themeColors.text }}>{palmistryData.headLine}</span></div>}
                          {palmistryData.fateLine && <div><span style={{ color: themeColors.muted }}>Sự Nghiệp:</span> <span style={{ color: themeColors.text }}>{palmistryData.fateLine}</span></div>}
                        </div>
                      </div>
                    )}
                    {includeSections.physiognomy && physiognomyData && (
                      <div className="rounded-xl p-5 border" style={{ backgroundColor: themeColors.card, borderColor: '#C9A22730' }}>
                        <h3 className="font-display text-base mb-4 flex items-center gap-2" style={{ color: '#C9A227' }}>
                          <Smile size={16} /> Tướng Mặt
                        </h3>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {physiognomyData.faceShape && <div><span style={{ color: themeColors.muted }}>Mặt:</span> <span style={{ color: themeColors.text }}>{physiognomyData.faceShape}</span></div>}
                          {physiognomyData.forehead && <div><span style={{ color: themeColors.muted }}>Trán:</span> <span style={{ color: themeColors.text }}>{physiognomyData.forehead}</span></div>}
                          {physiognomyData.eyes && <div><span style={{ color: themeColors.muted }}>Mắt:</span> <span style={{ color: themeColors.text }}>{physiognomyData.eyes}</span></div>}
                          {physiognomyData.nose && <div><span style={{ color: themeColors.muted }}>Mũi:</span> <span style={{ color: themeColors.text }}>{physiognomyData.nose}</span></div>}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Report Content */}
                <div className="p-6">
                  <div className="rounded-xl p-6 border" style={{ backgroundColor: themeColors.card, borderColor: `${themeColors.border}20` }}>
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: `${themeColors.border}20` }}>
                      <Bot size={20} style={{ color: themeColors.border }} />
                      <div>
                        <h3 className="font-display text-lg" style={{ color: themeColors.text }}>Báo Cáo Huyền Học AI</h3>
                        <p className="text-xs" style={{ color: themeColors.muted }}>
                          {[
                            includeSections.astrology && 'Tử Vi',
                            includeSections.numerology && 'Thần Số Học',
                            includeSections.palmistry && palmistryData && 'Tướng Tay',
                            includeSections.physiognomy && physiognomyData && 'Tướng Mặt'
                          ].filter(Boolean).join(' + ')}
                        </p>
                      </div>
                    </div>
                    <div>{renderMarkdown(report)}</div>
                  </div>
                </div>

                {/* PDF Footer */}
                <div className="text-center py-6 px-6 border-t" style={{ borderColor: `${themeColors.border}20` }}>
                  <div className="w-24 h-px mx-auto mb-4" style={{ background: `linear-gradient(to right, transparent, ${themeColors.border}, transparent)` }} />
                  <p className="text-xs mb-1" style={{ color: themeColors.muted }}>Ngày tạo: {new Date().toLocaleDateString('vi-VN')}</p>
                  <p className="text-sm font-display italic" style={{ color: themeColors.border }}>"Khám phá vận mệnh qua lăng kính cổ xưa"</p>
                  <p className="text-xs mt-2" style={{ color: themeColors.muted }}>© {new Date().getFullYear()} Cổ Học Tinh Hoa</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-4 pt-4">
                <motion.button
                  onClick={handleExportPDF}
                  disabled={isExporting}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-jade)] text-white hover:bg-[var(--color-jade-light)] transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  {isExporting ? (
                    <><Loader2 size={18} className="animate-spin" /> Đang xuất...</>
                  ) : (
                    <><Download size={18} /> Tải PDF</>
                  )}
                </motion.button>
                <motion.button onClick={reset} className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--color-gold)]/30 text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10" whileHover={{ scale: 1.05 }}>
                  <RotateCcw size={18} /> Tạo báo cáo mới
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
