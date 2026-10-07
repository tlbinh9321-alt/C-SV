import React from 'react';

interface LogoCSVHeaderProps {
  className?: string;
  imageSrc?: string;
}

export const LogoCSVHeader: React.FC<LogoCSVHeaderProps> = ({
  className = '',
  imageSrc = '/assets/LOGO_CSV.png',
}) => {
  const [hasImgError, setHasImgError] = React.useState(false);

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Top Banner: CHƯƠNG TRÌNH CHÀO! SINH VIÊN 2026 */}
      <span className="font-display font-black tracking-widest text-[#ff9e3b] text-xs sm:text-sm md:text-base uppercase drop-shadow-[0_2px_10px_rgba(255,158,59,0.55)] mb-1">
        CHƯƠNG TRÌNH CHÀO! SINH VIÊN 2026
      </span>

      {/* Main Lockup: C!SV Brandmark (Authentic Image or Vector Fallback) */}
      <div className="relative my-0.5 flex items-center justify-center">
        {/* Soft Ambient Cyan/Blue Glow behind logo */}
        <div className="absolute inset-0 bg-cyan-400/25 blur-xl rounded-full scale-125 pointer-events-none" />

        {!hasImgError && imageSrc ? (
          <img
            src={imageSrc}
            alt="C!SV"
            onError={() => setHasImgError(true)}
            className="h-12 sm:h-16 md:h-20 w-auto object-contain relative z-10 drop-shadow-[0_4px_18px_rgba(0,240,255,0.45)] hover:scale-105 transition-transform duration-300"
          />
        ) : (
          /* High-detail Cartoon 2D C!SV vector fallback */
          <div className="relative z-10 flex items-center justify-center">
            <svg
              viewBox="0 0 170 66"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 sm:h-16 md:h-20 w-auto drop-shadow-[0_4px_18px_rgba(0,240,255,0.5)] overflow-visible"
            >
              <defs>
                <linearGradient id="csvHeadCyan" x1="0" y1="0" x2="0" y2="66" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#e0fcff" />
                  <stop offset="25%" stopColor="#67e8f9" />
                  <stop offset="70%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0e7490" />
                </linearGradient>

                <linearGradient id="csvHeadGold" x1="0" y1="0" x2="0" y2="66" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="25%" stopColor="#ffea75" />
                  <stop offset="65%" stopColor="#ffd84d" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>

                <linearGradient id="csvHeadGloss" x1="0" y1="0" x2="0" y2="30" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>

                <filter id="csvHeadShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#042f2e" floodOpacity="0.7" />
                </filter>
              </defs>

              {/* Cartoon outline underlay */}
              <g stroke="#03162b" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
                <path d="M 40 18 C 30 13, 14 17, 10 32 C 6 48, 20 54, 38 52" />
                <path d="M 54 26 L 54 44" />
                <path d="M 94 20 C 80 14, 68 24, 78 33 C 88 41, 78 52, 66 50" />
                <path d="M 104 18 L 118 51 L 134 18" />
              </g>

              {/* Letter C */}
              <path
                d="M 42 16 C 30 11, 12 15, 8 32 C 4 50, 22 55, 40 52 C 43 51, 45 47, 43 44 C 40 42, 38 42, 34 43 C 20 45, 14 38, 17 30 C 19 23, 27 20, 36 24 C 40 26, 44 24, 45 20 C 46 17, 44 16, 42 16 Z"
                fill="url(#csvHeadCyan)"
                filter="url(#csvHeadShadow)"
              />
              <path d="M 36 17 C 26 14, 15 19, 12 28 C 11 26, 17 18, 30 17 Z" fill="url(#csvHeadGloss)" />

              {/* Exclamation Star Mark (!) */}
              <path
                d="M 54 7 L 57 15 L 65 16 L 59 21 L 61 29 L 54 25 L 47 29 L 49 21 L 43 16 L 51 15 Z"
                fill="url(#csvHeadGold)"
                filter="url(#csvHeadShadow)"
              />
              <circle cx="54" cy="18" r="3" fill="#ffffff" opacity="0.8" />
              <rect x="51" y="30" width="6" height="13" rx="3" fill="url(#csvHeadGold)" filter="url(#csvHeadShadow)" />
              <polygon points="54,48 57,51 54,54 51,51" fill="url(#csvHeadGold)" filter="url(#csvHeadShadow)" />

              {/* Letter S */}
              <path
                d="M 96 21 C 89 15, 74 15, 71 24 C 68 33, 85 32, 86 39 C 87 46, 76 48, 68 45 C 64 43, 61 46, 62 49 C 63 53, 67 54, 72 55 C 84 57, 96 52, 94 40 C 92 31, 75 32, 77 24 C 79 19, 87 18, 93 23 C 96 25, 99 23, 100 20 C 100 17, 98 17, 96 21 Z"
                fill="url(#csvHeadCyan)"
                filter="url(#csvHeadShadow)"
              />
              <path d="M 90 18 C 82 17, 75 20, 74 24 C 76 21, 83 19, 89 20 Z" fill="url(#csvHeadGloss)" />

              {/* Letter V */}
              <path
                d="M 104 17 C 101 17, 99 20, 101 24 L 115 50 C 117 53, 122 53, 124 50 L 138 24 C 140 20, 138 17, 135 17 C 131 17, 129 19, 128 22 L 120 41 L 111 22 C 110 19, 108 17, 104 17 Z"
                fill="url(#csvHeadCyan)"
                filter="url(#csvHeadShadow)"
              />
              <path d="M 106 20 L 114 36 L 115 34 L 109 20 Z" fill="url(#csvHeadGloss)" />

              {/* Sparkle star beside V */}
              <polygon points="152,15 154,20 159,21 154,22 152,27 150,22 145,21 150,20" fill="#ffd84d" />
              <polygon points="144,42 145,45 148,46 145,47 144,50 143,47 140,46 143,45" fill="#67e8f9" />
            </svg>
          </div>
        )}
      </div>

      {/* Subtitle Slogan: THEO ÁNH SAO – CHẠM KHÁT KHAO */}
      <span className="font-display font-extrabold tracking-[0.2em] text-[#ff9e3b] text-xs sm:text-sm md:text-base uppercase drop-shadow-[0_2px_10px_rgba(255,158,59,0.55)] mt-1">
        THEO ÁNH SAO – CHẠM KHÁT KHAO
      </span>
    </div>
  );
};
