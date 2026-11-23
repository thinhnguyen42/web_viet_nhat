"use client";

import dynamic from "next/dynamic";
import ClassicalSkeleton from "@/components/ui/ClassicalSkeleton";
import LazyReveal from "@/components/ui/LazyReveal";

const FeatureGrid = dynamic(() => import("@/components/home/FeatureGrid"), {
  loading: () => <ClassicalSkeleton minHeightClass="min-h-[420px]" />,
});

const StatsCounter = dynamic(() => import("@/components/home/StatsCounter"), {
  loading: () => (
    <ClassicalSkeleton minHeightClass="min-h-[300px]" variant="navy" />
  ),
});

const LatestNews = dynamic(() => import("@/components/home/LatestNews"), {
  loading: () => <ClassicalSkeleton minHeightClass="min-h-[480px]" />,
});

const CTABanner = dynamic(() => import("@/components/home/CTABanner"), {
  loading: () => (
    <ClassicalSkeleton minHeightClass="min-h-[280px]" variant="navy" />
  ),
});

const PartnersSection = dynamic(
  () => import("@/components/home/PartnersSection"),
  {
    loading: () => <ClassicalSkeleton minHeightClass="min-h-[300px]" />,
  }
);

/**
 * Client wrapper for code-splitting below-the-fold homepage sections per Next.js 16.3.3 guidelines.
 */
export default function LazyHomeSections() {
  return (
    <>
      <LazyReveal>
        <FeatureGrid />
      </LazyReveal>
      <LazyReveal delayMs={40}>
        <StatsCounter />
      </LazyReveal>
      <LazyReveal delayMs={40}>
        <LatestNews />
      </LazyReveal>
      <LazyReveal delayMs={40}>
        <CTABanner />
      </LazyReveal>
      <LazyReveal delayMs={40}>
        <PartnersSection />
      </LazyReveal>
    </>
  );
}
