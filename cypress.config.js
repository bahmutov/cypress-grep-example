const { defineConfig } = require('cypress')

module.exports = defineConfig({
  fixturesFolder: false,
  video: false,
  e2e: {
    env: {
      grepFilterSpecs: true,
      grepOmitFiltered: true,
    },
    setupNodeEvents(on, config) {
      require('@bahmutov/cy-grep/src/plugin')(config)
      // make sure to return the config object
      // as it might have been modified by the plugin
      return config
    },
    baseUrl: 'http://localhost:8888',
    specPattern: 'cypress/e2e/**/*spec.js',
  },
})
