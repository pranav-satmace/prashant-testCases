import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://test-vartul.satmace.com/login/');
  await page.locator('#id_username').fill('Prashant@satmace.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Satma@201');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto('https://test-vartul.satmace.com/app/');
  await page.waitForTimeout(3000);

  //Purchase Orders
  await page.getByRole('link', { name: 'Purchase Order' }).click();
  await page.getByRole('link', { name: 'Create Purchase Order' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Search warehouse' }).click();
  await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
  await page.getByRole('button', { name: 'Search currency' }).click();
  await page.getByRole('option', { name: 'INR' }).click();
  await page.getByRole('button', { name: 'Search partner' }).click();
  await page.getByRole('textbox', { name: 'Search Trade Partner…' }).fill('shant');
  await page.getByRole('option', { name: 'Shant', exact: true }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Save' }).click();
  
  await page.getByRole('button', { name: 'Add Line Item' }).click();
  await page.getByRole('button', { name: 'Select BIN — Select SKU' }).click();
  await page.getByRole('button', { name: 'Search BIN…' }).click();
  await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
  await page.getByRole('button', { name: 'Search SKU…' }).click();
  await page.getByRole('option', { name: 'Bale B | Test01 | Bale' }).click();
  await page.getByTestId('inventory-selector-save-btn').click();
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
  await page.getByRole('option', { name: 'Bale L | Test01 | Loose' }).click();
  await page.getByTestId('inventory-selector-save-btn').click();
  await page.getByRole('textbox', { name: '0.0000' }).nth(2).click();
  await page.getByRole('textbox', { name: '0.0000' }).nth(2).fill('200');
  await page.getByRole('textbox', { name: '0.0000' }).nth(3).click();
  await page.getByRole('textbox', { name: '0.0000' }).nth(3).fill('20');
  await page.getByRole('button', { name: 'Search tax group' }).click();
  await page.getByRole('option', { name: 'Gst 12%' }).click();
  await page.getByRole('button', { name: 'Save' }).nth(1).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Add Line Item' }).click();
  await page.getByRole('button', { name: 'QR BIN — Select SKU' }).click();
  await page.getByRole('button', { name: 'Search SKU…' }).click();
  await page.getByRole('option', { name: 'Dual Test 1 | Test01 | Loose' }).click();
  await page.getByTestId('inventory-selector-save-btn').click();
  await page.getByRole('textbox', { name: '0.0000' }).nth(4).click();
  await page.getByRole('textbox', { name: '0.0000' }).nth(4).fill('10');
  await page.locator('input[name="rate"]').nth(2).click();
  await page.locator('input[name="rate"]').nth(2).fill('1000');
  await page.getByRole('button', { name: 'Search tax group' }).click();
  await page.getByRole('option', { name: 'Gst 12%' }).click();
  await page.getByRole('button', { name: 'Save' }).nth(2).click();

  await page.waitForTimeout(3000);
  await page.getByText('Disclose Rate').click();

  await page.waitForTimeout(5000); 
  await page.getByRole('button', { name: 'Save' }).nth(3).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.waitForTimeout(3000);

  await page.getByRole('button', { name: 'Transform to Receipt' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Approve' }).click();
    

  //Purchase return
  await page.getByRole('link', { name: 'Purchase Return' }).click();
  await page.getByRole('link', { name: 'New Purchase Return' }).click();
  await page.getByRole('button', { name: 'Search vendor' }).click();
  await page.getByRole('option', { name: 'Shant' }).click();
  await page.getByRole('button', { name: 'Select a vendor first' }).click();
  await page.getByRole('option').first().click();
  await page.getByRole('textbox', { name: 'Remarks (optional)' }).click();
  await page.getByRole('textbox', { name: 'Remarks (optional)' }).fill('Good');
  await page.locator('div').filter({ hasText: /^Select lines to return$/ }).click();
  await page.getByRole('listitem').filter({ hasText: 'Dual Test 1 — Available' }).click();
  await page.locator('div').filter({ hasText: /^Return LinesPick which receipt lines to return$/ }).first().click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Save' }).nth(1).click();
  await page.waitForTimeout(3000);
  await page.getByRole('combobox').nth(1).selectOption('Quality Rejection');
  await page.getByRole('button', { name: 'Save' }).nth(1).click();
  await page.getByRole('button', { name: 'Submit for Approval' }).click();
  await page.getByRole('button', { name: 'Approve' }).click();
  await page.waitForTimeout(3000);

  //Purchase Receipt
  // await page.getByRole('link', { name: 'Purchase Receipt' }).click();
  // await page.getByRole('link', { name: 'Create Purchase Receipt' }).click();
  // await page.waitForTimeout(3000);
  // await page.getByRole('button', { name: 'Search warehouse' }).click();
  // await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
  // await page.getByRole('button', { name: 'Search trade partner' }).click();
  // await page.getByRole('textbox', { name: 'Search Trade Partner…' }).fill('shant');
  // await page.getByRole('option', { name: 'Shant', exact: true }).click();
  // await page.getByRole('textbox', { name: 'Remarks' }).click();
  // await page.getByRole('textbox', { name: 'Remarks' }).fill('Test');
  // await page.waitForTimeout(3000);
  // await page.getByRole('button', { name: 'Save' }).click();
  // await page.getByRole('button', { name: 'Search vehicle' }).click();
  // await page.getByRole('option', { name: 'MH04GR8207' }).click();
  // await page.getByRole('button', { name: 'Search operator' }).click();
  // await page.getByRole('option', { name: 'Rakis' }).click();
  // await page.waitForTimeout(3000);
  // await page.getByRole('button', { name: 'Search approved PO' }).click();
  // await page.waitForTimeout(3000);

  // // Select the latest PO (first option in dropdown)
  // await page.getByRole('option').first().click();

  // await page.getByRole('button', { name: 'Import Lines' }).click();await page.getByRole('button', { name: 'Save' }).nth(3).click();
  // await page.getByRole('button', { name: 'Approve' }).click();


  //Segregations
  // Scroll down 300 pixels
  await page.mouse.wheel(0, 300);
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Segregation' }).click();
  await page.getByRole('link', { name: 'Create Segregation' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Search warehouse' }).click();
  await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
  await page.getByRole('button', { name: 'Save & Continue' }).click();
  await page.getByRole('button', { name: 'Search user' }).click();
  await page.getByRole('option', { name: 'Prashant Mane' }).first().click();

  const today = new Date().toISOString().split('T')[0];

  await page.locator('[data-test-id="dp-input"]').nth(1).click();
  await page.locator(`[data-test-id="dp-${today}"]`).first().click();

  await page.locator('[data-test-id="dp-input"]').nth(2).click();
  await page.locator(`[data-test-id="dp-${today}"]`).first().click();

  await page.getByRole('textbox').nth(3).click();
  await page.getByRole('textbox').nth(3).fill('100');
  await page.getByRole('textbox').nth(4).click();
  await page.getByRole('textbox').nth(4).fill('Prashant');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Add Source' }).click();
  await page.waitForTimeout(2000);

// Open QR dropdown
await page.locator('div').filter({ hasText: /^Search and select QR codes$/ }).click();
await page.getByRole('textbox', { name: 'Search QR Codes Pool…' }).fill('bale ');
// await page.waitForSelector('[role="option"]');

// Select latest QR (1st option)
await page.locator('[role="option"]').filter({ hasText: 'QR BIN' }).nth(0).click();

// Select second latest QR (2nd option)
await page.locator('[role="option"]').filter({ hasText: 'QR BIN' }).nth(1).click();

// Select FIFO
await page.getByRole('combobox').selectOption('FIFO');
  // await page.getByRole('option', { name: 'QR BIN / Bale L (Loose) / 007B4590 / Avl. Qty: 200.00 Kgs' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Add Output' }).click();
  await page.getByRole('button', { name: 'Select BIN — Select SKU' }).click();
  await page.getByRole('button', { name: 'Search BIN…' }).click();
  await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
  await page.getByRole('button', { name: 'Search SKU…' }).click();
  await page.getByRole('option', { name: 'HD Item 2 | HD | Loose' }).click();
  await page.getByTestId('inventory-selector-save-btn').click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: '0.0000' }).click();
  await page.getByRole('textbox', { name: '0.0000' }).fill('10');
  await page.getByRole('button', { name: 'Add Output' }).click();
  await page.getByText('Remove Save').click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Add Output' }).click();
  await page.getByRole('button', { name: 'Save' }).nth(1).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Add Output' }).click();
  await page.getByRole('textbox', { name: '0.0000' }).first().click();
  await page.getByRole('textbox', { name: '0.0000' }).first().fill('20');
  await page.getByRole('button', { name: 'Save' }).nth(1).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Add Output' }).click();
  await page.getByRole('textbox', { name: '0.0000' }).first().click();
  await page.getByRole('textbox', { name: '0.0000' }).first().fill('30');
  await page.getByRole('button', { name: 'Save' }).nth(1).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Add Output' }).click();
  await page.getByRole('textbox', { name: '0.0000' }).first().click();
  await page.getByRole('textbox', { name: '0.0000' }).first().fill('40');
  await page.getByRole('button', { name: 'Save' }).nth(1).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Add Output' }).click();
  await page.getByRole('textbox', { name: '0.0000' }).first().click();
  await page.getByRole('textbox', { name: '0.0000' }).first().fill('50');
  await page.getByRole('button', { name: 'Save' }).nth(1).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Save', exact: true }).nth(5).click();
  await page.getByRole('button', { name: 'Save', exact: true }).nth(5).click();
  await page.getByRole('textbox').nth(4).click();
  await page.getByRole('textbox').nth(4).fill('20');
  await page.waitForTimeout(3000);
  //await page.pause();
  // await page.getByRole('button', { name: 'Save', exact: true }).nth(5).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Approve' }).click();
  // await page.waitForTimeout(3000);
  // await page.getByRole('button', { name: 'Approve' }).click();


  //Repackings
  await page.mouse.wheel(0, 300);
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Repacking' }).click();
  await page.getByRole('link', { name: 'Create Repacking' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Search warehouse' }).click();
  await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
  await page.getByRole('button', { name: 'Search machine' }).click();
  await page.getByRole('option', { name: 'Process Machine' }).click();
  await page.waitForTimeout(3000);
  await page.locator('[data-test-id="dp-input"]').nth(1).click();
  await page.locator(`[data-test-id="dp-${today}"]`).first().click();

  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Save & Continue' }).click();
  await page.getByRole('button', { name: 'Search user' }).click();
  await page.getByRole('option', { name: 'Prashant Mane' }).first().click();
  await page.getByRole('textbox', { name: 'Optional remarks' }).click();
  await page.getByRole('textbox', { name: 'Optional remarks' }).fill('Best');
  await page.getByRole('button', { name: 'Add Source' }).click();
await page.waitForTimeout(3000);

// Open QR dropdown
await page.locator('div').filter({ hasText: /^Search and select QR codes$/ }).click();

// Select 1st QR
const qrOptions = page.getByRole('option').filter({
  hasText: 'QR BIN'
});

// Select first (latest) QR
await qrOptions.first().click();

// Select second (latest) QR
await qrOptions.nth(1).click();
// Select LIFO
await page.getByRole('combobox').selectOption('LIFO');

// Click outside to close dropdown
await page.locator('.flex.items-end').click();
await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Add Output' }).click();
  await page.getByRole('button', { name: 'Select BIN — Select SKU' }).click();
  await page.getByRole('button', { name: 'Search BIN…' }).click();
  await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
  await page.getByRole('button', { name: 'Search SKU…' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('option', { name: 'HD Item 2 | HD | Loose' }).click();
  await page.getByTestId('inventory-selector-save-btn').click();
  await page.getByRole('textbox', { name: '0.00' }).click();
  await page.getByRole('textbox', { name: '0.00' }).fill('10');
  await page.getByRole('button', { name: 'Save' }).nth(1).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Add Output' }).click();
  await page.getByRole('textbox', { name: '0.00' }).first().click();
  await page.getByRole('textbox', { name: '0.00' }).first().fill('20');
  await page.getByRole('button', { name: 'Save' }).nth(1).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Add Output' }).click();
  await page.getByRole('textbox', { name: '0.00' }).first().click();
  await page.getByRole('textbox', { name: '0.00' }).first().fill('30');
  await page.getByRole('button', { name: 'Save' }).nth(1).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Add Output' }).click();
  await page.getByRole('textbox', { name: '0.00' }).first().click();
  await page.getByRole('textbox', { name: '0.00' }).first().fill('40');
  await page.getByRole('button', { name: 'Save' }).nth(1).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Add Output' }).click();
  await page.getByRole('textbox', { name: '0.00' }).first().click();
  await page.getByRole('textbox', { name: '0.00' }).first().fill('50');
  await page.getByRole('button', { name: 'Save' }).nth(1).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Save', exact: true }).nth(5).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Approve' }).click();

});
