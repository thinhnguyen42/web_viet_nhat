"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import pagesJson from "@/content/pages.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSiteData } from "@/components/providers/SiteDataProvider";
import { submitApplication } from "@/lib/appsScriptApi";

export default function AdmissionsPage() {
  const { locale, t } = useLanguage();
  const { programs } = useSiteData();
  const admissionsContent = pagesJson.admissions;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    program: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setStatusMessage(null);

    const res = await submitApplication({
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      program: form.program,
      message: form.message,
    });

    setSubmitted(false);
    if (res.success) {
      setStatusMessage({
        type: "success",
        text: admissionsContent.successMessage,
      });
      setForm({
        fullName: "",
        email: "",
        phone: "",
        program: "",
        message: "",
      });
    } else {
      setStatusMessage({
        type: "error",
        text: res.message || admissionsContent.errorFallback,
      });
    }
  };

  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeading
          title={t.admissions.title}
          subtitle={admissionsContent.subtitle}
        />

        {/* Timeline */}
        <div className="max-w-4xl mx-auto mb-20">
          <h3 className="font-heading text-2xl font-bold text-center mb-10 text-neutral-900">
            {t.admissions.timeline}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {admissionsContent.timelineSteps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-neutral-50 border border-neutral-100 rounded-2xl p-6 text-center relative"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-500 text-white flex items-center justify-center mx-auto mb-4 font-heading font-extrabold text-lg shadow-md shadow-primary-500/25">
                  {s.step}
                </div>
                <h4 className="font-heading font-bold text-base text-neutral-900 mb-2">
                  {locale === "vi" ? s.title : s.titleEn}
                </h4>
                <p className="text-neutral-600 text-xs leading-relaxed">
                  {locale === "vi" ? s.desc : s.descEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Registration Form */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-neutral-50 to-primary-50/30 border border-neutral-100 rounded-3xl p-8 md:p-10 shadow-lg shadow-primary-500/5">
            <div className="text-center mb-8">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                {t.admissions.form}
              </h3>
              <p className="text-neutral-600 text-sm">
                {admissionsContent.formDescription}
              </p>
            </div>

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
              <Input
                label={t.admissions.fullName}
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                placeholder={admissionsContent.fullNamePlaceholder}
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label={t.admissions.email}
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder={admissionsContent.emailPlaceholder}
                />
                <Input
                  label={t.admissions.phone}
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder={admissionsContent.phonePlaceholder}
                />
              </div>

              <div>
                <label
                  htmlFor="program"
                  className="block text-sm font-medium text-neutral-700 mb-1.5"
                >
                  {t.admissions.program} <span className="text-red-500">*</span>
                </label>
                <select
                  id="program"
                  name="program"
                  value={form.program}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm bg-white text-neutral-900 cursor-pointer"
                >
                  <option value="">{admissionsContent.selectPlaceholder}</option>
                  {programs.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {locale === "vi" ? p.title : p.titleEn}
                    </option>
                  ))}
                </select>
              </div>

              <Textarea
                label={t.admissions.message}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={admissionsContent.messagePlaceholder}
                rows={3}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full mt-4"
                disabled={submitted}
              >
                {submitted ? admissionsContent.submittingLabel : t.admissions.submit}
              </Button>
            </form>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h3 className="font-heading text-2xl font-bold text-center mb-8 text-neutral-900">
            {admissionsContent.faqHeading}
          </h3>
          <div className="space-y-4">
            {admissionsContent.faqs.map((faq, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-neutral-100 bg-neutral-50"
              >
                <h4 className="font-heading font-bold text-base text-neutral-900 mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-neutral-600 text-sm pl-7 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
