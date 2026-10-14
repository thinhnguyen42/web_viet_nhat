import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "japanese" | "exchange" | "scholarship";
  className?: string;
}

const badgeVariants = {
  default: "bg-neutral-100 text-neutral-700",
  japanese: "bg-pink-50 text-pink-700 border border-pink-200/50",
  exchange: "bg-blue-50 text-blue-700 border border-blue-200/50",
  scholarship: "bg-amber-50 text-amber-700 border border-amber-200/50",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        badgeVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
