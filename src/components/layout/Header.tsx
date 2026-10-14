"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./Container";
import { navItems } from "@/data/site";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale, toggleLocale, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLabels = [
    t.nav.home,
    t.nav.about,
    t.nav.programs,
    t.nav.news,
    t.nav.faculty,
    t.nav.admissions,
    t.nav.contact,
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white/80 backdrop-blur-sm sm:bg-transparent"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center text-white font-heading font-bold text-lg group-hover:bg-primary-600 transition-colors">
              VNJ
            </div>
            <div className="hidden sm:block">
              <p className="font-heading font-bold text-sm leading-tight text-primary-900">
                {locale === "vi" ? "Trung Tâm" : locale === "ja" ? "センター" : "Center"}
              </p>
              <p className="font-heading font-semibold text-xs text-primary-600">
                {locale === "vi" ? "Học Thuật Việt - Nhật" : locale === "ja" ? "日越学術協力" : "Vietnam - Japan Academic"}
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item, i) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary-500 bg-primary-50"
                      : "text-neutral-700 hover:text-primary-500 hover:bg-neutral-50"
                  }`}
                >
                  {navLabels[i]}
                </Link>
              );
            })}
          </div>

          {/* Language Selector + Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-neutral-100/90 p-0.5 rounded-xl border border-neutral-200/80 text-xs font-semibold">
              <button
                onClick={() => setLocale("vi")}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  locale === "vi"
                    ? "bg-white text-primary-700 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
                title="Tiếng Việt"
              >
                🇻🇳 VI
              </button>
              <button
                onClick={() => setLocale("ja")}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  locale === "ja"
                    ? "bg-white text-primary-700 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
                title="日本語"
              >
                🇯🇵 日
              </button>
              <button
                onClick={() => setLocale("en")}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  locale === "en"
                    ? "bg-white text-primary-700 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
                title="English"
              >
                🇬🇧 EN
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-neutral-800" />
              ) : (
                <Menu className="w-6 h-6 text-neutral-800" />
              )}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-neutral-100 shadow-lg overflow-hidden"
          >
            <Container className="py-4">
              <div className="flex flex-col gap-1">
                {navItems.map((item, i) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href));
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                          isActive
                            ? "text-primary-500 bg-primary-50"
                            : "text-neutral-700 hover:bg-neutral-50"
                        }`}
                      >
                        {navLabels[i]}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
