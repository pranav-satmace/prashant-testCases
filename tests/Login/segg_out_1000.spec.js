import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://test-vartul.satmace.com/login/');
  await page.locator('#id_username').click();
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
  await page.getByRole('textbox', { name: 'Search QR Codes Pool…' }).fill('4732DF65');
  await page.locator('.w-4.h-4').click();
  await page.getByRole('button', { name: 'Add Output' }).click();
  await page.getByRole('button', { name: 'Select BIN — Select SKU' }).click();
  await page.getByRole('button', { name: 'Search BIN…' }).click();
  await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
  await page.getByRole('button', { name: 'Search SKU…' }).click();
  await page.getByRole('option', { name: 'Bale B | Test01 | Bale' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Save' }).nth(3).click();
  await page.getByRole('textbox', { name: '0.0000' }).click();
  await page.getByRole('textbox', { name: '0.0000' }).fill('1');
  await page.getByRole('button', { name: 'Save' }).nth(1).click();
  await page.waitForTimeout(3000);
  
 for (let i = 1; i <= 1000; i++) {

    await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Add Output' }).click();

  await page.getByRole('textbox', { name: '0.0000' }).first().click();

  // Fill 1,2,3,4...1000
  await page.getByRole('textbox', { name: '0.0000' }).first().fill(i.toString());

  await page.waitForTimeout(1000);

  await page.getByRole('button', { name: 'Save' }).nth(1).click();

  await page.getByRole('button', { name: 'Add Output' }).click();

  console.log(`✅ Segregation Output ${i} Created Successfully`);
}

console.log('🎉 All 1000 Segregation Outputs Created Successfully');

  await page.getByRole('button', { name: 'Save' }).nth(3).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Approve' }).click();
});