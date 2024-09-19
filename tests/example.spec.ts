import { test, expect } from '@playwright/test';
import {
    story as allureStory,
    description as allureDescription,
    label as allureLabel,
    feature as allureFeature,
    epic as allureEpic
} from 'allure-js-commons';
import { ViewCartPage } from '../pages/view-cart-page';
import { HomePage } from '../pages/home-page';
import { SignUpPage } from '../pages/sign-up-page';
import { ProductDetailsPage } from '../pages/product-details-page';
import { PaymentInfoPage } from '../pages/payment-info-page';
import { ContactUsPage } from '../pages/contact-us-page';
import { generateRandomUserData } from '../common-functions/common-functions';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(page.getByText('Features Items')).toBeVisible();
});


test.describe('Customer Experience', () => {
    test('User is on the Main Home Page and tries to add a product', async ({ page }) => {
        const USER_PASSWORD: string = 'Hello2023!';
        const email = generateRandomUserData().email;
        const name = generateRandomUserData().name;

        const homePage = new HomePage(page);
        const productDetails = new ProductDetailsPage(page);
        const viewCartPage = new ViewCartPage(page);
        const signUpPage = new SignUpPage(page);
        const paymentInfoPage = new PaymentInfoPage(page);
        const contactUsPage = new ContactUsPage(page);

        allureEpic('Customer Experience');
        allureFeature('Adding Product to Cart and Completing Purchase');
        allureStory('User is able to add a product, checkout, and perform various actions');
        allureDescription('Test verifies that a user can add a product to the cart, proceed through checkout, and perform actions like logging in and contacting support.');
        allureLabel('environment', process.env.ENV || 'staging');
        allureLabel('browser', process.env.BROWSER || 'chromium');
        allureLabel('jira', 'https://jira.example.com/browse/PROJECT-123');

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
