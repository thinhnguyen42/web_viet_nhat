"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import pagesJson from "@/content/pages.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSiteData } from "@/components/providers/SiteDataProvider";

export default function ProgramsPage() {
  const [active, setActive] = useState("all");
  const { locale, t } = useLanguage();
  const { programs, getProgramHref } = useSiteData();
  const programsContent = pagesJson.programs;

  const filtered =
    active === "all" ? programs : programs.filter((p) => p.category === active);

  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeading
          title={t.programs.title}
          subtitle={programsContent.subtitle[locale]}
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {programsContent.filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                active === f.key
                  ? "bg-primary-500 text-white shadow-md shadow-primary-500/30"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {t.programs[f.labelKey as keyof typeof t.programs]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((program) => {
              const catInfo =
                programsContent.categoryBadges[
                  program.category as keyof typeof programsContent.categoryBadges
                ] || programsContent.categoryBadges.exchange;
              const title =
                locale === "ja"
                  ? program.titleJa || program.titleEn
                  : locale === "vi"
                  ? program.title
                  : program.titleEn;
              const desc =
                locale === "ja"
                  ? program.descriptionJa || program.descriptionEn
                  : locale === "vi"
                  ? program.description
                  : program.descriptionEn;

              return (
                <motion.div
                  key={program.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full flex flex-col justify-between">
                    <div>
                      <div className="aspect-[16/10] bg-neutral-100 overflow-hidden border-b border-neutral-100 relative">
                        <Image
                          src={program.image}
                          alt={title}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <Badge variant={program.category}>
                            {catInfo[locale]}
                          </Badge>
                          <span className="text-xs text-neutral-500 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-primary-500" />
                            {program.duration}
                          </span>
                        </div>

                        <h3 className="font-heading font-bold text-xl text-neutral-900 mb-2 leading-snug">
                          {title}
                        </h3>

                        <p className="text-neutral-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                          {desc}
                        </p>

                        <div className="space-y-1.5 pt-3 border-t border-neutral-100">
                          {program.features.slice(0, 3).map((f, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 text-xs text-neutral-600"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <Button
                        href={getProgramHref(program.slug)}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        {t.programs.viewDetails} <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
