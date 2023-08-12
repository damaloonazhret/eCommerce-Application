export interface ObjValidationLogin {
    email: boolean;
    password: boolean;
}

export interface ObjValidationRegistration {
    email: boolean;
    password: boolean;
    nameUser: boolean;
    lastNameUser: boolean;
    dateBirth: boolean;
    addressStreet: boolean;
    addressCity: boolean;
    addressPostalCode: boolean;
    addressCountry: boolean;
}

export function checkDataLoginForm(emailUser: string, passwordUser: string): object {
    // check email, <input> type='text'
    const hasSymbolDogEmail = /@/.test(emailUser);
    const hasDomenEmail = /\.[a-z]{2,4}/.test(emailUser);
    const objValidationLogin: ObjValidationLogin = {
        email: true,
        password: true,
    };

    if (emailUser.includes(' ')) {
        objValidationLogin.email = false;
    }

    if (!hasSymbolDogEmail) {
        objValidationLogin.email = false;
    }

    if (!hasDomenEmail) {
        objValidationLogin.email = false;
    }

    // check password, <input> type='password'
    const minLengthPassword = 8;
    const hasUpperCasePassword = /[A-Z]/.test(passwordUser);
    const hasLowerCasePassword = /[a-z]/.test(passwordUser);
    const hasNumberPassword = /\d/.test(passwordUser);
    const hasSpecialSymbolPassword = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(passwordUser);
    const hasSpacesPassword = /^\s|\s$/.test(passwordUser);

    if (passwordUser.length < minLengthPassword) {
        objValidationLogin.password = false;
    }

    if (!hasUpperCasePassword) {
        objValidationLogin.password = false;
    }

    if (!hasLowerCasePassword) {
        objValidationLogin.password = false;
    }

    if (!hasNumberPassword) {
        objValidationLogin.password = false;
    }

    if (!hasSpecialSymbolPassword) {
        objValidationLogin.password = false;
    }

    if (hasSpacesPassword) {
        objValidationLogin.password = false;
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
    addressPostalCode: string,
    addressCountry: string
): object {
    const objValidationRegistration: ObjValidationRegistration = {
        email: true,
        password: true,
        nameUser: true,
        lastNameUser: true,
        dateBirth: true,
        addressStreet: true,
        addressCity: true,
        addressPostalCode: true,
        addressCountry: true,
    };

    // check data registration
    const minQuantitySymbol = 1;
    const hasSpecialSymbolDataName = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\d]/.test(nameUser);
    const hasSpecialSymbolDataLastName = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\d]/.test(lastNameUser);
    const hasSpecialSymbolDataCity = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\d]/.test(addressCity);
    const dateBirthUser = new Date(dateBirth).getTime();
    const minAgeUser = 10;
    const yearMaxDateAge = Number(new Date().getFullYear()) - minAgeUser;
    const monthMaxDateAge = `0${new Date().getMonth() + 1}`.slice(-2);
    const dayMaxDateAge = `0${new Date().getDate()}`.slice(-2);
    const maxDateAge = new Date(`${yearMaxDateAge}-${monthMaxDateAge}-${dayMaxDateAge}`).getTime();
    const hasNumberSymbolUppercasePostalCode = /[A-Z\d]/.test(addressPostalCode);

    // email, pass. Object comparison
    if (
        JSON.stringify(checkDataLoginForm(emailUser, passwordUser)) === JSON.stringify({ email: false, password: true })
    ) {
        objValidationRegistration.email = false;
    } else if (
        JSON.stringify(checkDataLoginForm(emailUser, passwordUser)) === JSON.stringify({ email: true, password: false })
    ) {
        objValidationRegistration.password = false;
    } else if (
        JSON.stringify(checkDataLoginForm(emailUser, passwordUser)) ===
        JSON.stringify({ email: false, password: false })
    ) {
        objValidationRegistration.email = false;
        objValidationRegistration.password = false;
    }

    // other fields
    if (nameUser.length < minQuantitySymbol) {
        objValidationRegistration.nameUser = false;
    }

    if (hasSpecialSymbolDataName) {
        objValidationRegistration.nameUser = false;
    }

    if (lastNameUser.length < minQuantitySymbol) {
        objValidationRegistration.lastNameUser = false;
    }

    if (hasSpecialSymbolDataLastName) {
        objValidationRegistration.lastNameUser = false;
    }

    if (dateBirthUser > maxDateAge || !dateBirthUser) {
        objValidationRegistration.dateBirth = false;
    }

    if (addressStreet.length < minQuantitySymbol) {
        objValidationRegistration.addressStreet = false;
    }

    if (addressCity.length < minQuantitySymbol || hasSpecialSymbolDataCity) {
        objValidationRegistration.addressCity = false;
    }

    if (!hasNumberSymbolUppercasePostalCode || addressPostalCode.length !== 6) {
        objValidationRegistration.addressPostalCode = false;
    }

    if (addressCountry.length === 0) {
        objValidationRegistration.addressCountry = false;
    }

    return objValidationRegistration;
}
