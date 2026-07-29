import { test } from '@playwright/test';

test('Create Purchase Order with 2000 line items loop', async ({ page }) => {

  // ✅ Unlimited timeout
  test.setTimeout(0);

  // ─── LOGIN ───────────────────────────────────────────────────────────────
  await page.goto('https://test-vartul.satmace.com/login/');
  await page.locator('#id_username').fill('Prashant@satmace.com');
  await page.locator('#id_username').press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('Satma@201');
  await page.getByRole('button', { name: 'Login' }).click();

  // ─── NAVIGATE TO CREATE PURCHASE ORDER ───────────────────────────────────
  await page.getByRole('link', { name: 'Purchase Order' }).click();
  await page.getByRole('link', { name: 'Create Purchase Order' }).click();
  await page.waitForTimeout(3000);

  // ─── FILL HEADER DETAILS ─────────────────────────────────────────────────
  await page.getByRole('button', { name: 'Search warehouse' }).click();
  await page.getByRole('option', { name: 'Panvel Collection Warehouse' }).click();

  await page.getByRole('button', { name: 'Search currency' }).click();
  await page.getByRole('option', { name: 'INR' }).click();

  await page.getByRole('button', { name: 'Search partner' }).click();
  await page.getByRole('option', { name: 'Shant', exact: true }).click();
  await page.waitForTimeout(1000);

  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(1000);

  // ─── LINE ITEM 1 (एकदाच) ─────────────────────────────────────────────────
  await page.getByRole('button', { name: 'Add Line Item' }).click();
  await page.getByRole('button', { name: 'Select BIN — Select SKU' }).click();

  await page.getByRole('button', { name: 'Search BIN…' }).click();
  await page.getByRole('option', { name: 'QR BIN', exact: true }).click();

  await page.getByRole('button', { name: 'Search SKU…' }).click();
  await page.getByRole('option', { name: 'HD Item 2 | HD | Loose' }).click();

  await page.getByRole('button', { name: 'Save' }).nth(2).click();
  await page.waitForTimeout(500);

  await page.locator('input[name="quantity"]').first().fill('100');
  await page.locator('input[name="quantity"]').first().press('Tab');
  await page.locator('input[name="rate"]').first().fill('10');

  await page.getByRole('button', { name: 'Search tax group' }).click();
  await page.getByRole('option', { name: 'GST 18%' }).click();

  await page.getByRole('button', { name: 'Save' }).first().click();
  await page.waitForTimeout(1000);

  // ─── HELPER: शेवटच्या row मध्ये qty आणि rate fill ────────────────────────
  const fillLastRowQtyRate = async (qty, rate) => {
    const qtyInputs = page.locator('input[name="quantity"]');
    const rateInputs = page.locator('input[name="rate"]');

    const qtyCount = await qtyInputs.count();
    const rateCount = await rateInputs.count();

    // Scroll to last row before filling
    await qtyInputs.nth(qtyCount - 1).scrollIntoViewIfNeeded();
    await qtyInputs.nth(qtyCount - 1).click();
    await qtyInputs.nth(qtyCount - 1).fill(qty);
    await qtyInputs.nth(qtyCount - 1).press('Tab');

    await rateInputs.nth(rateCount - 1).scrollIntoViewIfNeeded();
    await rateInputs.nth(rateCount - 1).click();
    await rateInputs.nth(rateCount - 1).fill(rate);
  };

  // ─── LOOP: 2000 वेळा LINE ITEMS ──────────────────────────────────────────
  for (let i = 1; i <= 2000; i++) {
    console.log(`Loop iteration: ${i} / 2000`);

    // ── ADD LINE ITEM ──────────────────────────────────────────────────────
    // Add Line Item button scroll into view before clicking
    const addBtn = page.getByRole('button', { name: 'Add Line Item' });
    await addBtn.scrollIntoViewIfNeeded();
    await addBtn.click();
    await page.waitForTimeout(300);

    // ── SELECT BIN/SKU ────────────────────────────────────────────────────
    const binSku1 = page.getByRole('button', { name: /QR BIN — Select SKU/ });
    await binSku1.last().scrollIntoViewIfNeeded();
    await binSku1.last().click();
    
    await page.getByRole('button', { name: 'Search SKU…' }).click();
    await page.getByRole('option', { name: 'HD Item 2 | HD | Loose' }).click();

    const saveBtn = page.getByRole('button', { name: 'Save' }).last();
    await saveBtn.scrollIntoViewIfNeeded();
    await saveBtn.click();
    await page.waitForTimeout(500);

    // ✅ qty: i (1, 2, 3...), rate: 10 (सगळ्यांसाठी 10)
    await fillLastRowQtyRate(i.toString(), '10');

    const saveBtns2 = page.getByRole('button', { name: 'Save' });
    const saveBtnCount = await saveBtns2.count();
    await saveBtns2.nth(saveBtnCount - 2).scrollIntoViewIfNeeded();
    await saveBtns2.nth(saveBtnCount - 2).click();
    await page.waitForTimeout(500);

    // Progress log every 50 iterations
    if (i % 50 === 0) {
      console.log(`📊 Progress: ${i}/2000 line items added`);
    }
  }

  console.log('✅ 2000 iterations पूर्ण झाल्या!');
});