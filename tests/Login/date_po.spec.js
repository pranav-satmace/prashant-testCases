import { test, expect } from '@playwright/test';

// Loop: date 1 te 9 sathi (2026-07-01 te 2026-07-09) PO + Receipt flow run hoil
for (let day = 1; day <= 9; day++) {
  const dateId = `dp-2026-07-0${day}`;

  test(`PO and Receipt flow - date ${day}`, async ({ page }) => {
    await page.goto('http://192.168.1.16:5000/login/');
    await page.locator('#id_username').fill('Prashant@satmace.com');
    await page.locator('#id_username').press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('Satma@201');
    await page.getByRole('textbox', { name: 'Password' }).press('Enter');
    await page.waitForTimeout(1000);

    // ---------------- Create Purchase Order ----------------
    await page.getByRole('link', { name: 'Purchase Order' }).click();
    await page.getByRole('link', { name: 'Create Purchase Order' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.getByRole('option', { name: 'PGM Warehouse' }).click();
    await page.locator('[data-test-id="dp-input"]').click();
    await page.locator(`[data-test-id="${dateId}"]`).getByText(String(day)).click();
    await page.getByRole('button', { name: 'Search currency' }).click();
    await page.getByRole('option', { name: 'INR' }).click();
    await page.getByRole('button', { name: 'Search partner' }).click();
    await page.getByRole('option', { name: 'PGM Trade Partner' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Add Line Item' }).click();
    await page.getByRole('button', { name: 'Select BIN — Select SKU' }).click();
    await page.getByRole('button', { name: 'Search BIN…' }).click();
    await page.getByRole('option', { name: 'QR BIN' }).click();
    await page.getByRole('button', { name: 'Search SKU…' }).click();
    await page.getByRole('textbox', { name: 'Search Select SKU…' }).fill('test');
    await page.getByRole('option', { name: 'PGM Test 10 |' }).click();
    await page.getByRole('button', { name: 'Save' }).nth(2).click();
    await page.locator('input[name="quantity"]').click();
    await page.locator('input[name="quantity"]').fill('100');
    await page.locator('input[name="quantity"]').press('Tab');
    await page.locator('input[name="rate"]').fill('10');
    await page.getByRole('button', { name: 'Search tax group' }).click();
    await page.getByRole('option', { name: 'Gst 12%' }).click();
    await page.getByRole('button', { name: 'Save' }).first().click();
    await page.getByRole('button', { name: 'Save' }).nth(1).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Approve' }).click();
    await page.waitForTimeout(1000);

    // ---------------- Purchase Receipt (import via approved PO number search) ----------------
    await page.getByRole('link', { name: 'Purchase Receipt' }).click();
    await page.getByRole('link', { name: 'Create Purchase Receipt' }).click();
    await page.locator('[data-test-id="dp-input"]').click();
    await page.locator(`[data-test-id="${dateId}"]`).getByText(String(day)).click();
    await page.getByRole('button', { name: 'Search warehouse' }).click();
    await page.getByRole('option', { name: 'PGM Warehouse' }).click();
    await page.getByRole('button', { name: 'Search trade partner' }).click();
    await page.getByRole('option', { name: 'PGM Trade Partner' }).click();
    await page.getByRole('button', { name: 'Save' }).click();

    // 'Search approved PO' dropdown open kara
    await page.getByRole('button', { name: 'Search approved PO' }).click();

    // Hardcoded '16' cha jagi: dropdown madhla je option sarwat war/highlighted asel te
    // keyboard ne select karto - kontahi PO number create zala tari chalel
    const approvedPoOptions = page.getByRole('option');
    await approvedPoOptions.first().waitFor({ state: 'visible' });
    await page.keyboard.press('ArrowDown'); // pahilya option la highlight karto
    await page.keyboard.press('Enter');     // Space peksha Enter jasta reliable asto dropdown select sathi
    // Jar Space ne select karaycha asel tar varchi 2 line kadhun khali wapra:
    // await page.keyboard.press('Space');

    await page.getByRole('button', { name: 'Import Lines' }).click();
    await page.getByRole('button', { name: 'Save' }).nth(1).click();
    await page.getByRole('button', { name: 'Approve' }).click();
  });
}