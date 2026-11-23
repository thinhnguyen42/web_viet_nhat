"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const STORAGE_KEY = "vnj_curtain_seen";
const HOLD_DURATION_MS = 1100;
const EXIT_DURATION_MS = 450;

type CurtainPhase = "idle" | "visible" | "exiting" | "hidden";

const COPY = {
  vi: {
    title: "Trung Tâm Hợp Tác Học Thuật Việt – Nhật",
    motto: "Tri Thức Giao Hòa • Kết Nối Tinh Hoa",
    skip: "Bỏ qua",
  },
  ja: {
    title: "日越学術協力センター",
    motto: "知の架け橋 • 日越友好の継承",
    skip: "スキップ",
  },
  en: {
    title: "Vietnam – Japan Academic Center",
    motto: "Classical Heritage • Academic Excellence",
    skip: "Skip",
  },
} as const;

/**
 * Dignified, classical Vietnam-Japan opening curtain rendered once per browser session.
 * Uses pure GPU-composited animations and inline SVGs for zero layout shift and lag-free loading.
 */
export default function ClassicalCurtain() {
  const { locale } = useLanguage();
  const [phase, setPhase] = useState<CurtainPhase>("idle");
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }

    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore storage access errors in restricted contexts
    }

    setPhase((prev) => (prev === "visible" ? "exiting" : prev));

    if (!exitTimerRef.current) {
      exitTimerRef.current = setTimeout(() => {
        setPhase("hidden");
      }, EXIT_DURATION_MS);
    }
  }, []);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || prefersReduced) {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // Ignore storage errors
      }
      const frame = requestAnimationFrame(() => setPhase("hidden"));
      return () => cancelAnimationFrame(frame);
    }

    const frame = requestAnimationFrame(() => {
      setPhase("visible");
      holdTimerRef.current = setTimeout(() => {
        dismiss();
      }, HOLD_DURATION_MS);
    });

    return () => {
      cancelAnimationFrame(frame);
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, [dismiss]);

  if (phase === "idle" || phase === "hidden") {
    return null;
  }

  const copy = COPY[locale] ?? COPY.vi;
  const isExiting = phase === "exiting";

  return (
    <div
      data-testid="classical-curtain"
      role="status"
      aria-live="polite"
      aria-label={copy.title}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#fcfaf5] text-primary-900 transition-[transform,opacity] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isExiting
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      }`}
    >
      {/* Warm Washi subtle radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(202,138,4,0.08)_0%,rgba(30,42,94,0.06)_75%,rgba(30,42,94,0.12)_100%)]"
      />

      {/* Double Classical Hairline Frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 sm:inset-5 border border-[#b48a2c]/40 rounded-sm"
      >
        <div className="absolute inset-1.5 border border-[#b48a2c]/20" />
        {/* Corner Brackets */}
        <span className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-[#9a7220]" />
        <span className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-[#9a7220]" />
        <span className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-[#9a7220]" />
        <span className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-[#9a7220]" />
      </div>

      {/* Subtle Seigaiha Wave Watermark */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.045] text-primary-900"
      >
        <defs>
          <pattern
            id="vnj-seigaiha"
            width="64"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 32a16 16 0 0 1 32 0M32 32a16 16 0 0 1 32 0M16 16a16 16 0 0 1 32 0M-16 16a16 16 0 0 1 32 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#vnj-seigaiha)" />
      </svg>

      {/* Center Medallion: Lotus (VN) & Sakura (JP) + Vermilion Hanko Seal */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-xl">
        <div className="relative flex items-center justify-center mb-7">
          <svg
            width="164"
            height="164"
            viewBox="0 0 164 164"
            fill="none"
            aria-hidden="true"
            className="drop-shadow-sm"
          >
            {/* Outer Classical Gold Ring */}
            <circle
              cx="82"
              cy="82"
              r="72"
              stroke="#b48a2c"
              strokeWidth="1.25"
              strokeOpacity="0.45"
            />
            <circle
              cx="82"
              cy="82"
              r="65"
              stroke="#1e2a5e"
              strokeWidth="1"
              strokeOpacity="0.25"
              strokeDasharray="3 4"
            />

            {/* Left motif: Vietnamese Lotus (Hoa Sen) */}
            <g stroke="#9a7220" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path
                className="curtain-stroke"
                d="M52 96C52 78 64 62 72 52C77 63 78 78 72 96"
              />
              <path
                className="curtain-stroke"
                d="M66 96C54 88 45 77 43 65C53 67 62 76 68 92"
              />
              <path
                className="curtain-stroke"
                d="M74 96C83 89 89 79 90 68C81 71 75 79 73 92"
              />
              <path
                className="curtain-stroke"
                d="M44 102C55 98 78 98 89 102"
              />
            </g>

            {/* Right motif: Japanese Sakura Blossom */}
            <g stroke="#1e2a5e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path
                className="curtain-stroke"
                d="M108 58C113 51 119 52 117 61C125 60 128 66 120 71C125 78 120 84 112 79C110 87 103 87 102 79C94 82 91 75 98 70C93 63 98 56 106 61Z"
              />
              <circle cx="109" cy="69" r="3" fill="#b48a2c" fillOpacity="0.55" stroke="none" />
              <path
                className="curtain-stroke"
                d="M95 96C106 90 116 86 126 86"
              />
            </g>
          </svg>

          {/* Vermilion Hanko Seal (Triện đỏ son) */}
          <div
            aria-hidden="true"
            className="curtain-hanko absolute -bottom-1 right-1 sm:right-2 w-12 h-12 rounded-[3px] border-2 border-[#a81c1c] bg-[#fcfaf5]/95 p-0.5 shadow-sm flex items-center justify-center"
          >
            <div className="w-full h-full border border-[#a81c1c]/80 flex items-center justify-center text-[#a81c1c] font-heading font-extrabold text-base leading-none tracking-tight">
              日越
            </div>
          </div>
        </div>

        {/* Classical Divider */}
        <div className="flex items-center gap-3 mb-4 w-48 justify-center" aria-hidden="true">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#b48a2c]/60" />
          <span className="w-2 h-2 rotate-45 border border-[#b48a2c] bg-[#b48a2c]/30" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#b48a2c]/60" />
        </div>

        {/* Title & Motto */}
        <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-primary-900 mb-2">
          {copy.title}
        </h2>
        <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-[#7c5c19]">
          {copy.motto}
        </p>

        {/* Bottom Progress Hairline */}
        <div className="mt-8 w-44 h-[2px] bg-[#b48a2c]/20 rounded-full overflow-hidden">
          <div className="curtain-progress-bar h-full w-full bg-gradient-to-r from-[#9a7220] via-[#eab308] to-[#a81c1c]" />
        </div>
      </div>

      {/* Skip Button */}
      <button
        type="button"
        data-testid="curtain-skip"
        onClick={dismiss}
        className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 px-3.5 py-1.5 rounded-full border border-[#b48a2c]/40 bg-white/80 hover:bg-white text-xs font-semibold text-primary-900 tracking-wide transition-colors cursor-pointer shadow-xs"
      >
        {copy.skip} →
      </button>
    </div>
  );
}
