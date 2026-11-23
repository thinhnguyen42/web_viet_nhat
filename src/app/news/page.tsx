"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import pagesJson from "@/content/pages.json";
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
          subtitle={pagesJson.news.subtitle[locale]}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article, i) => {
            const title =
              locale === "ja"
                ? article.titleJa || article.titleEn
                : locale === "vi"
                ? article.title
                : article.titleEn;
            const excerpt =
              locale === "ja"
                ? article.excerptJa || article.excerptEn
                : locale === "vi"
                ? article.excerpt
                : article.excerptEn;

            return (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full flex flex-col justify-between">
                  <div>
                    <div className="aspect-[16/10] bg-neutral-100 overflow-hidden border-b border-neutral-100 relative">
                      <Image
                        src={article.image}
                        alt={title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
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
                        {title}
                      </h3>

                      <p className="text-neutral-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                        {excerpt}
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
            );
          })}
        </div>
      </Container>
    </section>
  );
}
