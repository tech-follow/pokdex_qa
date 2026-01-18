import { defineConfig, devices } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';
const UI_BASE_URL = process.env.UI_BASE_URL || 'http://localhost:3000';

export default defineConfig({

  projects: [
    {
      name: 'API',
      testDir: 'tests/api',
      use: {
        baseURL: API_BASE_URL
      },
    },
    {
      name: 'UI',
      testDir: 'tests/ui',      
      use: {
        baseURL: UI_BASE_URL,
        browserName: 'chromium',
        headless: false,
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
