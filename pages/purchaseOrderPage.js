// pages/purchaseOrderPage.js

export class PurchaseOrderPage {
  constructor(page) {
    this.page = page;
  }

  async openPurchaseOrderMenu() {
    await this.page.goto('https://test-vartul.satmace.com/app/');
    await this.page.getByRole('link', { name: 'Purchase Order' }).click();
    await this.page.getByRole('link', { name: 'Create Purchase Order' }).click();
    await this.page.waitForTimeout(3000);
  }

  async selectWarehouse(warehouseName) {
    await this.page.getByRole('button', { name: 'Search warehouse' }).click();
    await this.page.getByRole('option', { name: warehouseName, exact: true }).click();
    await this.page.waitForTimeout(1000);
  }

  async selectCurrency(currency) {
    await this.page.getByRole('button', { name: 'Search currency' }).click();
    await this.page.getByRole('option', { name: currency, exact: true }).click();
    await this.page.waitForTimeout(1000);
  }

  async selectPartner(partnerName) {
    await this.page.getByRole('button', { name: 'Search partner' }).click();
    await this.page.getByRole('option', { name: partnerName, exact: true }).click();
    await this.page.waitForTimeout(1000);
  }

  async addLineItem(params) {
    // Click Add Line Item
    await this.page.getByRole('button', { name: 'Add Line Item' }).click();

    // Select BIN
    await this.page.getByRole('button', { name: /Select BIN|QR BIN/ }).click();
    await this.page.getByRole('button', { name: 'Search BIN…' }).click();
    await this.page.getByRole('textbox', { name: 'Search Select BIN…' }).fill(params.binSearch);
    await this.page.getByRole('option', { name: params.binOption, exact: true }).click();

    // Select SKU
    await this.page.getByRole('button', { name: 'Search SKU…' }).click();
    await this.page.getByRole('textbox', { name: 'Search Select SKU…' }).fill(params.skuSearch);
    await this.page.getByRole('option', { name: params.skuOption }).click();

    // Save line item
    await this.page.getByRole('button', { name: 'Save' }).last().click();

    // Fill quantity and rate
    await this.page.locator('input[name="quantity"]').last().fill(params.quantity.toString());
    await this.page.locator('input[name="rate"]').last().fill(params.rate.toString());

    // Select tax group
    await this.page.getByRole('button', { name: 'Search tax group' }).last().click();
    await this.page.getByRole('option', { name: params.taxGroup }).click();

    // Final save
    await this.page.getByRole('button', { name: 'Save' }).first().click();
    await this.page.waitForTimeout(2000);
  }

  async savePurchaseOrder() {
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.waitForTimeout(3000);
  }

  async approvePO() {
    await this.page.getByRole('button', { name: 'Approve' }).click();
    await this.page.waitForTimeout(2000);
  }

  async transformToReceipt() {
    await this.page.getByRole('button', { name: 'Transform to Receipt' }).click();
    await this.page.waitForTimeout(2000);
  }

  async transformToBill() {
    await this.page.getByRole('button', { name: 'Transform to Bill' }).click();
    await this.page.waitForTimeout(2000);
  }

  async approveAndTransform() {
    await this.approvePO();
    await this.transformToReceipt();
    await this.approvePO();
    await this.transformToBill();
    await this.approvePO();
    await this.page.waitForTimeout(3000);
  }

  // Complete Purchase Order creation flow (convenience method)
  async createPurchaseOrder(params) {
    await this.openPurchaseOrderMenu();
    await this.selectWarehouse(params.warehouse);
    await this.selectCurrency(params.currency);
    await this.selectPartner(params.partner);

    for (const item of params.items) {
      await this.addLineItem(item);
    }

    await this.savePurchaseOrder();
    await this.approveAndTransform();
  }
}