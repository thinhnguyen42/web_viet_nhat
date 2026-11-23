"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import homeJson from "@/content/home.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSiteData } from "@/components/providers/SiteDataProvider";

export default function FeatureGrid() {
  const { locale, t } = useLanguage();
  const { getConfigText } = useSiteData();
  const sectionTitle = getConfigText("section_features_title", locale, t.sections.features);

  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeading title={sectionTitle} />
        <div className="grid md:grid-cols-3 gap-6">
          {homeJson.features.map((f, i) => {
            const title = locale === "ja" ? f.titleJa : locale === "vi" ? f.title : f.titleEn;
            const desc = locale === "ja" ? f.descJa : locale === "vi" ? f.desc : f.descEn;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={f.href} className="block group h-full">
                  <div
                    className={`rounded-3xl border bg-gradient-to-br ${f.color} p-8 h-full group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
                  >
                    <div>
                      <div className="w-16 h-16 rounded-2xl overflow-hidden mb-6 shadow-sm bg-white/80 p-1">
                        <Image
                          src={f.image}
                          alt={title}
                          width={64}
                          height={64}
                          unoptimized
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-3">
                        {title}
                      </h3>
                      <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                        {desc}
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 group-hover:text-primary-800 group-hover:gap-3 transition-all pt-4 border-t border-black/5">
                      {t.programs.viewDetails} <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
