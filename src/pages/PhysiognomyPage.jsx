import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Upload, Camera, ArrowRight, RotateCcw, Bot, Loader2, X, Image, Scan } from 'lucide-react';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const FACE_FEATURES = [
  { id: 'faceShape', label: 'Hình dạng khuôn mặt', options: ['Tròn', 'Oval', 'Vuông', 'Dài', 'Trái tim', 'Kim cương'] },
  { id: 'forehead', label: 'Trán', options: ['Cao rộng', 'Thấp hẹp', 'Trung bình', 'Gồ', 'Phẳng'] },
  { id: 'eyebrows', label: 'Lông mày', options: ['Đậm dày', 'Mỏng nhẹ', 'Cong', 'Thẳng', 'Rậm rạp'] },
  { id: 'eyes', label: 'Mắt', options: ['To tròn', 'Nhỏ dài', 'Mắt phượng', 'Một mí', 'Hai mí', 'Mắt sâu'] },
  { id: 'nose', label: 'Mũi', options: ['Cao thẳng', 'Thấp', 'Mũi tẹt', 'Mũi khoằm', 'Mũi to', 'Mũi nhỏ'] },
  { id: 'mouth', label: 'Miệng', options: ['Rộng', 'Nhỏ', 'Môi dày', 'Môi mỏng', 'Cân đối'] },
  { id: 'chin', label: 'Cằm', options: ['Nhọn', 'Vuông', 'Tròn', 'Chẻ', 'Thụt', 'Nhô ra'] },
  { id: 'ears', label: 'Tai', options: ['To', 'Nhỏ', 'Dài', 'Tròn', 'Áp sát đầu', 'Vểnh ra'] }
];

export default function PhysiognomyPage() {
  const [mode, setMode] = useState('select');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [manualFeatures, setManualFeatures] = useState({});
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeWithImage = async () => {
    if (!uploadedImage) return;
    setIsAnalyzing(true);
    setMode('result');

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `Bạn là chuyên gia nhân tướng học (Mian Xiang - 面相) uyên bác. Phân tích khuôn mặt theo truyền thống Á Đông.

Phong cách: Đẳng cấp, trưởng thành, tôn trọng. Dùng từ tinh tế như "hài hòa", "nội tại", "cân bằng", "bền vững".

QUAN TRỌNG: Tập trung vào phân tích tướng học, KHÔNG bình luận về ngoại hình đẹp/xấu theo nghĩa thẩm mỹ.

Format trả lời bằng Markdown:
## Tổng Quan Khuôn Mặt
## Tam Đình (Ba Vùng Chính)
### Thượng Đình (Trán - Tuổi trẻ 15-30)
### Trung Đình (Mũi - Trung niên 31-50)
### Hạ Đình (Miệng, Cằm - Tuổi già 51+)
## Ngũ Quan (Năm Bộ Phận)
### Mắt - Quan Sát Cung
### Mũi - Tài Bạch Cung
### Miệng - Xuất Nạp Cung
### Tai - Thái Thính Cung
### Lông mày - Bảo Thọ Cung
## Tính Cách & Tiềm Năng
## Sự Nghiệp & Tài Lộc
## Tình Duyên & Gia Đạo
## Lời Khuyên Phát Triển`
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Hãy phân tích chi tiết khuôn mặt này theo phương pháp Mian Xiang (nhân tướng học Trung Hoa) truyền thống.' },
              { type: 'image_url', image_url: { url: uploadedImage } }
            ]
          }
        ],
        max_tokens: 2500
      });

      setAiAnalysis(response.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
      setAiAnalysis('Không thể phân tích ảnh. Vui lòng thử lại hoặc sử dụng phương pháp nhập thủ công.');
    }
    setIsAnalyzing(false);
  };

  const analyzeManual = async () => {
    if (Object.keys(manualFeatures).length < 5) {
      alert('Vui lòng chọn ít nhất 5 đặc điểm để phân tích');
      return;
    }

    setIsAnalyzing(true);
    setMode('result');

    const featuresText = FACE_FEATURES
      .filter(f => manualFeatures[f.id])
      .map(f => `- ${f.label}: ${manualFeatures[f.id]}`)
      .join('\n');

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Bạn là chuyên gia nhân tướng học (Mian Xiang) uyên bác. Phân tích các đặc điểm khuôn mặt theo truyền thống Á Đông.

Phong cách: Đẳng cấp, trưởng thành, không mê tín. Dùng từ tinh tế.

Format trả lời bằng Markdown với các phần rõ ràng.`
          },
          {
            role: 'user',
            content: `Phân tích nhân tướng chi tiết dựa trên các đặc điểm sau:\n\n${featuresText}\n\nHãy phân tích:
1. Ý nghĩa tổng quan của hình dạng khuôn mặt
2. Phân tích Tam Đình (thượng, trung, hạ)
3. Phân tích từng bộ phận ngũ quan
4. Tính cách và tiềm năng
5. Sự nghiệp và tài lộc
6. Tình duyên và gia đạo
7. Lời khuyên phát triển`
          }
        ],
        max_tokens: 2000
      });

      setAiAnalysis(response.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
      setAiAnalysis('Không thể kết nối với AI. Vui lòng thử lại sau.');
    }
    setIsAnalyzing(false);
  };

  const reset = () => {
    setMode('select');
    setUploadedImage(null);
    setManualFeatures({});
    setAiAnalysis('');
  };

  const renderMarkdown = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-display text-[var(--color-water)] mt-6 mb-3">{line.replace('### ', '')}</h3>;
      if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-display text-[var(--color-gold)] mt-6 mb-3">{line.replace('## ', '')}</h2>;
      if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-display text-[var(--color-gold)] mt-6 mb-4">{line.replace('# ', '')}</h1>;
      if (line.startsWith('- ')) return <li key={i} className="text-[var(--color-pearl)] ml-4 mb-1">{line.replace('- ', '')}</li>;
      if (line.trim() === '') return <br key={i} />;
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className="text-[var(--color-pearl)] leading-relaxed mb-2">
          {parts.map((part, j) => part.startsWith('**') && part.endsWith('**') ? <strong key={j} className="text-[var(--color-ivory)]">{part.replace(/\*\*/g, '')}</strong> : part)}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-mystical pt-24 pb-16 px-4">
      <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-water)]/20 border border-[var(--color-water)]/30 mb-6">
            <User size={32} className="text-[var(--color-water)]" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-[var(--color-ivory)] mb-4">Tướng Số Khuôn Mặt</h1>
          <p className="text-[var(--color-mist)] max-w-xl mx-auto">Phân tích ngũ quan theo Mian Xiang - Thuật nhân tướng học Trung Hoa</p>
        </div>

        <AnimatePresence mode="wait">
          {/* Mode Selection */}
          {mode === 'select' && (
            <motion.div key="select" className="grid md:grid-cols-2 gap-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <motion.div className="card-mystical rounded-2xl p-8 cursor-pointer text-center" whileHover={{ y: -8, borderColor: 'var(--color-water)' }} onClick={() => setMode('upload')}>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-water)]/20 flex items-center justify-center">
                  <Camera size={40} className="text-[var(--color-water)]" />
                </div>
                <h3 className="font-display text-2xl text-[var(--color-ivory)] mb-3">Upload Ảnh</h3>
                <p className="text-[var(--color-mist)]">Chụp hoặc upload ảnh khuôn mặt để AI phân tích trực tiếp</p>
                <div className="mt-4 text-xs text-[var(--color-jade)]">Khuyến nghị - Chính xác hơn</div>
              </motion.div>

              <motion.div className="card-mystical rounded-2xl p-8 cursor-pointer text-center" whileHover={{ y: -8, borderColor: 'var(--color-water)' }} onClick={() => setMode('manual')}>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-jade)]/20 flex items-center justify-center">
                  <Scan size={40} className="text-[var(--color-jade)]" />
                </div>
                <h3 className="font-display text-2xl text-[var(--color-ivory)] mb-3">Nhập Thủ Công</h3>
                <p className="text-[var(--color-mist)]">Mô tả đặc điểm khuôn mặt của bạn để nhận phân tích</p>
                <div className="mt-4 text-xs text-[var(--color-mist)]">Không cần ảnh</div>
              </motion.div>
            </motion.div>
          )}

          {/* Upload Mode */}
          {mode === 'upload' && (
            <motion.div key="upload" className="card-mystical rounded-2xl p-6 md:p-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} className="hidden" />

              {!uploadedImage ? (
                <div className="text-center py-12">
                  <motion.div className="w-32 h-32 mx-auto mb-8 rounded-full border-2 border-dashed border-[var(--color-water)]/50 flex items-center justify-center cursor-pointer hover:border-[var(--color-water)] transition-colors" onClick={() => fileInputRef.current?.click()} whileHover={{ scale: 1.05 }}>
                    <Upload size={48} className="text-[var(--color-water)]" />
                  </motion.div>
                  <h3 className="font-display text-xl text-[var(--color-ivory)] mb-3">Chọn ảnh khuôn mặt</h3>
                  <p className="text-[var(--color-mist)] mb-6">Ảnh chính diện, đủ ánh sáng để thấy rõ các đặc điểm</p>
                  <motion.button onClick={() => fileInputRef.current?.click()} className="btn-mystical rounded-xl" whileHover={{ scale: 1.05 }}>
                    <Upload size={20} className="inline mr-2" /> Chọn ảnh
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative">
                    <img src={uploadedImage} alt="Face" className="w-full max-h-96 object-contain rounded-xl" />
                    <button onClick={() => setUploadedImage(null)} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[var(--color-obsidian)]/80 flex items-center justify-center text-[var(--color-mist)] hover:text-white">
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex gap-4">
                    <motion.button onClick={() => fileInputRef.current?.click()} className="flex-1 py-3 rounded-xl border border-[var(--color-water)]/30 text-[var(--color-water)] hover:bg-[var(--color-water)]/10" whileHover={{ scale: 1.02 }}>
                      <Image size={18} className="inline mr-2" /> Đổi ảnh
                    </motion.button>
                    <motion.button onClick={analyzeWithImage} className="flex-1 btn-mystical rounded-xl" whileHover={{ scale: 1.02 }}>
                      <Bot size={18} className="inline mr-2" /> Phân tích AI
                    </motion.button>
                  </div>
                </div>
              )}

              <button onClick={() => setMode('select')} className="flex items-center gap-2 mx-auto mt-6 text-[var(--color-mist)] hover:text-[var(--color-water)]">
                <ArrowRight size={16} className="rotate-180" /> Quay lại
              </button>
            </motion.div>
          )}

          {/* Manual Mode */}
          {mode === 'manual' && (
            <motion.div key="manual" className="card-mystical rounded-2xl p-6 md:p-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h3 className="font-display text-xl text-[var(--color-ivory)] mb-6">Mô tả đặc điểm khuôn mặt của bạn</h3>

              <div className="space-y-6">
                {FACE_FEATURES.map((feature) => (
                  <div key={feature.id}>
                    <label className="block text-[var(--color-pearl)] mb-3 font-display">{feature.label}</label>
                    <div className="flex flex-wrap gap-2">
                      {feature.options.map((option) => (
                        <button key={option} onClick={() => setManualFeatures({ ...manualFeatures, [feature.id]: option })}
                          className={`px-4 py-2 rounded-lg border transition-all text-sm ${manualFeatures[feature.id] === option ? 'border-[var(--color-water)] bg-[var(--color-water)]/20 text-[var(--color-water)]' : 'border-[var(--color-smoke)] text-[var(--color-mist)] hover:border-[var(--color-water)]/50'}`}>
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <motion.button onClick={analyzeManual} disabled={Object.keys(manualFeatures).length < 5} className="btn-mystical w-full rounded-xl text-lg mt-8 disabled:opacity-50" whileHover={{ scale: 1.02 }}>
                <Bot size={20} className="inline mr-2" /> Phân tích với AI
              </motion.button>

              <button onClick={() => setMode('select')} className="flex items-center gap-2 mx-auto mt-6 text-[var(--color-mist)] hover:text-[var(--color-water)]">
                <ArrowRight size={16} className="rotate-180" /> Quay lại
              </button>
            </motion.div>
          )}

          {/* Result Mode */}
          {mode === 'result' && (
            <motion.div key="result" className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {uploadedImage && (
                <div className="card-mystical rounded-2xl p-4">
                  <img src={uploadedImage} alt="Face" className="w-full max-h-64 object-contain rounded-xl" />
                </div>
              )}

              <div className="card-mystical rounded-2xl p-6 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-water)]/20 border border-[var(--color-water)]/30 flex items-center justify-center">
                    <Bot size={20} className="text-[var(--color-water)]" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-[var(--color-ivory)]">Phân Tích Nhân Tướng AI</h3>
                    <p className="text-xs text-[var(--color-mist)]">Mian Xiang • GPT-4 Vision</p>
                  </div>
                  {isAnalyzing && <Loader2 className="ml-auto animate-spin text-[var(--color-water)]" size={20} />}
                </div>

                <div className="prose prose-invert max-w-none">
                  {isAnalyzing ? (
                    <div className="flex items-center gap-3 text-[var(--color-mist)] py-8">
                      <Loader2 className="animate-spin" size={20} />
                      <span>Đang phân tích ngũ quan của bạn...</span>
                    </div>
                  ) : aiAnalysis ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{renderMarkdown(aiAnalysis)}</motion.div>
                  ) : null}
                </div>
              </div>

              <motion.button onClick={reset} className="flex items-center gap-2 mx-auto text-[var(--color-mist)] hover:text-[var(--color-water)]" whileHover={{ scale: 1.05 }}>
                <RotateCcw size={18} /> Phân tích lại
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
