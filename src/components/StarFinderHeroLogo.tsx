import React from 'react';
import { motion } from 'motion/react';
import { Mascot } from './Mascot';

interface StarFinderHeroLogoProps {
  className?: string;
  onClick?: () => void;
}

export const StarFinderHeroLogo: React.FC<StarFinderHeroLogoProps> = ({
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Top Banner Text matching STAR FINDER.png */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-1 font-display font-black tracking-widest text-[#ff9e3b] text-xs sm:text-sm md:text-base uppercase drop-shadow-[0_2px_10px_rgba(255,158,59,0.5)]"
      >
        CHƯƠNG TRÌNH CHÀO! SINH VIÊN 2026
      </motion.div>

      {/* Main Lockup: Pink Book on left + 3D Star Finder Title + Mascot on right */}
      <div className="relative flex items-center justify-center px-4 py-2">
        {/* Soft Radial Ambient Blue/Cyan Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/25 via-blue-500/20 to-pink-400/20 blur-3xl rounded-full scale-110 pointer-events-none" />

        {/* --- LEFT: Floating Pink Open Notebook --- */}
        <motion.div
          animate={{
            y: [0, -6, 0],
            rotate: [-6, -3, -6],
          }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="relative -mr-4 sm:-mr-8 z-10 w-16 sm:w-24 md:w-28 drop-shadow-[0_8px_20px_rgba(255,133,179,0.6)]"
        >
          <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            {/* Book Pink Cover */}
            <path
              d="M 15 110 C 45 120, 80 120, 80 120 C 80 120, 115 120, 145 110 L 140 85 C 115 95, 80 95, 80 95 C 80 95, 45 95, 20 85 Z"
              fill="#f43f5e"
            />
            {/* Left Page Curved Open */}
            <path
              d="M 80 95 C 55 90, 25 78, 12 55 C 26 32, 58 20, 78 22 Z"
              fill="#fffdf5"
              stroke="#fbcfe8"
              strokeWidth="2"
            />
            <path
              d="M 80 95 C 60 82, 35 65, 22 45 C 32 30, 60 22, 79 24 Z"
              fill="#ffffff"
              opacity="0.95"
            />
            {/* Right Page Curved Open */}
            <path
              d="M 80 95 C 105 90, 135 78, 148 55 C 134 32, 102 20, 82 22 Z"
              fill="#fffdf5"
              stroke="#fbcfe8"
              strokeWidth="2"
            />
            {/* Soft Pink Rim */}
            <path
              d="M 10 98 C 45 112, 80 112, 80 112 C 80 112, 115 112, 150 98"
              stroke="#fb7185"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Core golden shine */}
            <circle cx="80" cy="55" r="30" fill="rgba(255,216,77,0.3)" filter="blur(6px)" />
          </svg>
        </motion.div>

        {/* --- CENTER: 3D Glossy Jelly Title "Star FinDer" --- */}
        <motion.div
          animate={{
            scale: [1, 1.015, 1],
          }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
          className="relative z-20 text-center"
        >
          <svg
            viewBox="0 0 680 230"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[280px] sm:w-[440px] md:w-[580px] lg:w-[660px] h-auto drop-shadow-[0_10px_35px_rgba(0,240,255,0.65)]"
          >
            <defs>
              {/* Cyan 3D Jelly Gradient */}
              <linearGradient id="jellyCyanGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c8faff" />
                <stop offset="25%" stopColor="#76edff" />
                <stop offset="65%" stopColor="#1fd4f7" />
                <stop offset="100%" stopColor="#029ec9" />
              </linearGradient>

              {/* Pastel Pink rim highlight reflection */}
              <linearGradient id="pinkRimGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffc0dc" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ffc0dc" stopOpacity="0.8" />
              </linearGradient>

              <filter id="titleGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Upper Word: "Star" */}
            <g filter="url(#titleGlow)">
              <text
                x="320"
                y="110"
                textAnchor="middle"
                fill="url(#jellyCyanGrad)"
                stroke="#e0fcff"
                strokeWidth="5"
                strokeLinejoin="round"
                fontFamily="Outfit, sans-serif"
                fontWeight="900"
                fontSize="122"
                letterSpacing="4"
              >
                Star
              </text>
              {/* White glossy top highlight */}
              <text
                x="320"
                y="108"
                textAnchor="middle"
                fill="url(#pinkRimGrad)"
                fontFamily="Outfit, sans-serif"
                fontWeight="900"
                fontSize="122"
                letterSpacing="4"
                opacity="0.35"
              >
                Star
              </text>
            </g>

            {/* Lower Word: "FinDer" with playful stylized letters */}
            <g filter="url(#titleGlow)">
              <text
                x="340"
                y="205"
                textAnchor="middle"
                fill="url(#jellyCyanGrad)"
                stroke="#e0fcff"
                strokeWidth="5"
                strokeLinejoin="round"
                fontFamily="Outfit, sans-serif"
                fontWeight="900"
                fontSize="112"
                letterSpacing="6"
              >
                FinDer
              </text>
              <text
                x="340"
                y="203"
                textAnchor="middle"
                fill="url(#pinkRimGrad)"
                fontFamily="Outfit, sans-serif"
                fontWeight="900"
                fontSize="112"
                letterSpacing="6"
                opacity="0.35"
              >
                FinDer
              </text>
            </g>

            {/* Star sparkles over title */}
            <polygon points="120,30 123,37 130,38 123,40 120,47 117,40 110,38 117,37" fill="#ffffff" />
            <polygon points="560,180 562,185 568,186 562,187 560,192 558,187 552,186 558,185" fill="#ffffff" />
            <polygon points="260,125 262,130 268,131 262,133 260,138 258,133 252,131 258,130" fill="#ffd84d" />
          </svg>
        </motion.div>

        {/* --- RIGHT: Cute Mascot holding onto the wordmark --- */}
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: [2, 6, 2],
          }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          className="relative -ml-6 sm:-ml-10 z-30"
        >
          <Mascot state="idle" size="md" />
        </motion.div>
      </div>

      {/* Subtitle Tagline directly matching STAR FINDER.png */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center mt-2 font-display font-extrabold tracking-[0.25em] text-[#ff9e3b] text-xs sm:text-sm md:text-base uppercase drop-shadow-[0_2px_12px_rgba(255,158,59,0.5)]"
      >
        THEO ÁNH SAO – CHẠM KHÁT KHAO
      </motion.div>
    </div>
  );
};
