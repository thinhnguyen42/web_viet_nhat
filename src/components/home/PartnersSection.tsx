"use client";

import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSiteData } from "@/components/providers/SiteDataProvider";

export default function PartnersSection() {
  const { locale, t } = useLanguage();
  const { partners, getConfigText } = useSiteData();
  const sectionTitle = getConfigText("section_partners_title", locale, t.sections.partners);

  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeading title={sectionTitle} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {partners.map((partner, i) => (
            <div
              key={i}
              className="h-28 rounded-2xl border border-neutral-200/80 bg-neutral-50/50 hover:bg-white flex flex-col items-center justify-center p-4 text-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100 hover:shadow-md hover:border-primary-200 transition-all duration-300"
            >
              <span className="text-xs font-semibold text-primary-600 mb-1">
                {locale === "ja"
                  ? partner.countryJa || partner.country
                  : locale === "en"
                  ? partner.countryEn || partner.country
                  : partner.country}
              </span>
              <p className="text-xs text-neutral-800 font-bold leading-tight">
                {partner.name}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
