/**
 * LUXURY ANIMATIONS - Premium Animation Components
 * Cinematic reveals, particle effects, magnetic hover, and more
 */

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';

// ==============================================
// CINEMATIC REVEAL - Màn hình rạp phim mở ra
// ==============================================

export const CinematicReveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)'
    }}
    animate={{
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)'
    }}
    transition={{
      duration: 1.2,
      delay,
      ease: [0.25, 0.1, 0.25, 1]
    }}
  >
    {children}
  </motion.div>
);

// ==============================================
// GOLD SHIMMER TEXT - Chữ với ánh vàng chạy qua
// ==============================================

export const GoldShimmerText = ({ children, className = '' }) => (
  <motion.span
    className={`relative inline-block ${className}`}
    style={{
      background: 'linear-gradient(90deg, #c49a3d 0%, #f2d479 50%, #c49a3d 100%)',
      backgroundSize: '200% 100%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }}
    animate={{
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    }}
    transition={{
      duration: 4,
      ease: 'linear',
      repeat: Infinity,
    }}
  >
    {children}
  </motion.span>
);

// ==============================================
// FLOATING PARTICLES - Hạt bụi vàng bay lơ lửng
// ==============================================

export const FloatingParticles = ({ count = 20 }) => {
  const [particles] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: 'radial-gradient(circle, rgba(196,154,61,0.8) 0%, transparent 70%)',
            boxShadow: '0 0 10px rgba(196,154,61,0.5)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// ==============================================
// PULSE GLOW - Hiệu ứng nhịp thở ánh sáng
// ==============================================

export const PulseGlow = ({ children, color = 'gold', intensity = 0.4 }) => {
  const colors = {
    gold: `rgba(196, 154, 61, ${intensity})`,
    vermillion: `rgba(196, 92, 92, ${intensity})`,
    jade: `rgba(74, 124, 101, ${intensity})`,
  };

  return (
    <motion.div
      className="relative"
      animate={{
        boxShadow: [
          `0 0 20px ${colors[color]}`,
          `0 0 40px ${colors[color]}`,
          `0 0 20px ${colors[color]}`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

// ==============================================
// STAGGER REVEAL - Elements xuất hiện tuần tự
// ==============================================

export const StaggerContainer = ({ children, staggerDelay = 0.1, className = '' }) => (
  <motion.div
    className={className}
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: 0.3,
        },
      },
    }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className = '' }) => (
  <motion.div
    className={className}
    variants={{
      hidden: {
        opacity: 0,
        y: 30,
        filter: 'blur(5px)'
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    }}
  >
    {children}
  </motion.div>
);

// ==============================================
// NUMBER COUNTER - Đếm số với hiệu ứng slot machine
// ==============================================

export const NumberCounter = ({
  value,
  duration = 0.5,
  className = ''
}) => {
  const digits = value.toString().split('');

  return (
    <span className={`inline-flex ${className}`}>
      {digits.map((digit, index) => (
        <motion.span
          key={`${index}-${digit}`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: index * 0.08,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="inline-block"
        >
          {digit}
        </motion.span>
      ))}
    </span>
  );
};

// ==============================================
// MAGNETIC HOVER - Element bị hút theo con trỏ
// ==============================================

export const MagneticHover = ({ children, strength = 0.3 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  }, [x, y, strength]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
    >
      {children}
    </motion.div>
  );
};

// ==============================================
// REVEAL ON SCROLL - Xuất hiện khi scroll tới
// ==============================================

export const RevealOnScroll = ({
  children,
  direction = 'up',
  delay = 0,
  className = ''
}) => {
  const directions = {
    up: { y: 60 },
    down: { y: -60 },
    left: { x: 60 },
    right: { x: -60 },
  };

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...directions[direction],
        filter: 'blur(5px)'
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)'
      }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

// ==============================================
// GLOWING ORB - Quả cầu phát sáng animated
// ==============================================

export const GlowingOrb = ({
  size = 200,
  color = 'gold',
  className = '',
  style = {}
}) => {
  const colors = {
    gold: ['rgba(196, 154, 61, 0.3)', 'rgba(242, 212, 121, 0.1)'],
    vermillion: ['rgba(196, 92, 92, 0.3)', 'rgba(196, 92, 92, 0.1)'],
    jade: ['rgba(74, 124, 101, 0.3)', 'rgba(74, 124, 101, 0.1)'],
  };

  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colors[color][0]} 0%, ${colors[color][1]} 50%, transparent 70%)`,
        filter: 'blur(40px)',
        ...style,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

// ==============================================
// TEXT REVEAL - Chữ hiện dần từng ký tự
// ==============================================

export const TextReveal = ({ text, className = '', delay = 0 }) => {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: delay + (wordIndex * 0.1) + (charIndex * 0.03),
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
          <span>&nbsp;</span>
        </span>
      ))}
    </span>
  );
};

// ==============================================
// HOVER SCALE - Scale khi hover với spring
// ==============================================

export const HoverScale = ({
  children,
  scale = 1.05,
  className = ''
}) => (
  <motion.div
    className={className}
    whileHover={{
      scale,
      transition: { type: 'spring', stiffness: 400, damping: 17 }
    }}
    whileTap={{ scale: 0.98 }}
  >
    {children}
  </motion.div>
);

// ==============================================
// TILT CARD - Card nghiêng theo con trỏ
// ==============================================

export const TiltCard = ({
  children,
  className = '',
  maxTilt = 10,
  glareOpacity = 0.1
}) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);

    rotateX.set(-percentY * maxTilt);
    rotateY.set(percentX * maxTilt);
    glareX.set(50 + percentX * 30);
    glareY.set(50 + percentY * 30);
  }, [rotateX, rotateY, glareX, glareY, maxTilt]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  }, [rotateX, rotateY]);

  const springConfig = { damping: 20, stiffness: 300 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {/* Glare effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-inherit"
          style={{
            background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,${glareOpacity}) 0%, transparent 50%)`,
          }}
        />
      )}
    </motion.div>
  );
};

// ==============================================
// PARALLAX SCROLL - Element di chuyển theo scroll
// ==============================================

export const ParallaxScroll = ({
  children,
  speed = 0.5,
  className = ''
}) => {
  const ref = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      setOffsetY(scrolled * speed * 0.1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: offsetY }}>
        {children}
      </motion.div>
    </div>
  );
};

// ==============================================
// MORPH SHAPE - Hình dạng biến đổi
// ==============================================

export const MorphShape = ({
  size = 100,
  color = 'gold',
  className = ''
}) => {
  const colors = {
    gold: 'rgba(196, 154, 61, 0.3)',
    vermillion: 'rgba(196, 92, 92, 0.3)',
    jade: 'rgba(74, 124, 101, 0.3)',
  };

  const paths = [
    'M50,0 C77.6,0 100,22.4 100,50 C100,77.6 77.6,100 50,100 C22.4,100 0,77.6 0,50 C0,22.4 22.4,0 50,0',
    'M50,5 C72,5 95,25 95,50 C95,75 72,95 50,95 C28,95 5,75 5,50 C5,25 28,5 50,5',
    'M50,10 C68,10 90,30 90,50 C90,70 68,90 50,90 C32,90 10,70 10,50 C10,30 32,10 50,10',
  ];

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`${className}`}
    >
      <motion.path
        fill={colors[color]}
        animate={{
          d: paths,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.svg>
  );
};

// ==============================================
// EXPORT ALL
// ==============================================

export default {
  CinematicReveal,
  GoldShimmerText,
  FloatingParticles,
  PulseGlow,
  StaggerContainer,
  StaggerItem,
  NumberCounter,
  MagneticHover,
  RevealOnScroll,
  GlowingOrb,
  TextReveal,
  HoverScale,
  TiltCard,
  ParallaxScroll,
  MorphShape,
};
