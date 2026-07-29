import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://test-vartul.satmace.com/login/');
  await page.locator('#id_username').click();
  await page.locator('#id_username').fill('Prashant@satmace.com');
  await page.locator('#id_username').press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('Satma@201');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Loop 1000 times
  for (let i = 1; i <= 1000; i++) {
    // Generate bill number with padding (e.g., Test bil 001, Test bil 002, ...)
    const billNumber = `Test bl ${String(i).padStart(3, '0')}`;
    
    // Print progress to console
    console.log(`✅ Loop ${i}/1000 completed - Bill Number: ${billNumber}`);
    
    await page.waitForTimeout(3000);
    await page.getByRole('link', { name: 'Purchase Order' }).click();
    await page.getByRole('link', { name: 'Create Purchase Order' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
    await page.getByRole('button', { name: 'Search currency' }).click();
    await page.getByRole('option', { name: 'INR' }).click();
    await page.getByRole('button', { name: 'Search partner' }).click();
    await page.getByRole('option', { name: 'Mane' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Add Line Item' }).click();
    await page.getByRole('button', { name: 'Select BIN — Select SKU' }).click();
    await page.getByRole('button', { name: 'Search BIN…' }).click();
    await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
    await page.getByRole('button', { name: 'Search SKU…' }).click();
    await page.getByRole('textbox', { name: 'Search Select SKU…' }).fill('test');
    await page.getByRole('option', { name: 'Dual Test 1 | Test01 | Loose' }).click();
    await page.getByRole('button', { name: 'Save' }).nth(2).click();
    await page.locator('input[name="quantity"]').click();
    await page.locator('input[name="quantity"]').fill('10');
    await page.locator('input[name="secondary_quantity"]').click();
    await page.locator('input[name="secondary_quantity"]').fill('1000');
    await page.locator('input[name="rate"]').click();
    await page.locator('input[name="rate"]').fill('10');
    await page.getByRole('button', { name: 'Search tax group' }).click();
    await page.getByRole('option', { name: 'GST 18%' }).click();
    await page.getByRole('button', { name: 'Save' }).first().click();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Add Line Item' }).click();
    await page.getByRole('button', { name: 'QR BIN — Select SKU' }).click();
    await page.getByRole('button', { name: 'Search SKU…' }).click();
    await page.getByRole('option', { name: 'Pani | Glass | Loose' }).click();
    await page.getByRole('button', { name: 'Save' }).nth(3).click();
    await page.getByRole('textbox', { name: '0.0000' }).nth(3).click();
    await page.getByRole('textbox', { name: '0.0000' }).nth(3).fill('200');
    await page.getByRole('textbox', { name: '0.0000' }).nth(4).click();
    await page.getByRole('textbox', { name: '0.0000' }).nth(4).fill('20');
    await page.getByRole('button', { name: 'Save' }).nth(1).click();
    await page.getByRole('button', { name: 'Save' }).nth(2).click();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Approve' }).click();
    await page.getByRole('button', { name: 'Transform to Receipt' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Approve' }).click();
    await page.getByRole('button', { name: 'Transform to Bill' }).click();
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.getByRole('textbox', { name: 'Bill Number' }).click();
    
    // Use dynamic bill number
    await page.getByRole('textbox', { name: 'Bill Number' }).fill(billNumber);
    
    await page.getByRole('button', { name: 'Save' }).nth(2).click();
    await page.getByRole('button', { name: 'Approve' }).click();
    
    // Optional: Add a small delay between iterations
    await page.waitForTimeout(1000);
    
    // Print completion status
    console.log(`✅ Loop ${i}/1000 completed successfully - Bill: ${billNumber}`);
  }
  
  console.log('🎉 All 1000 iterations completed successfully!');
});