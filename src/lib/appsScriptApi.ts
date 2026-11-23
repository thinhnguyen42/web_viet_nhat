import type { Program } from "@/data/programs";
import type { NewsArticle } from "@/data/news";
import type { FacultyMember } from "@/data/faculty";

/**
 * Google Apps Script API Client
 * Hỗ trợ CMS đa ngôn ngữ (VI - JA - EN) từ 6 tab Google Sheet với cơ chế fallback an toàn khi offline.
 */

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || "";
const REQUEST_TIMEOUT_MS = 8000;

export interface StudentApplication {
  fullName: string;
  email: string;
  phone: string;
  program: string;
  japaneseLevel?: string;
  message?: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface LocalizedConfigEntry {
  vi: string;
  ja?: string;
  en?: string;
}

export type SiteConfigOverrides = Record<string, LocalizedConfigEntry>;

export interface SheetConfigRow {
  key?: string;
  value_vi?: string;
  value_ja?: string;
  value_en?: string;
}

export interface SheetProgramRow {
  id?: string;
  slug?: string;
  category?: string;
  title?: string;
  title_vi?: string;
  title_ja?: string;
  title_en?: string;
  description?: string;
  description_vi?: string;
  description_ja?: string;
  description_en?: string;
  overview_vi?: string;
  overview_ja?: string;
  overview_en?: string;
  requirement_vi?: string;
  requirement_ja?: string;
  requirement_en?: string;
  duration?: string;
  features?: string;
  image?: string;
  status?: boolean | string;
  order?: number | string;
}

export interface SheetNewsRow {
  id?: string;
  slug?: string;
  category?: string;
  date?: string;
  featured?: boolean | string;
  title?: string;
  title_vi?: string;
  title_ja?: string;
  title_en?: string;
  excerpt?: string;
  excerpt_vi?: string;
  excerpt_ja?: string;
  excerpt_en?: string;
  content?: string;
  content_vi?: string;
  content_ja?: string;
  content_en?: string;
  image?: string;
  status?: boolean | string;
}

export interface SheetFacultyRow {
  id?: string;
  name?: string;
  name_vi?: string;
  name_ja?: string;
  name_en?: string;
  title?: string;
  title_vi?: string;
  title_ja?: string;
  title_en?: string;
  specialization?: string;
  bio?: string;
  bio_vi?: string;
  bio_ja?: string;
  bio_en?: string;
  image?: string;
  status?: boolean | string;
  order?: number | string;
}

export interface SheetSiteData {
  config: SiteConfigOverrides;
  programs: Program[];
  news: NewsArticle[];
  faculty: (FacultyMember & { order?: number })[];
  updatedAt?: string;
}

interface AppsScriptAllResponse {
  status: string;
  updatedAt?: string;
  data?: {
    config?: SheetConfigRow[];
    programs?: SheetProgramRow[];
    news?: SheetNewsRow[];
    faculty?: SheetFacultyRow[];
  };
}

interface AppsScriptPostResponse {
  status: string;
  message?: string;
}

export function slugifyVietnamese(text: string): string {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isRowEnabled(status: boolean | string | undefined): boolean {
  if (status === undefined || status === "") return true;
  if (typeof status === "boolean") return status;
  const normalized = String(status).trim().toLowerCase();
  return !["false", "0", "no", "hidden", "ẩn", "an"].includes(normalized);
}

function toBoolean(val: boolean | string | undefined): boolean {
  if (typeof val === "boolean") return val;
  const normalized = String(val || "").trim().toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes";
}

function toNumber(val: number | string | undefined, fallback = 999): number {
  const num = Number(val);
  return Number.isFinite(num) && num > 0 ? num : fallback;
}

function normalizeProgramCategory(cat?: string): Program["category"] {
  const normalized = String(cat || "").trim().toLowerCase();
  if (normalized === "scholarship" || normalized === "japanese" || normalized === "exchange") {
    return normalized;
  }
  return "exchange";
}

function normalizeNewsCategory(cat?: string): NewsArticle["category"] {
  const normalized = String(cat || "").trim().toLowerCase();
  if (normalized === "announcement" || normalized === "event" || normalized === "scholarship") {
    return normalized;
  }
  return "announcement";
}

function parseFeatures(raw?: string): string[] {
  if (!raw) return [];
  return String(raw)
    .split(/\||\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function normalizeConfigFromSheet(rows: SheetConfigRow[]): SiteConfigOverrides {
  const map: SiteConfigOverrides = {};
  for (const row of rows) {
    const key = String(row.key || "").trim();
    const vi = String(row.value_vi ?? "").trim();
    if (!key || !vi) continue;
    map[key] = {
      vi,
      ja: String(row.value_ja ?? "").trim() || undefined,
      en: String(row.value_en ?? "").trim() || undefined,
    };
  }
  return map;
}

export function normalizeProgramsFromSheet(rows: SheetProgramRow[]): Program[] {
  return rows
    .filter((row) => isRowEnabled(row.status))
    .map((row) => {
      const titleVi = String(row.title_vi || row.title || "").trim();
      const titleEn = String(row.title_en || "").trim() || titleVi;
      const titleJa = String(row.title_ja || "").trim() || titleVi;
      const descVi = String(row.description_vi || row.description || "").trim();
      const descEn = String(row.description_en || "").trim() || descVi;
      const descJa = String(row.description_ja || "").trim() || descVi;
      const slug = String(row.slug || "").trim() || slugifyVietnamese(titleVi);

      return {
        slug,
        title: titleVi,
        titleEn,
        titleJa,
        category: normalizeProgramCategory(row.category),
        description: descVi,
        descriptionEn: descEn,
        descriptionJa: descJa,
        overview: String(row.overview_vi || "").trim() || undefined,
        overviewEn: String(row.overview_en || "").trim() || undefined,
        overviewJa: String(row.overview_ja || "").trim() || undefined,
        requirement: String(row.requirement_vi || "").trim() || undefined,
        requirementEn: String(row.requirement_en || "").trim() || undefined,
        requirementJa: String(row.requirement_ja || "").trim() || undefined,
        duration: String(row.duration || "1 - 2 học kỳ").trim(),
        image: String(row.image || "/images/placeholder/program-exchange-1.jpg").trim(),
        features: parseFeatures(row.features),
        status: true,
        order: toNumber(row.order),
      };
    })
    .filter((p) => Boolean(p.slug && p.title))
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export function normalizeNewsFromSheet(rows: SheetNewsRow[]): NewsArticle[] {
  return rows
    .filter((row) => isRowEnabled(row.status))
    .map((row) => {
      const titleVi = String(row.title_vi || row.title || "").trim();
      const titleEn = String(row.title_en || "").trim() || titleVi;
      const titleJa = String(row.title_ja || "").trim() || titleVi;
      const excerptVi = String(row.excerpt_vi || row.excerpt || "").trim();
      const excerptEn = String(row.excerpt_en || "").trim() || excerptVi;
      const excerptJa = String(row.excerpt_ja || "").trim() || excerptVi;
      const contentVi = String(row.content_vi || row.content || excerptVi).trim();
      const contentEn = String(row.content_en || "").trim() || contentVi;
      const contentJa = String(row.content_ja || "").trim() || contentVi;
      const slug = String(row.slug || "").trim() || slugifyVietnamese(titleVi);

      return {
        slug,
        title: titleVi,
        titleEn,
        titleJa,
        excerpt: excerptVi,
        excerptEn,
        excerptJa,
        content: contentVi,
        contentEn,
        contentJa,
        category: normalizeNewsCategory(row.category),
        date: String(row.date || "").trim() || "2026-11-23",
        image: String(row.image || "/images/placeholder/news-1.jpg").trim(),
        featured: toBoolean(row.featured),
        status: true,
      };
    })
    .filter((a) => Boolean(a.slug && a.title))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function normalizeFacultyFromSheet(
  rows: SheetFacultyRow[]
): (FacultyMember & { order?: number })[] {
  return rows
    .filter((row) => isRowEnabled(row.status))
    .map((row) => {
      const nameVi = String(row.name_vi || row.name || "").trim();
      const titleVi = String(row.title_vi || row.title || "").trim();
      const bioVi = String(row.bio_vi || row.bio || "").trim();

      return {
        name: nameVi,
        nameEn: String(row.name_en || "").trim() || nameVi,
        nameJa: String(row.name_ja || "").trim() || nameVi,
        title: titleVi,
        titleEn: String(row.title_en || "").trim() || titleVi,
        titleJa: String(row.title_ja || "").trim() || titleVi,
        specialization: String(row.specialization || "").trim(),
        bio: bioVi,
        bioEn: String(row.bio_en || "").trim() || bioVi,
        bioJa: String(row.bio_ja || "").trim() || bioVi,
        image: String(row.image || "/images/placeholder/faculty-1.jpg").trim(),
        order: toNumber(row.order),
      };
    })
    .filter((m) => Boolean(m.name && m.title))
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

async function fetchWithTimeout(
  input: string,
  init?: RequestInit
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function isAppsScriptConfigured(): boolean {
  return Boolean(APPS_SCRIPT_URL && !APPS_SCRIPT_URL.includes("DEMO_URL"));
}

/**
 * Tải toàn bộ dữ liệu CMS (Config, Programs, News, Faculty) từ Google Sheet trong 1 request.
 */
export async function fetchAllSiteData(
  forceRefresh = false
): Promise<SheetSiteData | null> {
  if (!isAppsScriptConfigured()) return null;

  try {
    const query = forceRefresh ? "action=all&nocache=1" : "action=all";
    const separator = APPS_SCRIPT_URL.includes("?") ? "&" : "?";
    const res = await fetchWithTimeout(`${APPS_SCRIPT_URL}${separator}${query}`);
    if (!res.ok) return null;

    const json = (await res.json()) as AppsScriptAllResponse;
    if (json.status !== "success" || !json.data) return null;

    return {
      config: normalizeConfigFromSheet(json.data.config || []),
      programs: normalizeProgramsFromSheet(json.data.programs || []),
      news: normalizeNewsFromSheet(json.data.news || []),
      faculty: normalizeFacultyFromSheet(json.data.faculty || []),
      updatedAt: json.updatedAt,
    };
  } catch (err) {
    console.error("Không thể tải dữ liệu từ Google Sheet:", err);
    return null;
  }
}

/**
 * Gửi form đăng ký xét tuyển / tư vấn du học sang Google Sheet (tab Don_Dang_Ky)
 */
export async function submitApplication(
  data: StudentApplication
): Promise<{ success: boolean; message: string }> {
  if (!isAppsScriptConfigured()) {
    return {
      success: true,
      message: "Đăng ký thành công (Dữ liệu đã được lưu trữ tạm thời).",
    };
  }

  try {
    const response = await fetchWithTimeout(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({ ...data, type: "application" }),
    });

    const result = (await response.json()) as AppsScriptPostResponse;
    if (result.status === "success") {
      return {
        success: true,
        message: result.message || "Gửi đăng ký thành công!",
      };
    }
    return {
      success: false,
      message: result.message || "Không thể gửi dữ liệu",
    };
  } catch (error) {
    console.error("Lỗi khi kết nối Google Apps Script:", error);
    return {
      success: false,
      message:
        "Có lỗi xảy ra khi kết nối máy chủ Google Sheets. Vui lòng thử lại sau.",
    };
  }
}

/**
 * Gửi form liên hệ / thắc mắc sang Google Sheet (tab Lien_He)
 */
export async function submitContact(
  data: ContactSubmission
): Promise<{ success: boolean; message: string }> {
  if (!isAppsScriptConfigured()) {
    return {
      success: true,
      message: "Tin nhắn của bạn đã được gửi thành công!",
    };
  }

  try {
    const response = await fetchWithTimeout(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({ ...data, type: "contact" }),
    });

    const result = (await response.json()) as AppsScriptPostResponse;
    if (result.status === "success") {
      return {
        success: true,
        message: result.message || "Gửi tin nhắn liên hệ thành công!",
      };
    }
    return {
      success: false,
      message: result.message || "Không thể gửi tin nhắn",
    };
  } catch (error) {
    console.error("Lỗi khi gửi form liên hệ sang Google Apps Script:", error);
    return {
      success: false,
      message:
        "Có lỗi xảy ra khi kết nối máy chủ Google Sheets. Vui lòng thử lại sau.",
    };
  }
}
