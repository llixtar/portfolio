"use client";

import React, { useEffect, useRef } from "react";

interface DigitParticle {
  x: number;
  y: number;
  speed: number;
  char: string;
  size: number;
  opacity: number;
}

export default function DigitalRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let lastWidth = 0;

    // Підтримка високої чіткості Retina/OLED для мобільних (DPI)
    const resizeCanvas = (force = false) => {
      if (!canvas) return;
      // Ігноруємо коливання висоти через тулбари мобільних браузерів при скролі,
      // перераховуємо тільки якщо реально змінилася ширина або це перший запуск
      if (!force && Math.abs(window.innerWidth - lastWidth) < 12) {
        return;
      }
      lastWidth = window.innerWidth;

      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Максимум 2 для балансу продуктивності та чіткості
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Скидання попередніх трансформацій
      ctx.scale(dpr, dpr);
    };

    resizeCanvas(true);
    const handleResize = () => resizeCanvas(false);
    window.addEventListener("resize", handleResize);

    // Суто цифри (0-9) без довгих рядків, щоб вони падали рівно й однаково
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    // Кількість цифр адаптована під ширину смартфона/десктопа
    const particleCount = width < 768 ? 42 : 85;

    // Кожна цифра створюється один раз, має стабільну швидкість і не змінює свій символ
    const particles: DigitParticle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 45 + Math.random() * 45, // Швидкість у пікселях на секунду (рівномірне, плавне падіння)
      char: digits[Math.floor(Math.random() * digits.length)],
      size: Math.floor(12 + Math.random() * 4), // 12px - 15px
      opacity: 0.05 + Math.random() * 0.12, // Делікатна напівпрозорість
    }));

    let lastTime = performance.now();

    const render = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1); // Секунди з обмеженням стрибків
      lastTime = now;

      // Чисте очищення без залишків і смуг
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speed * delta;

        // Коли цифра перетинає нижній край екрана — плавно перезапускаємо її зверху
        if (p.y > height + 25) {
          p.y = -25;
          p.x = Math.random() * width;
          p.speed = 45 + Math.random() * 45;
          p.char = digits[Math.floor(Math.random() * digits.length)];
        }

        ctx.font = `${p.size}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
        ctx.fillStyle = `rgba(220, 220, 220, ${p.opacity})`;
        ctx.fillText(p.char, Math.round(p.x), Math.round(p.y));
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 blur-[0.4px]"
    />
  );
}
