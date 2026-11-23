"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Target, Eye, BookOpen, Award, Users, Globe2 } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import pagesJson from "@/content/pages.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSiteData } from "@/components/providers/SiteDataProvider";

const iconMap = {
  award: Award,
  users: Users,
  globe: Globe2,
} as const;

export default function AboutPage() {
  const { locale, t } = useLanguage();
  const { getConfigText } = useSiteData();
  const aboutContent = pagesJson.about;

  const cards = [
    {
      icon: Target,
      title: getConfigText("su_menh_tieu_de", locale, t.about.mission),
      text: getConfigText(
        "su_menh_mo_ta",
        locale,
        getConfigText("about_mission", locale, aboutContent.missionDefault[locale])
      ),
    },
    {
      icon: Eye,
      title: getConfigText("tam_nhin_tieu_de", locale, t.about.vision),
      text: getConfigText(
        "tam_nhin_mo_ta",
        locale,
        getConfigText("about_vision", locale, aboutContent.visionDefault[locale])
      ),
    },
  ];

  const historyParagraphs = [
    getConfigText(
      "lich_su_1",
      locale,
      getConfigText("about_history_1", locale, aboutContent.history1Default[locale])
    ),
    getConfigText(
      "lich_su_2",
      locale,
      getConfigText("about_history_2", locale, aboutContent.history2Default[locale])
    ),
  ];

  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeading
          title={getConfigText("tieu_de_chinh", locale, t.about.title)}
          subtitle={getConfigText("phu_de", locale, aboutContent.subtitle[locale])}
        />

        {/* Intro + Heritage Illustration from /images/introductions/ */}
        <div className="max-w-4xl mx-auto mb-16 text-center space-y-8">
          <p className="text-lg text-neutral-700 leading-relaxed">
            {getConfigText(
              "mo_ta_chinh",
              locale,
              getConfigText("about_intro", locale, aboutContent.introDefault[locale])
            )}
          </p>
          <div className="rounded-3xl overflow-hidden border border-neutral-100 shadow-sm">
            <Image
              src={aboutContent.heritageImage}
              alt={getConfigText("tieu_de_chinh", locale, t.about.title)}
              width={800}
              height={420}
              unoptimized
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Mission / Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {cards.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-neutral-50 rounded-3xl p-8 md:p-10 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mb-6">
                <item.icon className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4 text-neutral-900">
                {item.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed text-base">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Highlights */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {aboutContent.highlights.map((h, i) => {
            const Icon = iconMap[h.iconKey as keyof typeof iconMap] || Award;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl border border-neutral-100 bg-white shadow-sm hover:border-primary-200 transition-colors"
              >
                <Icon className="w-8 h-8 text-primary-500 mb-3" />
                <h4 className="font-heading font-bold text-base text-neutral-900 mb-2">
                  {h.title[locale]}
                </h4>
                <p className="text-neutral-600 text-sm">{h.desc[locale]}</p>
              </div>
            );
          })}
        </div>

        {/* History / Background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary-50 to-accent-50/50 rounded-3xl p-8 md:p-12 border border-primary-100"
        >
          <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
            <BookOpen className="w-7 h-7 text-primary-600" />
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-neutral-900">
            {getConfigText("lich_su_tieu_de", locale, t.about.history)}
          </h3>
          <div className="text-neutral-700 leading-relaxed space-y-4 text-base">
            {historyParagraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
