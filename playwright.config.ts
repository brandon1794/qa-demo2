import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    testIdAttribute: 'data-qa',
  },

  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 10000,
  },

  // Folder for test artifacts such as screenshots, videos, traces, etc.
  outputDir: 'test-results',

  // Each test is given 30 seconds.
  timeout: 60000,

  /* Configure project for major browser */
  projects: [

    /* Test against desktop browsers */
    // {
    //   name: 'chromium',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     baseURL: 'https://automationexercise.com/',
    //     headless: true,
    //   },
    // },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'https://automationexercise.com/',
        headless: true,
      },
    },
  ],
});
