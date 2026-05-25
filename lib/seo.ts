import type { Metadata } from "next";

import { siteConfig } from "@/lib/constants";

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
};

export function buildMetadata(input: MetadataInput = {}): Metadata {
  const title = input.title ? `${input.title} | ${siteConfig.name}` : siteConfig.title;
  const description = input.description ?? siteConfig.description;
  const path = input.path ?? "/";
  const canonical = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      images: [
        {
          url: siteConfig.ogImage,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
  };
}

