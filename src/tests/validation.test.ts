import {
    checkEmail,
    checkPassword,
    checkName,
    checkAge,
    checkStreet,
    checkCity,
    checkPostalCode,
} from '../services/validation';

describe('Checking input "Email"', () => {
    const testCase = [
        {
            valueEmail: 'abc@mail.ru',
            expected: [],
        },
        {
            valueEmail: '',
            expected: ['Email cannot be blank.'],
        },
        {
            valueEmail: 'abc`',
            expected: [
                'Email address is not properly formatted.',
                'Email address must contain a domain name.',
                'Email address must contain an @ symbol separating local part and domain name.',
                'Email address must contain only Latin characters and digits.',
            ],
        },
        {
            valueEmail: 'abc@',
            expected: ['Email address is not properly formatted.', 'Email address must contain a domain name.'],
        },
        {
            valueEmail: 'abc',
            expected: [
                'Email address is not properly formatted.',
                'Email address must contain a domain name.',
                'Email address must contain an @ symbol separating local part and domain name.',
            ],
        },
        {
            valueEmail: '@mail.ru',
            expected: ['Email address is not properly formatted.'],
        },
    ];
    testCase.forEach((test) => {
        it(`Value input "${test.valueEmail}"`, () => {
            expect(checkEmail(test.valueEmail)).toEqual(test.expected);
        });
    });
});

describe('Checking input "Password"', () => {
    const testCase = [
        {
            valuePassword: 'Aqswdefr1!',
            expected: [],
        },
        {
            valuePassword: '',
            expected: ['Password cannot be blank.'],
        },
        {
            valuePassword: 'a',
            expected: [
                'Password must be at least 8 characters.',
                'Password must contain at least one uppercase letter (A-Z).',
                'Password must contain at least one digit (0-9).',
                'Password must contain at least one special character (e.g., !@#$%^&*).',
            ],
        },
        {
            valuePassword: 'A1',
            expected: [
                'Password must be at least 8 characters.',
                'Password must contain at least one lowercase letter (a-z).',
                'Password must contain at least one special character (e.g., !@#$%^&*).',
            ],
        },
        {
            valuePassword: 'Aqswdefr1',
            expected: ['Password must contain at least one special character (e.g., !@#$%^&*).'],
        },
        {
            valuePassword: 'Aqswdefr1! ',
            expected: [
                'Password cannot contain whitespace.',
                'Password must contain only Latin characters and digits and symbols.',
            ],
        },
    ];
    testCase.forEach((test) => {
        it(`Value input "${test.valuePassword}"`, () => {
            expect(checkPassword(test.valuePassword)).toEqual(test.expected);
        });
    });
});

describe('Checking inputs "First name and Last name"', () => {
    const testCase = [
        {
            valueFirstName: 'Jonh',
            expected: [],
        },
        {
            valueFirstName: '',
            expected: ['Name cannot be blank.'],
        },
        {
            valueFirstName: 'Jonh ',
            expected: ['Name cannot contain whitespace.', 'Name must contain only Latin characters.'],
        },
        {
            valueFirstName: 'Jonh`',
            expected: ['Name must contain only Latin characters.'],
        },
        {
            valueFirstName: 'Jonh1',
            expected: ['Name must contain only Latin characters.'],
        },
    ];
    testCase.forEach((test) => {
        it(`Value input "${test.valueFirstName}"`, () => {
            expect(checkName(test.valueFirstName)).toEqual(test.expected);
        });
    });
});

describe('Checking input "Birt date"', () => {
    const testCase = [
        {
            valueBirthDate: '2001-01-01',
            expected: [],
        },
        {
            valueBirthDate: '',
            expected: ['Date of birth cannot be blank.'],
        },
        {
            valueBirthDate: '2012-01-01',
            expected: ['Age must be between 13 and 100.'],
        },
    ];
    testCase.forEach((test) => {
        it(`Value input "${test.valueBirthDate}"`, () => {
            expect(checkAge(test.valueBirthDate)).toEqual(test.expected);
        });
    });
});

describe('Checking input "Street"', () => {
    const testCase = [
        {
            valueStreet: 'Brooklyn',
            expected: [],
        },
        {
            valueStreet: 'B`',
            expected: [],
        },
        {
            valueStreet: '',
            expected: ['Street cannot be blank.'],
        },
    ];
    testCase.forEach((test) => {
        it(`Value input "${test.valueStreet}"`, () => {
            expect(checkStreet(test.valueStreet)).toEqual(test.expected);
        });
    });
});

describe('Checking input "City"', () => {
    const testCase = [
        {
            valueCity: 'New York',
            expected: [],
        },
        {
            valueCity: '',
            expected: ['Street cannot be blank.'],
        },
        {
            valueCity: 'New York`',
            expected: ['Street cannot contain special characters.'],
        },
    ];
    testCase.forEach((test) => {
        it(`Value input "${test.valueCity}"`, () => {
            expect(checkCity(test.valueCity)).toEqual(test.expected);
        });
    });
});

describe('Checking input "Postal code"', () => {
    const testCase = [
        {
            valuePostalCode: '1234 5A',
            expected: [],
        },
        {
            valuePostalCode: '',
            expected: ['Postal code cannot be blank.'],
        },
        {
            valuePostalCode: 'A',
            expected: ['Postal code must contain at least 5 character.'],
        },
        {
            valuePostalCode: '1234',
            expected: ['Postal code must contain at least 5 character.'],
        },
        {
            valuePostalCode: '`',
            expected: [
                'Postal code cannot contain special characters.',
                'Postal code must contain at least 5 character.',
                'Postal code is not properly formatted.',
            ],
        },
    ];
    testCase.forEach((test) => {
        it(`Value input "${test.valuePostalCode}"`, () => {
            expect(checkPostalCode(test.valuePostalCode)).toEqual(test.expected);
        });
    });
});
