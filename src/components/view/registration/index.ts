import './registration.scss';

import InputGenerator from '../../../helpers/inputGenerator';
import validation from '../../../services/validation';
import Controller from '../../controller';
import { UserRegistrationData } from '../../../types/interfaces';
import ValidationUtils from '../../../helpers/formValidator';
import ButtonGenerator from '../../../helpers/buttonSwitchGenerator';
import SuccessRegistration from '../../../helpers/successRegistratioin';
import AlreadyRegister from '../../../helpers/alreadyRegisterGenerator';

export default class Registration {
    private defaultShippingAddressValue!: string;

    private defaultBillingAddressValue!: string;

    private shippingAddressValue: number = 0;

    private billingAddressValue: number = 1;

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

    private shippingAddressContainer!: HTMLElement;

    private billingAddressContainer!: HTMLElement;

    private shippingHead!: HTMLElement;

    private billingHead!: HTMLElement;

    private billingHeadSpan!: HTMLElement;

    private shippingHeadSpan!: HTMLElement;

    private buttonGenerator!: ButtonGenerator;

    private buttonSwitcherShipping!: HTMLElement;

    private buttonSwitcherShippingBtn!: HTMLElement;

    private buttonSwitcherShippingCheckbox!: HTMLElement;

    private buttonSwitcherBilling!: HTMLElement;

    private buttonSwitcherBillingBtn!: HTMLElement;

    private streetDiv!: HTMLElement;

    private streetInput!: HTMLInputElement;

    private cityDiv!: HTMLElement;

    private cityInput!: HTMLInputElement;

    private postalCodeDiv!: HTMLElement;

    private postalCodeInput!: HTMLInputElement;

    private countryDiv!: HTMLElement;

    private countryInput!: HTMLSelectElement;

    private streetDivBilling!: HTMLElement;

    private streetInputBilling!: HTMLInputElement;

    private cityDivBilling!: HTMLElement;

    private cityInputBilling!: HTMLInputElement;

    private postalCodeDivBilling!: HTMLElement;

    private postalCodeInputBilling!: HTMLInputElement;

    private countryDivBilling!: HTMLElement;

    private countryInputBilling!: HTMLSelectElement;

    private submitButton!: HTMLButtonElement;

    private passwordSwitch!: HTMLButtonElement;

    private errorMessage!: HTMLSpanElement;

    private alreadyRegister!: HTMLElement;

    private popup!: HTMLElement;

    private navigateTo: (url: string) => void;

    constructor(controller: Controller, navigateTo: (url: string) => void) {
        this.controller = controller;
        this.navigateTo = navigateTo;
        this.init();
    }

    private init(): void {
        if (localStorage.isTokenUser === 'true') {
            window.location.href = '/';
        } else {
            this.registration = document.createElement('section');
            this.registration.classList.add('registration');

            this.shippingAddressContainer = document.createElement('div');
            this.shippingAddressContainer.classList.add('registration__address-container_shipping');

            this.billingAddressContainer = document.createElement('div');
            this.billingAddressContainer.classList.add('registration__address-container_billing');

            this.shippingHead = document.createElement('div');
            this.shippingHeadSpan = document.createElement('h3');
            this.shippingHead.classList.add('registration__title');
            this.shippingHeadSpan.innerText = 'Shipping';

            this.billingHead = document.createElement('div');
            this.billingHeadSpan = document.createElement('h3');
            this.billingHead.classList.add('registration__title');
            this.billingHeadSpan.innerText = 'Billing';

            this.errorMessage = document.createElement('span');
            this.errorMessage.classList.add('registration__error');

            this.registrationForm = document.createElement('form');

            this.emailDiv = new InputGenerator(
                'email',
                'Email',
                'registration__input-email',
                'email'
            ).getInputContainer();
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

            this.dobDiv = new InputGenerator(
                'date',
                'Date of birth',
                'registration__input-dob',
                'dob'
            ).getInputContainer();
            this.dobInput = this.dobDiv.querySelector('input') as HTMLInputElement;

            this.streetDiv = new InputGenerator(
                'text',
                'Street',
                'registration__input-street',
                'street-shipping'
            ).getInputContainer();
            this.streetInput = this.streetDiv.querySelector('input') as HTMLInputElement;

            this.cityDiv = new InputGenerator(
                'text',
                'City',
                'registration__input-city',
                'city-shipping'
            ).getInputContainer();
            this.cityInput = this.cityDiv.querySelector('input') as HTMLInputElement;

            this.postalCodeDiv = new InputGenerator(
                'text',
                'Postal code',
                'registration__input-postal',
                'postal-shipping'
            ).getInputContainer();
            this.postalCodeInput = this.postalCodeDiv.querySelector('input') as HTMLInputElement;

            this.countryDiv = new InputGenerator(
                'select',
                'Country',
                'registration__input-country',
                'country'
            ).getInputContainer();
            this.countryInput = this.countryDiv.querySelector('select') as HTMLSelectElement;

            this.buttonGenerator = new ButtonGenerator();

            this.buttonSwitcherShipping = this.buttonGenerator.createButtonWithCheckbox(
                'registration__button-switcher',
                'Set as default address',
                'Also use as billing address'
            );

            this.buttonSwitcherBilling = this.buttonGenerator.createButtonWithCheckbox(
                'registration__button-switcher_billing',
                'Set as default address',
                'none'
            );

            this.buttonSwitcherShippingBtn = this.buttonSwitcherShipping.querySelector(
                'div button'
            ) as HTMLButtonElement;

            this.buttonSwitcherShippingCheckbox = this.buttonSwitcherShipping.querySelector(
                'div input'
            ) as HTMLInputElement;

            this.buttonSwitcherBillingBtn = this.buttonSwitcherBilling.querySelector('div button') as HTMLButtonElement;

            this.streetDivBilling = new InputGenerator(
                'text',
                'Street',
                'registration__input-street-billing',
                'street-billing'
            ).getInputContainer();
            this.streetInputBilling = this.streetDivBilling.querySelector('input') as HTMLInputElement;

            this.cityDivBilling = new InputGenerator(
                'text',
                'City',
                'registration__input-city-billing',
                'city-billing'
            ).getInputContainer();
            this.cityInputBilling = this.cityDivBilling.querySelector('input') as HTMLInputElement;

            this.postalCodeDivBilling = new InputGenerator(
                'text',
                'Postal code',
                'registration__input-postal-billing',
                'postal-billing'
            ).getInputContainer();
            this.postalCodeInputBilling = this.postalCodeDivBilling.querySelector('input') as HTMLInputElement;

            this.countryDivBilling = new InputGenerator(
                'select',
                'Country',
                'registration__input-country-billing',
                'country'
            ).getInputContainer();
            this.countryInputBilling = this.countryDivBilling.querySelector('select') as HTMLSelectElement;

            this.submitButton = new InputGenerator('button', 'Button Text', 'reg__button', 'reg-btn').getButton(
                'registration__button',
                'REGISTRATION',
                (e) => this.submit(e)
            );

            this.alreadyRegister = new AlreadyRegister(
                'registration',
                'Already registered?',
                'Sign in here!'
            ).getContainer();

            this.registrationForm.append(this.emailDiv);
            this.registrationForm.append(this.passwordDiv);
            this.registrationForm.append(this.firstNameDiv);
            this.registrationForm.append(this.lastNameDiv);
            this.registrationForm.append(this.dobDiv);

            this.shippingHead.append(this.shippingHeadSpan);
            this.shippingAddressContainer.append(this.shippingHead);
            this.shippingAddressContainer.append(this.streetDiv);
            this.shippingAddressContainer.append(this.cityDiv);
            this.shippingAddressContainer.append(this.postalCodeDiv);
            this.shippingAddressContainer.append(this.countryDiv);
            this.shippingAddressContainer.appendChild(this.buttonSwitcherShipping);
            this.billingHead.append(this.billingHeadSpan);
            this.billingAddressContainer.append(this.billingHead);
            this.billingAddressContainer.append(this.streetDivBilling);
            this.billingAddressContainer.append(this.cityDivBilling);
            this.billingAddressContainer.append(this.postalCodeDivBilling);
            this.billingAddressContainer.append(this.countryDivBilling);
            this.billingAddressContainer.append(this.buttonSwitcherBilling);

            this.registrationForm.append(this.shippingAddressContainer);
            this.registrationForm.append(this.billingAddressContainer);

            this.registrationForm.append(this.submitButton);
            this.registrationForm.append(this.alreadyRegister);

            this.registration.append(this.registrationForm);

            this.registrationForm.addEventListener('input', (e) =>
                validation(e.target as HTMLInputElement, this.showError.bind(this))
            );

            this.passwordSwitch = this.passwordDiv.querySelector('.password-switch') as HTMLButtonElement;
            this.passwordSwitch.addEventListener('click', (e) => this.togglePasswordVisibility(e));
            let activeShipping = false;
            let activeBilling = false;
            this.buttonSwitcherShippingBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.buttonSwitcherShippingBtn.classList.toggle('active');

                if (!activeShipping) {
                    this.defaultShippingAddressValue = '0';
                    if (this.billingAddressValue === 0) {
                        this.defaultBillingAddressValue = '1';
                    }
                    activeShipping = true;
                } else if (activeShipping) {
                    this.defaultShippingAddressValue = '';
                    if (this.billingAddressValue === 0) {
                        this.defaultBillingAddressValue = '';
                    }
                    activeShipping = false;
                }
            });
            this.buttonSwitcherBillingBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.buttonSwitcherBillingBtn.classList.toggle('active');

                if (!activeBilling) {
                    this.defaultBillingAddressValue = '1';
                    activeBilling = true;
                } else if (activeBilling) {
                    this.defaultBillingAddressValue = '';
                    activeBilling = false;
                }
            });
            let visibility = true;
            this.buttonSwitcherShippingCheckbox.addEventListener('click', () => {
                if (visibility) {
                    this.registrationForm.removeChild(this.billingAddressContainer);
                    visibility = false;
                    this.shippingAddressValue = 0;
                    this.billingAddressValue = 0;
                } else {
                    this.registrationForm.insertBefore(this.billingAddressContainer, this.submitButton);
                    visibility = true;
                    this.shippingAddressValue = 0;
                    this.billingAddressValue = 1;
                }
            });
        }
    }

    public getLayout(): HTMLElement {
        return this.registration;
    }

    public delItemMenuRegAndLogin(): void {
        const headerNavList = document.querySelector('.header__nav-list') as HTMLElement;
        Array.from(headerNavList.children).forEach((el) => {
            const itemMenu = el as HTMLElement;
            if (itemMenu.classList.contains('header__sign-up') || itemMenu.classList.contains('header__login')) {
                itemMenu.style.display = 'none';
                Array.from(itemMenu.children).forEach((el2) => {
                    el2.classList.remove('active');
                });
            }
            if (itemMenu.classList.contains('header__home')) {
                Array.from(itemMenu.children).forEach((el2) => {
                    el2.classList.add('active');
                });
            }

            if (itemMenu.classList.contains('header__logout')) {
                itemMenu.style.display = 'block';
            }
        });
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
                {
                    streetName: this.streetInputBilling.value,
                    postalCode: this.postalCodeInputBilling.value,
                    city: this.cityInputBilling.value,
                    country: this.countryInputBilling.value,
                },
            ],
            shippingAddresses: [this.shippingAddressValue],
            defaultShippingAddress: this.defaultShippingAddressValue,
            defaultBillingAddress: this.defaultBillingAddressValue,
            billingAddresses: [this.billingAddressValue],
        };

        if (this.defaultBillingAddressValue === '') {
            delete userData.defaultBillingAddress;
        }

        if (this.defaultShippingAddressValue === '') {
            delete userData.defaultShippingAddress;
        }

        if (!valid) {
            console.log('not valid', userData);
            return;
        }

        console.log('valid', userData);

        const result = await this.controller.signUp(userData);

        if (result.success) {
            this.popup = new SuccessRegistration(
                'popup',
                'success',
                'Your registration is success'
            ).getInputContainer();
            document.body.append(this.popup);
            localStorage.setItem('isTokenUser', 'true');
            setTimeout(() => {
                document.body.removeChild(this.popup);
                this.delItemMenuRegAndLogin();
                this.navigateTo('/');
            }, 1400);
        } else {
            this.errorMessage.innerText = result.message;
            this.registrationForm.insertBefore(this.errorMessage, this.submitButton);
            console.log(result.message);
        }
    }

    private togglePasswordVisibility(e: Event): void {
        e.preventDefault();
        ValidationUtils.togglePasswordVisibility(this.passwordInput, this.passwordSwitch);
    }

    private showError(input: HTMLInputElement, messages: Array<string>): void {
        ValidationUtils.showError(input, messages);
    }
}
