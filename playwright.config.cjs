const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  // CI performance experiment: preserve the full suite, test 3 parallel workers.
  // Revert to 2 if memory pressure or flaky tests increase.
  workers: process.env.CI ? 3 : 2,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  reporter: [
    ...(process.env.CI ? [['github']] : []),
    ['list'],
    ['html', { open: 'never' }],
  ],
  use: {
    baseURL: 'http://127.0.0.1:8765',
    browserName: 'chromium',
    // Exercise media APIs in full Chromium's current headless mode.
    channel: 'chromium',
    trace: 'retain-on-failure',
    launchOptions: {
      ...(process.env.BROWSER_EXECUTABLE_PATH ? { executablePath: process.env.BROWSER_EXECUTABLE_PATH } : {}),
      args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'],
    },
  },
  webServer: {
    command: 'python3 review/static_range_server.py 8765',
    url: 'http://127.0.0.1:8765',
    reuseExistingServer: false,
    timeout: 10000,
  },
});
