import './shop.scss';

export default class Shop {
    private shop!: HTMLElement;

    constructor() {
        this.init();
    }

    private init(): void {
        this.shop = document.createElement('section');
        this.shop.classList.add('shop');
        this.shop.textContent = 'Shop Page';
    }

    public getLayout(): HTMLElement {
        return this.shop;
    }
}
