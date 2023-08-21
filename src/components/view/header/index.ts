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
                        <li class="header__home"><a class="header__nav-link" href="/" data-route>Home</a></li>
                        <li class="header__shop"><a class="header__nav-link" href="/shop" data-route>Shop</a></li>
                        <li class="header__about"><a class="header__nav-link" href="/about" data-route>About</a></li>
                        <li class="header__contact"><a class="header__nav-link" href="/contact" data-route>Contact</a></li>
                        <li class="header__sign-up"><a class="header__nav-link" href="/registration" data-route>Sign Up</a></li>
                        <li class="header__login"><a class="header__nav-link" href="/login" data-route>Login</a></li>
                        <li class="header__logout"><span class="header__nav-link">Logout</span></li>
                        `;
        this.nav.append(this.ul);
        this.header.append(this.nav);
    }

    private bindListeners(): void {
        if (localStorage.isTokenUser === 'true') {
            Array.from(this.ul.children).forEach((el) => {
                const itemMenu = el as HTMLElement;
                if (itemMenu.classList.contains('header__sign-up') || itemMenu.classList.contains('header__login')) {
                    itemMenu.style.display = 'none';
                }
                if (itemMenu.classList.contains('header__logout')) {
                    itemMenu.style.display = 'block';
                }
            });
        }
        this.ul.addEventListener('click', (e) => {
            const target = e.target as HTMLAnchorElement;
            const targetElement = e.target as HTMLElement;
            if (targetElement.parentElement?.classList.contains('header__logout')) {
                localStorage.setItem('isTokenUser', 'false');
                targetElement.parentElement.style.display = 'none';
                Array.from(this.ul.children).forEach((el) => {
                    const itemMenu = el as HTMLElement;
                    if (
                        itemMenu.classList.contains('header__sign-up') ||
                        itemMenu.classList.contains('header__login')
                    ) {
                        itemMenu.style.display = 'block';
                    }
                    if (itemMenu.classList.contains('header__logout')) {
                        itemMenu.style.display = 'none';
                    }
                });
            } else if (target.classList.contains('header__nav-link')) {
                this.setActiveLink(new URL(target.href).pathname);
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
