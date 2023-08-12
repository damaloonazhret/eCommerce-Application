import './registration.scss';

import InputGenerator from '../../../helpers/inputGenerator';

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
        this.buttonGeneratorReg = new InputGenerator(
            'button',
            'Button Text',
            'reg__button',
            'reg-btn',
            'must contains ...'
        );

        this.emailInputReg = new InputGenerator(
            'email',
            'Email',
            'registration__input-email',
            'email-reg',
            "Email: local part and the domain name separated by '@', without leading or trailing spaces."
        );
        this.passwordInputReg = new InputGenerator(
            'password',
            'Password',
            'registration__input-password',
            'password-reg',
            'Password: Minimum 8 characters, 1 capital letter (A-Z), 1 small letter (a-z), 1 number (0-9), 1 special character (e.g. !@#$%^&*), no leading or trailing spaces.'
        );
        this.firstNameInputReg = new InputGenerator(
            'text',
            'First name',
            'registration__input-first',
            'first-name',
            'First name: Must contain at least one character and no special characters or numbers.'
        );

        this.firstNameInputReg.getInputContainer().classList.add('error');

        this.lastNameInputReg = new InputGenerator(
            'text',
            'Last name',
            'registration__input-last',
            'last-name',
            'Last name: Must contain at least one character and no special characters or numbers.'
        );
        this.dobInputReg = new InputGenerator(
            'date',
            'Date of birth',
            'registration__input-dob',
            'dob',
            'Date of birth: A valid date input ensuring the user is above a certain age (e.g., 13 years old or older).'
        );
        this.streetInputReg = new InputGenerator(
            'text',
            'Street',
            'registration__input-street',
            'street',
            'Street: Must contain at least one character.'
        );
        this.cityInputReg = new InputGenerator(
            'text',
            'City',
            'registration__input-city',
            'city',
            'City: Must contain at least one character and no special characters or numbers.'
        );
        this.postalCodeInputReg = new InputGenerator(
            'text',
            'Postal code',
            'registration__input-postal',
            'postal',
            'Postal code: Must follow the format for the country (e.g., 12345 or A1B 2C3 for the U.S. and Canada, respectively.)'
        );
        this.countryInputReg = new InputGenerator(
            'text',
            'Country',
            'registration__input-country',
            'country',
            'Country: Must be a valid country from a predefined list or autocomplete field.'
        );

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
        this.registrationInput.appendChild(
            this.buttonGeneratorReg.getButton('registration__button', 'REGISTRATION', () => {})
        );
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
