import { expect, test } from '@playwright/test';

test('navigates from home to about', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Angular Starter' })).toBeVisible();

  await page.getByRole('navigation').getByRole('link', { name: 'About' }).click();
  await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();
});
