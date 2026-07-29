import { expect, test } from '@playwright/test';

// Copy this pattern as Club Compass pages and forms become functional.
test('landing page is available', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Find your place at Mānoa.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Browse clubs' })).toHaveAttribute('href', '/clubs');
});

const signIn = async (page: import('@playwright/test').Page, email: string) => {
  await page.goto('/auth/signin');
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill('changeme');
  await page.getByRole('button', { name: 'Signin' }).click();
  await expect(page).toHaveURL('/');
};

test('student cannot access Club Admin or Super Admin pages', async ({ page }) => {
  await signIn(page, 'student@manoa.edu');

  await expect(page.getByRole('link', { name: 'Club admin' })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Admin dashboard' })).toHaveCount(0);
  await page.goto('/club-admin');
  await expect(page).toHaveURL('/not-authorized');
});

test('Club Admin can access the club admin page only', async ({ page }) => {
  await signIn(page, 'clubadmin@manoa.edu');

  await expect(page.getByRole('link', { name: 'Club admin' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Admin dashboard' })).toHaveCount(0);
  await page.goto('/club-admin');
  await expect(page.getByRole('heading', { name: 'Club admin' })).toBeVisible();
  await page.goto('/admin-dashboard');
  await expect(page).toHaveURL('/not-authorized');
});

test('Super Admin can access both admin pages', async ({ page }) => {
  await signIn(page, 'superadmin@manoa.edu');

  await expect(page.getByRole('link', { name: 'Club admin' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Admin dashboard' })).toBeVisible();
  await page.goto('/admin-dashboard');
  await expect(page.getByRole('heading', { name: 'Admin dashboard' })).toBeVisible();
});
