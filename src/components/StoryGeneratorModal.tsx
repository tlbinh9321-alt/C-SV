import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas';
import { Download, Share2, Copy, Check, X, Sparkles, Loader2 } from 'lucide-react';
import { StarCardData } from '../types/card';
import { soundEngine } from '../utils/audio';

interface StoryGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: StarCardData;
}

export const StoryGeneratorModal: React.FC<StoryGeneratorModalProps> = ({
  isOpen,
  onClose,
  card,
}) => {
  const storyCardRef = useRef<HTMLDivElement | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPNG = async () => {
    if (!storyCardRef.current || isExporting) return;
    setIsExporting(true);
    soundEngine.playSparkle();

    try {
      // High-resolution canvas render
      const canvas = await html2canvas(storyCardRef.current, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: '#070a1e',
        logging: false,
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `CSV_STAR_FINDER_${card.name.replace(/\s+/g, '_')}_2026.png`;
      link.click();
    } catch (err) {
      console.error('Failed to export Story image:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleNativeShare = async () => {
    soundEngine.playSparkle();
    const shareText = `🌟 Ngôi sao của mình là "${card.name} - ${card.constellation}" tại C!SV STAR FINDER 2026! ✨ "${card.destinyQuote}"`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'C!SV STAR FINDER 2026',
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {
        // User cancelled or not supported
      }
    }

    // Fallback: copy to clipboard
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyQuote = () => {
    soundEngine.playSparkle();
    navigator.clipboard.writeText(`"${card.destinyQuote}" - Lá bài ${card.name} (C!SV Star Finder 2026)`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-[#0a0f30] border border-cyan-400/30 rounded-3xl p-5 shadow-[0_0_50px_rgba(0,240,255,0.25)] flex flex-col items-center my-6"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NGÔI SAO NÀY LÀ CỦA BẠN ✦</span>
            </div>
            <h3 className="font-display font-black text-xl text-white">
              TẢI ẢNH STORY (9:16)
            </h3>
            <p className="text-xs text-slate-300">
              Sẵn sàng chia sẻ lên Instagram, Facebook Stories & TikTok
            </p>
          </div>

          {/* 9:16 Preview Card Container (Ready for html2canvas) */}
          <div className="w-full flex justify-center mb-5">
            <div
              ref={storyCardRef}
              style={{ width: '340px', height: '604px' }}
              className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#070a24] via-[#0b123d] to-[#060818] p-5 border border-cyan-400/40 shadow-2xl flex flex-col justify-between text-white select-none"
            >
              {/* Background Nebulae & Stars in Story export */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-10 left-0 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-300/10 rounded-full blur-3xl pointer-events-none" />

              {/* Story Header Branding */}
              <div className="relative z-10 text-center border-b border-white/10 pb-3">
                <div className="text-[10px] font-extrabold tracking-widest text-pink-300 uppercase">
                  CHƯƠNG TRÌNH CHÀO! SINH VIÊN 2026
                </div>
                <div className="font-display font-black text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-amber-300 mt-0.5">
                  C!SV STAR FINDER
                </div>
                <div className="text-[9px] font-semibold tracking-widest text-cyan-200 mt-0.5">
                  THEO ÁNH SAO – CHẠM KHÁT KHAO
                </div>
              </div>

              {/* Story Center: Card Emblem & Constellation */}
              <div className="relative z-10 flex flex-col items-center my-auto py-2">
                {/* Rarity & Star Power Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-pink-500/30 border border-pink-400/40 text-[10px] font-bold text-pink-200 uppercase">
                    {card.rarity}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/30 border border-amber-400/40 text-[10px] font-bold text-yellow-300 font-mono">
                    ★ {card.starPower}% STAR POWER
                  </span>
                </div>

                {/* Card Artwork Frame */}
                <div className="w-28 h-28 rounded-2xl bg-white/10 border-2 border-cyan-400/60 shadow-[0_0_25px_rgba(0,240,255,0.4)] flex flex-col items-center justify-center p-3 mb-3 relative">
                  <span className="text-4xl filter drop-shadow-[0_0_10px_#fff]">✦</span>
                  <div className="absolute inset-2 border border-dashed border-white/30 rounded-xl" />
                </div>

                <div className="text-[10px] tracking-widest uppercase text-cyan-300 font-bold">
                  CHÒM SAO {card.constellation.toUpperCase()}
                </div>
                <h4 className="font-display font-black text-2xl text-white tracking-wide mt-0.5">
                  {card.name}
                </h4>
                <div className="text-[11px] font-extrabold text-amber-300 mt-1 uppercase tracking-wider">
                  ✦ {card.keyword} ✦
                </div>

                {/* Destiny Quote */}
                <div className="mt-3 p-3 rounded-xl bg-white/10 border border-white/10 text-center max-w-[290px]">
                  <p className="text-xs font-semibold text-white italic leading-snug">
                    "{card.destinyQuote}"
                  </p>
                </div>

                {/* Mini Stats Row */}
                <div className="grid grid-cols-3 gap-2 w-full mt-3 text-center">
                  <div className="p-1.5 rounded-lg bg-black/30 border border-white/5">
                    <span className="text-[8px] text-slate-400 block">CAN ĐẢM</span>
                    <span className="text-[11px] font-bold font-mono text-rose-300">{card.stats.courage}%</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-black/30 border border-white/5">
                    <span className="text-[8px] text-slate-400 block">SÁNG TẠO</span>
                    <span className="text-[11px] font-bold font-mono text-yellow-300">{card.stats.creativity}%</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-black/30 border border-white/5">
                    <span className="text-[8px] text-slate-400 block">DẤN THÂN</span>
                    <span className="text-[11px] font-bold font-mono text-cyan-300">{card.stats.adventure}%</span>
                  </div>
                </div>
              </div>

              {/* Story Footer */}
              <div className="relative z-10 text-center border-t border-white/10 pt-2 flex items-center justify-between text-[9px] text-slate-300">
                <span className="font-bold text-cyan-300">#CSV2026</span>
                <span>CHÀO! SINH VIÊN 2026</span>
                <span className="font-bold text-pink-300">#STARFINDER</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="w-full flex flex-col sm:flex-row items-center gap-2.5">
            <button
              onClick={handleDownloadPNG}
              disabled={isExporting}
              className="w-full sm:flex-1 py-3 px-4 rounded-full font-bold text-xs tracking-wider uppercase bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-slate-950 shadow-[0_0_20px_rgba(255,133,179,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>ĐANG XUẤT ẢNH...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>TẢI PNG CHẤT LƯỢNG CAO</span>
                </>
              )}
            </button>

            <button
              onClick={handleNativeShare}
              className="w-full sm:w-auto py-3 px-4 rounded-full font-semibold text-xs bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-cyan-300" />
              <span>CHIA SẺ</span>
            </button>

            <button
              onClick={handleCopyQuote}
              className="w-full sm:w-auto py-3 px-4 rounded-full font-semibold text-xs bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-300" />}
              <span>{copied ? 'ĐÃ COPY' : 'COPY'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
