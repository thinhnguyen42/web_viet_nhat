"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { programs as staticPrograms, type Program } from "@/data/programs";
import { newsArticles as staticNews, type NewsArticle } from "@/data/news";
import { facultyMembers as staticFaculty, type FacultyMember } from "@/data/faculty";
import homeJson from "@/content/home.json";
import type { Locale } from "@/data/i18n";
import {
  fetchAllSiteData,
  type PartnerItem,
  type SiteConfigOverrides,
} from "@/lib/appsScriptApi";

const STATIC_PROGRAM_SLUGS = new Set(staticPrograms.map((p) => p.slug));
const STATIC_NEWS_SLUGS = new Set(staticNews.map((n) => n.slug));

const defaultPartners: PartnerItem[] = homeJson.partners;

interface SiteDataContextValue {
  programs: Program[];
  news: NewsArticle[];
  faculty: FacultyMember[];
  partners: PartnerItem[];
  config: SiteConfigOverrides;
  isLoadedFromSheet: boolean;
  getConfigText: (key: string, locale: Locale, fallback: string) => string;
  getProgramHref: (slug: string) => string;
  getNewsHref: (slug: string) => string;
  refreshData: () => Promise<void>;
}

const SiteDataContext = createContext<SiteDataContextValue | undefined>(
  undefined
);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [programs, setPrograms] = useState<Program[]>(staticPrograms);
  const [news, setNews] = useState<NewsArticle[]>(staticNews);
  const [faculty, setFaculty] = useState<FacultyMember[]>(staticFaculty);
  const [partners, setPartners] = useState<PartnerItem[]>(defaultPartners);
  const [config, setConfig] = useState<SiteConfigOverrides>({});
  const [isLoadedFromSheet, setIsLoadedFromSheet] = useState(false);

  const applySheetPayload = useCallback(
    (payload: {
      config?: SiteConfigOverrides;
      programs?: Program[];
      news?: NewsArticle[];
      faculty?: FacultyMember[];
      partners?: PartnerItem[];
    }) => {
      if (payload.config && Object.keys(payload.config).length > 0) {
        setConfig(payload.config);
      }
      if (payload.programs && payload.programs.length > 0) {
        setPrograms(payload.programs);
      }
      if (payload.news && payload.news.length > 0) {
        setNews(payload.news);
      }
      if (payload.faculty && payload.faculty.length > 0) {
        setFaculty(payload.faculty);
      }
      if (payload.partners && payload.partners.length > 0) {
        setPartners(payload.partners);
      }
      setIsLoadedFromSheet(true);
    },
    []
  );

  useEffect(() => {
    let cancelled = false;

    const syncFromSheet = async () => {
      const sheetData = await fetchAllSiteData();
      if (cancelled || !sheetData) return;
      applySheetPayload(sheetData);
    };

    void syncFromSheet();
    return () => {
      cancelled = true;
    };
  }, [applySheetPayload]);

  const getConfigText = useCallback(
    (key: string, locale: Locale, fallback: string): string => {
      const entry = config[key];
      if (!entry) return fallback;
      if (locale === "ja") return entry.ja || entry.vi || fallback;
      if (locale === "en") return entry.en || entry.vi || fallback;
      return entry.vi || fallback;
    },
    [config]
  );

  const getProgramHref = useCallback((slug: string) => {
    if (STATIC_PROGRAM_SLUGS.has(slug)) {
      return `/programs/${slug}`;
    }
    return `/programs/detail?slug=${encodeURIComponent(slug)}`;
  }, []);

  const getNewsHref = useCallback((slug: string) => {
    if (STATIC_NEWS_SLUGS.has(slug)) {
      return `/news/${slug}`;
    }
    return `/news/detail?slug=${encodeURIComponent(slug)}`;
  }, []);

  const refreshData = useCallback(async () => {
    const sheetData = await fetchAllSiteData();
    if (sheetData) applySheetPayload(sheetData);
  }, [applySheetPayload]);

  const value = useMemo<SiteDataContextValue>(
    () => ({
      programs,
      news,
      faculty,
      partners,
      config,
      isLoadedFromSheet,
      getConfigText,
      getProgramHref,
      getNewsHref,
      refreshData,
    }),
    [
      programs,
      news,
      faculty,
      partners,
      config,
      isLoadedFromSheet,
      getConfigText,
      getProgramHref,
      getNewsHref,
      refreshData,
    ]
  );

  return (
    <SiteDataContext.Provider value={value}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) {
    throw new Error("useSiteData must be used within SiteDataProvider");
  }
  return ctx;
}
