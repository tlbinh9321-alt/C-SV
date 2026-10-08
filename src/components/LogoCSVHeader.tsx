import React from 'react';

interface LogoCSVHeaderProps {
  className?: string;
}

export const LogoCSVHeader: React.FC<LogoCSVHeaderProps> = ({
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Top Banner: CHÀO! SINH VIÊN 2026 */}
      <span className="font-display font-black tracking-widest text-[#ff9e3b] text-xs sm:text-sm md:text-base uppercase drop-shadow-[0_2px_10px_rgba(255,158,59,0.55)] mb-0.5">
        CHÀO! SINH VIÊN 2026
      </span>

      {/* Main Title: STAR FINDER (matching download story image style) */}
      <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-amber-300 drop-shadow-[0_4px_25px_rgba(0,240,255,0.6)] my-0.5 sm:my-1">
        STAR FINDER
      </h1>

      {/* Subtitle Slogan: ✦ THEO ÁNH SAO – CHẠM KHÁT KHAO ✦ */}
      <span className="font-display font-extrabold tracking-[0.2em] text-[#ff9e3b] text-xs sm:text-sm md:text-base uppercase drop-shadow-[0_2px_10px_rgba(255,158,59,0.55)] mt-0.5">
        ✦ THEO ÁNH SAO – CHẠM KHÁT KHAO ✦
      </span>
    </div>
  );
};
