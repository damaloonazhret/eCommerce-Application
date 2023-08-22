import getToken from '../services/commercetools/getToken';
import signIn from '../services/commercetools/signIn';
import signUp from '../services/commercetools/signUp';
import { UserRegistrationData } from '../types/interfaces';

// test request getToken
test('checking request getToken', () => {
    return getToken().then((data) => {
        // eslint-disable-next-line consistent-return, @typescript-eslint/explicit-function-return-type
        function checkAccessToken() {
            if (data.access_token) {
                return 'true';
            }
        }
        expect(checkAccessToken()).toBe('true');
    });
});

// test request signIn
const userDataExist = {
    email: 'abc@a.ru',
    password: 'Aqswdefr1!',
};

test('checking request sign, user exist', () => {
    return getToken().then((dataGetToken) => {
        const token = dataGetToken.access_token;
        return signIn(token, userDataExist).then((dataSignIn) => {
            // eslint-disable-next-line consistent-return, @typescript-eslint/explicit-function-return-type
            function checkLogin() {
                if (dataSignIn.statusCode) {
                    return dataSignIn.statusCode;
                }
                return 200;
            }
            expect(checkLogin()).toBe(200);
        });
    });
});

const userDataNoExist = {
    email: 'abcaaaaaaaaaaaaaa@a.ru',
    password: 'Aqswdefr1!',
};

test('checking request sign, user noexist', () => {
    return getToken().then((dataGetToken) => {
        const token = dataGetToken.access_token;
        return signIn(token, userDataNoExist).then((dataSignIn) => {
            // eslint-disable-next-line consistent-return, @typescript-eslint/explicit-function-return-type
            function checkLogin() {
                if (dataSignIn.statusCode) {
                    return dataSignIn.statusCode;
                }
                return 'acess';
            }
            expect(checkLogin()).toBe(400);
        });
    });
});

const tokenInvaild = '';

test('checking request sign, invalid token', () => {
    return signIn(tokenInvaild, userDataNoExist).then((dataSignIn) => {
        // eslint-disable-next-line consistent-return, @typescript-eslint/explicit-function-return-type
        function checkLogin() {
            if (dataSignIn.statusCode) {
                return dataSignIn.statusCode;
            }
            return 'acess';
        }
        expect(checkLogin()).toBe(401);
    });
});

// test request signUp
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

test('checking request signup', () => {
    return getToken().then((dataGetToken) => {
        const token = dataGetToken.access_token;
        return signUp(token, dataUserRegistration).then((dataSignUp) => {
            // eslint-disable-next-line consistent-return, @typescript-eslint/explicit-function-return-type
            function checkRegistration() {
                if (dataSignUp.statusCode) {
                    return dataSignUp.statusCode;
                }
                return 200;
            }
            expect(checkRegistration()).toBe(200);
        });
    });
});
