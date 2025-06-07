const { defineConfig } = require('cypress');
const setupPlugins = require('./tests/e2e/plugins/index.js');

module.exports = defineConfig({
  env: {
    VITE_APP_DEFAULT_BACKEND_API_URL: 'https://api.pedrohsalmeida.com',
  },
  projectId: 'ppii7n',
  fixturesFolder: 'tests/e2e/fixtures',
  screenshotsFolder: 'tests/e2e/screenshots',
  videosFolder: 'tests/e2e/videos',
  e2e: {
    baseUrl: 'http://localhost:8081',
    specPattern: 'tests/e2e/specs/**/*.{js,jsx,ts,tsx}',
    supportFile: 'tests/e2e/support/index.js',

    setupNodeEvents(on, config) {
      return setupPlugins(on, config);
    },
  },
});
