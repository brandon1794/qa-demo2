import { Page } from '@playwright/test';
import { ProductDetailsLocators } from '../locators/product-details-page-locator';

export class ProductDetailsPage {
    private readonly page: Page;
    private readonly locators: ProductDetailsLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = new ProductDetailsLocators();
    }

    async addToCartWithMessage(text: string): Promise<string> {

        // Clear the quantity field
        const quantityField = this.page.locator(this.locators.quantityField);
        await quantityField.clear();
        //await quantityField.press('Backspace');

        // Type the text into the quantity field
        await quantityField.type(text);

        // Click on the Add To Cart button
        const addToCartButton = this.page.locator(this.locators.addToCart);
        await addToCartButton.click();

        // Wait for the added message to appear and return the message text
        const addedMessage = await this.page.waitForSelector(this.locators.addedMessage);

        return addedMessage.innerText();
    }

    async clickViewCartLink(): Promise<void> {

        // Click on the View Cart button
        const viewCartButton = this.page.locator(this.locators.viewCartButton);
        await viewCartButton.click();
    }

}