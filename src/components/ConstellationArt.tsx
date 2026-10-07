import React from 'react';

interface ConstellationArtProps {
  motif: string;
  cardId?: number;
  glowColor?: string;
  primaryColor?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

interface StarNode {
  x: number;
  y: number;
  r: number;
  isAlpha?: boolean;
}

interface ConstellationConfig {
  stars: StarNode[];
  lines: [number, number][]; // pairs of star indexes
  shapeType?: 'tower' | 'compass' | 'crown' | 'wave' | 'dipper' | 'cross' | 'arrow' | 'diamond' | 'shield';
}

/**
 * Predefined celestial constellation maps for each illustration motif.
 * Each pattern maps out connected star nodes, celestial lines, and radiant alpha stars.
 */
const CONSTELLATION_MAPS: Record<string, ConstellationConfig> = {
  // 1. BEACON / LANTERN (Ngọn Hải Đăng / Ngọn Đèn): Pyramid tower constellation with radiant apex star
  beacon: {
    stars: [
      { x: 50, y: 16, r: 4.5, isAlpha: true }, // Apex beacon star
      { x: 34, y: 44, r: 3 },
      { x: 66, y: 44, r: 3 },
      { x: 26, y: 74, r: 3.2 },
      { x: 74, y: 74, r: 3.2 },
      { x: 50, y: 56, r: 2.5 },
      { x: 50, y: 84, r: 2.8 },
    ],
    lines: [
      [0, 1], [0, 2], [1, 2],
      [1, 3], [2, 4], [3, 4],
      [0, 5], [5, 6], [3, 6], [4, 6]
    ],
    shapeType: 'tower',
  },
  lantern: {
    stars: [
      { x: 50, y: 18, r: 4.2, isAlpha: true },
      { x: 36, y: 38, r: 3 },
      { x: 64, y: 38, r: 3 },
      { x: 30, y: 68, r: 3 },
      { x: 70, y: 68, r: 3 },
      { x: 50, y: 82, r: 3.5, isAlpha: true },
    ],
    lines: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5], [1, 2], [3, 4]],
    shapeType: 'tower',
  },

  // 2. COMET / METEOR (Sao Băng / Thiên Thạch): Dynamic streak constellation
  comet: {
    stars: [
      { x: 80, y: 22, r: 4.8, isAlpha: true }, // Head comet star
      { x: 64, y: 36, r: 3.2 },
      { x: 48, y: 50, r: 3 },
      { x: 32, y: 64, r: 2.8 },
      { x: 18, y: 78, r: 2.4 },
      { x: 58, y: 28, r: 2.2 },
      { x: 74, y: 46, r: 2.2 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 2], [0, 6], [6, 2]],
    shapeType: 'arrow',
  },
  meteor: {
    stars: [
      { x: 78, y: 24, r: 4.6, isAlpha: true },
      { x: 60, y: 40, r: 3 },
      { x: 42, y: 56, r: 2.8 },
      { x: 22, y: 76, r: 2.5 },
      { x: 68, y: 30, r: 2 },
      { x: 52, y: 48, r: 2 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [0, 4], [4, 1], [1, 5], [5, 2]],
    shapeType: 'arrow',
  },

  // 3. POLARIS / SOLARIS / STAR (Sao Bắc Đẩu / Mặt Trời): Brilliant 8-ray celestial compass
  polaris: {
    stars: [
      { x: 50, y: 50, r: 5, isAlpha: true }, // Great Polaris Star
      { x: 50, y: 16, r: 3.2 }, // North
      { x: 50, y: 84, r: 3.2 }, // South
      { x: 16, y: 50, r: 3.2 }, // West
      { x: 84, y: 50, r: 3.2 }, // East
      { x: 26, y: 26, r: 2.4 },
      { x: 74, y: 26, r: 2.4 },
      { x: 26, y: 74, r: 2.4 },
      { x: 74, y: 74, r: 2.4 },
    ],
    lines: [
      [0, 1], [0, 2], [0, 3], [0, 4],
      [1, 5], [5, 3], [1, 6], [6, 4],
      [3, 7], [7, 2], [4, 8], [8, 2]
    ],
    shapeType: 'compass',
  },
  solaris: {
    stars: [
      { x: 50, y: 50, r: 5.2, isAlpha: true },
      { x: 50, y: 18, r: 3 },
      { x: 50, y: 82, r: 3 },
      { x: 18, y: 50, r: 3 },
      { x: 82, y: 50, r: 3 },
      { x: 28, y: 28, r: 2.6 },
      { x: 72, y: 28, r: 2.6 },
      { x: 28, y: 72, r: 2.6 },
      { x: 72, y: 72, r: 2.6 },
    ],
    lines: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8]],
    shapeType: 'compass',
  },

  // 4. NEBULA / PRISM / STARDUST (Cái Nôi Tinh Vân / Lăng Kính): Pleiades diamond cluster
  nebula: {
    stars: [
      { x: 50, y: 24, r: 4, isAlpha: true },
      { x: 26, y: 46, r: 3.4 },
      { x: 74, y: 46, r: 3.4 },
      { x: 50, y: 64, r: 4.2, isAlpha: true },
      { x: 32, y: 80, r: 2.6 },
      { x: 68, y: 80, r: 2.6 },
      { x: 50, y: 44, r: 2.5 },
    ],
    lines: [[0, 1], [0, 2], [1, 3], [2, 3], [1, 6], [2, 6], [3, 4], [3, 5], [4, 5]],
    shapeType: 'diamond',
  },
  prism: {
    stars: [
      { x: 50, y: 18, r: 4.5, isAlpha: true },
      { x: 22, y: 72, r: 3.5 },
      { x: 78, y: 72, r: 3.5 },
      { x: 50, y: 52, r: 3 },
      { x: 36, y: 46, r: 2.5 },
      { x: 64, y: 46, r: 2.5 },
    ],
    lines: [[0, 1], [0, 2], [1, 2], [0, 3], [1, 3], [2, 3], [4, 5]],
    shapeType: 'diamond',
  },
  stardust: {
    stars: [
      { x: 48, y: 24, r: 4, isAlpha: true },
      { x: 28, y: 40, r: 3 },
      { x: 72, y: 36, r: 3.2 },
      { x: 42, y: 60, r: 4.5, isAlpha: true },
      { x: 66, y: 68, r: 3 },
      { x: 22, y: 76, r: 2.5 },
      { x: 50, y: 82, r: 2.5 },
    ],
    lines: [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [1, 5], [3, 6], [4, 6]],
    shapeType: 'diamond',
  },

  // 5. AURORA / WAVES / HARMONY (Cực Quang / Dải Ngân Hà): Flowing wave constellation
  aurora: {
    stars: [
      { x: 18, y: 60, r: 3 },
      { x: 34, y: 36, r: 3.8, isAlpha: true },
      { x: 52, y: 58, r: 3.2 },
      { x: 68, y: 34, r: 4.2, isAlpha: true },
      { x: 82, y: 56, r: 3 },
      { x: 38, y: 76, r: 2.4 },
      { x: 62, y: 76, r: 2.4 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 2], [2, 6], [6, 4]],
    shapeType: 'wave',
  },
  waves: {
    stars: [
      { x: 20, y: 52, r: 3 },
      { x: 36, y: 34, r: 3.8 },
      { x: 52, y: 56, r: 4.4, isAlpha: true },
      { x: 68, y: 38, r: 3.5 },
      { x: 82, y: 54, r: 3 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
    shapeType: 'wave',
  },
  harmony: {
    stars: [
      { x: 50, y: 20, r: 4.2, isAlpha: true },
      { x: 26, y: 40, r: 3 },
      { x: 74, y: 40, r: 3 },
      { x: 34, y: 74, r: 3.2 },
      { x: 66, y: 74, r: 3.2 },
      { x: 50, y: 50, r: 3.8, isAlpha: true },
    ],
    lines: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [0, 5], [1, 5], [2, 5], [3, 5], [4, 5]],
    shapeType: 'compass',
  },

  // 6. COMPASS / WAYFINDER (La Bàn / Kẻ Dẫn Lối): Astronomical nav star
  compass: {
    stars: [
      { x: 50, y: 16, r: 4.6, isAlpha: true }, // Apex North
      { x: 50, y: 84, r: 3.4 },
      { x: 16, y: 50, r: 3.4 },
      { x: 84, y: 50, r: 3.4 },
      { x: 50, y: 50, r: 4.2, isAlpha: true },
      { x: 30, y: 30, r: 2.2 },
      { x: 70, y: 70, r: 2.2 },
    ],
    lines: [[0, 2], [0, 3], [1, 2], [1, 3], [0, 4], [1, 4], [2, 4], [3, 4], [5, 4], [6, 4]],
    shapeType: 'compass',
  },
  wayfinder: {
    stars: [
      { x: 50, y: 18, r: 4.8, isAlpha: true },
      { x: 24, y: 66, r: 3.5 },
      { x: 76, y: 66, r: 3.5 },
      { x: 50, y: 54, r: 3.6 },
      { x: 50, y: 82, r: 2.8 },
    ],
    lines: [[0, 1], [0, 2], [1, 3], [2, 3], [0, 3], [3, 4]],
    shapeType: 'arrow',
  },

  // 7. CROWN / SUMMIT (Vương Miện / Đỉnh Núi): Corona Borealis / Cassiopeia
  crown: {
    stars: [
      { x: 18, y: 38, r: 3.4 },
      { x: 34, y: 56, r: 3.2 },
      { x: 50, y: 22, r: 4.8, isAlpha: true }, // Center Crown Gem
      { x: 66, y: 56, r: 3.2 },
      { x: 82, y: 38, r: 3.4 },
      { x: 30, y: 76, r: 2.8 },
      { x: 70, y: 76, r: 2.8 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [1, 5], [3, 6], [5, 6]],
    shapeType: 'crown',
  },
  summit: {
    stars: [
      { x: 50, y: 20, r: 4.8, isAlpha: true }, // Peak
      { x: 26, y: 60, r: 3.2 },
      { x: 74, y: 60, r: 3.2 },
      { x: 14, y: 82, r: 2.8 },
      { x: 86, y: 82, r: 2.8 },
      { x: 50, y: 58, r: 3 },
    ],
    lines: [[0, 1], [0, 2], [1, 3], [2, 4], [1, 5], [2, 5], [3, 5], [4, 5]],
    shapeType: 'crown',
  },

  // 8. GUARDIAN / SHIELD / ANCHOR (Người Bảo Hộ / Khiên Ánh Sáng / Mỏ Neo)
  guardian: {
    stars: [
      { x: 50, y: 18, r: 4, isAlpha: true },
      { x: 24, y: 28, r: 3 },
      { x: 76, y: 28, r: 3 },
      { x: 20, y: 56, r: 3.2 },
      { x: 80, y: 56, r: 3.2 },
      { x: 50, y: 84, r: 4.4, isAlpha: true },
      { x: 50, y: 48, r: 3 },
    ],
    lines: [[1, 0], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5], [0, 6], [6, 5], [3, 6], [4, 6]],
    shapeType: 'shield',
  },
  shield: {
    stars: [
      { x: 30, y: 24, r: 3 },
      { x: 70, y: 24, r: 3 },
      { x: 22, y: 54, r: 3.2 },
      { x: 78, y: 54, r: 3.2 },
      { x: 50, y: 82, r: 4.4, isAlpha: true },
      { x: 50, y: 36, r: 3.5, isAlpha: true },
    ],
    lines: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [0, 5], [1, 5], [2, 5], [3, 5], [4, 5]],
    shapeType: 'shield',
  },
  anchor: {
    stars: [
      { x: 50, y: 16, r: 4, isAlpha: true }, // Ring
      { x: 50, y: 40, r: 3 },
      { x: 28, y: 40, r: 2.8 },
      { x: 72, y: 40, r: 2.8 },
      { x: 50, y: 78, r: 3.5 },
      { x: 20, y: 64, r: 3.2 },
      { x: 80, y: 64, r: 3.2 },
    ],
    lines: [[0, 1], [2, 3], [1, 4], [4, 5], [4, 6], [5, 2], [6, 3]],
    shapeType: 'shield',
  },

  // 9. VOYAGER / PIONEER (Kẻ Du Hành / Tiên Phong): Great Ship / Argo constellation
  voyager: {
    stars: [
      { x: 50, y: 18, r: 4.6, isAlpha: true }, // Mast star
      { x: 50, y: 46, r: 3 },
      { x: 24, y: 56, r: 3.2 },
      { x: 76, y: 56, r: 3.2 },
      { x: 32, y: 80, r: 3.5 },
      { x: 68, y: 80, r: 3.5 },
      { x: 18, y: 42, r: 2.4 },
    ],
    lines: [[0, 1], [1, 2], [1, 3], [2, 4], [3, 5], [4, 5], [2, 3], [0, 6], [6, 2]],
    shapeType: 'arrow',
  },
  pioneer: {
    stars: [
      { x: 68, y: 18, r: 4.8, isAlpha: true }, // Leading star
      { x: 48, y: 34, r: 3.2 },
      { x: 30, y: 52, r: 3 },
      { x: 18, y: 74, r: 2.8 },
      { x: 60, y: 48, r: 2.6 },
      { x: 78, y: 42, r: 3.2 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [0, 5], [5, 4], [4, 2], [1, 4]],
    shapeType: 'arrow',
  },

  // 10. CHRONICLER / QUILL (Người Chép Sử / Chiếc Lông Vũ): Cygnus / Flying Swan
  chronicler: {
    stars: [
      { x: 50, y: 18, r: 4.5, isAlpha: true }, // Quill tip
      { x: 50, y: 42, r: 3.2 },
      { x: 22, y: 42, r: 3 },
      { x: 78, y: 42, r: 3 },
      { x: 50, y: 66, r: 3 },
      { x: 50, y: 84, r: 3.4 },
    ],
    lines: [[0, 1], [2, 1], [1, 3], [1, 4], [4, 5]],
    shapeType: 'cross',
  },
  quill: {
    stars: [
      { x: 76, y: 18, r: 4.8, isAlpha: true },
      { x: 60, y: 34, r: 3.2 },
      { x: 44, y: 52, r: 3.2 },
      { x: 28, y: 70, r: 3 },
      { x: 16, y: 84, r: 2.6 },
      { x: 52, y: 30, r: 2.2 },
      { x: 68, y: 46, r: 2.2 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 2], [1, 6], [6, 3]],
    shapeType: 'arrow',
  },

  // 11. WEAVER / BRIDGER (Kẻ Dệt Sao / Cầu Nối): Dual connected constellations
  weaver: {
    stars: [
      { x: 24, y: 26, r: 3.8, isAlpha: true },
      { x: 76, y: 26, r: 3.8, isAlpha: true },
      { x: 50, y: 50, r: 4.2, isAlpha: true }, // Nexus star
      { x: 24, y: 74, r: 3.2 },
      { x: 76, y: 74, r: 3.2 },
    ],
    lines: [[0, 2], [1, 2], [2, 3], [2, 4], [0, 3], [1, 4], [0, 1], [3, 4]],
    shapeType: 'diamond',
  },
  bridger: {
    stars: [
      { x: 18, y: 40, r: 3.5, isAlpha: true },
      { x: 38, y: 50, r: 3 },
      { x: 62, y: 50, r: 3 },
      { x: 82, y: 40, r: 3.5, isAlpha: true },
      { x: 50, y: 26, r: 4, isAlpha: true },
      { x: 50, y: 74, r: 3 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [0, 4], [4, 3], [1, 5], [2, 5]],
    shapeType: 'wave',
  },
};

/**
 * Fallback procedural constellation generator based on card ID
 * Guarantees a harmonious, unique 6-node celestial diagram for any card
 */
function getProceduralConstellation(id: number): ConstellationConfig {
  const seed = (id * 9301 + 49297) % 233280;
  const rand = (i: number) => {
    const v = Math.sin(seed + i * 17.3) * 10000;
    return v - Math.floor(v);
  };

  const stars: StarNode[] = [
    { x: 50, y: 20 + rand(1) * 15, r: 4.5, isAlpha: true },
    { x: 22 + rand(2) * 16, y: 38 + rand(3) * 16, r: 3.2 },
    { x: 62 + rand(4) * 16, y: 38 + rand(5) * 16, r: 3.2 },
    { x: 36 + rand(6) * 28, y: 52 + rand(7) * 14, r: 3.8, isAlpha: true },
    { x: 20 + rand(8) * 18, y: 68 + rand(9) * 18, r: 2.8 },
    { x: 62 + rand(10) * 18, y: 68 + rand(11) * 18, r: 2.8 },
  ];

  const lines: [number, number][] = [
    [0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 5]
  ];

  return { stars, lines };
}

export const ConstellationArt: React.FC<ConstellationArtProps> = ({
  motif,
  cardId = 1,
  glowColor = '#00f0ff',
  primaryColor = '#ffd84d',
  size = 'md',
  className = '',
}) => {
  const config = CONSTELLATION_MAPS[motif] || getProceduralConstellation(cardId);

  const dimensions = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-32 h-32 sm:w-36 sm:h-36',
  }[size];

  return (
    <div className={`relative flex items-center justify-center select-none ${dimensions} ${className}`}>
      {/* Background Celestial Astrolabe Coordinates */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Glowing Filter for Constellation Lines & Stars */}
          <filter id={`starGlow-${motif}-${cardId}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <radialGradient id={`starCoreGrad-${motif}-${cardId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#fffdf0" />
            <stop offset="85%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={glowColor} />
          </radialGradient>
        </defs>

        {/* 1. Celestial Coordinate Rings & Degree Ticks */}
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.8"
          strokeDasharray="2 3"
        />
        <circle
          cx="50"
          cy="50"
          r="34"
          stroke="rgba(0,240,255,0.12)"
          strokeWidth="0.6"
        />
        <circle
          cx="50"
          cy="50"
          r="20"
          stroke="rgba(255,133,179,0.1)"
          strokeWidth="0.6"
          strokeDasharray="3 4"
        />

        {/* 4 Cardinal Crosshair Axes */}
        <line x1="50" y1="2" x2="50" y2="8" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
        <line x1="50" y1="92" x2="50" y2="98" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
        <line x1="2" y1="50" x2="8" y2="50" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
        <line x1="92" y1="50" x2="98" y2="50" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />

        {/* Ambient Tiny Background Stardust Dots */}
        <circle cx="15" cy="25" r="0.8" fill="rgba(255,255,255,0.4)" />
        <circle cx="85" cy="78" r="0.7" fill="rgba(255,255,255,0.3)" />
        <circle cx="28" cy="88" r="0.8" fill="rgba(0,240,255,0.4)" />
        <circle cx="78" cy="18" r="0.7" fill="rgba(255,216,77,0.4)" />
        <circle cx="88" cy="42" r="0.6" fill="rgba(255,255,255,0.3)" />

        {/* 2. Luminous Constellation Connecting Lines */}
        <g filter={`url(#starGlow-${motif}-${cardId})`}>
          {config.lines.map(([i1, i2], idx) => {
            const s1 = config.stars[i1];
            const s2 = config.stars[i2];
            if (!s1 || !s2) return null;
            return (
              <line
                key={`line-${idx}`}
                x1={s1.x}
                y1={s1.y}
                x2={s2.x}
                y2={s2.y}
                stroke={glowColor}
                strokeWidth="1.2"
                strokeOpacity="0.75"
                strokeLinecap="round"
              />
            );
          })}
        </g>

        {/* Secondary Crisp White Line Overlay */}
        {config.lines.map(([i1, i2], idx) => {
          const s1 = config.stars[i1];
          const s2 = config.stars[i2];
          if (!s1 || !s2) return null;
          return (
            <line
              key={`line-core-${idx}`}
              x1={s1.x}
              y1={s1.y}
              x2={s2.x}
              y2={s2.y}
              stroke="#ffffff"
              strokeWidth="0.7"
              strokeOpacity="0.9"
            />
          );
        })}

        {/* 3. Star Nodes */}
        {config.stars.map((star, idx) => {
          if (star.isAlpha) {
            // Radiant 4-pointed Alpha Star
            return (
              <g key={`alpha-${idx}`}>
                {/* Outer Glow Halo */}
                <circle
                  cx={star.x}
                  cy={star.y}
                  r={star.r * 2.2}
                  fill={glowColor}
                  opacity="0.25"
                  className="animate-pulse"
                />
                <circle
                  cx={star.x}
                  cy={star.y}
                  r={star.r * 1.4}
                  fill={primaryColor}
                  opacity="0.5"
                />

                {/* 4-Pointed Star Diamond Polygon */}
                <polygon
                  points={`
                    ${star.x},${star.y - star.r * 2.2}
                    ${star.x + star.r * 0.55},${star.y - star.r * 0.55}
                    ${star.x + star.r * 2.2},${star.y}
                    ${star.x + star.r * 0.55},${star.y + star.r * 0.55}
                    ${star.x},${star.y + star.r * 2.2}
                    ${star.x - star.r * 0.55},${star.y + star.r * 0.55}
                    ${star.x - star.r * 2.2},${star.y}
                    ${star.x - star.r * 0.55},${star.y - star.r * 0.55}
                  `}
                  fill="#ffffff"
                  filter={`url(#starGlow-${motif}-${cardId})`}
                />

                {/* Intense Core Dot */}
                <circle cx={star.x} cy={star.y} r={star.r * 0.65} fill="#ffffff" />
              </g>
            );
          }

          // Regular Star Node
          return (
            <g key={`star-${idx}`}>
              {/* Outer soft halo */}
              <circle
                cx={star.x}
                cy={star.y}
                r={star.r * 1.6}
                fill={glowColor}
                opacity="0.35"
              />
              {/* Star Core */}
              <circle
                cx={star.x}
                cy={star.y}
                r={star.r}
                fill={`url(#starCoreGrad-${motif}-${cardId})`}
              />
              {/* Tiny white pin-point center */}
              <circle cx={star.x} cy={star.y} r={star.r * 0.45} fill="#ffffff" />
            </g>
          );
        })}
      </svg>
    </div>
  );
};
