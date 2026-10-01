//npx playwright test tests/Login/Loops/segregation_100_samelineitem.spec.js --project=chromium --headed
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://test-vartul.satmace.com/login/');
  await page.locator('#id_username').fill('Prashant@satmace.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Satma@201');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('link', { name: 'Segregation' }).click();
  await page.getByRole('link', { name: 'Create Segregation' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Search warehouse' }).click();
  await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
  await page.getByRole('button', { name: 'Save & Continue' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Add Source' }).click();
  await page.getByText('Search and select QR codes').click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Search QR Codes Pool…' }).fill('C7545FFD');
  await page.getByText('QR BIN / Bale B (Bale) /').click();
  
  // First output setup
  await page.getByRole('button', { name: 'Add Output' }).click();
  await page.getByRole('button', { name: 'Select BIN — Select SKU' }).click();
  await page.getByRole('button', { name: 'Search BIN…' }).click();
  await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
  await page.getByRole('button', { name: 'Search SKU…' }).click();
  await page.getByRole('option', { name: 'HD Item 2 | HD | Loose' }).click();
  await page.getByTestId('inventory-selector-save-btn').click();
  await page.waitForTimeout(3000);

  // Loop to add quantities
  for (let qty = 1; qty <= 1000; qty++) {
    // Update quantity
    await page.getByRole('textbox', { name: '0.0000' }).first().click();
    await page.getByRole('textbox', { name: '0.0000' }).first().fill(qty.toString());
    await page.getByRole('button', { name: 'Save' }).nth(1).click();
    
    // Log progress every 100 iterations
    if (qty % 100 === 0) {
      console.log(`Added quantity: ${qty}`);
      await page.waitForTimeout(500); // Extra wait every 100 items
    } else {
      await page.waitForTimeout(50);
    }
    
    // Add new output for next quantity
    if (qty < 1000) {
      await page.getByRole('button', { name: 'Add Output' }).click();
    }
  }

  await page.locator('.flex.justify-end.mt-6').click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Save', exact: true }).nth(5).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Approve' }).click();
});