"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSiteData } from "@/components/providers/SiteDataProvider";
import { FacebookIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { submitContact } from "@/lib/appsScriptApi";

export default function ContactPage() {
  const { locale, t } = useLanguage();
  const { getConfigText } = useSiteData();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const address = getConfigText("contact_address", locale, siteConfig.address);
  const phone = getConfigText("contact_phone", locale, siteConfig.phone);
  const email = getConfigText("contact_email", locale, siteConfig.email);
  const officeHours = getConfigText(
    "contact_hours",
    locale,
    t.contact.officeHoursValue
  );
  const facebook = getConfigText(
    "social_facebook",
    locale,
    siteConfig.social.facebook
  );
  const youtube = getConfigText(
    "social_youtube",
    locale,
    siteConfig.social.youtube
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setStatusMessage(null);

    const res = await submitContact(form);
    setSubmitted(false);

    if (res.success) {
      setStatusMessage({
        type: "success",
        text: "Tin nhắn của bạn đã được gửi thành công! Bộ phận hợp tác quốc tế sẽ phản hồi trong thời gian sớm nhất.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatusMessage({
        type: "error",
        text: res.message || "Không thể gửi tin nhắn. Vui lòng thử lại sau.",
      });
    }
  };

  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeading
          title={t.contact.title}
          subtitle="Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi câu hỏi của quý phụ huynh và học viên."
        />

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Form — 7 cols */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-50/80 border border-neutral-100 rounded-3xl p-8 md:p-10 shadow-sm">
              <h3 className="font-heading text-2xl font-bold mb-6 text-neutral-900">
                {t.contact.formTitle}
              </h3>

              {statusMessage && (
                <div
                  className={`mb-6 p-4 rounded-xl text-sm font-medium ${
                    statusMessage.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label={t.contact.name}
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Nguyễn Văn A"
                  />
                  <Input
                    label={t.contact.email}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="name@example.com"
                  />
                </div>
                <Input
                  label={t.contact.subject}
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="Cần tư vấn chương trình trao đổi du học Nhật Bản..."
                />
                <Textarea
                  label={t.contact.message}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Nội dung chi tiết cần hỗ trợ..."
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-2"
                  disabled={submitted}
                >
                  {submitted ? "Đang gửi..." : t.contact.send}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info & Map — 5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="bg-neutral-50/80 border border-neutral-100 rounded-3xl p-8 shadow-sm">
              <h3 className="font-heading text-xl font-bold mb-6 text-neutral-900">
                {t.contact.info}
              </h3>
              <div className="space-y-5 mb-8">
                {[
                  {
                    icon: MapPin,
                    label: t.contact.address,
                    value: address,
                  },
                  {
                    icon: Phone,
                    label: t.contact.phone,
                    value: phone,
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: email,
                  },
                  {
                    icon: Clock,
                    label: t.contact.officeHours,
                    value: officeHours,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-primary-100/80 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 font-medium mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold text-neutral-800 leading-snug">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-neutral-200/60 flex items-center gap-3">
                <span className="text-xs text-neutral-500 font-medium">
                  Kết nối với chúng tôi:
                </span>
                <div className="flex gap-2">
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 hover:bg-primary-500 hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 hover:bg-primary-500 hover:text-white transition-colors"
                    aria-label="YouTube"
                  >
                    <YoutubeIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-3xl overflow-hidden border border-neutral-200/80 aspect-[16/10] shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241673892787!2d106.6896238!3d10.7787884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3069c9b5a7%3A0x6b4fb83a1523415!2zOTcgVsO1IFbEg24gVOG6p24sIFBoxrDhu51uZyA2LCBRdeG6rW4gMywgSOG7kyBDaMOtIE1pbmggNzAwMDA!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="HCMCOU Map"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
