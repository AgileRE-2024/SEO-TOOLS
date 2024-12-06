const { chromium } = require("playwright");

let browser, page;

async function setupBrowser() {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();
}

async function closeBrowser() {
  if (browser) {
    await browser.close();
  }
}

module.exports = { setupBrowser, closeBrowser, getPage: () => page };
