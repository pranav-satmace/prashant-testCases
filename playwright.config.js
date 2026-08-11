// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // ✅ Terminal + HTML दोन्ही ठिकाणी दिसण्यासाठी 'list' add केला, 'html' तसाच ठेवला
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],

  // ✅ हे add केले - 1000 loop साठी unlimited timeout
  timeout: 0,

  use: {
    trace: 'on-first-retry',
    actionTimeout: 30000,
    navigationTimeout: 60000,

    // ✅ fail झालेल्या test चा exact problem HTML report मध्ये दिसण्यासाठी add केले
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});