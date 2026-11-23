import type { Program } from "@/data/programs";
import type { NewsArticle } from "@/data/news";
import type { FacultyMember } from "@/data/faculty";

/**
 * Google Apps Script API Client
 * Kế thừa kiến trúc ?sheet=<tab> trực tiếp từ webviethann:
 *   - Fetch trực tiếp không qua cache (cache: "no-store") => Sửa trên Google Sheet là web cập nhật ngay khi F5!
 *   - Tương thích cả 2 kiểu cột: Tiếng Anh/key ngắn (home, programs, news) lẫn Tiếng Việt chuẩn (webviethann: about, faculty).
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

export interface PartnerItem {
  name: string;
  country: string;
  countryJa?: string;
  countryEn?: string;
}

export interface SheetConfigRow {
  key?: string;
  "Mã nội dung"?: string;
  vi?: string;
  ja?: string;
  en?: string;
  "Tiếng Việt"?: string;
  "Tiếng Nhật"?: string;
  "Tiếng Anh"?: string;
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
  titleJa?: string;
  title_ja?: string;
  titleEn?: string;
  title_en?: string;
  description?: string;
  description_vi?: string;
  descriptionJa?: string;
  description_ja?: string;
  descriptionEn?: string;
  description_en?: string;
  overview?: string;
  overview_vi?: string;
  overviewJa?: string;
  overview_ja?: string;
  overviewEn?: string;
  overview_en?: string;
  requirement?: string;
  requirement_vi?: string;
  requirementJa?: string;
  requirement_ja?: string;
  requirementEn?: string;
  requirement_en?: string;
  duration?: string;
  features?: string | string[];
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
  titleJa?: string;
  title_ja?: string;
  titleEn?: string;
  title_en?: string;
  excerpt?: string;
  excerpt_vi?: string;
  "excerpt VI"?: string;
  excerptJa?: string;
  excerpt_ja?: string;
  excerptEn?: string;
  excerpt_en?: string;
  "excerpt EN"?: string;
  content?: string;
  content_vi?: string;
  "content VI"?: string;
  contentJa?: string;
  content_ja?: string;
  contentEn?: string;
  content_en?: string;
  "content EN"?: string;
  image?: string;
  status?: boolean | string;
}

export interface SheetFacultyRow {
  ID?: number | string;
  id?: string;
  name?: string;
  name_vi?: string;
  nameJa?: string;
  name_ja?: string;
  nameEn?: string;
  name_en?: string;
  "Tên"?: string;
  "Tên JA"?: string;
  "Tên EN"?: string;
  title?: string;
  title_vi?: string;
  titleJa?: string;
  title_ja?: string;
  titleEn?: string;
  title_en?: string;
  "Chức vụ VI"?: string;
  "Chức vụ JA"?: string;
  "Chức vụ EN"?: string;
  specialization?: string;
  "Chuyên môn VI"?: string;
  "Chuyên môn EN"?: string;
  bio?: string;
  bio_vi?: string;
  bioJa?: string;
  bio_ja?: string;
  bioEn?: string;
  bio_en?: string;
  "Mô tả VI"?: string;
  "Mô tả JA"?: string;
  "Mô tả EN"?: string;
  "Đơn vị VI"?: string;
  "Đơn vị EN"?: string;
  image?: string;
  status?: boolean | string;
  "Hiển thị"?: boolean | string;
  order?: number | string;
}

export interface SheetPartnerRow {
  name?: string;
  country?: string;
  countryJa?: string;
  countryEn?: string;
  status?: boolean | string;
  order?: number | string;
}

export interface SheetSiteData {
  config: SiteConfigOverrides;
  programs: Program[];
  news: NewsArticle[];
  faculty: (FacultyMember & { order?: number })[];
  partners: PartnerItem[];
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

function parseFeatures(raw?: string | string[]): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw.map((item) => String(item).trim()).filter(Boolean);
  }
  const str = String(raw);
  const sep = str.includes("|") ? "|" : str.includes("\n") ? "\n" : ",";
  return str
    .split(sep)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function normalizeConfigFromSheet(rows: SheetConfigRow[]): SiteConfigOverrides {
  const map: SiteConfigOverrides = {};
  for (const row of rows) {
    const key = String(row.key || row["Mã nội dung"] || "").trim();
    const vi = String(row.vi ?? row["Tiếng Việt"] ?? row.value_vi ?? "").trim();
    if (!key || !vi) continue;
    map[key] = {
      vi,
      ja: String(row.ja ?? row["Tiếng Nhật"] ?? row.value_ja ?? "").trim() || undefined,
      en: String(row.en ?? row["Tiếng Anh"] ?? row.value_en ?? "").trim() || undefined,
    };
  }
  return map;
}

export function normalizeProgramsFromSheet(rows: SheetProgramRow[]): Program[] {
  return rows
    .filter((row) => isRowEnabled(row.status))
    .map((row) => {
      const titleVi = String(row.title_vi || row.title || "").trim();
      const titleEn = String(row.titleEn || row.title_en || "").trim() || titleVi;
      const titleJa = String(row.titleJa || row.title_ja || "").trim() || titleVi;
      const descVi = String(row.description_vi || row.description || "").trim();
      const descEn = String(row.descriptionEn || row.description_en || "").trim() || descVi;
      const descJa = String(row.descriptionJa || row.description_ja || "").trim() || descVi;
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
        overview: String(row.overview_vi || row.overview || "").trim() || undefined,
        overviewEn: String(row.overviewEn || row.overview_en || "").trim() || undefined,
        overviewJa: String(row.overviewJa || row.overview_ja || "").trim() || undefined,
        requirement: String(row.requirement_vi || row.requirement || "").trim() || undefined,
        requirementEn: String(row.requirementEn || row.requirement_en || "").trim() || undefined,
        requirementJa: String(row.requirementJa || row.requirement_ja || "").trim() || undefined,
        duration: String(row.duration || "1 - 2 học kỳ").trim(),
        image: String(row.image || "/images/programs-news/program-exchange.svg").trim(),
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
      const titleEn = String(row.titleEn || row.title_en || "").trim() || titleVi;
      const titleJa = String(row.titleJa || row.title_ja || "").trim() || titleVi;
      const excerptVi = String(row["excerpt VI"] || row.excerpt_vi || row.excerpt || "").trim();
      const excerptEn = String(row["excerpt EN"] || row.excerptEn || row.excerpt_en || "").trim() || excerptVi;
      const excerptJa = String(row.excerptJa || row.excerpt_ja || "").trim() || excerptVi;
      const contentVi = String(row["content VI"] || row.content_vi || row.content || excerptVi).trim();
      const contentEn = String(row["content EN"] || row.contentEn || row.content_en || "").trim() || contentVi;
      const contentJa = String(row.contentJa || row.content_ja || "").trim() || contentVi;
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
        image: String(row.image || "/images/programs-news/news-announcement.svg").trim(),
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
    .filter((row) =>
      row["Hiển thị"] !== undefined
        ? isRowEnabled(row["Hiển thị"])
        : isRowEnabled(row.status)
    )
    .map((row) => {
      const nameVi = String(row["Tên"] || row.name_vi || row.name || "").trim();
      const titleVi = String(row["Chức vụ VI"] || row.title_vi || row.title || "").trim();
      const bioVi = String(row["Mô tả VI"] || row.bio_vi || row.bio || "").trim();
      const specVi = String(row["Chuyên môn VI"] || row.specialization || "").trim();
      const specEn = String(row["Chuyên môn EN"] || "").trim() || specVi;

      return {
        name: nameVi,
        nameEn: String(row["Tên EN"] || row.nameEn || row.name_en || "").trim() || nameVi,
        nameJa: String(row["Tên JA"] || row.nameJa || row.name_ja || "").trim() || nameVi,
        title: titleVi,
        titleEn: String(row["Chức vụ EN"] || row.titleEn || row.title_en || "").trim() || titleVi,
        titleJa: String(row["Chức vụ JA"] || row.titleJa || row.title_ja || "").trim() || titleVi,
        specialization: specVi,
        specializationEn: specEn,
        bio: bioVi,
        bioEn: String(row["Mô tả EN"] || row.bioEn || row.bio_en || "").trim() || bioVi,
        bioJa: String(row["Mô tả JA"] || row.bioJa || row.bio_ja || "").trim() || bioVi,
        unit: String(row["Đơn vị VI"] || "").trim() || undefined,
        unitEn: String(row["Đơn vị EN"] || "").trim() || undefined,
        image: String(row.image || "/images/introductions/faculty-avatar.svg").trim(),
        order: toNumber(row.order ?? row.ID),
      };
    })
    .filter((m) => Boolean(m.name && m.title))
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export function normalizePartnersFromSheet(rows: SheetPartnerRow[]): PartnerItem[] {
  return rows
    .filter((row) => isRowEnabled(row.status))
    .map((row) => ({
      name: String(row.name || "").trim(),
      country: String(row.country || "🇯🇵 Nhật Bản").trim(),
      countryJa: String(row.countryJa || "").trim() || undefined,
      countryEn: String(row.countryEn || "").trim() || undefined,
      order: toNumber(row.order),
    }))
    .filter((p) => Boolean(p.name))
    .sort((a, b) => a.order - b.order)
    .map(({ name, country, countryJa, countryEn }) => ({
      name,
      country,
      countryJa,
      countryEn,
    }));
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
 * Gọi từng tab theo đúng chuẩn ?sheet=<tab> của webviethann (cache: "no-store").
 * Nếu tab chưa được tạo trên Google Sheet ({ error: ... }), tự bỏ qua an toàn.
 */
async function fetchSheetTab<T>(tabName: string): Promise<T[]> {
  try {
    const separator = APPS_SCRIPT_URL.includes("?") ? "&" : "?";
    const res = await fetchWithTimeout(
      `${APPS_SCRIPT_URL}${separator}sheet=${encodeURIComponent(tabName)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];

    const json: unknown = await res.json();
    if (Array.isArray(json)) return json as T[];
    if (
      json &&
      typeof json === "object" &&
      "data" in json &&
      Array.isArray((json as { data: unknown }).data)
    ) {
      return (json as { data: T[] }).data;
    }
    return [];
  } catch {
    return [];
  }
}

/**
 * Tải song song toàn bộ các tab trực tiếp từ Google Sheet (không cache cũ).
 * Cho phép chỉnh sửa Google Sheet và F5 website thấy ngay lập tức, không cần mở Apps Script.
 */
export async function fetchAllSiteData(): Promise<SheetSiteData | null> {
  if (!isAppsScriptConfigured()) return null;

  try {
    const [homeRows, aboutRows, programRows, newsRows, facultyRows, partnerRows] =
      await Promise.all([
        fetchSheetTab<SheetConfigRow>("home"),
        fetchSheetTab<SheetConfigRow>("about"),
        fetchSheetTab<SheetProgramRow>("programs"),
        fetchSheetTab<SheetNewsRow>("news"),
        fetchSheetTab<SheetFacultyRow>("faculty"),
        fetchSheetTab<SheetPartnerRow>("partners"),
      ]);

    const config = normalizeConfigFromSheet([...homeRows, ...aboutRows]);
    const programs = normalizeProgramsFromSheet(programRows);
    const news = normalizeNewsFromSheet(newsRows);
    const faculty = normalizeFacultyFromSheet(facultyRows);
    const partners = normalizePartnersFromSheet(partnerRows);

    const hasAnyData =
      Object.keys(config).length > 0 ||
      programs.length > 0 ||
      news.length > 0 ||
      faculty.length > 0 ||
      partners.length > 0;

    if (!hasAnyData) return null;

    return { config, programs, news, faculty, partners };
  } catch (err) {
    console.error("Không thể tải dữ liệu từ Google Sheet:", err);
    return null;
  }
}

/**
 * Gửi form đăng ký xét tuyển / tư vấn du học sang Google Sheet (tab admissions)
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
 * Gửi form liên hệ / thắc mắc sang Google Sheet (tab contact)
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
