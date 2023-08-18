import './registration.scss';

import InputGenerator from '../../../helpers/inputGenerator';
import validation from '../../../services/validation';
import Controller from '../../controller';
import { UserRegistrationData } from '../../../types/interfaces';

export default class Registration {
    private controller: Controller;

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

    private navigateTo: (url: string) => void;

    constructor(controller: Controller, navigateTo: (url: string) => void) {
        this.controller = controller;
        this.navigateTo = navigateTo;
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

    private async submit(e: Event): Promise<void> {
        e.preventDefault();
        let valid = true;

        const inputs = Array.from(this.registrationForm.querySelectorAll('input'));
        for (let i = 0; i < inputs.length; i += 1) {
            const errors = validation(inputs[i], this.showError.bind(this));
            if (errors.length > 0) {
                valid = false;
            }
        }

        const userData: UserRegistrationData = {
            email: this.emailInput.value,
            password: this.passwordInput.value,
            firstName: this.firstNameInput.value,
            lastName: this.lastNameInput.value,
            dateOfBirth: this.dobInput.value,
            addresses: [
                {
                    streetName: this.streetInput.value,
                    postalCode: this.postalCodeInput.value,
                    city: this.cityInput.value,
                    country: this.countryInput.value,
                },
            ],
        };

        if (!valid) {
            console.log('not valid', userData);
            return;
        }

        console.log('valid', userData);

        const result = await this.controller.signUp(userData);

        if (result.success) {
            console.log('registration success');
            this.navigateTo('/');
        } else {
            // TODO: show error on page
            console.log(result.message);
        }
    }

    private showError(input: HTMLInputElement, messages: Array<string>): void {
        const inputParent = input.parentElement as HTMLElement;
        const errorUl = inputParent.querySelector('.error') as HTMLElement;

        errorUl.innerHTML = '';

        if (messages.length === 0) {
            input.classList.remove('not-valid');
            input.classList.add('valid');
            return;
        }

        input.classList.remove('valid');
        input.classList.add('not-valid');

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
            this.passwordSwitch.classList.add('hide');
        } else {
            this.passwordInput.type = 'password';
            this.passwordSwitch.classList.remove('hide');
        }
    }
}
