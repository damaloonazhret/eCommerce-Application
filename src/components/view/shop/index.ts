import './shop.scss';
import Model from '../../model';
import { ProductAll, ProductFromCategory } from '../../../types/interfaces';

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

        const dataAllProducts = new Model().getProducts();

        void dataAllProducts.then((data) => {
            for (let i = 0; i < data.results.length; i += 1) {
                const product: ProductAll = data.results[i];
                const idCar: string = product.key;
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
                    this.productsDiv.innerHTML += `<div class="product" id="${idCar}"><img src="${urlImgCar}" alt="${urlImgCar}"><div class="info-car"><span class="name-car">${nameCar}</span><span class="desc-car">${descriptionCar}</span><span class="old-price-car">${finalEditPriceCar} €</span><span class="disc-price-car">${finalEditDescPriceCar} €</span></div></div>`;
                } else {
                    this.productsDiv.innerHTML += `<div class="product" id="${idCar}"><img src="${urlImgCar}" alt="${urlImgCar}"><div class="info-car"><span class="name-car">${nameCar}</span><span class="desc-car">${descriptionCar}</span><span class="price-car">${finalEditPriceCar} €</span></div></div>`;
                }
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that2: this = this;
        setTimeout(function () {
            that2.clickOnProduct();
        }, 500);
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
        this.optionSelectCategories.value = 'Select a category';
        this.optionSelectCategories.text = 'Select a category';
        this.optionSelectCategories.setAttribute('disabled', '');
        this.optionSelectCategories.setAttribute('selected', '');
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
            const dataAllCategories = new Model().getCategories();
            void dataAllCategories.then((data) => {
                data.results.forEach((el) => {
                    if (selectCategoryCar.value === el.description['en-US']) {
                        const dataGetSearchProducts = new Model().getSearchProducts(`categories.id:"${el.id}"`);
                        // eslint-disable-next-line @typescript-eslint/no-shadow
                        void dataGetSearchProducts.then((data) => {
                            this.productsDiv.innerHTML = '';
                            for (let i = 0; i < data.results.length; i += 1) {
                                const product: ProductFromCategory = data.results[i];
                                const idCar: string = product.key;
                                const nameCar: string = product.name['en-US'];
                                const urlImgCar: string = product.masterVariant.images[0].url;
                                const descriptionCar: string = product.description['en-US'];
                                const priceCar: string = String(product.masterVariant.prices[0].value.centAmount);
                                const editPriceCar = priceCar.split('');
                                editPriceCar.splice(-2, 0, '.');
                                const finalEditPriceCar = editPriceCar.join('');
                                let discountedPriceCar: string;
                                if (product.masterVariant.prices[0].discounted) {
                                    discountedPriceCar = String(
                                        product.masterVariant.prices[0].discounted.value.centAmount
                                    );
                                    const DescEditPriceCar = discountedPriceCar.split('');
                                    DescEditPriceCar.splice(-2, 0, '.');
                                    const finalEditDescPriceCar = DescEditPriceCar.join('');
                                    this.productsDiv.innerHTML += `<div class="product" id="${idCar}"><img src="${urlImgCar}" alt="${urlImgCar}"><div class="info-car"><span class="name-car">${nameCar}</span><span class="desc-car">${descriptionCar}</span><span class="old-price-car">${finalEditPriceCar} €</span><span class="disc-price-car">${finalEditDescPriceCar} €</span></div></div>`;
                                } else {
                                    this.productsDiv.innerHTML += `<div class="product" id="${idCar}"><img src="${urlImgCar}" alt="${urlImgCar}"><div class="info-car"><span class="name-car">${nameCar}</span><span class="desc-car">${descriptionCar}</span><span class="price-car">${finalEditPriceCar} €</span></div></div>`;
                                }
                            }
                        });
                        // eslint-disable-next-line @typescript-eslint/no-this-alias
                        const that2: this = this;
                        setTimeout(function () {
                            that2.clickOnProduct();
                        }, 500);
                    }
                });
            });
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

    public getLayout(): HTMLElement {
        return this.shop;
    }
}
