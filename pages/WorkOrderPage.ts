// pages/WorkOrderPage.ts
import { Page } from '@playwright/test';
import { getTodayDateString } from '../utils/dateHelper';

export class WorkOrderPage {
  constructor(private page: Page) {}

  async openWorkOrderMenu() {
    await this.page.getByRole('link', { name: 'Work Order' }).click();
    await this.page.getByRole('link', { name: 'Create Work Order' }).click();
    await this.page.waitForTimeout(3000);
  }

  async selectWarehouse(warehouseName: string) {
    await this.page.getByRole('button', { name: 'Search warehouse' }).click();
    await this.page.getByRole('option', { name: warehouseName, exact: true }).click();
  }

  async selectOutputSku(searchTerm: string, optionLabel: string) {
    await this.page.getByRole('button', { name: 'Select SKU' }).click();
    await this.page.getByRole('textbox', { name: 'Search Output Stock Keeping' }).fill(searchTerm);
    await this.page.getByRole('option', { name: optionLabel }).click();
  }

  async selectBom(bomName: string) {
    await this.page.getByRole('button', { name: 'Select BOM (optional)' }).click();
    await this.page.getByRole('option', { name: bomName }).click();
  }

  async fillQuantity(quantity: string) {
    await this.page.getByRole('textbox', { name: '0.00' }).click();
    await this.page.getByRole('textbox', { name: '0.00' }).fill(quantity);
  }

  // Work Order form वर एकूण 4 date-picker inputs आहेत (index 1 ते 4), सर्वांमध्ये आजची तारीख भरायची आहे
  async fillAllDates() {
    const today = getTodayDateString();

    for (let i = 1; i <= 4; i++) {
      await this.page.locator('[data-test-id="dp-input"]').nth(i).click();
      await this.page.locator(`[data-test-id="dp-${today}"]`).click();
    }

    await this.page.waitForTimeout(3000);
  }

  async saveWorkOrder() {
    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.getByRole('button', { name: 'Save Process' }).click();
    await this.page.waitForTimeout(3000);
  }

  async selectMachine(machineName: string) {
    await this.page.getByRole('button', { name: 'Search machine' }).click();
    await this.page.getByRole('option', { name: machineName }).click();
    await this.page.waitForTimeout(3000);
  }

  async saveProcessAndFinalize() {
    await this.page.getByRole('button', { name: 'Save Process' }).click();
    await this.page.getByRole('button', { name: 'Save', exact: true }).click();
    await this.page.waitForTimeout(3000);
  }

  async approve() {
    await this.page.getByRole('button', { name: 'Approve' }).click();
    await this.page.waitForTimeout(3000);
  }

  // पूर्ण Work Order create करण्याचा संपूर्ण flow एकत्र (convenience method)
  async createWorkOrder(params: {
    warehouse: string;
    skuSearchTerm: string;
    skuOptionLabel: string;
    bom: string;
    quantity: string;
    machine: string;
  }) {
    await this.openWorkOrderMenu();
    await this.selectWarehouse(params.warehouse);
    await this.selectOutputSku(params.skuSearchTerm, params.skuOptionLabel);
    await this.selectBom(params.bom);
    await this.fillQuantity(params.quantity);
    await this.fillAllDates();
    await this.saveWorkOrder();
    await this.selectMachine(params.machine);
    await this.saveProcessAndFinalize();
    await this.approve();
  }
}