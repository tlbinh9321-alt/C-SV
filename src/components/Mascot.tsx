import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface MascotProps {
  state?: 'idle' | 'scanning' | 'excited' | 'peeking' | 'celebrating' | 'flying';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  withSpeechBubble?: string;
}

export const Mascot: React.FC<MascotProps> = ({
  state = 'idle',
  size = 'md',
  className = '',
  onClick,
  withSpeechBubble,
}) => {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3600 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  const sizeDimensions = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-40 h-40',
    xl: 'w-56 h-56',
  }[size];

  const isFlying = state === 'flying';

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Speech Bubble */}
      {withSpeechBubble && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="mb-2 px-3 py-1.5 rounded-2xl bg-white/95 text-[#070a1e] text-xs font-bold shadow-lg border border-pink-200 backdrop-blur-sm max-w-[200px] text-center relative pointer-events-none z-20"
        >
          {withSpeechBubble}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/95 rotate-45 border-r border-b border-pink-200" />
        </motion.div>
      )}

      {/* Mascot Animated Body matching MASCOT.png */}
      <motion.div
        animate={
          state === 'excited' || state === 'celebrating'
            ? {
                y: [0, -14, 0, -8, 0],
                rotate: [0, -5, 5, -2, 0],
                scale: [1, 1.08, 1, 1.04, 1],
              }
            : isFlying
            ? {
                y: [-6, 6, -6],
                rotate: [-18, -12, -18],
              }
            : state === 'peeking'
            ? {
                y: [0, -4, 0],
                rotate: [-8, -4, -8],
              }
            : {
                y: [0, -8, 0],
                rotate: [0, 2, -2, 0],
              }
        }
        transition={{
          repeat: Infinity,
          duration: state === 'excited' ? 1.4 : 3.6,
          ease: 'easeInOut',
        }}
        onClick={onClick}
        className={`relative ${sizeDimensions} cursor-pointer drop-shadow-[0_8px_25px_rgba(255,216,77,0.55)]`}
      >
        {/* Soft Golden/Pink Aura matching reference */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-300/40 via-amber-200/30 to-pink-300/25 blur-xl scale-125 -z-10 animate-pulse" />

        {/* High-fidelity Vector Recreation of MASCOT.png */}
        <svg
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Mascot Body Shading (Soft Airbrush gradient) */}
            <radialGradient id="mascotBodyGrad" cx="45%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#fffec8" />
              <stop offset="45%" stopColor="#ffea68" />
              <stop offset="85%" stopColor="#ffd84d" />
              <stop offset="100%" stopColor="#f5be24" />
            </radialGradient>

            {/* Arm/Leg Depth Shading */}
            <linearGradient id="mascotLimbGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffea68" />
              <stop offset="100%" stopColor="#f5be24" />
            </linearGradient>

            {/* Eye Pupil Radial Gradient */}
            <radialGradient id="mascotEyeGrad" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#1a367c" />
              <stop offset="65%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#60a5fa" />
            </radialGradient>

            {/* Rosy Peach Cheeks */}
            <radialGradient id="mascotCheek" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#f87171" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f87171" stopOpacity="0" />
            </radialGradient>

            <filter id="mascotSoftShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#d97706" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Legs matching MASCOT.png */}
          <g filter="url(#mascotSoftShadow)">
            {/* Left Foot */}
            <path
              d="M 98 185 
                 C 98 198, 92 215, 88 220 
                 C 82 225, 96 230, 108 225 
                 C 114 222, 112 205, 110 185 Z"
              fill="url(#mascotLimbGrad)"
            />
            {/* Right Foot */}
            <path
              d="M 130 185 
                 C 130 198, 126 215, 134 222 
                 C 144 228, 155 220, 150 212 
                 C 144 202, 142 195, 142 185 Z"
              fill="url(#mascotLimbGrad)"
            />
          </g>

          {/* Left Waving Arm (raised high in MASCOT.png) */}
          <motion.path
            d="M 172 105 
               C 190 95, 218 88, 228 100 
               C 235 110, 225 125, 205 124 
               C 188 122, 175 115, 172 105 Z"
            fill="url(#mascotLimbGrad)"
            animate={
              state === 'idle' || state === 'celebrating'
                ? { rotate: [0, -8, 8, 0], originX: '172px', originY: '105px' }
                : {}
            }
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          />

          {/* Right Lower Arm (rested gently in MASCOT.png) */}
          <path
            d="M 52 110 
               C 35 120, 15 135, 18 152 
               C 22 165, 38 158, 48 142 
               C 56 130, 58 120, 52 110 Z"
            fill="url(#mascotLimbGrad)"
          />

          {/* Main 5-Pointed Star Body */}
          <path
            d="M 120 18
               C 128 38, 140 68, 165 78
               C 192 88, 222 92, 222 110
               C 222 128, 192 142, 182 165
               C 172 188, 182 218, 165 225
               C 148 232, 130 205, 120 205
               C 110 205, 92 232, 75 225
               C 58 218, 68 188, 58 165
               C 48 142, 18 128, 18 110
               C 18 92, 48 88, 75 78
               C 100 68, 112 38, 120 18 Z"
            fill="url(#mascotBodyGrad)"
            filter="url(#mascotSoftShadow)"
          />

          {/* Highlights & Cheek Glow */}
          {/* Top Point Soft Light */}
          <ellipse cx="120" cy="45" rx="14" ry="8" fill="#ffffff" opacity="0.4" />

          {/* Large Oval Rosy Cheeks */}
          <ellipse cx="78" cy="142" rx="14" ry="8" fill="url(#mascotCheek)" />
          <ellipse cx="162" cy="142" rx="14" ry="8" fill="url(#mascotCheek)" />

          {/* Sweet Orange Nose from MASCOT.png */}
          <ellipse cx="120" cy="132" rx="4.5" ry="4" fill="#fb923c" />

          {/* Gentle Smile */}
          <path
            d="M 112 144 Q 120 154 128 144"
            stroke="#b45309"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Big Cartoon Eyes matching MASCOT.png */}
          {!isBlinking ? (
            <g>
              {/* Left Eye */}
              <ellipse cx="94" cy="115" rx="14" ry="20" fill="url(#mascotEyeGrad)" />
              {/* Left Eye Bottom Aqua Glow */}
              <ellipse cx="94" cy="123" rx="10" ry="7" fill="#67e8f9" opacity="0.8" />
              {/* Left Eye Top White Reflection */}
              <ellipse cx="96" cy="108" rx="6" ry="9" fill="#ffffff" />
              {/* Left Pupil 4-Pointed Star Sparkle (Iconic to reference) */}
              <polygon
                points="95,102 97,107 102,108 97,109 95,114 93,109 88,108 93,107"
                fill="#ffffff"
              />
              <circle cx="88" cy="122" r="2.5" fill="#ffffff" />

              {/* Right Eye */}
              <ellipse cx="146" cy="115" rx="14" ry="20" fill="url(#mascotEyeGrad)" />
              {/* Right Eye Bottom Aqua Glow */}
              <ellipse cx="146" cy="123" rx="10" ry="7" fill="#67e8f9" opacity="0.8" />
              {/* Right Eye Top White Reflection */}
              <ellipse cx="148" cy="108" rx="6" ry="9" fill="#ffffff" />
              {/* Right Pupil 4-Pointed Star Sparkle */}
              <polygon
                points="147,102 149,107 154,108 149,109 147,114 145,109 140,108 145,107"
                fill="#ffffff"
              />
              <circle cx="140" cy="122" r="2.5" fill="#ffffff" />
            </g>
          ) : (
            /* Happy Blinking Curves (^_^) */
            <g>
              <path
                d="M 82 118 Q 94 104 106 118"
                stroke="#1e3a8a"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 134 118 Q 146 104 158 118"
                stroke="#1e3a8a"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}

          {/* Scanning Mode Overlay */}
          {state === 'scanning' && (
            <g className="animate-pulse">
              <path
                d="M 70 115 C 90 108, 150 108, 170 115 C 175 125, 160 135, 120 134 C 80 135, 65 125, 70 115 Z"
                fill="rgba(0, 240, 255, 0.4)"
                stroke="#00f0ff"
                strokeWidth="2.5"
              />
              <line x1="68" y1="115" x2="172" y2="115" stroke="#ffffff" strokeWidth="2" strokeDasharray="3,3" />
            </g>
          )}
        </svg>
      </motion.div>
    </div>
  );
};
