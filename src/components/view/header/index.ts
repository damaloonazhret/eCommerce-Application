import createNavLink from '../../../helpers/createNavLink';
import './header.scss';

export default class Header {
    private header!: HTMLElement;

    private nav!: HTMLElement;

    private ul!: HTMLElement;

    private homeListItem!: HTMLElement;

    private shopListItem!: HTMLElement;

    private aboutListItem!: HTMLElement;

    private contactListItem!: HTMLElement;

    private signUpListItem!: HTMLElement;

    private loginListItem!: HTMLElement;

    private accountListItem!: HTMLElement;

    private logoutListItem!: HTMLElement;

    constructor() {
        this.init();
        this.bindListeners();
    }

    private init(): void {
        this.header = document.createElement('header');
        this.header.classList.add('header');

        this.nav = document.createElement('nav');
        this.nav.classList.add('header__nav');

        this.ul = document.createElement('ul');
        this.ul.classList.add('header__nav-list');

        this.createMenu();

        // <li class="header__home"><a class="header__nav-link" href="/" data-route>Home</a></li>
        // <li class="header__shop"><a class="header__nav-link" href="/shop" data-route>Shop</a></li>
        // <li class="header__about"><a class="header__nav-link" href="/about" data-route>About</a></li>
        // <li class="header__contact"><a class="header__nav-link" href="/contact" data-route>Contact</a></li>
        // <li class="header__sign-up"><a class="header__nav-link" href="/registration" data-route>Sign Up</a></li>
        // <li class="header__login"><a class="header__nav-link" href="/login" data-route>Login</a></li>
        // <li class="header__login"><a class="header__nav-link" href="/account" data-route>Account</a></li>
        // <li class="header__logout"><span class="header__nav-link">Logout</span></li>
        // `;

        this.nav.append(this.ul);
        this.header.append(this.nav);

        if (localStorage.isTokenUser === 'true') {
            this.setLoggedLayout();
        } else {
            this.setNotLoggedLayout();
        }
    }

    private createMenu(): void {
        const homeLink = createNavLink('/', 'header__nav-link', 'Home');
        const shopLink = createNavLink('/shop', 'header__nav-link', 'Shop');
        const aboutLink = createNavLink('/about', 'header__nav-link', 'About');
        const contactLink = createNavLink('/contact', 'header__nav-link', 'Contact');
        const signUpLink = createNavLink('/registration', 'header__nav-link', 'Sign Up');
        const loginLink = createNavLink('/login', 'header__nav-link', 'Login');
        const headerAccount = createNavLink('/account', 'header__nav-link', 'Account');
        const logoutLink = createNavLink('#', 'header__nav-link', 'Logout');

        this.homeListItem = document.createElement('li');
        this.homeListItem.className = 'header__home';
        this.homeListItem.append(homeLink);

        this.shopListItem = document.createElement('li');
        this.shopListItem.className = 'header__shop';
        this.shopListItem.append(shopLink);

        this.aboutListItem = document.createElement('li');
        this.aboutListItem.className = 'header__about';
        this.aboutListItem.append(aboutLink);

        this.contactListItem = document.createElement('li');
        this.contactListItem.className = 'header__contact';
        this.contactListItem.append(contactLink);

        this.signUpListItem = document.createElement('li');
        this.signUpListItem.className = 'header__sign-up';
        this.signUpListItem.append(signUpLink);

        this.loginListItem = document.createElement('li');
        this.loginListItem.className = 'header__login';
        this.loginListItem.append(loginLink);

        this.accountListItem = document.createElement('li');
        this.accountListItem.className = 'header__account';
        this.accountListItem.append(headerAccount);

        this.logoutListItem = document.createElement('li');
        this.logoutListItem.className = 'header__logout';
        this.logoutListItem.append(logoutLink);

        this.ul.append(this.homeListItem);
        this.ul.append(this.shopListItem);
        this.ul.append(this.aboutListItem);
        this.ul.append(this.contactListItem);
        this.ul.append(this.signUpListItem);
        this.ul.append(this.loginListItem);
        this.ul.append(this.accountListItem);
        this.ul.append(this.logoutListItem);
    }

    private bindListeners(): void {
        this.logoutListItem.addEventListener('click', () => {
            this.logout();
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

    private logout(): void {
        localStorage.setItem('isTokenUser', 'false');

        this.setNotLoggedLayout();
    }

    public setLoggedLayout(): void {
        this.loginListItem.style.display = 'none';
        this.signUpListItem.style.display = 'none';
        this.logoutListItem.style.display = 'block';
        this.accountListItem.style.display = 'block';
    }

    public setNotLoggedLayout(): void {
        this.loginListItem.style.display = 'block';
        this.signUpListItem.style.display = 'block';
        this.logoutListItem.style.display = 'none';
        this.accountListItem.style.display = 'none';
    }

    public getLayout(): HTMLElement {
        return this.header;
    }
}
