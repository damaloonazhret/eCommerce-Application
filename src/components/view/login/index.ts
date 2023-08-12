import './login.scss';
import InputGenerator from '../../../helpers/inputGenerator';

export const loginInput = new InputGenerator('text', 'Enter Email', 'login__email', 'email');
export const passwordInput = new InputGenerator('password', 'Enter password', 'login__password', 'password');
export const loginForm = document.createElement('form');

const buttonGenerator = new InputGenerator('button', 'Button Text', 'login__button', 'login-btn');

loginForm.appendChild(loginInput.getInputContainer());
loginForm.appendChild(passwordInput.getInputContainer());
loginForm.appendChild(buttonGenerator.getButton('login__button', 'LOGIN', () => {}));

export default class Login {
    private login!: HTMLElement;

    constructor() {
        this.init();
    }

    private init(): void {
        this.login = document.createElement('section');
        this.login.classList.add('login');
        this.login.appendChild(loginForm);
    }

    public getLayout(): HTMLElement {
        return this.login;
    }
}
