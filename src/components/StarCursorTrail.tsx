import React, { useEffect, useRef } from 'react';

interface TrailParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
  isStar: boolean;
}

export const StarCursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: TrailParticle[] = [];
    const maxParticles = 40;
    const colors = ['#ffd84d', '#00f0ff', '#ff85b3', '#fffdf5', '#ffe66d'];

    let lastX = -100;
    let lastY = -100;
    let lastTime = 0;
    let isMouseOnWindow = false;

    const handleMouseMove = (e: MouseEvent) => {
      isMouseOnWindow = true;
      const now = performance.now();
      // Throttle spawn rate to keep it lightweight (at least 20ms between spawns)
      if (now - lastTime < 24) return;
      lastTime = now;

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.hypot(dx, dy);

      // Only spawn if mouse actually moved
      if (dist > 4) {
        lastX = e.clientX;
        lastY = e.clientY;

        const count = dist > 40 ? 2 : 1;
        for (let i = 0; i < count; i++) {
          if (particles.length >= maxParticles) {
            particles.shift(); // Remove oldest to maintain strict bound
          }

          particles.push({
            x: e.clientX + (Math.random() - 0.5) * 8,
            y: e.clientY + (Math.random() - 0.5) * 8,
            size: Math.random() * 3.5 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            decay: Math.random() * 0.025 + 0.025, // Fades in ~0.6-1.0s
            vx: (Math.random() - 0.5) * 0.8,
            vy: Math.random() * 0.6 + 0.2, // Subtle gravity drift down
            rotation: Math.random() * Math.PI,
            rotSpeed: (Math.random() - 0.5) * 0.08,
            isStar: Math.random() > 0.35, // 65% are 4-pointed stars
          });
        }
      }
    };

    const handleMouseLeave = () => {
      isMouseOnWindow = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.isStar) {
          // Draw cute 4-pointed diamond star sparkle
          const r = p.size;
          ctx.beginPath();
          ctx.moveTo(0, -r);
          ctx.quadraticCurveTo(0, 0, r, 0);
          ctx.quadraticCurveTo(0, 0, 0, r);
          ctx.quadraticCurveTo(0, 0, -r, 0);
          ctx.quadraticCurveTo(0, 0, 0, -r);
          ctx.closePath();
          ctx.fill();

          // Small inner core
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.35, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Small soft circular stardust
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      style={{ willChange: 'transform' }}
    />
  );
};
