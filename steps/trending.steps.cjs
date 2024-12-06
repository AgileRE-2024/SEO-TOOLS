const { Given, When, Then } = require("@cucumber/cucumber");
const { chromium } = require("playwright");

let browser, page;

Given("I am on the dashboard trends page", async function () {
  // Membuka browser dan navigasi ke halaman dashboard trends
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto("http://localhost:3000/dashboard/trends"); 
});

Then("I should see a list of trending keywords", async function () {
  // Memastikan daftar trending keywords terlihat
  const trendingList = await page.locator(
    '[data-testid="trending-keywords-list"]'
  );
  await trendingList.waitFor({ state: "visible" });
});

When("I click on a keyword {string}", async function (keyword) {
  // Klik pada keyword spesifik
  await page.click(`[data-testid="keyword-${keyword}"]`);
  await page.waitForNavigation(); // Tunggu navigasi selesai
});

Then("I should be redirected to {string}", async function (string) {
  const currentUrl = page.url();
  const expectedUrl = `${string}`;
  if (!page.url().includes(`${string}`)) {
    throw new Error(`${string}`);
  }
});

const { After } = require("@cucumber/cucumber");

After(async function () {
  if (browser) {
    await browser.close();
  }
});
