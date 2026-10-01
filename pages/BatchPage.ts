import { Page } from '@playwright/test';
import { getTodayDateString } from '../utils/dateHelper';

export class BatchPage {
  constructor(private page: Page) {}

  async openBatchMenu() {
    await this.page.getByRole('link', { name: 'Batch' }).click();
    await this.page.getByRole('link', { name: 'Create Batch' }).click();
  }

  async selectLatestWorkOrder() {
    await this.page.getByRole('button', { name: 'Search work order number' }).click();
    await this.page.locator('[role="option"]').first().click();
  }

  // ✅ FIX: .first() added for duplicate date elements
  async fillInitialDates() {
    const today = getTodayDateString();

    for (let i = 0; i <= 3; i++) {
      await this.page.locator('[data-test-id="dp-input"]').nth(i).click();
      await this.page.locator(`[data-test-id="dp-${today}"]`).first().click();
    }
  }

  async selectUser(userName: string) {
    await this.page.getByRole('button', { name: 'Search user' }).click();
    await this.page.getByRole('option', { name: userName }).first().click();
  }

  async saveBatch() {
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  // ✅ FIX: .first() added for duplicate date elements
  async addLot(lotNumber: string, userName: string) {
    await this.page.getByRole('button', { name: 'Add Lot' }).click();
    await this.page.getByRole('textbox', { name: 'e.g. LOT-' }).click();
    await this.page.getByRole('textbox', { name: 'e.g. LOT-' }).fill(lotNumber);

    const today = getTodayDateString();
    await this.page.locator('[data-test-id="dp-input"]').nth(4).click();
    await this.page.locator(`[data-test-id="dp-${today}"]`).first().click();

    await this.selectUser(userName);
    await this.page.getByRole('button', { name: 'Save' }).nth(1).click();
  }

  // ✅ FIX: Added waitFor and increased timeout for 'Select' button
  async selectBinAndSku(binName: string, skuSearchTerm: string, skuOptionLabel: string, useDoubleClickOnOption = false) {
    await this.page.getByRole('button', { name: 'Select BIN — Select SKU' }).click();
    await this.page.getByRole('button', { name: 'Search BIN…' }).click();
    await this.page.getByRole('option', { name: binName, exact: true }).click();

    await this.page.getByRole('button', { name: 'Search SKU…' }).click();
    await this.page.getByRole('textbox', { name: 'Search Select SKU…' }).fill(skuSearchTerm);
    await this.page.waitForTimeout(1000);

    if (useDoubleClickOnOption) {
      await this.page.getByRole('option', { name: skuOptionLabel }).dblclick();
    } else {
      await this.page.getByRole('option', { name: skuOptionLabel }).click();
    }

    await this.page.waitForTimeout(2000);

    const selectButton = this.page.getByRole('button', { name: 'Select' }).nth(2);
    await selectButton.waitFor({ state: 'visible', timeout: 10000 });
    await selectButton.click({ timeout: 10000 });

    await this.page.locator('.w-10.h-10.flex.items-center.justify-center.rounded-lg.border-2').click();
  }

  // ✅ FIX: Added waitFor and increased timeout for 'Select' button
  async selectSecondBinAndSku(binName: string, skuSearchTerm: string, skuOptionLabel: string) {
    await this.page.getByRole('button', { name: 'Select BIN — Select SKU' }).click();
    await this.page.getByRole('button', { name: 'Search SKU…' }).click();
    await this.page.getByRole('button', { name: 'Search BIN…' }).click();
    await this.page.getByRole('textbox', { name: 'Search Select BIN…' }).click();
    await this.page.getByRole('option', { name: binName, exact: true }).click();

    await this.page.getByRole('button', { name: 'Search SKU…' }).click();
    await this.page.getByRole('textbox', { name: 'Search Select SKU…' }).fill(skuSearchTerm);
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('option', { name: skuOptionLabel }).dblclick();
    await this.page.waitForTimeout(2000);

    const selectButton = this.page.getByRole('button', { name: 'Select' }).nth(2);
    await selectButton.waitFor({ state: 'visible', timeout: 10000 });
    await selectButton.click({ timeout: 10000 });

    await this.page.locator('.w-10.h-10.flex.items-center.justify-center.rounded-lg.border-2').click();
  }

  async selectOutputBinAndSku(binName: string, skuSearchTerm: string, skuOptionLabel: string) {
    await this.page.getByRole('button', { name: 'Output' }).dblclick();
    await this.page.getByRole('button', { name: 'Select BIN — Select SKU' }).click();
    await this.page.getByRole('button', { name: 'Search BIN…' }).click();
    await this.page.getByRole('option', { name: binName, exact: true }).click();

    await this.page.getByRole('button', { name: 'Search SKU…' }).click();
    await this.page.getByRole('textbox', { name: 'Search Select SKU…' }).fill(skuSearchTerm);
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('option', { name: skuOptionLabel }).click();
    await this.page.waitForTimeout(2000);

    await this.page.getByRole('button', { name: 'Save' }).nth(1).click();
    await this.page.waitForTimeout(2000);
  }

  async fillLotQuantities(grossQuantity: string, packagedQuantity: string) {
    await this.page.locator('input[name="gross_quantity"]').click();
    await this.page.waitForTimeout(3000);
    await this.page.locator('input[name="gross_quantity"]').fill(grossQuantity);

    await this.page.locator('input[name="packaged_quantity"]').click();
    await this.page.locator('input[name="packaged_quantity"]').fill(packagedQuantity);

    await this.page.locator('.w-10').click();
    await this.page.waitForTimeout(3000);
  }

  async submitForApproval() {
    await this.page
      .locator('.flex-1.flex.items-center.justify-center.gap-1.text-xs.py-1\\.5.rounded-md.border.border-primary-500')
      .click();
    await this.page.waitForTimeout(3000);
  }

  async saveBatchFinal() {
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForTimeout(5000);
  }

  async approveBatch() {
    await this.page.getByRole('button', { name: 'Approve' }).click();
  }
}