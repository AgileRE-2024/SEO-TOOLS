const { Given, When, Then } = require("@cucumber/cucumber");
const { chromium } = require("playwright");

let browser, page;

// Given I am on the login page
Given("I am on the login page", async function () {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto("http://localhost:3000/login");
});

// When I enter a valid email and password
When("I enter a valid email and password", async function () {
  await page.fill('[data-testid="email-input"]', "demo@demo.com");
  await page.fill('[data-testid="password-input"]', "aaaaaa");
});

// And I submit the login form
When("I submit the login form", async function () {
  await page.click('[data-testid="submit"]');
});

// Then I should be redirected to the dashboard
Then("I should be redirected to the dashboard", async function () {
  await page.waitForNavigation();
  if (!page.url().includes("/dashboard")) {
    throw new Error("Gagal login dan diarahkan kembali ke /login");
  }
});

When("I enter an invalid email or password", async function () {
  await page.request.post("http://localhost:3000/signout");
  await page.fill('[data-testid="email-input"]', "invalid@demo.com");
  await page.fill('[data-testid="password-input"]', "wrongpassword");
});

// Then I should see an error message indicating authentication failure
Then(
  "I should see an error message indicating authentication failure",
  async function () {
    const errorMessage = await page.locator('[data-testid="error-message"]');
    await errorMessage.waitFor({ state: "visible" });
  }
);
