import Controller from '../../controller';
import './product.scss';

export default class Product {
    private product!: HTMLElement;

    private controller!: Controller;

    private navigateTo: (url: string) => void;

    private params: Record<string, string>;

    constructor(controller: Controller, navigateTo: (url: string) => void, params: Record<string, string>) {
        this.controller = controller;
        this.navigateTo = navigateTo;
        this.params = params;
        this.init();
    }

    private init(): void {
        this.product = document.createElement('section');
        this.product.classList.add('product');
        this.product.textContent = `Product Page ${this.params.id}`;
    }

    public getLayout(): HTMLElement {
        return this.product;
    }
}
