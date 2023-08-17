// import { checkDataLoginForm, checkDataRegistrationForm } from '../services/validation';

// // one metod
// /* test('checking form login', () => {
//     expect(checkDataLoginForm('test@email.ru', '1!Atestpassword')).toBe('Successfully');
// }); */

// describe('Checking form login', () => {
//     const testCase = [
//         {
//             email: '1abc@mail.ru',
//             password: 'Aqswdefr1!',
//             expected: JSON.stringify({ email: [], password: [] }),
//         },
//         {
//             email: '2abc@mail.ru ',
//             password: 'Aqswdefr1!',
//             expected: JSON.stringify({ email: ['Email must not contain a space.'], password: [] }),
//         },
//         {
//             email: '3abc@',
//             password: 'Aqswdefr1!',
//             expected: JSON.stringify({
//                 email: ['Email address must contain a domain name (e.g., example.com).'],
//                 password: [],
//             }),
//         },
//         {
//             email: '4a bc1@',
//             password: 'Aqswdefr1!',
//             expected: JSON.stringify({
//                 email: [
//                     'Email must not contain a space.',
//                     'Email address must contain a domain name (e.g., example.com).',
//                 ],
//                 password: [],
//             }),
//         },
//         {
//             email: '5abc1! ',
//             password: 'Aqswdefr1!',
//             expected: JSON.stringify({
//                 email: [
//                     'Email must not contain special characters(e.g., !#$%^&*).',
//                     'Email must not contain a space.',
//                     'Email address must contain an @ symbol separating local part and domain name.',
//                     'Email address must contain a domain name (e.g., example.com).',
//                 ],
//                 password: [],
//             }),
//         },
//         {
//             email: '',
//             password: 'Aqswdefr1!',
//             expected: JSON.stringify({
//                 email: ['Enter your email address (e.g., user@example.com).'],
//                 password: [],
//             }),
//         },
//         {
//             email: '@mail.ru',
//             password: 'Aqswdefr1!',
//             expected: JSON.stringify({
//                 email: ['Email address must be properly formatted (e.g., user@example.com).'],
//                 password: [],
//             }),
//         },
//         {
//             email: 'фив@mail.ru',
//             password: 'Aqswdefr1!',
//             expected: JSON.stringify({
//                 email: ['Email must not contain сyrillic characters.'],
//                 password: [],
//             }),
//         },
//         {
//             email: 'фив@фив',
//             password: 'Aqswdefr1!',
//             expected: JSON.stringify({
//                 email: [
//                     'Email must not contain сyrillic characters.',
//                     'Email address must contain a domain name (e.g., example.com).',
//                 ],
//                 password: [],
//             }),
//         },
//         {
//             email: '8abc@mail.ru',
//             password: 'qswdef',
//             expected: JSON.stringify({
//                 email: [],
//                 password: [
//                     'Password must be at least 8 characters long.',
//                     'Password must contain at least one uppercase letter (A-Z).',
//                     'Password must contain at least one digit (0-9).',
//                     'Password must contain at least one special character (e.g., !@#$%^&*).',
//                 ],
//             }),
//         },
//         {
//             email: '8abc@mail.ru',
//             password: 'AVDSEF!1',
//             expected: JSON.stringify({
//                 email: [],
//                 password: ['Password must contain at least one lowercase letter (a-z).'],
//             }),
//         },
//         {
//             email: '8abc@mail.ru',
//             password: 'Aqswdefr 1!',
//             expected: JSON.stringify({
//                 email: [],
//                 password: ['Password must not contain a space.'],
//             }),
//         },
//         {
//             email: '8abc@mail.ru',
//             password: '',
//             expected: JSON.stringify({
//                 email: [],
//                 password: [
//                     'Enter password (minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number).',
//                 ],
//             }),
//         },
//         {
//             email: '',
//             password: '',
//             expected: JSON.stringify({
//                 email: ['Enter your email address (e.g., user@example.com).'],
//                 password: [
//                     'Enter password (minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number).',
//                 ],
//             }),
//         },
//         {
//             email: '',
//             password: 'AfdfgЩ!1',
//             expected: JSON.stringify({
//                 email: ['Enter your email address (e.g., user@example.com).'],
//                 password: ['Password must not contain сyrillic characters.'],
//             }),
//         },
//     ];
//     testCase.forEach((test) => {
//         it(`${test.email}`, () => {
//             const res = checkDataLoginForm(test.email, test.password);
//             expect(JSON.stringify(res)).toBe(test.expected);
//         });
//     });
// });

// describe('Checking form registration', () => {
//     const testCase = [
//         {
//             email: '1test@email.ru',
//             password: 'Aqswdefr1!',
//             nameUser: 'Jonh',
//             lastNameUser: 'Smith',
//             dateBirth: '2009-01-01',
//             addressStreet: 'Brooklyn',
//             addressCity: 'New York',
//             addressPostalCode: '123A15',
//             expected: JSON.stringify({
//                 email: [],
//                 password: [],
//                 nameUser: [],
//                 lastNameUser: [],
//                 dateBirth: [],
//                 addressStreet: [],
//                 addressCity: [],
//                 addressPostalCode: [],
//             }),
//         },
//         {
//             email: '2test @email.ru',
//             password: 'Aqswdefr1!',
//             nameUser: 'Jonh',
//             lastNameUser: 'Smith',
//             dateBirth: '2009-01-01',
//             addressStreet: 'Brooklyn',
//             addressCity: 'New York',
//             addressPostalCode: '123A15',
//             expected: JSON.stringify({
//                 email: ['Email must not contain a space.'],
//                 password: [],
//                 nameUser: [],
//                 lastNameUser: [],
//                 dateBirth: [],
//                 addressStreet: [],
//                 addressCity: [],
//                 addressPostalCode: [],
//             }),
//         },
//         {
//             email: '3test@email.ru',
//             password: 'Aqswdefr1!',
//             nameUser: '',
//             lastNameUser: '',
//             dateBirth: '2009-01-01',
//             addressStreet: 'Brooklyn',
//             addressCity: 'New York',
//             addressPostalCode: '123A15',
//             expected: JSON.stringify({
//                 email: [],
//                 password: [],
//                 nameUser: ['First name must contain at least one character.'],
//                 lastNameUser: ['Last name must contain at least one character.'],
//                 dateBirth: [],
//                 addressStreet: [],
//                 addressCity: [],
//                 addressPostalCode: [],
//             }),
//         },
//         {
//             email: '4test@email.ru',
//             password: 'Aqswdefr1!',
//             nameUser: 'A1',
//             lastNameUser: 'A1',
//             dateBirth: '2009-01-01',
//             addressStreet: 'Brooklyn',
//             addressCity: 'New York',
//             addressPostalCode: '123A15',
//             expected: JSON.stringify({
//                 email: [],
//                 password: [],
//                 nameUser: ['First name must contain no special characters or numbers.'],
//                 lastNameUser: ['Last name must contain no special characters or numbers.'],
//                 dateBirth: [],
//                 addressStreet: [],
//                 addressCity: [],
//                 addressPostalCode: [],
//             }),
//         },
//         {
//             email: '5test@email.ru',
//             password: 'Aqswdefr1!',
//             nameUser: 'A~',
//             lastNameUser: 'A~',
//             dateBirth: '2009-01-01',
//             addressStreet: 'Brooklyn',
//             addressCity: 'New York',
//             addressPostalCode: '123A15',
//             expected: JSON.stringify({
//                 email: [],
//                 password: [],
//                 nameUser: ['First name must contain no special characters or numbers.'],
//                 lastNameUser: ['Last name must contain no special characters or numbers.'],
//                 dateBirth: [],
//                 addressStreet: [],
//                 addressCity: [],
//                 addressPostalCode: [],
//             }),
//         },
//         {
//             email: '6test@email.ru',
//             password: 'Aqswdefr1!',
//             nameUser: 'Jonh',
//             lastNameUser: 'Smith',
//             dateBirth: '2011-01-01',
//             addressStreet: 'Brooklyn',
//             addressCity: 'New York',
//             addressPostalCode: '123A15',
//             expected: JSON.stringify({
//                 email: [],
//                 password: [],
//                 nameUser: [],
//                 lastNameUser: [],
//                 dateBirth: ['Registration is possible for persons over 13 years of age.'],
//                 addressStreet: [],
//                 addressCity: [],
//                 addressPostalCode: [],
//             }),
//         },
//         {
//             email: '6test@email.ru',
//             password: 'Aqswdefr1!',
//             nameUser: 'Jonh',
//             lastNameUser: 'Smith',
//             dateBirth: '',
//             addressStreet: 'Brooklyn',
//             addressCity: 'New York',
//             addressPostalCode: '123A15',
//             expected: JSON.stringify({
//                 email: [],
//                 password: [],
//                 nameUser: [],
//                 lastNameUser: [],
//                 dateBirth: ['Enter date of birth', 'Registration is possible for persons over 13 years of age.'],
//                 addressStreet: [],
//                 addressCity: [],
//                 addressPostalCode: [],
//             }),
//         },
//         {
//             email: '7test@email.ru',
//             password: 'Aqswdefr1!',
//             nameUser: 'Jonh',
//             lastNameUser: 'Smith',
//             dateBirth: '2009-01-01',
//             addressStreet: '',
//             addressCity: 'New York',
//             addressPostalCode: '123A15',
//             expected: JSON.stringify({
//                 email: [],
//                 password: [],
//                 nameUser: [],
//                 lastNameUser: [],
//                 dateBirth: [],
//                 addressStreet: ['Street must contain at least one character.'],
//                 addressCity: [],
//                 addressPostalCode: [],
//             }),
//         },
//         {
//             email: '7test@email.ru',
//             password: 'Aqswdefr1!',
//             nameUser: 'Jonh',
//             lastNameUser: 'Smith',
//             dateBirth: '2009-01-01',
//             addressStreet: 'A1',
//             addressCity: 'New York',
//             addressPostalCode: '123A15',
//             expected: JSON.stringify({
//                 email: [],
//                 password: [],
//                 nameUser: [],
//                 lastNameUser: [],
//                 dateBirth: [],
//                 addressStreet: [],
//                 addressCity: [],
//                 addressPostalCode: [],
//             }),
//         },
//         {
//             email: '8test@email.ru',
//             password: 'Aqswdefr1!',
//             nameUser: 'Jonh',
//             lastNameUser: 'Smith',
//             dateBirth: '2009-01-01',
//             addressStreet: 'Brooklyn',
//             addressCity: 'A~',
//             addressPostalCode: '123A15',
//             expected: JSON.stringify({
//                 email: [],
//                 password: [],
//                 nameUser: [],
//                 lastNameUser: [],
//                 dateBirth: [],
//                 addressStreet: [],
//                 addressCity: ['City must contain no special characters or numbers.'],
//                 addressPostalCode: [],
//             }),
//         },
//         {
//             email: '9test@email.ru',
//             password: 'Aqswdefr1!',
//             nameUser: 'Jonh',
//             lastNameUser: 'Smith',
//             dateBirth: '2009-01-01',
//             addressStreet: 'Brooklyn',
//             addressCity: 'New York',
//             addressPostalCode: '1234',
//             expected: JSON.stringify({
//                 email: [],
//                 password: [],
//                 nameUser: [],
//                 lastNameUser: [],
//                 dateBirth: [],
//                 addressStreet: [],
//                 addressCity: [],
//                 addressPostalCode: ['Postal code must contain at least 5 characters (e.g., 12345 or A1B 2C3).'],
//             }),
//         },
//         {
//             email: '11test@email.ru',
//             password: 'Aqswdefr1!',
//             nameUser: 'Jonh',
//             lastNameUser: 'Smith',
//             dateBirth: '2009-01-01',
//             addressStreet: 'Brooklyn',
//             addressCity: 'New York',
//             addressPostalCode: '',
//             expected: JSON.stringify({
//                 email: [],
//                 password: [],
//                 nameUser: [],
//                 lastNameUser: [],
//                 dateBirth: [],
//                 addressStreet: [],
//                 addressCity: [],
//                 addressPostalCode: ['Postal code must contain at least 5 characters (e.g., 12345 or A1B 2C3).'],
//             }),
//         },
//         {
//             email: '12test@email.ru',
//             password: 'Aqswdefr1!',
//             nameUser: 'Jonh',
//             lastNameUser: 'Smith',
//             dateBirth: '2009-01-01',
//             addressStreet: 'Brooklyn',
//             addressCity: 'New York',
//             addressPostalCode: '12345a',
//             expected: JSON.stringify({
//                 email: [],
//                 password: [],
//                 nameUser: [],
//                 lastNameUser: [],
//                 dateBirth: [],
//                 addressStreet: [],
//                 addressCity: [],
//                 addressPostalCode: ['Postal code can contain numbers or capital letters.'],
//             }),
//         },
//         {
//             email: '13test@email.ru',
//             password: 'Aqswdefr1!',
//             nameUser: 'Jonh',
//             lastNameUser: 'Smith',
//             dateBirth: '2009-01-01',
//             addressStreet: 'Brooklyn',
//             addressCity: 'New York',
//             addressPostalCode: '12345~',
//             expected: JSON.stringify({
//                 email: [],
//                 password: [],
//                 nameUser: [],
//                 lastNameUser: [],
//                 dateBirth: [],
//                 addressStreet: [],
//                 addressCity: [],
//                 addressPostalCode: ['Postal code must contain no special characters.'],
//             }),
//         },
//         {
//             email: '14test@email.ru',
//             password: 'Aqswdefr1!',
//             nameUser: 'Jonh',
//             lastNameUser: 'Smith',
//             dateBirth: '2009-01-01',
//             addressStreet: 'Brooklyn',
//             addressCity: 'New York',
//             addressPostalCode: 'aAAA',
//             expected: JSON.stringify({
//                 email: [],
//                 password: [],
//                 nameUser: [],
//                 lastNameUser: [],
//                 dateBirth: [],
//                 addressStreet: [],
//                 addressCity: [],
//                 addressPostalCode: [
//                     'Postal code can contain numbers or capital letters.',
//                     'Postal code must contain at least 5 characters (e.g., 12345 or A1B 2C3).',
//                 ],
//             }),
//         },
//     ];
//     testCase.forEach((test) => {
//         it(`data: ${test.email}`, () => {
//             const res = checkDataRegistrationForm(
//                 test.email,
//                 test.password,
//                 test.nameUser,
//                 test.lastNameUser,
//                 test.dateBirth,
//                 test.addressStreet,
//                 test.addressCity,
//                 test.addressPostalCode
//             );
//             expect(JSON.stringify(res)).toBe(test.expected);
//         });
//     });
// });
