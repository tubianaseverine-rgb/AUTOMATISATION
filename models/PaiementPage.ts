import { Page, Locator, expect } from '@playwright/test';

export class PaiementPage {
  readonly page: Page;
  readonly firstnameInput: Locator;
  readonly lastnameInput: Locator;
  readonly postalCodeInput: Locator;

  constructor(page: Page) {
    this.page = page;
    // On utilise les attributs data-test (le top en 2026)
    this.firstnameInput = page.locator('[data-test="firstName"]');
    this.lastnameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(firstname: string, lastname: string, postalcode: string) {
    await this.firstnameInput.fill(firstname);
    await this.lastnameInput.fill(lastname);
    await this.postalCodeInput.fill(postalcode);
  }
}