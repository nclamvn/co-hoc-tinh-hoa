import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_MESSAGES = [
  'Đang kết nối với Thiên Cơ...',
  'Đang tra cứu Thiên Bàn...',
  'Đang an sao vào 12 cung...',
  'Đang tính toán Đại vận...',
  'Đang giải mã số mệnh...',
  'Đang phân tích Thần Số Học...',
  'Đang tổng hợp từ các nguồn...',
  'Đang kết nối với Huyền Không Đại Sư...',
  'Sắp hoàn tất...'
];

/**
 * Premium Loading Animation - "Khai Mở Thiên Cơ"
 */
export default function LoadingOracle({ progress = 0, isComplete = false }) {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [particles, setParticles] = useState([]);

  // Rotate messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-obsidian)]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, var(--color-gold) 0%, transparent 40%),
              radial-gradient(circle at 80% 70%, var(--color-jade) 0%, transparent 40%)
            `
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-[var(--color-gold)]"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-8 max-w-md">
        {/* Yin-Yang Symbol */}
        <motion.div
          className="relative w-24 h-24 mx-auto mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-full bg-[var(--color-gold)] blur-xl opacity-30" />

          {/* Yin-Yang SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <clipPath id="yinYang">
                <circle cx="50" cy="50" r="48" />
              </clipPath>
            </defs>

            {/* Background circle */}
            <circle cx="50" cy="50" r="48" fill="var(--color-charcoal)" stroke="var(--color-gold)" strokeWidth="2" />

            {/* Yin (dark) half */}
            <path
              d="M 50,2 A 48,48 0 0 1 50,98 A 24,24 0 0 1 50,50 A 24,24 0 0 0 50,2"
              fill="var(--color-obsidian)"
              clipPath="url(#yinYang)"
            />

            {/* Yang (light) half */}
            <path
              d="M 50,2 A 48,48 0 0 0 50,98 A 24,24 0 0 0 50,50 A 24,24 0 0 1 50,2"
              fill="var(--color-gold)"
              clipPath="url(#yinYang)"
            />

            {/* Yin dot */}
            <circle cx="50" cy="26" r="6" fill="var(--color-gold)" />

            {/* Yang dot */}
            <circle cx="50" cy="74" r="6" fill="var(--color-obsidian)" />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="font-display text-2xl md:text-3xl text-[var(--color-gold)] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ✨ Đang Khai Mở Thiên Cơ ✨
        </motion.h2>

        {/* Progress Bar */}
        <div className="relative h-2 bg-[var(--color-smoke)] rounded-full overflow-hidden mb-4">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-jade)] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />

          {/* Glow effect */}
          <motion.div
            className="absolute inset-y-0 w-8 bg-white opacity-30 blur-sm"
            animate={{ left: ['0%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Progress Percentage */}
        <div className="text-sm text-[var(--color-mist)] mb-4">
          {Math.round(progress)}%
        </div>

        {/* Rotating Messages */}
        <div className="h-12 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMessage}
              className="text-[var(--color-pearl)] text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {LOADING_MESSAGES[currentMessage]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Decorative Stars */}
        <div className="flex justify-center gap-4 mt-6">
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="text-[var(--color-gold)] text-lg"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity
              }}
            >
              ★
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
