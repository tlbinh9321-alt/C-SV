import React from 'react';

interface LogoCSVProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

/**
 * High-fidelity vector rendition of C!SV Logo:
 * - Rounded bubbly Cyan Letters (C, S, V) with glassy highlights
 * - Golden Star Exclamation Mark (!) with diamond dot
 */
export const LogoCSV: React.FC<LogoCSVProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
}) => {
  const heights = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16',
  }[size];

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Ambient cyan glow behind logo */}
        <div className="absolute inset-0 bg-cyan-400/30 blur-lg rounded-full pointer-events-none" />

        <svg
          viewBox="0 0 160 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${heights} w-auto drop-shadow-[0_4px_14px_rgba(0,240,255,0.45)] relative z-10 overflow-visible`}
        >
          <defs>
            {/* Cyan Gradient for C, S, V */}
            <linearGradient id="csvCyanGrad" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e0fcff" />
              <stop offset="25%" stopColor="#67e8f9" />
              <stop offset="70%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>

            {/* Gloss Highlight Gradient */}
            <linearGradient id="csvGloss" x1="0" y1="0" x2="0" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Gold Star Gradient */}
            <linearGradient id="csvGoldGrad" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#ffea75" />
              <stop offset="65%" stopColor="#ffd84d" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            {/* Filter for subtle stroke bevel */}
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#042f2e" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Dark Outline Underlay for cartoon 2D pop */}
          <g stroke="#03162b" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
            {/* C path */}
            <path d="M 40 18 C 30 13, 14 17, 10 32 C 6 48, 20 54, 38 52" />
            {/* Star ! beam */}
            <path d="M 52 26 L 52 42" />
            {/* S path */}
            <path d="M 94 20 C 80 14, 68 24, 78 33 C 88 41, 78 52, 66 50" />
            {/* V path */}
            <path d="M 104 18 L 118 51 L 134 18" />
          </g>

          {/* Letter C (Chunky Cartoon 2D) */}
          <path
            d="M 42 16 C 30 11, 12 15, 8 32 C 4 50, 22 55, 40 52 C 43 51, 45 47, 43 44 C 40 42, 38 42, 34 43 C 20 45, 14 38, 17 30 C 19 23, 27 20, 36 24 C 40 26, 44 24, 45 20 C 46 17, 44 16, 42 16 Z"
            fill="url(#csvCyanGrad)"
            filter="url(#softGlow)"
          />
          {/* C Gloss highlight */}
          <path
            d="M 36 17 C 26 14, 15 19, 12 28 C 11 26, 17 18, 30 17 Z"
            fill="url(#csvGloss)"
          />

          {/* Exclamation Star Mark (!) */}
          {/* Golden Star Head */}
          <path
            d="M 54 8 L 56.5 15 L 63.5 16 L 58 20.5 L 60 27.5 L 54 23.5 L 48 27.5 L 50 20.5 L 44.5 16 L 51.5 15 Z"
            fill="url(#csvGoldGrad)"
            filter="url(#softGlow)"
          />
          {/* Star Core highlight */}
          <circle cx="54" cy="18" r="3" fill="#ffffff" opacity="0.75" />

          {/* Exclamation Stem */}
          <rect
            x="51"
            y="28"
            width="6"
            height="13"
            rx="3"
            fill="url(#csvGoldGrad)"
            filter="url(#softGlow)"
          />
          {/* Exclamation Dot (Diamond) */}
          <polygon
            points="54,46 57,49 54,52 51,49"
            fill="url(#csvGoldGrad)"
            filter="url(#softGlow)"
          />

          {/* Letter S (Chunky Cartoon 2D) */}
          <path
            d="M 96 21 C 89 15, 74 15, 71 24 C 68 33, 85 32, 86 39 C 87 46, 76 48, 68 45 C 64 43, 61 46, 62 49 C 63 53, 67 54, 72 55 C 84 57, 96 52, 94 40 C 92 31, 75 32, 77 24 C 79 19, 87 18, 93 23 C 96 25, 99 23, 100 20 C 100 17, 98 17, 96 21 Z"
            fill="url(#csvCyanGrad)"
            filter="url(#softGlow)"
          />
          {/* S Gloss */}
          <path
            d="M 90 18 C 82 17, 75 20, 74 24 C 76 21, 83 19, 89 20 Z"
            fill="url(#csvGloss)"
          />

          {/* Letter V (Chunky Cartoon 2D) */}
          <path
            d="M 104 17 C 101 17, 99 20, 101 24 L 115 50 C 117 53, 122 53, 124 50 L 138 24 C 140 20, 138 17, 135 17 C 131 17, 129 19, 128 22 L 120 41 L 111 22 C 110 19, 108 17, 104 17 Z"
            fill="url(#csvCyanGrad)"
            filter="url(#softGlow)"
          />
          {/* V Gloss */}
          <path
            d="M 106 20 L 114 36 L 115 34 L 109 20 Z"
            fill="url(#csvGloss)"
          />
        </svg>
      </div>

      {showTagline && (
        <span className="text-[10px] font-black tracking-widest text-amber-300 uppercase mt-1 drop-shadow-[0_1px_4px_rgba(255,216,77,0.5)]">
          THEO ÁNH SAO – CHẠM KHÁT KHAO
        </span>
      )}
    </div>
  );
};
