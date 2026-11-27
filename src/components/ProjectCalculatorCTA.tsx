"use client";

import React, { useState } from "react";
import { Send, Check, ChevronDown, HelpCircle, ArrowUp } from "lucide-react";

interface ProjectType {
  id: string;
  label: string;
  desc: string;
  minDays: number;
  maxDays: number;
  basePrice: number;
}

interface AddonModule {
  id: string;
  label: string;
  days: number;
  price: number;
  isFreeGift?: boolean;
}

const PROJECT_TYPES: ProjectType[] = [
  {
    id: "landing",
    label: "Лендінг / Візитка",
    desc: "Конверсійний сайт під послугу чи інфопродукт",
    minDays: 3,
    maxDays: 5,
    basePrice: 100,
  },
  {
    id: "shop",
    label: "Інтернет-магазин",
    desc: "Каталог, кошик, чекаут та швидка мобільна версія",
    minDays: 7,
    maxDays: 12,
    basePrice: 300,
  },
  {
    id: "platform",
    label: "Бізнес-платформа",
    desc: "Кабінети, CRM-система, бронювання та автоматизація",
    minDays: 12,
    maxDays: 18,
    basePrice: 500,
  },
];

const ADDON_MODULES: AddonModule[] = [
  { id: "admin", label: "Адмін-панель (CRM)", days: 3, price: 100 },
  { id: "payment", label: "Онлайн-оплата (WayForPay / LiqPay)", days: 2, price: 50 },
  { id: "i18n", label: "Мультимовність (+1 мова)", days: 2, price: 50 },
  { id: "tg-bot", label: "Telegram-бот сповіщень", days: 0, price: 0, isFreeGift: true },
];

const FAQS = [
  {
    q: "Які терміни створення проєкту?",
    a: "Зазвичай 3–14 днів залежно від формату та складності. Першу робочу онлайн-демку ви тестуєте вже на 2–4 день розробки.",
  },
  {
    q: "Коли відбувається оплата?",
    a: "0% передоплати. Остаточний розрахунок тільки після того, як ви особисто затвердите готову робочу версію.",
  },
  {
    q: "Чи легко керувати товарами, послугами та цінами?",
    a: "Так, створюю просту кастомну адмін-панель, адаптовану під смартфон: товари, ціни, акції та заявки змінюються в пару кліків.",
  },
  {
    q: "Чи входить Telegram-бот у вартість?",
    a: "Так, налаштованого бота для миттєвих сповіщень про всі нові замовлення та заявки надаю у подарунок до кожного проєкту.",
  },
];

export default function ProjectCalculatorCTA() {
  const [selectedTypeId, setSelectedTypeId] = useState<string>("shop");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["tg-bot"]);
  const [extraLanguages, setExtraLanguages] = useState<number>(1);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Динамічна ціна модуля залежно від типу проєкту та кількості мов
  const getAddonPrice = (addon: AddonModule): number => {
    if (addon.id === "admin") {
      if (selectedTypeId === "landing") return 50;
      if (selectedTypeId === "shop") return 100;
      return 150;
    }
    if (addon.id === "i18n") {
      return addon.price * extraLanguages;
    }
    return addon.price;
  };

  const currentType =
    PROJECT_TYPES.find((t) => t.id === selectedTypeId) ?? PROJECT_TYPES[0];
  const activeAddons = ADDON_MODULES.filter((a) => selectedAddons.includes(a.id));

  const extraDays = activeAddons.reduce((sum, a) => {
    if (a.id === "i18n") return sum + a.days * extraLanguages;
    return sum + a.days;
  }, 0);
  const extraPrice = activeAddons.reduce((sum, a) => sum + getAddonPrice(a), 0);

  const totalMinDays = currentType.minDays + extraDays;
  const totalMaxDays = currentType.maxDays + extraDays;
  const totalPrice = currentType.basePrice + extraPrice;

  const addonNames =
    activeAddons.length > 0
      ? activeAddons
          .map((a) =>
            a.id === "i18n"
              ? `Мультимовність (${extraLanguages} дод. мов${extraLanguages === 1 ? "а" : extraLanguages < 5 ? "и" : ""})`
              : a.label
          )
          .join(", ")
      : "без додаткових модулів";

  const prefilledMessage = encodeURIComponent(
    `Привіт! Цікавить розробка: ${currentType.label} (${addonNames}). Орієнтовно з калькулятора: ${totalMinDays}–${totalMaxDays} днів, від $${totalPrice}.`
  );

  return (
    <section
      id="calculator"
      className="relative py-24 sm:py-32 px-4 bg-transparent overflow-hidden"
    >
      <div
        id="calculator-content"
        className="relative z-10 max-w-5xl mx-auto space-y-12 sm:space-y-14 scroll-mt-4 sm:scroll-mt-6"
      >
        {/* ЗАГОЛОВОК СЕКЦІЇ */}
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight max-w-3xl">
            Розрахунок вартості та термінів
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed">
            Оберіть формат проєкту та потрібні модулі, щоб побачити орієнтир за часом і бюджетом та одразу обговорити деталі.
          </p>
        </div>

        {/* ГОЛОВНА СТЕЛС-ПАНЕЛЬ КАЛЬКУЛЯТОРА ТА CTA */}
        <div className="relative p-[1px] pb-[3px] bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 [clip-path:polygon(16px_0,calc(100%-16px)_0,100%_16px,100%_calc(100%-16px),calc(100%-16px)_100%,16px_100%,0_calc(100%-16px),0_16px)] shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
          <div className="p-6 sm:p-8 md:p-10 bg-gradient-to-b from-[#1a1d26] via-[#11131a] to-[#08090d] [clip-path:polygon(15px_0,calc(100%-15px)_0,100%_15px,100%_calc(100%-15px),calc(100%-15px)_100%,15px_100%,0_calc(100%-15px),0_15px)] space-y-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-2px_0_rgba(0,0,0,0.9)]">
            
            {/* КРОК 1: ФОРМАТ ПРОЄКТУ */}
            <div className="space-y-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-200 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  <span>Крок 1. Оберіть формат сайту</span>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">
                  натисніть на один із варіантів
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {PROJECT_TYPES.map((type) => {
                  const isActive = selectedTypeId === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedTypeId(type.id)}
                      className={`text-left p-[1px] pb-[2.5px] transition-all cursor-pointer select-none active:translate-y-[1px] [clip-path:polygon(10px_0,calc(100%-10px)_0,100%_10px,100%_calc(100%-10px),calc(100%-10px)_100%,10px_100%,0_calc(100%-10px),0_10px)] ${
                        isActive
                          ? "bg-gradient-to-b from-emerald-400 via-emerald-600/60 to-neutral-900 shadow-[0_12px_28px_rgba(0,0,0,0.9),0_0_20px_rgba(52,211,153,0.12)] opacity-100"
                          : "bg-gradient-to-b from-neutral-600/60 via-neutral-800 to-neutral-950 hover:from-neutral-400/80 opacity-75 hover:opacity-100"
                      }`}
                    >
                      <div
                        className={`h-full p-4 [clip-path:polygon(9px_0,calc(100%-9px)_0,100%_9px,100%_calc(100%-9px),calc(100%-9px)_100%,9px_100%,0_calc(100%-9px),0_9px)] flex flex-col justify-between space-y-2.5 transition-colors ${
                          isActive
                            ? "bg-gradient-to-b from-[#1e292b] via-[#141b22] to-[#0b0f14] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
                            : "bg-gradient-to-b from-[#151821] via-[#101218] to-[#090a0e]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-heading text-base font-bold text-white tracking-tight">
                            {type.label}
                          </span>
                          {/* Явний радіо-індикатор вибору */}
                          <span
                            className={`w-4.5 h-4.5 rounded-full shrink-0 border-2 flex items-center justify-center transition-all ${
                              isActive
                                ? "border-emerald-400 bg-emerald-500/15 shadow-[0_0_10px_rgba(52,211,153,0.45)]"
                                : "border-neutral-600 bg-black/40"
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full transition-transform ${
                                isActive ? "bg-emerald-400 scale-100" : "scale-0"
                              }`}
                            />
                          </span>
                        </div>
                        <p className="text-xs text-neutral-300 font-light leading-relaxed">
                          {type.desc}
                        </p>
                        <div className="pt-1.5 flex items-center justify-between text-[11px] font-mono text-neutral-300 border-t border-white/10">
                          <span>{type.minDays}–{type.maxDays} днів</span>
                          <span className={isActive ? "text-emerald-400 font-semibold" : "text-white font-semibold"}>
                            від ${type.basePrice}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* КРОК 2: ДОДАТКОВІ МОДУЛІ */}
            <div className="space-y-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-200 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  <span>Крок 2. Оберіть додаткові модулі</span>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">
                  можна обрати кілька
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {ADDON_MODULES.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  const displayPrice = getAddonPrice(addon);
                  const displayDays =
                    addon.id === "i18n" ? addon.days * extraLanguages : addon.days;

                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`text-left p-[1px] pb-[2px] transition-all cursor-pointer select-none active:translate-y-[1px] [clip-path:polygon(8px_0,calc(100%-8px)_0,100%_8px,100%_calc(100%-8px),calc(100%-8px)_100%,8px_100%,0_calc(100%-8px),0_8px)] ${
                        isChecked
                          ? "bg-gradient-to-b from-emerald-400/80 via-neutral-500 to-neutral-900 opacity-100"
                          : "bg-gradient-to-b from-neutral-700/60 via-neutral-800 to-neutral-950 hover:from-neutral-500/80 opacity-75 hover:opacity-100"
                      }`}
                    >
                      <div
                        className={`h-full px-3.5 py-3 [clip-path:polygon(7px_0,calc(100%-7px)_0,100%_7px,100%_calc(100%-7px),calc(100%-7px)_100%,7px_100%,0_calc(100%-7px),0_7px)] flex items-center justify-between gap-2.5 transition-colors ${
                          isChecked
                            ? "bg-gradient-to-b from-[#1f2633] to-[#0f131a]"
                            : "bg-gradient-to-b from-[#141720] to-[#0b0c10]"
                        }`}
                      >
                        <div className="space-y-0.5 min-w-0">
                          <div className="text-xs font-medium text-neutral-100 truncate">
                            {addon.id === "i18n" ? "Мультимовність" : addon.label}
                          </div>
                          <div className="text-[10.5px] font-mono text-neutral-400 flex items-center gap-2">
                            {addon.isFreeGift ? (
                              <span className="text-emerald-400">У подарунок • $0</span>
                            ) : addon.id === "i18n" ? (
                              <>
                                <span>+${displayPrice}</span>
                                {isChecked ? (
                                  <span
                                    className="inline-flex items-center gap-1 bg-black/50 border border-white/10 rounded px-1.5 py-0.5 text-[10px]"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setExtraLanguages((n) => Math.max(1, n - 1))
                                      }
                                      className="text-neutral-400 hover:text-white px-0.5 cursor-pointer"
                                    >
                                      −
                                    </button>
                                    <span className="text-white">{extraLanguages} мов.</span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setExtraLanguages((n) => Math.min(5, n + 1))
                                      }
                                      className="text-neutral-400 hover:text-white px-0.5 cursor-pointer"
                                    >
                                      +
                                    </button>
                                  </span>
                                ) : (
                                  <span>• $50 / мова</span>
                                )}
                              </>
                            ) : (
                              <span>+{displayDays} дн. • +${displayPrice}</span>
                            )}
                          </div>
                        </div>

                        <span
                          className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-colors ${
                            isChecked
                              ? "bg-emerald-500/20 border-emerald-400/80 text-emerald-400"
                              : "bg-black/40 border-neutral-700 text-transparent"
                          }`}
                        >
                          <Check className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* КРОК 3: ПІДСУМОК ТА ФІНАЛЬНИЙ CTA ПЕРЕД ФУТЕРОМ */}
            <div className="pt-6 border-t border-white/10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Орієнтовний результат */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                      Орієнтовний бюджет
                    </span>
                    <span className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      від ${totalPrice}
                    </span>
                  </div>
                  <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                      Термін розробки
                    </span>
                    <span className="font-heading text-xl sm:text-2xl font-bold text-neutral-200 tracking-tight">
                      {totalMinDays}–{totalMaxDays} днів
                    </span>
                  </div>
                </div>
                <p className="text-xs font-mono text-neutral-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  <span>Без передоплати • Перший аудит та живе демо безкоштовно</span>
                </p>
              </div>

              {/* Стелс-кнопки фінального CTA */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                {/* Telegram Стелс-кнопка */}
                <a
                  href={`https://t.me/llixtar?text=${prefilledMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex w-full sm:w-auto p-[1.5px] pb-[3px] bg-gradient-to-b from-neutral-400 via-neutral-600 to-neutral-950 hover:from-sky-400 hover:via-sky-600 hover:to-neutral-900 [clip-path:polygon(10px_0,calc(100%-10px)_0,100%_10px,100%_calc(100%-10px),calc(100%-10px)_100%,10px_100%,0_calc(100%-10px),0_10px)] shadow-[0_10px_25px_rgba(0,0,0,0.9)] active:translate-y-[1.5px] active:pb-[1.5px] transition-all select-none cursor-pointer"
                >
                  <div className="relative w-full sm:w-auto px-5 py-3 bg-gradient-to-b from-[#1e2533] via-[#131822] to-[#090c12] group-hover:from-[#222f42] group-hover:via-[#16202e] [clip-path:polygon(9px_0,calc(100%-9px)_0,100%_9px,100%_calc(100%-9px),calc(100%-9px)_100%,9px_100%,0_calc(100%-9px),0_9px)] flex items-center justify-center gap-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.24),inset_0_-1px_0_rgba(0,0,0,0.85)] transition-colors">
                    <Send className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-xs sm:text-[13px] tracking-wider uppercase font-semibold text-white">
                      Обговорити в Telegram
                    </span>
                  </div>
                </a>

                {/* WhatsApp Стелс-кнопка */}
                <a
                  href={`https://wa.me/48574514100?text=${prefilledMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex w-full sm:w-auto p-[1.5px] pb-[3px] bg-gradient-to-b from-neutral-500 via-neutral-700 to-neutral-950 hover:from-emerald-400 hover:via-emerald-600 hover:to-neutral-900 [clip-path:polygon(10px_0,calc(100%-10px)_0,100%_10px,100%_calc(100%-10px),calc(100%-10px)_100%,10px_100%,0_calc(100%-10px),0_10px)] shadow-[0_10px_25px_rgba(0,0,0,0.9)] active:translate-y-[1.5px] active:pb-[1.5px] transition-all select-none cursor-pointer"
                >
                  <div className="relative w-full sm:w-auto px-5 py-3 bg-gradient-to-b from-[#1a2420] via-[#111815] to-[#080c0a] group-hover:from-[#1f3028] group-hover:via-[#14221b] [clip-path:polygon(9px_0,calc(100%-9px)_0,100%_9px,100%_calc(100%-9px),calc(100%-9px)_100%,9px_100%,0_calc(100%-9px),0_9px)] flex items-center justify-center gap-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.85)] transition-colors">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform"
                      aria-hidden="true"
                    >
                      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                    </svg>
                    <span className="font-mono text-xs sm:text-[13px] tracking-wider uppercase font-semibold text-white">
                      WhatsApp
                    </span>
                  </div>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* БЛОК ЧАСТИХ ПИТАНЬ (FAQ) ПІД КАЛЬКУЛЯТОРОМ */}
        <div id="faq" className="pt-4 space-y-5">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
            <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
            <span>Часті питання (FAQ)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {FAQS.map((faq, idx) => {
              const isFaqOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="p-[1px] pb-[2px] bg-gradient-to-b from-neutral-600/60 via-neutral-800 to-neutral-950 [clip-path:polygon(10px_0,calc(100%-10px)_0,100%_10px,100%_calc(100%-10px),calc(100%-10px)_100%,10px_100%,0_calc(100%-10px),0_10px)] shadow-[0_8px_20px_rgba(0,0,0,0.75)]"
                >
                  <div className="h-full bg-gradient-to-b from-[#171a23] via-[#101219] to-[#08090d] [clip-path:polygon(9px_0,calc(100%-9px)_0,100%_9px,100%_calc(100%-9px),calc(100%-9px)_100%,9px_100%,0_calc(100%-9px),0_9px)] overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isFaqOpen ? null : idx)}
                      className="w-full px-4 py-3.5 flex items-center justify-between text-left gap-3 cursor-pointer select-none hover:bg-white/[0.02] transition-colors"
                    >
                      <span className="text-xs sm:text-sm font-medium text-neutral-100">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                          isFaqOpen ? "rotate-180 text-emerald-400" : ""
                        }`}
                      />
                    </button>
                    {isFaqOpen && (
                      <div className="px-4 pb-3.5 pt-2 text-xs sm:text-[13px] leading-relaxed text-neutral-400 font-light border-t border-white/5">
                        {faq.a}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* КНОПКА ПОВЕРНЕННЯ ДО ПРОЄКТІВ ПІД FAQ */}
          <div className="pt-4 flex justify-center">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const el =
                  document.getElementById("projects-content") ??
                  document.getElementById("projects");
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 24;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
              className="group relative inline-flex p-[1.5px] pb-[3px] bg-gradient-to-b from-neutral-400 via-neutral-600 to-neutral-950 hover:from-neutral-300 hover:via-neutral-500 hover:to-neutral-900 [clip-path:polygon(10px_0,calc(100%-10px)_0,100%_10px,100%_calc(100%-10px),calc(100%-10px)_100%,10px_100%,0_calc(100%-10px),0_10px)] shadow-[0_10px_25px_rgba(0,0,0,0.9)] active:translate-y-[1.5px] active:pb-[1.5px] transition-all select-none cursor-pointer"
            >
              <div className="relative px-6 py-2.5 bg-gradient-to-b from-[#1e232e] via-[#131720] to-[#090b10] group-hover:from-[#262c3a] group-hover:via-[#171c28] [clip-path:polygon(9px_0,calc(100%-9px)_0,100%_9px,100%_calc(100%-9px),calc(100%-9px)_100%,9px_100%,0_calc(100%-9px),0_9px)] flex items-center gap-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.85)] transition-colors">
                <ArrowUp className="w-3.5 h-3.5 text-neutral-300 group-hover:text-white group-hover:-translate-y-0.5 transition-all" />
                <span className="font-mono text-xs tracking-widest uppercase font-semibold text-neutral-200 group-hover:text-white transition-colors">
                  Переглянути роботи
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
