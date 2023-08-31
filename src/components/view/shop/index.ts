import './shop.scss';
import Model from '../../model';
import { ProductAll, ProductOne, CaracteristicProduct } from '../../../types/interfaces';

export default class Shop {
    private shop!: HTMLElement;

    private filterDiv!: HTMLElement;

    private productsDiv!: HTMLElement;

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

    private descriptionProduct!: string;

    private keyProduct!: string;

    private priceProduct!: string;

    private characteristicCar!: CaracteristicProduct;

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
        this.productsDiv.innerHTML = '';

        const dataAllProducts = new Model().getProducts();

        void dataAllProducts.then((data) => {
            for (let i = 0; i < data.results.length; i += 1) {
                this.dataProduct = data.results[i];
                this.keyProduct = this.dataProduct.key;
                this.nameProduct = this.dataProduct.masterData.current.name['en-US'];
                this.urlImgProduct = this.dataProduct.masterData.staged.masterVariant.images[0].url;
                /* this.descriptionProduct = this.dataProduct.masterData.current.description['en-US']; */
                this.characteristicCar = this.dataProduct.masterData.current.masterVariant.attributes;
                this.priceProduct = String(
                    this.dataProduct.masterData.current.masterVariant.prices[0].value.centAmount
                );
                const editPriceCar = this.priceProduct.split('');
                editPriceCar.splice(-2, 0, '.');
                const finalEditPriceCar = editPriceCar.join('');
                if (this.dataProduct.masterData.current.masterVariant.prices[0].discounted) {
                    const discountedPriceCar = String(
                        this.dataProduct.masterData.current.masterVariant.prices[0].discounted.value.centAmount
                    );
                    const DescEditPriceCar = discountedPriceCar.split('');
                    DescEditPriceCar.splice(-2, 0, '.');
                    const finalEditDescPriceCar = DescEditPriceCar.join('');
                    this.productsDiv.innerHTML += `<div class="product" id="${this.keyProduct}"><img src="${this.urlImgProduct}" alt="${this.nameProduct}"><div class="info-product"><span class="name-product">${this.nameProduct}</span><ul><li>Type of drive: ${this.characteristicCar[0].value} <li>Transmission: ${this.characteristicCar[1].value}</li><li>Maximum speed: ${this.characteristicCar[2].value} km/h</li></ul><span class="old-price-product">${finalEditPriceCar} €</span><span class="disc-price-product">${finalEditDescPriceCar} €</span></div></div>`;
                } else {
                    this.productsDiv.innerHTML += `<div class="product" id="${this.keyProduct}"><img src="${this.urlImgProduct}" alt="${this.nameProduct}"><div class="info-product"><span class="name-product">${this.nameProduct}</span><ul><li>Type of drive: ${this.characteristicCar[0].value} <li>Transmission: ${this.characteristicCar[1].value}</li><li>Maximum speed: ${this.characteristicCar[2].value} km/h</li></ul><span class="price-product">${finalEditPriceCar} €</span></span></div></div>`;
                }
            }
        });
        this.setTiemClickOnProduct();
    }

    public createBlockProducts(): void {
        this.productsDiv = document.createElement('div');
        this.productsDiv.classList.add('products');
        this.shop.appendChild(this.productsDiv);
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
        this.priceFromInput.type = 'text';
        this.priceFromInput.classList.add('price-from');
        this.priceFromInput.placeholder = 'Price from, €';
        this.priceDiv.appendChild(this.priceFromInput);

        this.priceUpInput = document.createElement('input');
        this.priceUpInput.type = 'text';
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

    private showProductsFilter(): void {
        const filterButton = document.querySelector('.filter-button') as HTMLElement;
        filterButton.addEventListener('click', () => {
            const selectCategoryCar = document.querySelector('.select-category-car') as HTMLSelectElement;
            if (selectCategoryCar.value === 'All category') {
                this.showAllProduct();
            } else {
                void new Model().getCategories().then((data) => {
                    data.results.forEach((el) => {
                        if (selectCategoryCar.value === el.description['en-US']) {
                            const dataGetSearchProducts = new Model().getSearchProducts(`categories.id:"${el.id}"`);
                            // eslint-disable-next-line @typescript-eslint/no-shadow
                            void dataGetSearchProducts.then((data) => {
                                this.productsDiv.innerHTML = '';
                                for (let i = 0; i < data.results.length; i += 1) {
                                    this.dataProductOne = data.results[i];
                                    this.keyProduct = this.dataProductOne.key;
                                    this.nameProduct = this.dataProductOne.name['en-US'];
                                    this.urlImgProduct = this.dataProductOne.masterVariant.images[0].url;
                                    this.descriptionProduct = this.dataProductOne.description['en-US'];
                                    this.priceProduct = String(
                                        this.dataProductOne.masterVariant.prices[0].value.centAmount
                                    );
                                    const editPriceCar = this.priceProduct.split('');
                                    editPriceCar.splice(-2, 0, '.');
                                    const finalEditPriceCar = editPriceCar.join('');
                                    let discountedPriceCar: string;
                                    if (this.dataProductOne.masterVariant.prices[0].discounted) {
                                        discountedPriceCar = String(
                                            this.dataProductOne.masterVariant.prices[0].discounted.value.centAmount
                                        );
                                        const DescEditPriceCar = discountedPriceCar.split('');
                                        DescEditPriceCar.splice(-2, 0, '.');
                                        const finalEditDescPriceCar = DescEditPriceCar.join('');

                                        this.productsDiv.innerHTML += `<div class="product" id="${this.keyProduct}"><img src="${this.urlImgProduct}" alt="${this.nameProduct}"><div class="info-product"><span class="name-product">${this.nameProduct}</span><ul><li>Type of drive: ${this.characteristicCar[0].value} <li>Transmission: ${this.characteristicCar[1].value}</li><li>Maximum speed: ${this.characteristicCar[2].value} km/h</li></ul><span class="old-price-product">${finalEditPriceCar} €</span><span class="disc-price-product">${finalEditDescPriceCar} €</span></div></div>`;
                                    } else {
                                        this.productsDiv.innerHTML += `<div class="product" id="${this.keyProduct}"><img src="${this.urlImgProduct}" alt="${this.nameProduct}"><div class="info-product"><span class="name-product">${this.nameProduct}</span><ul><li>Type of drive: ${this.characteristicCar[0].value} <li>Transmission: ${this.characteristicCar[1].value}</li><li>Maximum speed: ${this.characteristicCar[2].value} km/h</li></ul><span class="price-product">${finalEditPriceCar} €</span></span></div></div>`;
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

    public clickOnProduct(): void {
        const product = document.querySelectorAll<HTMLDivElement>('.product');
        product.forEach((el) => {
            el.addEventListener('click', () => {
                const idForUrl = el.getAttribute('id');
                if (idForUrl) {
                    window.location.href = `http://localhost:8081/product/${idForUrl}`;
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

    public getLayout(): HTMLElement {
        return this.shop;
    }
}
