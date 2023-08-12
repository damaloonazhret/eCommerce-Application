import './login.scss';
import InputGenerator from '../../../helpers/inputGenerator';
import { checkDataLoginForm, ObjValidationLogin } from '../../../services/validation';
import FormValidator from '../../../helpers/formValidator';

export default class Login {
    private login!: HTMLElement;

    private loginInput: InputGenerator;

    private passwordInput: InputGenerator;

    private readonly loginForm: HTMLFormElement;

    constructor() {
        this.loginInput = new InputGenerator(
            'text',
            'Enter Email',
            'login__email',
            'email',
            "Email: local part and the domain name separated by '@', without leading or trailing spaces."
        );

        this.passwordInput = new InputGenerator(
            'password',
            'Enter password',
            'login__password',
            'password',
            'Password: Minimum 8 characters, 1 capital letter (A-Z), 1 small letter (a-z), 1 number (0-9), 1 special character (e.g. !@#$%^&*), no leading or trailing spaces.'
        );

        this.loginForm = document.createElement('form');
        this.loginForm.appendChild(this.loginInput.getInputContainer());
        this.loginForm.appendChild(this.passwordInput.getInputContainer());

        const buttonGenerator = new InputGenerator(
            'button',
            'Button Text',
            'login__button',
            'login-btn',
            'must contains ...'
        );

        this.loginForm.appendChild(
            buttonGenerator.getButton('login__button', 'LOGIN', (e) => {
                e.preventDefault();

                const emailInput = this.loginInput.getInputContainer().querySelector('input');
                const passwordInput = this.passwordInput.getInputContainer().querySelector('input');
                let email = false;
                let password = false;

                if (passwordInput) {
                    const emailValue = emailInput?.value || '';
                    const passwordValue = passwordInput?.value || '';
                    const response = checkDataLoginForm(emailValue, passwordValue) as ObjValidationLogin;
                    email = response.email;
                    password = response.password;

                    FormValidator.handleValidation(this.loginInput.getInputContainer(), email);
                    FormValidator.handleValidation(this.passwordInput.getInputContainer(), password);
                }
            })
        );
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
