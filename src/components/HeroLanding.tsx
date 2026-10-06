import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';
import { StarFinderHeroLogo } from './StarFinderHeroLogo';
import { MagicNotebook } from './MagicNotebook';
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
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between overflow-hidden px-4 sm:px-6 py-6 sm:py-10">
      {/* Central Hero Block */}
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center my-auto">
        {/* Top Kicker Label */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/35 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(0,240,255,0.25)]"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>CHƯƠNG TRÌNH CHÀO! SINH VIÊN 2026</span>
          <span className="text-yellow-300">✦</span>
        </motion.div>

        {/* --- Image 1 Feature: Authentic 3D Star Finder Key Visual --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mb-4 cursor-pointer"
          onClick={() => {
            soundEngine.playSparkle();
            onStartScan();
          }}
        >
          <StarFinderHeroLogo />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-6 leading-relaxed font-normal"
        >
          Bạn đang bước vào một vũ trụ nơi một ngôi sao đang chờ đón bạn. Hãy mở cuốn sổ kỳ diệu để tìm thấy thông điệp định danh của riêng mình.
        </motion.p>

        {/* Central Visual: The Magic Pastel Pink Notebook with Peeking Mascot */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative my-1 sm:my-3"
        >
          <MagicNotebook
            isOpen={false}
            isShuffling={false}
            onDrawClick={() => {
              soundEngine.playSparkle();
              onStartScan();
            }}
            showDrawButton={false}
            peekMascot={false}
          />
        </motion.div>

        {/* Primary CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-6 z-20"
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
        <div className="mt-8 text-xs text-slate-400 flex items-center gap-2">
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
