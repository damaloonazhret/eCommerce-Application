import './shop.scss';
import Model from '../../model';
import { Product } from '../../../types/interfaces';

export default class Shop {
    private shop!: HTMLElement;

    constructor() {
        this.init();
    }

    private init(): void {
        this.shop = document.createElement('section');
        this.shop.classList.add('shop');

        const dataAllProducts = new Model().getProducts();

        void dataAllProducts.then((data) => {
            const shop = document.querySelector('.shop') as HTMLElement;
            shop.innerHTML = '';
            for (let i = 0; i < data.results.length; i += 1) {
                const product: Product = data.results[i];
                const nameCar = product.masterData.current.name['en-US'];
                const urlImgCar = product.masterData.staged.masterVariant.images[0];
                shop.innerHTML += `<div class="product"><img src="${urlImgCar.url}" alt="">${nameCar}</div>`;
            }
        });
    }

    public getLayout(): HTMLElement {
        return this.shop;
    }
}
