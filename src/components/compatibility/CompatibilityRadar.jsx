import { motion } from 'framer-motion';

/**
 * Radar Chart for Compatibility Visualization
 */
export default function CompatibilityRadar({ breakdown }) {
  if (!breakdown) return null;

  const categories = [
    { key: 'zodiac', label: 'Con Giáp' },
    { key: 'element', label: 'Ngũ Hành' },
    { key: 'lifePath', label: 'Số Chủ Đạo' },
    { key: 'expression', label: 'Biểu Đạt' },
    { key: 'soulUrge', label: 'Linh Hồn' }
  ];

  const size = 250;
  const center = size / 2;
  const radius = 90;
  const levels = 5;

  // Calculate points for each category
  const getPoint = (index, value) => {
    const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  // Generate polygon points for the data
  const dataPoints = categories.map((cat, i) => {
    const score = breakdown[cat.key]?.score || 0;
    return getPoint(i, score);
  });

  const polygonPoints = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

  // Generate level circles
  const levelCircles = Array.from({ length: levels }, (_, i) => {
    const levelRadius = (radius / levels) * (i + 1);
    return levelRadius;
  });

  // Generate axis lines
  const axisLines = categories.map((_, i) => {
    const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle)
    };
  });

  // Label positions
  const labelPositions = categories.map((cat, i) => {
    const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
    const labelRadius = radius + 25;
    return {
      x: center + labelRadius * Math.cos(angle),
      y: center + labelRadius * Math.sin(angle),
      label: cat.label,
      score: breakdown[cat.key]?.score || 0
    };
  });

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circles (levels) */}
        {levelCircles.map((r, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={r}
            fill="none"
            stroke="var(--color-gold)"
            strokeOpacity={0.1}
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {axisLines.map((point, i) => (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={point.x}
            y2={point.y}
            stroke="var(--color-gold)"
            strokeOpacity={0.2}
            strokeWidth="1"
          />
        ))}

        {/* Data polygon - filled area */}
        <motion.polygon
          points={polygonPoints}
          fill="var(--color-gold)"
          fillOpacity={0.2}
          stroke="var(--color-gold)"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ transformOrigin: 'center' }}
        />

        {/* Data points */}
        {dataPoints.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="5"
            fill="var(--color-gold)"
            stroke="var(--color-obsidian)"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 + i * 0.1 }}
          />
        ))}

        {/* Labels */}
        {labelPositions.map((pos, i) => (
          <g key={i}>
            <text
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--color-pearl)"
              fontSize="11"
              fontWeight="500"
            >
              {pos.label}
            </text>
            <text
              x={pos.x}
              y={pos.y + 14}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--color-gold)"
              fontSize="10"
              fontWeight="bold"
            >
              {pos.score}%
            </text>
          </g>
        ))}

        {/* Center point */}
        <circle
          cx={center}
          cy={center}
          r="3"
          fill="var(--color-gold)"
        />
      </svg>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {categories.map((cat, i) => {
          const score = breakdown[cat.key]?.score || 0;
          const color = score >= 75 ? 'jade' : score >= 55 ? 'gold' : 'vermillion';

          return (
            <div key={i} className="flex items-center gap-1.5 text-xs">
              <div
                className={`w-2 h-2 rounded-full bg-[var(--color-${color})]`}
              />
              <span className="text-[var(--color-mist)]">{cat.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
