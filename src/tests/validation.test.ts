import { checkDataLoginForm, checkDataRegistrationForm } from '../services/validation';

// one metod
/* test('checking form login', () => {
    expect(checkDataLoginForm('test@email.ru', '1!Atestpassword')).toBe('Successfully');
}); */

describe('Checking form login', () => {
    const testCase = [
        {
            email: '1@mail.ru',
            password: 'Aqswdefr1!',
            expected: 'Correct data',
        },
        {
            email: '1@m ail.ru',
            password: 'Aqswdefr1!',
            expected: 'Incorrect data',
        },
        {
            email: 'test@email.ru ',
            password: 'Aqswdefr1!',
            expected: 'Incorrect data',
        },
        {
            email: ' test@email.ru',
            password: 'Aqswdefr1!',
            expected: 'Incorrect data',
        },
        {
            email: 'test@email.ru',
            password: 'qswdefre',
            expected: 'Incorrect data',
        },
        {
            email: 'test@email.ru',
            password: 'qswdefre1',
            expected: 'Incorrect data',
        },
        {
            email: 'test@email.ru',
            password: 'qswdefre1!',
            expected: 'Incorrect data',
        },
        {
            email: '',
            password: '',
            expected: 'Incorrect data',
        },
    ];
    testCase.forEach((test) => {
        it(`data: ${test.email}, ${test.password}, expected:${test.expected}`, () => {
            const res = checkDataLoginForm(test.email, test.password);
            expect(res).toBe(test.expected);
        });
    });
});

describe('Checking form registration', () => {
    const testCase = [
        {
            email: 'test@email1.ru',
            password: 'Aqswdefr1!',
            name: 'Jonh',
            lastName: 'Smith',
            datebirth: '2010-01-01',
            street: 'Brooklyn',
            city: 'New York',
            postCode: '123A15',
            country: 'USA',
            expected: 'Correct data',
        },
        {
            email: ' test@email2.ru',
            password: 'Aqswdefr1!',
            name: 'Jonh',
            lastName: 'Smith',
            datebirth: '2010-01-01',
            street: 'Brooklyn',
            city: 'New York',
            postCode: '123A15',
            country: 'USA',
            expected: 'Incorrect data',
        },
        {
            email: 'test@email3.ru',
            password: 'password1',
            name: '',
            lastName: 'Smith',
            datebirth: '2010-01-01',
            street: 'Brooklyn',
            city: 'New York',
            postCode: '123A15',
            country: 'USA',
            expected: 'Incorrect data',
        },
        {
            email: 'test@email4.ru',
            password: 'Aqswdefr1!',
            name: 'Jonh',
            lastName: '',
            datebirth: '2010-01-01',
            street: 'Brooklyn',
            city: 'New York',
            postCode: '123A15',
            country: 'USA',
            expected: 'Incorrect data',
        },
        {
            email: 'test@email5.ru',
            password: 'Aqswdefr1!',
            name: 'Jonh',
            lastName: 'Smith',
            datebirth: '2020-01-01',
            street: 'Brooklyn',
            city: 'New York',
            postCode: '123A15',
            country: 'USA',
            expected: 'Incorrect data',
        },
        {
            email: 'test@email6.ru',
            password: 'password',
            name: 'Jonh',
            lastName: 'Smith',
            datebirth: '2010-01-01',
            street: 'Brooklyn',
            city: 'New York',
            postCode: '123A15',
            country: 'USA',
            expected: 'Incorrect data',
        },
        {
            email: 'test@email7.ru',
            password: 'Aqswdefr1!',
            name: 'Jonh',
            lastName: 'Smith',
            datebirth: '2010-01-01',
            street: '',
            city: 'New York',
            postCode: '123A15',
            country: 'USA',
            expected: 'Incorrect data',
        },
        {
            email: 'test@email8.ru',
            password: 'Aqswdefr1!',
            name: 'Jonh',
            lastName: 'Smith',
            datebirth: '2010-01-01',
            street: 'Brooklyn',
            city: '',
            postCode: '123A15',
            country: 'USA',
            expected: 'Incorrect data',
        },
        {
            email: 'test@email9.ru',
            password: 'Aqswdefr1!',
            name: 'Jonh',
            lastName: 'Smith',
            datebirth: '2010-01-01',
            street: 'Brooklyn',
            city: 'New York',
            postCode: '',
            country: 'USA',
            expected: 'Incorrect data',
        },
        {
            email: 'test@email10.ru',
            password: 'Aqswdefr1!',
            name: 'Jonh',
            lastName: 'Smith',
            datebirth: '2010-01-01',
            street: 'Brooklyn',
            city: 'New York',
            postCode: '123A15',
            country: '',
            expected: 'Incorrect data',
        },
    ];
    testCase.forEach((test) => {
        it(`data: ${test.email}`, () => {
            const res = checkDataRegistrationForm(
                test.email,
                test.password,
                test.name,
                test.lastName,
                test.datebirth,
                test.street,
                test.city,
                test.postCode,
                test.country
            );
            expect(res).toBe(test.expected);
        });
    });
});
