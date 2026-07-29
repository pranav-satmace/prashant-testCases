import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login';
import { loginData } from './test-data/loginData.js';

for (const data of loginData) {
    test(`Login Negative Test - ${data.testCase}`, async ({ page }) => {

        const login = new LoginPage(page);

        await login.login(
            data.username,
            data.password
        );

        // Verify login failed
        await expect(page).toHaveURL(/login/);

        // Optional Error Message
        // await expect(page.locator('.error')).toBeVisible();
    });
}