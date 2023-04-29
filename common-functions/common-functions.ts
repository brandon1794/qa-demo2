import { ElementHandle, expect, Locator, Page } from '@playwright/test';
import { Utils } from '../common-functions/utils';

//Common methods that I can re use in the test classes so I can only add validations and call out of functions, so if there's an error we know where to do the change

const clickedElements: Set<ElementHandle> = new Set();

export async function clickRandomButton(page: Page) {
    const buttons = await page.$$('#inventory_container > div[class="inventory_list"] > div[class="inventory_item"] > div[class="inventory_item_description"] > div[class="pricebar"] > button');
    const availableButtons = buttons.filter(async button => !clickedElements.has(button));
    if (availableButtons.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableButtons.length);
        const randomButton = availableButtons[randomIndex];
        await randomButton.click();
        clickedElements.add(randomButton);

        // Get the text from the cart element and validate the number of items
        const cartElement = await page.$('#shopping_cart_container > a > span');
        const cartItemsCount = await cartElement?.textContent();
        expect(parseInt(cartItemsCount ?? '0')).toBe(clickedElements.size);
    }
}

export async function fillForm(page: Page, firstNameSelector: string, lastNameSelector: string, zipCodeSelector: string, firstNameValue: string, lastNameValue: string, zipCodeValue: string) {
    await page.fill(firstNameSelector, firstNameValue);
    await page.fill(lastNameSelector, lastNameValue);
    await page.fill(zipCodeSelector, zipCodeValue);
    await page.click('#continue');
}

export async function verifyOrder(page: Page) {
    await expect(page.getByText('Checkout: Overview')).toBeVisible();
    await page.click('#finish');
    await expect(page.getByText('Checkout: Complete!')).toBeVisible();
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
}

export async function login(page: Page, userName: string, password: string, userFlag: boolean = false) {
    // Log In with creds
    await page.getByTestId('username').fill(userName);
    await page.getByTestId('password').fill(password);
    await page.getByTestId('login-button').click();
    if (userFlag === true) {
        //Validate Error Messages on Login
        await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
    } else {
        await expect(page.getByText('Products')).toBeVisible();
    }

}

export function generateRandomUserData(): { name: string, email: string } {
    const firstNameList = ['Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia', 'Charlotte', 'Mia', 'Amelia', 'Harper', 'Evelyn'];
    const lastNameList = ['Smith', 'Jones', 'Taylor', 'Brown', 'Wilson', 'Johnson', 'Davis', 'Miller', 'Jackson', 'Moore'];
    const firstName = firstNameList[Math.floor(Math.random() * firstNameList.length)];
    const lastName = lastNameList[Math.floor(Math.random() * lastNameList.length)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}@example.com`;
    return { name: `${firstName}`, email };
}
