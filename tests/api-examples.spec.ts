// api-tests.spec.ts
import { test, request, expect } from '@playwright/test';
import { APIHelper } from '../api/api-helper';
import { UserHelper } from '../api/user-data-generator';

test.describe('API Tests', () => {

    let apiHelper: APIHelper;
    let newUser: any;

    test.beforeAll(async ({ playwright }) => {
        const apiRequestContext = await request.newContext();
        apiHelper = new APIHelper(apiRequestContext);
        newUser = UserHelper.generateNewUser();  // Generate a new user using Faker
    });

    test('Create new user', async () => {
        const createUserResponse = await apiHelper.postCreateNewUser(newUser);
        expect(createUserResponse).toBeTruthy();
    });

    test('Get all products', async () => {
        const productsList = await apiHelper.getAllProducts();
        console.log(productsList);  // Verify and log the products
        expect(productsList).toBeTruthy();
    });

    test('Post to products list (should fail with 405)', async () => {
        const response = await apiHelper.postToProductsList();
        expect(response.message).toBe('This request method is not supported.');
    });

    test('Get all brands', async () => {
        const brandsList = await apiHelper.getAllBrands();
        expect(brandsList).toBeTruthy();
    });

    test('Post to search product', async () => {
        const searchedProducts = await apiHelper.postToSearchProduct('tshirt');
        expect(searchedProducts).toBeTruthy();
    });

    test('Login with created user', async () => {
        const loginResponse = await apiHelper.postToVerifyLogin(newUser.email, newUser.password);
        expect(loginResponse.message).toBe('User exists!');
    });
});
