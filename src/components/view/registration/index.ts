import './registration.scss';

export default class Registration {
    private registration!: HTMLElement;

    constructor() {
        this.init();
    }

    private init(): void {
        this.registration = document.createElement('section');
        this.registration.classList.add('registration');
        this.registration.textContent = 'Registration Page';
    }

    public getLayout(): HTMLElement {
        return this.registration;
    }
}
