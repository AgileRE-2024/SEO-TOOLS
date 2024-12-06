const { Given, When, Then } = require("@cucumber/cucumber");
const { chromium } = require("playwright");

let browser, page;

// Given I am on the dashboard
Given("I am on the dashboard", async function () {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();

  // Akses dashboard yang bisa diakses tanpa login
  await page.goto("http://localhost:3000/dashboard");

  // Pastikan berada di halaman dashboard
  const currentURL = page.url();
  if (!currentURL.includes("/dashboard")) {
    throw new Error("Tidak berada di halaman dashboard");
  }
});

// And I am logged in
Given("I am logged in", async function () {
  // Coba akses halaman history langsung
  await page.goto("http://localhost:3000/dashboard/history");

  // Jika diarahkan ke login, lakukan login
  if (page.url().includes("/login")) {
    await page.fill('[data-testid="email-input"]', "demo@demo.com");
    await page.fill('[data-testid="password-input"]', "aaaaaa");
    await page.click('[data-testid="submit"]');
    await page.waitForNavigation();

    // Pastikan sudah login
    if (page.url().includes("/login")) {
      throw new Error("Gagal login dan diarahkan kembali ke /login");
    }
  }
});

// When I navigate to the "History" section
When('I navigate to the "History" section', async function () {
  await page.goto("http://localhost:3000/dashboard/history");

  // Tunggu halaman history atau login muncul
  if (page.url().includes("/login")) {
    await page.fill('[data-testid="email-input"]', "zvistyt@gmail.com");
    await page.fill('[data-testid="password-input"]', "aaaaaa");
    await page.click('[data-testid="login-submit"]');
    await page.waitForNavigation();
    // Pastikan kembali diarahkan ke halaman history
    await page.goto("http://localhost:3000/dashboard/history");
    if (!page.url().includes("/dashboard/history")) {
      throw new Error(
        "Gagal login dan diarahkan kembali ke /dashboard/history"
      );
    }
  } else {
    // Tunggu hingga elemen history terlihat
    await page.waitForSelector('[data-testid="search-history-list"]', {
      state: "visible",
    });
  }
});

// Then I should see a list of my previous keywords
Then("I should see a list of my previous keywords", async function () {
  await page.waitForSelector('[data-testid="search-history-list"]', {
    state: "visible",
  });
});

// And each keyword should show the time it was accessed
Then(
  "each keyword should show the time it was accessed",
  async function () {
    const historyItems = await page.locator(
      '[data-testid="search-history-item"]'
    );
    const itemCount = await historyItems.count();
    for (let i = 0; i < itemCount; i++) {
      const timeElement = await historyItems
        .nth(i)
        .locator('[data-testid="time-accessed"]');
      await timeElement.waitFor({ state: "visible" });
    }
  }
);

// And I have no history
When("I have no history", async function () {
  // Pastikan elemen "No history" muncul
  await page.waitForSelector('[data-testid="no-history-message"]', {
    state: "visible",
  });
});

// Then I should see a message saying "No history available"
Then(
  'I should see a message saying "No history available"',
  async function () {
    const message = await page.locator('[data-testid="no-history-message"]');
    await message.waitFor({ state: "visible" });
  }
);
