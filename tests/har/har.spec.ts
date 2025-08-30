import { test } from './../init/har.fixture'

test.describe('Sample UI test', () => {
  test('Capture network logs', { tag: '@HAR' }, async ({ page }) => {
   await page.goto('https://practicesoftwaretesting.com/');
   await page.getByTestId('product-01K3XVAC186N41F04M7H9D65KA').click();
   await page.getByTestId('add-to-favorites').click();
   await page.getByTestId('add-to-cart').click();
   await page.getByTestId('nav-cart').click();
   await page.getByTestId('nav-sign-in').click();
   await page.getByTestId('email').click();
   await page.getByTestId('email').fill('test');
   await page.getByTestId('email').press('Tab');
   await page.getByTestId('password').fill('test');
   await page.getByTestId('login-submit').click();
  })
})