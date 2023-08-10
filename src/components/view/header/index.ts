import './header.scss';

export default class Header {
    private header!: HTMLElement;

    constructor() {
        this.init();
    }

    private init(): void {
        this.header = document.createElement('header');
        this.header.classList.add('header');
        this.header.innerHTML = `
                            <nav>
                              <ul>
                                <a href="/login" data-route>Login</a>
                                <a href="/registration" data-route>Registration</a>
                                <a href="/" data-route>Shop</a>
                              </ul>
                            </nav>
                            `;
    }

    public getLayout(): HTMLElement {
        return this.header;
    }
}
