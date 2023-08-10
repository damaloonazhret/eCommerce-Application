import './registration.scss';
import { registrationInput } from '../login/view';

export default class Registration {
    private registration!: HTMLElement;

    constructor() {
        this.init();
    }

    private init(): void {
        this.registration = document.createElement('section');
        this.registration.classList.add('registration');
        this.registration.appendChild(registrationInput);
    }

    public getLayout(): HTMLElement {
        return this.registration;
    }
}
