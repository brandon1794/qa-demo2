// config.ts
import dotenv from 'dotenv';

dotenv.config();

export const config = {
    baseURL: process.env.API_BASE_URL,
    endpoints: {
        productsList: '/productsList',
        brandsList: '/brandsList',
        searchProduct: '/searchProduct',
        verifyLogin: '/verifyLogin',
        createAccount: '/createAccount',
        getUserByEmail: '/getUserDetailByEmail'
    }
};
