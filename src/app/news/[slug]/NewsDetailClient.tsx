"use client";

import Image from "next/image";
import { ArrowLeft, Calendar, Tag, Share2 } from "lucide-react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import pagesJson from "@/content/pages.json";
import type { NewsArticle } from "@/data/news";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSiteData } from "@/components/providers/SiteDataProvider";

export default function NewsDetailClient({ article: initialArticle }: { article: NewsArticle }) {
  const { locale, t } = useLanguage();
  const { news } = useSiteData();
  const detailContent = pagesJson.news.detail;

  const article =
    news.find((n) => n.slug === initialArticle.slug) || initialArticle;

  const localizedTitle =
    locale === "ja"
      ? article.titleJa || article.titleEn || article.title
      : locale === "vi"
      ? article.title
      : article.titleEn || article.title;

  const localizedExcerpt =
    locale === "ja"
      ? article.excerptJa || article.excerptEn || article.excerpt
      : locale === "vi"
      ? article.excerpt
      : article.excerptEn || article.excerpt;

  const localizedContent =
    locale === "ja"
      ? article.contentJa || article.contentEn || article.content
      : locale === "vi"
      ? article.content
      : article.contentEn || article.content;

  const paragraphs = localizedContent
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="section-padding bg-white">
      <Container className="max-w-4xl">
        <Button href="/news" variant="ghost" size="sm" className="mb-8">
          <ArrowLeft className="w-4 h-4" /> {t.nav.news}
        </Button>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Badge>{article.category}</Badge>
            <span className="text-sm text-neutral-500 flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-primary-500" />
              {article.date}
            </span>
          </div>

          <button
            onClick={() => {
              if (navigator.share) {
                void navigator.share({
                  title: localizedTitle,
                  url: window.location.href,
                });
              } else {
                void navigator.clipboard.writeText(window.location.href);
                alert(detailContent.copiedMessage);
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" /> {detailContent.shareLabel[locale]}
          </button>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 mb-8 leading-tight tracking-tight">
          {localizedTitle}
        </h1>

        <div className="aspect-[2/1] rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 shadow-xl flex flex-col items-center justify-center p-8 text-white mb-10 text-center border border-primary-400/20 relative overflow-hidden">
          <Image
            src={article.image}
            alt={localizedTitle}
            fill
            unoptimized
            className="object-cover opacity-25 pointer-events-none"
          />
          <p className="relative z-10 text-xl sm:text-2xl font-heading font-bold max-w-2xl">
            {localizedTitle}
          </p>
        </div>

        <div className="prose prose-neutral prose-lg max-w-none text-neutral-800 leading-relaxed space-y-6">
          <p className="text-xl font-medium text-neutral-700 leading-relaxed border-l-4 border-accent-400 pl-4 py-1 italic bg-neutral-50 rounded-r-xl">
            {localizedExcerpt}
          </p>

          {paragraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}

          <h2 className="text-2xl font-bold font-heading text-neutral-900 mt-8 mb-4">
            {detailContent.supportTitle[locale]}
          </h2>
          <p>{detailContent.supportBody[locale]}</p>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <Tag className="w-4 h-4 text-primary-500" />
            <span>
              {detailContent.topicLabel[locale]} {article.category}
            </span>
          </div>
          <Button href="/admissions" size="md">
            {detailContent.ctaButton[locale]}
          </Button>
        </div>
      </Container>
    </section>
  );
}
