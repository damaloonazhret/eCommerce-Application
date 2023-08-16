import './registration.scss';

import InputGenerator from '../../../helpers/inputGenerator';
import validation from '../../../services/validation';

export default class Registration {
    private registration!: HTMLElement;

    private registrationForm!: HTMLFormElement;

    private emailDiv!: HTMLElement;

    private emailInput!: HTMLInputElement;

    private passwordDiv!: HTMLElement;

    private passwordInput!: HTMLInputElement;

    private firstNameDiv!: HTMLElement;

    private firstNameInput!: HTMLInputElement;

    private lastNameDiv!: HTMLElement;

    private lastNameInput!: HTMLInputElement;

    private dobDiv!: HTMLElement;

    private dobInput!: HTMLInputElement;

    private streetDiv!: HTMLElement;

    private streetInput!: HTMLInputElement;

    private cityDiv!: HTMLElement;

    private cityInput!: HTMLInputElement;

    private postalCodeDiv!: HTMLElement;

    private postalCodeInput!: HTMLInputElement;

    private countryDiv!: HTMLElement;

    private countryInput!: HTMLSelectElement;

    private submitButton!: HTMLButtonElement;

    private passwordSwitch!: HTMLButtonElement;

    constructor() {
        this.init();
    }

    private init(): void {
        this.registration = document.createElement('section');
        this.registration.classList.add('registration');

        this.registrationForm = document.createElement('form');

        this.emailDiv = new InputGenerator('email', 'Email', 'registration__input-email', 'email').getInputContainer();
        this.emailInput = this.emailDiv.querySelector('input') as HTMLInputElement;

        this.passwordDiv = new InputGenerator(
            'password',
            'Password',
            'registration__input-password',
            'password'
        ).getInputContainer();
        this.passwordInput = this.passwordDiv.querySelector('input') as HTMLInputElement;

        this.firstNameDiv = new InputGenerator(
            'text',
            'First name',
            'registration__input-first',
            'first-name'
        ).getInputContainer();
        this.firstNameInput = this.firstNameDiv.querySelector('input') as HTMLInputElement;

        this.lastNameDiv = new InputGenerator(
            'text',
            'Last name',
            'registration__input-last',
            'last-name'
        ).getInputContainer();
        this.lastNameInput = this.lastNameDiv.querySelector('input') as HTMLInputElement;

        this.dobDiv = new InputGenerator('date', 'Date of birth', 'registration__input-dob', 'dob').getInputContainer();
        this.dobInput = this.dobDiv.querySelector('input') as HTMLInputElement;

        this.streetDiv = new InputGenerator(
            'text',
            'Street',
            'registration__input-street',
            'street'
        ).getInputContainer();
        this.streetInput = this.streetDiv.querySelector('input') as HTMLInputElement;

        this.cityDiv = new InputGenerator('text', 'City', 'registration__input-city', 'city').getInputContainer();
        this.cityInput = this.cityDiv.querySelector('input') as HTMLInputElement;

        this.postalCodeDiv = new InputGenerator(
            'text',
            'Postal code',
            'registration__input-postal',
            'postal'
        ).getInputContainer();
        this.postalCodeInput = this.postalCodeDiv.querySelector('input') as HTMLInputElement;

        this.countryDiv = new InputGenerator(
            'select',
            'Country',
            'registration__input-country',
            'country'
        ).getInputContainer();
        this.countryInput = this.countryDiv.querySelector('select') as HTMLSelectElement;

        this.submitButton = new InputGenerator('button', 'Button Text', 'reg__button', 'reg-btn').getButton(
            'registration__button',
            'REGISTRATION',
            (e) => this.submit(e)
        );

        this.registrationForm.append(this.emailDiv);
        this.registrationForm.append(this.passwordDiv);
        this.registrationForm.append(this.firstNameDiv);
        this.registrationForm.append(this.lastNameDiv);
        this.registrationForm.append(this.dobDiv);
        this.registrationForm.append(this.streetDiv);
        this.registrationForm.append(this.cityDiv);
        this.registrationForm.append(this.postalCodeDiv);
        this.registrationForm.append(this.countryDiv);
        this.registrationForm.append(this.submitButton);

        this.registration.append(this.registrationForm);

        this.registrationForm.addEventListener('input', (e) =>
            validation(e.target as HTMLInputElement, this.showError.bind(this))
        );

        this.passwordSwitch = this.passwordDiv.querySelector('.password-switch') as HTMLButtonElement;
        this.passwordSwitch.addEventListener('click', (e) => this.togglePasswordVisibility(e));
    }

    public getLayout(): HTMLElement {
        return this.registration;
    }

    private submit(e: Event): void {
        e.preventDefault();
        let valid = true;

        const inputs = Array.from(this.registrationForm.querySelectorAll('input'));
        for (let i = 0; i < inputs.length; i += 1) {
            const errors = validation(inputs[i], this.showError.bind(this));
            if (errors.length > 0) {
                valid = false;
            }
        }

        if (!valid) {
            console.log('not valid', {
                email: this.emailInput.value,
                password: this.passwordInput.value,
                firstName: this.firstNameInput.value,
                lastName: this.lastNameInput.value,
                dateOfBirth: this.dobInput.value,
                addresses: {
                    streetName: this.streetInput.value,
                    city: this.cityInput.value,
                    postalCode: this.postalCodeInput.value,
                    country: this.countryInput.value,
                },
            });
            return;
        }

        console.log('valid', {
            email: this.emailInput.value,
            password: this.passwordInput.value,
            firstName: this.firstNameInput.value,
            lastName: this.lastNameInput.value,
            dateOfBirth: this.dobInput.value,
            addresses: {
                streetName: this.streetInput.value,
                city: this.cityInput.value,
                postalCode: this.postalCodeInput.value,
                country: this.countryInput.value,
            },
        });
    }

    private showError(input: HTMLInputElement, messages: Array<string>): void {
        if (messages.length < 0) return;

        const inputParent = input.parentElement as HTMLElement;
        const errorUl = inputParent.querySelector('.error') as HTMLElement;
        errorUl.innerHTML = '';

        messages.forEach((message) => {
            const li = document.createElement('li');
            li.textContent = message;
            errorUl.append(li);
        });
    }

    private togglePasswordVisibility(e: Event): void {
        e.preventDefault();

        if (this.passwordInput.type === 'password') {
            this.passwordInput.type = 'text';
            this.passwordSwitch.textContent = 'H';
        } else {
            this.passwordInput.type = 'password';
            this.passwordSwitch.textContent = 'S';
        }
    }
}
