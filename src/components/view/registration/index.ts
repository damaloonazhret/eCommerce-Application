import './registration.scss';

import InputGenerator from '../../../helpers/inputGenerator';
import { checkDataRegistrationForm, ObjValidationRegistration } from '../../../services/validation';
import FormValidator from '../../../helpers/formValidator';

export default class Registration {
    private registration!: HTMLElement;

    private buttonGeneratorReg: InputGenerator;

    private emailInputReg: InputGenerator;

    private passwordInputReg: InputGenerator;

    private firstNameInputReg: InputGenerator;

    private lastNameInputReg: InputGenerator;

    private dobInputReg: InputGenerator;

    private streetInputReg: InputGenerator;

    private cityInputReg: InputGenerator;

    private postalCodeInputReg: InputGenerator;

    private countryInputReg: InputGenerator;

    private readonly registrationInput: HTMLFormElement;

    constructor() {
        this.buttonGeneratorReg = new InputGenerator('button', 'Button Text', 'reg__button', 'reg-btn');

        this.emailInputReg = new InputGenerator('email', 'Email', 'registration__input-email', 'email-reg');
        this.passwordInputReg = new InputGenerator(
            'password',
            'Password',
            'registration__input-password',
            'password-reg'
        );
        this.firstNameInputReg = new InputGenerator('text', 'First name', 'registration__input-first', 'first-name');

        this.lastNameInputReg = new InputGenerator('text', 'Last name', 'registration__input-last', 'last-name');
        this.dobInputReg = new InputGenerator('date', 'Date of birth', 'registration__input-dob', 'dob');
        this.streetInputReg = new InputGenerator('text', 'Street', 'registration__input-street', 'street');
        this.cityInputReg = new InputGenerator('text', 'City', 'registration__input-city', 'city');
        this.postalCodeInputReg = new InputGenerator('text', 'Postal code', 'registration__input-postal', 'postal');
        this.countryInputReg = new InputGenerator('select', 'Country', 'registration__input-country', 'country');

        this.registrationInput = document.createElement('form');

        this.registrationInput.appendChild(this.emailInputReg.getInputContainer());
        this.registrationInput.appendChild(this.passwordInputReg.getInputContainer());
        this.registrationInput.appendChild(this.firstNameInputReg.getInputContainer());
        this.registrationInput.appendChild(this.lastNameInputReg.getInputContainer());
        this.registrationInput.appendChild(this.dobInputReg.getInputContainer());
        this.registrationInput.appendChild(this.streetInputReg.getInputContainer());
        this.registrationInput.appendChild(this.cityInputReg.getInputContainer());
        this.registrationInput.appendChild(this.postalCodeInputReg.getInputContainer());
        this.registrationInput.appendChild(this.countryInputReg.getInputContainer());
        let emailValue: string;
        let passwordValue: string;
        let firstNameValue: string;
        let lastNameValue: string;
        let dobValue: string;
        let streetValue: string;
        let cityValue: string;
        let postalValue: string;
        let countryValue: string;
        this.registrationInput.appendChild(
            this.buttonGeneratorReg.getButton('registration__button', 'REGISTRATION', (e) => {
                e.preventDefault();
                const obj: {
                    email: string;
                    password: string;
                    firstName: string;
                    lastName: string;
                    dob: string;
                    street: string;
                    city: string;
                    postal: string;
                    country: string;
                } = {
                    email: emailValue,
                    password: passwordValue,
                    firstName: firstNameValue,
                    lastName: lastNameValue,
                    dob: dobValue,
                    street: streetValue,
                    city: cityValue,
                    postal: postalValue,
                    country: countryValue,
                };
                console.log(obj);
            })
        );

        this.registrationInput.addEventListener('input', () => {
            const emailInput = this.emailInputReg.getInputContainer().querySelector('input') as HTMLInputElement;
            const emailSpanError = this.emailInputReg.getInputContainer().querySelector('span') as HTMLSpanElement;
            const passwordInput = this.passwordInputReg.getInputContainer().querySelector('input') as HTMLInputElement;
            const passwordSpanError = this.passwordInputReg
                .getInputContainer()
                .querySelector('span') as HTMLSpanElement;
            const firstNameInput = this.firstNameInputReg
                .getInputContainer()
                .querySelector('input') as HTMLInputElement;
            const firstNameSpanError = this.firstNameInputReg
                .getInputContainer()
                .querySelector('span') as HTMLSpanElement;
            const lastNameInput = this.lastNameInputReg.getInputContainer().querySelector('input') as HTMLInputElement;
            const lastNameSpanError = this.lastNameInputReg
                .getInputContainer()
                .querySelector('span') as HTMLSpanElement;
            const dobInput = this.dobInputReg.getInputContainer().querySelector('input') as HTMLInputElement;
            const dobSpanError = this.dobInputReg.getInputContainer().querySelector('span') as HTMLSpanElement;
            const streetInput = this.streetInputReg.getInputContainer().querySelector('input') as HTMLInputElement;
            const streetSpanError = this.streetInputReg.getInputContainer().querySelector('span') as HTMLSpanElement;
            const cityInput = this.cityInputReg.getInputContainer().querySelector('input') as HTMLInputElement;
            const citySpanError = this.cityInputReg.getInputContainer().querySelector('span') as HTMLSpanElement;
            const postalCodeInput = this.postalCodeInputReg
                .getInputContainer()
                .querySelector('input') as HTMLInputElement;
            const postalCodeSpanError = this.postalCodeInputReg
                .getInputContainer()
                .querySelector('span') as HTMLSpanElement;
            const countryInput = this.countryInputReg.getInputContainer().querySelector('select') as HTMLSelectElement;
            let email: Array<string>;
            let password: Array<string>;
            let firstName: Array<string>;
            let lastName: Array<string>;
            let dob: Array<string>;
            let street: Array<string>;
            let city: Array<string>;
            let postalCode: Array<string>;
            const passSwitch = document.querySelector('.password-reg-switch');
            passSwitch?.removeAttribute('disabled');
            passSwitch?.addEventListener('click', (e: Event) => {
                e.preventDefault();
                if (passwordInput) {
                    if (passwordInput.type === 'password') {
                        passwordInput.type = 'text';
                    } else {
                        passwordInput.type = 'password';
                    }
                }
            });
            if (passwordInput) {
                emailValue = emailInput?.value || '';
                passwordValue = passwordInput?.value || '';
                firstNameValue = firstNameInput?.value || '';
                lastNameValue = lastNameInput?.value || '';
                dobValue = dobInput?.value || '';
                streetValue = streetInput?.value || '';
                cityValue = cityInput?.value || '';
                postalValue = postalCodeInput?.value || '';
                countryValue = countryInput?.value || '';
                const response = checkDataRegistrationForm(
                    emailValue,
                    passwordValue,
                    firstNameValue,
                    lastNameValue,
                    dobValue,
                    streetValue,
                    cityValue,
                    postalValue
                ) as ObjValidationRegistration;
                const btn = document.getElementById('registration__button');
                const allValuesTrue = Object.values(response).every((value: Array<string>) => value.length === 0);
                email = response.email;
                password = response.password;
                firstName = response.nameUser;
                lastName = response.lastNameUser;
                dob = response.dateBirth;
                street = response.addressStreet;
                city = response.addressCity;
                postalCode = response.addressPostalCode;

                if (emailValue !== '' && emailSpanError)
                    FormValidator.handleValidation(this.emailInputReg.getInputContainer(), email, emailSpanError);
                if (passwordValue !== '' && passwordSpanError)
                    FormValidator.handleValidation(
                        this.passwordInputReg.getInputContainer(),
                        password,
                        passwordSpanError
                    );
                if (firstNameValue !== '' && firstNameSpanError)
                    FormValidator.handleValidation(
                        this.firstNameInputReg.getInputContainer(),
                        firstName,
                        firstNameSpanError
                    );
                if (lastNameValue !== '' && lastNameSpanError)
                    FormValidator.handleValidation(
                        this.lastNameInputReg.getInputContainer(),
                        lastName,
                        lastNameSpanError
                    );
                if (dobValue !== '' && dobSpanError)
                    FormValidator.handleValidation(this.dobInputReg.getInputContainer(), dob, dobSpanError);
                if (streetValue !== '' && streetSpanError)
                    FormValidator.handleValidation(this.streetInputReg.getInputContainer(), street, streetSpanError);
                if (cityValue !== '' && citySpanError)
                    FormValidator.handleValidation(this.cityInputReg.getInputContainer(), city, citySpanError);
                if (postalValue !== '' && postalCodeSpanError)
                    FormValidator.handleValidation(
                        this.postalCodeInputReg.getInputContainer(),
                        postalCode,
                        postalCodeSpanError
                    );
                if (allValuesTrue) {
                    btn?.removeAttribute('disabled');
                }
            }
        });

        this.init();
    }

    private init(): void {
        this.registration = document.createElement('section');
        this.registration.classList.add('registration');
        this.registration.appendChild(this.registrationInput);
    }

    public getLayout(): HTMLElement {
        return this.registration;
    }
}
