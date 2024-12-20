const { defineConfig } = require('cypress')
// import th array "TestTags" from 'cypress/support/test-tags'
// valid tags should be an array of strings, like "@smoke", "@new-todo", etc
const { TestTags } = require('./cypress/support/test-tags')

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
        // split the tags by comma, trim each tag
        // and filter out invalid tags using the "ValidTestTags" array
        const split = config.env.grepTags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => TestTags.includes(tag))
        // print the remaining validated tags
        console.log('valid tags "%s"', split.join(','))
        // and set the environment variable "config.env.grepTags"
        // to the validated tags string (comma separated)
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
