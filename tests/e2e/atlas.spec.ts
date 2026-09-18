import { expect, test } from "@playwright/test";

test("atlas opens a published field note", async ({ page }) => {
  await page.goto("/atlas/");
  await expect(page.getByRole("heading", { name: "Foundations" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Hash Tables" })).toBeVisible();
  await page.getByRole("link", { name: /Open field note/ }).click();
  await expect(page.getByRole("heading", { name: "Hash Tables", level: 1 })).toBeVisible();
  await expect(page.getByText("Five-minute map")).toBeVisible();
});

test("shared foundations expose complete theory and interview practice", async ({ page }) => {
  await page.goto("/topics/foundations/sql-fundamentals/");
  await expect(page.getByRole("heading", { name: "SQL Fundamentals", level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Relational correctness" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Interview practice" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "One-page revision sheet" })).toBeVisible();
});

test("AI and data pack exposes role maps and a complete specialist lesson", async ({ page }) => {
  await page.goto("/tracks/ai-data/");
  await expect(page.getByRole("heading", { name: "Choose the interview emphasis, not a different foundation." })).toBeVisible();
  await expect(page.getByText("MLOps Engineer", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Retrieval-Augmented Generation" })).toBeVisible();
  await page.goto("/topics/ai-data/retrieval-augmented-generation/");
  await expect(page.getByRole("heading", { name: "Retrieval-Augmented Generation", level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Grounded generation" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Interview practice" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "One-page revision sheet" })).toBeVisible();
});

test("interview workspace includes career artifacts and a timed mock", async ({ page }) => {
  await page.goto("/interview/");
  await expect(page.getByRole("heading", { name: "Career field guide" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Resume construction" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Seventy-five-minute mock template" })).toBeVisible();
  await expect(page.getByText("65–75")).toBeVisible();
});

test("mobile uses the semantic outline", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only fallback check");
  await page.goto("/atlas/");
  await expect(page.getByText("Semantic topic outline")).toBeVisible();
  await page.getByRole("button", { name: /Hash Tables/ }).click();
  await expect(page.getByRole("heading", { name: "Hash Tables" })).toBeVisible();
});

test("keyboard search opens a published field note", async ({ page }) => {
  await page.goto("/atlas/");
  await page.keyboard.press(process.platform === "darwin" ? "Meta+K" : "Control+K");
  const search = page.getByRole("textbox", { name: "Search the interview atlas" });
  await expect(search).toBeFocused();
  await search.fill("threat modeling");
  await page.getByRole("link", { name: /Threat Modeling/ }).click();
  await expect(page.getByRole("heading", { name: "Threat Modeling", level: 1 })).toBeVisible();
});

test("every track exposes its full manifest and keeps its published slice on-map", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "One graph coverage check is sufficient");
  await page.goto("/atlas/");
  await page.locator(".track-tabs button").filter({ hasText: "SDE + SYSTEMS" }).click();
  await expect(page.locator(".react-flow__node")).toHaveCount(25);
  await expect(page.locator(".react-flow__node.is-selected")).toContainText("Consistent Hashing");
  await expect(page.locator(".react-flow__node.is-selected")).toHaveAttribute("class", /is-selected/);
  await expect(page.getByText("25 mapped topics", { exact: true }).last()).toBeVisible();
});

test("study state survives reload and appears in a named revision list", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "One persistence check is sufficient");
  await page.goto("/topics/foundations/hash-tables/");
  await page.getByLabel("Study status").selectOption("revising");
  await page.getByRole("button", { name: "Bookmark" }).click();
  await page.getByLabel("Revision list").fill("Core loop");
  await page.getByRole("button", { name: "Add to revision" }).click();
  await page.getByLabel("Private note").fill("Review collision strategies.");
  await page.getByRole("button", { name: "Save note" }).click();
  await expect(page.getByText("Note saved locally.")).toBeVisible();
  await page.reload();
  await expect(page.getByLabel("Study status")).toHaveValue("revising");
  await expect(page.getByRole("button", { name: "Bookmarked" })).toBeVisible();
  await expect(page.getByLabel("Private note")).toHaveValue("Review collision strategies.");
  await page.goto("/revision/");
  await expect(page.getByText("Core loop · topic")).toBeVisible();
});

test("a downloaded pack opens while offline", async ({ page, context }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "One offline installation check is sufficient");
  await page.goto("/settings/");
  await page.evaluate(() => navigator.serviceWorker.ready);
  const row = page.locator(".pack-list > div").filter({ hasText: "Cybersecurity" });
  await row.getByRole("button", { name: "Download" }).click();
  await expect(page.getByText("Cybersecurity offline pack is available offline.")).toBeVisible();
  await context.setOffline(true);
  await page.goto("/topics/cybersecurity/threat-modeling/");
  await expect(page.getByRole("heading", { name: "Threat Modeling", level: 1 })).toBeVisible();
  await expect(page.getByText("Offline")).toBeVisible();
});
