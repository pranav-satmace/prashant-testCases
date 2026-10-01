// npx playwright test tests/Login/positive/positiveWorkOrderBatch.spec.ts --project=chromium --headed
// 100 वेगवेगळ्या valid data-combinations सह पूर्ण Work Order + Batch flow run करतो.
// प्रत्येक test terminal मध्ये स्वतंत्र ओळीत दिसेल आणि HTML report मध्ये स्वतंत्र entry असेल.

import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/login';
import { WorkOrderPage } from '../../../pages/WorkOrderPage';
import { BatchPage } from '../../../pages/BatchPage';
import { TestData } from '../../../utils/testData';
import { positiveTestCases } from '../../../utils/positiveTestData';

test.describe('Positive - Work Order & Batch Creation (100 valid data combinations)', () => {
  for (const data of positiveTestCases) {
    test(`POS-${String(data.caseId).padStart(3, '0')}: valid quantity=${data.quantity}, lot=${data.lotNumber}`, async ({
      page,
    }) => {
      const loginPage = new LoginPage(page);
      const workOrderPage = new WorkOrderPage(page);
      const batchPage = new BatchPage(page);

    //   await loginPage.goto();
      await loginPage.login(TestData.credentials.username, TestData.credentials.password);

      await workOrderPage.createWorkOrder({
        warehouse: TestData.workOrder.warehouse,
        skuSearchTerm: TestData.workOrder.outputSku,
        skuOptionLabel: TestData.workOrder.outputSkuOption,
        bom: TestData.workOrder.bom,
        quantity: data.quantity,
        machine: TestData.workOrder.machine,
      });

      await batchPage.openBatchMenu();
      await batchPage.selectLatestWorkOrder();
      await batchPage.fillInitialDates();
      await batchPage.selectUser(TestData.batch.userName);
      await batchPage.saveBatch();

      await batchPage.addLot(data.lotNumber, TestData.batch.userName);

      await batchPage.selectBinAndSku(
        TestData.batch.bin,
        TestData.batch.inputSku1.searchTerm,
        TestData.batch.inputSku1.optionLabel,
      );

      await batchPage.selectSecondBinAndSku(
        TestData.batch.bin,
        TestData.batch.inputSku2.searchTerm,
        TestData.batch.inputSku2.optionLabel,
      );

      await batchPage.selectOutputBinAndSku(
        TestData.batch.bin,
        TestData.batch.outputSku.searchTerm,
        TestData.batch.outputSku.optionLabel,
      );

      await batchPage.fillLotQuantities(data.lot1Gross, data.lot1Packaged);
      await batchPage.fillLotQuantities(data.lot2Gross, data.lot2Packaged);

      await batchPage.submitForApproval();
      await batchPage.saveBatchFinal();
      await batchPage.approveBatch();
    });
  }
});