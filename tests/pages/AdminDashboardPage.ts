import { expect, type Page } from '@playwright/test';

export class AdminDashboardPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/admin-dashboard');
  }

  async verifyDisplayed() {
    await expect(
      this.page.getByRole('heading', { name: 'Admin dashboard' })
    ).toBeVisible();
  }
}