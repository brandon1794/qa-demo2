import { Page, expect } from '@playwright/test';
import { SignUpLocators } from '../locators/sign-up-page-locator';

export class SignUpPage {
    private readonly page: Page;
    private readonly locators: SignUpLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = new SignUpLocators();
    }

    async fillSignUpForm(email: string, name: string): Promise<void> {
        await this.page.getByTestId(this.locators.nameField).fill(name);
        await this.page.getByTestId(this.locators.emailField).fill(email);
        await this.page.getByTestId(this.locators.signUpButton).click();
    }

    async checkEnterInformationTitle(): Promise<void> {
        const title = this.page.getByText(this.locators.enterInformationTitle);
        expect(title).toBeVisible();
    }

    async selectMrsGender(): Promise<void> {
        (await this.page.waitForSelector(this.locators.genderMrsField)).check({ timeout: 10000 })
    }

    async fillPassword(password: string): Promise<void> {
        await this.page.getByTestId(this.locators.passwordField).fill(password);
    }

    async selectDateOfBirth(): Promise<void> {
        const { day, months, year } = this.dateOfBirth();

        //Select day
        await this.page.getByTestId(this.locators.dateOfBirthDay).selectOption(day.toString());

        //Select month
        const randomIndex = Math.floor(Math.random() * months.length);
        await this.page.getByTestId(this.locators.dateOfBirthMonth).selectOption(months[randomIndex]);

        //Select year
        await this.page.getByTestId(this.locators.dateOfBirthYear).selectOption(year.toString());
    }

    async fillAddressForm(name: string): Promise<void> {
        const firstName = name;
        const lastName = 'Test';

        await this.page.getByTestId(this.locators.adressFirstNameField).fill(firstName);
        await this.page.getByTestId(this.locators.adressLastNameField).fill(lastName);
        await this.page.getByTestId(this.locators.adressCompanyField).fill('My Company');
        await this.page.getByTestId(this.locators.adress1Field).fill('123 Main St');
        await this.page.getByTestId(this.locators.adress2Field).fill('Apt 1');
        await this.page.getByTestId(this.locators.adressCountryField).selectOption('United States');
        await this.page.getByTestId(this.locators.adressStateField).fill('California');
        await this.page.getByTestId(this.locators.adressCityField).fill('Los Angeles');
        await this.page.getByTestId(this.locators.adressZipCodeField).fill('90001');
        await this.page.getByTestId(this.locators.addressPhoneNumberField).fill('1234567890');
    }

    async submitAddressForm(): Promise<void> {
        await this.page.getByTestId(this.locators.addressCreateAccountButton).click();
    }

    async submitContinueButton(): Promise<void> {
        await this.page.getByTestId(this.locators.continueButton).click();
    }

    async signUpUserFlow(password: string, email: string, name: string): Promise<void> {
        await this.fillSignUpForm(email, name);
        console.log(email);
        await this.checkEnterInformationTitle();
        await this.selectMrsGender();
        await this.fillPassword(password);
        await this.selectDateOfBirth();
        await this.fillAddressForm(name);
        await this.submitAddressForm();
        await this.submitContinueButton();
    }

    async loginToAccount(email: string, password: string): Promise<void> {
        await this.page.getByTestId(this.locators.loginEmail).fill(email);
        await this.page.getByTestId(this.locators.loginPassword).fill(password);
        await this.page.getByTestId(this.locators.loginButton).click();
    }

    private dateOfBirth() {
        const day = Math.floor(Math.random() * 28) + 1;
        const year = Math.floor(Math.random() * 17) + 1989; // Choose a year between 1989 and 2005
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        return { day, months, year };
    }


}