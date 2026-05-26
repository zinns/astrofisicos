import { describe, expect, it } from "vitest";

import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

describe("buildMetadata", () => {
  it("uses the site defaults when no route metadata is provided", () => {
    const metadata = buildMetadata();

    expect(metadata.title).toBe(siteConfig.title);
    expect(metadata.description).toBe(siteConfig.description);
    expect(metadata.alternates?.canonical).toBe(`${siteConfig.url}/`);
  });

  it("builds route-aware title and canonical values", () => {
    const metadata = buildMetadata({
      title: "Contenido",
      path: "/contenido",
      description: "Hub editorial",
    });

    expect(metadata.title).toBe(`Contenido | ${siteConfig.name}`);
    expect(metadata.description).toBe("Hub editorial");
    expect(metadata.alternates?.canonical).toBe(`${siteConfig.url}/contenido`);
  });
});

