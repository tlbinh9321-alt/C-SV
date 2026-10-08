import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Star, Heart, Compass, Shield } from 'lucide-react';
import { ARCHETYPES_META } from '../data/cards';
import { Mascot } from './Mascot';
import { soundEngine } from '../utils/audio';

interface AboutViewProps {
  onStartExperience: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onStartExperience }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      {/* Top Banner */}
      <div className="text-center mb-12">
        <Mascot state="idle" size="md" className="mb-4" />
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chào! Sinh Viên 2026</span>
        </div>
        <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-[2.75rem] tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-100 to-amber-300 drop-shadow-[0_4px_25px_rgba(0,240,255,0.6)] whitespace-nowrap" style={{ fontFamily: "'Be Vietnam Pro', 'Montserrat', sans-serif" }}>
          THEO ÁNH SAO – CHẠM KHÁT KHAO
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mt-3.5 leading-relaxed">
          C!SV Star Finder là không gian tương tác nghệ thuật số được thiết kế để chào đón các tân sinh viên và đồng hành cùng các bạn trẻ bước vào cánh cổng đại học.
        </p>
      </div>

      {/* 3 Core Philosophical Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
        <div className="p-6 rounded-3xl bg-gradient-to-b from-indigo-950/60 to-slate-900/80 border border-cyan-400/20 text-center">
          <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 text-cyan-300 flex items-center justify-center mx-auto mb-4 text-xl">
            ✦
          </div>
          <h3 className="font-display font-bold text-lg text-white mb-2">
            Tự Do Định Danh
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            "Không phải ngôi sao chọn bạn. Là bạn chọn cách mình tỏa sáng giữa bầu trời đêm."
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-b from-pink-950/40 to-slate-900/80 border border-pink-400/20 text-center">
          <div className="w-12 h-12 rounded-2xl bg-pink-400/10 text-pink-300 flex items-center justify-center mx-auto mb-4 text-xl">
            ★
          </div>
          <h3 className="font-display font-bold text-lg text-white mb-2">
            Hành Trình Vạn Dặm
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            "Không ai bắt đầu với một bản đồ hoàn chỉnh. Bạn chỉ cần đủ can đảm để bước bước đầu tiên."
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-b from-amber-950/40 to-slate-900/80 border border-yellow-400/20 text-center">
          <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 text-yellow-300 flex items-center justify-center mx-auto mb-4 text-xl">
            ✧
          </div>
          <h3 className="font-display font-bold text-lg text-white mb-2">
            Khơi Gợi Tự Vấn
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            "Điều bạn tìm thấy hôm nay có thể không phải câu trả lời, nhưng là một câu hỏi đáng để bạn bước tiếp."
          </p>
        </div>
      </div>

      {/* 8 Archetypes System */}
      <div className="mb-14">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-cyan-300 tracking-widest uppercase">
            HỆ THỐNG 8 ARCHETYPE
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
            8 Nguồn Năng Lượng Vũ Trụ Sinh Viên
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {ARCHETYPES_META.map((arch) => (
            <div
              key={arch.id}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 font-bold text-lg"
                  style={{ backgroundColor: `${arch.color}25`, color: arch.color }}
                >
                  ✦
                </div>
                <h4 className="font-display font-bold text-sm text-white">
                  {arch.name}
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  {arch.desc}
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-white/5 text-[11px] font-mono font-semibold" style={{ color: arch.color }}>
                {arch.count} Ngôi Sao
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Big Action CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-950 via-[#0b1342] to-purple-950 border border-cyan-400/40 text-center shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-lg mx-auto">
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white mb-3">
            Sẵn Sàng Gặp Ngôi Sao Của Bạn?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mb-8 leading-relaxed">
            52 chòm sao đang xoay vần trên bầu trời C!SV 2026. Hãy để các lá bài tinh tú hội tụ và trao cho bạn thông điệp truyền cảm hứng hôm nay.
          </p>

          <button
            onClick={() => {
              soundEngine.playSparkle();
              onStartExperience();
            }}
            className="px-10 py-4 rounded-full font-black text-sm uppercase tracking-wider bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-slate-950 shadow-[0_0_30px_rgba(255,133,179,0.5)] hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3 cursor-pointer"
          >
            <span>BẮT ĐẦU KHÁM PHÁ NGAY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
