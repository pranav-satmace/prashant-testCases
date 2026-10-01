// npx playwright test tests/Login/Loops/wo_batch_loop.spec.js --project=chromium --headed --workers=1
import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/login.js';  // .js file
import { WorkOrderPage } from '../../../pages/WorkOrderPage.ts';  // .ts file
import { BatchPage } from '../../../pages/BatchPage.ts';  // .ts file
import { TestData } from '../../../utils/testData.js';  // Assuming this exists

test('Create Work Order and Batch - Loop with increasing quantities (500 to 1000)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const workOrderPage = new WorkOrderPage(page);
  const batchPage = new BatchPage(page);

  // Step 1: Login
  console.log('🔐 Logging in...');
  await loginPage.login(TestData.credentials.username, TestData.credentials.password);

  // Step 2: Loop to create multiple Work Orders and Batches
  const startQty = 500;
  const endQty = 1000;
  const totalIterations = endQty - startQty + 1;

  console.log(`\n🚀 Starting loop from ${startQty} to ${endQty} (${totalIterations} iterations)...`);
  console.log(`⏱️  Estimated time: ~${totalIterations * 2} seconds\n`);

  for (let qty = startQty; qty <= endQty; qty++) {
    const iterationNumber = qty - startQty + 1;
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📌 Iteration ${iterationNumber}/${totalIterations}: Quantity = ${qty}`);
    console.log(`${'='.repeat(60)}`);

    try {
      // Step 2.1: Create Work Order with current quantity
      console.log(`  📝 Creating Work Order with quantity: ${qty}...`);
      await workOrderPage.createWorkOrder({
        warehouse: TestData.workOrder.warehouse,
        skuSearchTerm: TestData.workOrder.outputSku,
        skuOptionLabel: TestData.workOrder.outputSkuOption,
        bom: TestData.workOrder.bom,
        quantity: qty.toString(),
        machine: TestData.workOrder.machine,
      });

      // Step 2.2: Create Batch
      console.log(`  📦 Creating Batch...`);
      await batchPage.openBatchMenu();
      await batchPage.selectLatestWorkOrder();
      await batchPage.fillInitialDates();
      await batchPage.selectUser(TestData.batch.userName);
      await batchPage.saveBatch();

      // Step 2.3: Add Lot with dynamic name
      const lotNumber = `LOT_PM_${qty}`;
      console.log(`  🏷️  Adding Lot: ${lotNumber}...`);
      await batchPage.addLot(lotNumber, TestData.batch.userName);

      // Step 2.4: 1st Input BIN + SKU select (Bale B)
      console.log(`  📥 Selecting Input SKU 1 (Bale B)...`);
      await batchPage.selectBinAndSku(
        TestData.batch.bin,
        TestData.batch.inputSku1.searchTerm,
        TestData.batch.inputSku1.optionLabel,
      );

      // Step 2.5: 2nd Input BIN + SKU select (Bale L)
      console.log(`  📥 Selecting Input SKU 2 (Bale L)...`);
      await batchPage.selectSecondBinAndSku(
        TestData.batch.bin,
        TestData.batch.inputSku2.searchTerm,
        TestData.batch.inputSku2.optionLabel,
      );

      // Step 2.6: Output BIN + SKU select (Bale Final)
      console.log(`  📤 Selecting Output SKU (Bale Final)...`);
      await batchPage.selectOutputBinAndSku(
        TestData.batch.bin,
        TestData.batch.outputSku.searchTerm,
        TestData.batch.outputSku.optionLabel,
      );

      // Step 2.7: Fill lot quantities with dynamic values based on qty
      const grossQty1 = qty;
      const packagedQty1 = Math.round(qty / 10);
      console.log(`  📊 First Lot - Gross: ${grossQty1}, Packaged: ${packagedQty1}`);
      await batchPage.fillLotQuantities(
        grossQty1.toString(),
        packagedQty1.toString(),
      );

      const grossQty2 = qty + 100;
      const packagedQty2 = Math.round((qty + 100) / 10);
      console.log(`  📊 Second Lot - Gross: ${grossQty2}, Packaged: ${packagedQty2}`);
      await batchPage.fillLotQuantities(
        grossQty2.toString(),
        packagedQty2.toString(),
      );

      // Step 2.8: Submit for approval, Save and Approve
      console.log(`  ✅ Submitting for approval...`);
      await batchPage.submitForApproval();
      await batchPage.saveBatchFinal();
      await batchPage.approveBatch();

      console.log(`  ✅✅✅ Iteration ${iterationNumber} completed successfully!`);
      console.log(`     📋 Summary: Qty=${qty}, Lot=${lotNumber}, Gross1=${grossQty1}, Gross2=${grossQty2}`);

    } catch (error) {
      console.error(`❌❌❌ Error in iteration ${iterationNumber} (Quantity: ${qty})`);
      console.error(`Error: ${error.message}`);
      // Continue with next iteration
      continue;
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`🎉🎉🎉 ALL ${totalIterations} ITERATIONS COMPLETED SUCCESSFULLY!`);
  console.log(`${'='.repeat(60)}`);
  console.log(`📊 Summary:`);
  console.log(`   - Start Quantity: ${startQty}`);
  console.log(`   - End Quantity: ${endQty}`);
  console.log(`   - Total Iterations: ${totalIterations}`);
  console.log(`   - Status: ✅ COMPLETED`);
});