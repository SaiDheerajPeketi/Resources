import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const route of ["/atlas/", "/tracks/ai-data/", "/tracks/sde-systems/", "/tracks/devops-cloud/", "/tracks/cybersecurity/", "/tracks/fintech-quant/", "/topics/foundations/hash-tables/", "/topics/foundations/sql-fundamentals/", "/topics/ai-data/retrieval-augmented-generation/", "/topics/sde-systems/system-design-interview-method/", "/topics/devops-cloud/oci-translation-matrix/", "/topics/cybersecurity/ai-security/", "/topics/fintech-quant/backtesting/", "/topics/fintech-quant/india-us-and-eu-regulation/", "/practice/", "/interview/"]) {
  test(`${route} has no automated WCAG A/AA violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
