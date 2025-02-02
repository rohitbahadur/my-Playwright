const { defineConfig, devices } = require('@playwright/test');
const dotenv = require( 'dotenv' );
const path = require( 'path' );
// Read login from ".env" file.
require( 'dotenv' ).config( { path: path.resolve( __dirname, '.env' ) } );
// Read from ".env" file.
dotenv.config( { path: path.resolve( __dirname, '.env' ) } );


export default defineConfig( {
  use: {
    baseURL: process.env.STAGING === '1' ? 'https://stmate.on-geo.de/' : 'https://stmate.on-geo.de/',
  }
} );

module.exports = defineConfig({
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
    /* Base URL to use in actions like `await page.goto('/')`. */
    //baseURL: 'https://stmate.on-geo.de/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    launchOptions: {
       slowMo: 1_000,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

