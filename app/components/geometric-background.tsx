import React, { useEffect, useRef } from 'react';

interface GeometricBackgroundProps {
  className?: string;
}

const SPACING = 34;
const MOUSE_RADIUS = 160;
const PUSH_DISTANCE = 18;

export const GeometricBackground: React.FC<GeometricBackgroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !container || !ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let raf = 0;

    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      strength: 0,
      targetStrength: 0,
      entered: false,
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / SPACING) + 1;
      rows = Math.ceil(height / SPACING) + 1;
    };

    const draw = (time: number) => {
      mouse.x += (mouse.targetX - mouse.x) * 0.14;
      mouse.y += (mouse.targetY - mouse.y) * 0.14;
      mouse.strength += (mouse.targetStrength - mouse.strength) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const total = cols * rows;
      const xs = new Float32Array(total);
      const ys = new Float32Array(total);
      const glows = new Float32Array(total);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const i = row * cols + col;
          const baseX = col * SPACING;
          const baseY = row * SPACING;
          const wave = reducedMotion
            ? 0
            : Math.sin(time * 0.0012 + col * 0.55 + row * 0.35) * 2.5;

          const dx = baseX - mouse.x;
          const dy = baseY - mouse.y;
          const dist = Math.hypot(dx, dy) || 1;
          const proximity = Math.max(0, 1 - dist / MOUSE_RADIUS) * mouse.strength;
          // smoothstep para suavizar a borda do raio de influência
          const glow = proximity * proximity * (3 - 2 * proximity);
          const push = glow * PUSH_DISTANCE;

          xs[i] = baseX + (dx / dist) * push;
          ys[i] = baseY + wave + (dy / dist) * push;
          glows[i] = glow;
        }
      }

      ctx.lineWidth = 1;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const i = row * cols + col;
          if (glows[i] < 0.03) continue;

          if (col < cols - 1) {
            const right = i + 1;
            const alpha = Math.min(glows[i], glows[right]) * 0.5;
            if (alpha > 0.015) {
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(xs[i], ys[i]);
              ctx.lineTo(xs[right], ys[right]);
              ctx.stroke();
            }
          }
          if (row < rows - 1) {
            const below = i + cols;
            const alpha = Math.min(glows[i], glows[below]) * 0.5;
            if (alpha > 0.015) {
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(xs[i], ys[i]);
              ctx.lineTo(xs[below], ys[below]);
              ctx.stroke();
            }
          }
        }
      }

      for (let i = 0; i < total; i++) {
        const glow = glows[i];
        const alpha = 0.16 + glow * 0.84;
        const radius = 1 + glow * 2.2;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(xs[i], ys[i], radius, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = event.clientX - rect.left;
      mouse.targetY = event.clientY - rect.top;
      mouse.targetStrength = 1;
      if (!mouse.entered) {
        mouse.entered = true;
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      }
    };

    const onPointerLeave = () => {
      mouse.targetStrength = 0;
      mouse.entered = false;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerleave', onPointerLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};

export default GeometricBackground;
