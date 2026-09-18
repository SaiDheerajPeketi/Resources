import { expect, test } from "@playwright/test";

test("original role tracks remain directly accessible from the global navigation", async ({ page }) => {
  await page.goto("/library/");
  await page.getByRole("link", { name: "Role tracks" }).click();
  await expect(page).toHaveURL(/\/atlas\/$/);
  await expect(page.getByRole("button", { name: /AI \+ Data/i })).toHaveCount(1);
  await expect(page.getByRole("button", { name: /SDE \+ Systems/i })).toHaveCount(1);
  await expect(page.getByRole("button", { name: /DevOps \+ Cloud/i })).toHaveCount(1);
  await expect(page.getByRole("button", { name: /Cybersecurity/i })).toHaveCount(1);
  await expect(page.getByRole("button", { name: /Fintech \+ Quant/i })).toHaveCount(1);
});

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
  await expect(page.getByRole("heading", { name: "Basic → advanced study path" })).toBeVisible();
  await expect(page.getByText("Where the analogy stops matching:")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Theory, mechanisms, and trade-offs" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Grounded generation" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Interview practice" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "One-page revision sheet" })).toBeVisible();
});

test("SDE and systems pack exposes a complete design lesson", async ({ page }) => {
  await page.goto("/tracks/sde-systems/");
  const methodRow = page.getByRole("row").filter({ hasText: "System Design Interview Method" });
  await expect(methodRow).toContainText("Published");
  await expect(methodRow.getByRole("link", { name: "Open note" })).toBeVisible();
  await page.goto("/topics/sde-systems/system-design-interview-method/");
  await expect(page.getByRole("heading", { name: "System Design Interview Method", level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Frame the problem" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Interview practice" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "One-page revision sheet" })).toBeVisible();
});

test("DevOps and cloud pack exposes provider translation and SRE depth", async ({ page }) => {
  await page.goto("/tracks/devops-cloud/");
  const cloudRow = page.getByRole("row").filter({ hasText: "OCI Translation Matrix" });
  await expect(cloudRow).toContainText("Published");
  await page.goto("/topics/devops-cloud/oci-translation-matrix/");
  await expect(page.getByRole("heading", { name: "OCI Translation Matrix", level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Core matrix" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Interview practice" })).toBeVisible();
});

test("cybersecurity pack exposes current defensive engineering depth", async ({ page }) => {
  await page.goto("/tracks/cybersecurity/");
  const securityRow = page.getByRole("row").filter({ hasText: "AI Security" });
  await expect(securityRow).toContainText("Published");
  await page.goto("/topics/cybersecurity/ai-security/");
  await expect(page.getByRole("heading", { name: "AI Security", level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "LLM and agent controls" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "One-page revision sheet" })).toBeVisible();
});

test("Fintech and quant pack exposes payment and quantitative depth", async ({ page }) => {
  await page.goto("/tracks/fintech-quant/");
  const regulationRow = page.getByRole("row").filter({ hasText: "India, US, and EU Regulation" });
  await expect(regulationRow).toContainText("Published");
  await page.goto("/topics/fintech-quant/backtesting/");
  await expect(page.getByRole("heading", { name: "Backtesting", level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Data integrity" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Interview practice" })).toBeVisible();
  await expect(page.getByText(/not legal, investment, trading, or financial advice/i)).toBeVisible();
});

test("interview workspace includes career artifacts and a timed mock", async ({ page }) => {
  await page.goto("/interview/");
  await expect(page.getByRole("heading", { name: "Company archetype packs" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Quant firms" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Career field guide" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Cross-track simulation loops" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Regulated payments launch" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Resume construction" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Seventy-five-minute mock template" })).toBeVisible();
  await expect(page.getByText("65–75")).toBeVisible();
});

test("practice field opens a curated SQL simulation set", async ({ page }) => {
  await page.goto("/practice/?set=sql-analysis");
  await expect(page.getByLabel("Practice set")).toHaveValue("sql-analysis");
  await expect(page.getByText("115 min loop")).toBeVisible();
  await expect(page.getByRole("heading", { name: "SQL Fundamentals", level: 1 })).toBeVisible();
  await expect(page.getByText(/signup week/)).toBeVisible();
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

test("Stack Workbench opens a complete technology manual", async ({ page }) => {
  await page.goto("/library/");
  await expect(page.getByRole("heading", { name: "Technology library" })).toBeVisible();
  await page.getByRole("button", { name: /Java/ }).first().click();
  await page.getByRole("link", { name: /Open field manual/ }).click();
  await expect(page.getByRole("heading", { name: "Java", level: 1 })).toBeVisible();
  await expect(page.getByText("full-depth manual")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Basic → advanced learning path" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Deep theory and trade-offs" })).toBeVisible();
  await expect(page.getByText("In plain English:").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Analogy" }).first()).toBeVisible();
  await expect(page.getByText("Where it stops matching:").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Concrete example" }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Misconceptions and confused distinctions" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Command cookbook/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Tricky interview questions" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Rapid-recall flashcards" })).toBeVisible();
  await page.goto("/technologies/python/");
  await expect(page.getByText("full-depth manual")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Names, objects, identity, and mutability" })).toBeVisible();
  await page.goto("/technologies/cpp/");
  await expect(page.getByText("full-depth manual")).toBeVisible();
  await expect(page.getByRole("heading", { name: "RAII and deterministic resource management" })).toBeVisible();
  await page.goto("/technologies/javascript/");
  await expect(page.getByText("full-depth manual")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Event loop, jobs, tasks, and asynchronous control flow" })).toBeVisible();
  await page.goto("/technologies/typescript/");
  await expect(page.getByText("full-depth manual")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Erased structural types and assignability" })).toBeVisible();
  await page.goto("/technologies/go/");
  await expect(page.getByText("full-depth manual")).toBeVisible();
  await expect(page.locator(".theory-ledger > article")).toHaveCount(8);
  await expect(page.locator(".worked-example")).toHaveCount(5);
  await expect(page.locator(".question-ledger > li")).toHaveCount(12);
  await expect(page.locator(".flashcard-ledger > article")).toHaveCount(12);
  await expect(page.getByRole("heading", { name: "A-Z focus map" })).toBeVisible();
});

test("framework, database, mobile, AI, and operations manuals all expose full depth", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Representative corpus rendering is sufficient on one viewport");
  for (const slug of ["react", "postgresql", "android", "pytorch", "kubernetes"]) {
    await page.goto(`/technologies/${slug}/`);
    await expect(page.getByText("full-depth manual")).toBeVisible();
    await expect(page.locator(".theory-ledger > article")).toHaveCount(8);
    await expect(page.locator(".worked-example")).toHaveCount(5);
    await expect(page.locator(".question-ledger > li")).toHaveCount(12);
    await expect(page.getByRole("heading", { name: "A-Z focus map" })).toBeVisible();
  }
});

test("Atlas 300 filters and loads a language-specific problem artifact", async ({ page }) => {
  await page.goto("/sheets/atlas-300/");
  await expect(page.getByText("300 problems")).toBeVisible();
  const firstRow = page.getByRole("row").filter({ hasText: "Complement Pair Ledger" });
  await expect(firstRow.getByText("Full", { exact: true })).toBeVisible();
  await expect(firstRow.getByRole("link", { name: /Solve on LeetCode/ })).toHaveAttribute("href", "https://leetcode.com/problems/two-sum/");
  await page.getByLabel("Difficulty").selectOption("hard");
  await page.getByRole("link", { name: "Edit Distance", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Edit Distance", level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "From baseline to optimal" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Traps and misconceptions" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Solve on LeetCode/ })).toHaveAttribute("href", "https://leetcode.com/problems/edit-distance/");
  await page.getByRole("button", { name: "Load C++17 artifact" }).click();
  await expect(page.getByText("Reviewed solution")).toBeVisible();
  await expect(page.locator("pre")).toContainText("int editDistance");
  await page.getByRole("button", { name: "Java" }).click();
  await expect(page.getByText("Reviewed solution")).toBeVisible();
  await expect(page.locator("pre")).toContainText("int editDistance");
  await page.getByRole("button", { name: "Python" }).click();
  await expect(page.getByText("Reviewed solution")).toBeVisible();
  await expect(page.locator("pre")).toContainText("def edit_distance");
});

test("diagnostic, plan, review, and company guides are reachable", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "One local workflow check is sufficient");
  await page.goto("/diagnostic/");
  await expect(page.getByRole("heading", { name: "Optional diagnostic" })).toBeVisible();
  await page.goto("/plan/");
  await expect(page.getByRole("heading", { name: "Prerequisite-aware study plan" })).toBeVisible();
  await page.goto("/review/");
  await expect(page.getByRole("heading", { name: "Adaptive review queue" })).toBeVisible();
  await page.goto("/companies/amazon/");
  await expect(page.getByRole("heading", { name: "Amazon", level: 1 })).toBeVisible();
  await expect(page.getByText(/no proprietary questions/i)).toBeVisible();
});

test("every track exposes its full manifest and keeps its published slice on-map", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "One graph coverage check is sufficient");
  await page.goto("/atlas/");
  await page.locator(".track-tabs button").filter({ hasText: "SDE + SYSTEMS" }).click();
  await expect(page.locator(".react-flow__node")).toHaveCount(25);
  await expect(page.locator(".react-flow__node.is-selected")).toContainText("Object-Oriented Design");
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
  const row = page.locator(".pack-list > div").filter({ hasText: "Cybersecurity track" });
  await row.getByRole("button", { name: "Download" }).click();
  await expect(page.getByText("Cybersecurity track is available offline.")).toBeVisible();
  await context.setOffline(true);
  await page.goto("/topics/cybersecurity/threat-modeling/");
  await expect(page.getByRole("heading", { name: "Threat Modeling", level: 1 })).toBeVisible();
  await expect(page.getByText("Offline")).toBeVisible();
});
