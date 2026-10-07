import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Compass, X, RotateCw, ArrowRight } from 'lucide-react';
import { STAR_CARDS, ARCHETYPES_META } from '../data/cards';
import { StarCardData, CardArchetype } from '../types/card';
import { StarCard } from './StarCard';
import { soundEngine } from '../utils/audio';

interface ConstellationUniverseProps {
  drawnCardIds: number[];
  onSelectCardToDraw?: () => void;
}

export const ConstellationUniverse: React.FC<ConstellationUniverseProps> = ({
  drawnCardIds,
  onSelectCardToDraw,
}) => {
  const [selectedArchetype, setSelectedArchetype] = useState<CardArchetype | 'ALL'>('ALL');
  const [activeInspectCard, setActiveInspectCard] = useState<StarCardData | null>(null);
  const [inspectCardFlipped, setInspectCardFlipped] = useState(true);

  const filteredCards = selectedArchetype === 'ALL'
    ? STAR_CARDS
    : STAR_CARDS.filter((c) => c.category === selectedArchetype);

  const discoveredCount = STAR_CARDS.filter((c) => drawnCardIds.includes(c.id)).length;
  const progressPercent = Math.round((discoveredCount / 52) * 100);

  const handleCardClick = (card: StarCardData) => {
    soundEngine.playSparkle();
    setActiveInspectCard(card);
    setInspectCardFlipped(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/35 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>BỘ SƯU TẬP 52 LÁ BÀI VŨ TRỤ C!SV</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-wide">
          VŨ TRỤ C!SV STAR FINDER
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2 leading-relaxed">
          Tất cả 52 lá bài tinh tú của thiên hà Chào! Sinh Viên 2026. Mỗi lá bài đại diện cho một tính cách, khát khao và chòm sao dẫn lối.
        </p>

        {/* Discovery Progress Meter */}
        <div className="mt-6 max-w-md mx-auto p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-200">
              Tiến trình thắp sáng bộ bài:
            </span>
            <span className="font-mono font-bold text-cyan-300">
              {discoveredCount} / 52 Lá Bài ({progressPercent}%)
            </span>
          </div>
          <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-300 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs (Segmented Control for Archetypes) */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <button
          onClick={() => {
            soundEngine.playSparkle();
            setSelectedArchetype('ALL');
          }}
          className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${
            selectedArchetype === 'ALL'
              ? 'bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.5)]'
              : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
          }`}
        >
          Tất Cả (52)
        </button>

        {ARCHETYPES_META.map((arch) => {
          const isSelected = selectedArchetype === arch.id;
          return (
            <button
              key={arch.id}
              onClick={() => {
                soundEngine.playSparkle();
                setSelectedArchetype(arch.id as CardArchetype);
              }}
              className={`px-3.5 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-gradient-to-r from-pink-500 to-amber-400 text-slate-950 shadow-[0_0_15px_rgba(255,133,179,0.5)]'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              <span>{arch.name}</span>
              <span className="text-[10px] opacity-70 font-mono">({arch.count})</span>
            </button>
          );
        })}
      </div>

      {/* 52 Cards Grid: Real Star Cards Rendering in high-fidelity */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {filteredCards.map((card) => {
          const isDiscovered = drawnCardIds.includes(card.id);

          return (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.05, y: -6 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCardClick(card)}
              className="relative cursor-pointer transition-transform duration-200 select-none flex flex-col items-center"
            >
              {/* Actual Star Card rendered in compact size */}
              <StarCard
                card={card}
                isFlipped={true}
                interactive={true}
                size="xs"
                isLocked={!isDiscovered}
                className="w-full"
              />

              {/* Status Indicator beneath card */}
              <div className="mt-1.5 flex items-center gap-1 text-[10px] font-bold">
                {isDiscovered ? (
                  <span className="text-amber-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-ping" />
                    Đã Khám Phá
                  </span>
                ) : (
                  <span className="text-slate-400 flex items-center gap-1">
                    <span>✧</span>
                    Chưa Rút
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detailed Card Inspect Modal */}
      <AnimatePresence>
        {activeInspectCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#0a0f32] border border-cyan-400/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,240,255,0.35)] flex flex-col items-center max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveInspectCard(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer z-20"
                aria-label="Đóng xem chi tiết"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Central Full Star Card */}
              <div className="my-2 flex flex-col items-center">
                <StarCard
                  card={activeInspectCard}
                  isFlipped={inspectCardFlipped}
                  size="md"
                  interactive={true}
                />

                {/* Flip Card Button */}
                <button
                  onClick={() => {
                    soundEngine.playCardShuffle();
                    setInspectCardFlipped(!inspectCardFlipped);
                  }}
                  className="mt-3 px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-cyan-300 border border-cyan-400/30 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{inspectCardFlipped ? 'Lật Xem Mặt Sau' : 'Lật Xem Mặt Trước'}</span>
                </button>
              </div>

              {/* Card Meta & Details */}
              <div className="mt-4 text-center w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-amber-300 mb-2">
                  <span>CHÒM SAO {activeInspectCard.constellation.toUpperCase()}</span>
                  <span>·</span>
                  <span className="text-cyan-300">★ {activeInspectCard.starPower}%</span>
                </div>

                <h3 className="font-display font-black text-2xl text-white">
                  {activeInspectCard.name}
                </h3>

                <p className="text-sm text-cyan-200 italic mt-2 px-4 leading-relaxed">
                  "{activeInspectCard.destinyQuote}"
                </p>

                <p className="text-xs text-slate-300 mt-3 px-4 leading-relaxed line-clamp-3">
                  {activeInspectCard.longMessage}
                </p>

                {/* Status and Action */}
                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-3">
                  {drawnCardIds.includes(activeInspectCard.id) ? (
                    <div className="px-4 py-2 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-bold">
                      ✓ Bạn đã sở hữu lá bài này trong hành trình
                    </div>
                  ) : (
                    <>
                      <div className="text-xs text-slate-400">
                        Lá bài này đang đợi bạn rút ra trên bầu trời C!SV 2026.
                      </div>
                      {onSelectCardToDraw && (
                        <button
                          onClick={() => {
                            setActiveInspectCard(null);
                            onSelectCardToDraw();
                          }}
                          className="px-6 py-2.5 rounded-full font-bold text-xs uppercase bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-slate-950 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>RÚT LÁ BÀI NGAY</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
