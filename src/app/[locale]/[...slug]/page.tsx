import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SystemScreenPage } from "@/components/system-screen";
import { SeoListingPage } from "@/components/layout/SeoListingPage";
import { buildPathFromSlug, resolveScreenByPath } from "@/lib/screen-catalog";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const path = buildPathFromSlug(resolvedParams.slug);
  const screen = resolveScreenByPath(path);

  if (!screen) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: screen.title,
    description: screen.summary,
  };
}

export default async function SlugPage({ params }: Props) {
  const resolvedParams = await params;
  const path = buildPathFromSlug(resolvedParams.slug);
  const screen = resolveScreenByPath(path);

  if (!screen) {
    notFound();
  }

  // Use high-fidelity SEO template if applicable
  if (screen.category === "SEO Programmatic") {
    return <SeoListingPage screen={screen} />;
  }

  return <SystemScreenPage screen={screen} />;
}
