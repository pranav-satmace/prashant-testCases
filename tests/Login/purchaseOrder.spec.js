import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login.js';
import { PurchaseOrderPage } from '../../pages/purchaseOrderPage.js';

test('Create Purchase Order', async ({ page }) => {
    const login = new LoginPage(page);
    const po = new PurchaseOrderPage(page);

    await login.login(
        'Prashant@satmace.com',
        'Satma@201'
    );

    await po.createHeader();

    for (let i = 1; i <= 1000; i++) {
        await po.addItem(100, 10);
    }

    await po.approvePO();
});