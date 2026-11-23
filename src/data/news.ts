import newsJson from "@/content/news.json";

export interface NewsArticle {
  slug: string;
  title: string;
  titleEn: string;
  titleJa?: string;
  excerpt: string;
  excerptEn: string;
  excerptJa?: string;
  content: string;
  contentEn?: string;
  contentJa?: string;
  category: "announcement" | "event" | "scholarship";
  date: string;
  image: string;
  featured: boolean;
  status?: boolean;
}

export const newsArticles: NewsArticle[] = newsJson as NewsArticle[];

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}
