import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://test-vartul.satmace.com/login/');
  await page.locator('#id_username').click();
  await page.locator('#id_username').fill('Prashant@satmace.com');
  await page.locator('#id_username').press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Satma@201');
  await page.locator('#password-toggle').click();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto('https://test-vartul.satmace.com/app/');

  await page.getByRole('link', { name: 'Sales Order' }).click();
  await page.getByRole('link', { name: 'Create Sales Order' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Search warehouse' }).click();
  await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
  await page.getByRole('button', { name: 'Search partner' }).click();
  await page.getByRole('option', { name: 'Shant' }).click();
  await page.getByRole('button', { name: 'Search currency' }).click();
  await page.getByRole('option', { name: 'INR' }).click();
  await page.getByRole('button', { name: 'Search payment term' }).click();
  await page.getByRole('option', { name: 'Payment Test Term' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Goa, India, Goa, IN' }).first().click();
  await page.locator('div').filter({ hasText: /^Billing & ShippingAddress details$/ }).first().click();
  await page.getByRole('button', { name: 'Search bank account' }).click();
  await page.getByRole('option', { name: 'PGM' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Add Item' }).click();
  await page.getByRole('button', { name: 'Select BIN — Select SKU' }).click();
  await page.getByRole('button', { name: 'Search BIN…' }).click();
  await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
  await page.getByRole('button', { name: 'Search SKU…' }).click();
  await page.getByRole('option', { name: 'Bale B | Test01 | Bale' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Save' }).nth(2).click();
  await page.locator('input[name="quantity"]').click();
  await page.locator('input[name="quantity"]').fill('1');
  await page.locator('input[name="quantity"]').press('Tab');
  await page.locator('input[name="rate"]').fill('10');
  await page.getByRole('button', { name: 'Search delivery mode' }).click();
  await page.getByRole('option', { name: 'Ship' }).click();
  await page.getByRole('button', { name: 'Search tax group' }).click();
  await page.getByRole('option', { name: 'Gst 12%' }).click();
  await page.getByRole('button', { name: 'Search process' }).click();
  await page.getByRole('option', { name: 'Test 20' }).click();
  await page.getByRole('textbox', { name: 'Instructions' }).click();
  await page.getByRole('textbox', { name: 'Instructions' }).fill('Test');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Save' }).first().click();

  // ---- Loop starts here: 2nd line item onward, 2000 items, qty 1,2,3...2000, rate always 10 ----
const totalItems = 2000;

for (let i = 1; i <= totalItems; i++) {

    // Every 20 items wait
    if (i > 1 && i % 20 === 0) {
        console.log(`⏳ ${i} items completed. Waiting for 6 seconds...`);
        await page.waitForTimeout(6000);
    }

    await page.waitForTimeout(3000);

    // Current row on visible page (0-19)
    const rowIndex = (i - 1) % 20;

    // Add Item
    await page.getByRole('button', { name: 'Add Item' }).click();

    // Select SKU
    await page.getByRole('button', { name: 'QR BIN — Select SKU' }).click();
    await page.getByRole('button', { name: 'Search SKU…' }).click();
    await page.getByRole('option', { name: 'Bale B | Test01 | Bale' }).click();

    // Save SKU
    await page.getByRole('button', { name: 'Save' }).last().click();

    // Qty
    const qtyBox = page.getByRole('textbox', { name: '0.0000' }).nth(rowIndex * 2);
    await qtyBox.waitFor({ state: 'visible' });
    await qtyBox.fill(String(i));

    // Rate
    const rateBox = page.getByRole('textbox', { name: '0.0000' }).nth(rowIndex * 2 + 1);
    await rateBox.waitFor({ state: 'visible' });
    await rateBox.fill('10');

    // Delivery Mode
    await page.getByRole('button', { name: 'Search delivery mode' }).last().click();
    await page.getByRole('option', { name: 'Ship' }).click();

    // Instructions
    const instructionBox = page.getByRole('textbox', { name: 'Instructions' }).nth(rowIndex);
    await instructionBox.waitFor({ state: 'visible' });
    await instructionBox.fill('Test 2');

    // Row Save
    const saveButton = page.getByRole('button', { name: 'Save' }).nth(rowIndex);
    await saveButton.waitFor({ state: 'visible' });
    await saveButton.click();

    console.log(
        `✅ Item ${i + 1} added successfully (qty=${i}, rate=10) — ${i}/${totalItems} loop items done`
    );
}

  console.log(`🎉 All ${totalItems} looped items created. Total line items on order: ${totalItems + 1}`);

  await page.getByRole('button', { name: 'Save' }).nth(totalItems + 1).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Approve' }).click();
});