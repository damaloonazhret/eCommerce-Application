const isEmpty = (value: string): boolean => value === '';
const hasOnlyLetters = (value: string): boolean => /^[A-Za-z]+$/.test(value);
const hasAtSymbol = (value: string): boolean => /@/.test(value);
const isAllowedEmailCharacters = (value: string): boolean => /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.@\\-]+$/.test(value);
const isEmailNameValidWithDots = (value: string): boolean => /^(?!.*\.\.)[^.].*[^.]$/.test(value);
const isEmailNameValidWithDashes = (value: string): boolean => /^(?!.*--)[^-].*[^-]$/.test(value);
const isAllowedPasswordCharacters = (value: string): boolean => /^[a-zA-Z0-9!@#$%^&*]+$/.test(value);
const hasLowerCase = (value: string): boolean => /[a-z]/.test(value);
const hasUppercaseCharacters = (value: string): boolean => /[A-Z]/.test(value);
const hasDigit = (value: string): boolean => /\d/.test(value);
const hasLength = (value: string, length: number): boolean => value.length >= length;
const hasExactLength = (value: string, length: number): boolean => value.length === length;
const hasNoWhitespace = (value: string): boolean => !/^\s|\s$/.test(value);
const hasSpecialCharacter = (value: string): boolean => /[!@#$%^&*"'`~]/.test(value);
const isEmailFormatted = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isAllowedDomainCharacters = (value: string): boolean => /^[A-Za-z0-9-.]+$/.test(value);
const hasDomainName = (value: string): boolean => /\.[A-Za-z]{2,}(?:\.?[A-Za-z]{2,})*$/.test(value);
const isNameValid = (value: string): boolean => /^[a-zA-Z]+$/.test(value);
const hasOnlyDigits = (value: string): boolean => /^[0-9]+$/.test(value);

const isAgeValid = (birthDate: string, requiredAge: number, maxAge: number): boolean => {
    const today = new Date();
    const parsedBirthDate = new Date(birthDate);

    const timeDiff = today.getTime() - parsedBirthDate.getTime();
    const ageInYears = timeDiff / (1000 * 60 * 60 * 24 * 365.25);
    return ageInYears >= requiredAge && ageInYears <= maxAge;
};

export const checkEmail = (email: string): string[] => {
    const errors = [];
    const parts = email.split('@');
    const [username, domain] = parts;

    if (isEmpty(email)) {
        errors.push('Email cannot be blank.');
        return errors;
    }

    if (!isEmailNameValidWithDots(username)) {
        if (!(hasExactLength(username, 1) && hasOnlyLetters(username))) {
            errors.push('Email address not valid.');
        }
    }

    if (!isEmailNameValidWithDots(domain) || !isEmailNameValidWithDashes(domain)) {
        errors.push('Email address not valid.');
    }

    if (!isAllowedDomainCharacters(domain)) {
        errors.push('Domain part of email address is not valid.');
    }

    if (!isEmailFormatted(email)) {
        errors.push('Email address is not properly formatted.');
    }

    if (!hasNoWhitespace(email)) {
        errors.push('Password cannot contain whitespace.');
    }

    if (!hasDomainName(domain)) {
        errors.push('Email address must contain a domain name.');
    }

    if (!hasAtSymbol(email)) {
        errors.push('Email address must contain an @ symbol separating local part and domain name.');
    }

    if (!isAllowedEmailCharacters(email)) {
        errors.push('Email address must contain only Latin characters, digits, and symbols.');
    }

    return errors;
};

export const checkPassword = (password: string): string[] => {
    const errors = [];
    const minLength = 8;

    if (isEmpty(password)) {
        errors.push('Password cannot be blank.');
        return errors;
    }

    if (!hasLength(password, minLength)) {
        errors.push(`Password must be at least ${minLength} characters.`);
    }

    if (!hasLowerCase(password)) {
        errors.push('Password must contain at least one lowercase letter (a-z).');
    }

    if (!hasUppercaseCharacters(password)) {
        errors.push('Password must contain at least one uppercase letter (A-Z).');
    }

    if (!hasDigit(password)) {
        errors.push('Password must contain at least one digit (0-9).');
    }

    if (!hasSpecialCharacter(password)) {
        errors.push('Password must contain at least one special character (e.g., !@#$%^&*).');
    }

    if (!hasNoWhitespace(password)) {
        errors.push('Password cannot contain whitespace.');
    }

    if (!isAllowedPasswordCharacters(password)) {
        errors.push('Password must contain only Latin characters and digits and symbols.');
    }

    return errors;
};

export const checkName = (name: string): string[] => {
    const errors = [];

    const minLength = 1;

    if (isEmpty(name)) {
        errors.push('Name cannot be blank.');
        return errors;
    }

    if (!hasLength(name, minLength)) {
        errors.push(`Name must be at least ${minLength} characters.`);
    }

    if (!hasNoWhitespace(name)) {
        errors.push('Name cannot contain whitespace.');
    }

    if (!isNameValid(name)) {
        errors.push('Name must contain only Latin characters.');
    }

    return errors;
};

export const checkAge = (birthDate: string): string[] => {
    const errors = [];
    const minAge = 13;
    const maxAge = 100;

    if (isEmpty(birthDate)) {
        errors.push('Date of birth cannot be blank.');
        return errors;
    }

    if (!isAgeValid(birthDate, minAge, maxAge)) {
        errors.push(`Age must be between ${minAge} and ${maxAge}.`);
    }

    return errors;
};

export const checkStreet = (street: string): string[] => {
    const errors = [];
    const minLength = 1;

    if (isEmpty(street)) {
        errors.push('Street cannot be blank.');
        return errors;
    }

    if (!hasLength(street, minLength)) {
        errors.push(`Street must contain at least ${minLength} character.`);
    }

    return errors;
};

export const checkCity = (street: string): string[] => {
    const errors = [];
    const minLength = 1;

    if (isEmpty(street)) {
        errors.push('Street cannot be blank.');
        return errors;
    }

    if (!hasLength(street, minLength)) {
        errors.push(`Street must contain at least ${minLength} character.`);
    }

    if (!hasOnlyLetters(street)) {
        errors.push('Street must contain only Latin characters.');
    }

    return errors;
};

export const checkPostalCode = (postalCode: string): string[] => {
    const errors = [];
    const minLength = 5;

    if (isEmpty(postalCode)) {
        errors.push('Postal code cannot be blank.');
        return errors;
    }

    if (hasSpecialCharacter(postalCode)) {
        errors.push('Postal code cannot contain special characters.');
    }

    if (!hasExactLength(postalCode, minLength)) {
        errors.push(`Postal code must contain ${minLength} digits.`);
    }

    if (!hasOnlyDigits(postalCode)) {
        errors.push('Postal code must contain only digits.');
    }

    return errors;
};

const validation = (
    input: HTMLInputElement,
    errorHandler: (input: HTMLInputElement, messages: string[]) => void
): string[] => {
    switch (input.id) {
        case 'email':
            errorHandler(input, checkEmail(input.value));
            console.log(input, checkEmail(input.value));
            return checkEmail(input.value);
        case 'password':
            errorHandler(input, checkPassword(input.value));
            return checkPassword(input.value);
        case 'first-name':
        case 'last-name':
            errorHandler(input, checkName(input.value));
            return checkName(input.value);
        case 'dob':
            errorHandler(input, checkAge(input.value));
            return checkAge(input.value);
        case 'street-shipping':
            errorHandler(input, checkStreet(input.value));
            return checkStreet(input.value);
        case 'street-billing':
            errorHandler(input, checkStreet(input.value));
            return checkStreet(input.value);
        case 'city-billing':
            errorHandler(input, checkCity(input.value));
            return checkCity(input.value);
        case 'city-shipping':
            errorHandler(input, checkCity(input.value));
            return checkCity(input.value);
        case 'postal-shipping':
            errorHandler(input, checkPostalCode(input.value));
            return checkPostalCode(input.value);
        case 'postal-billing':
            errorHandler(input, checkPostalCode(input.value));
            return checkPostalCode(input.value);
        default:
            return [];
    }
};

export default validation;
