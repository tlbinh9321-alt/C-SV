import React from 'react';

interface LogoCSVProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const LogoCSV: React.FC<LogoCSVProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
}) => {
  const dimensions = {
    sm: { width: 140, height: showTagline ? 55 : 40 },
    md: { width: 220, height: showTagline ? 85 : 62 },
    lg: { width: 320, height: showTagline ? 124 : 90 },
  }[size];

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox="0 0 520 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_4px_16px_rgba(0,240,255,0.35)]"
        style={{ maxWidth: `${dimensions.width}px` }}
      >
        <defs>
          {/* Aqua Cyan 3D Jelly Gradient */}
          <linearGradient id="cyanLetterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d5fcff" />
            <stop offset="30%" stopColor="#7bf0ff" />
            <stop offset="70%" stopColor="#25d8f6" />
            <stop offset="100%" stopColor="#08b5e5" />
          </linearGradient>

          {/* Golden Yellow Exclamation Gradient */}
          <linearGradient id="goldBeamGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffde0" />
            <stop offset="35%" stopColor="#ffea75" />
            <stop offset="80%" stopColor="#ffd84d" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          {/* Soft inner glow highlight */}
          <linearGradient id="whiteHighlight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Diamond Star Glow */}
          <radialGradient id="starGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#fff9c4" />
            <stop offset="50%" stopColor="#ffd84d" />
            <stop offset="100%" stopColor="#eab308" />
          </radialGradient>

          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- LETTER C --- */}
        <g filter="url(#glowEffect)">
          <path
            d="M 155 35
               C 85 22, 10 65, 10 120
               C 10 178, 85 200, 155 185
               C 135 165, 60 162, 58 120
               C 56 78, 135 60, 155 35 Z"
            fill="url(#cyanLetterGrad)"
          />
          {/* C highlight reflection */}
          <path
            d="M 140 40
               C 80 30, 25 70, 25 115
               C 25 130, 32 90, 75 55
               C 110 32, 135 38, 140 40 Z"
            fill="url(#whiteHighlight)"
          />
        </g>

        {/* --- EXCLAMATION MARK (!) --- */}
        {/* Upper Beam */}
        <g filter="url(#glowEffect)">
          <path
            d="M 197 22
               C 180 22, 175 45, 177 90
               C 178 125, 192 170, 197 185
               C 202 170, 216 125, 217 90
               C 219 45, 214 22, 197 22 Z"
            fill="url(#goldBeamGrad)"
          />
          <path
            d="M 197 26
               C 188 26, 183 45, 185 85
               C 188 60, 193 30, 197 26 Z"
            fill="#ffffff"
            opacity="0.8"
          />
        </g>

        {/* Diamond Star Dot at bottom of (!) */}
        <g filter="url(#glowEffect)">
          <path
            d="M 197 190
               C 197 198, 203 205, 212 205
               C 203 205, 197 212, 197 220
               C 197 212, 191 205, 182 205
               C 191 205, 197 198, 197 190 Z"
            fill="url(#starGlow)"
          />
        </g>

        {/* --- LETTER S --- */}
        <g filter="url(#glowEffect)">
          <path
            d="M 345 35
               C 290 18, 235 48, 240 85
               C 245 125, 320 120, 325 155
               C 330 185, 275 195, 235 185
               C 245 168, 305 175, 305 155
               C 305 130, 230 130, 225 90
               C 220 52, 280 25, 345 35 Z"
            fill="url(#cyanLetterGrad)"
          />
          {/* S highlight */}
          <path
            d="M 330 38
               C 285 25, 245 50, 248 80
               C 255 58, 285 35, 330 38 Z"
            fill="url(#whiteHighlight)"
          />
        </g>

        {/* --- LETTER U / V --- */}
        <g filter="url(#glowEffect)">
          <path
            d="M 368 25
               L 402 25
               C 405 85, 412 165, 442 175
               C 472 165, 479 85, 482 25
               L 516 25
               C 512 105, 498 200, 442 200
               C 386 200, 372 105, 368 25 Z"
            fill="url(#cyanLetterGrad)"
          />
          {/* U highlight */}
          <path
            d="M 374 30
               C 378 80, 386 140, 420 165
               C 400 140, 388 80, 384 30 Z"
            fill="url(#whiteHighlight)"
          />
        </g>
      </svg>

      {/* Golden Tagline directly matching LOGO CSV.png */}
      {showTagline && (
        <div className="flex items-center justify-center gap-2 mt-0.5 text-center font-display font-black tracking-widest text-amber-300 drop-shadow-[0_0_8px_rgba(255,216,77,0.7)] text-[9px] sm:text-[10px] uppercase">
          <span>STAR FINDER</span>
          <span className="text-yellow-200 text-xs">✦</span>
          <span>THEO ÁNH SAO – CHẠM KHÁT KHAO</span>
        </div>
      )}
    </div>
  );
};
