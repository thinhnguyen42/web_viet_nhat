import programsJson from "@/content/programs.json";

export interface Program {
  slug: string;
  title: string;
  titleEn: string;
  titleJa?: string;
  category: "japanese" | "exchange" | "scholarship";
  description: string;
  descriptionEn: string;
  descriptionJa?: string;
  overview?: string;
  overviewEn?: string;
  overviewJa?: string;
  requirement?: string;
  requirementEn?: string;
  requirementJa?: string;
  duration: string;
  image: string;
  features: string[];
  status?: boolean;
  order?: number;
}

export const programs: Program[] = programsJson as Program[];

export function getProgramsByCategory(category?: string): Program[] {
  if (!category || category === "all") return programs;
  return programs.filter((p) => p.category === category);
}

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}
