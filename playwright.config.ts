import { Metadata, defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */const githubContext = JSON.parse(process.env.GITHUB_CONTEXT || '{}');
 console.log('value '+process.env.GITHUB_CONTEXT)
let metadata: Metadata = {}
if(githubContext.sha){
      metadata = {
        'revision.id': '29b089721f5363a33b116cd8f989f471902e575f',
        'revision.author': 'thananauto',
        'revision.email': 'thananjayan1988@gmail.com',
        'revision.subject': 'Updated code',
        'revision.timestamp': '2024-12-27T07:36:01Z',
        'revision.link': 'https://api.github.com/repos/thananauto/playwright-tips-tricks/commits{/sha}',
        'ci.link': 'https://github.com/microsoft/playwright/actions/workflows/tests_primary.yml',
        'timestamp': '4:02:04 PM'
       }
}

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Github meta data */
  metadata: metadata , 
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    browserName: 'chromium'
  
  },

  /* Configure projects for major browsers */
  projects: [
  
    {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      }
  

   // {
   //   name: 'firefox',
   //   use: { ...devices['Desktop Firefox'] },
  //  },

   // {
    //  name: 'webkit',
  //    use: { ...devices['Desktop Safari'] },
   // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run mock-data',
    url: 'http://localhost:3001',
   reuseExistingServer: !process.env.CI,
   timeout: 60000 * 3
  },
});
