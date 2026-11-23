"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSiteData } from "@/components/providers/SiteDataProvider";

export default function NewsPage() {
  const { locale, t } = useLanguage();
  const { news, getNewsHref } = useSiteData();

  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeading
          title={t.news.title}
          subtitle="Cập nhật thông tin tuyển sinh, học bổng, hội thảo chuyên đề và các sự kiện giao lưu văn hóa sắp diễn ra."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="h-full flex flex-col justify-between">
                <div>
                  <div
                    className={`aspect-[16/10] flex flex-col items-center justify-center p-6 text-center border-b border-neutral-100 ${
                      article.featured
                        ? "bg-gradient-to-br from-primary-600 to-primary-900 text-white"
                        : "bg-gradient-to-br from-primary-50 to-accent-50 text-neutral-800"
                    }`}
                  >
                    <span className="text-4xl mb-2">📰</span>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        article.featured ? "text-accent-300" : "text-primary-800"
                      }`}
                    >
                      {article.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <Badge>{article.category}</Badge>
                      <span className="text-xs text-neutral-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {article.date}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-xl text-neutral-900 mb-3 line-clamp-2 leading-snug">
                      {locale === "ja" ? (article.titleJa || article.titleEn) : locale === "vi" ? article.title : article.titleEn}
                    </h3>

                    <p className="text-neutral-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                      {locale === "ja" ? (article.excerptJa || article.excerptEn) : locale === "vi" ? article.excerpt : article.excerptEn}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={getNewsHref(article.slug)}
                    className="text-primary-600 hover:text-primary-800 text-sm font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
                  >
                    {t.news.readMore} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
