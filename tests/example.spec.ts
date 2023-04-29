import { test, expect } from '@playwright/test';
import { ViewCartPage } from '../pages/view-cart-page';
import { HomePage } from '../pages/home-page';
import { SignUpPage } from '../pages/sign-up-page';
import { ProductDetailsPage } from '../pages/product-details-page';
import { PaymentInfoPage } from '../pages/payment-info-page';
import { ContactUsPage } from '../pages/contact-us-page';
import { generateRandomUserData } from '../common-functions/common-functions';

test.beforeEach(async ({ page }) => {
  //By default navigates to sauce url since it's added in the config
  await page.goto('/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Automation Exercise/);
  await expect(page.getByText('Features Items')).toBeVisible();
});

test.afterEach(async ({ page }) => {
  // Clean up after test
  await page.close();
});


test.describe('Customer Experience', () => {

  test('User is on the Main Home Page and tries to add a product', async ({ page }) => {
    const USER_PASSWORD: string = 'Hello2023!'
    const email = generateRandomUserData().email;
    const name = generateRandomUserData().name;

    const homePage = new HomePage(page);
    const productDetails = new ProductDetailsPage(page)
    const viewCartPage = new ViewCartPage(page);
    const signUpPage = new SignUpPage(page);
    const paymentInfoPage = new PaymentInfoPage(page);
    const contactUsPage = new ContactUsPage(page);

    await homePage.clickRandomViewProductOption();
    const message = await productDetails.addToCartWithMessage('30');

    expect(message).toContain('Added!');

    await productDetails.clickViewCartLink();

    await viewCartPage.clickProceedCheckOutButton();

    await signUpPage.signUpUserFlow(USER_PASSWORD, email, name);

    await homePage.clickTheCartNavBar();

    await paymentInfoPage.reviewOrderAndPlaceComment(name);

    await homePage.userLogout();

    await signUpPage.loginToAccount(email, USER_PASSWORD);

    await contactUsPage.contactUsUserFlow(name, email);

    await homePage.userLogout();
  });
});
