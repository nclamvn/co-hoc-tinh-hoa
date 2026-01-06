import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

import { CompatibilityForm, CompatibilityResult } from '../components/compatibility';
import { LoadingOracle } from '../components/animations';
import { CompatibilityCalculator } from '../utils/compatibility/compatibilityMaster';

export default function CompatibilityPage() {
  const [stage, setStage] = useState('input'); // input, loading, result
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setStage('loading');
    setError(null);

    try {
      // Simulate loading for dramatic effect
      await new Promise(resolve => setTimeout(resolve, 2500));

      const calculator = new CompatibilityCalculator(
        formData.person1,
        formData.person2,
        formData.relationshipType
      );

      const report = calculator.getFullReport();
      setResult(report);
      setStage('result');
    } catch (err) {
      console.error('Compatibility calculation error:', err);
      setError('Đã xảy ra lỗi khi tính toán. Vui lòng thử lại.');
      setStage('input');
    }
  };

  const handleReset = () => {
    setStage('input');
    setResult(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-[var(--color-vermillion)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-[var(--color-jade)]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Input Stage */}
          {stage === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-vermillion)]/10 border border-[var(--color-vermillion)]/30 mb-4"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart size={16} className="text-[var(--color-vermillion)]" />
                  <span className="text-sm text-[var(--color-vermillion)]">Compatibility Analysis</span>
                </motion.div>
                <h1 className="font-display text-3xl md:text-4xl text-gradient-gold mb-2">
                  Xem Hợp Tuổi
                </h1>
                <p className="text-[var(--color-mist)]">
                  Phân tích độ tương hợp dựa trên Con Giáp, Ngũ Hành và Thần Số Học
                </p>
              </div>

              {/* Form */}
              <div className="relative">
                <CompatibilityForm onSubmit={handleSubmit} />
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-[var(--color-vermillion)]/10 border border-[var(--color-vermillion)]/30 rounded-xl text-center"
                >
                  <p className="text-[var(--color-vermillion)]">{error}</p>
                </motion.div>
              )}

              {/* Info Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 grid md:grid-cols-3 gap-4"
              >
                {[
                  { icon: '🐲', title: 'Con Giáp', desc: 'Tam Hợp, Lục Hợp, Lục Xung' },
                  { icon: '🔥', title: 'Ngũ Hành', desc: 'Tương Sinh, Tương Khắc' },
                  { icon: '#️⃣', title: 'Thần Số', desc: 'Life Path, Soul Urge' }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-4 bg-[var(--color-charcoal)] rounded-xl border border-[var(--color-gold)]/10 text-center"
                  >
                    <span className="text-3xl">{item.icon}</span>
                    <h4 className="font-semibold text-[var(--color-gold)] mt-2">{item.title}</h4>
                    <p className="text-xs text-[var(--color-mist)] mt-1">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Loading Stage */}
          {stage === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh]"
            >
              <LoadingOracle />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center mt-8"
              >
                <p className="text-[var(--color-gold)] flex items-center gap-2 justify-center">
                  <Sparkles size={18} />
                  Đang phân tích độ tương hợp...
                </p>
                <p className="text-sm text-[var(--color-mist)] mt-2">
                  Xem xét Con Giáp, Ngũ Hành, Thần Số Học
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* Result Stage */}
          {stage === 'result' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="font-display text-2xl md:text-3xl text-gradient-gold mb-2">
                  Kết Quả Tương Hợp
                </h1>
              </div>

              {/* Result Component */}
              <CompatibilityResult result={result} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
