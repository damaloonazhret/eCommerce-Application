import './header.scss';

export default class Header {
    private header!: HTMLElement;

    private nav!: HTMLElement;

    private ul!: HTMLElement;

    constructor() {
        this.init();
        this.bindListeners();
        this.setActiveLink(window.location.pathname);
    }

    private init(): void {
        this.header = document.createElement('header');
        this.header.classList.add('header');

        this.nav = document.createElement('nav');
        this.nav.classList.add('header__nav');

        this.ul = document.createElement('ul');
        this.ul.classList.add('header__nav-list');
        this.ul.innerHTML = `
                            <li><a class="header__nav-link" href="/" data-route>Shop</a></li>
                            <li><a class="header__nav-link" href="/about" data-route>About</a></li>
                            <li><a class="header__nav-link" href="/contact" data-route>Contact</a></li>
                            <li><a class="header__nav-link" href="/registration" data-route>Sign Up</a></li>
                            <li><a class="header__nav-link" href="/login" data-route>Login</a></li>
                            `;

        this.nav.append(this.ul);
        this.header.append(this.nav);
    }

    private bindListeners(): void {
        this.ul.addEventListener('click', (e) => {
            const target = e.target as HTMLAnchorElement;
            if (target.classList.contains('header__nav-link')) {
                this.setActiveLink(new URL(target.href).pathname);
            }
            if (target.getAttribute('href') === '/login' && localStorage.token !== undefined) {
                this.setActiveLink('/');
            }
        });
    }

    public setActiveLink(path: string): void {
        const liElements = this.ul.querySelectorAll('li a');
        liElements.forEach((li) => {
            li.classList.remove('active');
            if (li.getAttribute('href') === path) {
                li.classList.add('active');
            }
        });
    }

    public getLayout(): HTMLElement {
        return this.header;
    }
}
