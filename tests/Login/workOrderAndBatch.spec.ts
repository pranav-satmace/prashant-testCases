// npx playwright test tests/Login/wo_batch.spec.js --project=chromium --headed --workers=1
import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login';
import { WorkOrderPage } from '../../pages/WorkOrderPage';
import { BatchPage } from '../../pages/BatchPage';
import { TestData } from '../../utils/testData';

test('Create Work Order and Batch - end to end flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const workOrderPage = new WorkOrderPage(page);
  const batchPage = new BatchPage(page);

  // Step 1: Login
//   await loginPage.goto();
  await loginPage.login(TestData.credentials.username, TestData.credentials.password);

  // Step 2: Work Order create and approve 
  await workOrderPage.createWorkOrder({
    warehouse: TestData.workOrder.warehouse,
    skuSearchTerm: TestData.workOrder.outputSku,
    skuOptionLabel: TestData.workOrder.outputSkuOption,
    bom: TestData.workOrder.bom,
    quantity: TestData.workOrder.quantity,
    machine: TestData.workOrder.machine,
  });

  // Step 3: Batch create 
  await batchPage.openBatchMenu();
  await batchPage.selectLatestWorkOrder();
  await batchPage.fillInitialDates();
  await batchPage.selectUser(TestData.batch.userName);
  await batchPage.saveBatch();

  // Step 4: Lot add 
  await batchPage.addLot(TestData.batch.lotNumber, TestData.batch.userName);

  // Step 5: 1st Input BIN + SKU selecte (Bale B)
  await batchPage.selectBinAndSku(
    TestData.batch.bin,
    TestData.batch.inputSku1.searchTerm,
    TestData.batch.inputSku1.optionLabel,
  );

  // Step 6: 2nd Input BIN + SKU selecte (Bale L)
  await batchPage.selectSecondBinAndSku(
    TestData.batch.bin,
    TestData.batch.inputSku2.searchTerm,
    TestData.batch.inputSku2.optionLabel,
  );

  // Step 7: Output BIN + SKU selecte (Bale Final)
  await batchPage.selectOutputBinAndSku(
    TestData.batch.bin,
    TestData.batch.outputSku.searchTerm,
    TestData.batch.outputSku.optionLabel,
  );

  // Step 8: 1st Lot quantity fill
  await batchPage.fillLotQuantities(
    TestData.batch.lot1.grossQuantity,
    TestData.batch.lot1.packagedQuantity,
  );

  // Step 9: 2nd Lot quantity fill
  await batchPage.fillLotQuantities(
    TestData.batch.lot2.grossQuantity,
    TestData.batch.lot2.packagedQuantity,
  );

  // Step 10: Submit for approval, Save and Approve 
  await batchPage.submitForApproval();
  await batchPage.saveBatchFinal();
  await batchPage.approveBatch();
});