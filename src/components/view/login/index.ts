import './login.scss';
import InputGenerator from '../../../helpers/inputGenerator';
import validation from '../../../services/validation';

export default class Login {
    private login!: HTMLElement;

    private loginDiv!: HTMLElement;

    private loginInput!: HTMLInputElement;

    private passwordDiv!: HTMLElement;

    private passwordInput!: HTMLInputElement;

    private loginForm!: HTMLFormElement;

    private submitButton!: HTMLButtonElement;

    private passwordSwitch!: HTMLButtonElement;

    constructor() {
        this.init();
    }

    private init(): void {
        this.login = document.createElement('section');
        this.login.classList.add('login');

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

        this.loginForm.append(this.loginDiv);
        this.loginForm.append(this.passwordDiv);
        this.loginForm.append(this.submitButton);

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

    private submit(e: Event): void {
        e.preventDefault();
        let valid = true;

        const inputs = Array.from(this.loginForm.querySelectorAll('input'));
        for (let i = 0; i < inputs.length; i += 1) {
            const errors = validation(inputs[i], this.showError.bind(this));
            if (errors.length > 0) {
                valid = false;
            }
        }

        if (!valid) {
            console.log('not valid', { email: this.loginInput.value, password: this.passwordInput.value });
            return;
        }

        console.log('valid', { email: this.loginInput.value, password: this.passwordInput.value });
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
            this.passwordSwitch.textContent = 'H';
        } else {
            this.passwordInput.type = 'password';
            this.passwordSwitch.textContent = 'S';
        }
    }
}
