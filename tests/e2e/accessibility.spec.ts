import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const route of ["/atlas/", "/tracks/ai-data/", "/topics/foundations/hash-tables/", "/topics/foundations/sql-fundamentals/", "/topics/ai-data/retrieval-augmented-generation/", "/practice/", "/interview/"]) {
  test(`${route} has no automated WCAG A/AA violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
