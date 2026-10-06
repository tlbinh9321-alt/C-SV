import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, Lock, Eye, Compass, Filter, X } from 'lucide-react';
import { STAR_CARDS, ARCHETYPES_META } from '../data/cards';
import { StarCardData, CardArchetype } from '../types/card';
import { StarCard } from './StarCard';
import { Mascot } from './Mascot';
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

  const filteredCards = selectedArchetype === 'ALL'
    ? STAR_CARDS
    : STAR_CARDS.filter((c) => c.category === selectedArchetype);

  const discoveredCount = STAR_CARDS.filter((c) => drawnCardIds.includes(c.id)).length;
  const progressPercent = Math.round((discoveredCount / 52) * 100);

  const handleCardClick = (card: StarCardData) => {
    soundEngine.playSparkle();
    setActiveInspectCard(card);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bản Đồ 52 Chòm Sao C!SV</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-wide">
          VŨ TRỤ C!SV
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2 leading-relaxed">
          Mỗi sinh viên là một vì tinh tú tỏa sáng độc bản. Hãy khám phá và thắp sáng trọn vẹn 52 ngôi sao trong thiên hà Chào! Sinh Viên 2026.
        </p>

        {/* Discovery Progress Meter */}
        <div className="mt-6 max-w-md mx-auto p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-200">
              Tiến trình thắp sáng vũ trụ:
            </span>
            <span className="font-mono font-bold text-cyan-300">
              {discoveredCount} / 52 Ngôi Sao ({progressPercent}%)
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

      {/* Filter Tabs (Functional Segmented Control) */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <button
          onClick={() => setSelectedArchetype('ALL')}
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
              onClick={() => setSelectedArchetype(arch.id as CardArchetype)}
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

      {/* 52 Stars Constellation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
        {filteredCards.map((card) => {
          const isDiscovered = drawnCardIds.includes(card.id);

          return (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCardClick(card)}
              className={`relative rounded-2xl p-3 border transition-all cursor-pointer flex flex-col justify-between select-none ${
                isDiscovered
                  ? 'bg-gradient-to-b from-[#0f1747] to-[#080d29] border-cyan-400/50 shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:border-yellow-300'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20 opacity-70 hover:opacity-100'
              }`}
            >
              {/* Star Node Header */}
              <div className="flex items-center justify-between text-[10px] mb-2">
                <span className="font-mono text-cyan-300 font-bold">
                  #{card.id < 10 ? `0${card.id}` : card.id}
                </span>

                {isDiscovered ? (
                  <span className="w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_8px_#ffd84d] animate-pulse" />
                ) : (
                  <Lock className="w-3 h-3 text-slate-500" />
                )}
              </div>

              {/* Icon Visual */}
              <div className="my-2 flex flex-col items-center justify-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 transition-all ${
                    isDiscovered
                      ? 'bg-cyan-500/10 shadow-[0_0_15px_rgba(255,216,77,0.4)]'
                      : 'bg-white/5 text-slate-600'
                  }`}
                >
                  {isDiscovered ? (
                    <Mascot state="idle" size="sm" className="scale-75" />
                  ) : (
                    <span className="text-base text-slate-600">★</span>
                  )}
                </div>

                <div className="text-center">
                  <h4 className="text-xs font-bold text-white truncate max-w-[120px]">
                    {card.name}
                  </h4>
                  <p className="text-[10px] text-cyan-300/80 truncate max-w-[120px]">
                    {card.constellation}
                  </p>
                </div>
              </div>

              {/* Status pill at bottom */}
              <div className="mt-2 text-center pt-1.5 border-t border-white/5">
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider block ${
                    isDiscovered ? 'text-pink-300' : 'text-slate-500'
                  }`}
                >
                  {isDiscovered ? card.rarity : 'Chưa Khám Phá'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Inspect Modal */}
      <AnimatePresence>
        {activeInspectCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-md bg-[#0a0f30] border border-cyan-400/40 rounded-3xl p-6 shadow-[0_0_50px_rgba(0,240,255,0.3)] flex flex-col items-center"
            >
              <button
                onClick={() => setActiveInspectCard(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <StarCard
                card={activeInspectCard}
                isFlipped={drawnCardIds.includes(activeInspectCard.id)}
                size="md"
                interactive={true}
              />

              <div className="mt-4 text-center">
                {drawnCardIds.includes(activeInspectCard.id) ? (
                  <>
                    <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest block">
                      ✦ BẠN ĐÃ THẮP SÁNG NGÔI SAO NÀY ✦
                    </span>
                    <p className="text-xs text-slate-300 mt-2 italic px-2">
                      "{activeInspectCard.destinyQuote}"
                    </p>
                  </>
                ) : (
                  <>
                    <span className="text-xs font-bold text-pink-300 uppercase tracking-widest block">
                      ✦ NGÔI SAO CHƯA MỞ KHÓA ✦
                    </span>
                    <p className="text-xs text-slate-300 mt-2 px-2">
                      Ngôi sao {activeInspectCard.name} ({activeInspectCard.constellation}) đang chờ bạn rút ra từ cuốn sổ kỳ diệu!
                    </p>
                    {onSelectCardToDraw && (
                      <button
                        onClick={() => {
                          setActiveInspectCard(null);
                          onSelectCardToDraw();
                        }}
                        className="mt-4 px-6 py-2.5 rounded-full font-bold text-xs uppercase bg-gradient-to-r from-pink-500 to-amber-300 text-slate-950 shadow-lg hover:scale-105 transition-all cursor-pointer"
                      >
                        ĐI ĐẾN RÚT BÀI NGAY
                      </button>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
