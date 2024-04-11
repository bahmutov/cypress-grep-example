const { defineConfig } = require('cypress')

module.exports = defineConfig({
  fixturesFolder: false,
  video: false,
  env: {
    grepFilterSpecs: true,
    grepOmitFiltered: true,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // optional: register cy-grep plugin code
      // https://github.com/bahmutov/cy-grep
      require('@bahmutov/cy-grep/src/plugin')(config)

      console.log('grep tags if any', config.env)
      // if the user passed grepTags using CYPRESS_grepTags=...
      // or --env grepTags=... then we can use it
      // to set the baseUrl to something else
      // In this example, if the user passed @smoke tag
      // then set the baseUrl to "https://staging.todomvc.com"
      if (config.env.grepTags?.includes('@smoke')) {
        console.log('running smoke tests against staging')
        config.baseUrl = 'https://staging.todomvc.com'
      }

      // IMPORTANT:
      // make sure to return the config object
      // as it might have been modified by the plugin
      return config
    },
    // default base url
    baseUrl: 'http://localhost:8888',
    specPattern: 'cypress/e2e/**/*spec.js',
  },
})
