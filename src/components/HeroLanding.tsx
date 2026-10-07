import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';
import { FloatingCosmicCardHero } from './FloatingCosmicCardHero';
import { LogoCSVHeader } from './LogoCSVHeader';
import { soundEngine } from '../utils/audio';

interface HeroLandingProps {
  onStartScan: () => void;
  onExploreUniverse: () => void;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  onStartScan,
  onExploreUniverse,
}) => {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between overflow-hidden px-4 sm:px-6 py-4 sm:py-8">
      {/* Central Hero Block */}
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center my-auto">
        {/* Top Brand Lockup directly matching user request and Image 1 */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <LogoCSVHeader />
        </motion.div>

        {/* Large Floating Cosmic Card Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="relative z-10 my-2"
        >
          <FloatingCosmicCardHero onStartScan={onStartScan} />
        </motion.div>

        {/* Inspirational Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto my-3 leading-relaxed font-normal"
        >
          Bạn đang bước vào một vũ trụ nơi một ngôi sao đang chờ đón bạn. Hãy rút lá bài định danh để chạm vào khát khao của riêng mình.
        </motion.p>

        {/* Primary CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-2 z-20"
        >
          {/* Main CTA */}
          <button
            onClick={() => {
              soundEngine.playSparkle();
              onStartScan();
            }}
            className="w-full sm:w-auto px-9 py-4 rounded-full font-black text-sm tracking-wider uppercase bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-slate-950 shadow-[0_0_30px_rgba(255,133,179,0.55)] hover:shadow-[0_0_45px_rgba(255,216,77,0.75)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
            <span>KHÁM PHÁ NGÔI SAO CỦA BẠN</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => {
              soundEngine.playSparkle();
              onExploreUniverse();
            }}
            className="w-full sm:w-auto px-7 py-4 rounded-full font-bold text-xs uppercase tracking-wider bg-white/5 hover:bg-white/10 text-cyan-200 hover:text-white border border-cyan-400/30 hover:border-cyan-400/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Xem 52 Chòm Sao C!SV</span>
          </button>
        </motion.div>

        {/* Small floating reassurance */}
        <div className="mt-6 text-xs text-slate-400 flex items-center gap-2">
          <span className="text-yellow-300">✦</span>
          <span>52 lá bài độc bản</span>
          <span>·</span>
          <span>8 nguồn năng lượng</span>
          <span>·</span>
          <span>Xuất ảnh Story 9:16 miễn phí</span>
          <span className="text-yellow-300">✦</span>
        </div>
      </div>
    </div>
  );
};
