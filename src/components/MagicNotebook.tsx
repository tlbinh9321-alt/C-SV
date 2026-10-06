import React from 'react';
import { motion } from 'motion/react';
import { Mascot } from './Mascot';

interface MagicNotebookProps {
  isOpen?: boolean;
  isShuffling?: boolean;
  onDrawClick?: () => void;
  showDrawButton?: boolean;
  buttonLabel?: string;
  peekMascot?: boolean;
}

export const MagicNotebook: React.FC<MagicNotebookProps> = ({
  isOpen = false,
  isShuffling = false,
  onDrawClick,
  showDrawButton = true,
  buttonLabel = 'RÚT LÁ BÀI CỦA BẠN',
  peekMascot = true,
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      {/* Light Eruption Beam if open or shuffling */}
      {(isOpen || isShuffling) && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute -top-36 left-1/2 -translate-x-1/2 w-64 h-72 pointer-events-none -z-10 origin-bottom"
        >
          {/* Glowing stardust beam */}
          <div
            className="w-full h-full"
            style={{
              background: 'radial-gradient(ellipse at bottom, rgba(255,216,77,0.85) 0%, rgba(0,240,255,0.45) 35%, rgba(255,133,179,0.2) 65%, transparent 80%)',
              filter: 'blur(10px)',
            }}
          />
          {/* Floating stardust sparks */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="absolute animate-ping text-yellow-300 text-xl top-6 left-12">✦</span>
            <span className="absolute animate-pulse text-cyan-300 text-2xl top-16 right-10">★</span>
            <span className="absolute animate-bounce text-pink-300 text-lg top-28 left-20">✦</span>
          </div>
        </motion.div>
      )}

      {/* Peeking Mascot behind the book (like in reference Screenshot 2026-10-01 094553.png) */}
      {peekMascot && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="absolute -top-16 right-12 z-0"
        >
          <Mascot
            state={isShuffling ? 'excited' : 'peeking'}
            size="sm"
            withSpeechBubble={isShuffling ? 'Đang gọi tên ngôi sao!' : undefined}
          />
        </motion.div>
      )}

      {/* The Magic Pastel Pink Notebook Container */}
      <motion.div
        animate={
          isShuffling
            ? {
                scale: [1, 1.03, 0.98, 1.02, 1],
                rotate: [0, -1, 1, -0.5, 0],
              }
            : {
                y: [0, -6, 0],
              }
        }
        transition={{
          repeat: isShuffling ? Infinity : Infinity,
          duration: isShuffling ? 0.6 : 4,
          ease: 'easeInOut',
        }}
        className="relative z-10 w-72 sm:w-84 md:w-96 select-none cursor-pointer"
        onClick={onDrawClick}
      >
        {/* Magic Book SVG Artwork mimicking NOTEBOOK HỒNG reference */}
        <svg
          viewBox="0 0 400 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-[0_20px_35px_rgba(255,133,179,0.35)]"
        >
          <defs>
            {/* Pastel Pink Cover Gradient */}
            <linearGradient id="bookCoverGrad" x1="40" y1="280" x2="360" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f43f5e" />
              <stop offset="0.3" stopColor="#ff7aa8" />
              <stop offset="0.7" stopColor="#ffa0c5" />
              <stop offset="1" stopColor="#fbcfe8" />
            </linearGradient>

            {/* Cream Page Gradient Left */}
            <linearGradient id="pageLeftGrad" x1="60" y1="220" x2="200" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fdf4ff" />
              <stop offset="0.6" stopColor="#fffdf5" />
              <stop offset="1" stopColor="#fef08a" stopOpacity="0.8" />
            </linearGradient>

            {/* Cream Page Gradient Right */}
            <linearGradient id="pageRightGrad" x1="200" y1="100" x2="340" y2="220" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="0.4" stopColor="#fffdf5" />
              <stop offset="1" stopColor="#fdf4ff" />
            </linearGradient>

            {/* Spine Depth Shadow */}
            <linearGradient id="spineShadow" x1="180" y1="140" x2="220" y2="140" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ff85b3" stopOpacity="0.6" />
              <stop offset="0.5" stopColor="#f43f5e" stopOpacity="0.9" />
              <stop offset="1" stopColor="#ff85b3" stopOpacity="0.6" />
            </linearGradient>

            {/* Glowing inner stardust */}
            <radialGradient id="centerLight" cx="200" cy="180" r="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffd84d" stopOpacity="0.9" />
              <stop offset="0.4" stopColor="#00f0ff" stopOpacity="0.6" />
              <stop offset="1" stopColor="#ff85b3" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Under-glow */}
          <ellipse cx="200" cy="275" rx="140" ry="24" fill="rgba(255,133,179,0.3)" filter="blur(10px)" />

          {/* Bottom Pink Thick Cover */}
          <path
            d="M 50 250 
               C 110 265, 170 270, 200 275 
               C 230 270, 290 265, 350 250 
               L 365 200 
               C 300 215, 230 220, 200 225 
               C 170 220, 100 215, 35 200 Z"
            fill="url(#bookCoverGrad)"
          />

          {/* Base Page Stack Depth Layers */}
          <path
            d="M 45 235 
               C 105 248, 165 252, 200 256 
               C 235 252, 295 248, 355 235 
               L 360 215 
               C 300 228, 235 232, 200 236 
               C 165 232, 100 228, 40 215 Z"
            fill="#fbcfe8"
            opacity="0.8"
          />

          {/* Left Open Page */}
          <path
            d="M 200 225 
               C 160 215, 95 195, 45 160 
               C 65 110, 115 80, 160 75 
               C 175 105, 190 155, 200 225 Z"
            fill="url(#pageLeftGrad)"
            stroke="#fbcfe8"
            strokeWidth="1.5"
          />

          {/* Left Flipping Middle Page (Giving 3D open volume) */}
          <path
            d="M 200 225 
               C 170 200, 115 160, 75 125 
               C 95 85, 140 65, 185 68 
               C 192 110, 196 165, 200 225 Z"
            fill="#ffffff"
            stroke="#fed7aa"
            strokeWidth="1"
            opacity="0.92"
          />

          {/* Right Open Page */}
          <path
            d="M 200 225 
               C 240 215, 305 195, 355 160 
               C 335 110, 285 80, 240 75 
               C 225 105, 210 155, 200 225 Z"
            fill="url(#pageRightGrad)"
            stroke="#fbcfe8"
            strokeWidth="1.5"
          />

          {/* Right Flipping Middle Page */}
          <path
            d="M 200 225 
               C 230 200, 285 160, 325 125 
               C 305 85, 260 65, 215 68 
               C 208 110, 204 165, 200 225 Z"
            fill="#ffffff"
            stroke="#fed7aa"
            strokeWidth="1"
            opacity="0.92"
          />

          {/* Book Spine Deep Crease */}
          <path
            d="M 197 68 C 197 120, 197 180, 197 230 L 203 230 C 203 180, 203 120, 203 68 Z"
            fill="url(#spineShadow)"
          />

          {/* Central Radiating Light Source */}
          <circle cx="200" cy="180" r="75" fill="url(#centerLight)" className="mix-blend-screen" />

          {/* Handwritten-style cute doodles & stars on pages */}
          {/* Left page text lines */}
          <line x1="85" y1="140" x2="160" y2="120" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
          <line x1="90" y1="155" x2="155" y2="135" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
          <line x1="95" y1="170" x2="145" y2="152" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />

          {/* "C!SV 2026" cute doodle on right page */}
          <text x="235" y="130" fill="#38bdf8" fontSize="13" fontFamily="Outfit, sans-serif" fontWeight="800" opacity="0.75" transform="rotate(-8 235 130)">
            C!SV ✦
          </text>
          <text x="240" y="148" fill="#ec4899" fontSize="11" fontFamily="Comfortaa, cursive" fontWeight="700" opacity="0.75" transform="rotate(-8 240 148)">
            Star Finder
          </text>
          <line x1="235" y1="165" x2="305" y2="150" stroke="#ffd84d" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
          <line x1="230" y1="180" x2="285" y2="168" stroke="#ffd84d" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />

          {/* Glowing star stickers */}
          <polygon points="120,105 122,110 127,111 122,113 120,118 118,113 113,111 118,110" fill="#ffd84d" />
          <polygon points="275,95 277,100 282,101 277,103 275,108 273,103 268,101 273,100" fill="#00f0ff" />
          <polygon points="190,140 193,147 200,149 193,151 190,158 187,151 180,149 187,147" fill="#ffffff" />
        </svg>

        {/* Shuffling mini-cards animation popping from center */}
        {isShuffling && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.2, y: 30, rotate: 0, opacity: 0 }}
                animate={{
                  scale: [0.2, 0.75, 0.6],
                  y: [30, -50 - i * 14, -20 - i * 10],
                  rotate: [(i - 2) * 14, (i - 2) * 8],
                  opacity: [0, 0.95, 0.9],
                }}
                transition={{
                  duration: 0.7,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: i * 0.1,
                }}
                className="absolute w-24 h-36 rounded-xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 border-2 border-cyan-400/80 shadow-[0_0_20px_rgba(0,240,255,0.6)] flex flex-col items-center justify-center p-2"
              >
                <div className="w-8 h-8 rounded-full border border-yellow-300/80 flex items-center justify-center mb-1 text-yellow-300 text-xs">
                  ✦
                </div>
                <div className="text-[9px] font-bold tracking-widest text-cyan-200">C!SV</div>
                <div className="text-[7px] text-pink-300">STAR CARD</div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Primary Action Button */}
      {showDrawButton && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDrawClick}
          disabled={isShuffling}
          className="mt-6 px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-slate-950 shadow-[0_0_25px_rgba(255,133,179,0.5)] hover:shadow-[0_0_35px_rgba(255,216,77,0.7)] transition-all flex items-center gap-3 cursor-pointer group"
        >
          <span className="text-lg group-hover:rotate-45 transition-transform duration-300">✦</span>
          <span>{isShuffling ? 'ĐANG RÚT LÁ BÀI...' : buttonLabel}</span>
          <span className="text-lg group-hover:-rotate-45 transition-transform duration-300">✦</span>
        </motion.button>
      )}
    </div>
  );
};
