import Controller from '../../controller';
import './product.scss';
import Model from '../../model';
import { ProductAll, CaracteristicProduct } from '../../../types/interfaces';

export default class Product {
    private product!: HTMLElement;

    private controller!: Controller;

    private navigateTo: (url: string) => void;

    private params: Record<string, string>;

    private infoProduct!: HTMLDivElement;

    private dataProduct!: ProductAll;

    private keyProduct!: string;

    private nameProduct!: string;

    private urlImgProduct!: string;

    private descriptionProduct!: string;

    private priceProduct!: string;

    private characteristicProduct!: CaracteristicProduct;

    private newFormatDiscPriceProduct!: string;

    private newFormatPriceProduct!: string;

    private discPriceProductDiv!: HTMLElement;

    constructor(controller: Controller, navigateTo: (url: string) => void, params: Record<string, string>) {
        this.controller = controller;
        this.navigateTo = navigateTo;
        this.params = params;
        this.init();
    }

    private init(): void {
        this.product = document.createElement('section');
        this.product.classList.add('product-main');
        /* this.product.textContent = `Product Page ${this.params.id}`; */

        void new Model().getProduct(this.params.id).then((data) => {
            this.dataProduct = data;
            this.keyProduct = this.dataProduct.key;
            this.nameProduct = this.dataProduct.masterData.current.name['en-US'];
            this.urlImgProduct = this.dataProduct.masterData.current.masterVariant.images[0].url;
            this.descriptionProduct = this.dataProduct.masterData.current.description['en-US'];
            this.characteristicProduct = this.dataProduct.masterData.current.masterVariant.attributes;
            this.newFormatPriceProduct = this.newFormatPrice(
                this.dataProduct.masterData.current.masterVariant.prices[0].value.centAmount
            );

            this.product.innerHTML += `<img src="${this.urlImgProduct}" alt="${this.nameProduct}"><div class="info-product"><span class="name-product">${this.nameProduct}</span><span class="desc-product">${this.descriptionProduct}</span><ul><li>Type of drive: ${this.characteristicProduct[0].value} <li>Transmission: ${this.characteristicProduct[1].value}</li><li>Maximum speed: ${this.characteristicProduct[2].value} km/h</li></ul><span class="price-product">${this.newFormatPriceProduct} €</span></span></div>`;

            if (this.dataProduct.masterData.current.masterVariant.prices[0].discounted) {
                this.newFormatDiscPriceProduct = this.newFormatPrice(
                    this.dataProduct.masterData.current.masterVariant.prices[0].discounted.value.centAmount
                );
                this.showDiscPriceProduct();
            }
        });
    }

    public showDiscPriceProduct(): void {
        const infoProduct = document.querySelector('.info-product') as HTMLElement;
        this.discPriceProductDiv = document.createElement('div');
        this.discPriceProductDiv.classList.add('disc-price-product');
        this.discPriceProductDiv.innerHTML = `${this.newFormatDiscPriceProduct} €`;
        infoProduct.appendChild(this.discPriceProductDiv);

        const priceProduct = document.querySelector('.price-product') as HTMLElement;
        priceProduct.style.textDecoration = 'line-through';
    }

    public newFormatPrice(priceCar: number): string {
        this.priceProduct = String(priceCar);
        const newFormatPriceCar = this.priceProduct.split('');
        newFormatPriceCar.splice(-2, 0, '.');
        return newFormatPriceCar.join('');
    }

    public getLayout(): HTMLElement {
        return this.product;
    }
}
