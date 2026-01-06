import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Number Reveal Animation Component
 * Premium animation for revealing numerology numbers with dramatic effect
 */
export default function NumberReveal({
  number,
  title,
  subtitle,
  color = 'gold', // gold, jade, vermillion
  size = 'large', // small, medium, large
  onComplete,
  autoStart = true
}) {
  const [stage, setStage] = useState(autoStart ? 'counting' : 'idle');
  const [displayNumber, setDisplayNumber] = useState(0);

  const colorMap = {
    gold: 'var(--color-gold)',
    jade: 'var(--color-jade)',
    vermillion: 'var(--color-vermillion)'
  };

  const sizeMap = {
    small: { container: 'w-20 h-20', number: 'text-3xl' },
    medium: { container: 'w-28 h-28', number: 'text-5xl' },
    large: { container: 'w-36 h-36', number: 'text-7xl' }
  };

  const mainColor = colorMap[color];
  const sizes = sizeMap[size];

  // Counting animation
  useEffect(() => {
    if (stage !== 'counting') return;

    const duration = 1500; // 1.5 seconds
    const steps = 20;
    const interval = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      // Generate random number that gradually approaches target
      if (currentStep < steps - 3) {
        setDisplayNumber(Math.floor(Math.random() * 9) + 1);
      } else {
        setDisplayNumber(number);
      }

      if (currentStep >= steps) {
        clearInterval(timer);
        setStage('revealed');
        if (onComplete) onComplete();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [stage, number, onComplete]);

  const start = () => {
    setStage('counting');
  };

  if (stage === 'idle') {
    return (
      <motion.button
        onClick={start}
        className={`${sizes.container} rounded-full bg-[var(--color-charcoal)] border-2 border-[var(--color-gold)]/30 flex items-center justify-center cursor-pointer hover:border-[var(--color-gold)] transition-colors`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-[var(--color-gold)]">?</span>
      </motion.button>
    );
  }

  return (
    <div className="relative flex flex-col items-center">
      {/* Sacred Geometry Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, rotate: 0, scale: 0.5 }}
          animate={{
            opacity: stage === 'revealed' ? 0.3 : 0.1,
            rotate: 360,
            scale: stage === 'revealed' ? 1.5 : 1
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 }
          }}
          className="absolute"
          style={{ width: '200%', height: '200%' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke={mainColor} strokeWidth="0.3" strokeOpacity="0.5" />
            <circle cx="50" cy="50" r="35" fill="none" stroke={mainColor} strokeWidth="0.3" strokeOpacity="0.4" />
            <circle cx="50" cy="50" r="25" fill="none" stroke={mainColor} strokeWidth="0.3" strokeOpacity="0.3" />
            {/* Hexagram */}
            <polygon
              points="50,5 95,75 5,75"
              fill="none"
              stroke={mainColor}
              strokeWidth="0.3"
              strokeOpacity="0.3"
            />
            <polygon
              points="50,95 5,25 95,25"
              fill="none"
              stroke={mainColor}
              strokeWidth="0.3"
              strokeOpacity="0.3"
            />
          </svg>
        </motion.div>
      </div>

      {/* Main Number Circle */}
      <motion.div
        className={`${sizes.container} relative`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {/* Outer Glow Ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${mainColor}20 0%, transparent 70%)`,
            boxShadow: stage === 'revealed' ? `0 0 60px ${mainColor}40` : 'none'
          }}
          animate={{
            scale: stage === 'counting' ? [1, 1.2, 1] : 1,
            opacity: stage === 'counting' ? [0.5, 1, 0.5] : 1
          }}
          transition={{
            duration: 0.3,
            repeat: stage === 'counting' ? Infinity : 0
          }}
        />

        {/* Inner Circle */}
        <motion.div
          className="absolute inset-2 rounded-full bg-[var(--color-charcoal)] border-2 flex items-center justify-center"
          style={{ borderColor: mainColor }}
          animate={{
            borderWidth: stage === 'revealed' ? 3 : 2
          }}
        >
          {/* Counting / Revealed Number */}
          <AnimatePresence mode="wait">
            <motion.span
              key={displayNumber}
              initial={{ opacity: 0, y: 20, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.5 }}
              transition={{ duration: 0.1 }}
              className={`${sizes.number} font-display font-bold`}
              style={{ color: mainColor }}
            >
              {displayNumber}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Sparkle Effects on Reveal */}
        {stage === 'revealed' && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: mainColor,
                  left: '50%',
                  top: '50%'
                }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i * 45) * Math.PI / 180) * 60,
                  y: Math.sin((i * 45) * Math.PI / 180) * 60
                }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
              />
            ))}
          </>
        )}
      </motion.div>

      {/* Title & Subtitle */}
      <AnimatePresence>
        {stage === 'revealed' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-4"
          >
            {title && (
              <h3 className="font-display text-lg" style={{ color: mainColor }}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-[var(--color-mist)] mt-1">{subtitle}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
