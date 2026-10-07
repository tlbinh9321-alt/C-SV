import React from 'react';
import { LogoCSV } from './LogoCSV';

interface CardBackProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showHolo?: boolean;
}

export const CardBack: React.FC<CardBackProps> = ({
  className = '',
  size = 'md',
  showHolo = true,
}) => {
  const isCompact = size === 'xs' || size === 'sm';

  return (
    <div
      className={`relative w-full h-full rounded-[14px] overflow-hidden select-none flex flex-col items-center justify-between p-2.5 sm:p-3.5 text-center ${className}`}
      style={{
        background: 'linear-gradient(145deg, #0e123e 0%, #170d38 40%, #0d173d 75%, #080b26 100%)',
      }}
    >
      {/* 1. Luminous Cosmic Nebular Blooms inside card */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Upper-left cyan cosmic aura */}
        <div className="absolute -top-10 -left-10 w-36 h-36 rounded-full bg-cyan-500/25 blur-2xl" />
        {/* Lower-right magenta/pink cosmic aura */}
        <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-pink-500/25 blur-2xl" />
        {/* Center golden sunburst glow */}
        <div className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-amber-400/20 blur-xl animate-pulse" />
      </div>

      {/* 2. Ornate Metallic Gold Border Frame */}
      <div className="absolute inset-1.5 sm:inset-2 rounded-xl border border-yellow-300/40 pointer-events-none flex flex-col justify-between p-1.5 sm:p-2 z-10 shadow-[inset_0_0_12px_rgba(255,216,77,0.15)]">
        {/* Thin secondary inner line */}
        <div className="absolute inset-1 rounded-lg border border-cyan-400/25 pointer-events-none" />

        {/* 4 Corner Ornate Celestial Diamond Stars */}
        <div className="w-full flex justify-between items-center text-[9px] sm:text-[10px] text-yellow-300 drop-shadow-[0_0_6px_rgba(255,216,77,0.8)]">
          <span className="font-mono">✦</span>
          <span className="text-[7.5px] sm:text-[8.5px] tracking-widest text-[#ff9e3b] font-black uppercase">
            CHÀO! SINH VIÊN 2026
          </span>
          <span className="font-mono">✦</span>
        </div>

        <div className="w-full flex justify-between items-center text-[9px] sm:text-[10px] text-yellow-300 drop-shadow-[0_0_6px_rgba(255,216,77,0.8)]">
          <span className="font-mono">✧</span>
          <span className="text-[7px] sm:text-[8px] tracking-widest text-cyan-300/90 font-extrabold uppercase">
            52 STARS
          </span>
          <span className="font-mono">✧</span>
        </div>
      </div>

      {/* 3. Centerpiece: Sacred Astrolabe Mandala & 3D Star Compass */}
      <div className="relative my-auto w-full flex-1 flex flex-col items-center justify-center z-10">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 drop-shadow-[0_0_20px_rgba(255,216,77,0.5)] overflow-visible"
        >
          <defs>
            {/* Rich Gold Foil Metallic Gradient */}
            <linearGradient id="backGoldFoil" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#fff275" />
              <stop offset="50%" stopColor="#ffd84d" />
              <stop offset="85%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            {/* Cyan/Aqua Iridescent Glow */}
            <linearGradient id="backCyanGlow" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>

            {/* Magenta/Pink Iridescent Glow */}
            <linearGradient id="backPinkGlow" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#ff85b3" />
              <stop offset="100%" stopColor="#fbcfe8" />
            </linearGradient>

            {/* Glowing filter */}
            <filter id="backGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Concentric Astrolabe Circles & Degree Marks */}
          <circle cx="100" cy="100" r="92" stroke="url(#backGoldFoil)" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="100" cy="100" r="82" stroke="url(#backCyanGlow)" strokeWidth="0.8" opacity="0.7" />
          <circle cx="100" cy="100" r="70" stroke="url(#backGoldFoil)" strokeWidth="1.5" opacity="0.85" />
          <circle cx="100" cy="100" r="54" stroke="url(#backPinkGlow)" strokeWidth="1" strokeDasharray="4 2" opacity="0.75" />

          {/* 12 Astrological Meridian Rays */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="100"
              y1="22"
              x2="100"
              y2="34"
              stroke="url(#backGoldFoil)"
              strokeWidth="1.2"
              transform={`rotate(${deg} 100 100)`}
              opacity="0.8"
            />
          ))}

          {/* Central Cosmic Emblem: 8-Pointed Star of Destiny */}
          <g filter="url(#backGlowFilter)">
            {/* Primary Diamond Star */}
            <polygon
              points="100,28 107,88 172,100 107,112 100,172 93,112 28,100 93,88"
              fill="url(#backGoldFoil)"
            />
            {/* Secondary 45-degree Star */}
            <polygon
              points="100,48 105,92 152,100 105,108 100,152 95,108 48,100 95,92"
              fill="url(#backCyanGlow)"
              transform="rotate(45 100 100)"
              opacity="0.85"
            />
            {/* Brilliant Diamond Star Core */}
            <circle cx="100" cy="100" r="14" fill="#090d2e" stroke="url(#backGoldFoil)" strokeWidth="2" />
            <polygon
              points="100,90 103,97 110,100 103,103 100,110 97,103 90,100 97,97"
              fill="#ffffff"
            />
            <circle cx="100" cy="100" r="3" fill="#ffd84d" />
          </g>

          {/* 4 Cardinal Mini Stars outside */}
          <circle cx="100" cy="12" r="2.5" fill="#ffd84d" />
          <circle cx="100" cy="188" r="2.5" fill="#ffd84d" />
          <circle cx="12" cy="100" r="2.5" fill="#67e8f9" />
          <circle cx="188" cy="100" r="2.5" fill="#67e8f9" />
        </svg>

        {/* Brandmark Section matching the exact Home Header branding */}
        <div className="mt-2.5 text-center relative z-20 flex flex-col items-center">
          {/* Authentic C!SV Logo (Vector with cyan letters & gold star !) */}
          <LogoCSV size={isCompact ? 'sm' : 'md'} showTagline={false} />

          {/* Subtitle STAR FINDER */}
          <span className="text-[9px] sm:text-[10px] md:text-[11px] font-black tracking-widest text-amber-300 uppercase block mt-1 drop-shadow-[0_1px_4px_rgba(255,216,77,0.6)]">
            STAR FINDER
          </span>

          {/* Slogan */}
          {!isCompact && (
            <span className="text-[7px] sm:text-[8px] font-bold tracking-wider text-cyan-200/95 uppercase block mt-0.5">
              ✦ THEO ÁNH SAO – CHẠM KHÁT KHAO ✦
            </span>
          )}
        </div>
      </div>

      {/* 4. Holographic Shimmer Sheen Sweep Overlay */}
      {showHolo && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[14px] mix-blend-color-dodge opacity-60"
          style={{
            background:
              'linear-gradient(115deg, transparent 20%, rgba(103, 232, 249, 0.25) 35%, rgba(255, 133, 179, 0.3) 50%, rgba(255, 216, 77, 0.35) 65%, transparent 80%)',
            backgroundSize: '200% 200%',
          }}
        />
      )}
    </div>
  );
};
