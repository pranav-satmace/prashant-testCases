import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login';

test('Valid Login', async ({ page }) => {

    const login = new LoginPage(page);

    await login.login(
        'Prashant@satmace.com',
        'Satma@201'
    );

    await expect(page).not.toHaveURL(/login/);
});