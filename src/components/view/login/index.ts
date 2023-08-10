import './login.scss';
import { loginForm } from './view';

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
