const { Given, Then, After } = require("@cucumber/cucumber");
const { chromium } = require("playwright");

let browser, page;

Given(
  "I am on the analyse page for keyword {string}",
  async function (keyword) {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto(`http://localhost:3000/dashboard/trends/${keyword}`);
  }
);

Then("I should see a network graph for {string}", async function (keyword) {
  const graph = page.locator('[data-testid="network-graph"]');
  await graph.waitFor({ state: "visible" }); // Tunggu hingga elemen terlihat
});

Then("I should see a table of related keywords", async function () {
  const table = page.locator('[data-testid="related-keywords-table"]');
  await table.waitFor({ state: "visible" }); // Tunggu hingga elemen terlihat
});

Then(
  "I should see an Indonesia map with search interest data",
  async function () {
    const map = page.locator('[data-testid="indonesia-map"]');
    await map.waitFor({ state: "visible" }); // Tunggu hingga elemen terlihat
  }
);

After(async function () {
  if (browser) {
    await browser.close(); // Tutup browser setelah pengujian selesai
  }
});
