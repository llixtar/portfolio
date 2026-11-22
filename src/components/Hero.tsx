"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Smartphone,
  Eye,
  Code2,
  Sliders,
  Banknote,
  Send,
  ArrowDown,
  ChevronDown,
} from "lucide-react";

export default function Hero() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const touchStartTimeRef = React.useRef(0);

  // Автоматичне періодичне перевертання монетки з паузою для читання
  useEffect(() => {
    // Якщо користувач навів курсор або утримує пальцем — зупиняємо авто-переворот
    if (isHovered || isTouching) return;

    const timeoutId = setTimeout(
      () => {
        setIsFlipped((prev) => !prev);
      },
      isFlipped ? 3500 : 5500 // 3.5 сек показуємо зворот (інфу), 5.5 сек показуємо фото
    );

    return () => clearTimeout(timeoutId);
  }, [isFlipped, isHovered, isTouching]);

  // Обробка дотику на мобільних: утримання пальця фіксує зворот
  const handleTouchStart = () => {
    touchStartTimeRef.current = Date.now();
    setIsTouching(true);
  };

  const handleTouchEnd = () => {
    const duration = Date.now() - touchStartTimeRef.current;
    setIsTouching(false);

    if (duration >= 250) {
      // Якщо палець утримували: при відпусканні одразу повертаємося на лицьову сторону
      setIsFlipped(false);
    } else {
      // Якщо це був швидкий тап: перевертаємо та даємо 3.5 сек спокійно прочитати
      setIsFlipped(true);
    }
  };

  const showBack = isHovered || isTouching || isFlipped;

  return (
    <section className="relative min-h-dvh md:h-dvh md:max-h-dvh flex flex-col items-center bg-transparent px-4 sm:px-6 md:px-8 pt-10 pb-10 sm:pt-8 sm:pb-8 md:py-6 text-center overflow-hidden">
      {/* ГОЛОВНИЙ ШИРОКОФОРМАТНИЙ КОНТЕНТ (РОЗПОДІЛЕНИЙ ПО ВИСОТІ ВІД ВЕРХУ ДО НИЗУ) */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex-1 flex flex-col justify-between items-center py-1 sm:py-2">

        {/* 1. ВЕРХНІЙ БЛОК: 3D АВАТАР-МОНЕТКА (ОПУЩЕНА ТРОХИ НИЖЧЕ) ТА ПЛАШКА СТАТУСУ */}
        <div className="flex flex-col items-center pt-2 sm:pt-1">
          <div
            className="relative cursor-pointer select-none perspective-1000 group [touch-action:manipulation] [-webkit-touch-callout:none]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setIsFlipped(false);
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={() => {
              setIsTouching(false);
              setIsFlipped(false);
            }}
            onClick={() => {
              // Додатковий клік для десктопу
              if (!isTouching) {
                setIsFlipped((prev) => !prev);
              }
            }}
            title="Натисніть або наведіть, щоб переглянути статус"
          >
            {/* М'яка аура світіння позаду монетки */}
            <div className="absolute -inset-2 rounded-full bg-white/10 blur-xl pointer-events-none transition-all duration-500 group-hover:bg-white/20 group-hover:scale-110" />

            {/* 3D-монетка розробника: обертається навколо осі Y */}
            <div
              className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 transition-transform duration-700 ease-out preserve-3d"
              style={{
                transform: showBack ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* ── ЛИЦЬОВА СТОРОНА: ФОТО АВАТАРА ── */}
              <div className="absolute inset-0 w-full h-full rounded-full p-[3.5px] bg-gradient-to-b from-neutral-400 via-neutral-700 to-neutral-950 shadow-[0_20px_40px_rgba(0,0,0,0.95),0_2px_12px_rgba(255,255,255,0.18)] backface-hidden [transform:translateZ(1px)]">
                <div className="w-full h-full p-[3px] rounded-full bg-gradient-to-b from-[#1c1e26] to-[#08090c] shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-2px_5px_rgba(0,0,0,0.9)]">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-neutral-950 shadow-[inset_0_0_14px_rgba(0,0,0,0.85)]">
                    <Image
                      src="/avatar-profile.jpg"
                      alt="Розробник"
                      fill
                      className="object-cover object-center pointer-events-none select-none grayscale contrast-[1.08] brightness-[0.98]"
                      priority
                      draggable={false}
                    />
                  </div>
                </div>
              </div>

              {/* ── ЗВОРОТНА СТОРОНА: ДОСВІД (МЕТАЛЕВИЙ РЕВЕРС) ── */}
              <div className="absolute inset-0 w-full h-full rounded-full p-[3.5px] bg-gradient-to-b from-neutral-400 via-neutral-700 to-neutral-950 shadow-[0_20px_40px_rgba(0,0,0,0.95),0_2px_12px_rgba(255,255,255,0.18)] backface-hidden [transform:rotateY(180deg)_translateZ(1px)]">
                <div className="w-full h-full p-[3px] rounded-full bg-gradient-to-b from-[#1c1e26] to-[#08090c] shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-2px_5px_rgba(0,0,0,0.9)]">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-[#181a22] via-[#0f1015] to-[#07080a] p-2.5 sm:p-3 flex flex-col items-center justify-center text-center shadow-[inset_0_2px_6px_rgba(255,255,255,0.1),inset_0_-4px_12px_rgba(0,0,0,0.95)]">
                    {/* Внутрішній контур карбування */}
                    <div className="w-full h-full rounded-full border border-neutral-800/80 p-2 sm:p-3 flex flex-col items-center justify-center bg-black/40 shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)]">

                      {/* ДОСВІД: 6+ РОКІВ */}
                      <span className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                        6+ років
                      </span>
                      <span className="font-mono text-[9px] sm:text-[10px] md:text-xs text-neutral-400 uppercase tracking-widest mt-1 text-center leading-tight">
                        у командній розробці
                      </span>

                      {/* МІКРО-АКЦЕНТ КАРБУВАННЯ */}
                      <div className="flex items-center gap-1.5 mt-2 opacity-60">
                        <span className="w-1 h-1 rounded-full bg-neutral-500" />
                        <span className="font-mono text-[8px] sm:text-[9px] text-neutral-400 tracking-widest uppercase">
                          Fullstack
                        </span>
                        <span className="w-1 h-1 rounded-full bg-neutral-500" />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Плашка під аватаром: 3D СТЕЛС-БЕЙДЖ (ДИЗАЙН ЯК У КНОПКИ, ОПУЩЕНА ВІД АВАТАРУ) */}
          <div className="relative inline-flex p-[1px] pb-[2.5px] mt-4 sm:mt-4.5 bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 [clip-path:polygon(7px_0,calc(100%-7px)_0,100%_7px,100%_calc(100%-7px),calc(100%-7px)_100%,7px_100%,0_calc(100%-7px),0_7px)] shadow-[0_6px_16px_rgba(0,0,0,0.9)] select-none">
            <div className="relative px-3.5 py-1 bg-gradient-to-b from-[#1c1f28] via-[#12141c] to-[#0a0b10] [clip-path:polygon(6px_0,calc(100%-6px)_0,100%_6px,100%_calc(100%-6px),calc(100%-6px)_100%,6px_100%,0_calc(100%-6px),0_6px)] flex items-center gap-2 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.85)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
              <span className="font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase font-medium text-neutral-300">
                Відкритий до замовлень
              </span>
            </div>
          </div>
        </div>

        {/* 2. СЕРЕДНІЙ БЛОК: ЗАГОЛОВОК (ЗБАЛАНСОВАНИЙ МІЖ АВАТАРОМ ТА ОПИСОМ) */}
        <div className="w-full flex flex-col items-center my-auto py-3 sm:py-4">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white tracking-tight leading-[1.18] w-full text-center max-w-4xl">
            Розробка інтернет-магазинів та сайтів під ключ
          </h1>
        </div>

        {/* 3. НИЖНІЙ БЛОК: ОПИС + ВІДСТУП З ПОВІТРЯМ + 3D СТЕЛС-КНОПКА */}
        <div className="w-full flex flex-col items-center space-y-8 sm:space-y-9 md:space-y-9 pb-2 sm:pb-3">
          {/* ОПИС ПІДТЯГНУТИЙ ДО ЛІВОГО КРАЮ */}
          <div className="w-full flex flex-col items-start text-left">
            <div className="w-full max-w-4xl space-y-3 sm:space-y-3 md:space-y-3.5">
              {/* 1. Mobile First */}
              <div className="flex items-start gap-2.5 sm:gap-3">
                <Smartphone className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-neutral-400 shrink-0 mt-0.5" />
                <p className="text-sm sm:text-sm md:text-[15px] text-neutral-300 font-light leading-snug lg:whitespace-nowrap">
                  <strong className="text-white font-medium">Мобільна версія в пріоритеті:</strong> ідеальна зручність для покупців зі смартфонів.
                </p>
              </div>

              {/* 2. Жива демка онлайн */}
              <div className="flex items-start gap-2.5 sm:gap-3">
                <Eye className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-neutral-400 shrink-0 mt-0.5" />
                <p className="text-sm sm:text-sm md:text-[15px] text-neutral-300 font-light leading-snug lg:whitespace-nowrap">
                  <strong className="text-white font-medium">Живе демо під час роботи:</strong> бачите проєкт онлайн на кожному етапі та коригуєте в процесі.
                </p>
              </div>

              {/* 3. Без шаблонів */}
              <div className="flex items-start gap-2.5 sm:gap-3">
                <Code2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-neutral-400 shrink-0 mt-0.5" />
                <p className="text-sm sm:text-sm md:text-[15px] text-neutral-300 font-light leading-snug lg:whitespace-nowrap">
                  <strong className="text-white font-medium">Жодних шаблонів:</strong> індивідуальна розробка та чистий швидкий код під вашу справу.
                </p>
              </div>

              {/* 4. Адмінка та кабінети */}
              <div className="flex items-start gap-2.5 sm:gap-3">
                <Sliders className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-neutral-400 shrink-0 mt-0.5" />
                <p className="text-sm sm:text-sm md:text-[15px] text-neutral-300 font-light leading-snug lg:whitespace-nowrap">
                  <strong className="text-white font-medium">Адмін-панелі та кабінети:</strong> повне керування меню, цінами, доставкою та клієнтами.
                </p>
              </div>

              {/* 5. Telegram-бот бонусом */}
              <div className="flex items-start gap-2.5 sm:gap-3">
                <Send className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-neutral-400 shrink-0 mt-0.5" />
                <p className="text-sm sm:text-sm md:text-[15px] text-neutral-300 font-light leading-snug lg:whitespace-nowrap">
                  <strong className="text-white font-medium">Telegram-бот бонусом:</strong> налаштованого бота для миттєвих сповіщень про замовлення дарую в подарунок.
                </p>
              </div>

              {/* 6. Оплата в кінці */}
              <div className="flex items-start gap-2.5 sm:gap-3">
                <Banknote className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-neutral-400 shrink-0 mt-0.5" />
                <p className="text-sm sm:text-sm md:text-[15px] text-neutral-300 font-light leading-snug lg:whitespace-nowrap">
                  <strong className="text-white font-medium">Оплата в кінці:</strong> розрахунок тільки після того, як ви особисто затвердите готову демку.
                </p>
              </div>
            </div>
          </div>

          {/* 3D СТЕЛС-КНОПКА, ЩО ПАРИТЬ НАД СТОРІНКОЮ (ЛЕВІТАЦІЯ) */}
          <div className="w-full flex flex-col items-center justify-center pt-2 sm:pt-2 pb-2">
            <div className="relative group inline-flex items-center justify-center">
              {/* Нижня реалістична тінь левітації (синхронно блідне і стискається при підйомі) */}
              <div
                className="absolute -bottom-2 w-[85%] h-4 rounded-[50%] bg-black/80 blur-md pointer-events-none animate-float-shadow transition-all duration-300 group-hover:scale-110 group-hover:opacity-80"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-3.5 w-[95%] h-6 rounded-[50%] bg-black/60 blur-xl pointer-events-none animate-float-shadow"
                aria-hidden="true"
              />

              <a
                href="#projects"
                className="relative inline-flex p-[1.5px] pb-[4px] bg-gradient-to-b from-neutral-600 via-neutral-700 to-neutral-900 hover:from-neutral-400 hover:to-neutral-600 [clip-path:polygon(12px_0,calc(100%-12px)_0,100%_12px,100%_calc(100%-12px),calc(100%-12px)_100%,12px_100%,0_calc(100%-12px),0_12px)] transition-all duration-300 hover:drop-shadow-[0_8px_24px_rgba(255,255,255,0.25)] cursor-pointer select-none active:translate-y-[2px] animate-float drop-shadow-[0_12px_22px_rgba(0,0,0,0.85)]"
              >
                {/* Внутрішня 3D-грань кнопки */}
                <div className="relative w-full h-full px-9 py-3.5 sm:px-12 sm:py-4 bg-gradient-to-b from-[#1c1f28] via-[#12141c] to-[#0a0b10] group-hover:from-[#222531] group-hover:to-[#0e1017] [clip-path:polygon(11px_0,calc(100%-11px)_0,100%_11px,100%_calc(100%-11px),calc(100%-11px)_100%,11px_100%,0_calc(100%-11px),0_11px)] flex items-center justify-center overflow-hidden shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2),inset_0_-1.5px_0_rgba(0,0,0,0.8)] transition-colors duration-300">

                  {/* Чистий монохромний текст з анімованою світловою хвилею */}
                  <span className="font-mono text-xs sm:text-sm tracking-[0.22em] uppercase font-semibold animate-text-wave select-none">
                    ПЕРЕГЛЯНУТИ РОБОТИ
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
