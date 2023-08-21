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
        if (localStorage.isTokenUser === 'true') {
            console.log('aaa');
            menu.innerHTML = `<div class="home__menu__item">
                            <a data-route href="/shop">Shop</a>
                          </div>
                          <div class="home__menu__item">
                            <a data-route href="/about">About</a>
                          </div>
                          <div class="home__menu__item">
                            <a data-route href="/contact">Contact</a>
                          </div>
                          <div class="home__logout home__menu__item">
                            <span>Logout</span>
                           </div>
                          `;
        } else {
            console.log('bbb');
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
        }
        this.home.append(menu);
        this.initWhenLogoutMainMenu();
        setTimeout(() => this.initWhenLogoutHomeMenu(), 0);
    }

    private initWhenLogoutMainMenu(): void {
        document.querySelector('.header__logout')?.addEventListener('click', () => {
            if (document.querySelector('.home__menu') !== null) {
                const homeMenu = document.querySelector('.home__menu') as HTMLElement;
                homeMenu.innerHTML = `<div class="home__menu__item">
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
                                  </div>`;
            }
        });
    }

    private initWhenLogoutHomeMenu(): void {
        if (document.querySelector('.home__logout')) {
            const btnHomeMenuLogout = document.querySelector('.home__logout') as HTMLElement;
            btnHomeMenuLogout.addEventListener('click', () => {
                localStorage.setItem('isTokenUser', 'false');
                const headerNavList = document.querySelector('.header__nav-list') as HTMLElement;
                Array.from(headerNavList.children).forEach((el) => {
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
                const homeMenu = document.querySelector('.home__menu') as HTMLElement;
                homeMenu.innerHTML = `<div class="home__menu__item">
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
                                    </div>`;
            });
        }
    }

    public getLayout(): HTMLElement {
        return this.home;
    }
}
