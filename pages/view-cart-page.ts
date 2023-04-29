import { Page } from '@playwright/test';
import { ViewCartLocators } from '../locators/view-cart-page-locator';

export class ViewCartPage {
    private readonly page: Page;
    private readonly locators: ViewCartLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = new ViewCartLocators();
    }

    async clickProceedCheckOutButton(): Promise<void> {
        const locators = new ViewCartLocators();

        // Click on the View Cart button
        const viewCartButton = this.page.locator(locators.proceedCheckOutButton);

        await viewCartButton.click();

        // Click on the register/login link
        const registerLoginLink = this.page.locator(locators.registerLoginLink);
        await registerLoginLink.click();
    }
}