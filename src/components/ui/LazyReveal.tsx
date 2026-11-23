"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LazyRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

/**
 * Scroll-triggered reveal wrapper using IntersectionObserver and GPU-only CSS transitions.
 * Preserves DOM content for SSR/SEO while animating smoothly into view on scroll.
 */
export default function LazyReveal({
  children,
  className = "",
  delayMs = 0,
}: LazyRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "150px 0px",
        threshold: 0.05,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-testid="lazy-reveal"
      data-revealed={revealed ? "true" : "false"}
      className={cn("lazy-reveal", className)}
      style={delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
