import './shop.scss';
import Model from '../../model';
import { ProductAll, ProductOne, CaracteristicProduct } from '../../../types/interfaces';

export default class Shop {
    private shop!: HTMLElement;

    private filterDiv!: HTMLElement;

    private product!: HTMLElement;

    private priceFromInput!: HTMLInputElement;

    private priceUpInput!: HTMLInputElement;

    private priceDiv!: HTMLElement;

    private selectCategories!: HTMLSelectElement;

    private optionSelectCategories!: HTMLOptionElement;

    private filterButton!: HTMLElement;

    private dataProduct!: ProductAll;

    private dataProductOne!: ProductOne;

    private nameProduct!: string;

    private urlImgProduct!: string;

    private keyProduct!: string;

    private priceProduct!: string;

    private newFormatPriceProduct!: string;

    private newFormatDiscPriceProduct!: string;

    private characteristicProduct!: CaracteristicProduct;

    private discPriceProductDiv!: HTMLElement;

    constructor() {
        this.init();
    }

    private init(): void {
        this.shop = document.createElement('section');
        this.shop.classList.add('shop');
        this.creatBlockfilter();
        this.createBlockProducts();
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that: this = this;
        setTimeout(function () {
            that.showProductsFilter();
        }, 500);

        this.showAllProduct();

        this.setTiemClickOnProduct();
    }

    public showAllProduct(): void {
        this.product.innerHTML = '';

        const dataAllProducts = new Model().getProducts();

        void dataAllProducts.then((data) => {
            console.log(data);
            for (let i = 0; i < data.results.length; i += 1) {
                this.dataProduct = data.results[i];
                this.keyProduct = this.dataProduct.key;
                this.nameProduct = this.dataProduct.masterData.current.name['en-US'];
                this.urlImgProduct = this.dataProduct.masterData.staged.masterVariant.images[0].url;
                this.characteristicProduct = this.dataProduct.masterData.current.masterVariant.attributes;
                this.newFormatPriceProduct = this.newFormatPrice(
                    this.dataProduct.masterData.current.masterVariant.prices[0].value.centAmount
                );
                if (this.dataProduct.masterData.current.masterVariant.prices[0].discounted) {
                    this.newFormatDiscPriceProduct = this.newFormatPrice(
                        this.dataProduct.masterData.current.masterVariant.prices[0].discounted.value.centAmount
                    );
                    this.initCartProductWithDescPrice();
                } else {
                    this.initCartProductWithoutDescPrice();
                }
            }
        });
        this.setTiemClickOnProduct();
    }

    public createBlockProducts(): void {
        this.product = document.createElement('div');
        this.product.classList.add('products');
        this.shop.appendChild(this.product);
    }

    public creatBlockfilter(): void {
        this.filterDiv = document.createElement('div');
        this.filterDiv.classList.add('filter');
        this.shop.appendChild(this.filterDiv);

        // price
        this.priceDiv = document.createElement('div');
        this.priceDiv.classList.add('filter-price');
        this.filterDiv.appendChild(this.priceDiv);

        this.priceFromInput = document.createElement('input');
        this.priceFromInput.type = 'number';
        this.priceFromInput.classList.add('price-from');
        this.priceFromInput.placeholder = 'Price from, €';
        this.priceDiv.appendChild(this.priceFromInput);

        this.priceUpInput = document.createElement('input');
        this.priceUpInput.type = 'number';
        this.priceUpInput.value = '5000';
        this.priceUpInput.classList.add('price-up');
        this.priceUpInput.placeholder = 'Price up, €';
        this.priceDiv.appendChild(this.priceUpInput);

        // change category
        this.selectCategories = document.createElement('select');
        this.selectCategories.classList.add('select-category-car');
        this.optionSelectCategories = document.createElement('option');
        this.optionSelectCategories.value = 'All category';
        this.optionSelectCategories.text = 'All category';
        this.selectCategories.appendChild(this.optionSelectCategories);
        this.filterDiv.appendChild(this.selectCategories);

        const dataAllCategories = new Model().getCategories();
        void dataAllCategories.then((data) => {
            data.results.forEach((el) => {
                this.optionSelectCategories = document.createElement('option');
                this.optionSelectCategories.value = el.description['en-US'];
                this.optionSelectCategories.text = el.description['en-US'];
                this.selectCategories.appendChild(this.optionSelectCategories);
            });
        });

        // button
        this.filterButton = document.createElement('div');
        this.filterButton.classList.add('filter-button');
        this.filterButton.innerHTML = 'Show';
        this.filterDiv.appendChild(this.filterButton);
    }

    public initCartProductWithDescPrice(): void {
        this.product.innerHTML += `<div class="product" id="${this.keyProduct}"><img src="${this.urlImgProduct}" alt="${this.nameProduct}"><div class="info-product"><span class="name-product">${this.nameProduct}</span><ul><li>Type of drive: ${this.characteristicProduct[0].value} <li>Transmission: ${this.characteristicProduct[1].value}</li><li>Maximum speed: ${this.characteristicProduct[2].value} km/h</li></ul><span class="old-price-product">${this.newFormatPriceProduct} €</span></span><span class="disc-price-product">${this.newFormatDiscPriceProduct} €</span></span></div></div>`;
    }

    public initCartProductWithoutDescPrice(): void {
        this.product.innerHTML += `<div class="product" id="${this.keyProduct}"><img src="${this.urlImgProduct}" alt="${this.nameProduct}"><div class="info-product"><span class="name-product">${this.nameProduct}</span><ul><li>Type of drive: ${this.characteristicProduct[0].value} <li>Transmission: ${this.characteristicProduct[1].value}</li><li>Maximum speed: ${this.characteristicProduct[2].value} km/h</li></ul><span class="price-product">${this.newFormatPriceProduct} €</span></span></div></div>`;
    }

    public newFormatPrice(priceCar: number): string {
        this.priceProduct = String(priceCar);
        const newFormatPriceCar = this.priceProduct.split('');
        newFormatPriceCar.splice(-2, 0, '.');
        return newFormatPriceCar.join('');
    }

    /*  public showDiscPriceProduct(): void {
        const infoProduct = document.querySelector('.info-product') as HTMLElement;
        this.discPriceProductDiv = document.createElement('div');
        this.discPriceProductDiv.classList.add('disc-price-product');
        this.discPriceProductDiv.innerHTML = `${this.newFormatDiscPriceProduct} €`;
        infoProduct.appendChild(this.discPriceProductDiv);
    } */

    public clickOnProduct(): void {
        const product = document.querySelectorAll<HTMLDivElement>('.product');
        product.forEach((el) => {
            el.addEventListener('click', () => {
                const idUrl = el.getAttribute('id');
                if (idUrl) {
                    window.location.href = `http://localhost:8081/product/${idUrl}`;
                }
            });
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-dupe-class-members
    public setTiemClickOnProduct(): void {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that2: this = this;
        setTimeout(function () {
            that2.clickOnProduct();
        }, 500);
    }

    private showProductsFilter(): void {
        const filterButton = document.querySelector('.filter-button') as HTMLElement;
        const priceFrom = document.querySelector('.price-from') as HTMLInputElement;
        const priceUp = document.querySelector('.price-up') as HTMLInputElement;
        filterButton.addEventListener('click', () => {
            const selectCategoryCar = document.querySelector('.select-category-car') as HTMLSelectElement;
            // price
            const priceFromValue = Number(priceFrom.value);
            const priceUpValue = Number(priceUp.value);

            if (priceFromValue > priceUpValue) {
                priceUp.classList.add('input-error');
            } else {
                priceUp.classList.remove('input-error');
            }

            console.log(priceFromValue, priceUpValue);

            // catgory
            if (selectCategoryCar.value === 'All category') {
                this.showAllProduct();
            } else {
                void new Model().getCategories().then((data) => {
                    data.results.forEach((el) => {
                        if (selectCategoryCar.value === el.description['en-US']) {
                            const dataGetSearchProducts = new Model().getSearchProducts(`categories.id:"${el.id}"`);
                            // eslint-disable-next-line @typescript-eslint/no-shadow
                            void dataGetSearchProducts.then((data) => {
                                console.log(data);
                                this.product.innerHTML = '';
                                for (let i = 0; i < data.results.length; i += 1) {
                                    this.dataProductOne = data.results[i];
                                    this.keyProduct = this.dataProductOne.key;
                                    this.nameProduct = this.dataProductOne.name['en-US'];
                                    this.urlImgProduct = this.dataProductOne.masterVariant.images[0].url;
                                    this.characteristicProduct = this.dataProductOne.masterVariant.attributes;
                                    this.newFormatPriceProduct = this.newFormatPrice(
                                        this.dataProductOne.masterVariant.prices[0].value.centAmount
                                    );
                                    if (this.dataProductOne.masterVariant.prices[0].discounted) {
                                        this.newFormatDiscPriceProduct = this.newFormatPrice(
                                            this.dataProductOne.masterVariant.prices[0].discounted.value.centAmount
                                        );
                                        this.initCartProductWithDescPrice();
                                    } else {
                                        this.initCartProductWithoutDescPrice();
                                    }
                                }
                            });
                            this.setTiemClickOnProduct();
                        }
                    });
                });
            }
        });
    }

    public getLayout(): HTMLElement {
        return this.shop;
    }
}
