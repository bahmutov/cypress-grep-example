const { defineConfig } = require('cypress')

module.exports = defineConfig({
  fixturesFolder: false,
  projectId: '4agux9',
  video: false,
  env: {
    grepFilterSpecs: true,
    grepOmitFiltered: true,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:8888',
    specPattern: 'cypress/e2e/**/*spec.js',
  },
})
