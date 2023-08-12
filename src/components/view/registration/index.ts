import './registration.scss';

import InputGenerator from '../../../helpers/inputGenerator';

const buttonGeneratorReg = new InputGenerator('button', 'Button Text', 'reg__button', 'reg-btn');

export const emailInputReg = new InputGenerator('email', 'Email', 'registration__input-email', 'email-reg');
export const passwordInputReg = new InputGenerator(
    'password',
    'Password',
    'registration__input-password',
    'password-reg'
);
export const firstNameInputReg = new InputGenerator('text', 'First name', 'registration__input-first', 'first-name');
export const lastNameInputReg = new InputGenerator('text', 'Last name', 'registration__input-last', 'last-name');
export const dobInputReg = new InputGenerator('date', 'Date of birth', 'registration__input-dob', 'dob');
export const streetInputReg = new InputGenerator('text', 'Street', 'registration__input-street', 'street');
export const cityInputReg = new InputGenerator('text', 'City', 'registration__input-city', 'city');
export const postalCodeInputReg = new InputGenerator('text', 'Postal code', 'registration__input-postal', 'postal');
export const countryInputReg = new InputGenerator('text', 'Country', 'registration__input-country', 'country');

export const registrationInput = document.createElement('form');

registrationInput.appendChild(emailInputReg.getInputContainer());
registrationInput.appendChild(passwordInputReg.getInputContainer());
registrationInput.appendChild(firstNameInputReg.getInputContainer());
registrationInput.appendChild(lastNameInputReg.getInputContainer());
registrationInput.appendChild(dobInputReg.getInputContainer());
registrationInput.appendChild(streetInputReg.getInputContainer());
registrationInput.appendChild(cityInputReg.getInputContainer());
registrationInput.appendChild(postalCodeInputReg.getInputContainer());
registrationInput.appendChild(countryInputReg.getInputContainer());
registrationInput.appendChild(buttonGeneratorReg.getButton('registration__button', 'REGISTRATION', () => {}));

export default class Registration {
    private registration!: HTMLElement;

    constructor() {
        this.init();
    }

    private init(): void {
        this.registration = document.createElement('section');
        this.registration.classList.add('registration');
        this.registration.appendChild(registrationInput);
    }

    public getLayout(): HTMLElement {
        return this.registration;
    }
}
