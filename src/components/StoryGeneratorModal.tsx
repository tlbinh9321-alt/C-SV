import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toPng } from 'html-to-image';
import { Download, Share2, Copy, Check, X, Sparkles, Loader2, Heart, Flame, Compass, Shield } from 'lucide-react';
import { StarCardData } from '../types/card';
import { Mascot } from './Mascot';
import { LogoCSV } from './LogoCSV';
import { ConstellationArt } from './ConstellationArt';
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
  const [exportError, setExportError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownloadPNG = async () => {
    if (!storyCardRef.current || isExporting) return;
    setIsExporting(true);
    setExportError(null);
    soundEngine.playSparkle();

    try {
      // High-resolution canvas render using native browser SVG foreignObject
      // skipFonts: true completely skips embed-webfonts, avoiding cross-origin cssRules SecurityError
      const image = await toPng(storyCardRef.current, {
        pixelRatio: 2.6,
        backgroundColor: '#070a24',
        cacheBust: true,
        skipFonts: true,
        fontEmbedCSS: '',
      });

      if (!image) {
        throw new Error('Không thể tạo file ảnh từ thẻ bài');
      }

      const link = document.createElement('a');
      link.href = image;
      link.download = `CSV_STAR_FINDER_${card.name.replace(/\s+/g, '_')}_2026.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      soundEngine.playSparkle();
    } catch (err) {
      console.error('Failed to export Story image:', err);
      setExportError('Chưa thể xuất ảnh tự động. Bạn có thể chụp màn hình hoặc thử lại.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleNativeShare = async () => {
    soundEngine.playSparkle();
    const shareText = `🌟 Ngôi sao của mình là "${card.name} - ${card.constellation}" tại C!SV STAR FINDER 2026! ✨\n\n"${card.destinyQuote}"\n\nTheo Ánh Sao – Chạm Khát Khao!`;

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

    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleCopyQuote = () => {
    soundEngine.playSparkle();
    const fullMessage = `✦ C!SV STAR FINDER 2026 ✦\nLá bài: ${card.name} (${card.constellation})\n\n"${card.destinyQuote}"\n\nLời nhắn gửi: ${card.longMessage}\nLời khuyên: ${card.advice}\n\n#CSV2026 #StarFinder #TheoAnhSaoChamKhatKhao`;
    navigator.clipboard.writeText(fullMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-xl bg-[#0a0f30] border border-cyan-400/35 rounded-3xl p-4 sm:p-6 shadow-[0_0_50px_rgba(0,240,255,0.3)] flex flex-col items-center my-4"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer z-20"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NGÔI SAO NÀY LÀ CỦA BẠN ✦</span>
            </div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-white">
              ẢNH STORY ĐỒNG BỘ 1080×1920
            </h3>
            <p className="text-xs text-slate-300">
              Bao gồm đầy đủ lá bài định danh, thông điệp truyền cảm hứng & bảng chỉ số
            </p>
          </div>

          {/* 9:16 Story Card Container (Target of html2canvas) */}
          <div className="w-full flex justify-center mb-5 max-h-[66vh] overflow-y-auto py-1">
            <div
              ref={storyCardRef}
              style={{ width: '380px' }}
              className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#070a24] via-[#09103c] to-[#05071a] p-5 border-2 border-cyan-400/50 shadow-2xl flex flex-col justify-between text-white select-none shrink-0"
            >
              {/* 2D Cartoon Background Clouds & Glowing Stardust inside Export Frame */}
              <div
                className="absolute top-0 left-0 right-0 h-28 pointer-events-none opacity-40"
                style={{
                  background: 'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(255,133,179,0.5), rgba(255,216,77,0.3), transparent 75%)',
                }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none opacity-40"
                style={{
                  background: 'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(0,240,255,0.4), rgba(255,133,179,0.25), transparent 75%)',
                }}
              />

              {/* Top Header Branding: Chào! Sinh Viên 2026, STAR FINDER, Theo ánh sao - Chạm Khát Khao */}
              <div className="relative z-10 flex flex-col items-center border-b border-white/15 pb-2.5 pt-1">
                <span className="text-[10px] font-black tracking-widest text-[#ff9e3b] uppercase mb-0.5 drop-shadow-[0_1px_6px_rgba(255,158,59,0.5)]">
                  CHÀO! SINH VIÊN 2026
                </span>
                <h2 className="font-display font-black text-xl sm:text-2xl tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-amber-300 drop-shadow-[0_2px_12px_rgba(0,240,255,0.6)] my-0.5">
                  STAR FINDER
                </h2>
                <span className="text-[9px] font-extrabold tracking-[0.2em] text-[#ff9e3b] uppercase mt-0.5 drop-shadow-[0_1px_6px_rgba(255,158,59,0.5)]">
                  ✦ THEO ÁNH SAO – CHẠM KHÁT KHAO ✦
                </span>
              </div>

              {/* Synchronized Card Visual Section */}
              <div className="relative z-10 flex flex-col items-center my-3">
                {/* Cute Mascot sitting atop the card */}
                <div className="relative -mb-3 z-20">
                  <Mascot state="idle" size="sm" />
                </div>

                {/* The Synchronized Mini Card Art */}
                <div
                  className="w-56 rounded-2xl p-[2px] shadow-[0_10px_30px_rgba(0,0,0,0.7)] relative"
                  style={{
                    background: `linear-gradient(135deg, ${card.colors.primary}, ${card.colors.glow}, ${card.colors.secondary})`,
                  }}
                >
                  <div className="w-full rounded-[14px] bg-[#090d29] p-3 flex flex-col items-center text-center border border-white/10">
                    {/* Card Header */}
                    <div className="w-full flex items-center justify-between text-[10px] font-mono mb-2">
                      <span className="text-cyan-300 font-bold">
                        #{card.id < 10 ? `0${card.id}` : card.id} · {card.rarity.toUpperCase()}
                      </span>
                      <span className="text-yellow-300 font-bold">
                        ★ {card.starPower}%
                      </span>
                    </div>

                    {/* Card Constellation Diagram */}
                    <div className="w-20 h-20 rounded-xl bg-white/[0.04] border border-white/15 flex items-center justify-center p-1.5 mb-2 relative shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]">
                      <ConstellationArt
                        motif={card.illustrationMotif}
                        cardId={card.id}
                        glowColor={card.colors.glow}
                        primaryColor={card.colors.primary}
                        size="sm"
                      />
                    </div>

                    <span className="text-[9px] font-bold uppercase tracking-widest text-cyan-300">
                      CHÒM SAO {card.constellation.toUpperCase()}
                    </span>
                    <h4 className="font-display font-black text-lg text-white mt-0.5 tracking-wide">
                      {card.name}
                    </h4>
                    <span className="text-[10px] font-black uppercase text-amber-300 mt-0.5 tracking-wider">
                      ✦ {card.keyword} ✦
                    </span>
                  </div>
                </div>
              </div>

              {/* --- PHẦN THÔNG ĐIỆP ĐỒNG BỘ ĐẦY ĐỦ (MAIN MESSAGE SECTION) --- */}
              <div className="relative z-10 space-y-2.5 my-2">
                {/* 1. Main Destiny Quote (Thông điệp chính) */}
                <div className="p-3.5 rounded-2xl bg-white/10 border border-cyan-400/40 text-center relative overflow-hidden">
                  <span className="text-[9px] font-black tracking-widest text-cyan-300 uppercase block mb-1">
                    ✦ THÔNG ĐIỆP TỪ ÁNH SAO ✦
                  </span>
                  <blockquote className="text-xs sm:text-sm font-extrabold text-white leading-snug italic">
                    "{card.destinyQuote}"
                  </blockquote>
                </div>

                {/* 2. Lời nhắn gửi từ ngôi sao (Inspiring student message) */}
                <div className="p-3 rounded-xl bg-indigo-950/60 border border-white/10 text-center">
                  <span className="text-[9px] font-bold text-amber-300 uppercase block mb-0.5">
                    ĐIỀU NGÔI SAO MUỐN NHẮN BẠN:
                  </span>
                  <p className="text-[11px] text-slate-200 leading-relaxed font-medium">
                    {card.longMessage}
                  </p>
                </div>

                {/* 3. Lời khuyên cho năm học 2026 */}
                <div className="p-2.5 rounded-xl bg-amber-950/40 border border-yellow-400/25 text-center">
                  <span className="text-[9px] font-bold text-yellow-300 uppercase block mb-0.5">
                    LỜI KHUYÊN DÀNH CHO BẠN:
                  </span>
                  <p className="text-[10px] text-amber-100 leading-snug">
                    {card.advice}
                  </p>
                </div>

                {/* 4. Mini Stats Row (Chỉ số đồng bộ) */}
                <div className="grid grid-cols-5 gap-1.5 text-center">
                  <div className="p-1 rounded-lg bg-black/35 border border-white/5">
                    <span className="text-[7.5px] text-slate-400 block font-bold">CAN ĐẢM</span>
                    <span className="text-[10px] font-bold font-mono text-rose-300">{card.stats.courage}%</span>
                  </div>
                  <div className="p-1 rounded-lg bg-black/35 border border-white/5">
                    <span className="text-[7.5px] text-slate-400 block font-bold">SÁNG TẠO</span>
                    <span className="text-[10px] font-bold font-mono text-yellow-300">{card.stats.creativity}%</span>
                  </div>
                  <div className="p-1 rounded-lg bg-black/35 border border-white/5">
                    <span className="text-[7.5px] text-slate-400 block font-bold">KẾT NỐI</span>
                    <span className="text-[10px] font-bold font-mono text-sky-300">{card.stats.connection}%</span>
                  </div>
                  <div className="p-1 rounded-lg bg-black/35 border border-white/5">
                    <span className="text-[7.5px] text-slate-400 block font-bold">DẤN THÂN</span>
                    <span className="text-[10px] font-bold font-mono text-teal-300">{card.stats.adventure}%</span>
                  </div>
                  <div className="p-1 rounded-lg bg-black/35 border border-white/5">
                    <span className="text-[7.5px] text-slate-400 block font-bold">KIÊN ĐỊNH</span>
                    <span className="text-[10px] font-bold font-mono text-purple-300">{card.stats.focus}%</span>
                  </div>
                </div>
              </div>

              {/* Story Footer */}
              <div className="relative z-10 text-center border-t border-white/15 pt-2.5 flex items-center justify-between text-[9px] text-slate-300">
                <span className="font-bold text-cyan-300">#CSV2026</span>
                <span className="font-semibold text-amber-200">CHÀO! SINH VIÊN 2026</span>
                <span className="font-bold text-pink-300">#STARFINDER</span>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="w-full flex flex-col sm:flex-row items-center gap-2.5 pt-2">
            <button
              onClick={handleDownloadPNG}
              disabled={isExporting}
              className="w-full sm:flex-1 py-3.5 px-5 rounded-full font-black text-xs sm:text-sm tracking-wider uppercase bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-slate-950 shadow-[0_0_25px_rgba(255,133,179,0.55)] hover:shadow-[0_0_35px_rgba(255,216,77,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>ĐANG TẢI VỀ ẢNH...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>TẢI ẢNH ĐỒNG BỘ (PNG 1080×1920)</span>
                </>
              )}
            </button>

            <button
              onClick={handleNativeShare}
              className="w-full sm:w-auto py-3 px-4 rounded-full font-bold text-xs bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-cyan-300" />
              <span>CHIA SẺ</span>
            </button>

            <button
              onClick={handleCopyQuote}
              className="w-full sm:w-auto py-3 px-4 rounded-full font-bold text-xs bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-300" />}
              <span>{copied ? 'ĐÃ COPY' : 'COPY THÔNG ĐIỆP'}</span>
            </button>
          </div>

          {exportError && (
            <div className="mt-3 p-2.5 rounded-xl bg-rose-950/80 border border-rose-400/40 text-[11px] text-rose-200 text-center w-full">
              {exportError}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
