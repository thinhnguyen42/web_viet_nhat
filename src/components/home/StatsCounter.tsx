"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import homeJson from "@/content/home.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSiteData } from "@/components/providers/SiteDataProvider";

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const increment = Math.max(1, Math.floor(target / (duration / 20)));
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

function StatItem({
  stat,
  index,
}: {
  stat: { value: number; suffix: string; label: string };
  index: number;
}) {
  const { count, ref } = useCountUp(stat.value);

  return (
    <motion.div
      ref={ref}
      className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <p className="text-4xl sm:text-5xl font-heading font-extrabold mb-2 text-accent-400">
        {count}
        {stat.suffix}
      </p>
      <p className="text-primary-100 text-sm font-semibold uppercase tracking-wider">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function StatsCounter() {
  const { locale, t } = useLanguage();
  const { getConfigText } = useSiteData();
  const sectionTitle = getConfigText("section_stats_title", locale, t.sections.stats);

  const resolvedStats = homeJson.stats.map((item) => {
    const rawVal = Number(
      getConfigText(`stat_${item.key}_value`, locale, String(item.defaultValue))
    );
    const labelKey = item.labelKey as keyof typeof t.stats;
    return {
      value: Number.isFinite(rawVal) && rawVal > 0 ? rawVal : item.defaultValue,
      suffix: item.suffix,
      label: getConfigText(`stat_${item.key}_label`, locale, t.stats[labelKey]),
    };
  });

  return (
    <section className="section-padding bg-gradient-to-r from-primary-600 via-primary-700 to-primary-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <Container className="relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white">
            {sectionTitle}
          </h2>
          <div className="w-16 h-1 bg-accent-400 rounded-full mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {resolvedStats.map((stat, i) => (
            <StatItem key={i} stat={stat} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
