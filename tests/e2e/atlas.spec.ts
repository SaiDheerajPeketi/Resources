import { expect, test } from "@playwright/test";

test("atlas opens a published field note", async ({ page }) => {
  await page.goto("/atlas/");
  await expect(page.getByRole("heading", { name: "Foundations" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Hash Tables" })).toBeVisible();
  await page.getByRole("link", { name: /Open field note/ }).click();
  await expect(page.getByRole("heading", { name: "Hash Tables", level: 1 })).toBeVisible();
  await expect(page.getByText("Five-minute map")).toBeVisible();
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
