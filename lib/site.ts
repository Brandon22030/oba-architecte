import type { Metadata } from "next";

/** Canonical production origin — override with NEXT_PUBLIC_SITE_URL once a custom domain is live. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oba-architecte.vercel.app";

export const SITE_NAME = "OBA Architectes Firm";

/**
 * Per-page metadata that also mirrors title/description into openGraph and
 * twitter — the root layout sets those defaults, but Next never propagates a
 * page's own `title`/`description` into them, so without this every page
 * would share the homepage's social-preview text.
 */
export function pageMetadata({
  title,
  description,
  images,
}: {
  title: string;
  description: string;
  images?: string[];
}): Metadata {
  return {
    title,
    description,
    openGraph: { title, description, ...(images && { images }) },
    twitter: { title, description, ...(images && { images }) },
  };
}
