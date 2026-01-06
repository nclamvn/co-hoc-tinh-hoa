import { motion } from 'framer-motion';

/**
 * Sacred Geometry Animation Component
 * Background decorative element with animated sacred geometry patterns
 */
export default function SacredGeometry({
  type = 'flower-of-life', // flower-of-life, metatron, sri-yantra, vesica-piscis
  size = 300,
  color = 'var(--color-gold)',
  opacity = 0.1,
  animate = true,
  className = ''
}) {
  const patterns = {
    'flower-of-life': <FlowerOfLife size={size} color={color} animate={animate} />,
    'metatron': <MetatronCube size={size} color={color} animate={animate} />,
    'sri-yantra': <SriYantra size={size} color={color} animate={animate} />,
    'vesica-piscis': <VesicaPiscis size={size} color={color} animate={animate} />
  };

  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{ opacity }}
    >
      {patterns[type]}
    </div>
  );
}

// Flower of Life Pattern
function FlowerOfLife({ size, color, animate }) {
  const radius = size / 6;
  const centers = [
    { x: size / 2, y: size / 2 }, // Center
    // First ring
    { x: size / 2, y: size / 2 - radius },
    { x: size / 2 + radius * 0.866, y: size / 2 - radius / 2 },
    { x: size / 2 + radius * 0.866, y: size / 2 + radius / 2 },
    { x: size / 2, y: size / 2 + radius },
    { x: size / 2 - radius * 0.866, y: size / 2 + radius / 2 },
    { x: size / 2 - radius * 0.866, y: size / 2 - radius / 2 },
  ];

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      initial={{ rotate: 0 }}
      animate={animate ? { rotate: 360 } : {}}
      transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
    >
      {/* Outer Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 5}
        fill="none"
        stroke={color}
        strokeWidth="0.5"
      />

      {/* Flower Petals */}
      {centers.map((center, idx) => (
        <motion.circle
          key={idx}
          cx={center.x}
          cy={center.y}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1, duration: 0.5 }}
        />
      ))}

      {/* Second Ring */}
      {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
        const x = size / 2 + radius * 2 * Math.cos((angle - 90) * Math.PI / 180);
        const y = size / 2 + radius * 2 * Math.sin((angle - 90) * Math.PI / 180);
        return (
          <motion.circle
            key={`ring2-${idx}`}
            cx={x}
            cy={y}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.7 + idx * 0.1 }}
          />
        );
      })}
    </motion.svg>
  );
}

// Metatron's Cube Pattern
function MetatronCube({ size, color, animate }) {
  const center = size / 2;
  const radius = size / 4;

  // 13 circles positions (Fruit of Life)
  const circles = [
    { x: center, y: center }, // Center
    // Inner ring
    ...Array.from({ length: 6 }, (_, i) => ({
      x: center + radius * Math.cos((i * 60 - 90) * Math.PI / 180),
      y: center + radius * Math.sin((i * 60 - 90) * Math.PI / 180)
    })),
    // Outer ring
    ...Array.from({ length: 6 }, (_, i) => ({
      x: center + radius * 2 * Math.cos((i * 60 - 90) * Math.PI / 180),
      y: center + radius * 2 * Math.sin((i * 60 - 90) * Math.PI / 180)
    }))
  ];

  // Lines connecting all circles
  const lines = [];
  for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {
      lines.push({ from: circles[i], to: circles[j] });
    }
  }

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      initial={{ rotate: 0, scale: 0.9 }}
      animate={animate ? { rotate: 360, scale: 1 } : { scale: 1 }}
      transition={{ rotate: { duration: 120, repeat: Infinity, ease: 'linear' }, scale: { duration: 2 } }}
    >
      {/* Connection Lines */}
      {lines.map((line, idx) => (
        <motion.line
          key={idx}
          x1={line.from.x}
          y1={line.from.y}
          x2={line.to.x}
          y2={line.to.y}
          stroke={color}
          strokeWidth="0.3"
          strokeOpacity="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: idx * 0.01, duration: 0.5 }}
        />
      ))}

      {/* Circles */}
      {circles.map((c, idx) => (
        <motion.circle
          key={idx}
          cx={c.x}
          cy={c.y}
          r={radius / 3}
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 + idx * 0.05 }}
        />
      ))}
    </motion.svg>
  );
}

// Sri Yantra Pattern
function SriYantra({ size, color, animate }) {
  const center = size / 2;
  const scale = size / 100;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Outer Circles */}
      <circle cx={center} cy={center} r={45 * scale} fill="none" stroke={color} strokeWidth="0.5" />
      <circle cx={center} cy={center} r={42 * scale} fill="none" stroke={color} strokeWidth="0.5" />

      {/* Lotus Petals (simplified) */}
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i * 22.5) * Math.PI / 180;
        const x1 = center + 35 * scale * Math.cos(angle);
        const y1 = center + 35 * scale * Math.sin(angle);
        const x2 = center + 40 * scale * Math.cos(angle);
        const y2 = center + 40 * scale * Math.sin(angle);
        return (
          <motion.line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={color}
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
          />
        );
      })}

      {/* Upward Triangles */}
      {[30, 25, 20, 15].map((r, idx) => (
        <motion.polygon
          key={`up-${idx}`}
          points={`
            ${center},${center - r * scale}
            ${center - r * scale * 0.866},${center + r * scale * 0.5}
            ${center + r * scale * 0.866},${center + r * scale * 0.5}
          `}
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          initial={{ scale: 0 }}
          animate={animate ? { scale: 1, rotate: [0, 1, 0] } : { scale: 1 }}
          transition={{
            scale: { delay: idx * 0.2, duration: 0.5 },
            rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
          }}
          style={{ transformOrigin: 'center' }}
        />
      ))}

      {/* Downward Triangles */}
      {[28, 23, 18, 13].map((r, idx) => (
        <motion.polygon
          key={`down-${idx}`}
          points={`
            ${center},${center + r * scale}
            ${center - r * scale * 0.866},${center - r * scale * 0.5}
            ${center + r * scale * 0.866},${center - r * scale * 0.5}
          `}
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          initial={{ scale: 0 }}
          animate={animate ? { scale: 1, rotate: [0, -1, 0] } : { scale: 1 }}
          transition={{
            scale: { delay: 0.8 + idx * 0.2, duration: 0.5 },
            rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
          }}
          style={{ transformOrigin: 'center' }}
        />
      ))}

      {/* Central Bindu */}
      <motion.circle
        cx={center}
        cy={center}
        r={2 * scale}
        fill={color}
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.svg>
  );
}

// Vesica Piscis Pattern
function VesicaPiscis({ size, color, animate }) {
  const center = size / 2;
  const radius = size / 3;
  const offset = radius / 2;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Left Circle */}
      <motion.circle
        cx={center - offset}
        cy={center}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        initial={{ scale: 0 }}
        animate={animate ? { scale: 1, x: [-2, 2, -2] } : { scale: 1 }}
        transition={{
          scale: { duration: 0.5 },
          x: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }}
      />

      {/* Right Circle */}
      <motion.circle
        cx={center + offset}
        cy={center}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        initial={{ scale: 0 }}
        animate={animate ? { scale: 1, x: [2, -2, 2] } : { scale: 1 }}
        transition={{
          scale: { duration: 0.5, delay: 0.2 },
          x: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }}
      />

      {/* Vesica Piscis Shape (intersection highlight) */}
      <motion.ellipse
        cx={center}
        cy={center}
        rx={radius * 0.3}
        ry={radius * 0.866}
        fill="none"
        stroke={color}
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Central Vertical Line */}
      <line
        x1={center}
        y1={center - radius * 0.866}
        x2={center}
        y2={center + radius * 0.866}
        stroke={color}
        strokeWidth="0.3"
        strokeDasharray="4 2"
      />
    </motion.svg>
  );
}
