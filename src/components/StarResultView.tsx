import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Download, Share2, RotateCcw, Compass, Sparkles, Heart, Flame, Shield, Check } from 'lucide-react';
import { StarCardData } from '../types/card';
import { StarCard } from './StarCard';
import { Mascot } from './Mascot';
import { soundEngine } from '../utils/audio';

interface StarResultViewProps {
  card: StarCardData;
  onRedraw: () => void;
  onOpenStoryModal: () => void;
  onOpenUniverse: () => void;
}

export const StarResultView: React.FC<StarResultViewProps> = ({
  card,
  onRedraw,
  onOpenStoryModal,
  onOpenUniverse,
}) => {
  const [animatedStats, setAnimatedStats] = useState({
    starPower: 0,
    courage: 0,
    creativity: 0,
    connection: 0,
    adventure: 0,
    focus: 0,
  });

  const [copiedQuote, setCopiedQuote] = useState(false);

  // Count-up animation for stats
  useEffect(() => {
    const duration = 1200; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats({
        starPower: Math.floor(card.starPower * ease),
        courage: Math.floor(card.stats.courage * ease),
        creativity: Math.floor(card.stats.creativity * ease),
        connection: Math.floor(card.stats.connection * ease),
        adventure: Math.floor(card.stats.adventure * ease),
        focus: Math.floor(card.stats.focus * ease),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [card]);

  const handleCopyQuote = () => {
    soundEngine.playSparkle();
    const text = `🌟 C!SV STAR FINDER 2026: Mình đã rút được lá "${card.name} - ${card.constellation}"!\n\n"${card.destinyQuote}"\n\nTheo Ánh Sao – Chạm Khát Khao! ✨`;
    navigator.clipboard.writeText(text);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2400);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Top Banner Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Lá Bài Vũ Trụ Dành Riêng Cho Bạn</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-wide">
          NGÔI SAO CỦA BẠN
        </h1>
        <div className="text-lg sm:text-xl font-extrabold text-amber-300 mt-1 flex items-center justify-center gap-2">
          <span>{card.name}</span>
          <span>·</span>
          <span>{card.constellation}</span>
        </div>
      </motion.div>

      {/* Main Grid: Card on Left, Info & Stats on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
        {/* Left Column: 3D Hero Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col items-center justify-center relative"
        >
          {/* Reactive Mascot cheering next to card */}
          <div className="absolute -top-12 -right-4 z-20 hidden sm:block">
            <Mascot state="excited" size="sm" withSpeechBubble="Lá bài siêu đỉnh!" />
          </div>

          <StarCard
            card={card}
            isFlipped={true}
            interactive={true}
            size="lg"
            className="shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          />

          <p className="text-[11px] text-slate-400 mt-3 text-center">
            ✦ Rê chuột hoặc chạm nhẹ để nghiêng card 3D
          </p>
        </motion.div>

        {/* Right Column: Profile & Dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          {/* Destiny Quote Highlight Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900/90 to-purple-950/80 border border-cyan-400/30 backdrop-blur-md shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl" />
            <span className="text-[11px] font-bold tracking-widest text-cyan-300 uppercase block mb-1">
              THÔNG ĐIỆP TỪ ÁNH SAO
            </span>
            <blockquote className="text-base sm:text-lg font-bold text-white leading-relaxed italic">
              "{card.destinyQuote}"
            </blockquote>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {card.longMessage}
            </p>
          </div>

          {/* Star Profile Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">NĂNG LƯỢNG</span>
              <span className="text-xs sm:text-sm font-extrabold text-cyan-300 mt-0.5 block truncate">
                {card.energy}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">ĐỘ HIẾM</span>
              <span className="text-xs sm:text-sm font-extrabold text-pink-300 mt-0.5 block truncate">
                {card.rarity}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">TỪ KHÓA</span>
              <span className="text-xs sm:text-sm font-extrabold text-amber-300 mt-0.5 block truncate">
                {card.keyword}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">STAR POWER</span>
              <span className="text-xs sm:text-sm font-extrabold text-emerald-300 font-mono mt-0.5 block">
                {animatedStats.starPower}%
              </span>
            </div>
          </div>

          {/* Animated Stats Dashboard (Radial / Progress bars) */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold tracking-wider uppercase text-slate-300">
                BẢNG THÔNG SỐ VŨ TRỤ
              </span>
              <span className="text-xs text-amber-300 font-mono font-bold">
                ★ {animatedStats.starPower}/100
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Courage */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-rose-400" /> Can Đảm (Courage)
                  </span>
                  <span className="font-mono font-bold text-rose-300">{animatedStats.courage}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-pink-400 transition-all duration-300 rounded-full"
                    style={{ width: `${animatedStats.courage}%` }}
                  />
                </div>
              </div>

              {/* Creativity */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Sáng Tạo (Creativity)
                  </span>
                  <span className="font-mono font-bold text-yellow-300">{animatedStats.creativity}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-300 rounded-full"
                    style={{ width: `${animatedStats.creativity}%` }}
                  />
                </div>
              </div>

              {/* Connection */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-sky-400" /> Kết Nối (Connection)
                  </span>
                  <span className="font-mono font-bold text-sky-300">{animatedStats.connection}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-400 to-cyan-300 transition-all duration-300 rounded-full"
                    style={{ width: `${animatedStats.connection}%` }}
                  />
                </div>
              </div>

              {/* Adventure */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-teal-300" /> Dấn Thân (Adventure)
                  </span>
                  <span className="font-mono font-bold text-teal-300">{animatedStats.adventure}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 to-emerald-300 transition-all duration-300 rounded-full"
                    style={{ width: `${animatedStats.adventure}%` }}
                  />
                </div>
              </div>

              {/* Focus */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-purple-300" /> Kiên Định (Focus)
                  </span>
                  <span className="font-mono font-bold text-purple-300">{animatedStats.focus}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-400 to-indigo-400 transition-all duration-300 rounded-full"
                    style={{ width: `${animatedStats.focus}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Strengths, Challenges & Advice */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20">
              <span className="text-[10px] font-bold text-emerald-300 uppercase block mb-1">
                ✦ THẾ MẠNH CỦA BẠN
              </span>
              <p className="text-slate-200 font-medium">{card.strength}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/20">
              <span className="text-[10px] font-bold text-rose-300 uppercase block mb-1">
                ✦ THỬ THÁCH CẦN VƯỢT
              </span>
              <p className="text-slate-200 font-medium">{card.challenge}</p>
            </div>
          </div>

          {/* Advice card */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-yellow-400/20 text-xs">
            <span className="text-[10px] font-bold text-amber-300 uppercase block mb-1">
              ✦ LỜI NHẮN NHỦ CHO NĂM HỌC 2026
            </span>
            <p className="text-slate-200 leading-relaxed">{card.advice}</p>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-white/10"
      >
        {/* Download Story Button */}
        <button
          onClick={() => {
            soundEngine.playSparkle();
            onOpenStoryModal();
          }}
          className="px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-slate-950 shadow-[0_0_25px_rgba(255,133,179,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>TẢI STORY (1080×1920)</span>
        </button>

        {/* Copy Share Quote */}
        <button
          onClick={handleCopyQuote}
          className="px-5 py-3.5 rounded-full font-semibold text-xs sm:text-sm bg-white/10 hover:bg-white/15 text-white border border-white/15 hover:border-cyan-400/40 transition-all flex items-center gap-2 cursor-pointer"
        >
          {copiedQuote ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-cyan-300" />}
          <span>{copiedQuote ? 'ĐÃ SAO CHÉP!' : 'CHIA SẺ LỜI NHẮN'}</span>
        </button>

        {/* Re-draw Card */}
        <button
          onClick={() => {
            soundEngine.playPageFlip();
            onRedraw();
          }}
          className="px-5 py-3.5 rounded-full font-semibold text-xs sm:text-sm bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-pink-300" />
          <span>RÚT LẠI MỘT LÁ</span>
        </button>

        {/* Explore Universe */}
        <button
          onClick={() => {
            soundEngine.playSparkle();
            onOpenUniverse();
          }}
          className="px-5 py-3.5 rounded-full font-semibold text-xs sm:text-sm bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-400/30 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Compass className="w-4 h-4" />
          <span>VŨ TRỤ C!SV</span>
        </button>
      </motion.div>
    </div>
  );
};
