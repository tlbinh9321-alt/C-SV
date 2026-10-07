import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { CardBack } from './CardBack';
import { StarCard } from './StarCard';
import { STAR_CARDS } from '../data/cards';
import { Sparkles, RotateCw } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface FloatingCosmicCardHeroProps {
  onStartScan: () => void;
  className?: string;
}

export const FloatingCosmicCardHero: React.FC<FloatingCosmicCardHeroProps> = ({
  onStartScan,
  className = '',
}) => {
  // isShowingFront: true = revealed StarCard; false = Astrolabe CardBack
  const [isShowingFront, setIsShowingFront] = useState(true);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const cardContainerRef = useRef<HTMLDivElement | null>(null);

  // Representative showcase card (THE COMET)
  const showcaseCard = STAR_CARDS[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardContainerRef.current) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
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

  const toggleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playPageFlip();
    setIsShowingFront((prev) => !prev);
  };

  return (
    <div className={`relative flex flex-col items-center justify-center my-1 ${className}`}>
      {/* Dynamic Ambient Nebular Glow */}
      <div className="absolute w-80 h-96 sm:w-[480px] sm:h-[560px] rounded-full bg-gradient-to-tr from-cyan-500/25 via-pink-500/20 to-amber-400/25 blur-3xl -z-10 pointer-events-none" />

      {/* Floating 3D Card Stage */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          rotateZ: [-0.8, 0.8, -0.8],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: 'easeInOut',
        }}
        className="relative cursor-pointer group"
        onClick={() => {
          soundEngine.playSparkle();
          onStartScan();
        }}
        style={{ perspective: 1200 }}
      >
        <div
          ref={cardContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-64 h-[390px] sm:w-76 sm:h-[460px] md:w-80 md:h-[490px] transition-transform duration-200 select-none"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          }}
        >
          {/* Outer Multi-color Radiant Border Frame */}
          <div className="absolute -inset-1.5 sm:-inset-2 rounded-[26px] bg-gradient-to-tr from-cyan-400 via-pink-400 to-amber-300 opacity-75 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-300 pointer-events-none" />

          {/* 3D Flip Card Container: rotates 0deg or 180deg */}
          <motion.div
            animate={{ rotateY: isShowingFront ? 0 : 180 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="w-full h-full relative rounded-2xl"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* FRONT FACE: StarCard (Facing front at 0deg) */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(0deg)',
              }}
            >
              <StarCard
                card={showcaseCard}
                isFlipped={true}
                interactive={false}
                size="lg"
                className="w-full h-full !rounded-2xl"
              />

              {/* Interactive glare overlay */}
              <div
                className="absolute inset-0 pointer-events-none rounded-2xl opacity-25 group-hover:opacity-50 transition-opacity mix-blend-color-dodge"
                style={{
                  background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.8) 0%, rgba(0,240,255,0.3) 30%, transparent 65%)`,
                }}
              />
            </div>

            {/* BACK FACE: Astrolabe Card Back (Facing backward at 180deg, un-mirrored with rotateY(180deg)) */}
            <div
              className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <CardBack size="lg" showHolo={true} />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Card Actions & Hint */}
      <div className="mt-5 flex items-center gap-3 z-20">
        <button
          onClick={toggleFlip}
          className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-cyan-200 border border-cyan-400/30 hover:border-cyan-400/60 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-md shadow-md"
        >
          <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
          <span>{isShowingFront ? 'Lật Mặt Sau Bộ Bài' : 'Lật Xem Lá Bài'}</span>
        </button>

        <span className="text-slate-400 text-xs hidden sm:inline">·</span>

        <span className="text-xs text-amber-200/90 font-medium flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          Chạm vào lá bài để rút lá bài của riêng bạn
        </span>
      </div>
    </div>
  );
};
