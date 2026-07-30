import { expect, Page } from '@playwright/test';

export class SignupPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/auth/signup');
  }

  async signup(email: string) {
    await this.page
      .locator('input[name="email"]')
      .fill(email);

    await this.page
      .locator('input[name="password"]')
      .fill('changeme');

    await this.page
      .locator('input[name="confirmPassword"]')
      .fill('changeme');

    await this.page
      .getByRole('button', { name: 'Register' })
      .click();

    await expect(this.page).toHaveURL('/');
  }
}