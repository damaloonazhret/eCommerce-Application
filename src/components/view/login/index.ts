import './login.scss';
import InputGenerator from '../../../helpers/inputGenerator';
import { checkDataLoginForm } from '../../../services/validation';
import FormValidator from '../../../helpers/formValidator';

export default class Login {
    private login!: HTMLElement;

    private loginInput: InputGenerator;

    private passwordInput: InputGenerator;

    private readonly loginForm: HTMLFormElement;

    constructor() {
        this.loginInput = new InputGenerator('text', 'Enter Email', 'login__email', 'email');

        this.passwordInput = new InputGenerator('password', 'Enter password', 'login__password', 'password');

        this.loginForm = document.createElement('form');
        this.loginForm.appendChild(this.loginInput.getInputContainer());
        this.loginForm.appendChild(this.passwordInput.getInputContainer());

        const buttonGenerator = new InputGenerator('button', 'Button Text', 'login__button', 'login-btn');

        let emailValue: string;
        let passwordValue: string;

        const buttonElement = buttonGenerator.getButton('login__button', 'LOGIN', (e) => {
            e.preventDefault();
            const obj = {
                email: emailValue,
                password: passwordValue,
            };
            console.log(obj);
        });

        if (buttonElement) {
            this.loginForm.appendChild(buttonElement);
        }

        this.loginForm.addEventListener('input', (e: Event) => {
            e.preventDefault();
            const emailInput = this.loginInput.getInputContainer().querySelector('input');
            const emailSpanError = this.loginInput.getInputContainer().querySelector('span');
            const passwordInput = this.passwordInput.getInputContainer().querySelector('input');
            const passwordSpanError = this.passwordInput.getInputContainer().querySelector('span');
            let email;
            let password;

            if (passwordInput) {
                emailValue = emailInput?.value || '';
                passwordValue = passwordInput?.value || '';
                const response = checkDataLoginForm(emailValue, passwordValue);
                const allValuesTrue = Object.values(response).every((value: Array<string>) => value.length === 0);
                const btn = document.getElementById('login__button');

                email = response.email;
                password = response.password;

                if (emailValue !== '' && emailSpanError)
                    FormValidator.handleValidation(this.loginInput.getInputContainer(), email, emailSpanError);
                if (passwordValue !== '' && passwordSpanError)
                    FormValidator.handleValidation(this.passwordInput.getInputContainer(), password, passwordSpanError);

                if (allValuesTrue) {
                    btn?.removeAttribute('disabled');
                }
            }
        });
        this.init();
    }

    private init(): void {
        this.login = document.createElement('section');
        this.login.classList.add('login');
        this.login.appendChild(this.loginForm);
    }

    public getLayout(): HTMLElement {
        return this.login;
    }
}
