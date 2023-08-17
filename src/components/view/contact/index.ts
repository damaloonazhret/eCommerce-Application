import './contact.scss';

export default class Contact {
    private contact!: HTMLElement;

    constructor() {
        this.init();
    }

    private init(): void {
        this.contact = document.createElement('section');
        this.contact.classList.add('about');
        this.contact.textContent = 'Contact Page';
    }

    public getLayout(): HTMLElement {
        return this.contact;
    }
}
