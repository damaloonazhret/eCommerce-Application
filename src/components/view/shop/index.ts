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
                const nameCar: string = product.masterData.current.name['en-US'];
                const urlImgCar: string = product.masterData.staged.masterVariant.images[0].url;
                const descriptionCar: string = product.masterData.current.description['en-US'];
                const priceCar: string = String(product.masterData.current.masterVariant.prices[0].value.centAmount);
                const editPriceCar = priceCar.split('');
                editPriceCar.splice(-2, 0, '.');
                const finalEditPriceCar = editPriceCar.join('');
                let discountedPriceCar: string;
                if (product.masterData.current.masterVariant.prices[0].discounted) {
                    discountedPriceCar = String(
                        product.masterData.current.masterVariant.prices[0].discounted.value.centAmount
                    );
                    const DescEditPriceCar = discountedPriceCar.split('');
                    DescEditPriceCar.splice(-2, 0, '.');
                    const finalEditDescPriceCar = DescEditPriceCar.join('');
                    shop.innerHTML += `<div class="product"><img src="${urlImgCar}" alt="${urlImgCar}"><div class="info-car"><span class="name-car">${nameCar}</span><span class="desc-car">${descriptionCar}</span><span class="old-price-car">${finalEditPriceCar} €</span><span class="disc-price-car">${finalEditDescPriceCar} €</span></div></div>`;
                } else {
                    shop.innerHTML += `<div class="product"><img src="${urlImgCar}" alt="${urlImgCar}"><div class="info-car"><span class="name-car">${nameCar}</span><span class="desc-car">${descriptionCar}</span><span class="price-car">${finalEditPriceCar} €</span></div></div>`;
                }
            }
        });
    }

    public getLayout(): HTMLElement {
        return this.shop;
    }
}
