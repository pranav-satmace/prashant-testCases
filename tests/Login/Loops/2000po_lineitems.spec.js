import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://test-vartul.satmace.com/login/');
  await page.locator('#id_username').fill('Prashant@satmace.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Satma@201');
  await page.locator('#password-toggle').click();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto('https://test-vartul.satmace.com/app/');
  await page.getByRole('link', { name: 'Purchase Order' }).click();
  await page.getByRole('link', { name: 'Create Purchase Order' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Search warehouse' }).click();
  await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
  await page.getByRole('button', { name: 'Search currency' }).click();
  await page.getByRole('option', { name: 'INR' }).click();
  await page.getByRole('button', { name: 'Search partner' }).click();
  await page.getByRole('option', { name: 'Shant' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Add Line Item' }).click();
  await page.getByRole('button', { name: 'Select BIN — Select SKU' }).click();
  await page.getByRole('button', { name: 'Search BIN…' }).click();
  await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
  await page.getByRole('button', { name: 'Search SKU…' }).click();
  await page.getByRole('option', { name: 'Bale B | Test01 | Bale' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Save' }).nth(2).click();
  await page.locator('input[name="quantity"]').click();
  await page.locator('input[name="quantity"]').fill('100');
  await page.locator('input[name="rate"]').click();
  await page.locator('input[name="rate"]').fill('20');
  await page.getByRole('button', { name: 'Search tax group' }).click();
  await page.getByRole('option', { name: 'Gst 12%' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Save' }).first().click();

  for (let i = 0; i < 2000; i++) {

    if (i > 1 && i % 20 === 0) {
        console.log(`⏳ ${i} items completed. Waiting for 6 seconds...`);
        await page.waitForTimeout(6000);
    }


  // Click Add Line Item
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Add Line Item' }).click();

  // Select SKU
  await page.getByRole('button', { name: 'QR BIN — Select SKU' }).click();
  await page.getByRole('button', { name: 'Search SKU…' }).click();

  // Alternate SKU
  if (i % 2 === 0) {
    await page.getByRole('option', { name: 'Bale L | Test01 | Loose' }).click();
  } else {
    await page.getByRole('option', { name: 'Bale B | Test01 | Bale' }).click();
  }

  // Save SKU
  await page.getByRole('button', { name: 'Save' }).last().click();

  // Quantity (Always 200)
await page.locator('input[name="quantity"]').last().fill('200');

// Rate (1,2,3,4,5...)
await page.locator('input[name="rate"]').last().fill(String(i + 1));

  // Tax
  await page.getByRole('button', { name: 'Search tax group' }).click();
  await page.getByRole('option', { name: 'Gst 12%' }).click();

  // Save Line Item
  await page.getByRole('button', { name: 'Save' }).nth((await page.getByRole('button', { name: 'Save' }).count()) - 2).click();

  // Terminal Log
  console.log(`✅ Line Item ${i + 1} of 2000 completed`);
}

console.log("🎉 All 2000 Line Items Created Successfully");


  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Save' }).nth(3).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Approve' }).click();
});