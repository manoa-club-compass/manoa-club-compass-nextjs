import { expect, Page } from '@playwright/test';

export class ClubsPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/clubs');
  }

  async verifyDisplayed() {
    await expect(
      this.page.getByRole('heading')
    ).toBeVisible();
  }
}