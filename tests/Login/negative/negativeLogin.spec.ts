// tests/negative/negativeLogin.spec.ts
// 100 invalid credential combinations सह login attempt करतो.
// Assertion: login फेल झाल्यास user अजूनही /login/ page वर राहतो (URL मध्ये redirect होत नाही).
//
// टीप: तुमच्या app मध्ये specific error message (उदा. "Invalid credentials") दिसत असेल,
// तर खालील assertion अजून strict करता येईल — त्यासाठी त्या error text चा locator मला द्या.

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/login'; 
import { negativeLoginCases } from '../../../utils/negativeLoginData';

test.describe('Negative - Login with invalid credentials (100 invalid combinations)', () => {
  for (const data of negativeLoginCases) {
    test(`NEG-${String(data.caseId).padStart(3, '0')}: ${data.description}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

    //   await loginPage.goto();
      await loginPage.login(data.username, data.password);

      // Login फेल झाल्यास user login page वरच राहायला हवा (dashboard वर redirect नाही)
      await expect(page).toHaveURL(/\/login\//);
    });
  }
});