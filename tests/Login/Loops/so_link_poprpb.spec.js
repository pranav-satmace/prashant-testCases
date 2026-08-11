import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://test-vartul.satmace.com/login/');
  await page.locator('#id_username').click();
  await page.locator('#id_username').fill('Prashant@satmace.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Satma@201');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto('https://test-vartul.satmace.com/app/');

  // Loop 1000 times
  for (let i = 1; i <= 1000; i++) {
    // Generate bill number with padding (e.g., Test bil 001, Test bil 002, ...)
    const billNumber = `POPRPB1 ${String(i).padStart(3, '0')}`;
    
    // Print progress to console
    console.log(`✅ Loop ${i}/1000 completed - Bill Number: ${billNumber}`);

  await page.getByRole('link', { name: 'Purchase Order' }).click();
  await page.getByRole('link', { name: 'Create Purchase Order' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Search warehouse' }).click();
  await page.getByText('Panvel Collection Warehouse Mumbai Warehouse Gujrat Warehouse Goa Warehouse').click();
  await page.getByRole('button', { name: 'Goa Warehouse' }).click();
  await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
  await page.getByRole('button', { name: 'Search currency' }).click();
  await page.getByRole('option', { name: 'INR' }).click();
  await page.getByRole('button', { name: 'Search partner' }).click();
  await page.getByRole('textbox', { name: 'Search Trade Partner…' }).fill('shan');
  await page.getByRole('option', { name: 'Shant', exact: true }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Add Line Item' }).click();
  await page.getByRole('button', { name: 'Select BIN — Select SKU' }).click();
  await page.getByRole('button', { name: 'Search BIN…' }).click();
  await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
  await page.getByRole('button', { name: 'Search SKU…' }).click();
  await page.getByRole('textbox', { name: 'Search Select SKU…' }).fill('bale');
  await page.getByRole('option', { name: 'Bale B | Test01 | Bale' }).click();
  await page.getByRole('button', { name: 'Save' }).nth(2).click();
  await page.locator('input[name="quantity"]').click();
  await page.locator('input[name="quantity"]').fill('100');
  await page.locator('input[name="rate"]').click();
  await page.locator('input[name="rate"]').fill('10');
  await page.getByRole('button', { name: 'Search tax group' }).click();
  await page.getByRole('option', { name: 'Gst 12%' }).click();
  await page.getByRole('button', { name: 'Save' }).first().click();
   await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Add Line Item' }).click();
  await page.getByRole('button', { name: 'QR BIN — Select SKU' }).click();
  await page.getByRole('button', { name: 'Search SKU…' }).click();
  await page.getByRole('textbox', { name: 'Search Select SKU…' }).fill('bale');
  await page.getByRole('option', { name: 'Bale L | Test01 | Loose' }).click();
  await page.getByRole('button', { name: 'Save' }).nth(3).click();
  await page.getByRole('textbox', { name: '0.0000' }).nth(2).click();
  await page.getByRole('textbox', { name: '0.0000' }).nth(2).fill('200');
  await page.getByRole('textbox', { name: '0.0000' }).nth(3).click();
  await page.getByRole('textbox', { name: '0.0000' }).nth(3).fill('20');
  await page.getByRole('button', { name: 'Search tax group' }).click();
  await page.getByRole('option', { name: 'Gst 12%' }).click();
  await page.getByRole('button', { name: 'Save' }).nth(1).click();
  await page.waitForTimeout(3000);
  await page.getByText('Disclose Rate').click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Save' }).nth(2).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Transform to Receipt' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Transform to Bill' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Bill Number' }).click();
  await page.getByRole('textbox', { name: 'Bill Number' }).fill(billNumber);
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Save' }).nth(2).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Approve' }).click();

   await page.waitForTimeout(1000);
    
    // Print completion status
    console.log(`✅ Loop ${i}/1000 completed successfully - Bill: ${billNumber}`);
  }
  
  console.log('🎉 All 1000 iterations completed successfully!');
});

