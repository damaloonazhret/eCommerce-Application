import Controller from '../../controller';
import './product.scss';
import Model from '../../model';
import { ProductAll } from '../../../types/interfaces';

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
        /* this.product.textContent = `Product Page ${this.params.id}`; */

        const abc = new Model();
        void abc.getProduct(this.params.id).then((data) => {
            console.log(data);
            const producta: ProductAll = data;
            const urlImgCar = producta.masterData.current.masterVariant.images[0].url;
            this.product.innerHTML = `<img src="${urlImgCar}" alt="">`;
        });
    }

    public getLayout(): HTMLElement {
        return this.product;
    }
}
