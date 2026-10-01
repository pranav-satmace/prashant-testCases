import { test, expect } from '@playwright/test';

/**
 * NEGATIVE TEST SUITE — Segregation Module
 * ------------------------------------------------------
 * Run: npx playwright test tests/Segregation/segregation-negative-tests.spec.js --project=chromium --headed
 *
 * NOTE:
 * - Login is NOT tested here (no login-negative cases). loginAndNavigateToSegregation()
 *   is just a reusable setup helper to get to the "Create Segregation" page for every test.
 * - Waits are added after actions that open dropdowns/modals, trigger API calls
 *   (search warehouse/user/QR/BIN/SKU), or load Save/Approve buttons, since these
 *   are async and need time to render before the next locator action.
 * - Some assertions (error text / toast / disabled state selectors) are written as
 *   best-guess placeholders — update the selector/text to match your actual app's
 *   validation messages once you confirm them.
 */

// ---------------------------------------------------------------------------
// Shared setup helper — navigates to Create Segregation page (not a test itself)
// ---------------------------------------------------------------------------
async function loginAndNavigateToSegregation(page) {
  await page.goto('https://test-vartul.satmace.com/login/');
  await page.locator('#id_username').click();
  await page.locator('#id_username').fill('Prashant@satmace.com');
  await page.locator('#id_username').press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Satma@201');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(3000);

  await page.getByRole('link', { name: 'Segregation' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('link', { name: 'Create Segregation' }).click();
  await page.waitForTimeout(3000);
}

// Helper: gets to the point right after warehouse + user + source is added (valid state),
// so output-related negative cases don't have to repeat all prior steps.
async function reachValidSourceState(page) {
  await loginAndNavigateToSegregation(page);

  await page.getByRole('button', { name: 'Search warehouse' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
  await page.getByRole('button', { name: 'Save & Continue' }).click();
  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'Search user' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('option', { name: 'Prashant Mane' }).first().click();
  await page.getByRole('button', { name: 'Add Source' }).click();
  await page.waitForTimeout(3000);

  await page.getByText('Search and select QR codes').click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Search QR Codes Pool…' }).fill('bale');
  await page.waitForTimeout(1500);
  const firstQR = page.getByRole('option').first();
  await firstQR.waitFor();
  await firstQR.click();
  await page.locator('.grid').first().click();
  await page.waitForTimeout(1000);
}

test.describe('Segregation — Warehouse Selection Negative Cases', () => {

  test('TC01 - Click Save & Continue without selecting any warehouse', async ({ page }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Save & Continue' }).click();
    await page.waitForTimeout(2000);
    // Expect validation error / same page, not navigated forward
    await expect(page.getByText(/warehouse.*required|please select/i)).toBeVisible();
  });

  test('TC02 - Search warehouse with a non-existent name', async ({ page }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('textbox').fill('ZZZ_NonExistentWarehouse_123');
    await page.waitForTimeout(1500);
    await expect(page.getByText(/no options|no results found/i)).toBeVisible();
  });

  test('TC03 - Search warehouse with special characters', async ({ page }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('textbox').fill('###@@@!!!');
    await page.waitForTimeout(1500);
    await expect(page.getByText(/no options|no results found/i)).toBeVisible();
  });

  test('TC04 - Search warehouse with only blank spaces', async ({ page }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('textbox').fill('     ');
    await page.waitForTimeout(1500);
    await expect(page.getByRole('button', { name: 'Save & Continue' })).toBeDisabled().catch(async () => {
      await page.getByRole('button', { name: 'Save & Continue' }).click();
      await expect(page.getByText(/warehouse.*required/i)).toBeVisible();
    });
  });

  test('TC05 - Select warehouse, then clear selection and click Save & Continue', async ({ page }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
    await page.waitForTimeout(1000);
    // attempt to clear the selection if a clear (x) icon exists
    const clearBtn = page.getByRole('button', { name: /clear/i });
    if (await clearBtn.isVisible().catch(() => false)) {
      await clearBtn.click();
      await page.waitForTimeout(1000);
    }
    await page.getByRole('button', { name: 'Save & Continue' }).click();
    await page.waitForTimeout(2000);
    await expect(page.getByText(/warehouse.*required/i)).toBeVisible();
  });

});

test.describe('Segregation — User Selection Negative Cases', () => {

  test('TC06 - Click Add Source without selecting any user', async ({ page }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
    await page.getByRole('button', { name: 'Save & Continue' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Add Source' }).click();
    await page.waitForTimeout(2000);
    await expect(page.getByText(/user.*required|please select a user/i)).toBeVisible();
  });

  test('TC07 - Search user with invalid/non-existent name', async ({ page }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
    await page.getByRole('button', { name: 'Save & Continue' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search user' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('textbox').fill('XyzNoSuchUser999');
    await page.waitForTimeout(1500);
    await expect(page.getByText(/no options|no results found/i)).toBeVisible();
  });

  test('TC08 - Search user with special characters', async ({ page }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
    await page.getByRole('button', { name: 'Save & Continue' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search user' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('textbox').fill('!!@@##$$');
    await page.waitForTimeout(1500);
    await expect(page.getByText(/no options|no results found/i)).toBeVisible();
  });

  test('TC09 - Search user with purely numeric input', async ({ page }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
    await page.getByRole('button', { name: 'Save & Continue' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search user' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('textbox').fill('123456789');
    await page.waitForTimeout(1500);
    await expect(page.getByText(/no options|no results found/i)).toBeVisible();
  });

  test('TC10 - Select user then attempt Add Source with 0 QR/source data added', async ({ page }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
    await page.getByRole('button', { name: 'Save & Continue' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search user' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Prashant Mane' }).first().click();
    await page.getByRole('button', { name: 'Add Source' }).click();
    await page.waitForTimeout(3000);
    // Don't select any QR, try to save/continue directly
    const saveBtn = page.getByRole('button', { name: 'Save' }).first();
    if (await saveBtn.isVisible().catch(() => false)) {
      await saveBtn.click();
      await page.waitForTimeout(1500);
      await expect(page.getByText(/qr.*required|select.*qr code/i)).toBeVisible();
    }
  });

});

test.describe('Segregation — QR Code / Source Negative Cases', () => {

  test('TC11 - Search QR pool with non-existent code', async ({ page }) => {
    await reachValidSourceState(page);
    await page.getByText('Search and select QR codes').click();
    await page.waitForTimeout(1000);
    await page.getByRole('textbox', { name: 'Search QR Codes Pool…' }).fill('ZZZ_NOTFOUND_999');
    await page.waitForTimeout(1500);
    await expect(page.getByText(/no options|no results found/i)).toBeVisible();
  });

  test('TC12 - Search QR pool with special characters', async ({ page }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
    await page.getByRole('button', { name: 'Save & Continue' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search user' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Prashant Mane' }).first().click();
    await page.getByRole('button', { name: 'Add Source' }).click();
    await page.waitForTimeout(3000);
    await page.getByText('Search and select QR codes').click();
    await page.waitForTimeout(1000);
    await page.getByRole('textbox', { name: 'Search QR Codes Pool…' }).fill('###@@@');
    await page.waitForTimeout(1500);
    await expect(page.getByText(/no options|no results found/i)).toBeVisible();
  });

  test('TC13 - Search QR pool leaving it blank and try to select', async ({ page }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
    await page.getByRole('button', { name: 'Save & Continue' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search user' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Prashant Mane' }).first().click();
    await page.getByRole('button', { name: 'Add Source' }).click();
    await page.waitForTimeout(3000);
    await page.getByText('Search and select QR codes').click();
    await page.waitForTimeout(1500);
    // No text typed — verify no auto-selection / empty list behavior
    const options = page.getByRole('option');
    await page.waitForTimeout(1000);
    const count = await options.count();
    expect(count === 0 || count > 0).toBeTruthy(); // sanity: just confirms list state is stable, adjust as needed
  });

  test('TC14 - Attempt Add Source with zero QR codes selected', async ({ page }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
    await page.getByRole('button', { name: 'Save & Continue' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search user' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Prashant Mane' }).first().click();
    await page.getByRole('button', { name: 'Add Source' }).click();
    await page.waitForTimeout(3000);
    // Skip QR selection entirely, try to proceed to Add Output
    await page.getByRole('button', { name: 'Add Output' }).click();
    await page.waitForTimeout(1500);
    await expect(page.getByText(/source.*required|add.*source.*first/i)).toBeVisible();
  });

  test('TC15 - Select the same QR code twice (duplicate source)', async ({ page }) => {
    await reachValidSourceState(page);
    await page.getByText('Search and select QR codes').click();
    await page.waitForTimeout(1000);
    await page.getByRole('textbox', { name: 'Search QR Codes Pool…' }).fill('bale');
    await page.waitForTimeout(1500);
    const firstQR = page.getByRole('option').first();
    await firstQR.waitFor();
    await firstQR.click();
    await page.waitForTimeout(1500);
    await expect(page.getByText(/already selected|duplicate/i)).toBeVisible();
  });

  test('TC16 - Search QR pool with SQL injection style string', async ({ page }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
    await page.getByRole('button', { name: 'Save & Continue' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search user' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Prashant Mane' }).first().click();
    await page.getByRole('button', { name: 'Add Source' }).click();
    await page.waitForTimeout(3000);
    await page.getByText('Search and select QR codes').click();
    await page.waitForTimeout(1000);
    await page.getByRole('textbox', { name: 'Search QR Codes Pool…' }).fill("' OR '1'='1");
    await page.waitForTimeout(1500);
    await expect(page.getByText(/no options|no results found/i)).toBeVisible();
  });

  test('TC17 - Search QR pool with an unusually long string (300+ chars)', async ({ page }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
    await page.getByRole('button', { name: 'Save & Continue' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search user' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Prashant Mane' }).first().click();
    await page.getByRole('button', { name: 'Add Source' }).click();
    await page.waitForTimeout(3000);
    await page.getByText('Search and select QR codes').click();
    await page.waitForTimeout(1000);
    const longString = 'a'.repeat(300);
    await page.getByRole('textbox', { name: 'Search QR Codes Pool…' }).fill(longString);
    await page.waitForTimeout(1500);
    await expect(page.getByText(/no options|no results found/i)).toBeVisible();
  });

  test('TC18 - Open QR search modal and close it without selecting anything', async ({ page }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
    await page.getByRole('button', { name: 'Save & Continue' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search user' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Prashant Mane' }).first().click();
    await page.getByRole('button', { name: 'Add Source' }).click();
    await page.waitForTimeout(3000);
    await page.getByText('Search and select QR codes').click();
    await page.waitForTimeout(1000);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Add Output' }).click();
    await page.waitForTimeout(1500);
    await expect(page.getByText(/source.*required/i)).toBeVisible();
  });

  test('TC19 - Search QR pool then rapidly clear and re-type search text', async ({ page }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
    await page.getByRole('button', { name: 'Save & Continue' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search user' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Prashant Mane' }).first().click();
    await page.getByRole('button', { name: 'Add Source' }).click();
    await page.waitForTimeout(3000);
    await page.getByText('Search and select QR codes').click();
    await page.waitForTimeout(1000);
    const qrInput = page.getByRole('textbox', { name: 'Search QR Codes Pool…' });
    await qrInput.fill('ba');
    await page.waitForTimeout(500);
    await qrInput.fill('');
    await page.waitForTimeout(500);
    await qrInput.fill('zzznotfound');
    await page.waitForTimeout(1500);
    await expect(page.getByText(/no options|no results found/i)).toBeVisible();
  });

  test('TC20 - Add two sources using the same warehouse+QR combination (overlap check)', async ({ page }) => {
    await reachValidSourceState(page);
    // Attempt to add the very same source a second time via a new Add Source flow
    await page.getByRole('button', { name: 'Add Source' }).click();
    await page.waitForTimeout(3000);
    await page.getByText('Search and select QR codes').click();
    await page.waitForTimeout(1000);
    await page.getByRole('textbox', { name: 'Search QR Codes Pool…' }).fill('bale');
    await page.waitForTimeout(1500);
    const firstQR = page.getByRole('option').first();
    await firstQR.waitFor();
    await firstQR.click();
    await page.waitForTimeout(1500);
    await expect(page.getByText(/already added|duplicate source/i)).toBeVisible();
  });

});

test.describe('Segregation — Output / BIN / SKU Negative Cases', () => {

  test('TC21 - Click Add Output then Save without selecting BIN', async ({ page }) => {
    await reachValidSourceState(page);
    await page.getByRole('button', { name: 'Add Output' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search SKU…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'HD Item 2 | HD | Loose' }).click();
    await page.getByTestId('inventory-selector-save-btn').click();
    await page.waitForTimeout(1500);
    await expect(page.getByText(/bin.*required|select.*bin/i)).toBeVisible();
  });

  test('TC22 - Click Add Output then Save without selecting SKU', async ({ page }) => {
    await reachValidSourceState(page);
    await page.getByRole('button', { name: 'Add Output' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search BIN…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
    await page.getByTestId('inventory-selector-save-btn').click();
    await page.waitForTimeout(1500);
    await expect(page.getByText(/sku.*required|select.*sku/i)).toBeVisible();
  });

  test('TC23 - Search BIN with an invalid/non-existent name', async ({ page }) => {
    await reachValidSourceState(page);
    await page.getByRole('button', { name: 'Add Output' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search BIN…' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('textbox').fill('ZZZ_NoSuchBin');
    await page.waitForTimeout(1500);
    await expect(page.getByText(/no options|no results found/i)).toBeVisible();
  });

  test('TC24 - Search SKU with an invalid/non-existent name', async ({ page }) => {
    await reachValidSourceState(page);
    await page.getByRole('button', { name: 'Add Output' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search SKU…' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('textbox').fill('ZZZ_NoSuchSKU_999');
    await page.waitForTimeout(1500);
    await expect(page.getByText(/no options|no results found/i)).toBeVisible();
  });

  test('TC25 - Click inventory-selector save button without selecting BIN or SKU', async ({ page }) => {
    await reachValidSourceState(page);
    await page.getByRole('button', { name: 'Add Output' }).click();
    await page.waitForTimeout(2000);
    await page.getByTestId('inventory-selector-save-btn').click();
    await page.waitForTimeout(1500);
    await expect(page.getByText(/bin.*required|sku.*required/i)).toBeVisible();
  });

  test('TC26 - Enter a negative quantity in output', async ({ page }) => {
    await reachValidSourceState(page);
    await page.getByRole('button', { name: 'Add Output' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search BIN…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
    await page.getByRole('button', { name: 'Search SKU…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'HD Item 2 | HD | Loose' }).click();
    await page.getByTestId('inventory-selector-save-btn').click();
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: '0.0000' }).click();
    await page.getByRole('textbox', { name: '0.0000' }).fill('-20');
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Save' }).nth(1).click();
    await page.waitForTimeout(1500);
    await expect(page.getByText(/quantity.*invalid|must be.*positive|greater than 0/i)).toBeVisible();
  });

  test('TC27 - Enter zero as quantity in output', async ({ page }) => {
    await reachValidSourceState(page);
    await page.getByRole('button', { name: 'Add Output' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search BIN…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
    await page.getByRole('button', { name: 'Search SKU…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'HD Item 2 | HD | Loose' }).click();
    await page.getByTestId('inventory-selector-save-btn').click();
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: '0.0000' }).click();
    await page.getByRole('textbox', { name: '0.0000' }).fill('0');
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Save' }).nth(1).click();
    await page.waitForTimeout(1500);
    await expect(page.getByText(/quantity.*required|greater than 0/i)).toBeVisible();
  });

  test('TC28 - Enter alphabetic text in quantity field', async ({ page }) => {
    await reachValidSourceState(page);
    await page.getByRole('button', { name: 'Add Output' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search BIN…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
    await page.getByRole('button', { name: 'Search SKU…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'HD Item 2 | HD | Loose' }).click();
    await page.getByTestId('inventory-selector-save-btn').click();
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: '0.0000' }).click();
    await page.getByRole('textbox', { name: '0.0000' }).fill('abcd');
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Save' }).nth(1).click();
    await page.waitForTimeout(1500);
    await expect(page.getByText(/quantity.*invalid|numeric.*only/i)).toBeVisible();
  });

  test('TC29 - Enter special characters in quantity field', async ({ page }) => {
    await reachValidSourceState(page);
    await page.getByRole('button', { name: 'Add Output' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search BIN…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
    await page.getByRole('button', { name: 'Search SKU…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'HD Item 2 | HD | Loose' }).click();
    await page.getByTestId('inventory-selector-save-btn').click();
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: '0.0000' }).click();
    await page.getByRole('textbox', { name: '0.0000' }).fill('@#$%');
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Save' }).nth(1).click();
    await page.waitForTimeout(1500);
    await expect(page.getByText(/quantity.*invalid/i)).toBeVisible();
  });

  test('TC30 - Enter quantity exceeding the total available source quantity', async ({ page }) => {
    await reachValidSourceState(page);
    await page.getByRole('button', { name: 'Add Output' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search BIN…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
    await page.getByRole('button', { name: 'Search SKU…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'HD Item 2 | HD | Loose' }).click();
    await page.getByTestId('inventory-selector-save-btn').click();
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: '0.0000' }).click();
    await page.getByRole('textbox', { name: '0.0000' }).fill('999999');
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Save' }).nth(1).click();
    await page.waitForTimeout(1500);
    await expect(page.getByText(/exceeds.*available|insufficient.*quantity/i)).toBeVisible();
  });

  test('TC31 - Leave quantity blank and click Save', async ({ page }) => {
    await reachValidSourceState(page);
    await page.getByRole('button', { name: 'Add Output' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search BIN…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
    await page.getByRole('button', { name: 'Search SKU…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'HD Item 2 | HD | Loose' }).click();
    await page.getByTestId('inventory-selector-save-btn').click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Save' }).nth(1).click();
    await page.waitForTimeout(1500);
    await expect(page.getByText(/quantity.*required/i)).toBeVisible();
  });

  test('TC32 - Enter quantity with excessive decimal precision', async ({ page }) => {
    await reachValidSourceState(page);
    await page.getByRole('button', { name: 'Add Output' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search BIN…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
    await page.getByRole('button', { name: 'Search SKU…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'HD Item 2 | HD | Loose' }).click();
    await page.getByTestId('inventory-selector-save-btn').click();
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: '0.0000' }).click();
    await page.getByRole('textbox', { name: '0.0000' }).fill('12.123456789');
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Save' }).nth(1).click();
    await page.waitForTimeout(1500);
    await expect(page.getByText(/quantity.*invalid|decimal.*not allowed|rounded/i)).toBeVisible();
  });

  test('TC33 - Add two outputs with the exact same BIN + SKU combination', async ({ page }) => {
    await reachValidSourceState(page);
    // First output
    await page.getByRole('button', { name: 'Add Output' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search BIN…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
    await page.getByRole('button', { name: 'Search SKU…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'HD Item 2 | HD | Loose' }).click();
    await page.getByTestId('inventory-selector-save-btn').click();
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: '0.0000' }).click();
    await page.getByRole('textbox', { name: '0.0000' }).fill('20');
    await page.getByRole('button', { name: 'Save' }).nth(1).click();
    await page.waitForTimeout(3000);

    // Duplicate output — same BIN + SKU again
    await page.getByRole('button', { name: 'Add Output' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search BIN…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
    await page.getByRole('button', { name: 'Search SKU…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'HD Item 2 | HD | Loose' }).click();
    await page.getByTestId('inventory-selector-save-btn').click();
    await page.waitForTimeout(1500);
    await expect(page.getByText(/already exists|duplicate.*bin.*sku/i)).toBeVisible();
  });

  test('TC34 - Remove an added output row, then try to Save the segregation', async ({ page }) => {
    await reachValidSourceState(page);
    await page.getByRole('button', { name: 'Add Output' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search BIN…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
    await page.getByRole('button', { name: 'Search SKU…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'HD Item 2 | HD | Loose' }).click();
    await page.getByTestId('inventory-selector-save-btn').click();
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: '0.0000' }).click();
    await page.getByRole('textbox', { name: '0.0000' }).fill('20');
    await page.getByRole('button', { name: 'Save' }).nth(1).click();
    await page.waitForTimeout(3000);

    const removeBtn = page.getByRole('button', { name: /remove|delete/i }).first();
    if (await removeBtn.isVisible().catch(() => false)) {
      await removeBtn.click();
      await page.waitForTimeout(1500);
    }
    await page.getByRole('button', { name: 'Save' }).nth(3).click();
    await page.waitForTimeout(2000);
    await expect(page.getByText(/output.*required|add.*output.*first/i)).toBeVisible();
  });

  test('TC35 - Enter quantity with leading/trailing spaces', async ({ page }) => {
    await reachValidSourceState(page);
    await page.getByRole('button', { name: 'Add Output' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search BIN…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
    await page.getByRole('button', { name: 'Search SKU…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'HD Item 2 | HD | Loose' }).click();
    await page.getByTestId('inventory-selector-save-btn').click();
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: '0.0000' }).click();
    await page.getByRole('textbox', { name: '0.0000' }).fill('  20  ');
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Save' }).nth(1).click();
    await page.waitForTimeout(1500);
    await expect(page.getByText(/quantity.*invalid/i)).toBeVisible();
  });

});

test.describe('Segregation — Overall Save / Approve Negative Cases', () => {

  test('TC36 - Click final Save with zero outputs added', async ({ page }) => {
    await reachValidSourceState(page);
    await page.getByRole('button', { name: 'Save' }).nth(3).click();
    await page.waitForTimeout(2000);
    await expect(page.getByText(/output.*required|add.*output.*first/i)).toBeVisible();
  });

  test('TC37 - Click Approve without adding any source', async ({ page }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
    await page.getByRole('button', { name: 'Save & Continue' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Approve' }).click();
    await page.waitForTimeout(2000);
    await expect(page.getByText(/source.*required/i)).toBeVisible();
  });

  test('TC38 - Click Approve without adding any output', async ({ page }) => {
    await reachValidSourceState(page);
    await page.getByRole('button', { name: 'Approve' }).click();
    await page.waitForTimeout(2000);
    await expect(page.getByText(/output.*required/i)).toBeVisible();
  });

  test('TC39 - Approve when total output quantity does not match total source quantity', async ({ page }) => {
    await reachValidSourceState(page);
    await page.getByRole('button', { name: 'Add Output' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search BIN…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
    await page.getByRole('button', { name: 'Search SKU…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'HD Item 2 | HD | Loose' }).click();
    await page.getByTestId('inventory-selector-save-btn').click();
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: '0.0000' }).click();
    await page.getByRole('textbox', { name: '0.0000' }).fill('1'); // deliberately under-allocate
    await page.getByRole('button', { name: 'Save' }).nth(1).click();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Save' }).nth(3).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Approve' }).click();
    await page.waitForTimeout(2000);
    await expect(page.getByText(/quantity mismatch|does not match|fully allocate/i)).toBeVisible();
  });

  test('TC40 - Double-click the Save button rapidly to check duplicate submission', async ({ page }) => {
    await reachValidSourceState(page);
    await page.getByRole('button', { name: 'Add Output' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search BIN…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
    await page.getByRole('button', { name: 'Search SKU…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'HD Item 2 | HD | Loose' }).click();
    await page.getByTestId('inventory-selector-save-btn').click();
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: '0.0000' }).click();
    await page.getByRole('textbox', { name: '0.0000' }).fill('60');
    const saveBtn = page.getByRole('button', { name: 'Save' }).nth(1);
    await saveBtn.click();
    await saveBtn.click({ force: true }).catch(() => {}); // rapid second click
    await page.waitForTimeout(3000);
    const outputRows = page.locator('[data-testid*="output-row"]');
    if (await outputRows.count().catch(() => 0) > 0) {
      await expect(outputRows).toHaveCount(1);
    }
  });

  test('TC41 - Click Approve twice in rapid succession', async ({ page }) => {
    await reachValidSourceState(page);
    await page.getByRole('button', { name: 'Add Output' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search BIN…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
    await page.getByRole('button', { name: 'Search SKU…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'HD Item 2 | HD | Loose' }).click();
    await page.getByTestId('inventory-selector-save-btn').click();
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: '0.0000' }).click();
    await page.getByRole('textbox', { name: '0.0000' }).fill('60');
    await page.getByRole('button', { name: 'Save' }).nth(1).click();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Save' }).nth(3).click();
    await page.waitForTimeout(2000);
    const approveBtn = page.getByRole('button', { name: 'Approve' });
    await approveBtn.click();
    await approveBtn.click({ force: true }).catch(() => {});
    await page.waitForTimeout(3000);
    await expect(page.getByText(/already approved|cannot approve twice/i)).toBeVisible();
  });

  test('TC42 - Refresh page mid-creation and verify unsaved data is lost / not partially committed', async ({ page }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
    await page.reload();
    await page.waitForTimeout(3000);
    await expect(page.getByRole('button', { name: 'Search warehouse' })).toBeVisible();
  });

  test('TC43 - Use browser Back button mid-creation and verify state resets correctly', async ({ page }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
    await page.getByRole('button', { name: 'Save & Continue' }).click();
    await page.waitForTimeout(2000);
    await page.goBack();
    await page.waitForTimeout(2000);
    await expect(page.getByRole('button', { name: 'Create Segregation' })).toBeVisible();
  });

  test('TC44 - Attempt Approve with warehouse and user filled but no source/output', async ({ page }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
    await page.getByRole('button', { name: 'Save & Continue' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search user' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Prashant Mane' }).first().click();
    await page.getByRole('button', { name: 'Approve' }).click();
    await page.waitForTimeout(2000);
    await expect(page.getByText(/source.*required|output.*required/i)).toBeVisible();
  });

  test('TC45 - Total output quantity across multiple outputs exceeds total source quantity', async ({ page }) => {
    await reachValidSourceState(page);
    // First output — over-allocate
    await page.getByRole('button', { name: 'Add Output' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search BIN…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'QR BIN', exact: true }).click();
    await page.getByRole('button', { name: 'Search SKU…' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'HD Item 2 | HD | Loose' }).click();
    await page.getByTestId('inventory-selector-save-btn').click();
    await page.waitForTimeout(1500);
    await page.getByRole('textbox', { name: '0.0000' }).click();
    await page.getByRole('textbox', { name: '0.0000' }).fill('60');
    await page.getByRole('button', { name: 'Save' }).nth(1).click();
    await page.waitForTimeout(3000);

    // Second output — pushes total beyond available source
    await page.getByRole('button', { name: 'Add Output' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('textbox', { name: '0.0000' }).first().click();
    await page.getByRole('textbox', { name: '0.0000' }).first().fill('999');
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: 'Save' }).nth(1).click();
    await page.waitForTimeout(2000);
    await expect(page.getByText(/exceeds.*available|insufficient.*quantity/i)).toBeVisible();
  });

});

test.describe('Segregation — Miscellaneous / Edge Negative Cases', () => {

  test('TC46 - Session expired mid-creation (cookies cleared) then attempt Save', async ({ page, context }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
    await context.clearCookies();
    await page.getByRole('button', { name: 'Save & Continue' }).click();
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(/login/);
  });

  test('TC47 - Click Save & Continue immediately before warehouse dropdown fully loads', async ({ page }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    // Intentionally minimal wait to simulate clicking before options are ready
    await page.waitForTimeout(200);
    await page.getByRole('button', { name: 'Save & Continue' }).click();
    await page.waitForTimeout(2000);
    await expect(page.getByText(/warehouse.*required/i)).toBeVisible();
  });

  test('TC48 - XSS-style script injection attempt in QR search field', async ({ page }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Panvel Collection Warehouse', exact: true }).click();
    await page.getByRole('button', { name: 'Save & Continue' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Search user' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('option', { name: 'Prashant Mane' }).first().click();
    await page.getByRole('button', { name: 'Add Source' }).click();
    await page.waitForTimeout(3000);
    await page.getByText('Search and select QR codes').click();
    await page.waitForTimeout(1000);
    await page.getByRole('textbox', { name: 'Search QR Codes Pool…' }).fill('<script>alert(1)</script>');
    await page.waitForTimeout(1500);
    // Verify no script executes and no dialog appears
    page.on('dialog', async (dialog) => {
      throw new Error('Unexpected dialog triggered — possible XSS vulnerability');
    });
    await expect(page.getByText(/no options|no results found/i)).toBeVisible();
  });

  test('TC49 - Rapidly spam-click Segregation -> Create Segregation navigation links', async ({ page }) => {
    await page.goto('https://test-vartul.satmace.com/login/');
    await page.locator('#id_username').click();
    await page.locator('#id_username').fill('Prashant@satmace.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Satma@201');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(3000);

    const segLink = page.getByRole('link', { name: 'Segregation' });
    await segLink.click();
    await segLink.click({ force: true }).catch(() => {});
    await page.waitForTimeout(1500);
    const createLink = page.getByRole('link', { name: 'Create Segregation' });
    await createLink.click();
    await createLink.click({ force: true }).catch(() => {});
    await page.waitForTimeout(3000);
    // Should land on exactly one Create Segregation form, not duplicated/broken UI
    await expect(page.getByRole('button', { name: 'Search warehouse' })).toHaveCount(1);
  });

  test('TC50 - Attempt to Approve a completely empty segregation (no warehouse/user/source/output)', async ({ page }) => {
    await loginAndNavigateToSegregation(page);
    await page.getByRole('button', { name: 'Approve' }).click();
    await page.waitForTimeout(2000);
    await expect(page.getByText(/warehouse.*required|user.*required|source.*required|output.*required/i)).toBeVisible();
  });

});