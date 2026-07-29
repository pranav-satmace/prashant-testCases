import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://test-vartul.satmace.com/login/');
  await page.locator('#id_username').click();
  await page.locator('#id_username').click();
  await page.locator('#id_username').fill('Prashant@satmace.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Satma@201');
  await page.getByRole('button', { name: 'Login' }).click();

  for (let i = 1; i <= 1000; i++) {

  await page.waitForTimeout(3000);
  await page.getByRole('link', { name: 'Purchase Order' }).click();
  await page.getByRole('link', { name: 'Create Purchase Order' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Search warehouse' }).click();
  await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
  await page.getByRole('button', { name: 'Search currency' }).click();
  await page.getByRole('option', { name: 'INR' }).click();
  await page.getByRole('button', { name: 'Search partner' }).click();
  await page.getByRole('option', { name: 'Shant', exact: true }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Add Line Item' }).click();
  await page.getByRole('button', { name: 'Select BIN — Select SKU' }).click();
  await page.getByRole('button', { name: 'Search BIN…' }).click();
  await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
  await page.getByRole('button', { name: 'Search SKU…' }).click();
  await page.getByRole('option', { name: 'Bale B | Test01 | Bale' }).click();
  await page.getByRole('button', { name: 'Save' }).nth(2).click();
  await page.locator('input[name="quantity"]').click();
  await page.locator('input[name="quantity"]').fill('100');
  await page.locator('input[name="rate"]').click();
  await page.locator('input[name="rate"]').fill('10');
  await page.getByRole('button', { name: 'Search tax group' }).click();
  await page.getByRole('option', { name: 'Gst 12%' }).click();
  await page.getByRole('button', { name: 'Save' }).first().click();
  await page.getByText('Tolerance AllowanceOther').click();
  await page.getByRole('button', { name: 'Save' }).nth(1).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Approve' }).click();

  // Print completion status
//     console.log(`✅ Loop ${i}/1000 completed successfully - Bill: ${billNumber}`);
  
  
  console.log(`✅ Purchase Order ${i} Created Successfully`);
    }

    console.log('🎉 All 1000 Purchase Orders Created Successfully');

});