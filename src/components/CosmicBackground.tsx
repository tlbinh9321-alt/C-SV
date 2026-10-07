import React, { useEffect, useRef } from 'react';

interface CartoonStar {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  color: string;
  type: 'diamond4' | 'round' | 'star5';
  pulsePhase: number;
}

interface CartoonShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  headSize: number;
  color: string;
  active: boolean;
}

interface StardustParticle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
}

export const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Palette strictly from Cartoon 2D references (dreamy cyan, pastel pink, soft gold, cream)
    const cartoonColors = ['#fffdf5', '#ffd84d', '#ffea75', '#67e8f9', '#ff85b3', '#fed7aa'];

    // Generate cartoon stars distributed across the full sky
    const starCount = Math.min(140, Math.floor((width * height) / 9000));
    const stars: CartoonStar[] = Array.from({ length: starCount }, () => {
      const rand = Math.random();
      const type: 'diamond4' | 'round' | 'star5' =
        rand > 0.45 ? 'diamond4' : rand > 0.15 ? 'round' : 'star5';

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: type === 'round' ? Math.random() * 2 + 1.2 : Math.random() * 4 + 2.8,
        baseAlpha: Math.random() * 0.55 + 0.45,
        alpha: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.025 + 0.015,
        color: cartoonColors[Math.floor(Math.random() * cartoonColors.length)],
        type,
        pulsePhase: Math.random() * Math.PI * 2,
      };
    });

    // Gentle drifting stardust particles
    const stardustList: StardustParticle[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1.2,
      vx: (Math.random() - 0.5) * 0.2,
      vy: -(Math.random() * 0.35 + 0.1),
      alpha: Math.random() * 0.6 + 0.25,
      color: Math.random() > 0.5 ? '#ffd84d' : '#ff85b3',
    }));

    // Cartoon shooting star with stylized tapered comic motion streak
    let shootingStar: CartoonShootingStar = {
      x: 0,
      y: 0,
      length: 160,
      speed: 15,
      angle: Math.PI / 4,
      alpha: 0,
      headSize: 5,
      color: '#ffffff',
      active: false,
    };

    let lastShootingStarTime = Date.now();
    let nextShootingStarDelay = 5000 + Math.random() * 6000;

    // Helper: Draw cute 4-pointed cartoon diamond star
    const drawCartoon4PointStar = (cx: number, cy: number, r: number, color: string, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;

      // Soft cartoon halo
      ctx.shadowColor = color;
      ctx.shadowBlur = r * 2.5;

      ctx.beginPath();
      ctx.moveTo(cx, cy - r * 1.5);
      ctx.quadraticCurveTo(cx, cy, cx + r * 1.5, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy + r * 1.5);
      ctx.quadraticCurveTo(cx, cy, cx - r * 1.5, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy - r * 1.5);
      ctx.closePath();
      ctx.fill();

      // Bright white inner core
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Helper: Draw 5-pointed rounded cartoon star
    const drawCartoon5PointStar = (cx: number, cy: number, r: number, color: string, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = r * 2;

      ctx.beginPath();
      const points = 5;
      const step = Math.PI / points;
      let angle = -Math.PI / 2;

      for (let i = 0; i < 2 * points; i++) {
        const radius = i % 2 === 0 ? r : r * 0.48;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        angle += step;
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.005;

      // 1. Deep Midnight Navy Cartoon Sky Gradient (Pure, seamless, borderless)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#06091e');
      skyGrad.addColorStop(0.35, '#080d28');
      skyGrad.addColorStop(0.7, '#0a1033');
      skyGrad.addColorStop(1, '#050716');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Soft, organic, seamless radial nebular blooms (NO borders, NO sharp lines)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // Nebula 1: Gentle cyan glow upper-left
      const neb1X = width * 0.25 + Math.sin(time) * 40;
      const neb1Y = height * 0.3 + Math.cos(time * 0.8) * 30;
      const neb1Grad = ctx.createRadialGradient(neb1X, neb1Y, 0, neb1X, neb1Y, width * 0.45);
      neb1Grad.addColorStop(0, 'rgba(0, 240, 255, 0.08)');
      neb1Grad.addColorStop(0.5, 'rgba(0, 240, 255, 0.03)');
      neb1Grad.addColorStop(1, 'rgba(0, 240, 255, 0)');
      ctx.fillStyle = neb1Grad;
      ctx.fillRect(0, 0, width, height);

      // Nebula 2: Pastel pink warm glow lower-right
      const neb2X = width * 0.75 + Math.cos(time * 0.9) * 40;
      const neb2Y = height * 0.65 + Math.sin(time * 0.7) * 35;
      const neb2Grad = ctx.createRadialGradient(neb2X, neb2Y, 0, neb2X, neb2Y, width * 0.5);
      neb2Grad.addColorStop(0, 'rgba(255, 133, 179, 0.07)');
      neb2Grad.addColorStop(0.5, 'rgba(255, 216, 77, 0.025)');
      neb2Grad.addColorStop(1, 'rgba(255, 133, 179, 0)');
      ctx.fillStyle = neb2Grad;
      ctx.fillRect(0, 0, width, height);

      ctx.restore();

      // 3. Draw 2D Cartoon Stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.alpha += s.twinkleSpeed;
        const currentAlpha = s.baseAlpha * (0.65 + Math.sin(s.alpha) * 0.35);

        if (s.type === 'diamond4') {
          drawCartoon4PointStar(s.x, s.y, s.size, s.color, currentAlpha);
        } else if (s.type === 'star5') {
          drawCartoon5PointStar(s.x, s.y, s.size, s.color, currentAlpha);
        } else {
          // Cute circular star with soft aura
          ctx.save();
          ctx.globalAlpha = currentAlpha;
          ctx.fillStyle = s.color;
          ctx.shadowColor = s.color;
          ctx.shadowBlur = s.size * 2;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // 4. Floating Drifting Stardust
      for (let i = 0; i < stardustList.length; i++) {
        const p = stardustList[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 5. Cartoon 2D Shooting Star with Stylized Comic Streak Lines
      const now = Date.now();
      if (!shootingStar.active && now - lastShootingStarTime > nextShootingStarDelay) {
        shootingStar = {
          x: Math.random() * (width * 0.65),
          y: Math.random() * (height * 0.35),
          length: 130 + Math.random() * 80,
          speed: 14 + Math.random() * 6,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
          alpha: 1,
          headSize: 5.5,
          color: Math.random() > 0.4 ? '#ffd84d' : '#ffffff',
          active: true,
        };
        lastShootingStarTime = now;
        nextShootingStarDelay = 5000 + Math.random() * 7000;
      }

      if (shootingStar.active) {
        const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
        const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;

        ctx.save();
        // Cartoon 2D Speed lines: tapered stroke
        const streakGrad = ctx.createLinearGradient(tailX, tailY, shootingStar.x, shootingStar.y);
        streakGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        streakGrad.addColorStop(0.5, 'rgba(103, 232, 249, 0.5)');
        streakGrad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');

        // Center streak
        ctx.strokeStyle = streakGrad;
        ctx.lineWidth = 3.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(shootingStar.x, shootingStar.y);
        ctx.stroke();

        // Upper mini secondary streak
        const offsetDist = 5;
        const perpX = -Math.sin(shootingStar.angle) * offsetDist;
        const perpY = Math.cos(shootingStar.angle) * offsetDist;

        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(tailX + perpX + 30 * Math.cos(shootingStar.angle), tailY + perpY + 30 * Math.sin(shootingStar.angle));
        ctx.lineTo(shootingStar.x + perpX, shootingStar.y + perpY);
        ctx.stroke();

        // Chubby cartoon star head
        drawCartoon4PointStar(shootingStar.x, shootingStar.y, shootingStar.headSize, shootingStar.color, 1);
        ctx.restore();

        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;

        if (shootingStar.x > width + 120 || shootingStar.y > height + 120) {
          shootingStar.active = false;
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 2D Canvas Starfield & Seamless Atmosphere */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
