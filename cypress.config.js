const { defineConfig } = require('cypress')

module.exports = defineConfig({
  env: {
    VITE_APP_DEFAULT_BACKEND_API_URL: 'https://api.pedrohsalmeida.com',
  },
  projectId: 'ppii7n',
  fixturesFolder: 'tests/e2e/fixtures',
  screenshotsFolder: 'tests/e2e/screenshots',
  videosFolder: 'tests/e2e/videos',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./tests/e2e/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:8081',
    specPattern: 'tests/e2e/specs/**/*.{js,jsx,ts,tsx}',
    supportFile: 'tests/e2e/support/index.js',
  },
})
