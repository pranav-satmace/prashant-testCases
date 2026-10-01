//npx playwright test tests/Login/sale_dispatch_100_so.spec.js --project=chromium --headed
import { test, expect } from '@playwright/test';

test('Sales Dispatch - Select Available Sales Orders', async ({ page }) => {

  // Login
  await page.goto('https://test-vartul.satmace.com/login/');
  await page.locator('#id_username').fill('Prashant@satmace.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Satma@201');
  await page.getByRole('button', { name: 'Login' }).click();

  // Open Sales Dispatch
  await page.goto('https://test-vartul.satmace.com/app/');
  await page.getByRole('link', { name: 'Sales Dispatch' }).click();
  await page.getByRole('link', { name: 'Create Sales Dispatch' }).click();

  await page.waitForTimeout(3000);

  // Warehouse
  await page.getByRole('button', { name: 'Search warehouse' }).click();
  await page.getByRole('option', {
    name: 'Panvel Collection Warehouse',
    exact: true
  }).click();

  // Trade Partner
  await page.getByRole('button', { name: 'Search Trade Partner' }).click();
  await page.getByRole('textbox', {
    name: 'Search Trade Partner…'
  }).fill('shan');
  await page.getByRole('option', {
    name: 'Shant',
    exact: true
  }).click();

  // Mode
  await page.getByRole('button', { name: 'Search mode' }).click();
  await page.getByRole('option', { name: 'Ship' }).click();

  // Open Search
  await page.getByText('Search and select sales orders').click();

  const searchBox = page.getByRole('textbox', {
    name: 'Search Sales Orders…'
  });

  // previous 100 numbers next(5981 to 5882) next (5881 to 5782)
  for (let orderNo = 6081; orderNo >= 5982; orderNo--) {

    console.log(`Searching Sales Order: ${orderNo}`);

    await searchBox.fill('');
    await searchBox.fill(orderNo.toString());

    await page.waitForTimeout(1000);

    try {
      const option = page.getByRole('option', {
        name: orderNo.toString(),
        exact: true
      });

      await option.waitFor({ state: 'visible', timeout: 1500 });
      await option.click();

      console.log(`✅ Selected: ${orderNo}`);

      // Prepare for next search
      await searchBox.click();

    } catch (error) {

      console.log(`❌ Sales Order ${orderNo} not found. Skipping...`);

      // Clear search and continue
      await searchBox.fill('');
      continue;
    }
  }

  console.log("Completed.");

  await page.locator('.mt-8').click();
  await page.getByRole('button', { name: 'Save' }).click();

});