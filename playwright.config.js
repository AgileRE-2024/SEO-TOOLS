const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./", // Direktori pengujian
  timeout: 30 * 100000, // Timeout per pengujian
  retries: 1, // Ulangi sekali jika gagal
  use: {
    baseURL: "http://localhost:3000", // URL aplikasi Next.js
    headless: true, // Headless mode
  },
});
