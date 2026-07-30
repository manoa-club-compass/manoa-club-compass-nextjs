import { expect, Page } from '@playwright/test';

export class ClubDetailsPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/club-details');
  }

  async verifyDisplayed() {
    await expect(
      this.page.getByRole('heading')
    ).toBeVisible();
  }
}