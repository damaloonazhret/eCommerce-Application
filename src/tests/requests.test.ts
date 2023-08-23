import getToken from '../services/commercetools/getToken';
import signIn from '../services/commercetools/signIn';
import signUp from '../services/commercetools/signUp';
import { Customer, UserRegistrationData } from '../types/interfaces';
import Model from '../components/model/index';
import Controller from '../components/controller/index';

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

test('test class Model.signIn', async () => {
    const obj = new Model();
    const result = await obj.signIn(userDataExist);
    expect(result).toEqual({ success: true, message: '' });
});

test('test class Model.signUp', async () => {
    const obj = new Model();
    const result = await obj.signUp(dataUserRegistration);
    expect(result).toEqual({
        success: false,
        message: 'There is already an existing customer with the provided email.',
    });
});

const res: Customer = {
    customer: {
        id: '6d3586e7-056f-45bc-847e-dffcbcb6b9cb',
        email: 'abc@a.ru',
        firstName: 'Evgeniy',
        lastName: 'A',
        dateOfBirth: '1990-01-01',
        password: '****qT4=',
        addresses: [
            {
                id: 'a',
                streetName: 'a',
                postalCode: 'a',
                city: 'a',
                country: 'a',
            },
        ],
    },
};

test('test class Model.returnFormError', async () => {
    const obj = new Model();
    const result = obj.returnFormError(res);
    expect(result).toEqual({
        success: true,
        message: '',
    });
});

test('test class Controller.signUp', async () => {
    const newModel = new Model();
    const newController = new Controller(newModel);
    const result = await newController.model.signIn(userDataExist);
    expect(result).toEqual({ message: '', success: true });
});

test('test class Controller.signUp', async () => {
    const newModel = new Model();
    const newController = new Controller(newModel);
    const result = await newController.model.signUp(dataUserRegistration);
    expect(result).toEqual({
        message: 'There is already an existing customer with the provided email.',
        success: false,
    });
});
