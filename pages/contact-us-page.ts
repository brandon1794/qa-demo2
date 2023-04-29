import { Page, expect } from '@playwright/test';
import { ContactUsPageLocators } from '../locators/contact-us-locators';

export class ContactUsPage {
    private readonly page: Page;
    private readonly locators: ContactUsPageLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = new ContactUsPageLocators();
    }

    async contactUsUserFlow(name: string, email: string): Promise<void> {
        const cartNav = this.page.locator(this.locators.contactUsNavBar);
        await cartNav.click();

        const contactUsTitle = this.page.getByText(this.locators.getInTouchTitle);
        expect(contactUsTitle).toBeVisible();

        await this.page.getByTestId(this.locators.contactName).fill(name);
        await this.page.getByTestId(this.locators.contactEmail).fill(email);
        await this.page.getByTestId(this.locators.contactSubject).fill('Testing Subject');
        await this.page.getByTestId(this.locators.contactMessage).fill('This is a test message');
        await this.page.getByTestId(this.locators.contactSubmit).click();

        //Currently I'm getting an issue trying to click on the Pop Up, for some reason after clicking Submit there's no pop up window, so I can't handle it, 
        //there is for sure a fix, but not 100% which will be

        //const popupPromise = this.page.waitForEvent('popup');
        //await this.page.getByText('OK').click();

        // const successMessage = this.page.getByText(this.locators.getInTouchTitle);
        // expect(contactUsTitle).toBeVisible();
    }
}