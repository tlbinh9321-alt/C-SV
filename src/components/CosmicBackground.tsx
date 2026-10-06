import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  color: string;
  isCross: boolean;
}

interface Stardust {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  color: string;
  active: boolean;
}

export const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Color palette from reference artwork
    const starColors = ['#ffffff', '#fffdf5', '#ffd84d', '#67e8f9', '#ff85b3', '#a5f3fc'];

    // Generate stars
    const starCount = Math.min(160, Math.floor((width * height) / 8000));
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.4,
      baseAlpha: Math.random() * 0.7 + 0.3,
      alpha: Math.random(),
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      color: starColors[Math.floor(Math.random() * starColors.length)],
      isCross: Math.random() > 0.85,
    }));

    // Floating stardust drifting slowly upwards
    const stardustList: Stardust[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.4 + 0.15),
      alpha: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.5 ? '#ffd84d' : '#ff85b3',
    }));

    // Occasional shooting star
    let shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      length: 140,
      speed: 18,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
      alpha: 0,
      color: '#ffffff',
      active: false,
    };

    let lastShootingStarTime = Date.now();
    let nextShootingStarDelay = 5000 + Math.random() * 7000;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep space background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#06091e');
      bgGrad.addColorStop(0.5, '#090e2b');
      bgGrad.addColorStop(1, '#050714');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle pastel nebulae clouds (Top waves & corners like reference)
      // Pastel Pink cloud at top
      const pinkGlow = ctx.createRadialGradient(
        width * 0.3, -50, 20,
        width * 0.3, 0, width * 0.65
      );
      pinkGlow.addColorStop(0, 'rgba(255, 133, 179, 0.18)');
      pinkGlow.addColorStop(0.5, 'rgba(255, 133, 179, 0.06)');
      pinkGlow.addColorStop(1, 'rgba(255, 133, 179, 0)');
      ctx.fillStyle = pinkGlow;
      ctx.fillRect(0, 0, width, height * 0.6);

      // Warm Yellow glow (Top-right & Bottom corners like reference)
      const yellowGlow = ctx.createRadialGradient(
        width * 0.85, 80, 10,
        width * 0.85, 80, width * 0.45
      );
      yellowGlow.addColorStop(0, 'rgba(255, 216, 77, 0.22)');
      yellowGlow.addColorStop(0.5, 'rgba(255, 216, 77, 0.07)');
      yellowGlow.addColorStop(1, 'rgba(255, 216, 77, 0)');
      ctx.fillStyle = yellowGlow;
      ctx.fillRect(0, 0, width, height * 0.7);

      // Cyan cosmic aura at center bottom
      const cyanGlow = ctx.createRadialGradient(
        width * 0.5, height * 0.85, 30,
        width * 0.5, height * 0.85, width * 0.55
      );
      cyanGlow.addColorStop(0, 'rgba(0, 240, 255, 0.14)');
      cyanGlow.addColorStop(0.6, 'rgba(0, 240, 255, 0.03)');
      cyanGlow.addColorStop(1, 'rgba(0, 240, 255, 0)');
      ctx.fillStyle = cyanGlow;
      ctx.fillRect(0, height * 0.3, width, height * 0.7);

      // Render stars with twinkling
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.alpha += s.twinkleSpeed;
        const currentAlpha = s.baseAlpha * (0.6 + Math.sin(s.alpha) * 0.4);

        ctx.save();
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, currentAlpha));

        if (s.isCross) {
          // 4-pointed star sparkle
          const r = s.radius * 2.5;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y - r);
          ctx.lineTo(s.x + r * 0.3, s.y);
          ctx.lineTo(s.x, s.y + r);
          ctx.lineTo(s.x - r * 0.3, s.y);
          ctx.closePath();
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(s.x - r, s.y);
          ctx.lineTo(s.x, s.y + r * 0.3);
          ctx.lineTo(s.x + r, s.y);
          ctx.lineTo(s.x, s.y - r * 0.3);
          ctx.closePath();
          ctx.fill();
        } else {
          // Standard circular star
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // Render drifting stardust
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
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Check shooting star trigger
      const now = Date.now();
      if (!shootingStar.active && now - lastShootingStarTime > nextShootingStarDelay) {
        shootingStar = {
          x: Math.random() * (width * 0.7),
          y: Math.random() * (height * 0.4),
          length: 120 + Math.random() * 80,
          speed: 16 + Math.random() * 8,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.25,
          alpha: 1,
          color: Math.random() > 0.4 ? '#ffffff' : '#ffd84d',
          active: true,
        };
        lastShootingStarTime = now;
        nextShootingStarDelay = 6000 + Math.random() * 9000;
      }

      // Render shooting star
      if (shootingStar.active) {
        const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
        const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;

        const starGrad = ctx.createLinearGradient(tailX, tailY, shootingStar.x, shootingStar.y);
        starGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        starGrad.addColorStop(0.7, 'rgba(0, 240, 255, 0.4)');
        starGrad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');

        ctx.save();
        ctx.strokeStyle = starGrad;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(shootingStar.x, shootingStar.y);
        ctx.stroke();

        // Glowing star head
        ctx.fillStyle = shootingStar.color;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(shootingStar.x, shootingStar.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;

        if (shootingStar.x > width + 100 || shootingStar.y > height + 100) {
          shootingStar.active = false;
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Subtle organic cloud gradient overlays at top and bottom edges */}
      <div 
        className="absolute top-0 left-0 right-0 h-48 opacity-40 mix-blend-screen pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(255,133,179,0.3), rgba(255,216,77,0.15), transparent 75%)',
        }}
      />
      <div 
        className="absolute bottom-0 left-0 right-0 h-64 opacity-35 mix-blend-screen pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,240,255,0.25), rgba(255,133,179,0.1), transparent 70%)',
        }}
      />
    </div>
  );
};
