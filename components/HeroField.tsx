'use client';

import { useEffect, useRef } from 'react';

/**
 * The hero's quiet signature: a fine ink dot-grid on the paper that ripples
 * away from the cursor and settles. Static under prefers-reduced-motion.
 * Purely decorative (aria-hidden), ink-on-paper, no color.
 */
export default function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const PITCH = 20;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    type Ripple = { x: number; y: number; born: number };
    let ripples: Ripple[] = [];
    let lastPointer = 0;

    const size = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      ripples = ripples.filter((r) => now - r.born < 1400);
      for (let gy = PITCH; gy < h; gy += PITCH) {
        for (let gx = PITCH; gx < w + PITCH; gx += PITCH) {
          let dx = 0;
          let dy = 0;
          let glow = 0;
          for (const r of ripples) {
            const age = (now - r.born) / 1400; // 0..1
            const radius = age * 340;
            const ddx = gx - r.x;
            const ddy = gy - r.y;
            const dist = Math.hypot(ddx, ddy) || 1;
            const band = Math.exp(-((dist - radius) ** 2) / (2 * 42 ** 2));
            const force = band * (1 - age) * 7;
            dx += (ddx / dist) * force;
            dy += (ddy / dist) * force;
            glow += band * (1 - age);
          }
          const alpha = Math.min(glow * 0.5, 0.75);
          ctx.fillStyle = `rgba(179, 166, 255, ${alpha})`;
          ctx.fillRect(gx + dx - 0.75, gy + dy - 0.75, 1.5, 1.5);
        }
      }
    };

    const tick = () => {
      draw(performance.now());
      if (ripples.length > 0) raf = requestAnimationFrame(tick);
      else raf = 0;
    };

    const onPointer = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastPointer < 90) return; // throttle ripple spawn
      lastPointer = now;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
      ripples.push({ x, y, born: now });
      if (ripples.length > 14) ripples = ripples.slice(-14);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    size();
    const ro = new ResizeObserver(size);
    ro.observe(canvas);
    if (!reduced) window.addEventListener('pointermove', onPointer, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
