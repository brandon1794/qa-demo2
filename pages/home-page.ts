import { Page } from '@playwright/test';
import { HomePageLocators } from '../locators/home-page-locator';

export class HomePage {
  private readonly page: Page;
  private readonly locators: HomePageLocators;

  constructor(page: Page) {
    this.page = page;
    this.locators = new HomePageLocators();
  }

  async clickRandomViewProductOption(): Promise<void> {
    const options = await this.page.$$(this.locators.viewProductOption);
    const randomIndex = Math.floor(Math.random() * options.length);

    await options[randomIndex].click();
  }

  async clickTheCartNavBar(): Promise<void> {
    const cartNav = this.page.locator(this.locators.viewCartNavBar);
    await cartNav.click();

    const checkout = this.page.locator(this.locators.proceedCheckOut);
    await checkout.click();
  }

  async userLogout(): Promise<void> {
    const cartLogout = this.page.locator(this.locators.logoutNavBar);
    await cartLogout.click();
  }
}