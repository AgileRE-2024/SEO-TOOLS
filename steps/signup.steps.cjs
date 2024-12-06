const { Given, When, Then } = require("@cucumber/cucumber");
const { chromium } = require("playwright");

let browser, page;

// Given I am on the sign-up page
Given("I am on the sign-up page", async function () {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto("http://localhost:3000/signup");
});

// When I enter a valid username, email, and password
When("I enter a valid username, email, and password", async function () {
  await page.fill('[data-testid="name-input"]', "validusername");
  await page.fill('[data-testid="email-input"]', "valid@example12.com");
  await page.fill('[data-testid="password-input"]', "validpassword");
});

// And I confirm the password correctly
When("I confirm the password correctly", async function () {
  await page.fill('[data-testid="confirm-input"]', "validpassword");
});

// And I submit the sign-up form
When("I submit the sign-up form", async function () {
  await page.click('[data-testid="submit"]');
});

// Then I should be redirected to the login page
Then("I should be redirected to the login page", async function () {
  await page.waitForNavigation();
  if (!page.url().includes("/login")) {
    throw new Error("Failed to sign up");
  }
});

// When I enter a registered email
When("I enter a registered email", async function () {
  await page.fill('[data-testid="name-input"]', "validusername");
  await page.fill('[data-testid="email-input"]', "validexample12@gmail.com");
  await page.fill('[data-testid="password-input"]', "validpassword");
  await page.fill('[data-testid="confirm-input"]', "validpassword");
});

// Then I should see an error message indicating that the email is registered
Then(
  "I should see an error message indicating that the email is registered",
  async function () {
    const errorMessage = await page.locator(
      '[data-testid="error-message"]'
    );
    await errorMessage.waitFor({ state: "visible" });
  }
);

// When I enter mismatched passwords
When("I enter mismatched passwords", async function () {
  await page.fill('[data-testid="name-input"]', "validusername");
  await page.fill('[data-testid="email-input"]', "zvistyt2@gmail.com");
  await page.fill('[data-testid="password-input"]', "password123");
  await page.fill('[data-testid="confirm-input"]', "password456");
});

// Then I should see an error message indicating that the passwords do not match
Then(
  "I should see an error message indicating that the passwords do not match",
  async function () {
    const errorMessage = await page.locator('[data-testid="error-message"]');

    await errorMessage.waitFor({ state: "visible" });
  }
);

// When I enter a password with less than 6 characters
When("I enter a password with less than 6 characters", async function () {
  await page.fill('[data-testid="name-input"]', "validusername");
  await page.fill('[data-testid="email-input"]', "zvistyt4@gmail.com");
  await page.fill('[data-testid="password-input"]', "12345");
  await page.fill('[data-testid="confirm-input"]', "12345");
});

// Then I should see an error message indicating that the password is too short
Then(
  "I should see an error message indicating that the password is too short",
  async function () {
    const errorMessage = await page.locator('[data-testid="error-message"]');

    await errorMessage.waitFor({ state: "visible" });
  }
);
