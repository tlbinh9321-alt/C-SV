import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { StarCardData } from '../types/card';
import { Mascot } from './Mascot';
import { 
  Sparkles, Compass, Moon, Waves, CloudMoon, Eye, Feather, 
  Footprints, Ship, Sunrise, Zap, Navigation, Globe, Flame,
  FlaskConical, Palette, Music, SunDim, Share2, Lightbulb, 
  GitMerge, Link, Radio, Smile, Heart, Star, Sun, Shield, 
  Crown, Mountain, Layers, Anchor, Ruler, Building2, Wrench, 
  Gem, Search, Lamp, MapPin, HelpCircle, Maximize2, Wind, 
  BookOpen, PenTool, Volume2, MessageCircle
} from 'lucide-react';

interface StarCardProps {
  card: StarCardData;
  isFlipped?: boolean; // false = back, true = front (default true)
  interactive?: boolean; // 3D tilt on mouse hover
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  showHolo?: boolean;
}

export const StarCard: React.FC<StarCardProps> = ({
  card,
  isFlipped = true,
  interactive = true,
  size = 'lg',
  className = '',
  onClick,
  showHolo = true,
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Mouse move handler for 3D tilt & holographic sheen
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos({ x: 50, y: 50 });
  };

  const sizeClasses = {
    sm: 'w-44 h-64 text-xs',
    md: 'w-56 h-80 text-sm',
    lg: 'w-72 h-[410px] text-base',
    xl: 'w-84 h-[480px] text-lg',
  }[size];

  // Helper for rendering thematic cosmic glyphs based on illustration motif
  const renderCardSymbol = () => {
    const iconProps = { className: 'w-16 h-16 drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]', strokeWidth: 1.5 };
    switch (card.illustrationMotif) {
      case 'comet': return <Zap {...iconProps} className="w-16 h-16 text-yellow-300 animate-pulse" />;
      case 'nebula': return <CloudMoon {...iconProps} className="w-16 h-16 text-purple-300" />;
      case 'aurora': return <Waves {...iconProps} className="w-16 h-16 text-cyan-300" />;
      case 'stardust': return <Sparkles {...iconProps} className="w-16 h-16 text-amber-300" />;
      case 'lunaris': return <Moon {...iconProps} className="w-16 h-16 text-sky-200" />;
      case 'mirage': return <Eye {...iconProps} className="w-16 h-16 text-pink-300" />;
      case 'serenity': return <Feather {...iconProps} className="w-16 h-16 text-emerald-200" />;
      case 'pioneer': return <Footprints {...iconProps} className="w-16 h-16 text-cyan-300" />;
      case 'compass': return <Compass {...iconProps} className="w-16 h-16 text-yellow-300" />;
      case 'voyager': return <Ship {...iconProps} className="w-16 h-16 text-sky-300" />;
      case 'horizon': return <Sunrise {...iconProps} className="w-16 h-16 text-orange-300" />;
      case 'meteor': return <Zap {...iconProps} className="w-16 h-16 text-amber-400" />;
      case 'wayfinder': return <Navigation {...iconProps} className="w-16 h-16 text-teal-300" />;
      case 'orbit': return <Globe {...iconProps} className="w-16 h-16 text-indigo-300" />;
      case 'prism': return <Sparkles {...iconProps} className="w-16 h-16 text-rose-300" />;
      case 'spark': return <Flame {...iconProps} className="w-16 h-16 text-orange-400" />;
      case 'alchemist': return <FlaskConical {...iconProps} className="w-16 h-16 text-violet-300" />;
      case 'canvas': return <Palette {...iconProps} className="w-16 h-16 text-pink-300" />;
      case 'harmony': return <Music {...iconProps} className="w-16 h-16 text-teal-300" />;
      case 'eclipse': return <SunDim {...iconProps} className="w-16 h-16 text-amber-300" />;
      case 'constellation': return <Share2 {...iconProps} className="w-16 h-16 text-sky-300" />;
      case 'beacon': return <Lightbulb {...iconProps} className="w-16 h-16 text-yellow-300" />;
      case 'weaver': return <GitMerge {...iconProps} className="w-16 h-16 text-rose-300" />;
      case 'bridger': return <Link {...iconProps} className="w-16 h-16 text-emerald-300" />;
      case 'resonance': return <Radio {...iconProps} className="w-16 h-16 text-purple-300" />;
      case 'symphony': return <Smile {...iconProps} className="w-16 h-16 text-amber-300" />;
      case 'embrace': return <Heart {...iconProps} className="w-16 h-16 text-pink-300" />;
      case 'polaris': return <Star {...iconProps} className="w-18 h-18 text-yellow-300 animate-spin" style={{ animationDuration: '20s' }} />;
      case 'solaris': return <Sun {...iconProps} className="w-16 h-16 text-amber-400" />;
      case 'guardian': return <Shield {...iconProps} className="w-16 h-16 text-blue-300" />;
      case 'crown': return <Crown {...iconProps} className="w-16 h-16 text-yellow-300" />;
      case 'flame': return <Flame {...iconProps} className="w-16 h-16 text-rose-400" />;
      case 'summit': return <Mountain {...iconProps} className="w-16 h-16 text-indigo-300" />;
      case 'foundation': return <Layers {...iconProps} className="w-16 h-16 text-emerald-300" />;
      case 'anchor': return <Anchor {...iconProps} className="w-16 h-16 text-sky-400" />;
      case 'architect': return <Ruler {...iconProps} className="w-16 h-16 text-cyan-300" />;
      case 'pillar': return <Building2 {...iconProps} className="w-16 h-16 text-teal-300" />;
      case 'craftsman': return <Wrench {...iconProps} className="w-16 h-16 text-orange-300" />;
      case 'bedrock': return <Gem {...iconProps} className="w-16 h-16 text-slate-300" />;
      case 'telescope': return <Search {...iconProps} className="w-16 h-16 text-indigo-300" />;
      case 'lantern': return <Lamp {...iconProps} className="w-16 h-16 text-amber-300" />;
      case 'odyssey': return <MapPin {...iconProps} className="w-16 h-16 text-emerald-300" />;
      case 'labyrinth': return <HelpCircle {...iconProps} className="w-16 h-16 text-purple-300" />;
      case 'reflection': return <Maximize2 {...iconProps} className="w-16 h-16 text-sky-300" />;
      case 'zephyr': return <Wind {...iconProps} className="w-16 h-16 text-teal-200" />;
      case 'chronicler': return <BookOpen {...iconProps} className="w-16 h-16 text-orange-300" />;
      case 'quill': return <PenTool {...iconProps} className="w-16 h-16 text-rose-300" />;
      case 'echo': return <Volume2 {...iconProps} className="w-16 h-16 text-violet-300" />;
      case 'taleweaver': return <MessageCircle {...iconProps} className="w-16 h-16 text-pink-300" />;
      case 'concert': return <Sparkles {...iconProps} className="w-18 h-18 text-yellow-300 animate-pulse" />;
      default: return <Star {...iconProps} className="w-16 h-16 text-yellow-300" />;
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ perspective: 1200 }}
      className={`relative select-none ${sizeClasses} ${className} cursor-pointer`}
    >
      <motion.div
        animate={{
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full relative rounded-2xl p-[3px] shadow-[0_15px_35px_rgba(0,0,0,0.6)] group"
      >
        {/* Glowing border gradient */}
        <div
          className="absolute inset-0 rounded-2xl transition-all duration-300 group-hover:opacity-100 opacity-80"
          style={{
            background: `linear-gradient(135deg, ${card.colors.primary}, ${card.colors.glow}, ${card.colors.secondary})`,
            boxShadow: `0 0 25px ${card.colors.glow}44`,
          }}
        />

        {/* Card Body */}
        <div className="relative w-full h-full rounded-[14px] bg-[#090d29] overflow-hidden flex flex-col justify-between p-4 z-10 border border-white/10">
          {isFlipped ? (
            /* FRONT OF CARD */
            <>
              {/* Card Header */}
              <div className="flex items-center justify-between text-xs tracking-wider z-10">
                <div className="flex items-center gap-1.5 font-bold text-white/90">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-mono text-[11px] text-cyan-300">
                    #{card.id < 10 ? `0${card.id}` : card.id}
                  </span>
                  <span className="text-white/40">/</span>
                  <span className="text-[10px] text-pink-300 font-semibold uppercase">
                    {card.rarity}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-bold text-yellow-300">
                  <span>★</span>
                  <span className="font-mono">{card.starPower}%</span>
                </div>
              </div>

              {/* Constellation Art Centerpiece */}
              <div className="relative flex-1 my-2 flex flex-col items-center justify-center z-10">
                {/* Background Constellation Geometric Rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="w-32 h-32 rounded-full border border-dashed border-white/15 animate-spin"
                    style={{ animationDuration: '35s' }}
                  />
                  <div className="w-24 h-24 rounded-full border border-white/10" />
                  <div
                    className="absolute w-40 h-40 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${card.colors.glow}25 0%, transparent 70%)`,
                    }}
                  />
                </div>

                {/* Main Glyph */}
                <div className="relative z-10 p-4 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10">
                  {renderCardSymbol()}
                </div>

                {/* Constellation Tag */}
                <div className="mt-3 text-center">
                  <span className="text-[10px] font-bold tracking-widest text-cyan-300 uppercase block">
                    CHÒM SAO
                  </span>
                  <span className="text-sm font-extrabold text-white tracking-wide">
                    {card.constellation}
                  </span>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="relative z-10 pt-2 border-t border-white/10 text-center">
                <div className="text-[10px] tracking-widest text-amber-300 font-bold uppercase mb-0.5">
                  ✦ {card.keyword} ✦
                </div>
                <h3 className="font-display font-black text-lg text-white leading-tight tracking-wide">
                  {card.name}
                </h3>
                <p className="text-[11px] text-slate-300 line-clamp-2 mt-1 leading-snug italic font-normal">
                  "{card.shortMessage}"
                </p>

                {/* Tiny C!SV Watermark at bottom */}
                <div className="mt-2 text-[9px] font-extrabold tracking-widest text-white/40 flex items-center justify-center gap-1">
                  <span>C!SV 2026</span>
                  <span>·</span>
                  <span>STAR FINDER</span>
                </div>
              </div>
            </>
          ) : (
            /* BACK OF CARD */
            <div className="w-full h-full flex flex-col items-center justify-center text-center relative p-3">
              {/* Back Sacred Geometry Lines */}
              <div className="absolute inset-3 rounded-xl border border-white/15 flex flex-col items-center justify-between p-3 pointer-events-none">
                <div className="w-full flex justify-between text-[10px] text-cyan-300/60 font-mono">
                  <span>✦ 2026</span>
                  <span>✦ C!SV</span>
                </div>
                <div className="w-full flex justify-between text-[10px] text-pink-300/60 font-mono">
                  <span>52 STARS</span>
                  <span>FINDER ✦</span>
                </div>
              </div>

              {/* Center Seal featuring Mascot */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full border-2 border-yellow-300/60 flex items-center justify-center mb-2 bg-indigo-950/80 shadow-[0_0_25px_rgba(255,216,77,0.4)] p-2">
                  <Mascot state="idle" size="sm" />
                </div>
                <div className="font-display font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-pink-300 tracking-wider">
                  C!SV
                </div>
                <div className="text-[10px] font-bold tracking-widest text-cyan-200 uppercase mt-0.5">
                  STAR FINDER
                </div>
                <div className="text-[9px] text-amber-200/80 mt-1 max-w-[140px] leading-tight">
                  Theo Ánh Sao – Chạm Khát Khao
                </div>
              </div>
            </div>
          )}

          {/* Holographic light sheen overlay */}
          {showHolo && (
            <div
              className="absolute inset-0 pointer-events-none rounded-[14px] mix-blend-color-dodge transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.45) 0%, rgba(0,240,255,0.2) 30%, rgba(255,133,179,0.15) 60%, transparent 80%)`,
                opacity: interactive ? 0.75 : 0.3,
              }}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};
