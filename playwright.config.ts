import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  /* 🎯 CONFIGURATION UNIQUE ET FUSIONNÉE */
  use: {
    testIdAttribute: 'data-test',

    /* Base URL pour éviter de taper l'adresse complète à chaque fois */
    baseURL: 'https://saucedemo.com',

    /* 🧠 Le débuggage intelligent */
    // 🔍 Options : 'on', 'off', 'on-first-retry', 'retain-on-failure'
    trace: 'on', 
    
    // Tu peux aussi ajouter les captures d'écran et vidéos ici
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    /* 🐢 Le mode ralenti pour éviter les erreurs 429 et voir ce qui se passe */
    launchOptions: {
      slowMo: 500, 
    },
  },

  /* 🌐 Configuration des navigateurs */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});