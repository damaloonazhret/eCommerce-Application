export interface ObjValidationLogin {
    email: Array<string>;
    password: Array<string>;
}

export interface ObjValidationRegistration {
    email: Array<string>;
    password: Array<string>;
    nameUser: Array<string>;
    lastNameUser: Array<string>;
    dateBirth: Array<string>;
    addressStreet: Array<string>;
    addressCity: Array<string>;
    addressPostalCode: Array<string>;
}

export function checkDataLoginForm(emailUser: string, passwordUser: string): ObjValidationLogin {
    // check email, <input> type='text'
    const hasSpecialSymboEmail = /[~!#$%^&*()_+\-=[\]{};:"\\|,'<>/?]/.test(emailUser);
    const hasSymbolDogEmail = /@/.test(emailUser);
    const hasDomenEmail = /\.[a-z]{2,4}/.test(emailUser);
    const objValidationLogin: ObjValidationLogin = {
        email: [],
        password: [],
    };

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < emailUser.length; i += 1) {
        const letterEmail = emailUser.charAt(i);
        const hasCirilic = /[а-яА-ЯёЁ]/;
        if (hasCirilic.test(letterEmail)) {
            objValidationLogin.email.push('Email must not contain сyrillic characters.');
            i += emailUser.length;
        }
    }

    if (hasSpecialSymboEmail) {
        objValidationLogin.email.push('Email must not contain special characters(e.g., !#$%^&*).');
    }

    if (emailUser.includes(' ')) {
        objValidationLogin.email.push('Email must not contain a space.');
    }

    if (!hasSymbolDogEmail) {
        objValidationLogin.email.push('Email address must contain an @ symbol separating local part and domain name.');
    }

    if (!hasDomenEmail) {
        objValidationLogin.email.push('Email address must contain a domain name (e.g., example.com).');
    }

    if (emailUser[0] === '@') {
        objValidationLogin.email.push('Email address must be properly formatted (e.g., user@example.com).');
    }

    if (emailUser.length < 1) {
        objValidationLogin.email.splice(0, objValidationLogin.email.length);
        objValidationLogin.email.push('Enter your email address (e.g., user@example.com).');
    }

    // check password, <input> type='password'
    const minLengthPassword = 8;
    const hasUpperCasePassword = /[A-Z]/.test(passwordUser);
    const hasLowerCasePassword = /[a-z]/.test(passwordUser);
    const hasNumberPassword = /\d/.test(passwordUser);
    const hasSpecialSymbolPassword = /[~!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(passwordUser);

    for (let i = 0; i < passwordUser.length; i += 1) {
        const letterPassword = passwordUser.charAt(i);
        const hasCirilic = /[а-яА-ЯёЁ]/;
        if (hasCirilic.test(letterPassword)) {
            objValidationLogin.password.push('Password must not contain сyrillic characters.');
            i += passwordUser.length;
        }
    }

    if (passwordUser.length < minLengthPassword) {
        objValidationLogin.password.push('Password must be at least 8 characters long.');
    }

    if (!hasUpperCasePassword) {
        objValidationLogin.password.push('Password must contain at least one uppercase letter (A-Z).');
    }

    if (!hasLowerCasePassword) {
        objValidationLogin.password.push('Password must contain at least one lowercase letter (a-z).');
    }

    if (!hasNumberPassword) {
        objValidationLogin.password.push('Password must contain at least one digit (0-9).');
    }

    if (!hasSpecialSymbolPassword) {
        objValidationLogin.password.push('Password must contain at least one special character (e.g., !@#$%^&*).');
    }

    if (passwordUser.includes(' ')) {
        objValidationLogin.password.push('Password must not contain a space.');
    }

    if (passwordUser.length < 1) {
        objValidationLogin.password.splice(0, objValidationLogin.password.length);
        objValidationLogin.password.push(
            'Enter password (minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number).'
        );
    }

    return objValidationLogin;
}

export function checkDataRegistrationForm(
    emailUser: string,
    passwordUser: string,
    nameUser: string,
    lastNameUser: string,
    dateBirth: string,
    addressStreet: string,
    addressCity: string,
    addressPostalCode: string
): object {
    const objValidationRegistration: ObjValidationRegistration = {
        email: [],
        password: [],
        nameUser: [],
        lastNameUser: [],
        dateBirth: [],
        addressStreet: [],
        addressCity: [],
        addressPostalCode: [],
    };

    // check data registration
    const minQuantitySymbol = 1;
    const hasSpecialSymbolDataName = /[~!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\d]/.test(nameUser);
    const hasSpecialSymbolDataLastName = /[~!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\d]/.test(lastNameUser);
    const hasSpecialSymbolDataCity = /[~!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\d]/.test(addressCity);
    const dateBirthUser = new Date(dateBirth).getTime();
    const minAgeUser = 13;
    const yearMaxDateAge = Number(new Date().getFullYear()) - minAgeUser;
    const monthMaxDateAge = `0${new Date().getMonth() + 1}`.slice(-2);
    const dayMaxDateAge = `0${new Date().getDate()}`.slice(-2);
    const maxDateAge = new Date(`${yearMaxDateAge}-${monthMaxDateAge}-${dayMaxDateAge}`).getTime();
    const hasNumberSymbolUppercasePostalCode = /[A-Z\d]/.test(addressPostalCode);
    const hasSymbolLowercasePostalCode = /[a-z]/.test(addressPostalCode);
    const hasSpecialSymbolPostalCode = /[~!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(addressPostalCode);

    const dataValidationLoginPassword = checkDataLoginForm(emailUser, passwordUser);
    objValidationRegistration.email = dataValidationLoginPassword.email;
    objValidationRegistration.password = dataValidationLoginPassword.password;

    // other fields
    if (nameUser.length < minQuantitySymbol) {
        objValidationRegistration.nameUser.push('First name must contain at least one character.');
    }

    if (hasSpecialSymbolDataName) {
        objValidationRegistration.nameUser.push('First name must contain no special characters or numbers.');
    }

    if (lastNameUser.length < minQuantitySymbol) {
        objValidationRegistration.lastNameUser.push('Last name must contain at least one character.');
    }

    if (hasSpecialSymbolDataLastName) {
        objValidationRegistration.lastNameUser.push('Last name must contain no special characters or numbers.');
    }

    if (dateBirth.length < 1) {
        objValidationRegistration.dateBirth.push('Enter date of birth');
    }

    if (dateBirthUser > maxDateAge || !dateBirthUser) {
        objValidationRegistration.dateBirth.push('Registration is possible for persons over 13 years of age.');
    }

    if (addressStreet.length < minQuantitySymbol) {
        objValidationRegistration.addressStreet.push('Street must contain at least one character.');
    }

    if (addressCity.length < minQuantitySymbol) {
        objValidationRegistration.addressCity.push('City must contain at least one character.');
    }

    if (hasSpecialSymbolDataCity) {
        objValidationRegistration.addressCity.push('City must contain no special characters or numbers.');
    }

    if (hasSpecialSymbolPostalCode) {
        objValidationRegistration.addressPostalCode.push('Postal code must contain no special characters.');
    }

    if (!hasNumberSymbolUppercasePostalCode) {
        objValidationRegistration.addressPostalCode.push(
            'Postal code must follow the format for the country (e.g., 12345 or A1B 2C3).'
        );
    }

    if (hasSymbolLowercasePostalCode) {
        objValidationRegistration.addressPostalCode.push('Postal code can contain numbers or capital letters.');
    }

    if (addressPostalCode.length < 5) {
        objValidationRegistration.addressPostalCode.push(
            'Postal code must contain at least 5 characters (e.g., 12345 or A1B 2C3).'
        );
    }

    if (addressPostalCode.length < 1) {
        objValidationRegistration.addressPostalCode.splice(0, objValidationRegistration.addressPostalCode.length);
        objValidationRegistration.addressPostalCode.push(
            'Postal code must contain at least 5 characters (e.g., 12345 or A1B 2C3).'
        );
    }

    return objValidationRegistration;
}
