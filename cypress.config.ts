import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '3ii7oe',
  e2e: {
    experimentalStudio: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
