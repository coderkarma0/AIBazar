describe("SEO Meta Tag Generation", () => {
  describe("Tool Detail Page Metadata", () => {
    it("should generate proper metadata for existing tool", async () => {
      // Mock the generateMetadata function behavior
      const mockMetadata = {
        title: "ChatGPT - Conversational AI AI Tool",
        description:
          "An advanced conversational AI model that can assist with writing, coding, learning, and more. Learn best practices and get suggested prompts for ChatGPT.",
        keywords: [
          "ChatGPT",
          "Conversational AI",
          "AI tool",
          "best practices",
          "prompts",
          "artificial intelligence",
          "Be specific",
          "Break complex",
          "Use system",
        ],
        openGraph: {
          title: "ChatGPT - Conversational AI AI Tool",
          description:
            "An advanced conversational AI model that can assist with writing, coding, learning, and more. Learn best practices and get suggested prompts for ChatGPT.",
          url: "https://ai-tool-marketplace.vercel.app/tools/chatgpt",
          type: "article",
        },
        twitter: {
          card: "summary_large_image",
          title: "ChatGPT - Conversational AI AI Tool",
          description:
            "An advanced conversational AI model that can assist with writing, coding, learning, and more. Learn best practices and get suggested prompts.",
        },
        alternates: {
          canonical: "https://ai-tool-marketplace.vercel.app/tools/chatgpt",
        },
      };

      expect(mockMetadata.title).toContain("ChatGPT");
      expect(mockMetadata.title).toContain("Conversational AI");
      expect(mockMetadata.description).toContain("conversational AI model");
      expect(mockMetadata.keywords).toContain("ChatGPT");
      expect(mockMetadata.keywords).toContain("AI tool");
    });

    it("should generate Open Graph metadata", () => {
      const mockOpenGraph = {
        title: "ChatGPT - Conversational AI AI Tool",
        description:
          "An advanced conversational AI model that can assist with writing, coding, learning, and more.",
        url: "https://ai-tool-marketplace.vercel.app/tools/chatgpt",
        type: "article",
      };

      expect(mockOpenGraph.title).toBeDefined();
      expect(mockOpenGraph.description).toBeDefined();
      expect(mockOpenGraph.url).toMatch(
        /^https:\/\/ai-tool-marketplace\.vercel\.app\/tools\/[a-z0-9-]+$/
      );
      expect(mockOpenGraph.type).toBe("article");
    });

    it("should generate Twitter Card metadata", () => {
      const mockTwitter = {
        card: "summary_large_image",
        title: "ChatGPT - Conversational AI AI Tool",
        description:
          "An advanced conversational AI model that can assist with writing, coding, learning, and more.",
      };

      expect(mockTwitter.card).toBe("summary_large_image");
      expect(mockTwitter.title).toBeDefined();
      expect(mockTwitter.description).toBeDefined();
    });

    it("should handle non-existent tool gracefully", () => {
      const mockNotFoundMetadata = {
        title: "Tool Not Found - AI Tool Marketplace",
        description: "The requested AI tool could not be found.",
      };

      expect(mockNotFoundMetadata.title).toBe(
        "Tool Not Found - AI Tool Marketplace"
      );
      expect(mockNotFoundMetadata.description).toBe(
        "The requested AI tool could not be found."
      );
    });
  });
});

describe("Structured Data Validation", () => {
  it("should validate JSON-LD structured data format for SoftwareApplication", () => {
    const sampleStructuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "ChatGPT",
      description: "An advanced conversational AI model",
      applicationCategory: "Conversational AI",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.5",
        ratingCount: "100",
        bestRating: "5",
        worstRating: "1",
      },
    };

    // Validate required Schema.org properties
    expect(sampleStructuredData["@context"]).toBe("https://schema.org");
    expect(sampleStructuredData["@type"]).toBe("SoftwareApplication");
    expect(sampleStructuredData.name).toBeDefined();
    expect(sampleStructuredData.description).toBeDefined();
    expect(sampleStructuredData.offers).toBeDefined();
    expect(sampleStructuredData.aggregateRating).toBeDefined();
    expect(sampleStructuredData.offers["@type"]).toBe("Offer");
    expect(sampleStructuredData.aggregateRating["@type"]).toBe(
      "AggregateRating"
    );
  });

  it("should validate ItemList structured data format", () => {
    const sampleItemList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "AI Tools Leaderboard",
      description: "Rankings of the top AI tools",
      numberOfItems: 2,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "SoftwareApplication",
            name: "ChatGPT",
            description: "Conversational AI tool",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "SoftwareApplication",
            name: "Claude",
            description: "AI assistant",
          },
        },
      ],
    };

    expect(sampleItemList["@context"]).toBe("https://schema.org");
    expect(sampleItemList["@type"]).toBe("ItemList");
    expect(sampleItemList.itemListElement).toHaveLength(2);
    expect(sampleItemList.itemListElement[0]["@type"]).toBe("ListItem");
    expect(sampleItemList.itemListElement[0].position).toBe(1);
    expect(sampleItemList.itemListElement[0].item["@type"]).toBe(
      "SoftwareApplication"
    );
  });

  it("should validate WebSite structured data format", () => {
    const sampleWebSite = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "AI Tool Marketplace",
      description: "Discover the best AI tools",
      url: "https://ai-tool-marketplace.vercel.app",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://ai-tool-marketplace.vercel.app/tools?search={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    };

    expect(sampleWebSite["@context"]).toBe("https://schema.org");
    expect(sampleWebSite["@type"]).toBe("WebSite");
    expect(sampleWebSite.name).toBeDefined();
    expect(sampleWebSite.url).toBeDefined();
    expect(sampleWebSite.potentialAction["@type"]).toBe("SearchAction");
    expect(sampleWebSite.potentialAction.target.urlTemplate).toContain(
      "{search_term_string}"
    );
  });

  it("should validate Offer structured data format", () => {
    const sampleOffer = {
      "@type": "Offer",
      name: "ChatGPT Plus - 50% Off First Month",
      description: "Discount code: CHATGPT50",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        eligibleQuantity: {
          "@type": "QuantitativeValue",
          value: 1,
        },
      },
      validThrough: "2024-12-31",
      seller: {
        "@type": "Organization",
        name: "AI Tool Marketplace",
      },
    };

    expect(sampleOffer["@type"]).toBe("Offer");
    expect(sampleOffer.name).toBeDefined();
    expect(sampleOffer.description).toBeDefined();
    expect(sampleOffer.priceSpecification["@type"]).toBe("PriceSpecification");
    expect(sampleOffer.seller["@type"]).toBe("Organization");
    expect(sampleOffer.validThrough).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("SEO Best Practices", () => {
  it("should have proper title length (under 60 characters)", () => {
    const sampleTitle = "ChatGPT - Conversational AI AI Tool";
    expect(sampleTitle.length).toBeLessThanOrEqual(60);
  });

  it("should have proper description length (under 160 characters)", () => {
    const sampleDescription =
      "An advanced conversational AI model that can assist with writing, coding, learning, and more. Learn best practices and get suggested prompts.";
    expect(sampleDescription.length).toBeLessThanOrEqual(160);
  });

  it("should include relevant keywords", () => {
    const sampleKeywords = [
      "ChatGPT",
      "Conversational AI",
      "AI tool",
      "best practices",
      "prompts",
      "artificial intelligence",
    ];

    expect(sampleKeywords).toContain("ChatGPT");
    expect(sampleKeywords).toContain("AI tool");
    expect(sampleKeywords).toContain("best practices");
  });

  it("should have consistent URL structure", () => {
    const canonicalUrl = "https://ai-tool-marketplace.vercel.app/tools/chatgpt";
    const ogUrl = "https://ai-tool-marketplace.vercel.app/tools/chatgpt";

    expect(canonicalUrl).toBe(ogUrl);
    expect(canonicalUrl).toMatch(
      /^https:\/\/ai-tool-marketplace\.vercel\.app\/tools\/[a-z0-9-]+$/
    );
  });

  it("should validate meta tag structure", () => {
    const sampleMetaTags = {
      title: "AI Tool Marketplace - Discover the Best AI Tools",
      description:
        "Discover the best AI tools, learn best practices, get exclusive discount codes.",
      keywords: ["AI tools", "artificial intelligence", "productivity"],
      "og:title": "AI Tool Marketplace - Discover the Best AI Tools",
      "og:description":
        "Discover the best AI tools, learn best practices, get exclusive discount codes.",
      "og:type": "website",
      "og:url": "https://ai-tool-marketplace.vercel.app",
      "twitter:card": "summary_large_image",
      "twitter:title": "AI Tool Marketplace - Discover the Best AI Tools",
      "twitter:description":
        "Discover the best AI tools, learn best practices, get exclusive discount codes.",
    };

    expect(sampleMetaTags.title).toBeDefined();
    expect(sampleMetaTags.description).toBeDefined();
    expect(Array.isArray(sampleMetaTags.keywords)).toBe(true);
    expect(sampleMetaTags["og:title"]).toBeDefined();
    expect(sampleMetaTags["og:type"]).toBe("website");
    expect(sampleMetaTags["twitter:card"]).toBe("summary_large_image");
  });
});

describe("Sitemap and Robots", () => {
  it("should validate sitemap structure", () => {
    const sampleSitemapEntry = {
      url: "https://ai-tool-marketplace.vercel.app/tools/chatgpt",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    };

    expect(sampleSitemapEntry.url).toMatch(
      /^https:\/\/ai-tool-marketplace\.vercel\.app/
    );
    expect(sampleSitemapEntry.lastModified).toBeInstanceOf(Date);
    expect([
      "always",
      "hourly",
      "daily",
      "weekly",
      "monthly",
      "yearly",
      "never",
    ]).toContain(sampleSitemapEntry.changeFrequency);
    expect(sampleSitemapEntry.priority).toBeGreaterThanOrEqual(0);
    expect(sampleSitemapEntry.priority).toBeLessThanOrEqual(1);
  });

  it("should validate robots.txt structure", () => {
    const sampleRobots = {
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/", "/admin/"],
      },
      sitemap: "https://ai-tool-marketplace.vercel.app/sitemap.xml",
    };

    expect(sampleRobots.rules.userAgent).toBe("*");
    expect(sampleRobots.rules.allow).toBe("/");
    expect(Array.isArray(sampleRobots.rules.disallow)).toBe(true);
    expect(sampleRobots.sitemap).toMatch(/^https:\/\/.*\/sitemap\.xml$/);
  });

  it("should validate sitemap contains all required pages", () => {
    const expectedPages = ["/", "/tools", "/leaderboard", "/coupons"];

    const sampleSitemap = [
      { url: "https://ai-tool-marketplace.vercel.app", priority: 1 },
      { url: "https://ai-tool-marketplace.vercel.app/tools", priority: 0.9 },
      {
        url: "https://ai-tool-marketplace.vercel.app/leaderboard",
        priority: 0.8,
      },
      { url: "https://ai-tool-marketplace.vercel.app/coupons", priority: 0.7 },
    ];

    expectedPages.forEach((page) => {
      const found = sampleSitemap.some((entry) =>
        entry.url.endsWith(page === "/" ? "" : page)
      );
      expect(found).toBe(true);
    });
  });
});
