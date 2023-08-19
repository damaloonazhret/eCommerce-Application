import './home.scss';

export default class Home {
    private home!: HTMLElement;

    constructor() {
        this.init();
    }

    private init(): void {
        this.home = document.createElement('section');
        this.home.classList.add('home');
        const menu = document.createElement('div');
        menu.classList.add('home__menu');
        menu.innerHTML = `<div class="home__menu__item">
                            <a data-route href="/shop">Shop</a>
                          </div>
                          <div class="home__menu__item">
                            <a data-route href="/about">About</a>
                          </div>
                          <div class="home__menu__item">
                            <a data-route href="/contact">Contact</a>
                          </div>
                          <div class="home__menu__item">
                            <a data-route href="/login">Login</a>
                          </div>
                          <div class="home__menu__item">
                            <a data-route href="/registration">Sign up</a>
                          </div>
                          `;
        this.home.append(menu);
    }

    public getLayout(): HTMLElement {
        return this.home;
    }
}
