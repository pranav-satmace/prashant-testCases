// tests/Login/purchaseOrder.spec.js
import { test, expect } from '@playwright/test';
import { PurchaseOrderPage } from '../../pages/purchaseOrderPage';

test('Create Purchase Order', async ({ page }) => {
  const po = new PurchaseOrderPage(page);

  // Create multiple items for the loop
  const items = [];
  for (let i = 1; i <= 1000; i++) {
    items.push({
      binSearch: 'qr',
      binOption: 'QR BIN',
      skuSearch: 'pani',
      skuOption: 'Pani | Glass | Loose',
      quantity: 100,
      rate: 10,
      taxGroup: 'GST 18%'
    });
  }

  // Create Purchase Order with all items
  await po.createPurchaseOrder({
    warehouse: 'Mumbai Warehouse',
    currency: 'INR',
    partner: 'Prashant',
    items: items
  });

  await expect(page.getByText('Purchase Order created successfully')).toBeVisible();
});