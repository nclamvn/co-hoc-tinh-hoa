/**
 * PAGE TRANSITIONS - Cinematic Page Transitions
 * Smooth, luxurious transitions between pages
 */

import { motion, AnimatePresence } from 'framer-motion';

// ==============================================
// CIRCLE REVEAL - Circle expanding transition
// ==============================================

export const CircleRevealTransition = ({ children, pageKey }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: {
            opacity: 0,
            clipPath: 'circle(0% at 50% 50%)',
          },
          animate: {
            opacity: 1,
            clipPath: 'circle(150% at 50% 50%)',
            transition: {
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
              clipPath: { duration: 1.2, ease: [0.4, 0, 0.2, 1] },
            },
          },
          exit: {
            opacity: 0,
            clipPath: 'circle(0% at 50% 50%)',
            transition: {
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
            },
          },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// ==============================================
// FADE SLIDE - Fade với slide nhẹ
// ==============================================

export const FadeSlideTransition = ({ children, pageKey }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        animate={{
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          },
        }}
        exit={{
          opacity: 0,
          y: -20,
          filter: 'blur(10px)',
          transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
          },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// ==============================================
// CURTAIN REVEAL - Màn kéo như sân khấu
// ==============================================

export const CurtainReveal = ({ children, isVisible = true }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Left curtain */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 z-10"
        style={{
          background: 'linear-gradient(to right, #0a0908, #1a1614)',
        }}
        initial={{ x: 0 }}
        animate={{ x: isVisible ? '-100%' : 0 }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
      />

      {/* Right curtain */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 z-10"
        style={{
          background: 'linear-gradient(to left, #0a0908, #1a1614)',
        }}
        initial={{ x: 0 }}
        animate={{ x: isVisible ? '100%' : 0 }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.95,
        }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// ==============================================
// SCALE FADE - Scale với fade
// ==============================================

export const ScaleFadeTransition = ({ children, pageKey }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{
          opacity: 0,
          scale: 0.95,
          filter: 'blur(5px)',
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          },
        }}
        exit={{
          opacity: 0,
          scale: 1.02,
          filter: 'blur(5px)',
          transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
          },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// ==============================================
// WIPE TRANSITION - Wipe từ trái sang phải
// ==============================================

export const WipeTransition = ({ children, pageKey, direction = 'right' }) => {
  const directions = {
    right: {
      initial: { clipPath: 'inset(0 100% 0 0)' },
      animate: { clipPath: 'inset(0 0% 0 0)' },
      exit: { clipPath: 'inset(0 0 0 100%)' },
    },
    left: {
      initial: { clipPath: 'inset(0 0 0 100%)' },
      animate: { clipPath: 'inset(0 0 0 0%)' },
      exit: { clipPath: 'inset(0 100% 0 0)' },
    },
    up: {
      initial: { clipPath: 'inset(100% 0 0 0)' },
      animate: { clipPath: 'inset(0% 0 0 0)' },
      exit: { clipPath: 'inset(0 0 100% 0)' },
    },
    down: {
      initial: { clipPath: 'inset(0 0 100% 0)' },
      animate: { clipPath: 'inset(0 0 0% 0)' },
      exit: { clipPath: 'inset(100% 0 0 0)' },
    },
  };

  const d = directions[direction] || directions.right;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ ...d.initial, opacity: 0 }}
        animate={{
          ...d.animate,
          opacity: 1,
          transition: {
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
          },
        }}
        exit={{
          ...d.exit,
          opacity: 0,
          transition: {
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
          },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// ==============================================
// OVERLAY TRANSITION - Với overlay layer
// ==============================================

export const OverlayTransition = ({ children, pageKey }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pageKey} className="relative">
        {/* Overlay */}
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #0a0908 0%, #1a1614 100%)',
          }}
          initial={{ scaleY: 0, transformOrigin: 'bottom' }}
          animate={{
            scaleY: [0, 1, 1, 0],
            transformOrigin: ['bottom', 'bottom', 'top', 'top'],
          }}
          transition={{
            duration: 1.4,
            times: [0, 0.4, 0.6, 1],
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Gold line accent */}
        <motion.div
          className="fixed left-0 right-0 h-px z-50 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, #c49a3d, transparent)',
            top: '50%',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.4,
            times: [0, 0.5, 1],
            ease: 'easeInOut',
          }}
        />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.6, duration: 0.4 },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.3 },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ==============================================
// DEFAULT PAGE TRANSITION - Mặc định cho App
// ==============================================

export const PageTransition = ({ children, pageKey }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
          },
        }}
        exit={{
          opacity: 0,
          y: -20,
          transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
          },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// ==============================================
// EXPORT
// ==============================================

export default PageTransition;
