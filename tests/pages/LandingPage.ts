import { expect, Page } from '@playwright/test';

export class LandingPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async verifyDisplayed() {
    await expect(
      this.page.getByRole('heading', {
        name: 'Find your place at Mānoa.',
      })
    ).toBeVisible();

    await expect(
      this.page.getByRole('link', {
        name: 'Browse clubs',
      })
    ).toHaveAttribute('href', '/clubs');
  }
}