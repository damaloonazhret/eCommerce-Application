import getToken from '../services/commercetools/getToken';
import signIn from '../services/commercetools/signIn';
import signUp from '../services/commercetools/signUp';
import { Customer, UserRegistrationData } from '../types/interfaces';

// test request getToken
test('checking request getToken', () => {
    return getToken().then((dataGetToken) => {
        let numberCode: number;
        function checkAccessToken(): number {
            if (dataGetToken.access_token) {
                numberCode = 200;
            }
            return numberCode;
        }
        expect(checkAccessToken()).toBe(200);
    });
});

// test request signIn
const userDataExist = {
    email: 'abc@a.ru',
    password: 'Aqswdefr1!',
};

test('checking request sign, response code 200', () => {
    return getToken().then((dataGetToken) => {
        const token = dataGetToken.access_token;
        return signIn(token, userDataExist).then((dataSignIn) => {
            const objdataSignIn = dataSignIn as Customer;
            let numberCode: number;
            function checkLogin(): number {
                if (objdataSignIn.customer.id) {
                    numberCode = 200;
                }
                return numberCode;
            }
            expect(checkLogin()).toBe(200);
        });
    });
});

const userDataNoExist = {
    email: 'abc1159423648732@a.ru',
    password: 'Aqswdefr1!',
};

test('checking request sign, response code 400', () => {
    return getToken().then((dataGetToken) => {
        const token = dataGetToken.access_token;
        let numberCode: number;
        return signIn(token, userDataNoExist).then((dataSignIn) => {
            function checkLogin(): number {
                if (dataSignIn.statusCode) {
                    numberCode = dataSignIn.statusCode;
                }
                return numberCode;
            }
            expect(checkLogin()).toBe(400);
        });
    });
});

const tokenInvaild = '';

test('checking request sign, response code 401', () => {
    return signIn(tokenInvaild, userDataNoExist).then((dataSignIn) => {
        let numberCode: number;
        function checkLogin(): number {
            if (dataSignIn.statusCode) {
                numberCode = dataSignIn.statusCode;
            }
            return numberCode;
        }
        expect(checkLogin()).toBe(401);
    });
});

// test request signUp
const date = Date.now();

const dataNewUserRegistration: UserRegistrationData = {
    email: `test${date}@a.ru`,
    password: 'Aqswdefr1!',
    firstName: 'Jonh',
    lastName: 'Travolta',
    dateOfBirth: '1970-01-01',
    addresses: [
        {
            streetName: 'State Street',
            postalCode: '12345',
            city: 'Boston',
            country: 'FR',
        },
        {
            streetName: 'State Street',
            postalCode: '12345',
            city: 'Boston',
            country: 'FR',
        },
    ],
    shippingAddresses: [0],
    billingAddresses: [1],
};

test('checking request signup, response code 200', () => {
    return getToken().then((dataGetToken) => {
        const token = dataGetToken.access_token;
        return signUp(token, dataNewUserRegistration).then((dataSignUp) => {
            const objDataSignUp = dataSignUp as Customer;
            let numberCode: number;
            function checkRegistration(): number {
                if (objDataSignUp.customer.id) {
                    numberCode = 200;
                }
                return numberCode;
            }
            expect(checkRegistration()).toBe(200);
        });
    });
});

const dataUserRegistration: UserRegistrationData = {
    email: 'abc@a.ru',
    password: 'Aqswdefr1!',
    firstName: 'Jonh',
    lastName: 'Travolta',
    dateOfBirth: '1970-01-01',
    addresses: [
        {
            streetName: 'State Street',
            postalCode: '12345',
            city: 'Boston',
            country: 'FR',
        },
        {
            streetName: 'State Street',
            postalCode: '12345',
            city: 'Boston',
            country: 'FR',
        },
    ],
    shippingAddresses: [0],
    billingAddresses: [1],
};

test('checking request signup, response code 400', () => {
    return getToken().then((dataGetToken) => {
        const token = dataGetToken.access_token;
        return signUp(token, dataUserRegistration).then((dataSignUp) => {
            let numberCode: number;
            function checkRegistration(): number {
                if (dataSignUp.statusCode) {
                    numberCode = dataSignUp.statusCode;
                }
                return numberCode;
            }
            expect(checkRegistration()).toBe(400);
        });
    });
});
