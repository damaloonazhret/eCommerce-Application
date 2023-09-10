import './cart.scss';

export default class Cart {
    private cart!: HTMLElement;

    constructor() {
        this.init();
    }

    private init(): void {
        this.cart = document.createElement('section');
        this.cart.classList.add('cart');
        this.cart.textContent = 'Cart Page';
    }

    public getLayout(): HTMLElement {
        return this.cart;
    }
}
