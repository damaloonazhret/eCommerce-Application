import './login.scss';

export default class Login {
    private login!: HTMLElement;

    constructor() {
        this.init();
    }

    private init(): void {
        this.login = document.createElement('section');
        this.login.classList.add('login');
        this.login.textContent = 'Login Page';
    }

    public getLayout(): HTMLElement {
        return this.login;
    }
}
