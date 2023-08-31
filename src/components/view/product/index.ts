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

    private nameProduct!: string;

    private urlImgProduct!: string;

    private descriptionProduct!: string;

    private priceProduct!: string;

    private characteristicProduct!: CaracteristicProduct;

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
            this.nameProduct = this.dataProduct.masterData.current.name['en-US'];
            this.urlImgProduct = this.dataProduct.masterData.current.masterVariant.images[0].url;
            this.descriptionProduct = this.dataProduct.masterData.current.description['en-US'];
            this.priceProduct = String(this.dataProduct.masterData.current.masterVariant.prices[0].value.centAmount);
            this.characteristicProduct = this.dataProduct.masterData.current.masterVariant.attributes;
            const editPriceCar = this.priceProduct.split('');
            editPriceCar.splice(-2, 0, '.');
            const finalEditPriceCar = editPriceCar.join('');
            let discountedPriceCar: string;
            if (this.dataProduct.masterData.current.masterVariant.prices[0].discounted) {
                discountedPriceCar = String(
                    this.dataProduct.masterData.current.masterVariant.prices[0].discounted.value.centAmount
                );
                const DescEditPriceCar = discountedPriceCar.split('');
                DescEditPriceCar.splice(-2, 0, '.');
                const finalEditDescPriceCar = DescEditPriceCar.join('');

                this.product.innerHTML += `<img src="${this.urlImgProduct}" alt="${this.nameProduct}"><div class="info-product"><span class="name-product">${this.nameProduct}</span><span class="desc-product">${this.descriptionProduct}</span><ul><li>Type of drive: ${this.characteristicProduct[0].value} <li>Transmission: ${this.characteristicProduct[1].value}</li><li>Maximum speed: ${this.characteristicProduct[2].value} km/h</li></ul><span class="old-price-product">${finalEditPriceCar} €</span><span class="disc-price-product">${finalEditDescPriceCar} €</span></div>`;
            } else {
                this.product.innerHTML += `<img src="${this.urlImgProduct}" alt="${this.nameProduct}"><div class="info-product"><span class="name-product">${this.nameProduct}</span><span class="desc-product">${this.descriptionProduct}</span><ul><li>Type of drive: ${this.characteristicProduct[0].value} <li>Transmission: ${this.characteristicProduct[1].value}</li><li>Maximum speed: ${this.characteristicProduct[2].value} km/h</li></ul><span class="price-product">${finalEditPriceCar} €</span></span></div>`;
            }
        });
    }

    public getLayout(): HTMLElement {
        return this.product;
    }
}
