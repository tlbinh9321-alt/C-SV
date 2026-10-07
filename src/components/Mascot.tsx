import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundEngine } from '../utils/audio';

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
  const [isClicked, setIsClicked] = useState(false);

  // Natural cute blinking loop (every 3.6 - 5.8s)
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 190);
    }, 3800 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  const handleClick = () => {
    soundEngine.playSparkle();
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 900);
    if (onClick) onClick();
  };

  const sizeDimensions = {
    sm: 'w-18 h-18 sm:w-20 sm:h-20',
    md: 'w-28 h-28 sm:w-32 sm:h-32',
    lg: 'w-40 h-40 sm:w-44 sm:h-44',
    xl: 'w-56 h-56 sm:w-60 sm:h-60',
  }[size];

  const isExcited = state === 'excited' || state === 'celebrating' || isClicked;
  const isFlying = state === 'flying';

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Kawaii Cloud Speech Bubble */}
      {withSpeechBubble && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.88 }}
          className="mb-2 px-3.5 py-1.5 rounded-full bg-white/95 text-[#070a1e] text-xs font-extrabold shadow-[0_6px_20px_rgba(255,216,77,0.35)] border-2 border-yellow-300/80 backdrop-blur-md max-w-[210px] text-center relative pointer-events-none z-30"
        >
          <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
            {withSpeechBubble}
          </span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/95 rotate-45 border-r-2 border-b-2 border-yellow-300/80" />
        </motion.div>
      )}

      {/* Mascot Animated Body matching ELEMENT.png */}
      <motion.div
        animate={
          isExcited
            ? {
                y: [0, -16, 0, -8, 0],
                rotate: [0, -6, 6, -3, 0],
                scale: [1, 1.1, 1, 1.05, 1],
              }
            : isFlying
            ? {
                y: [-6, 6, -6],
                rotate: [-14, -8, -14],
              }
            : state === 'peeking'
            ? {
                y: [0, -4, 0],
                rotate: [-6, -2, -6],
              }
            : {
                y: [0, -7, 0],
                rotate: [0, 2, -2, 0],
              }
        }
        transition={{
          repeat: Infinity,
          duration: isExcited ? 1.1 : 3.4,
          ease: 'easeInOut',
        }}
        onClick={handleClick}
        className={`relative ${sizeDimensions} cursor-pointer group`}
        title="Bé Sao C!SV – Chạm vào mình nè!"
      >
        {/* Soft Golden Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-300/40 via-amber-200/35 to-yellow-100/30 blur-xl scale-125 -z-10 animate-pulse" />

        {/* Floating Heart / Sparkle on click */}
        <AnimatePresence>
          {isClicked && (
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: 1, y: -26, scale: 1.2 }}
              exit={{ opacity: 0 }}
              className="absolute -top-3 left-1/2 -translate-x-1/2 text-amber-300 text-lg pointer-events-none z-30 font-bold drop-shadow-[0_2px_8px_rgba(255,216,77,0.8)]"
            >
              ★ ✨
            </motion.div>
          )}
        </AnimatePresence>

        {/* Exact Vector Replica of ELEMENT.png Star Mascot */}
        <svg
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_10px_25px_rgba(245,190,36,0.4)]"
        >
          <defs>
            {/* 3D Plushie Star Body Gradient matching ELEMENT.png */}
            <radialGradient id="elemBodyGrad" cx="44%" cy="36%" r="68%">
              <stop offset="0%" stopColor="#fffffa" />
              <stop offset="25%" stopColor="#fef08a" />
              <stop offset="65%" stopColor="#fde047" />
              <stop offset="90%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </radialGradient>

            {/* Limb Gradient (Chubby arms & noodle legs) */}
            <linearGradient id="elemLimbGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="70%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>

            {/* Deep Royal Sapphire Eye Gradient with Cyan Lower Glow */}
            <radialGradient id="elemEyeGrad" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="40%" stopColor="#1e3a8a" />
              <stop offset="75%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#38bdf8" />
            </radialGradient>

            {/* Soft Peach/Rosy Blush Gradient matching ELEMENT.png */}
            <radialGradient id="elemCheekGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.85" />
              <stop offset="65%" stopColor="#f87171" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#f87171" stopOpacity="0" />
            </radialGradient>

            {/* Soft Ambient Limb Shadow */}
            <filter id="elemLimbShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3.5" stdDeviation="2.5" floodColor="#ca8a04" floodOpacity="0.3" />
            </filter>

            {/* Body 3D Volume Shadow */}
            <filter id="elemBodyShadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodColor="#a16207" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* ======================================================== */}
          {/* 1. NOODLE LEGS (Extending below star matching ELEMENT.png) */}
          {/* ======================================================== */}
          <g filter="url(#elemLimbShadow)">
            {/* Left Leg: Curved forward with cute rounded bootie foot */}
            <path
              d="M 102 186
                 C 102 198, 98 212, 94 220
                 C 90 227, 98 232, 110 228
                 C 118 225, 114 212, 112 188 Z"
              fill="url(#elemLimbGrad)"
            />
            {/* Right Leg: Curved forward with cute rounded bootie foot */}
            <path
              d="M 130 186
                 C 130 198, 126 212, 134 220
                 C 142 227, 154 222, 150 214
                 C 144 204, 142 196, 140 188 Z"
              fill="url(#elemLimbGrad)"
            />
          </g>

          {/* ======================================================== */}
          {/* 2. CHUBBY ARMS matching ELEMENT.png                     */}
          {/* ======================================================== */}
          {/* Left Arm: Pointing down-left with rounded bulbous hand */}
          <path
            d="M 52 110
               C 36 122, 16 136, 20 152
               C 24 165, 42 160, 52 142
               C 60 130, 62 120, 52 110 Z"
            fill="url(#elemLimbGrad)"
            filter="url(#elemLimbShadow)"
          />

          {/* Right Arm: Waving high up-right with rounded mitten hand */}
          <motion.g
            animate={{
              rotate: isExcited ? [-12, 16, -12] : [-5, 8, -5],
              originX: '174px',
              originY: '106px',
            }}
            transition={{ repeat: Infinity, duration: isExcited ? 0.6 : 2.0, ease: 'easeInOut' }}
          >
            <path
              d="M 172 104
                 C 190 92, 218 84, 228 98
                 C 236 108, 226 124, 206 122
                 C 188 120, 176 114, 172 104 Z"
              fill="url(#elemLimbGrad)"
              filter="url(#elemLimbShadow)"
            />
          </motion.g>

          {/* ======================================================== */}
          {/* 3. MAIN PLUSHIE 5-POINT STAR BODY matching ELEMENT.png    */}
          {/* ======================================================== */}
          <path
            d="M 120 16
               C 128 34, 142 66, 168 76
               C 194 86, 226 90, 226 110
               C 226 128, 194 142, 184 164
               C 174 186, 184 216, 168 224
               C 152 231, 132 205, 120 205
               C 108 205, 88 231, 72 224
               C 56 216, 66 186, 56 164
               C 46 142, 14 128, 14 110
               C 14 90, 46 86, 72 76
               C 98 66, 112 34, 120 16 Z"
            fill="url(#elemBodyGrad)"
            filter="url(#elemBodyShadow)"
          />

          {/* Top Point Soft Diffuse Highlight */}
          <ellipse cx="120" cy="42" rx="14" ry="7" fill="#ffffff" opacity="0.55" />

          {/* Soft Contour Ambient Glow */}
          <path
            d="M 120 16
               C 128 34, 142 66, 168 76
               C 194 86, 226 90, 226 110
               C 226 128, 194 142, 184 164
               C 174 186, 184 216, 168 224
               C 152 231, 132 205, 120 205
               C 108 205, 88 231, 72 224
               C 56 216, 66 186, 56 164
               C 46 142, 14 128, 14 110
               C 14 90, 46 86, 72 76
               C 98 66, 112 34, 120 16 Z"
            stroke="#f59e0b"
            strokeWidth="2.5"
            strokeLinejoin="round"
            opacity="0.25"
          />

          {/* ======================================================== */}
          {/* 4. CHEEKS (Soft peach ovals matching ELEMENT.png)        */}
          {/* ======================================================== */}
          <ellipse cx="76" cy="142" rx="15" ry="9" fill="url(#elemCheekGrad)" />
          <ellipse cx="164" cy="142" rx="15" ry="9" fill="url(#elemCheekGrad)" />

          {/* ======================================================== */}
          {/* 5. NOSE & MOUTH matching ELEMENT.png                     */}
          {/* ======================================================== */}
          {/* Tiny Orange Button Nose */}
          <ellipse cx="120" cy="132" rx="4.8" ry="3.8" fill="#fb923c" />
          <circle cx="119" cy="131" r="1.2" fill="#ffffff" opacity="0.7" />

          {/* Sweet Delicate Smile Line right under nose */}
          <path
            d="M 114 142 Q 120 148 126 142"
            stroke="#92400e"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* ======================================================== */}
          {/* 6. BIG BLUE EYES WITH DUAL STAR SPARKLES in ELEMENT.png  */}
          {/* ======================================================== */}
          {!isBlinking ? (
            <g>
              {/* --- LEFT EYE --- */}
              <ellipse cx="94" cy="115" rx="14" ry="20" fill="url(#elemEyeGrad)" />
              {/* Lower Cyan / Light Blue Crescent Glow */}
              <ellipse cx="94" cy="123" rx="10" ry="7" fill="#38bdf8" opacity="0.85" />
              {/* Top-Left White Gloss Highlight */}
              <ellipse cx="90" cy="107" rx="5" ry="7.5" fill="#ffffff" opacity="0.9" />

              {/* SPARKLE 1: Upper Golden 4-pointed Star Sparkle in pupil */}
              <polygon
                points="96,104 97.5,107 101,108 97.5,109 96,112 94.5,109 91,108 94.5,107"
                fill="#fde047"
              />
              {/* SPARKLE 2: Lower Golden 4-pointed Star Sparkle in pupil */}
              <polygon
                points="95,117 96.2,119.5 99,120.2 96.2,121 95,123.5 93.8,121 91,120.2 93.8,119.5"
                fill="#fde047"
              />

              {/* --- RIGHT EYE --- */}
              <ellipse cx="146" cy="115" rx="14" ry="20" fill="url(#elemEyeGrad)" />
              {/* Lower Cyan / Light Blue Crescent Glow */}
              <ellipse cx="146" cy="123" rx="10" ry="7" fill="#38bdf8" opacity="0.85" />
              {/* Top-Left White Gloss Highlight */}
              <ellipse cx="142" cy="107" rx="5" ry="7.5" fill="#ffffff" opacity="0.9" />

              {/* SPARKLE 1: Upper Golden 4-pointed Star Sparkle in pupil */}
              <polygon
                points="148,104 149.5,107 153,108 149.5,109 148,112 146.5,109 143,108 146.5,107"
                fill="#fde047"
              />
              {/* SPARKLE 2: Lower Golden 4-pointed Star Sparkle in pupil */}
              <polygon
                points="147,117 148.2,119.5 151,120.2 148.2,121 147,123.5 145.8,121 143,120.2 145.8,119.5"
                fill="#fde047"
              />
            </g>
          ) : (
            /* Sweet Blinking Arc Curves (^_^) */
            <g>
              <path
                d="M 83 118 Q 94 105 105 118"
                stroke="#1e3a8a"
                strokeWidth="4.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 135 118 Q 146 105 157 118"
                stroke="#1e3a8a"
                strokeWidth="4.2"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}

          {/* Scanning Mode Visor (only when state === 'scanning') */}
          {state === 'scanning' && (
            <g className="animate-pulse">
              <path
                d="M 70 115 C 90 108, 150 108, 170 115 C 175 125, 160 134, 120 134 C 80 134, 65 125, 70 115 Z"
                fill="rgba(0, 240, 255, 0.45)"
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
