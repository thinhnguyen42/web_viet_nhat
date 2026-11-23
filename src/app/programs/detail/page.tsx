"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import ClassicalSkeleton from "@/components/ui/ClassicalSkeleton";
import pagesJson from "@/content/pages.json";
import { useSiteData } from "@/components/providers/SiteDataProvider";
import ProgramDetailClient from "../[slug]/ProgramDetailClient";

function DynamicProgramDetailInner() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || "";
  const { programs, isLoadedFromSheet } = useSiteData();
  const detailContent = pagesJson.programs.detail;

  const program = programs.find((p) => p.slug === slug);

  if (!program) {
    if (!isLoadedFromSheet) {
      return <ClassicalSkeleton minHeightClass="min-h-[520px]" />;
    }
    return (
      <section className="section-padding min-h-[60vh] flex items-center justify-center bg-white">
        <Container className="text-center">
          <h1 className="font-heading text-3xl font-bold mb-3 text-neutral-900">
            {detailContent.notFoundTitle}
          </h1>
          <p className="text-neutral-500 mb-8 max-w-md mx-auto text-base">
            {detailContent.notFoundDesc}
          </p>
          <Button href="/programs" size="lg">
            {detailContent.notFoundButton}
          </Button>
        </Container>
      </section>
    );
  }

  return <ProgramDetailClient program={program} />;
}

export default function ProgramDynamicDetailPage() {
  return (
    <Suspense fallback={<ClassicalSkeleton minHeightClass="min-h-[520px]" />}>
      <DynamicProgramDetailInner />
    </Suspense>
  );
}
