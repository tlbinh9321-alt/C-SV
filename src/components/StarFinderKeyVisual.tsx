import React, { useState } from 'react';

interface StarFinderKeyVisualProps {
  className?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * StarFinderKeyVisual
 * Displays the authentic STAR FINDER key visual image uploaded by user (STAR FINDER.png)
 * with robust SVG vector fallback that mirrors the typography, colors, and layout precisely.
 */
export const StarFinderKeyVisual: React.FC<StarFinderKeyVisualProps> = ({
  className = '',
  onClick,
  size = 'md',
}) => {
  const [imgError, setImgError] = useState(false);

  // Dimensions for different contexts
  const maxDimensions = {
    sm: 'max-w-[280px] sm:max-w-[340px]',
    md: 'max-w-[380px] sm:max-w-[540px] md:max-w-[640px]',
    lg: 'max-w-[460px] sm:max-w-[680px] md:max-w-[800px]',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center select-none group ${className}`}
    >
      {/* Soft Cosmic Ambient Glow around the artwork */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/25 via-blue-500/20 to-amber-400/20 blur-3xl rounded-full scale-110 pointer-events-none group-hover:scale-120 transition-transform duration-500" />

      {!imgError ? (
        <img
          src="/assets/STAR_FINDER.png"
          alt="Chương trình Chào! Sinh Viên 2026 - Star Finder - Theo Ánh Sao Chạm Khát Khao"
          onError={() => setImgError(true)}
          className={`w-full ${maxDimensions} h-auto object-contain relative z-20 drop-shadow-[0_12px_36px_rgba(0,240,255,0.45)] hover:scale-[1.02] transition-transform duration-300`}
          loading="eager"
        />
      ) : (
        /* High-fidelity Vector Fallback directly replicating STAR FINDER.png */
        <div className={`w-full ${maxDimensions} relative z-20 flex flex-col items-center`}>
          <svg
            viewBox="0 0 800 380"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto drop-shadow-[0_12px_40px_rgba(0,240,255,0.45)]"
          >
            <defs>
              <linearGradient id="sfOrangeBanner" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>

              <linearGradient id="sfCyanCrystal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d5fbff" />
                <stop offset="30%" stopColor="#73efff" />
                <stop offset="70%" stopColor="#18d6f9" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>

              <linearGradient id="sfGlossWhite" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
              </linearGradient>

              <filter id="sfGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0891b2" floodOpacity="0.6" />
              </filter>
            </defs>

            {/* Top Banner Tag: CHƯƠNG TRÌNH CHÀO! SINH VIÊN 2026 */}
            <text
              x="380"
              y="52"
              textAnchor="middle"
              fill="url(#sfOrangeBanner)"
              fontFamily="Outfit, sans-serif"
              fontWeight="900"
              fontSize="24"
              letterSpacing="4"
            >
              CHƯƠNG TRÌNH CHÀO! SINH VIÊN 2026
            </text>

            {/* Word: Star (Upper line) */}
            <g filter="url(#sfGlow)">
              <text
                x="320"
                y="160"
                textAnchor="middle"
                fill="url(#sfCyanCrystal)"
                stroke="#d5fbff"
                strokeWidth="4"
                strokeLinejoin="round"
                fontFamily="Outfit, sans-serif"
                fontWeight="900"
                fontSize="120"
                letterSpacing="4"
              >
                Star
              </text>
              <text
                x="320"
                y="158"
                textAnchor="middle"
                fill="url(#sfGlossWhite)"
                fontFamily="Outfit, sans-serif"
                fontWeight="900"
                fontSize="120"
                letterSpacing="4"
              >
                Star
              </text>
            </g>

            {/* Word: FinDer (Lower line) */}
            <g filter="url(#sfGlow)">
              <text
                x="360"
                y="275"
                textAnchor="middle"
                fill="url(#sfCyanCrystal)"
                stroke="#d5fbff"
                strokeWidth="4"
                strokeLinejoin="round"
                fontFamily="Outfit, sans-serif"
                fontWeight="900"
                fontSize="115"
                letterSpacing="6"
              >
                FinDer
              </text>
              <text
                x="360"
                y="273"
                textAnchor="middle"
                fill="url(#sfGlossWhite)"
                fontFamily="Outfit, sans-serif"
                fontWeight="900"
                fontSize="115"
                letterSpacing="6"
              >
                FinDer
              </text>
            </g>

            {/* Bottom Subtitle: THEO ÁNH SAO – CHẠM KHÁT KHAO */}
            <text
              x="380"
              y="345"
              textAnchor="middle"
              fill="url(#sfOrangeBanner)"
              fontFamily="Outfit, sans-serif"
              fontWeight="900"
              fontSize="22"
              letterSpacing="6"
            >
              THEO ÁNH SAO – CHẠM KHÁT KHAO
            </text>

            {/* Sparkle decors */}
            <polygon points="120,90 123,98 132,100 123,102 120,110 117,102 108,100 117,98" fill="#ffd84d" />
            <polygon points="620,240 622,246 628,248 622,250 620,256 618,250 612,248 618,246" fill="#ffffff" />
            <polygon points="210,210 212,216 218,218 212,220 210,226 208,220 202,218 208,216" fill="#ffd84d" />
          </svg>
        </div>
      )}
    </div>
  );
};
