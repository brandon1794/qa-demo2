// user-helper.ts
import { faker } from '@faker-js/faker';

export class UserHelper {
    static generateNewUser() {
        const password = faker.internet.password({ length: 9, pattern: /[A-Za-z0-9]/ });  // 9 characters, alphanumeric with upper/lower case
        return {
            name: faker.person.firstName(),
            email: faker.internet.email(),
            password: password,
            title: faker.person.prefix(),
            birth_date: faker.date.past().getDate(),
            birth_month: faker.date.past().getMonth() + 1,  // getMonth() is 0-based
            birth_year: faker.date.past().getFullYear(),
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            company: faker.company.name(),
            address1: faker.location.streetAddress(),
            address2: faker.location.secondaryAddress(),
            country: faker.location.country(),
            zipcode: faker.location.zipCode(),
            state: faker.location.state(),
            city: faker.location.city(),
            mobile_number: faker.phone.number(),
        };
    }
}
