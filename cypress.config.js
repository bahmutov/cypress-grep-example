const { defineConfig } = require('cypress')
// valid tags should be an array of strings, like "@smoke", "@new-todo", etc
const { ValidTestTags } = require('./cypress/support/test-tags')

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
      if (config.env.grepTags) {
        console.log('checking the test tags "%s"', config.env.grepTags)
        const split = config.env.grepTags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => ValidTestTags.includes(tag))
        console.log('valid tags "%s"', split.join(','))
        config.env.grepTags = split.join(',')
      }

      // https://github.com/bahmutov/cy-grep
      require('@bahmutov/cy-grep/src/plugin')(config)

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
