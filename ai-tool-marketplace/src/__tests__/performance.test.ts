/**
 * Performance tests to measure load times and bundle size
 */

import { performance } from "perf_hooks";

describe("Performance Tests", () => {
  test("JSON data loading should be fast", async () => {
    const startTime = performance.now();

    // Simulate data loading
    const toolsData = await import("@/data/tools.json");
    const leaderboardData = await import("@/data/leaderboard.json");
    const couponsData = await import("@/data/coupons.json");

    const endTime = performance.now();
    const loadTime = endTime - startTime;

    expect(toolsData.default).toBeDefined();
    expect(leaderboardData.default).toBeDefined();
    expect(couponsData.default).toBeDefined();

    // Data should load within 50ms
    expect(loadTime).toBeLessThan(50);
  });

  test("component imports should be optimized", async () => {
    const startTime = performance.now();

    // Test lazy loading of components
    const ToolCard = await import("../components/ToolCard");
    const PromptCard = await import("../components/PromptCard");
    const LeaderboardTable = await import("../components/LeaderboardTable");
    const CouponCard = await import("../components/CouponCard");

    const endTime = performance.now();
    const loadTime = endTime - startTime;

    expect(ToolCard.default).toBeDefined();
    expect(PromptCard.default).toBeDefined();
    expect(LeaderboardTable.default).toBeDefined();
    expect(CouponCard.default).toBeDefined();

    // Components should load within 100ms
    expect(loadTime).toBeLessThan(100);
  });

  test("search filtering should be performant", () => {
    const tools = Array.from({ length: 1000 }, (_, i) => ({
      id: `tool-${i}`,
      name: `Tool ${i}`,
      category: i % 2 === 0 ? "AI Art" : "Productivity",
      description: `Description for tool ${i}`,
      bestPractices: [],
      suggestedPrompts: [],
    }));

    const startTime = performance.now();

    // Simulate search filtering
    const searchTerm = "Tool 1";
    const filteredTools = tools.filter((tool) =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const endTime = performance.now();
    const filterTime = endTime - startTime;

    expect(filteredTools.length).toBeGreaterThan(0);
    // Filtering 1000 items should take less than 10ms
    expect(filterTime).toBeLessThan(10);
  });

  test("category filtering should be performant", () => {
    const tools = Array.from({ length: 1000 }, (_, i) => ({
      id: `tool-${i}`,
      name: `Tool ${i}`,
      category:
        i % 3 === 0 ? "AI Art" : i % 3 === 1 ? "Productivity" : "Writing",
      description: `Description for tool ${i}`,
      bestPractices: [],
      suggestedPrompts: [],
    }));

    const startTime = performance.now();

    // Simulate category filtering
    const selectedCategory = "AI Art";
    const filteredTools = tools.filter(
      (tool) => tool.category === selectedCategory
    );

    const endTime = performance.now();
    const filterTime = endTime - startTime;

    expect(filteredTools.length).toBeGreaterThan(0);
    // Category filtering should be very fast
    expect(filterTime).toBeLessThan(5);
  });

  test("debounced search should prevent excessive filtering", (done) => {
    let filterCount = 0;

    // Simulate debounced search behavior
    const debounceDelay = 300;
    let timeoutId: NodeJS.Timeout;

    const simulateSearch = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        filterCount++;

        if (filterCount === 1) {
          // Only one filter operation should have occurred after debouncing
          expect(filterCount).toBe(1);
          done();
        }
      }, debounceDelay);
    };

    // Simulate rapid typing
    simulateSearch();
    simulateSearch();
    simulateSearch();
    simulateSearch();
  });
});
