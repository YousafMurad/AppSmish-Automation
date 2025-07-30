import { expect } from '@playwright/test';

export async function login(page: any) {
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
};
export async function logout(page: any){
await page.getByText('LogOut').click();
}

export async function assertDashboard(page: any){
    await expect(page.getByText('Create New Campaign')).toBeVisible();
    await expect(page.getByText('Phishing Simulation Campaigns')).toBeVisible();
    await page.waitForTimeout(400);
    await expect(page.getByRole('link', { name: 'Overview Overview' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'My Campaigns My Campaigns' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Target Users Target Users' })).toBeVisible();
    await page.waitForTimeout(400);
    await expect(page.getByText('My Organization')).toBeVisible();
    await expect(page.getByText('Individual Users')).toBeVisible();
    await expect(page.getByText('LogOut')).toBeVisible();
}

export async function assertUserPage(page: any){
    await expect(page.getByText('Target Users').nth(1)).toBeVisible();
   await expect(page.getByText('Import User')).toBeVisible();
   await expect(page.getByText('New User')).toBeVisible();
   await expect(page.getByText('Groups')).toBeVisible();
}

export async function assertCampaignElements(page: any){
    await expect(page.getByText('My Campaigns').nth(1)).toBeVisible();
    await expect(page.getByText('Create New Campaign')).toBeVisible();
    await expect(page.getByText('User Who Clicked').first()).toBeVisible();
    await expect(page.getByText('Users Clicked', { exact: true })).toBeVisible();
    await expect(page.getByText('Phishing Simulation Campaigns')).toBeVisible();
}