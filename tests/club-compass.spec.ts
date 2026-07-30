import { test, expect } from '@playwright/test';

import { LandingPage } from './pages/LandingPage';
import { ClubsPage } from './pages/ClubsPage';
import { ClubDetailsPage } from './pages/ClubDetailsPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ClubAdminPage } from './pages/ClubAdminPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

test('landing page is available', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.verifyDisplayed();
});

test('browse clubs page is available', async ({ page }) => {
  const clubsPage = new ClubsPage(page);

  await clubsPage.goto();
  await clubsPage.verifyDisplayed();
});

test('view club page is available', async ({ page }) => {
  const clubDetailsPage = new ClubDetailsPage(page);

  await clubDetailsPage.goto();
  await clubDetailsPage.verifyDisplayed();
});

test('user can sign up', async ({ page }) => {
  const signupPage = new SignupPage(page);

  const email = `student${Date.now()}@manoa.edu`;

  await signupPage.goto();
  await signupPage.signup(email);
});

test('student can sign in', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login(
    'student@manoa.edu',
    'changeme'
  );

  await expect(page).toHaveURL('/');
});

test('student cannot access Club Admin or Admin Dashboard', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login(
    'student@manoa.edu',
    'changeme'
  );

  await page.goto('/club-admin');
  await expect(page).toHaveURL('/not-authorized');

  await page.goto('/admin-dashboard');
  await expect(page).toHaveURL('/not-authorized');
});

test('Club Admin can access club admin page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const clubAdminPage = new ClubAdminPage(page);

  await loginPage.login(
    'clubadmin@manoa.edu',
    'changeme'
  );

  await clubAdminPage.goto();
  await clubAdminPage.verifyDisplayed();
});

test('Super Admin can access admin dashboard', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const adminDashboardPage = new AdminDashboardPage(page);

  await loginPage.login(
    'superadmin@manoa.edu',
    'changeme'
  );

  await adminDashboardPage.goto();
  await adminDashboardPage.verifyDisplayed();
});