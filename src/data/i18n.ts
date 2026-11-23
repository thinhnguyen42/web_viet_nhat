import i18nJson from "@/content/i18n.json";

export type Locale = "vi" | "en" | "ja";

export type TranslationSchema = typeof i18nJson.vi;
export type TranslationKeys = TranslationSchema;

export const translations: Record<Locale, TranslationSchema> = i18nJson;
