import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface FooterProps {
  onNavigate: (view: 'landing' | 'scan' | 'draw' | 'result' | 'universe' | 'history' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full border-t border-white/10 bg-[#050716]/90 backdrop-blur-md pt-8 pb-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Brand & Tagline */}
        <div className="mb-4">
          <div className="text-[11px] font-bold text-cyan-300 tracking-widest uppercase mb-1">
            CHƯƠNG TRÌNH CHÀO! SINH VIÊN 2026
          </div>
          <h3 className="font-display font-black text-xl text-white tracking-wider">
            C!SV STAR FINDER
          </h3>
          <p className="text-xs text-amber-200 mt-0.5 font-medium">
            ✦ THEO ÁNH SAO – CHẠM KHÁT KHAO ✦
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-medium mb-6">
          <button
            onClick={() => {
              soundEngine.playSparkle();
              onNavigate('landing');
            }}
            className="hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Trang Chủ
          </button>
          <button
            onClick={() => {
              soundEngine.playSparkle();
              onNavigate('scan');
            }}
            className="hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Quét Năng Lượng
          </button>
          <button
            onClick={() => {
              soundEngine.playSparkle();
              onNavigate('universe');
            }}
            className="hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Bản Đồ 52 Chòm Sao
          </button>
          <button
            onClick={() => {
              soundEngine.playSparkle();
              onNavigate('history');
            }}
            className="hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Nhật Ký Đã Rút
          </button>
          <button
            onClick={() => {
              soundEngine.playSparkle();
              onNavigate('about');
            }}
            className="hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Ý Nghĩa Dự Án
          </button>
        </div>

        {/* Ethical Disclaimer */}
        <div className="max-w-xl text-[11px] text-slate-300 mb-6 leading-relaxed bg-white/5 p-3.5 rounded-2xl border border-white/5">
          <span className="text-amber-300 font-semibold block mb-0.5">✦ LƯU Ý VỀ TRẢI NGHIỆM</span>
          Đây là dự án tương tác nghệ thuật số dành riêng cho sinh viên trong khuôn khổ chương trình C!SV 2026. Mọi thông điệp mang tính ẩn dụ truyền cảm hứng, động viên học tập và phản chiếu bản thân, không phải bói toán hay dự đoán tương lai.
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-white/5 w-full flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-300 gap-2">
          <span>© 2026 Ban Tổ Chức Chương Trình Chào! Sinh Viên. All rights reserved.</span>
          <span className="flex items-center gap-1 text-slate-300">
            Dệt nên từ ngàn vì sao cùng <Heart className="w-3 h-3 text-pink-400 fill-pink-400" /> C!SV
          </span>
        </div>
      </div>
    </footer>
  );
};
