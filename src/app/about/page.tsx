"use client";

import { motion } from "framer-motion";
import { Target, Eye, BookOpen, Award, Users, Globe2 } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSiteData } from "@/components/providers/SiteDataProvider";

export default function AboutPage() {
  const { locale, t } = useLanguage();
  const { getConfigText } = useSiteData();

  const introDefault =
    locale === "vi"
      ? "Trung Tâm Hợp Tác Học Thuật Việt - Nhật trực thuộc Trường Đại học Mở TP.HCM có sứ mệnh đẩy mạnh nghiên cứu song phương, tổ chức các chương trình trao đổi học sinh - sinh viên sang các trường đại học hàng đầu tại Nhật Bản du học."
      : locale === "ja"
      ? "日越学術協力センターは、ベトナムと日本の学術共同研究を促進し、日本の協定大学への学生交換留学プログラムを強力に支援しています。"
      : "The Vietnam - Japan Academic Center is dedicated to advancing bilateral research cooperation and facilitating student exchange programs to top universities in Japan.";

  const missionDefault =
    locale === "vi"
      ? "Xây dựng cầu nối học thuật bền vững giữa Việt Nam và Nhật Bản. Đào tạo sinh viên xuất sắc, trang bị năng lực tiếng Nhật học thuật và khả năng nghiên cứu khoa học để du học trao đổi thành công tại Nhật Bản."
      : locale === "ja"
      ? "ベトナムと日本の強固な学術ネットワークを構築し、日本への交換留学を成功させる専門的学術日本語力と研究能力を備えた優秀な学生を育成します。"
      : "Build enduring academic partnerships between Vietnam and Japan, nurturing students with academic Japanese proficiency and research capabilities.";

  const visionDefault =
    locale === "vi"
      ? "Trở thành trung tâm kiểu mẫu hàng đầu trong kết nối hợp tác giáo dục đại học, trao đổi học sinh - sinh viên và chuyển giao tri thức giữa các trường đại học Việt Nam và Nhật Bản."
      : locale === "ja"
      ? "ベトナムと日本の大学間学術交流、交換留学、知識移転における先導的かつ模範的な教育協力センターを目指します。"
      : "Become the premier center for higher education cooperation, student exchanges, and knowledge transfer between Vietnam and Japan.";

  const history1Default =
    locale === "vi"
      ? "Được thành lập trong khuôn khổ chiến lược quốc tế hóa giáo dục của Trường Đại học Mở TP.HCM, Trung Tâm Hợp Tác Học Thuật Việt - Nhật là cầu nối tin cậy hàng đầu cho sinh viên Việt Nam tiếp cận các chương trình trao đổi và học bổng du học Nhật Bản danh giá."
      : locale === "ja"
      ? "ホーチミン市オープン大学の国際化推進戦略のもとで設立された日越学術協力センターは、ベトナム人学生が日本のトップ大学への交換留学および名誉ある奨学金を獲得するための信頼できる窓口です。"
      : "Established under the internationalization strategy of HCMCOU, the Vietnam - Japan Academic Center serves as the premier bridge for students seeking exchange programs and prestigious scholarships in Japan.";

  const history2Default =
    locale === "vi"
      ? "Trung tâm liên tục mở rộng các chương trình học bổng JASSO, học bổng MEXT, hội thảo khoa học quốc tế song phương và các chuyến thực tập học thuật tại Nhật Bản, hỗ trợ tối đa cho sinh viên hiện thực hóa ước mơ du học."
      : locale === "ja"
      ? "当センターでは、JASSO奨学金や国費留学生（MEXT）奨学金の支援、日越共同国際学術シンポジウム、日本での学術インターンシップを継続的に拡大しています。"
      : "The Center actively expands JASSO scholarships, MEXT support, bilateral scientific conferences, and academic internships in Japan.";

  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeading
          title={t.about.title}
          subtitle={
            locale === "vi"
              ? "Cầu nối học thuật, nghiên cứu khoa học và phát triển nguồn nhân lực chất lượng cao giữa Việt Nam và Nhật Bản."
              : locale === "ja"
              ? "ベトナムと日本の学術研究協力および高度人材育成をつなぐ公式プラットフォーム。"
              : "Bridging academic research, higher education, and talent development between Vietnam and Japan."
          }
        />

        {/* Intro */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <p className="text-lg text-neutral-700 leading-relaxed">
            {getConfigText("about_intro", locale, introDefault)}
          </p>
        </div>

        {/* Mission / Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {[
            {
              icon: Target,
              title: t.about.mission,
              text: getConfigText("about_mission", locale, missionDefault),
            },
            {
              icon: Eye,
              title: t.about.vision,
              text: getConfigText("about_vision", locale, visionDefault),
            },
          ].map((item, i) => (
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
          {[
            {
              icon: Award,
              title: locale === "vi" ? "Chứng nhận chuẩn Nhật Bản" : locale === "ja" ? "日本基準の学術認定" : "Japanese Academic Standard",
              desc: locale === "vi" ? "Đào tạo theo khung năng lực tiếng Nhật học thuật JLPT N3 - N1 và kỹ năng nghiên cứu." : locale === "ja" ? "JLPT上位級および学術研究スキルに特化した教育カリキュラム。" : "Curriculum aligned with JLPT N3-N1 academic Japanese standards.",
            },
            {
              icon: Users,
              title: locale === "vi" ? "Giảng viên & Giáo sư đối tác" : locale === "ja" ? "日越の教授陣・専門家" : "Distinguished Professors",
              desc: locale === "vi" ? "100% giảng viên trình độ thạc sĩ - tiến sĩ tu nghiệp tại Nhật và các giáo sư thỉnh giảng người Nhật." : locale === "ja" ? "日本留学経験を持つ修士・博士取得者および日本の客員教授陣。" : "Faculty with degrees from Japan and visiting Japanese professors.",
            },
            {
              icon: Globe2,
              title: locale === "vi" ? "Đối tác đại học hàng đầu" : locale === "ja" ? "日本のトップ協定大学" : "Top Partner Universities",
              desc: locale === "vi" ? "Hợp tác trực tiếp với ĐH Tokyo, ĐH Kyoto, ĐH Osaka, ĐH Tohoku và học bổng JASSO." : locale === "ja" ? "東京大学、京都大学、大阪大学、東北大学およびJASSOとの強固な連携。" : "Direct partnerships with UTokyo, Kyoto, Osaka, Tohoku and JASSO.",
            },
          ].map((h, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-neutral-100 bg-white shadow-sm hover:border-primary-200 transition-colors"
            >
              <h.icon className="w-8 h-8 text-primary-500 mb-3" />
              <h4 className="font-heading font-bold text-base text-neutral-900 mb-2">
                {h.title}
              </h4>
              <p className="text-neutral-600 text-sm">{h.desc}</p>
            </div>
          ))}
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
            {t.about.history}
          </h3>
          <div className="text-neutral-700 leading-relaxed space-y-4 text-base">
            <p>{getConfigText("about_history_1", locale, history1Default)}</p>
            <p>{getConfigText("about_history_2", locale, history2Default)}</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
