import { expect, test } from '@playwright/test';

test('counter increments, respects step size, and resets', async ({ page }) => {
  await page.goto('/counter');
  const value = page.locator('.counter__count');

  await expect(value).toHaveText('0');

  await page.getByRole('button', { name: '+', exact: true }).click();
  await expect(value).toHaveText('1');

  await page.getByLabel('Step size').fill('5');
  await page.getByRole('button', { name: '+', exact: true }).click();
  await expect(value).toHaveText('6');

  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(value).toHaveText('0');
});
