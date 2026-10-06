import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { StarCardData } from '../types/card';
import { STAR_CARDS } from '../data/cards';
import { MagicNotebook } from './MagicNotebook';
import { StarCard } from './StarCard';
import { soundEngine } from '../utils/audio';

interface CardDeckDrawProps {
  onCardDrawn: (card: StarCardData) => void;
  previouslyDrawnIds?: number[];
}

export const CardDeckDraw: React.FC<CardDeckDrawProps> = ({
  onCardDrawn,
  previouslyDrawnIds = [],
}) => {
  const [phase, setPhase] = useState<'idle' | 'opening' | 'shuffling' | 'cardFloating' | 'revealed'>('idle');
  const [selectedCard, setSelectedCard] = useState<StarCardData | null>(null);

  const startDrawSequence = () => {
    if (phase !== 'idle') return;

    soundEngine.playPageFlip();
    setPhase('opening');

    // Filter undrawn cards to prevent immediate duplicates if possible
    let pool = STAR_CARDS.filter((c) => !previouslyDrawnIds.includes(c.id));
    if (pool.length === 0) {
      pool = [...STAR_CARDS];
    }
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    setSelectedCard(chosen);

    // Timeline:
    // 0.4s: Notebook opens -> 0.8s: Shuffling starts
    setTimeout(() => {
      setPhase('shuffling');
      soundEngine.playCardShuffle();
    }, 500);

    // 2.2s: Card floats up in 3D
    setTimeout(() => {
      setPhase('cardFloating');
      soundEngine.playSparkle();
    }, 2200);

    // 3.8s: Card flips & reveals triumphant
    setTimeout(() => {
      setPhase('revealed');
      soundEngine.playCardReveal();

      // Trigger celebratory cosmic sparkle confetti
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#ffd84d', '#ff85b3', '#ffffff'],
        });
      } catch {
        // Ignore if confetti blocked
      }

      // Transition to full result view
      setTimeout(() => {
        onCardDrawn(chosen);
      }, 1400);
    }, 3800);
  };

  return (
    <div className="relative min-h-[520px] w-full flex flex-col items-center justify-center py-6">
      <AnimatePresence mode="wait">
        {/* Phase: Notebook and Shuffling */}
        {(phase === 'idle' || phase === 'opening' || phase === 'shuffling') && (
          <motion.div
            key="notebook-stage"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="text-center mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                ✦ CUỐN SỔ KỲ DIỆU ✦
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
                CHẠM ĐỂ RÚT NGÔI SAO ĐỊNH DANH
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Một trong 52 lá bài vũ trụ C!SV đang chờ đợi bạn
              </p>
            </div>

            <MagicNotebook
              isOpen={phase === 'opening' || phase === 'shuffling'}
              isShuffling={phase === 'shuffling'}
              onDrawClick={startDrawSequence}
              buttonLabel={phase === 'shuffling' ? 'ĐANG CHỌN NGÔI SAO...' : 'RÚT LÁ BÀI CỦA BẠN'}
            />
          </motion.div>
        )}

        {/* Phase: Card Floating & 3D Flip Reveal */}
        {(phase === 'cardFloating' || phase === 'revealed') && selectedCard && (
          <motion.div
            key="card-reveal-stage"
            initial={{ scale: 0.3, y: 120, rotateY: 180, opacity: 0 }}
            animate={{
              scale: phase === 'revealed' ? 1.05 : 0.85,
              y: phase === 'revealed' ? -20 : 0,
              rotateY: phase === 'revealed' ? 0 : 180,
              opacity: 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 14,
              duration: 1.2,
            }}
            className="flex flex-col items-center relative z-30"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(0,240,255,0.4)',
                  '0 0 60px rgba(255,216,77,0.7)',
                  '0 0 35px rgba(255,133,179,0.5)',
                ],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="rounded-2xl"
            >
              <StarCard
                card={selectedCard}
                isFlipped={phase === 'revealed'}
                interactive={false}
                size="xl"
              />
            </motion.div>

            {phase === 'revealed' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-center"
              >
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest block">
                  ✦ ĐÃ TÌM THẤY NGÔI SAO ✦
                </span>
                <h3 className="font-display font-black text-2xl text-amber-300 mt-1">
                  {selectedCard.name}
                </h3>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
