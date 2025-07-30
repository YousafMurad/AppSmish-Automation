import { test, expect } from '@playwright/test';
import { logout } from '../global.calls';

test('Sign in using correct credentials', async ({ page }) => {
 await page.goto('/');
 await page.waitForLoadState('load');
 await expect(page.getByText('Welcome back!')).toBeVisible();
 await page.waitForTimeout(500);
 await expect(page.getByText('Email Address')).toBeVisible();
 await page.locator('input[type="text"]').click();
 await page.locator('input[type="text"]').fill('greg.bammel@sprwlabs.com');
 await page.waitForTimeout(500);
 await expect(page.getByText('Password')).toBeVisible();
 await page.locator('span').first().click();
 await page.locator('input[type="password"]').fill('4365fgdadsfgfdsA#');
 await page.waitForTimeout(500);
 await page.getByRole('button', { name: 'Login' }).click();
 await expect(page.getByRole('alert')).toBeVisible();
 await page.waitForTimeout(500);
 await logout(page);
});

test('Sign in using wrong credentials', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('load');
  await expect(page.getByText('Welcome back!')).toBeVisible();
  await page.waitForTimeout(500);
  await expect(page.getByText('Email Address')).toBeVisible();
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill('greg.bammel@test.com');
  await page.waitForTimeout(500);
  await expect(page.getByText('Password')).toBeVisible();
  await page.locator('span').first().click();
  await page.locator('input[type="password"]').fill('test123');
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('invalid credentials')).toBeVisible();
});

test('Sign in using correct email but wrong password', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('load');
  await expect(page.getByText('Welcome back!')).toBeVisible();
  await page.waitForTimeout(500);
  await expect(page.getByText('Email Address')).toBeVisible();
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill('greg.bammel@sprwlabs.com');
  await page.waitForTimeout(500);
  await expect(page.getByText('Password')).toBeVisible();
  await page.locator('span').first().click();
  await page.locator('input[type="password"]').fill('test123');
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('invalid credentials')).toBeVisible();
});

test('Sign in using correct password but wrong email', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('load');
  await expect(page.getByText('Welcome back!')).toBeVisible();
  await page.waitForTimeout(500);
  await expect(page.getByText('Email Address')).toBeVisible();
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill('greg.bammel@test.com');
  await page.waitForTimeout(500);
  await expect(page.getByText('Password')).toBeVisible();
  await page.locator('span').first().click();
  await page.locator('input[type="password"]').fill('4365fgdadsfgfdsA#');
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('invalid credentials')).toBeVisible();
});