import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.PLAYWRIGHT_WORKERS ? parseInt(process.env.PLAYWRIGHT_WORKERS) : undefined,
  reporter: [
    ['html'],
    ['allure-playwright', { outputFolder: 'allure-results' }]  // Enable Allure reporting
  ],
  use: {
    trace: 'on-first-retry',  // Capture trace when retrying
    testIdAttribute: 'data-qa',
    baseURL: 'https://automationexercise.com/',  // Base URL for API and web
    headless: process.env.HEADLESS === 'false',
    screenshot: 'only-on-failure',  // Capture screenshots on test failure
    video: 'retain-on-failure',  // Record video on test failure
  },
  expect: {
    timeout: 10000,
  },
  outputDir: 'test-results',
  timeout: 60000,

  /* Configure projects for multiple browsers and devices */
  projects: [
    // Desktop Browsers
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://automationexercise.com/',
        headless: process.env.HEADLESS === 'false',
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: process.env.BASE_URL || 'https://automationexercise.com/',
        headless: process.env.HEADLESS === 'false',
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        baseURL: process.env.BASE_URL || 'https://automationexercise.com/',
        headless: process.env.HEADLESS === 'false',
      },
    },

    // Mobile Browsers
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
        baseURL: process.env.BASE_URL || 'https://automationexercise.com/',
        headless: process.env.HEADLESS === 'false',
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12'],
        baseURL: process.env.BASE_URL || 'https://automationexercise.com/',
        headless: process.env.HEADLESS === 'false',
      },
    },

    // API Project for API Testing
    {
      name: 'api',
      use: {
        baseURL: process.env.API_BASE_URL || 'https://automationexercise.com/',  // API Base URL
        extraHTTPHeaders: {
          'Content-Type': 'application/json'
        },
        headless: true,  // Since this is for API testing, we don't need UI interactions
      }
    }
  ],

  /* Add custom annotations such as environment, browser type, test description, and Jira links */
  metadata: {
    browser: process.env.BROWSER || 'chromium',  // Set browser type via environment variable
    environment: process.env.ENV || 'staging',  // Define test environment
    testDescription: 'This suite tests the functionality of the e-commerce website',
    jiraLink: 'https://jira.example.com/browse/PROJECT-123',  // Add Jira link to test cases
  },
});
