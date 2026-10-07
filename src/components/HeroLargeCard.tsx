import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { CardBack } from './CardBack';
import { soundEngine } from '../utils/audio';

interface HeroLargeCardProps {
  onClick: () => void;
  className?: string;
}

/**
 * HeroLargeCard
 * Replaces the fanned-out deck in the center with 1 single majestic, large cosmic card.
 * Features 3D interactive mouse tilt, holographic glare tracking, nebular aura glow, and floating idle motion.
 */
export const HeroLargeCard: React.FC<HeroLargeCardProps> = ({
  onClick,
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -14;
    const rotY = ((x - centerX) / centerX) * 14;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos({ x: 50, y: 50 });
  };

  const handleClick = () => {
    soundEngine.playSparkle();
    onClick();
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
      style={{ perspective: 1400 }}
    >
      {/* Background Multi-Layered Cosmic Aura */}
      <div className="absolute -inset-4 sm:-inset-8 pointer-events-none flex items-center justify-center">
        {/* Soft Cyan Bloom */}
        <div className="absolute w-72 h-80 sm:w-96 sm:h-[420px] rounded-full bg-cyan-400/25 blur-3xl transition-transform duration-700 scale-100 group-hover:scale-110" />
        {/* Magenta Nebula Bloom */}
        <div className="absolute w-64 h-72 sm:w-80 sm:h-96 rounded-full bg-pink-500/20 blur-3xl -translate-y-4" />
        {/* Golden Core Pulse */}
        <div className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-amber-400/20 blur-2xl animate-pulse" />
      </div>

      {/* Main 3D Card Shell */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        animate={
          isHovered
            ? {
                rotateX,
                rotateY,
                y: -8,
                scale: 1.03,
              }
            : {
                rotateX: 0,
                rotateY: 0,
                y: [0, -10, 0],
                scale: 1,
              }
        }
        transition={
          isHovered
            ? { type: 'spring', stiffness: 280, damping: 22 }
            : { repeat: Infinity, duration: 4.2, ease: 'easeInOut' }
        }
        style={{ transformStyle: 'preserve-3d' }}
        className="relative z-10 w-60 h-[370px] sm:w-72 sm:h-[440px] md:w-80 md:h-[490px] rounded-3xl p-[3px] cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_35px_rgba(0,240,255,0.35)]"
      >
        {/* Outer Iridescent Shimmer Border */}
        <div
          className="absolute inset-0 rounded-3xl transition-opacity duration-500 opacity-90 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(135deg, #00f0ff 0%, #ff85b3 35%, #ffd84d 70%, #00f0ff 100%)',
            boxShadow: '0 0 30px rgba(0,240,255,0.4)',
          }}
        />

        {/* Card Body - Displays Full Sacred Astrolabe CardBack */}
        <div className="relative w-full h-full rounded-[21px] overflow-hidden bg-[#070a24]">
          <CardBack size="xl" showHolo={true} />

          {/* Interactive Mouse Holographic Glare Sheen */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[21px] mix-blend-color-dodge transition-opacity duration-200"
            style={{
              opacity: isHovered ? 0.75 : 0.35,
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.7) 0%, rgba(103,232,249,0.3) 25%, rgba(255,133,179,0.2) 45%, transparent 65%)`,
            }}
          />

          {/* Subtle Outer Bevel Ring */}
          <div className="absolute inset-0 rounded-[21px] border border-white/20 pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
};
