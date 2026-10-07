import React from 'react';
import { Volume2, VolumeX, Sparkles, Compass, History, Info, Menu, X } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface HeaderProps {
  currentView: 'landing' | 'scan' | 'draw' | 'result' | 'universe' | 'history' | 'about';
  onNavigate: (view: 'landing' | 'scan' | 'draw' | 'result' | 'universe' | 'history' | 'about') => void;
  isSoundMuted: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  isSoundMuted,
  onToggleSound,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { id: 'landing', label: 'Khám Phá', icon: Sparkles },
    { id: 'universe', label: 'Vũ Trụ 52 Sao', icon: Compass },
    { id: 'history', label: 'Nhật Ký', icon: History },
    { id: 'about', label: 'Ý Nghĩa C!SV', icon: Info },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#070a1e]/80 border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-300">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  soundEngine.playSparkle();
                  onNavigate(link.id);
                }}
                className={`transition-colors whitespace-nowrap cursor-pointer relative py-1 ${
                  isActive
                    ? 'text-cyan-300 font-bold'
                    : 'hover:text-white text-slate-300'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-3">
          {/* Audio toggle button */}
          <button
            onClick={onToggleSound}
            aria-label={isSoundMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-cyan-300 border border-white/10 hover:border-cyan-400/30 transition-all cursor-pointer flex items-center justify-center"
            title={isSoundMuted ? 'Bật âm thanh vũ trụ' : 'Tắt âm thanh vũ trụ'}
          >
            {isSoundMuted ? (
              <VolumeX className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-cyan-300 animate-pulse" />
            )}
          </button>

          {/* Quick Draw Action */}
          <button
            onClick={() => {
              soundEngine.playSparkle();
              onNavigate('scan');
            }}
            className="hidden sm:flex px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-slate-950 shadow-[0_0_15px_rgba(255,133,179,0.4)] hover:shadow-[0_0_22px_rgba(255,216,77,0.6)] hover:scale-105 active:scale-95 transition-all items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Rút Thẻ Ngay</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white border border-white/10 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-5 bg-[#0a0f30]/95 border-b border-cyan-500/20 backdrop-blur-xl flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  soundEngine.playSparkle();
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`py-2.5 px-3 rounded-xl text-left text-sm font-semibold transition-colors flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => {
              soundEngine.playSparkle();
              onNavigate('scan');
              setMobileMenuOpen(false);
            }}
            className="mt-2 w-full py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 text-slate-950 shadow-md flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>BẮT ĐẦU RÚT THẺ</span>
          </button>
        </div>
      )}
    </header>
  );
};
