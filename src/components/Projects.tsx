"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ExternalLink,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  Layers,
  Globe,
  Smartphone,
  Monitor,
  MapPin,
  UserCheck,
  Sliders,
  SlidersHorizontal,
  Send,
  Palette,
  Heart,
  ShoppingBag,
  Target,
  Users,
  BookOpen,
  Award,
  Zap,
  Clock,
  Calculator,
  PhoneCall,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { projectsData, Project } from "@/data/projects";

// СТУДІЙНИЙ МОКАП З РОЗУМНИМ СВАПОМ ДЛЯ МОБІЛКИ ТА ДЕСКТОПА
function InteractiveSwapShowcase({
  project,
  phonePosition = "bottom-right",
}: {
  project: Project;
  phonePosition?: "bottom-right" | "top-left" | "bottom-left" | "top-right";
}) {
  const [desktopError, setDesktopError] = useState(false);
  const [mobileError, setMobileError] = useState(false);

  // Стан фокусу: "desktop" або "phone"
  const [activeDevice, setActiveDevice] = useState<"desktop" | "phone">("desktop");
  // Стан періодичного "виглядання" фонового девайса (точно як при наведенні миші)
  const [isPeeking, setIsPeeking] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setActiveDevice("phone");
    }
  }, []);

  // Таймер періодичного "виглядання" для фонового девайса (кожні 3.8 сек визирає на 950 мс)
  useEffect(() => {
    let hideTimeout: ReturnType<typeof setTimeout>;

    const triggerPeek = () => {
      setIsPeeking(true);
      hideTimeout = setTimeout(() => {
        setIsPeeking(false);
      }, 950);
    };

    // Перший поштовх через 2 секунди після появи, далі кожні 4 секунди
    const startDelay = setTimeout(triggerPeek, 2000);
    const interval = setInterval(triggerPeek, 4000);

    return () => {
      clearTimeout(startDelay);
      clearInterval(interval);
      clearTimeout(hideTimeout);
    };
  }, [activeDevice]);

  // Накопичувачі субпіксельних зміщень для ідеально плавної автопрокрутки (60-120 fps)
  const bgDesktopOffsetRef = useRef(0);
  const bgPhoneOffsetRef = useRef(0);

  // Рефи для мобільного представлення (< md)
  const mobilePhoneForegroundRef = useRef<HTMLDivElement>(null);
  const mobileDesktopForegroundRef = useRef<HTMLDivElement>(null);
  const mobileDesktopBgRef = useRef<HTMLDivElement>(null);
  const mobilePhoneBgRef = useRef<HTMLDivElement>(null);

  // Рефи для десктопного представлення (>= md)
  const desktopMonitorForegroundRef = useRef<HTMLDivElement>(null);
  const desktopPhoneForegroundRef = useRef<HTMLDivElement>(null);
  const desktopPhoneBgRef = useRef<HTMLDivElement>(null);
  const desktopMonitorBgRef = useRef<HTMLDivElement>(null);

  const desktopImage = project.desktopImage;
  const mobileImage = project.mobileImage;

  // Скидання положення скролу до початкового (хедер / початок сторінки)
  const resetToInitialPosition = (device: "desktop" | "phone") => {
    if (device === "desktop") {
      bgDesktopOffsetRef.current = 0;
      if (mobileDesktopForegroundRef.current) mobileDesktopForegroundRef.current.scrollTop = 0;
      if (desktopMonitorForegroundRef.current) desktopMonitorForegroundRef.current.scrollTop = 0;
      if (mobileDesktopBgRef.current) mobileDesktopBgRef.current.scrollTop = 0;
      if (desktopMonitorBgRef.current) desktopMonitorBgRef.current.scrollTop = 0;
    } else {
      bgPhoneOffsetRef.current = 0;
      if (mobilePhoneForegroundRef.current) mobilePhoneForegroundRef.current.scrollTop = 0;
      if (desktopPhoneForegroundRef.current) desktopPhoneForegroundRef.current.scrollTop = 0;
      if (mobilePhoneBgRef.current) mobilePhoneBgRef.current.scrollTop = 0;
      if (desktopPhoneBgRef.current) desktopPhoneBgRef.current.scrollTop = 0;
    }
  };

  const swapDevice = (newDevice: "desktop" | "phone") => {
    setActiveDevice(newDevice);
    resetToInitialPosition(newDevice);
    requestAnimationFrame(() => {
      resetToInitialPosition(newDevice);
    });
  };

  const handleDeviceClick = (targetDevice: "desktop" | "phone") => {
    if (activeDevice !== targetDevice) {
      swapDevice(targetDevice);
    } else {
      // Клік на вже активний девайс — миттєво повертає скріншот до початку
      resetToInitialPosition(targetDevice);
    }
  };

  // Гарантоване скидання скролу активного девайса до початку при будь-якому перемиканні
  useEffect(() => {
    resetToInitialPosition(activeDevice);
    const rId = requestAnimationFrame(() => {
      resetToInitialPosition(activeDevice);
    });
    return () => cancelAnimationFrame(rId);
  }, [activeDevice]);

  // =============================================================
  // ЄДИНЕ ЗАЛІЗНЕ ПРАВИЛО:
  // - НА ОСНОВНОМУ (FOREGROUND) ДЕВАЙСІ — 100% РУЧНИЙ СКРОЛ (зупинка на хедері вгорі, цикл унизу)
  // - НА ФОНОВОМУ (BACKGROUND) ДЕВАЙСІ — ПЛАВНА ЦИКЛІЧНА АВТОПРОКРУТКА
  // =============================================================
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    const speed = 28; // Плавна, комфортна швидкість для фонового девайса

    const loop = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (activeDevice === "phone") {
        // Фоновий девайс — ДЕСКТОПНИЙ МОНІТОР
        bgDesktopOffsetRef.current += speed * delta;

        const containers = [
          mobileDesktopBgRef.current,
          desktopMonitorBgRef.current,
        ];

        containers.forEach((container) => {
          if (container) {
            const H = container.scrollHeight / 2;
            if (H > 0) {
              if (bgDesktopOffsetRef.current >= H) {
                bgDesktopOffsetRef.current -= H;
              }
              container.scrollTop = bgDesktopOffsetRef.current;
            }
          }
        });
      } else {
        // Фоновий девайс — СМАРТФОН
        bgPhoneOffsetRef.current += speed * delta;

        const containers = [
          mobilePhoneBgRef.current,
          desktopPhoneBgRef.current,
        ];

        containers.forEach((container) => {
          if (container) {
            const H = container.scrollHeight / 2;
            if (H > 0) {
              if (bgPhoneOffsetRef.current >= H) {
                bgPhoneOffsetRef.current -= H;
              }
              container.scrollTop = bgPhoneOffsetRef.current;
            }
          }
        });
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [activeDevice, desktopImage, mobileImage]);

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      
      {/* ========================================================= */}
      {/* 📱 1. МОБІЛЬНЕ ПРЕДСТАВЛЕННЯ (видиме на екранах < md: 768px) */}
      {/* ========================================================= */}
      <div className="relative w-full flex items-center justify-center pt-12 pb-4 min-h-[min(500px,70vh)] md:hidden">
        
        {/* А) СМАРТФОН (на мобілці): */}
        <div
          onClick={() => handleDeviceClick("phone")}
          className={`transition-all duration-500 ease-out flex flex-col ${
            activeDevice === "phone"
              ? "relative z-20 w-[min(225px,54vw)] h-[min(440px,62vh)] opacity-100 scale-100"
              : phonePosition === "top-left" || phonePosition === "bottom-left"
                ? `absolute -top-10 left-1 z-10 w-[min(145px,38vw)] h-[min(280px,40vh)] cursor-pointer hover:rotate-[-5deg] active:scale-95 ${
                    isPeeking
                      ? "rotate-[-4deg] -translate-x-2.5 -translate-y-2 scale-[1.04] opacity-100"
                      : "rotate-[-12deg] opacity-95"
                  }`
                : `absolute -top-6 right-3 z-10 w-[min(140px,36vw)] h-[min(270px,38vh)] cursor-pointer hover:rotate-[2deg] active:scale-95 ${
                    isPeeking
                      ? "rotate-[1deg] translate-x-2.5 -translate-y-2 scale-[1.04] opacity-100"
                      : "rotate-[6deg] opacity-90"
                  }`
          }`}
        >
          {/* Корпус смартфона */}
          <div
            className={`w-full h-full bg-gradient-to-b from-[#3a3d45] via-[#242730] to-[#14161c] border-2 border-[#4b5563] shadow-[0_25px_70px_rgba(0,0,0,0.98)] ring-1 ring-white/20 transition-all flex flex-col ${
              activeDevice === "phone"
                ? "p-2 rounded-[38px]"
                : "p-1.5 rounded-[28px]"
            }`}
          >
            {/* Dynamic Island */}
            <div
              className={`bg-neutral-950 rounded-full mx-auto flex items-center justify-center z-40 transition-all ${
                activeDevice === "phone" ? "w-12 h-3 mb-1.5" : "w-8 h-2 mb-1"
              }`}
            >
              <span className="w-1 h-1 rounded-full bg-neutral-800" />
            </div>

            {/* Внутрішній екран смартфона */}
            <div
              ref={activeDevice === "phone" ? mobilePhoneForegroundRef : mobilePhoneBgRef}
              className={`relative w-full flex-1 overflow-x-hidden bg-neutral-950 border border-neutral-800/80 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-neutral-800 transition-all ${
                activeDevice === "phone"
                  ? "overflow-y-auto cursor-grab active:cursor-grabbing rounded-[30px]"
                  : "overflow-hidden pointer-events-none rounded-[22px]"
              }`}
            >
              {mobileImage && !mobileError ? (
                <div className="relative w-full flex flex-col">
                  <img
                    src={mobileImage}
                    alt={`${project.title} - Mobile`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto block select-none pointer-events-none"
                    onError={() => setMobileError(true)}
                  />
                  {activeDevice !== "phone" && (
                    <img
                      src={mobileImage}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto block select-none pointer-events-none"
                    />
                  )}
                </div>
              ) : null}
            </div>

            {/* Домен тільки коли телефон на передньому плані */}
            {activeDevice === "phone" && (
              <div className="pt-2 text-center">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-mono text-neutral-300 hover:text-white flex items-center justify-center gap-1"
                >
                  <Globe className="w-3 h-3 text-emerald-400" />
                  <span>{project.demoUrl?.replace("https://", "").replace(/\/$/, "")}</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Б) ДЕСКТОПНИЙ МОНІТОР (на мобілці): */}
        <div
          onClick={() => handleDeviceClick("desktop")}
          className={`transition-all duration-500 ease-out flex flex-col items-center ${
            activeDevice === "desktop"
              ? "relative z-20 w-full opacity-100 scale-100"
              : phonePosition === "top-left" || phonePosition === "bottom-left"
                ? `absolute right-0 bottom-2 z-10 w-[min(150px,40vw)] cursor-pointer hover:rotate-0 hover:opacity-100 active:scale-95 ${
                    isPeeking
                      ? "rotate-[-4deg] translate-x-2 -translate-y-3 scale-[1.06] opacity-100"
                      : "rotate-[3deg] opacity-85"
                  }`
                : `absolute left-0 bottom-2 z-10 w-[min(150px,40vw)] cursor-pointer hover:rotate-0 hover:opacity-100 active:scale-95 ${
                    isPeeking
                      ? "rotate-[4deg] -translate-x-2 -translate-y-3 scale-[1.06] opacity-100"
                      : "rotate-[-3deg] opacity-85"
                  }`
          }`}
        >
          {/* Корпус монітора */}
          <div
            className={`w-full bg-gradient-to-b from-[#3a3d45] via-[#242730] to-[#1a1c23] border border-[#4b5563]/90 shadow-[0_30px_90px_rgba(0,0,0,0.95)] ring-1 ring-white/20 transition-all ${
              activeDevice === "desktop"
                ? "p-2.5 sm:p-3 rounded-[24px]"
                : "p-1.5 rounded-xl"
            }`}
          >
            {/* Вічко камери */}
            {activeDevice === "desktop" && (
              <div className="flex items-center justify-center pb-1.5">
                <div className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-600/80 flex items-center justify-center">
                  <span className="w-0.5 h-0.5 rounded-full bg-blue-400/80" />
                </div>
              </div>
            )}

            {/* Внутрішній екран монітора */}
            <div
              className={`relative w-full overflow-hidden bg-black border border-black shadow-inner flex flex-col transition-all ${
                activeDevice === "desktop"
                  ? "h-[min(300px,45vh)] rounded-[16px]"
                  : "h-[min(90px,14vh)] rounded-lg"
              }`}
            >
              {/* Шапка Safari */}
              <div
                className={`bg-neutral-950/95 border-b border-neutral-800/90 flex items-center justify-between shrink-0 z-20 ${
                  activeDevice === "desktop" ? "h-9 px-3" : "h-4 px-1.5"
                }`}
              >
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-red-500/90" />
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-yellow-500/90" />
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-500/90" />
                </div>

                {/* Домен по центру у великому вигляді */}
                {activeDevice === "desktop" && (
                  <div className="flex-1 flex justify-center">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 bg-neutral-900/90 hover:bg-neutral-800 px-3 py-1 rounded-md border border-neutral-800 text-[10px] font-mono text-neutral-300 hover:text-white"
                      >
                        <Globe className="w-3 h-3 text-emerald-400" />
                        <span className="truncate">{project.demoUrl.replace("https://", "").replace(/\/$/, "")}</span>
                        <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                      </a>
                    )}
                  </div>
                )}

                {activeDevice === "desktop" && <div className="w-8 shrink-0" />}
              </div>

              {/* Скрол десктопного сайту */}
              <div
                ref={activeDevice === "desktop" ? mobileDesktopForegroundRef : mobileDesktopBgRef}
                className={`relative w-full flex-1 overflow-x-hidden bg-neutral-950 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-neutral-800 ${
                  activeDevice === "desktop"
                    ? "overflow-y-auto cursor-grab active:cursor-grabbing"
                    : "overflow-hidden pointer-events-none"
                }`}
              >
                {desktopImage && !desktopError ? (
                  <div className="relative w-full flex flex-col">
                    <img
                      src={desktopImage}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto block select-none pointer-events-none"
                      onError={() => setDesktopError(true)}
                    />
                    {activeDevice !== "desktop" && (
                      <img
                        src={desktopImage}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto block select-none pointer-events-none"
                      />
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Стенд монітора */}
          {activeDevice === "desktop" ? (
            <div className="flex flex-col items-center">
              <div className="w-20 sm:w-28 h-4 sm:h-5 bg-gradient-to-b from-[#2e313b] to-[#15171e] border-x border-[#4b5563]/80"></div>
              <div className="w-36 sm:w-52 h-2 bg-[#4b5563] rounded-full shadow-xl"></div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-8 h-2 bg-[#20232c] border-x border-[#4b5563]"></div>
              <div className="w-16 h-1 bg-[#4b5563] rounded-full shadow-lg"></div>
            </div>
          )}
        </div>

      </div>

      {/* ========================================================= */}
      {/* 🖥️ 2. ДЕСКТОПНЕ ПРЕДСТАВЛЕННЯ (видиме на екранах md: 768px і вище) */}
      {/* ========================================================= */}
      <div className="hidden md:flex relative w-full items-center justify-center min-h-[min(620px,68vh)]">
        <div className="relative w-full max-w-4xl flex flex-col items-center">
          
          {/* А) ДЕСКТОПНИЙ СТУДІЙНИЙ МОНІТОР: */}
          <div
            onClick={() => handleDeviceClick("desktop")}
            className={`transition-all duration-500 ease-out flex flex-col items-center w-full ${
              activeDevice === "desktop"
                ? "relative z-20 opacity-100 cursor-default"
                : "relative z-10 opacity-70 hover:opacity-90 cursor-pointer"
            }`}
          >
            {/* Корпус монітора */}
            <div className="relative w-full bg-gradient-to-b from-[#3a3d45] via-[#242730] to-[#1a1c23] p-3.5 md:p-4 rounded-[34px] border border-[#4b5563]/90 shadow-[0_30px_90px_rgba(0,0,0,0.95)] ring-1 ring-white/20 transition-all duration-500">
              {/* Вічко камери */}
              <div className="flex items-center justify-center pb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-600/80 flex items-center justify-center shadow-inner">
                  <span className="w-1 h-1 rounded-full bg-blue-400/80" />
                </div>
              </div>

              {/* Внутрішній екран монітора (прив'язаний до висоти екрану) */}
              <div className="relative w-full h-[min(500px,52vh)] md:h-[min(540px,56vh)] rounded-[22px] overflow-hidden bg-black border border-black shadow-inner flex flex-col">
                {/* Шапка Safari */}
                <div className="h-11 bg-neutral-950/95 border-b border-neutral-800/90 px-5 flex items-center justify-between shrink-0 z-20 backdrop-blur-md">
                  <div className="flex items-center gap-1.5 w-24 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/90" />
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/90" />
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/90" />
                  </div>

                  <div className="flex-1 flex justify-center">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => {
                          if (activeDevice !== "desktop") {
                            e.preventDefault();
                            swapDevice("desktop");
                          }
                        }}
                        className="group/url flex items-center gap-2 bg-neutral-900/90 hover:bg-neutral-800 px-4 py-1.5 rounded-lg border border-neutral-800 hover:border-neutral-600 transition-all text-xs font-mono text-neutral-300 hover:text-white shadow-sm"
                      >
                        <Globe className="w-3.5 h-3.5 text-neutral-500 group-hover/url:text-emerald-400 transition-colors" />
                        <span className="truncate">{project.demoUrl.replace("https://", "").replace(/\/$/, "")}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover/url:text-white transition-colors" />
                      </a>
                    )}
                  </div>

                  <div className="w-24 shrink-0" />
                </div>

                {/* Скрол монітора */}
                <div
                  ref={activeDevice === "desktop" ? desktopMonitorForegroundRef : desktopMonitorBgRef}
                  className={`relative w-full flex-1 overflow-x-hidden bg-neutral-950 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-neutral-800 hover:[&::-webkit-scrollbar-thumb]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:rounded-full ${
                    activeDevice === "desktop"
                      ? "overflow-y-auto cursor-grab active:cursor-grabbing"
                      : "overflow-hidden pointer-events-none"
                  }`}
                >
                  {desktopImage && !desktopError ? (
                    <div className="relative w-full flex flex-col">
                      <img
                        src={desktopImage}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto block select-none pointer-events-none"
                        onError={() => setDesktopError(true)}
                      />
                      {activeDevice !== "desktop" && (
                        <img
                          src={desktopImage}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-auto block select-none pointer-events-none"
                        />
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Стенд монітора */}
            <div className="w-36 h-8 bg-gradient-to-b from-[#2e313b] via-[#20232c] to-[#15171e] border-x border-[#4b5563]/80 shadow-md"></div>
            <div className="w-64 h-3 bg-gradient-to-r from-[#2e313b] via-[#4b5563] to-[#2e313b] rounded-full border border-[#6b7280]/80 shadow-2xl"></div>
          </div>

          {/* Б) ДЕСКТОПНИЙ IPHONE: */}
          <div
            onClick={() => handleDeviceClick("phone")}
            className={`transition-all duration-500 ease-out flex flex-col ${
              phonePosition === "top-left"
                ? activeDevice === "phone"
                  ? "z-30 absolute -top-4 md:-top-6 left-0 md:left-4 origin-top-left w-[240px] md:w-[255px] h-[min(510px,58vh)] md:h-[min(540px,61vh)] rotate-0 opacity-100 cursor-default"
                  : `z-10 absolute -top-8 md:-top-12 -left-12 md:-left-20 lg:-left-26 origin-center w-[185px] md:w-[205px] h-[min(400px,46vh)] md:h-[min(430px,49vh)] hover:rotate-[-7deg] hover:-translate-x-2 hover:-translate-y-1.5 hover:opacity-100 cursor-pointer ${
                      isPeeking
                        ? "rotate-[-7deg] -translate-x-2.5 -translate-y-2 scale-[1.03] opacity-100"
                        : "rotate-[-14deg] opacity-95"
                    }`
                : phonePosition === "bottom-left"
                  ? activeDevice === "phone"
                    ? "z-30 absolute -bottom-4 left-0 md:left-4 origin-bottom-left w-[240px] md:w-[255px] h-[min(510px,58vh)] md:h-[min(540px,61vh)] rotate-0 opacity-100 cursor-default"
                    : `z-10 absolute -bottom-5 -left-6 md:-left-12 origin-bottom-left w-[180px] md:w-[195px] h-[min(385px,44vh)] md:h-[min(415px,47vh)] hover:rotate-[-6deg] hover:-translate-x-2 hover:-translate-y-1.5 hover:opacity-100 cursor-pointer ${
                        isPeeking
                          ? "rotate-[-6deg] -translate-x-2.5 -translate-y-2 scale-[1.03] opacity-100"
                          : "rotate-[-12deg] opacity-95"
                      }`
                  : phonePosition === "top-right"
                    ? activeDevice === "phone"
                      ? "z-30 absolute -top-4 md:-top-6 right-0 md:right-4 origin-top-right w-[240px] md:w-[255px] h-[min(510px,58vh)] md:h-[min(540px,61vh)] rotate-0 opacity-100 cursor-default"
                      : `z-10 absolute -top-8 md:-top-12 -right-12 md:-right-20 lg:-right-26 origin-center w-[185px] md:w-[205px] h-[min(400px,46vh)] md:h-[min(430px,49vh)] hover:rotate-[7deg] hover:translate-x-2 hover:-translate-y-1.5 hover:opacity-100 cursor-pointer ${
                          isPeeking
                            ? "rotate-[7deg] translate-x-2.5 -translate-y-2 scale-[1.03] opacity-100"
                            : "rotate-[14deg] opacity-95"
                        }`
                    : activeDevice === "phone"
                      ? "z-30 absolute -bottom-4 right-0 md:right-4 origin-bottom-right w-[240px] md:w-[255px] h-[min(510px,58vh)] md:h-[min(540px,61vh)] rotate-0 opacity-100 cursor-default"
                      : `z-10 absolute -bottom-5 -right-6 md:-right-12 origin-bottom-right w-[180px] md:w-[195px] h-[min(385px,44vh)] md:h-[min(415px,47vh)] hover:rotate-[6deg] hover:translate-x-2 hover:-translate-y-1.5 hover:opacity-100 cursor-pointer ${
                          isPeeking
                            ? "rotate-[6deg] translate-x-2.5 -translate-y-2 scale-[1.03] opacity-100"
                            : "rotate-[12deg] opacity-95"
                        }`
            }`}
          >
            {/* Корпус iPhone */}
            <div
              className={`w-full h-full bg-gradient-to-b from-[#3a3d45] via-[#242730] to-[#14161c] border-2 border-[#4b5563] ring-1 ring-white/20 transition-all flex flex-col ${
                activeDevice === "phone"
                  ? "p-2.5 rounded-[44px] shadow-[0_35px_100px_rgba(0,0,0,0.98)]"
                  : "p-2 rounded-[38px] shadow-2xl"
              }`}
            >
              {/* Dynamic Island */}
              <div
                className={`bg-neutral-950 rounded-full mx-auto flex items-center justify-center z-40 transition-all ${
                  activeDevice === "phone" ? "w-14 h-3.5 mb-2" : "w-11 h-3 mb-1.5"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
              </div>

              {/* Внутрішній екран iPhone */}
              <div
                ref={activeDevice === "phone" ? desktopPhoneForegroundRef : desktopPhoneBgRef}
                className={`relative w-full flex-1 overflow-x-hidden bg-neutral-950 border border-neutral-800/80 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-neutral-800 transition-all ${
                  activeDevice === "phone"
                    ? "overflow-y-auto cursor-grab active:cursor-grabbing rounded-[34px]"
                    : "overflow-hidden pointer-events-none rounded-[30px]"
                }`}
              >
                {mobileImage && !mobileError ? (
                  <div className="relative w-full flex flex-col">
                    <img
                      src={mobileImage}
                      alt={`${project.title} - Mobile`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto block select-none pointer-events-none"
                      onError={() => setMobileError(true)}
                    />
                    {activeDevice !== "phone" && (
                      <img
                        src={mobileImage}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto block select-none pointer-events-none"
                      />
                    )}
                  </div>
                ) : null}
              </div>

              {/* Посилання на домен */}
              <div className="pt-2 text-center">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    if (activeDevice !== "phone") {
                      e.preventDefault();
                      swapDevice("phone");
                    }
                  }}
                  className="text-[11px] font-mono text-neutral-300 hover:text-white flex items-center justify-center gap-1"
                >
                  <Globe className="w-3 h-3 text-emerald-400" />
                  <span>{project.demoUrl?.replace("https://", "").replace(/\/$/, "")}</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default function Projects() {
  const flagship = projectsData.find((p) => p.id === "flagship-project");
  const lepoxy = projectsData.find((p) => p.id === "lepoxy-project");
  const geniusLand = projectsData.find((p) => p.id === "genius-land");
  const tanya = projectsData.find((p) => p.id === "tanya-zaiets");
  const thiamis = projectsData.find((p) => p.id === "thiamis-cleaning");
  const SHOW_CLEANING = false; // Тимчасово приховано за запитом

  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({
    "flagship-project": false,
    "lepoxy-project": false,
    "genius-land": false,
    "tanya-zaiets": false,
    "thiamis-cleaning": false,
  });

  const toggleProject = (id: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="projects" className="relative py-28 px-4 bg-transparent overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto space-y-24">
        
        {/* 1. ФЛАГМАНСЬКИЙ ПРОЄКТ (ІНТЕРАКТИВНИЙ SWAP МОКАП) */}
        {flagship && (
          <div className="space-y-8 md:space-y-10">
            
            {/* Заголовок над мокапом */}
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                Онлайн-сервіс доставки суші <span className="text-neutral-500 font-normal text-2xl sm:text-3xl md:text-4xl">(Польща)</span>
              </h2>
            </div>

            {/* А) ДВОСТОРОННІЙ ІНТЕРАКТИВНИЙ СВАП МОКАП */}
            <div className="w-full">
              <InteractiveSwapShowcase project={flagship} />
            </div>

            {/* Кнопка розгортання / згортання опису (ТІЛЬКИ ДЛЯ МОБІЛКИ — СТИЛЬ СТЕЛС-ПЛАШКИ) */}
            <div className="flex flex-col items-center pt-2 lg:hidden">
              <button
                type="button"
                onClick={() => toggleProject("flagship-project")}
                className="group relative inline-flex p-[1px] pb-[2.5px] bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 hover:from-neutral-400 hover:via-neutral-600 hover:to-neutral-900 [clip-path:polygon(7px_0,calc(100%-7px)_0,100%_7px,100%_calc(100%-7px),calc(100%-7px)_100%,7px_100%,0_calc(100%-7px),0_7px)] shadow-[0_6px_16px_rgba(0,0,0,0.9)] cursor-pointer select-none active:translate-y-[1.5px] active:pb-[1px] transition-all"
              >
                <div className="relative px-3.5 py-1 bg-gradient-to-b from-[#1c1f28] via-[#12141c] to-[#0a0b10] group-hover:from-[#232733] group-hover:via-[#161822] group-hover:to-[#0c0d12] [clip-path:polygon(6px_0,calc(100%-6px)_0,100%_6px,100%_calc(100%-6px),calc(100%-6px)_100%,6px_100%,0_calc(100%-6px),0_6px)] flex items-center gap-2 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.85)] transition-colors">
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    expandedProjects["flagship-project"] ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" : "bg-neutral-400 shadow-[0_0_6px_rgba(255,255,255,0.4)]"
                  }`} />
                  <span className="font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase font-medium text-neutral-300 group-hover:text-white transition-colors">
                    {expandedProjects["flagship-project"]
                      ? "Згорнути опис та деталі"
                      : "Деталі проєкту та архітектура"}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-transform duration-300 ${
                      expandedProjects["flagship-project"] ? "rotate-180 text-emerald-400" : ""
                    }`}
                  />
                </div>
              </button>
            </div>

            {/* Б) ДЕТАЛЬНИЙ ОПИС ПРОЄКТУ: на ПК видно завжди (lg:grid), на мобілці розгортається */}
            <div
              className={`${
                expandedProjects["flagship-project"] ? "grid" : "hidden"
              } lg:grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start pt-6 border-t border-neutral-900`}
            >
              
              {/* Ліва колонка: Плашка та опис */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex justify-center">
                  <div className="relative inline-flex p-[1px] pb-[2.5px] bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 [clip-path:polygon(7px_0,calc(100%-7px)_0,100%_7px,100%_calc(100%-7px),calc(100%-7px)_100%,7px_100%,0_calc(100%-7px),0_7px)] shadow-[0_6px_16px_rgba(0,0,0,0.9)] select-none">
                    <div className="relative px-3.5 py-1 bg-gradient-to-b from-[#1c1f28] via-[#12141c] to-[#0a0b10] [clip-path:polygon(6px_0,calc(100%-6px)_0,100%_6px,100%_calc(100%-6px),calc(100%-6px)_100%,6px_100%,0_calc(100%-6px),0_6px)] flex items-center gap-2 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.85)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                      <span className="font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase font-medium text-neutral-300">
                        E-commerce &amp; Delivery
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-neutral-300 text-base md:text-lg leading-relaxed font-light">
                  Комерційний веб-сервіс доставки преміальних суші для реального бізнесу в Польщі з повноцінною мультимовністю (швидке перемикання на українську мову в особистому кабінеті). Повністю кастомне рішення, що об&apos;єднує швидкий клієнтський інтерфейс замовлення та автоматизовану систему управління закладом.
                </p>
              </div>

              {/* Права колонка: Архітектурні можливості (чистий мінімалістичний список без рамок) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex justify-center">
                  <div className="relative inline-flex p-[1px] pb-[2.5px] bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 [clip-path:polygon(7px_0,calc(100%-7px)_0,100%_7px,100%_calc(100%-7px),calc(100%-7px)_100%,7px_100%,0_calc(100%-7px),0_7px)] shadow-[0_6px_16px_rgba(0,0,0,0.9)] select-none">
                    <div className="relative px-3.5 py-1 bg-gradient-to-b from-[#1c1f28] via-[#12141c] to-[#0a0b10] [clip-path:polygon(6px_0,calc(100%-6px)_0,100%_6px,100%_calc(100%-6px),calc(100%-6px)_100%,6px_100%,0_calc(100%-6px),0_6px)] flex items-center gap-2 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.85)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                      <span className="font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase font-medium text-neutral-300">
                        Архітектурні особливості та можливості
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* 1. Mobile First */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <Smartphone className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>Зручна мобільна версія (Mobile First)</h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      100% адаптивність під будь-який екран смартфона. Продумана ергономіка інтерфейсу для швидкого оформлення замовлення однією рукою.
                    </p>
                  </div>

                  {/* 2. Особистий кабінет покупця & Мультимовність */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <UserCheck className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>Особистий кабінет покупця &amp; Мультимовність</h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      Для авторизованих клієнтів доступна зміна мови інтерфейсу (швидке перемикання на українську мову прямо в кабінеті) та детальна історія замовлень із можливістю в один клік <strong className="text-neutral-300 font-normal">повторити</strong> або <strong className="text-neutral-300 font-normal">відредагувати та повторити</strong> замовлення. Персональні контакти та збережена адреса доставки автоматично підтягуються в чекаут.
                    </p>
                  </div>

                  {/* 3. Розумна геолокація (OpenStreetMap) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>Розумна геолокація (OpenStreetMap)</h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      Швидке автодоповнення адреси під час вводу. &ldquo;Під капотом&rdquo; реалізовано інтелектуальну фільтрацію населених пунктів, яка обмежує вибір виключно зонами та умовами доставки ресторану.
                    </p>
                  </div>

                  {/* 4. Панель адміністратора (CRM & Друк) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <Sliders className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>Панель адміністратора (CRM &amp; Термодрук)</h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      Гнучке керування всім проєктом у реальному часі: редагування позицій меню, цін, часу приготування страв та тарифів за зонами доставки. Оперативна обробка замовлень, прямий друк чека на кухонний термопринтер та жива синхронізація статусу приготування в профілі користувача.
                    </p>
                  </div>

                  {/* 5. Telegram-бот у подарунок */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <Send className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>
                        Telegram-бот сповіщень <span className="text-neutral-400 font-normal">(у подарунок)</span>
                      </h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      Миттєве сповіщення про кожне нове замовлення безпосередньо в Telegram: повний склад кошика, контакти клієнта, обраний спосіб оплати та адреса для оперативної роботи кухні.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* 2. ДРУГИЙ ФЛАГМАНСЬКИЙ ПРОЄКТ: LÉPOXY ATELIER */}
        {lepoxy && (
          <div className="space-y-8 md:space-y-10 pt-10">
            {/* Заголовок над мокапом */}
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                Сумки ручної роботи з епоксидної смоли
              </h2>
            </div>

            {/* А) ДВОСТОРОННІЙ ІНТЕРАКТИВНИЙ СВАП МОКАП (ТЕЛЕФОН ЛІВОРУЧ ЗВЕРХУ) */}
            <div className="w-full pt-6 md:pt-12">
              <InteractiveSwapShowcase project={lepoxy} phonePosition="top-left" />
            </div>

            {/* Кнопка розгортання / згортання опису (ТІЛЬКИ ДЛЯ МОБІЛКИ — СТИЛЬ СТЕЛС-ПЛАШКИ) */}
            <div className="flex flex-col items-center pt-2 lg:hidden">
              <button
                type="button"
                onClick={() => toggleProject("lepoxy-project")}
                className="group relative inline-flex p-[1px] pb-[2.5px] bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 hover:from-neutral-400 hover:via-neutral-600 hover:to-neutral-900 [clip-path:polygon(7px_0,calc(100%-7px)_0,100%_7px,100%_calc(100%-7px),calc(100%-7px)_100%,7px_100%,0_calc(100%-7px),0_7px)] shadow-[0_6px_16px_rgba(0,0,0,0.9)] cursor-pointer select-none active:translate-y-[1.5px] active:pb-[1px] transition-all"
              >
                <div className="relative px-3.5 py-1 bg-gradient-to-b from-[#1c1f28] via-[#12141c] to-[#0a0b10] group-hover:from-[#232733] group-hover:via-[#161822] group-hover:to-[#0c0d12] [clip-path:polygon(6px_0,calc(100%-6px)_0,100%_6px,100%_calc(100%-6px),calc(100%-6px)_100%,6px_100%,0_calc(100%-6px),0_6px)] flex items-center gap-2 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.85)] transition-colors">
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    expandedProjects["lepoxy-project"] ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" : "bg-neutral-400 shadow-[0_0_6px_rgba(255,255,255,0.4)]"
                  }`} />
                  <span className="font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase font-medium text-neutral-300 group-hover:text-white transition-colors">
                    {expandedProjects["lepoxy-project"]
                      ? "Згорнути опис та деталі"
                      : "Деталі проєкту та архітектура"}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-transform duration-300 ${
                      expandedProjects["lepoxy-project"] ? "rotate-180 text-emerald-400" : ""
                    }`}
                  />
                </div>
              </button>
            </div>

            {/* Б) ДЕТАЛЬНИЙ ОПИС ТА АРХІТЕКТУРНІ ОСОБЛИВОСТІ: на ПК видно завжди, на мобілці розгортається */}
            <div
              className={`${
                expandedProjects["lepoxy-project"] ? "grid" : "hidden"
              } lg:grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start pt-6 border-t border-neutral-900`}
            >
              
              {/* Ліва колонка: Плашка та опис */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex justify-center">
                  <div className="relative inline-flex p-[1px] pb-[2.5px] bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 [clip-path:polygon(7px_0,calc(100%-7px)_0,100%_7px,100%_calc(100%-7px),calc(100%-7px)_100%,7px_100%,0_calc(100%-7px),0_7px)] shadow-[0_6px_16px_rgba(0,0,0,0.9)] select-none">
                    <div className="relative px-3.5 py-1 bg-gradient-to-b from-[#1c1f28] via-[#12141c] to-[#0a0b10] [clip-path:polygon(6px_0,calc(100%-6px)_0,100%_6px,100%_calc(100%-6px),calc(100%-6px)_100%,6px_100%,0_calc(100%-6px),0_6px)] flex items-center gap-2 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.85)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                      <span className="font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase font-medium text-neutral-300">
                        D2C Brand &amp; Interactive Showcase
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-neutral-300 text-base md:text-lg leading-relaxed font-light">
                  {lepoxy.description}
                </p>
              </div>

              {/* Права колонка: Архітектурні можливості */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex justify-center">
                  <div className="relative inline-flex p-[1px] pb-[2.5px] bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 [clip-path:polygon(7px_0,calc(100%-7px)_0,100%_7px,100%_calc(100%-7px),calc(100%-7px)_100%,7px_100%,0_calc(100%-7px),0_7px)] shadow-[0_6px_16px_rgba(0,0,0,0.9)] select-none">
                    <div className="relative px-3.5 py-1 bg-gradient-to-b from-[#1c1f28] via-[#12141c] to-[#0a0b10] [clip-path:polygon(6px_0,calc(100%-6px)_0,100%_6px,100%_calc(100%-6px),calc(100%-6px)_100%,6px_100%,0_calc(100%-6px),0_6px)] flex items-center gap-2 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.85)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                      <span className="font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase font-medium text-neutral-300">
                        Архітектурні особливості та можливості
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* 1. Повзунок Магія Кольору */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <SlidersHorizontal className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>Інтерактивний повзунок «Магія Кольору»</h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      Плавне порівняння та демонстрація того, як одна модель сумки змінює характер і настрій при зміні відтінку шкіри та смоли в реальному часі.
                    </p>
                  </div>

                  {/* 2. Конструктор кастомізації */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <Palette className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>Покроковий конструктор «Створи сумку своєї мрії»</h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      Зручний інтерактивний кастомізатор виробу: вибір форми моделі, кольору натуральної шкіри та настрою композиції квітів із прямим переходом до оформлення індивідуального замовлення.
                    </p>
                  </div>

                  {/* 3. Колекції за настроями */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <Heart className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>Емоційна навігація колекціями за настроями</h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      Презентація виробів через почуття («Спокій», «Тиша», «Пристрасть», «Свобода», «Тепло») з витонченою каруселлю та тактильним мікроінтерактивом.
                    </p>
                  </div>

                  {/* 4. Сторітелінг Від ідеї до емоції */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <CheckCircle2 className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>Виробничий сторітелінг («Від ідеї до емоції»)</h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      Поетапна візуалізація 5 кроків ручного крафту у Львові (узгодження, заливка квітів у смолу, збірка, пакування) для формування високої довіри та цінності преміум-сегменту.
                    </p>
                  </div>

                  {/* 5. Готові до відправки & Відгуки */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <ShoppingBag className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>Розділ «Готові до відправки» та соціальні докази</h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      Вітрина ексклюзивних сумок у наявності для миттєвого замовлення без очікування виготовлення + блок реальних фото-відгуків клієнток.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* 3. ТРЕТІЙ ПРОЄКТ: GENIUSLAND (ШКОЛА РОЗВИТКУ ДІТЕЙ) */}
        {geniusLand && (
          <div className="space-y-8 md:space-y-10 pt-10">
            {/* Заголовок над мокапом */}
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                Онлайн-школа розвитку <span className="text-neutral-500 font-normal text-2xl sm:text-3xl md:text-4xl">(GeniusLand)</span>
              </h2>
            </div>

            {/* А) ДВОСТОРОННІЙ ІНТЕРАКТИВНИЙ СВАП МОКАП (ТЕЛЕФОН ЗВЕРХУ ПРАВОРУЧ) */}
            <div className="w-full pt-6 md:pt-12">
              <InteractiveSwapShowcase project={geniusLand} phonePosition="top-right" />
            </div>

            {/* Кнопка розгортання / згортання опису (ТІЛЬКИ ДЛЯ МОБІЛКИ — СТИЛЬ СТЕЛС-ПЛАШКИ) */}
            <div className="flex flex-col items-center pt-2 lg:hidden">
              <button
                type="button"
                onClick={() => toggleProject("genius-land")}
                className="group relative inline-flex p-[1px] pb-[2.5px] bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 hover:from-neutral-400 hover:via-neutral-600 hover:to-neutral-900 [clip-path:polygon(7px_0,calc(100%-7px)_0,100%_7px,100%_calc(100%-7px),calc(100%-7px)_100%,7px_100%,0_calc(100%-7px),0_7px)] shadow-[0_6px_16px_rgba(0,0,0,0.9)] cursor-pointer select-none active:translate-y-[1.5px] active:pb-[1px] transition-all"
              >
                <div className="relative px-3.5 py-1 bg-gradient-to-b from-[#1c1f28] via-[#12141c] to-[#0a0b10] group-hover:from-[#232733] group-hover:via-[#161822] group-hover:to-[#0c0d12] [clip-path:polygon(6px_0,calc(100%-6px)_0,100%_6px,100%_calc(100%-6px),calc(100%-6px)_100%,6px_100%,0_calc(100%-6px),0_6px)] flex items-center gap-2 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.85)] transition-colors">
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    expandedProjects["genius-land"] ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" : "bg-neutral-400 shadow-[0_0_6px_rgba(255,255,255,0.4)]"
                  }`} />
                  <span className="font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase font-medium text-neutral-300 group-hover:text-white transition-colors">
                    {expandedProjects["genius-land"]
                      ? "Згорнути опис та деталі"
                      : "Деталі проєкту та архітектура"}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-transform duration-300 ${
                      expandedProjects["genius-land"] ? "rotate-180 text-emerald-400" : ""
                    }`}
                  />
                </div>
              </button>
            </div>

            {/* Б) ДЕТАЛЬНИЙ ОПИС ТА АРХІТЕКТУРНІ ОСОБЛИВОСТІ: на ПК видно завжди, на мобілці розгортається */}
            <div
              className={`${
                expandedProjects["genius-land"] ? "grid" : "hidden"
              } lg:grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start pt-6 border-t border-neutral-900`}
            >
              
              {/* Ліва колонка: Плашка та опис */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex justify-center">
                  <div className="relative inline-flex p-[1px] pb-[2.5px] bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 [clip-path:polygon(7px_0,calc(100%-7px)_0,100%_7px,100%_calc(100%-7px),calc(100%-7px)_100%,7px_100%,0_calc(100%-7px),0_7px)] shadow-[0_6px_16px_rgba(0,0,0,0.9)] select-none">
                    <div className="relative px-3.5 py-1 bg-gradient-to-b from-[#1c1f28] via-[#12141c] to-[#0a0b10] [clip-path:polygon(6px_0,calc(100%-6px)_0,100%_6px,100%_calc(100%-6px),calc(100%-6px)_100%,6px_100%,0_calc(100%-6px),0_6px)] flex items-center gap-2 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.85)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                      <span className="font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase font-medium text-neutral-300">
                        EdTech &amp; Admin Panel
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-neutral-300 text-base md:text-lg leading-relaxed font-light">
                  {geniusLand.description}
                </p>
              </div>

              {/* Права колонка: Архітектурні можливості */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex justify-center">
                  <div className="relative inline-flex p-[1px] pb-[2.5px] bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 [clip-path:polygon(7px_0,calc(100%-7px)_0,100%_7px,100%_calc(100%-7px),calc(100%-7px)_100%,7px_100%,0_calc(100%-7px),0_7px)] shadow-[0_6px_16px_rgba(0,0,0,0.9)] select-none">
                    <div className="relative px-3.5 py-1 bg-gradient-to-b from-[#1c1f28] via-[#12141c] to-[#0a0b10] [clip-path:polygon(6px_0,calc(100%-6px)_0,100%_6px,100%_calc(100%-6px),calc(100%-6px)_100%,6px_100%,0_calc(100%-6px),0_6px)] flex items-center gap-2 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.85)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                      <span className="font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase font-medium text-neutral-300">
                        Архітектурні особливості та можливості
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* 1. Адмін-панель */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <Sliders className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>Повноцінна адмін-панель керування школою</h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      Зручний кабінет адміністратора дозволяє в кілька кліків додавати акційні пропозиції, створювати або оновлювати навчальні напрямки, змінювати ціни та оперативно обробляти заявки від батьків.
                    </p>
                  </div>

                  {/* 2. Каталог напрямків */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <Layers className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>Структурований каталог курсів та напрямків</h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      Чітка презентація програм (підготовка до школи, англійська, швидкочитання, ментальна арифметика, логопед, репетиторство) із віковими маркерами, тривалістю та детальним описом кожного курсу.
                    </p>
                  </div>

                  {/* 3. Гнучка тарифна сітка */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <SlidersHorizontal className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>Перемикач тарифів «Групові / Індивідуальні» &amp; Акції</h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      Інтерактивний блок вартості з миттєвим перемиканням формату занять та динамічний слайдер спецпропозицій («Перший урок FREE») на першому екрані для максимальної конверсії.
                    </p>
                  </div>

                  {/* 4. Викладачі та довіра */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <Users className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>Викладацький склад, галерея та відгуки батьків</h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      Персональні картки педагогів із досвідом, фотогалерея живих занять школи та слайдер реальних відгуків батьків формують високу довіру ще до першого дзвінка.
                    </p>
                  </div>

                  {/* 5. Запис на пробний урок */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <CheckCircle2 className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>Швидкий запис дитини на безкоштовне пробне заняття</h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      Продумана форма заявки з вибором напрямку автоматично передає контакти в адмін-панель для швидкого зв&apos;язку та призначення часу уроку.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* 4. ЧЕТВЕРТИЙ ПРОЄКТ: ПРАКТИЧНИЙ ПОСІБНИК (ТЕТЯНА ЗАЄЦЬ) */}
        {tanya && (
          <div className="space-y-8 md:space-y-10 pt-10">
            {/* Заголовок над мокапом */}
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                Посібник для психологів <span className="text-neutral-500 font-normal text-2xl sm:text-3xl md:text-4xl">(Тетяна Заєць)</span>
              </h2>
            </div>

            {/* А) ДВОСТОРОННІЙ ІНТЕРАКТИВНИЙ СВАП МОКАП (ТЕЛЕФОН ЛІВОРУЧ ЗНИЗУ) */}
            <div className="w-full">
              <InteractiveSwapShowcase project={tanya} phonePosition="bottom-left" />
            </div>

            {/* Кнопка розгортання / згортання опису (ТІЛЬКИ ДЛЯ МОБІЛКИ — СТИЛЬ СТЕЛС-ПЛАШКИ) */}
            <div className="flex flex-col items-center pt-2 lg:hidden">
              <button
                type="button"
                onClick={() => toggleProject("tanya-zaiets")}
                className="group relative inline-flex p-[1px] pb-[2.5px] bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 hover:from-neutral-400 hover:via-neutral-600 hover:to-neutral-900 [clip-path:polygon(7px_0,calc(100%-7px)_0,100%_7px,100%_calc(100%-7px),calc(100%-7px)_100%,7px_100%,0_calc(100%-7px),0_7px)] shadow-[0_6px_16px_rgba(0,0,0,0.9)] cursor-pointer select-none active:translate-y-[1.5px] active:pb-[1px] transition-all"
              >
                <div className="relative px-3.5 py-1 bg-gradient-to-b from-[#1c1f28] via-[#12141c] to-[#0a0b10] group-hover:from-[#232733] group-hover:via-[#161822] group-hover:to-[#0c0d12] [clip-path:polygon(6px_0,calc(100%-6px)_0,100%_6px,100%_calc(100%-6px),calc(100%-6px)_100%,6px_100%,0_calc(100%-6px),0_6px)] flex items-center gap-2 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.85)] transition-colors">
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    expandedProjects["tanya-zaiets"] ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" : "bg-neutral-400 shadow-[0_0_6px_rgba(255,255,255,0.4)]"
                  }`} />
                  <span className="font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase font-medium text-neutral-300 group-hover:text-white transition-colors">
                    {expandedProjects["tanya-zaiets"]
                      ? "Згорнути опис та деталі"
                      : "Деталі проєкту та архітектура"}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-transform duration-300 ${
                      expandedProjects["tanya-zaiets"] ? "rotate-180 text-emerald-400" : ""
                    }`}
                  />
                </div>
              </button>
            </div>

            {/* Б) ДЕТАЛЬНИЙ ОПИС ТА АРХІТЕКТУРНІ ОСОБЛИВОСТІ: на ПК видно завжди, на мобілці розгортається */}
            <div
              className={`${
                expandedProjects["tanya-zaiets"] ? "grid" : "hidden"
              } lg:grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start pt-6 border-t border-neutral-900`}
            >
              
              {/* Ліва колонка: Плашка та опис */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex justify-center">
                  <div className="relative inline-flex p-[1px] pb-[2.5px] bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 [clip-path:polygon(7px_0,calc(100%-7px)_0,100%_7px,100%_calc(100%-7px),calc(100%-7px)_100%,7px_100%,0_calc(100%-7px),0_7px)] shadow-[0_6px_16px_rgba(0,0,0,0.9)] select-none">
                    <div className="relative px-3.5 py-1 bg-gradient-to-b from-[#1c1f28] via-[#12141c] to-[#0a0b10] [clip-path:polygon(6px_0,calc(100%-6px)_0,100%_6px,100%_calc(100%-6px),calc(100%-6px)_100%,6px_100%,0_calc(100%-6px),0_6px)] flex items-center gap-2 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.85)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                      <span className="font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase font-medium text-neutral-300">
                        Інфопродукт &amp; Landing Page
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-neutral-300 text-base md:text-lg leading-relaxed font-light">
                  {tanya.description}
                </p>
              </div>

              {/* Права колонка: Архітектурні можливості */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex justify-center">
                  <div className="relative inline-flex p-[1px] pb-[2.5px] bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 [clip-path:polygon(7px_0,calc(100%-7px)_0,100%_7px,100%_calc(100%-7px),calc(100%-7px)_100%,7px_100%,0_calc(100%-7px),0_7px)] shadow-[0_6px_16px_rgba(0,0,0,0.9)] select-none">
                    <div className="relative px-3.5 py-1 bg-gradient-to-b from-[#1c1f28] via-[#12141c] to-[#0a0b10] [clip-path:polygon(6px_0,calc(100%-6px)_0,100%_6px,100%_calc(100%-6px),calc(100%-6px)_100%,6px_100%,0_calc(100%-6px),0_6px)] flex items-center gap-2 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.85)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                      <span className="font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase font-medium text-neutral-300">
                        Архітектурні особливості та можливості
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* 1. Value Proposition */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <Target className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>Перший екран та ціннісний оффер (Value Proposition)</h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      Миттєве захоплення уваги: конкретний результат для покупця, фіксована вартість ($9) та прямий заклик до дії без зайвих кліків.
                    </p>
                  </div>

                  {/* 2. Сегментація */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <Users className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>Сегментація аудиторії («Для кого цей посібник»)</h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      Точне влучання в психологічні бар&apos;єри спеціалістів (страх нав&apos;язливості, брак ідей, страх продажів) для глибокої самоідентифікації читача.
                    </p>
                  </div>

                  {/* 3. Зміст та користь */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <BookOpen className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>Прозорий зміст та користь («Що всередині»)</h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      Детальна презентація наповнення: 55 готових тем, логіка прийняття рішень клієнтом та покрокові чеклісти без «води» та маніпуляцій.
                    </p>
                  </div>

                  {/* 4. Персональний бренд */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <Award className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>Блок експертності та довіри («Про авторку»)</h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      Особиста історія Тетяни Заєць, роки практики та професійні цінності, що знімають бар&apos;єр сумнівів перед онлайн-оплатою.
                    </p>
                  </div>

                  {/* 5. Автоматизований Telegram-бот оплати та видачі */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <Send className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>Telegram-бот повної автоматизації продажів</h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      Розумний бот бере на себе весь цикл: видає реквізити на оплату, приймає скріншот квитанції від покупця та надсилає його авторці. Авторка в 1 клік підтверджує або відхиляє платіж, після чого бот автоматично надсилає файл із посібником.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* 4. ЧЕТВЕРТИЙ ПРОЄКТ: КЛІНІНГОВА КОМПАНІЯ THIAMIS CLEANING (ТИМЧАСОВО ПРИХОВАНО) */}
        {thiamis && SHOW_CLEANING && (
          <div className="space-y-8 md:space-y-10 pt-10">
            {/* Заголовок над мокапом */}
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                Клінінгова компанія Thiamis <span className="text-neutral-500 font-normal text-2xl sm:text-3xl md:text-4xl">(Дніпро)</span>
              </h2>
            </div>

            {/* А) ДВОСТОРОННІЙ ІНТЕРАКТИВНИЙ СВАП МОКАП (ТЕЛЕФОН ЗВЕРХУ ПРАВОРУЧ) */}
            <div className="w-full pt-6 md:pt-12">
              <InteractiveSwapShowcase project={thiamis} phonePosition="top-right" />
            </div>

            {/* Кнопка розгортання / згортання опису (ТІЛЬКИ ДЛЯ МОБІЛКИ — СТИЛЬ СТЕЛС-ПЛАШКИ) */}
            <div className="flex flex-col items-center pt-2 lg:hidden">
              <button
                type="button"
                onClick={() => toggleProject("thiamis-cleaning")}
                className="group relative inline-flex p-[1px] pb-[2.5px] bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 hover:from-neutral-400 hover:via-neutral-600 hover:to-neutral-900 [clip-path:polygon(7px_0,calc(100%-7px)_0,100%_7px,100%_calc(100%-7px),calc(100%-7px)_100%,7px_100%,0_calc(100%-7px),0_7px)] shadow-[0_6px_16px_rgba(0,0,0,0.9)] cursor-pointer select-none active:translate-y-[1.5px] active:pb-[1px] transition-all"
              >
                <div className="relative px-3.5 py-1 bg-gradient-to-b from-[#1c1f28] via-[#12141c] to-[#0a0b10] group-hover:from-[#232733] group-hover:via-[#161822] group-hover:to-[#0c0d12] [clip-path:polygon(6px_0,calc(100%-6px)_0,100%_6px,100%_calc(100%-6px),calc(100%-6px)_100%,6px_100%,0_calc(100%-6px),0_6px)] flex items-center gap-2 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.85)] transition-colors">
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    expandedProjects["thiamis-cleaning"] ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" : "bg-neutral-400 shadow-[0_0_6px_rgba(255,255,255,0.4)]"
                  }`} />
                  <span className="font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase font-medium text-neutral-300 group-hover:text-white transition-colors">
                    {expandedProjects["thiamis-cleaning"]
                      ? "Згорнути опис та деталі"
                      : "Деталі проєкту та архітектура"}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-transform duration-300 ${
                      expandedProjects["thiamis-cleaning"] ? "rotate-180 text-emerald-400" : ""
                    }`}
                  />
                </div>
              </button>
            </div>

            {/* Б) ДЕТАЛЬНИЙ ОПИС ТА АРХІТЕКТУРНІ ОСОБЛИВОСТІ: на ПК видно завжди, на мобілці розгортається */}
            <div
              className={`${
                expandedProjects["thiamis-cleaning"] ? "grid" : "hidden"
              } lg:grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start pt-6 border-t border-neutral-900`}
            >
              
              {/* Ліва колонка: Плашка та опис */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex justify-center">
                  <div className="relative inline-flex p-[1px] pb-[2.5px] bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 [clip-path:polygon(7px_0,calc(100%-7px)_0,100%_7px,100%_calc(100%-7px),calc(100%-7px)_100%,7px_100%,0_calc(100%-7px),0_7px)] shadow-[0_6px_16px_rgba(0,0,0,0.9)] select-none">
                    <div className="relative px-3.5 py-1 bg-gradient-to-b from-[#1c1f28] via-[#12141c] to-[#0a0b10] [clip-path:polygon(6px_0,calc(100%-6px)_0,100%_6px,100%_calc(100%-6px),calc(100%-6px)_100%,6px_100%,0_calc(100%-6px),0_6px)] flex items-center gap-2 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.85)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                      <span className="font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase font-medium text-neutral-300">
                        Локальний бізнес &amp; Сервісний лендінг
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-neutral-300 text-base md:text-lg leading-relaxed font-light">
                  {thiamis.description}
                </p>
              </div>

              {/* Права колонка: Архітектурні можливості */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex justify-center">
                  <div className="relative inline-flex p-[1px] pb-[2.5px] bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 [clip-path:polygon(7px_0,calc(100%-7px)_0,100%_7px,100%_calc(100%-7px),calc(100%-7px)_100%,7px_100%,0_calc(100%-7px),0_7px)] shadow-[0_6px_16px_rgba(0,0,0,0.9)] select-none">
                    <div className="relative px-3.5 py-1 bg-gradient-to-b from-[#1c1f28] via-[#12141c] to-[#0a0b10] [clip-path:polygon(6px_0,calc(100%-6px)_0,100%_6px,100%_calc(100%-6px),calc(100%-6px)_100%,6px_100%,0_calc(100%-6px),0_6px)] flex items-center gap-2 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.85)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                      <span className="font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase font-medium text-neutral-300">
                        Архітектурні особливості та можливості
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* 1. Лідогенерація */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <PhoneCall className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>Пряма лідогенерація (виклик або дзвінок в 1 клік)</h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      Головний екран заточений на швидку дію: клієнт миттєво замовляє виклик або телефонує напряму без зайвих переходів та очікування.
                    </p>
                  </div>

                  {/* 2. Прайс-лист */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <Calculator className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>Прозорий структурований прайс-лист</h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      Чітка тарифна сітка за м² та фіксовані ціни на прибирання, хімчистку меблів та миття вікон без прихованих платежів.
                    </p>
                  </div>

                  {/* 3. Виїзд менеджера */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>Безкоштовний виїзд менеджера на оцінку</h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      Сервіс огляду об&apos;єкта у Дніпрі з точним розрахунком обсягу робіт і фіксацією фінальної вартості до початку прибирання.
                    </p>
                  </div>

                  {/* 4. Техніка та хімія */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <ShieldCheck className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>Професійна техніка та гіпоалергенна хімія</h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      Використання потужного обладнання та безпечних сертифікованих засобів, нешкідливих для дітей, алергіків і домашніх тварин.
                    </p>
                  </div>

                  {/* 5. Пунктуальність та клінери */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 text-neutral-200 font-medium text-sm md:text-base">
                      <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                      <h4>Пунктуальність та 100% перевірені клінери</h4>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light pl-6.5">
                      Кожен спеціаліст проходить перевірку та інструктаж; бригада прибуває точно в обумовлений час для повного спокою замовника.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
