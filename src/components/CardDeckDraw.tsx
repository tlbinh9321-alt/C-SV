import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { StarCardData } from '../types/card';
import { STAR_CARDS } from '../data/cards';
import { StarCard } from './StarCard';
import { Mascot } from './Mascot';
import { CardBack } from './CardBack';
import { soundEngine } from '../utils/audio';
import { Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

interface CardDeckDrawProps {
  onCardDrawn: (card: StarCardData) => void;
  previouslyDrawnIds?: number[];
}

export const CardDeckDraw: React.FC<CardDeckDrawProps> = ({
  onCardDrawn,
  previouslyDrawnIds = [],
}) => {
  // Sequence stages:
  // 1. 'fanned': Các lá bài xòe ra hình quạt sẵn sàng
  // 2. 'orbiting': Các lá bài xoay tròn thành vòng xoay vũ trụ 3D
  // 3. 'drawing': 1 lá bài tách ra và lướt thẳng vào trung tâm
  // 4. 'revealed': Lá bài lật 3D mượt mà, tỏa sáng hào quang và bung nở thông điệp
  const [stage, setStage] = useState<'fanned' | 'orbiting' | 'drawing' | 'revealed'>('fanned');
  const [selectedCard, setSelectedCard] = useState<StarCardData | null>(null);
  const [orbitAngle, setOrbitAngle] = useState(0);

  // Number of visual cards in the cosmic deck
  const deckCardsCount = 10;
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Orbit animation loop when in 'orbiting' stage
  useEffect(() => {
    let animId: number;
    if (stage === 'orbiting') {
      const startTime = performance.now();
      const updateOrbit = (now: number) => {
        const elapsed = (now - startTime) / 1000;
        // Smoothly accelerate then spin steadily
        const speed = Math.min(elapsed * 120, 260);
        setOrbitAngle((prev) => (prev + speed * 0.016) % 360);
        animId = requestAnimationFrame(updateOrbit);
      };
      animId = requestAnimationFrame(updateOrbit);
    }
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [stage]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
    };
  }, []);

  const handleStartDraw = () => {
    if (stage !== 'fanned') return;

    // Pick target card from undrawn pool or all cards
    let pool = STAR_CARDS.filter((c) => !previouslyDrawnIds.includes(c.id));
    if (pool.length === 0) pool = [...STAR_CARDS];
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    setSelectedCard(chosen);

    // ==========================================
    // BƯỚC 1 -> BƯỚC 2: XÒE RA -> XOAY TRÒN (2s)
    // ==========================================
    soundEngine.playCardShuffle();
    setStage('orbiting');

    // ==========================================
    // BƯỚC 2 -> BƯỚC 3: XOAY TRÒN -> RÚT RA 1 LÁ (1.8s)
    // ==========================================
    setTimeout(() => {
      setStage('drawing');
      soundEngine.playSparkle();

      // ==========================================
      // BƯỚC 3 -> BƯỚC 4: LẬT BÀI 3D MƯỢT MÀ & TỎA SÁNG
      // ==========================================
      setTimeout(() => {
        setStage('revealed');
        soundEngine.playCardReveal();

        try {
          confetti({
            particleCount: 65,
            spread: 80,
            origin: { y: 0.52 },
            colors: ['#00f0ff', '#ffd84d', '#ff85b3', '#a78bfa', '#ffffff'],
          });
        } catch {
          // Ignore
        }
      }, 950);
    }, 2200);
  };

  const handleProceedToResult = () => {
    if (selectedCard) {
      soundEngine.playSparkle();
      onCardDrawn(selectedCard);
    }
  };

  const handleRedraw = () => {
    soundEngine.playSparkle();
    setStage('fanned');
    setSelectedCard(null);
  };

  return (
    <div className="relative min-h-[calc(100vh-6rem)] w-full flex flex-col items-center justify-between py-4 sm:py-6 px-4 overflow-hidden select-none">
      {/* 1. Header Section: Clear, non-overlapping spacing */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center z-20 max-w-xl mx-auto mb-2 shrink-0"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/35 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-1.5 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {stage === 'fanned' && 'BỘ BÀI VŨ TRỤ 52 CHÒM SAO C!SV'}
            {stage === 'orbiting' && 'VÒNG QUAY CHIÊM TINH ĐANG KHỞI ĐỘNG'}
            {stage === 'drawing' && 'ĐANG KẾT NỐI VỚI NGÔI SAO ĐỊNH DANH'}
            {stage === 'revealed' && 'NGÔI SAO CỦA BẠN ĐÃ TỎA SÁNG'}
          </span>
        </div>

        <h2 className="font-display font-black text-xl sm:text-3xl text-white tracking-wide">
          {stage === 'fanned' && 'CHẠM ĐỂ RÚT LÁ BÀI CỦA BẠN'}
          {stage === 'orbiting' && 'CÁC VÌ TINH TÚ ĐANG HỘI TỤ...'}
          {stage === 'drawing' && 'LÁ BÀI ĐANG TIẾN VỀ PHÍA BẠN...'}
          {stage === 'revealed' && (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-cyan-300">
              LÁ BÀI ĐỊNH DANH CỦA BẠN
            </span>
          )}
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
          {stage === 'fanned' && '52 lá bài đang xòe ra trên bầu trời đêm. Hãy kích hoạt để tìm thấy nguồn năng lượng của riêng bạn.'}
          {stage === 'orbiting' && 'Vòng quay đang cộng hưởng cùng tần số năng lượng của bạn...'}
          {stage === 'drawing' && 'Ngôi sao tương thích nhất đang tách khỏi quỹ đạo và đáp xuống...'}
          {stage === 'revealed' && 'Vũ trụ đã gửi gắm thông điệp dành riêng cho bạn trong năm học 2026.'}
        </p>
      </motion.div>

      {/* 2. Center Stage Arena */}
      <div className="relative w-full max-w-3xl flex-1 flex flex-col items-center justify-center my-auto min-h-[360px] sm:min-h-[440px]">
        {/* Ambient Cosmic Vortex Glow */}
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-amber-300/25 blur-3xl pointer-events-none" />

        {/* Mascot Peeking Safely to the upper-right without collision */}
        <div className="absolute top-0 right-2 sm:right-8 z-30 pointer-events-none hidden xs:block">
          <Mascot
            state={stage === 'revealed' ? 'celebrating' : stage === 'orbiting' ? 'scanning' : 'idle'}
            size="sm"
            withSpeechBubble={
              stage === 'fanned'
                ? 'Chạm để rút lá bài nhé!'
                : stage === 'orbiting'
                ? 'Các vì sao đang xoay!'
                : stage === 'drawing'
                ? 'Lá bài tới rồi!'
                : 'Thật tuyệt vời!'
            }
          />
        </div>

        {/* ============================================================ */}
        {/* PHASE 1 & 2: CARDS FANNED OUT -> CARDS ORBITING IN A CIRCLE */}
        {/* ============================================================ */}
        {(stage === 'fanned' || stage === 'orbiting') && (
          <div
            className="relative w-full h-[320px] sm:h-[360px] flex items-center justify-center cursor-pointer"
            onClick={handleStartDraw}
          >
            {Array.from({ length: deckCardsCount }).map((_, index) => {
              // 1. In 'fanned' mode: an elegant, harmonious fan arc
              const centerIdx = (deckCardsCount - 1) / 2;
              const diffFromCenter = index - centerIdx;
              const fannedAngle = diffFromCenter * 8.5; // Fan spread angle
              const fannedX = diffFromCenter * 32; // Horizontal offset
              const fannedY = Math.abs(diffFromCenter) * 5; // Arc downward curvature

              // 2. In 'orbiting' mode: 3D circular wheel / vortex
              const baseAngleDeg = index * (360 / deckCardsCount);
              const rad = ((baseAngleDeg + orbitAngle) * Math.PI) / 180;
              const orbitRadiusX = 155;
              const orbitRadiusY = 65;
              const orbitX = Math.cos(rad) * orbitRadiusX;
              const orbitY = Math.sin(rad) * orbitRadiusY;
              const orbitScale = 0.82 + (Math.sin(rad) + 1) * 0.18;
              const orbitZIndex = Math.round((Math.sin(rad) + 1) * 15);
              const cardTilt = Math.sin(rad) * 15;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={
                    stage === 'fanned'
                      ? {
                          opacity: 1,
                          x: fannedX,
                          y: fannedY,
                          rotate: fannedAngle,
                          scale: 1,
                          zIndex: 10 + index,
                        }
                      : {
                          opacity: 1,
                          x: orbitX,
                          y: orbitY,
                          rotate: cardTilt,
                          scale: orbitScale,
                          zIndex: orbitZIndex,
                        }
                  }
                  transition={{
                    type: 'spring',
                    stiffness: stage === 'fanned' ? 220 : 320,
                    damping: 24,
                  }}
                  className="absolute w-24 h-36 sm:w-28 sm:h-42 rounded-2xl p-[2px] shadow-[0_12px_32px_rgba(0,0,0,0.7)] select-none group"
                  style={{
                    background: 'linear-gradient(135deg, #00f0ff, #ff85b3, #ffd84d)',
                  }}
                >
                  {/* Vibrant 3D Holographic Cosmic Card Back */}
                  <CardBack size="sm" showHolo={true} />
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ============================================================ */}
        {/* PHASE 3 & 4: ONE CARD PULLS OUT -> SMOOTH 3D FLIP REVEAL    */}
        {/* ============================================================ */}
        <AnimatePresence>
          {(stage === 'drawing' || stage === 'revealed') && selectedCard && (
            <motion.div
              key="pulled-card"
              initial={{
                opacity: 0,
                scale: 0.35,
                y: 80,
                rotateY: 180,
                rotateZ: -10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotateY: stage === 'revealed' ? 0 : 180,
                rotateZ: 0,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                type: 'spring',
                stiffness: 130,
                damping: 18,
                mass: 0.9,
              }}
              style={{ perspective: 1500 }}
              className="relative z-40 flex flex-col items-center justify-center my-2"
            >
              {/* Outer Radiant Glow with Proportional Balanced Card Size */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 25px rgba(0,240,255,0.4), 0 0 50px rgba(255,216,77,0.3)',
                    '0 0 45px rgba(0,240,255,0.6), 0 0 75px rgba(255,216,77,0.55)',
                    '0 0 25px rgba(0,240,255,0.4), 0 0 50px rgba(255,216,77,0.3)',
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2.4 }}
                className="rounded-2xl"
              >
                {/* Responsive Card Size: 'md' on mobile, 'lg' on desktop to ensure ZERO overflow */}
                <div className="sm:hidden">
                  <StarCard
                    card={selectedCard}
                    isFlipped={stage === 'revealed'}
                    interactive={stage === 'revealed'}
                    size="md"
                  />
                </div>
                <div className="hidden sm:block">
                  <StarCard
                    card={selectedCard}
                    isFlipped={stage === 'revealed'}
                    interactive={stage === 'revealed'}
                    size="lg"
                  />
                </div>
              </motion.div>

              {/* Reveal Info Tag: Clean, well-spaced, never colliding */}
              {stage === 'revealed' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="mt-3 text-center max-w-md px-4"
                >
                  <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest block drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">
                    ✦ CHÒM SAO {selectedCard.constellation.toUpperCase()} ✦
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 italic mt-1 leading-snug line-clamp-2">
                    "{selectedCard.destinyQuote}"
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Control Actions Area: Strictly separated at bottom with zero overlap */}
      <div className="z-20 shrink-0 w-full flex items-center justify-center pt-2 pb-2">
        {/* Phase 1: Draw Trigger Button */}
        {stage === 'fanned' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-2"
          >
            <button
              onClick={handleStartDraw}
              className="px-10 py-4 rounded-full font-black text-sm tracking-wider uppercase bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-slate-950 shadow-[0_0_30px_rgba(255,133,179,0.55)] hover:shadow-[0_0_45px_rgba(255,216,77,0.75)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
              <span>RÚT LÁ BÀI CỦA BẠN</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="text-[11px] text-cyan-300/80">
              Hoặc bạn có thể chạm trực tiếp vào các lá bài ở trên
            </span>
          </motion.div>
        )}

        {/* Phase 2 & 3: Spinner status */}
        {(stage === 'orbiting' || stage === 'drawing') && (
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-cyan-400/30 text-cyan-300 text-xs font-bold animate-pulse">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Vũ trụ đang kết nối định danh...</span>
          </div>
        )}

        {/* Phase 4: Action Buttons when Revealed */}
        {stage === 'revealed' && selectedCard && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-3 w-full"
          >
            <button
              onClick={handleProceedToResult}
              className="px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 text-slate-950 shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Xem Thông Điệp & Chỉ Số Chi Tiết</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleRedraw}
              className="px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/15 transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Rút Lại Lá Khác</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
