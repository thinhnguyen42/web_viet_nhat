"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, Award } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import pagesJson from "@/content/pages.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSiteData } from "@/components/providers/SiteDataProvider";

export default function FacultyPage() {
  const { locale, t } = useLanguage();
  const { faculty } = useSiteData();
  const facultyContent = pagesJson.faculty;

  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeading
          title={t.faculty.title}
          subtitle={facultyContent.subtitle[locale]}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {faculty.map((member, i) => {
            const name =
              locale === "ja"
                ? member.nameJa || member.nameEn
                : locale === "vi"
                ? member.name
                : member.nameEn;
            const title =
              locale === "ja"
                ? member.titleJa || member.titleEn
                : locale === "vi"
                ? member.title
                : member.titleEn;
            const bio =
              locale === "ja"
                ? member.bioJa || member.bioEn
                : locale === "vi"
                ? member.bio
                : member.bioEn;
            const unit =
              locale === "en"
                ? member.unitEn || member.unit || facultyContent.defaultUnit[locale]
                : member.unit || facultyContent.defaultUnit[locale];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-neutral-50/70 border border-neutral-100 rounded-3xl p-8 text-center hover:shadow-xl hover:border-primary-100 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-28 h-28 mx-auto rounded-full overflow-hidden mb-6 shadow-lg shadow-primary-500/20 bg-primary-100">
                    <Image
                      src={member.image}
                      alt={name}
                      width={112}
                      height={112}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="font-heading font-bold text-xl text-neutral-900 mb-1">
                    {name}
                  </h3>

                  <p className="text-primary-600 text-sm font-semibold mb-4">
                    {title}
                  </p>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-700 font-medium mb-4">
                    <GraduationCap className="w-3.5 h-3.5 text-accent-500" />
                    <span>
                      {locale === "en"
                        ? member.specializationEn || member.specialization
                        : member.specialization}
                    </span>
                  </div>

                  <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                    {bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-200/60 flex items-center justify-center gap-2 text-xs text-neutral-500 font-medium">
                  <Award className="w-4 h-4 text-primary-500" />
                  <span>{unit}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
