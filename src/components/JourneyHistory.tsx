import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { History, Trash2, Calendar, Sparkles, ArrowRight, X } from 'lucide-react';
import { DrawnHistoryItem, StarCardData } from '../types/card';
import { STAR_CARDS } from '../data/cards';
import { StarCard } from './StarCard';
import { soundEngine } from '../utils/audio';

interface JourneyHistoryProps {
  history: DrawnHistoryItem[];
  onClearHistory: () => void;
  onDrawNewCard: () => void;
}

export const JourneyHistory: React.FC<JourneyHistoryProps> = ({
  history,
  onClearHistory,
  onDrawNewCard,
}) => {
  const [selectedCardToView, setSelectedCardToView] = useState<StarCardData | null>(null);

  // Group history items by unique cards or show timeline
  const cardsMap = new Map(STAR_CARDS.map((c) => [c.id, c]));

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1">
            <History className="w-3.5 h-3.5" />
            <span>NHẬT KÝ CHIÊM TINH C!SV</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
            NHỮNG NGÔI SAO BẠN ĐÃ GẶP
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Lưu giữ từng khoảnh khắc kết nối cùng các vì tinh tú trong hành trình sinh viên.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Bạn có chắc muốn xóa lịch sử hành trình và bắt đầu lại từ đầu?')) {
                onClearHistory();
              }
            }}
            className="px-4 py-2 rounded-full text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>XÓA HÀNH TRÌNH</span>
          </button>
        )}
      </div>

      {/* History Items or Empty State */}
      {history.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-white/5 border border-white/10 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-cyan-400/10 flex items-center justify-center mx-auto mb-4 text-cyan-300 text-2xl">
            ✦
          </div>
          <h3 className="font-display font-bold text-lg text-white mb-2">
            Hành trình của bạn vừa bắt đầu
          </h3>
          <p className="text-xs text-slate-300 mb-6 leading-relaxed">
            Bạn chưa rút lá bài nào. Hãy bước vào vòng quay chiêm tinh C!SV để tìm thấy ngôi sao đầu tiên đang chờ đón bạn!
          </p>
          <button
            onClick={() => {
              soundEngine.playSparkle();
              onDrawNewCard();
            }}
            className="px-6 py-3 rounded-full font-bold text-xs uppercase bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-slate-950 shadow-[0_0_20px_rgba(255,133,179,0.5)] hover:scale-105 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>RÚT NGÔI SAO ĐẦU TIÊN</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {history.map((item, index) => {
            const card = cardsMap.get(item.cardId);
            if (!card) return null;

            const dateStr = new Date(item.drawnAt).toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <motion.div
                key={item.id || index}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => {
                  soundEngine.playSparkle();
                  setSelectedCardToView(card);
                }}
                className="p-4 rounded-2xl bg-gradient-to-b from-indigo-950/60 to-slate-900/80 border border-white/10 hover:border-cyan-400/50 shadow-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2">
                    <span className="flex items-center gap-1 font-mono text-cyan-300">
                      <Calendar className="w-3 h-3" />
                      {dateStr}
                    </span>
                    <span className="font-bold text-pink-300 uppercase">
                      {card.rarity}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 my-2">
                    <div className="w-12 h-16 rounded-lg bg-[#090d29] border border-cyan-400/40 flex items-center justify-center text-yellow-300 font-bold text-lg shadow-sm">
                      ✦
                    </div>
                    <div>
                      <h4 className="font-display font-extrabold text-base text-white">
                        {card.name}
                      </h4>
                      <p className="text-xs text-amber-200">
                        {card.constellation}
                      </p>
                      <span className="text-[10px] text-cyan-300 font-semibold">
                        ✦ {card.keyword}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Star Power: <strong className="text-yellow-300 font-mono">{card.starPower}%</strong></span>
                  <span className="text-cyan-300 font-semibold hover:underline">Chi tiết →</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Detail Inspection Modal */}
      <AnimatePresence>
        {selectedCardToView && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-md bg-[#0a0f30] border border-cyan-400/40 rounded-3xl p-6 shadow-2xl flex flex-col items-center"
            >
              <button
                onClick={() => setSelectedCardToView(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <StarCard card={selectedCardToView} size="md" isFlipped={true} />

              <div className="mt-4 text-center">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block">
                  ✦ THÔNG ĐIỆP GẶP GỠ ✦
                </span>
                <p className="text-xs text-slate-200 mt-2 italic px-3">
                  "{selectedCardToView.destinyQuote}"
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
