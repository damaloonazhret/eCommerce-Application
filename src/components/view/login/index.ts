import './login.scss';
import InputGenerator from '../../../helpers/inputGenerator';
import validation from '../../../services/validation';
import Controller from '../../controller';
import { UserLoginData } from '../../../types/interfaces';
import ValidationUtils from '../../../helpers/formValidator';
import SuccessRegistration from '../../../helpers/successRegistratioin';
import AlreadyRegister from '../../../helpers/alreadyRegisterGenerator';

export default class Login {
    private login!: HTMLElement;

    private loginDiv!: HTMLElement;

    private loginInput!: HTMLInputElement;

    private passwordDiv!: HTMLElement;

    private passwordInput!: HTMLInputElement;

    private loginForm!: HTMLFormElement;

    private submitButton!: HTMLButtonElement;

    private passwordSwitch!: HTMLButtonElement;

    private controller: Controller;

    private errorMessage!: HTMLSpanElement;

    private needRegistration!: HTMLElement;

    private popup!: HTMLElement;

    private navigateTo: (url: string) => void;

    constructor(controller: Controller, navigateTo: (url: string) => void) {
        this.controller = controller;
        this.navigateTo = navigateTo;
        this.init();
    }

    private init(): void {
        this.login = document.createElement('section');
        this.login.classList.add('login');

        this.errorMessage = document.createElement('span');
        this.errorMessage.classList.add('registration__error');

        this.loginForm = document.createElement('form');

        this.loginDiv = new InputGenerator('text', 'Enter Email', 'login__email', 'email').getInputContainer();
        this.loginInput = this.loginDiv.querySelector('input') as HTMLInputElement;

        this.passwordDiv = new InputGenerator(
            'password',
            'Enter password',
            'login__password',
            'password'
        ).getInputContainer();
        this.passwordInput = this.passwordDiv.querySelector('input') as HTMLInputElement;

        this.submitButton = new InputGenerator('button', 'Button Text', 'login__button', 'login-btn').getButton(
            'login__button',
            'LOGIN',
            (e) => this.submit(e)
        );

        this.needRegistration = new AlreadyRegister(
            'registration',
            'Not registered yet?',
            'Registration in here!'
        ).getContainer();

        this.loginForm.append(this.loginDiv);
        this.loginForm.append(this.passwordDiv);
        this.loginForm.append(this.submitButton);
        this.loginForm.append(this.needRegistration);

        this.login.append(this.loginForm);

        this.loginForm.addEventListener('input', (e) =>
            validation(e.target as HTMLInputElement, this.showError.bind(this))
        );

        this.passwordSwitch = this.passwordDiv.querySelector('.password-switch') as HTMLButtonElement;
        this.passwordSwitch.addEventListener('click', (e) => this.togglePasswordVisibility(e));
    }

    public getLayout(): HTMLElement {
        return this.login;
    }

    private async submit(e: Event): Promise<void> {
        e.preventDefault();
        let valid = true;

        const inputs = Array.from(this.loginForm.querySelectorAll('input'));
        for (let i = 0; i < inputs.length; i += 1) {
            const errors = validation(inputs[i], this.showError.bind(this));
            if (errors.length > 0) {
                valid = false;
            }
        }

        const userData: UserLoginData = {
            email: this.loginInput.value,
            password: this.passwordInput.value,
        };

        if (!valid) {
            console.log('not valid', userData);
            return;
        }

        console.log('valid', userData);

        const result = await this.controller.signIn(userData);

        if (result.success) {
            this.popup = new SuccessRegistration('popup', 'Success', 'Your login is success').getInputContainer();
            document.body.append(this.popup);
            setTimeout(() => {
                document.body.removeChild(this.popup);
                this.navigateTo('/');
            }, 1400);
        } else {
            this.errorMessage.innerText = result.message;
            this.loginForm.insertBefore(this.errorMessage, this.submitButton);
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
