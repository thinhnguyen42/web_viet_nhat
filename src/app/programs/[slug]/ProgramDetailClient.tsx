"use client";

import { ArrowLeft, Clock, CheckCircle, Award, BookOpen, UserCheck } from "lucide-react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import type { Program } from "@/data/programs";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSiteData } from "@/components/providers/SiteDataProvider";

export default function ProgramDetailClient({ program: initialProgram }: { program: Program }) {
  const { locale, t } = useLanguage();
  const { programs } = useSiteData();

  const program =
    programs.find((p) => p.slug === initialProgram.slug) || initialProgram;

  const localizedTitle =
    locale === "ja"
      ? program.titleJa || program.titleEn || program.title
      : locale === "vi"
      ? program.title
      : program.titleEn || program.title;

  const localizedDescription =
    locale === "ja"
      ? program.descriptionJa || program.descriptionEn || program.description
      : locale === "vi"
      ? program.description
      : program.descriptionEn || program.description;

  const defaultOverview =
    locale === "ja"
      ? "本プログラムは、語学力・学術研究スキル・異文化理解を体系的に身につけ、日本の協定大学での学びと将来キャリアを力強く支援するよう設計されています。"
      : locale === "vi"
      ? "Chương trình được thiết kế bài bản với mục tiêu trang bị kiến thức toàn diện về ngôn ngữ, văn hóa và kỹ năng nghiên cứu thực tế. Học viên sẽ được đồng hành trực tiếp cùng đội ngũ giảng viên giàu kinh nghiệm và các chuyên gia Nhật Bản."
      : "This program is systematically designed to equip students with academic language proficiency, cultural literacy, and practical research skills under the guidance of experienced Vietnamese and Japanese faculty.";

  const overviewText =
    locale === "ja"
      ? program.overviewJa || program.overview || defaultOverview
      : locale === "vi"
      ? program.overview || defaultOverview
      : program.overviewEn || program.overview || defaultOverview;

  const requirementText =
    locale === "ja"
      ? program.requirementJa || program.requirement
      : locale === "vi"
      ? program.requirement
      : program.requirementEn || program.requirement;

  return (
    <section className="section-padding bg-white">
      <Container>
        <Button href="/programs" variant="ghost" size="sm" className="mb-8">
          <ArrowLeft className="w-4 h-4" /> {t.nav.programs}
        </Button>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Main content — 8 cols */}
          <div className="lg:col-span-8">
            <div className="aspect-[16/9] rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 shadow-xl p-8 flex flex-col justify-between text-white mb-8 border border-primary-400/20">
              <div className="flex justify-between items-start">
                <Badge
                  variant={
                    program.category === "scholarship"
                      ? "scholarship"
                      : program.category === "japanese"
                      ? "japanese"
                      : "exchange"
                  }
                  className="bg-white/90 text-neutral-900 border-none font-semibold text-xs"
                >
                  {locale === "ja"
                    ? program.category === "scholarship"
                      ? "🎓 奨学金"
                      : program.category === "japanese"
                      ? "🇯🇵 日本語"
                      : "🔄 交換留学"
                    : locale === "vi"
                    ? program.category === "scholarship"
                      ? "🎓 Học bổng"
                      : program.category === "japanese"
                      ? "🇯🇵 Tiếng Nhật"
                      : "🔄 Trao đổi du học"
                    : program.category === "scholarship"
                    ? "🎓 Scholarship"
                    : program.category === "japanese"
                    ? "🇯🇵 Japanese"
                    : "🔄 Exchange"}
                </Badge>
                <span className="text-sm bg-white/20 backdrop-blur-md px-3 py-1 rounded-full font-medium">
                  {program.duration}
                </span>
              </div>

              <div>
                <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
                  {localizedTitle}
                </h1>
                <p className="text-primary-100 text-sm sm:text-base max-w-2xl leading-relaxed">
                  {localizedDescription}
                </p>
              </div>
            </div>

            {/* Program Details */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
                  {locale === "ja"
                    ? "プログラム概要"
                    : locale === "vi"
                    ? "Tổng quan chương trình"
                    : "Program Overview"}
                </h2>
                <p className="text-neutral-700 leading-relaxed text-base whitespace-pre-line">
                  {overviewText}
                </p>
              </div>

              {requirementText && (
                <div className="p-6 rounded-2xl border border-primary-100 bg-primary-50/40">
                  <h2 className="font-heading text-lg font-bold text-primary-900 mb-2">
                    {locale === "ja"
                      ? "応募条件・対象者"
                      : locale === "vi"
                      ? "Điều kiện & Đối tượng tham gia"
                      : "Eligibility & Requirements"}
                  </h2>
                  <p className="text-neutral-700 text-sm leading-relaxed whitespace-pre-line">
                    {requirementText}
                  </p>
                </div>
              )}

              <div>
                <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
                  {locale === "ja"
                    ? "養成目標"
                    : locale === "vi"
                    ? "Mục tiêu đào tạo"
                    : "Learning Objectives"}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      icon: Award,
                      title: "Năng lực ngôn ngữ chuẩn hóa",
                      desc: "Tự tin thi đạt các chứng chỉ quốc tế và giao tiếp học thuật lưu loát.",
                    },
                    {
                      icon: BookOpen,
                      title: "Kiến thức văn hóa sâu rộng",
                      desc: "Hiểu rõ phong tục, tập quán và văn hóa nghiên cứu tại Nhật Bản.",
                    },
                    {
                      icon: UserCheck,
                      title: "Kỹ năng nghiên cứu & hội nhập",
                      desc: "Kỹ năng viết đề cương, thuyết trình và làm việc trong phòng lab.",
                    },
                    {
                      icon: CheckCircle,
                      title: "Cơ hội học bổng & việc làm",
                      desc: "Kết nối học bổng JASSO, MEXT và cơ hội nghề nghiệp Việt - Nhật.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl border border-neutral-100 bg-neutral-50/50"
                    >
                      <item.icon className="w-6 h-6 text-primary-500 mb-2" />
                      <h3 className="font-heading font-bold text-sm text-neutral-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-neutral-600 text-xs leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar — 4 cols */}
          <div className="lg:col-span-4">
            <div className="bg-neutral-50 border border-neutral-100 rounded-3xl p-6 sm:p-8 sticky top-24 shadow-sm">
              <h3 className="font-heading font-bold text-xl text-neutral-900 mb-6 pb-4 border-b border-neutral-200">
                {locale === "ja"
                  ? "プログラム情報"
                  : locale === "vi"
                  ? "Thông tin khóa học"
                  : "Program Information"}
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary-500 shrink-0" />
                  <div>
                    <p className="text-xs text-neutral-500 font-medium">
                      {t.programs.duration}
                    </p>
                    <p className="font-semibold text-sm text-neutral-800">
                      {program.duration}
                    </p>
                  </div>
                </div>
              </div>

              {program.features.length > 0 && (
                <>
                  <h4 className="font-heading font-semibold text-sm text-neutral-900 mb-3">
                    {locale === "ja"
                      ? "参加特典："
                      : locale === "vi"
                      ? "Đặc quyền học viên:"
                      : "Student Benefits:"}
                  </h4>
                  <ul className="space-y-2.5 mb-8">
                    {program.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-neutral-700"
                      >
                        <CheckCircle className="w-4 h-4 text-accent-600 mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <Button href="/admissions" size="lg" className="w-full">
                {locale === "ja"
                  ? "今すぐ留学相談する"
                  : locale === "vi"
                  ? "Đăng ký tư vấn ngay"
                  : "Apply for Consultation"}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
