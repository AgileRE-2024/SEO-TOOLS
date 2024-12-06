const { Given, When, Then } = require("@cucumber/cucumber");
const { chromium } = require("playwright");

let browser, page;

Given("I am on the {string}", async function (string) {
  // Initialize browser and navigate to the page
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto(string); 
});

When("I enter the keyword {string}", async function (keyword) {
  // Fill the input field with the keyword
  await page.fill('[data-testid="keyword-input"]', keyword);
});

When("I press the search button", async function () {
  const inputField = await page.locator('[data-testid="keyword-input"]');
  await inputField.press("Enter");
  await page.waitForNavigation();
});

Then("I should see keyword analysis result", async function () {
  // Check if the keyword analysis result is visible
  const result = await page.locator('[data-testid="analysis-result"]');
  await result.waitFor({ state: "visible" });
});

// After hook to close the browser after each scenario
const { After } = require("@cucumber/cucumber");

After(async function () {
  if (browser) {
    await browser.close();
  }
});
