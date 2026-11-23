"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import ClassicalSkeleton from "@/components/ui/ClassicalSkeleton";
import { useSiteData } from "@/components/providers/SiteDataProvider";
import NewsDetailClient from "../[slug]/NewsDetailClient";

function DynamicNewsDetailInner() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || "";
  const { news, isLoadedFromSheet } = useSiteData();

  const article = news.find((n) => n.slug === slug);

  if (!article) {
    if (!isLoadedFromSheet) {
      return <ClassicalSkeleton minHeightClass="min-h-[520px]" />;
    }
    return (
      <section className="section-padding min-h-[60vh] flex items-center justify-center bg-white">
        <Container className="text-center">
          <h1 className="font-heading text-3xl font-bold mb-3 text-neutral-900">
            Không tìm thấy bài viết
          </h1>
          <p className="text-neutral-500 mb-8 max-w-md mx-auto text-base">
            Bài viết bạn đang tìm kiếm có thể đã tạm ẩn hoặc thay đổi đường dẫn trên Google Sheet.
          </p>
          <Button href="/news" size="lg">
            Quay lại trang tin tức
          </Button>
        </Container>
      </section>
    );
  }

  return <NewsDetailClient article={article} />;
}

export default function NewsDynamicDetailPage() {
  return (
    <Suspense fallback={<ClassicalSkeleton minHeightClass="min-h-[520px]" />}>
      <DynamicNewsDetailInner />
    </Suspense>
  );
}
