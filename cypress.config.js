const { defineConfig } = require("cypress");

module.exports = defineConfig({
    fixturesFolder: "cypress/fixture",
  e2e: {
    baseUrl: 'https://consumersenergymanagement.ca/',
    defaultCommandTimeout: 10000,
    experimentalRunAllSpecs: true,
    watchForFileChanges: false,
    uncaughtExceptionHandling: false,
   
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
