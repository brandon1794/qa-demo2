// api-helper.ts
import { APIRequestContext, expect } from '@playwright/test';
import { config } from '../config';

export class APIHelper {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getAllProducts() {
        const response = await this.request.get(`${config.baseURL}${config.endpoints.productsList}`);
        expect(response.status()).toBe(200);

        console.log(response.json())

        return response.json();
    }

    async postToProductsList() {
        const response = await this.request.post(`${config.baseURL}${config.endpoints.productsList}`);
        expect(response.status()).toBe(405);
        return response.json();
    }

    async getAllBrands() {
        const response = await this.request.get(`${config.baseURL}${config.endpoints.brandsList}`);
        expect(response.status()).toBe(200);

        console.log(response.json())
        return response.json();
    }

    async postToSearchProduct(searchTerm: string) {
        const response = await this.request.post(`${config.baseURL}${config.endpoints.searchProduct}`, {
            data: { search_product: searchTerm }
        });
        expect(response.status()).toBe(200);

        console.log(response.json())
        return response.json();
    }

    async postToVerifyLogin(email: string, password: string) {
        const response = await this.request.post(`${config.baseURL}${config.endpoints.verifyLogin}`, {
            data: { email, password }
        });
        expect(response.status()).toBe(200);

        console.log(response.json())
        return response.json();
    }

    async getUserByEmailAccount(email: string) {
        const response = await this.request.get(`${config.baseURL}${config.endpoints.getUserByEmail}`, {
            data: { email }
        });
        expect(response.status()).toBe(200);

        console.log(response.json())
        return response.json();
    }

    async postCreateNewUser(user: any) {
        console.log(user)
        const response = await this.request.post(`${config.baseURL}${config.endpoints.createAccount}`, {
            data: { ...user }  // The new user data passed from UserHelper
        });
        console.log(`${config.baseURL}${config.endpoints.createAccount}`)
        expect(response.status()).toBe(200);

        console.log(await response.json());
        return response.json();
    }
}