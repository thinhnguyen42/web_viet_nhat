import { cn } from "@/lib/utils";

interface ClassicalSkeletonProps {
  minHeightClass?: string;
  variant?: "light" | "navy";
  className?: string;
}

/**
 * Classical Washi & Gold hairline loading placeholder using GPU-only shimmer.
 */
export default function ClassicalSkeleton({
  minHeightClass = "min-h-[320px]",
  variant = "light",
  className = "",
}: ClassicalSkeletonProps) {
  const isNavy = variant === "navy";

  return (
    <div
      aria-busy="true"
      aria-label="Đang tải nội dung"
      className={cn(
        "relative overflow-hidden flex items-center justify-center border-y",
        isNavy
          ? "bg-primary-900 border-accent-500/20"
          : "bg-[#fcfaf5] border-[#b48a2c]/15",
        minHeightClass,
        className
      )}
    >
      {/* GPU-composited shimmer sweep */}
      <div
        aria-hidden="true"
        className={cn(
          "classical-shimmer-bar pointer-events-none absolute inset-0",
          isNavy
            ? "bg-gradient-to-r from-transparent via-white/5 to-transparent"
            : "bg-gradient-to-r from-transparent via-[#b48a2c]/10 to-transparent"
        )}
      />

      {/* Minimalist Lotus-Sakura crest emblem */}
      <div className="relative z-10 flex flex-col items-center gap-3 opacity-60">
        <svg
          width="44"
          height="44"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
          className={isNavy ? "text-accent-300" : "text-[#9a7220]"}
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <path
            d="M24 12C26.5 16.5 26.5 21 24 25C21.5 21 21.5 16.5 24 12Z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M24 25C19 23.5 15.5 20 14 15.5C18.5 16.5 22 19.5 24 25Z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M24 25C29 23.5 32.5 20 34 15.5C29.5 16.5 26 19.5 24 25Z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M17 31C19.5 29.5 28.5 29.5 31 31"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
        <div
          className={cn(
            "h-1.5 w-24 rounded-full",
            isNavy ? "bg-white/15" : "bg-[#b48a2c]/20"
          )}
        />
      </div>
    </div>
  );
}
