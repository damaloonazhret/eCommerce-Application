export function checkDataLoginForm(emailUser: string, passwordUser: string): void {
    // check email, <input> type='text'
    const hasUpperCaseEmail = /[A-Z]/.test(emailUser);
    const hasSpacesEmail = /^\s|\s$/.test(emailUser);
    const hasSymbolDogEmail = /@/.test(emailUser);
    const hasDomenEmail = /\.[a-z]{2,4}/.test(emailUser);

    if (hasUpperCaseEmail) {
        console.log('err-login: has uppercase in email');
    }

    if (hasSpacesEmail) {
        console.log('err-login: has space in email');
    }

    if (!hasSymbolDogEmail) {
        console.log('err-login: no symbol @ in email');
    }

    if (!hasDomenEmail) {
        console.log('err-login: no domen in email');
    }

    // check password, <input> type='password'
    const minLengthPassword = 8;
    const hasUpperCasePassword = /[A-Z]/.test(passwordUser);
    const hasLowerCasePassword = /[a-z]/.test(passwordUser);
    const hasNumberPassword = /\d/.test(passwordUser);
    const hasSpecialSymbolPassword = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(passwordUser);
    const hasSpacesPassword = /^\s|\s$/.test(passwordUser);

    if (passwordUser.length < minLengthPassword) {
        console.log('err-login: wrong length password');
    }

    if (!hasUpperCasePassword) {
        console.log('err-login: no uppercase symbol in password');
    }

    if (!hasLowerCasePassword) {
        console.log('err-login: no lowercase symbol in password');
    }

    if (!hasNumberPassword) {
        console.log('err-login: no number in password');
    }

    if (!hasSpecialSymbolPassword) {
        console.log('err-login: no special symbol in password');
    }

    if (hasSpacesPassword) {
        console.log('err-login: has space in password');
    }
}

export function checkDataRegistrationForm(
    emailUser: string,
    passwordUser: string,
    nameUser: string,
    lastNameUser: string,
    dateBirth: string,
    addressStreet: string,
    addressCity: string,
    adressPostalCode: string,
    adressCountry: string
): void {
    checkDataLoginForm(emailUser, passwordUser);

    // check data registration
    const minQuantitySymbol = 1;
    const hasSpecialSymbolDataName = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\d]/.test(nameUser);
    const hasSpecialSymbolDataCity = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\d]/.test(addressCity);
    const dateBirthUser = new Date(dateBirth).getTime();
    const minAgeUser = 10;
    const yearMaxDateAge = Number(new Date().getFullYear()) - minAgeUser;
    const monthMaxDateAge = `0${new Date().getMonth() + 1}`.slice(-2);
    const dayMaxDateAge = `0${new Date().getDate()}`.slice(-2);
    const maxDateAge = new Date(`${yearMaxDateAge}-${monthMaxDateAge}-${dayMaxDateAge}`).getTime();
    const hasNumberSymbolUppercasePostalCode = /[A-Z\d]/.test(adressPostalCode);

    if (nameUser.length < minQuantitySymbol || lastNameUser.length < minQuantitySymbol) {
        console.log('err-reg: wrong length name or wrong length lastname');
    }

    if (hasSpecialSymbolDataName) {
        console.log('err-reg: has spec symbol or number in name');
    }

    // birth day <input> type='date'
    if (dateBirthUser > maxDateAge || !dateBirthUser) {
        console.log('err-reg: you less then 10 years old');
    }

    if (addressStreet.length < minQuantitySymbol) {
        console.log('err-reg: wrong adress street');
    }

    if (addressCity.length < minQuantitySymbol || hasSpecialSymbolDataCity) {
        console.log('err-reg: wrong adress city');
    }

    if (!hasNumberSymbolUppercasePostalCode) {
        console.log('err-reg: wrong postal code');
    }

    // country <select>
    if (adressCountry.length === 0) {
        console.log('err-reg: no select country');
    }
}
