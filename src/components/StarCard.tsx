import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { StarCardData } from '../types/card';
import { Mascot } from './Mascot';
import { ConstellationArt } from './ConstellationArt';
import { CardBack } from './CardBack';

interface StarCardProps {
  card: StarCardData;
  isFlipped?: boolean; // false = back, true = front (default true)
  interactive?: boolean; // 3D tilt on mouse hover
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  showHolo?: boolean;
  isLocked?: boolean;
}

export const StarCard: React.FC<StarCardProps> = ({
  card,
  isFlipped = true,
  interactive = true,
  size = 'lg',
  className = '',
  onClick,
  showHolo = true,
  isLocked = false,
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Mouse move handler for 3D tilt & holographic sheen
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos({ x: 50, y: 50 });
  };

  const sizeClasses = {
    xs: 'w-full aspect-[2/3] max-w-[210px] text-[10px]',
    sm: 'w-44 h-64 text-xs',
    md: 'w-56 h-80 text-sm',
    lg: 'w-72 h-[410px] text-base',
    xl: 'w-84 h-[480px] text-lg',
  }[size];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ perspective: 1200 }}
      className={`relative select-none ${sizeClasses} ${className} cursor-pointer`}
    >
      <motion.div
        animate={{
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full relative rounded-2xl p-[3px] shadow-[0_15px_35px_rgba(0,0,0,0.6)] group"
      >
        {/* Glowing border gradient */}
        <div
          className="absolute inset-0 rounded-2xl transition-all duration-300 group-hover:opacity-100 opacity-80"
          style={{
            background: `linear-gradient(135deg, ${card.colors.primary}, ${card.colors.glow}, ${card.colors.secondary})`,
            boxShadow: `0 0 25px ${card.colors.glow}44`,
          }}
        />

        {/* Card Body */}
        <div className={`relative w-full h-full rounded-[14px] bg-[#090d29] overflow-hidden flex flex-col justify-between ${size === 'xs' ? 'p-2.5' : 'p-4'} z-10 border border-white/10`}>
          {isFlipped ? (
            /* FRONT OF CARD */
            <>
              {/* Card Header */}
              <div className="flex items-center justify-between text-xs tracking-wider z-10">
                <div className="flex items-center gap-1.5 font-bold text-white/90">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className={`font-mono text-cyan-300 ${size === 'xs' ? 'text-[9.5px]' : 'text-[11px]'}`}>
                    #{card.id < 10 ? `0${card.id}` : card.id}
                  </span>
                  <span className="text-white/40">/</span>
                  <span className={`text-pink-300 font-semibold uppercase ${size === 'xs' ? 'text-[8.5px]' : 'text-[10px]'}`}>
                    {card.rarity}
                  </span>
                </div>

                <div className={`flex items-center gap-1 font-bold text-yellow-300 ${size === 'xs' ? 'text-[9.5px]' : 'text-[11px]'}`}>
                  <span>★</span>
                  <span className="font-mono">{card.starPower}%</span>
                </div>
              </div>

              {/* Constellation Art Centerpiece */}
              <div className="relative flex-1 my-1 flex flex-col items-center justify-center z-10 overflow-hidden">
                {/* Background Constellation Geometric Rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className={`${size === 'xs' ? 'w-20 h-20' : 'w-32 h-32'} rounded-full border border-dashed border-white/15 animate-spin`}
                    style={{ animationDuration: '35s' }}
                  />
                  <div className={`${size === 'xs' ? 'w-14 h-14' : 'w-24 h-24'} rounded-full border border-white/10`} />
                  <div
                    className={`absolute ${size === 'xs' ? 'w-24 h-24' : 'w-40 h-40'} rounded-full`}
                    style={{
                      background: `radial-gradient(circle, ${card.colors.glow}25 0%, transparent 70%)`,
                    }}
                  />
                </div>

                {/* Main Constellation Diagram */}
                <div className={`relative z-10 ${size === 'xs' ? 'p-1' : 'p-2 sm:p-3'} rounded-2xl bg-white/[0.04] backdrop-blur-xs border border-white/10 flex items-center justify-center shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]`}>
                  <ConstellationArt
                    motif={card.illustrationMotif}
                    cardId={card.id}
                    glowColor={card.colors.glow}
                    primaryColor={card.colors.primary}
                    size={size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : 'md'}
                  />
                </div>

                {/* Constellation Tag */}
                <div className={`${size === 'xs' ? 'mt-1' : 'mt-3'} text-center`}>
                  <span className={`font-bold tracking-widest text-cyan-300 uppercase block ${size === 'xs' ? 'text-[8.5px]' : 'text-[10px]'}`}>
                    CHÒM SAO
                  </span>
                  <span className={`font-extrabold text-white tracking-wide ${size === 'xs' ? 'text-xs line-clamp-1' : 'text-sm'}`}>
                    {card.constellation}
                  </span>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className={`relative z-10 ${size === 'xs' ? 'pt-1.5' : 'pt-2'} border-t border-white/10 text-center`}>
                <div className={`tracking-widest text-amber-300 font-bold uppercase mb-0.5 ${size === 'xs' ? 'text-[8.5px]' : 'text-[10px]'}`}>
                  ✦ {card.keyword} ✦
                </div>
                <h3 className={`font-display font-black text-white leading-tight tracking-wide ${size === 'xs' ? 'text-sm line-clamp-1' : 'text-lg'}`}>
                  {card.name}
                </h3>
                {size !== 'xs' && (
                  <p className="text-[11px] text-slate-300 line-clamp-2 mt-1 leading-snug italic font-normal">
                    "{card.shortMessage}"
                  </p>
                )}

                {/* Tiny C!SV Watermark at bottom */}
                {size !== 'xs' && (
                  <div className="mt-2 text-[9px] font-extrabold tracking-widest text-white/40 flex items-center justify-center gap-1">
                    <span>C!SV 2026</span>
                    <span>·</span>
                    <span>STAR FINDER</span>
                  </div>
                )}
              </div>

              {/* Locked Overlay if not yet discovered */}
              {isLocked && (
                <div className="absolute inset-0 bg-[#05081f]/75 backdrop-blur-[2px] flex flex-col items-center justify-center z-30 p-2 text-center">
                  <div className="w-8 h-8 rounded-full bg-slate-800/90 border border-white/20 flex items-center justify-center mb-1 text-slate-300">
                    <span className="text-xs">🔒</span>
                  </div>
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-wider">
                    Chưa Thắp Sáng
                  </span>
                </div>
              )}
            </>
          ) : (
            /* VIBRANT 3D HOLOGRAPHIC CARD BACK */
            <CardBack size={size} showHolo={showHolo} />
          )}

          {/* Holographic light sheen overlay */}
          {showHolo && (
            <div
              className="absolute inset-0 pointer-events-none rounded-[14px] mix-blend-color-dodge transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.45) 0%, rgba(0,240,255,0.2) 30%, rgba(255,133,179,0.15) 60%, transparent 80%)`,
                opacity: interactive ? 0.75 : 0.3,
              }}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};
