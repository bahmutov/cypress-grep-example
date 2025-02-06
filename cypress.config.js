const { defineConfig } = require('cypress')

module.exports = defineConfig({
  fixturesFolder: false,
  projectId: '4agux9',
  video: false,
  defaultBrowser: 'electron',
  env: {
    grepFilterSpecs: true,
    grepOmitFiltered: true,
  },
  e2e: {
    experimentalRunAllSpecs: true,
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // optional: register cy-grep plugin code
      // https://github.com/bahmutov/cy-grep
      require('@bahmutov/cy-grep/src/plugin')(config)

      // make sure to return the config object
      // as it might have been modified by the plugin
      return config
    },
    baseUrl: 'http://localhost:8888',
    specPattern: 'cypress/e2e/**/*spec.js',
  },
})
