import { expect, type Page } from '@playwright/test';

export class ClubAdminPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/club-admin');
  }

  async verifyDisplayed() {
    await expect(
      this.page.getByRole('heading', { name: 'Club admin' })
    ).toBeVisible();
  }
}