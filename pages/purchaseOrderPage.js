export class PurchaseOrderPage {
    constructor(page) {
        this.page = page;
    }

    async createHeader() {
        await this.page.goto('https://test-vartul.satmace.com/app/');
        await this.page.getByRole('link', { name: 'Purchase Order' }).click();
        await this.page.getByRole('link', { name: 'Create Purchase Order' }).click();

        // Warehouse
this.searchWarehouseBtn = page.locator("//button[.//span[text()='Search warehouse']]");
this.searchWarehouseTxt = page.locator("//input[@placeholder='Search Warehouse…']");
this.mumbaiWarehouse = page.locator("//div[contains(text(),'Mumbai Warehouse')]");

// Currency
this.searchCurrencyBtn = page.locator("//button[contains(.,'Search currency')]");
this.searchCurrencyTxt = page.locator("//input[contains(@placeholder,'Search Currency')]");
this.inrOption = page.locator("//div[contains(text(),'INR')]");

// Partner
this.searchPartnerBtn = page.locator("//button[contains(.,'Search partner')]");
this.searchPartnerTxt = page.locator("//input[contains(@placeholder,'Search Trade Partner')]");
this.prashantOption = page.locator("//div[contains(text(),'Prashant')]");

// Save
this.saveBtn = page.locator("//button[contains(.,'Save')]");
    }

    async addItem(quantity, rate) {
        await this.page.getByRole('button', { name: 'Add Line Item' }).click();

        await this.page.getByRole('button', {
            name: /Select BIN|QR BIN/
        }).click();

        await this.page.getByRole('button', {
            name: 'Search BIN…'
        }).click();

        await this.page
            .getByRole('textbox', {
                name: 'Search Select BIN…'
            })
            .fill('qr');

        await this.page
            .getByRole('option', {
                name: 'QR BIN',
                exact: true
            })
            .click();

        await this.page.getByRole('button', {
            name: 'Search SKU…'
        }).click();

        await this.page
            .getByRole('textbox', {
                name: 'Search Select SKU…'
            })
            .fill('pani');

        await this.page
            .getByRole('option', {
                name: 'Pani | Glass | Loose'
            })
            .click();

        await this.page.getByRole('button', {
            name: 'Save'
        }).last().click();

        await this.page.locator('input[name="quantity"]').last().fill(quantity.toString());

        await this.page.locator('input[name="rate"]').last().fill(rate.toString());

        await this.page.getByRole('button', {
            name: 'Search tax group'
        }).last().click();

        await this.page.getByRole('option', {
            name: 'GST 18%'
        }).click();

        await this.page.getByRole('button', {
            name: 'Save'
        }).first().click();
    }

    async approvePO() {
        await this.page.getByRole('button', {
            name: 'Approve'
        }).click();

        await this.page.getByRole('button', {
            name: 'Transform to Receipt'
        }).click();

        await this.page.getByRole('button', {
            name: 'Approve'
        }).click();

        await this.page.getByRole('button', {
            name: 'Transform to Bill'
        }).click();

        await this.page.getByRole('button', {
            name: 'Approve'
        }).click();
    }
}