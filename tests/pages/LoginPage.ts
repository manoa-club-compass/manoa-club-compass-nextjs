import { expect, type Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/auth/signin');
  }

  async login(email: string, password: string) {
    await this.goto();

    await this.page
      .locator('input[name="email"]')
      .fill(email);

    await this.page
      .locator('input[name="password"]')
      .fill(password);

    await this.page
      .getByRole('button', { name: /signin/i })
      .click();

    await expect(this.page).toHaveURL('/');
  }
}