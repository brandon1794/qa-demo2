import { Page, expect } from '@playwright/test';
import { PaymentInfoLocators } from '../locators/payment-info-page-locator';

export class PaymentInfoPage {
    private readonly page: Page;
    private readonly locators: PaymentInfoLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = new PaymentInfoLocators();
    }

    async reviewOrderAndPlaceComment(name: string): Promise<void> {
        const title = this.page.getByText(this.locators.reviewOrderBeforePaymentTitle);
        expect(title).toBeVisible();

        const placeMessage = this.page.locator(this.locators.placeMessageForOrder);
        await placeMessage.fill('This is a test of Order');

        const placeOrderButton = this.page.locator(this.locators.placeOrderButton);
        await placeOrderButton.click();

        await this.page.getByTestId(this.locators.nameOnCardField).fill(name);
        await this.page.getByTestId(this.locators.cardNumberField).fill('123456789123');
        await this.page.getByTestId(this.locators.cvcField).fill('123');
        await this.page.getByTestId(this.locators.expirationMonthField).fill('12');
        await this.page.getByTestId(this.locators.expirationYearField).fill('2030');
        await this.page.getByTestId(this.locators.payConfirmButton).click();
        await this.page.getByTestId(this.locators.continueAfterPayingButton).click();
    }
}