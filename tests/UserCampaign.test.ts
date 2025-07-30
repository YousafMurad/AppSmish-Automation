import {test, expect} from '@playwright/test'
import {assertCampaignElements, assertDashboard, login, logout} from '../global.calls'

test('Create a new campaign', async ({page}) => {
    await login(page);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(400);
    await assertDashboard(page);
    await page.waitForTimeout(500);
    await page.getByRole('link', { name: 'My Campaigns My Campaigns' }).click();
    await assertCampaignElements(page);
    await page.getByText('Create New Campaign').click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Create a Campaign Title' })).toBeVisible();
    await page.getByPlaceholder('Enter Title here....').fill('Test01 QA');
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForTimeout(1000);
    await page.getByText('SampleSample Text Message').click();
    await page.waitForTimeout(1000);
    await page.getByRole('dialog').getByRole('button', { name: 'Continue' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForTimeout(1000);
    await page.locator('.ant-picker-input').first().click();
    await page.getByText('Today').click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Select Time').click();
    await page.getByText('Now').click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForTimeout(1000);
    await expect(page.getByRole('heading', { name: 'Successfully Created!' })).toBeVisible();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Overview' }).click();
    await page.waitForTimeout(1000);
    await page.getByText('View All').first().click();
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Search user....').fill('Test01 QA');
    await page.getByRole('button', { name: 'search' }).click();
    await page.waitForTimeout(1000);
    await expect(page.getByRole('cell', { name: 'Test01 QA' })).toBeVisible();
});

test('Delete an existing campaign', async ({page}) => {
    await login(page);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(400);
    await assertDashboard(page);
    await page.waitForTimeout(500);
    await page.getByRole('link', { name: 'My Campaigns My Campaigns' }).click();
    await assertCampaignElements(page);
    await expect(page.getByRole('columnheader', { name: 'Campaign Name' })).toBeVisible();
    await page.getByPlaceholder('Search user....').click();
    await page.getByPlaceholder('Search user....').fill('Test01 QA');
    await page.getByRole('button', { name: 'search' }).click();
    await page.waitForTimeout(1000);
    if(await page.getByRole('img', { name: 'Delete' }).isVisible()){
        await page.getByRole('img', { name: 'Delete' }).click();
    }
    else if(await page.getByRole('img', { name: 'Delete' }).first().isVisible()){
        await page.getByRole('img', { name: 'Delete' }).first().click();
    }
    else if(await page.getByRole('img', { name: 'Delete' }).nth(1).isVisible()){
        await page.getByRole('img', { name: 'Delete' }).nth(1).click();
    }
    else{
        await page.getByRole('img', { name: 'Delete' }).nth(2).click();
    }
    await page.waitForTimeout(1000);
    await expect(page.getByText('Do you want to delete this')).toBeVisible();
    await page.getByRole('button', { name: 'Yes' }).click();
    await expect(page.getByText('Your campaign has been deleted')).toBeVisible();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByPlaceholder('Search user....').click();
    await page.getByPlaceholder('Search user....').fill('Test01 QA');
    await page.getByRole('button', { name: 'search' }).click();
    await page.waitForTimeout(1000);
    await expect(page.getByRole('cell', { name: 'No data No data' })).toBeVisible();
});