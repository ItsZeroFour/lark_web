import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CaseStudy } from "@/components/portfolio/CaseStudy";
import { portfolio, getPortfolioItem } from "@/data/portfolio";

interface PageProps {
  params: { slug: string };
}

/** Pre-render every case study at build time. */
export function generateStaticParams() {
  return portfolio.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const item = getPortfolioItem(params.slug);
  if (!item) return { title: "Проект не найден — Lark Freelance" };
  return {
    title: `${item.title} — ${item.categoryLabel} · Lark Freelance`,
    description: `${item.client}. ${item.summary}`,
    openGraph: {
      title: `${item.title} — Lark Freelance`,
      description: item.summary,
      images: [{ url: item.cover }],
    },
  };
}

/** /portfolio/[slug] — single case study. */
export default function CaseStudyPage({ params }: PageProps) {
  const item = getPortfolioItem(params.slug);
  if (!item) notFound();

  const index = portfolio.findIndex((p) => p.slug === item.slug);
  const next = portfolio[(index + 1) % portfolio.length];

  return (
    <>
      <Navbar />
      <main>
        <CaseStudy item={item} next={next} />
      </main>
      <Footer />
    </>
  );
}
