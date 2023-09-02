import './shop.scss';
import Model from '../../model';
import { ProductOne, CaracteristicProduct } from '../../../types/interfaces';

const allBrendName = ['Audi', 'BMW', 'Mercedes-Benz'];

export default class Shop {
    private shop!: HTMLElement;

    private filterDiv!: HTMLElement;

    private product!: HTMLElement;

    private priceFromInput!: HTMLInputElement;

    private priceUpInput!: HTMLInputElement;

    private priceDiv!: HTMLElement;

    private selectBodyCar!: HTMLSelectElement;

    private optionSelectBodyCar!: HTMLOptionElement;

    private labelBodyCar!: HTMLLabelElement;

    private selectBrandCar!: HTMLSelectElement;

    private optionSelectBrandCar!: HTMLOptionElement;

    private labelBrandCar!: HTMLLabelElement;

    private filterButton!: HTMLButtonElement;

    private dataProduct!: ProductOne;

    private dataProductOne!: ProductOne;

    private nameProduct!: string;

    private urlImgProduct!: string;

    private keyProduct!: string;

    private priceProduct!: string;

    private newFormatPriceProduct!: string;

    private newFormatDiscPriceProduct!: string;

    private characteristicProduct!: CaracteristicProduct;

    private discPriceProductDiv!: HTMLElement;

    private selectBodydCarDiv!: HTMLElement;

    private selectBrandCarDiv!: HTMLElement;

    private searchDiv!: HTMLElement;

    private searchInput!: HTMLInputElement;

    private searchButton!: HTMLButtonElement;

    private resultFilterSearchDiv!: HTMLElement;

    constructor() {
        this.init();
    }

    private init(): void {
        this.shop = document.createElement('section');
        this.shop.classList.add('shop');
        this.creatBlockfilter();
        this.creatBlockSearch();
        this.creatResultFilterSearch();
        this.createBlockProducts();

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that: this = this;
        setTimeout(function () {
            that.filterProducts();
            that.searchProducts();
        }, 0);

        this.setTiemClickOnProduct();
    }

    public filterProducts(): void {
        const filterButton = document.querySelector('.filter-button') as HTMLElement;
        const filterPrice = document.querySelector('.filter-price') as HTMLElement;
        const priceFrom = document.querySelector('.price-from') as HTMLInputElement;
        const priceUp = document.querySelector('.price-up') as HTMLInputElement;
        let stringRequestFilter = '';

        this.showFilterProducts('');
        this.setTiemClickOnProduct();

        filterButton.addEventListener('click', () => {
            this.resultFilterSearchDiv.innerHTML = '';
            this.product.innerHTML = '';
            // filter price
            let priceFromValue = priceFrom.value;
            let priceUpValue = priceUp.value;
            if (priceFromValue === '' || priceFromValue === '0') {
                priceFromValue = '0.';
            }
            if (priceUpValue === '' || priceUpValue === '0') {
                priceUpValue = '0.';
            }

            if (Number(priceFrom.value) > Number(priceUp.value)) {
                filterPrice.classList.add('shake');
                priceUp.classList.add('input-error');
            } else {
                priceUp.classList.remove('input-error');
            }

            setTimeout(function () {
                filterPrice.classList.remove('shake');
            }, 500);

            if (!(priceFromValue === '0.' && priceUpValue === '0.')) {
                stringRequestFilter += `filter=variants.price.centAmount:range (${`${String(
                    priceFromValue
                )}00`} to ${`${String(priceUpValue)}00`})&`;
            }

            // filter category
            const selectBodyCar = document.querySelector('.body-car') as HTMLSelectElement;
            void new Model().getCategories().then((data) => {
                data.results.forEach((el) => {
                    if (selectBodyCar.value === el.description['en-US']) {
                        stringRequestFilter += `filter=categories.id:"${el.id}"&`;
                    }
                });
            });

            // filter brand
            const selectBrandCar = document.querySelector('.brand-car') as HTMLSelectElement;
            allBrendName.forEach((el) => {
                if (selectBrandCar.value === el) {
                    stringRequestFilter += `filter=variants.attributes.brandCar.key:"${el}"&`;
                }
            });

            setTimeout(() => {
                this.showFilterProducts(stringRequestFilter);
                this.setTiemClickOnProduct();
                stringRequestFilter = '';
            }, 500);
        });
    }

    public searchProducts(): void {
        const searchButton = document.querySelector('.search-button') as HTMLElement;
        const dataSearchInput = document.querySelector('.search-input') as HTMLInputElement;
        searchButton.addEventListener('click', () => {
            this.resultFilterSearchDiv.innerHTML = '';
            this.product.innerHTML = '';
            setTimeout(() => {
                this.showFilterProducts(`filter=searchKeywords.en-US.text:"${dataSearchInput.value}"`);
                this.setTiemClickOnProduct();
                this.resultFilterSearchDiv.innerHTML = `Search query result - "${dataSearchInput.value}"`;
                dataSearchInput.value = '';
            }, 500);
        });
    }

    public showFilterProducts(stringRequestFilter: string): void {
        this.product.innerHTML = '';
        void new Model().getSearchProducts(stringRequestFilter).then((data) => {
            for (let i = 0; i < data.results.length; i += 1) {
                this.dataProduct = data.results[i];
                this.keyProduct = this.dataProduct.key;
                this.nameProduct = this.dataProduct.name['en-US'];
                this.urlImgProduct = this.dataProduct.masterVariant.images[0].url;
                this.characteristicProduct = this.dataProduct.masterVariant.attributes;
                this.newFormatPriceProduct = this.newFormatPrice(
                    this.dataProduct.masterVariant.prices[0].value.centAmount
                );
                if (this.dataProduct.masterVariant.prices[0].discounted) {
                    this.newFormatDiscPriceProduct = this.newFormatPrice(
                        this.dataProduct.masterVariant.prices[0].discounted.value.centAmount
                    );
                    this.initCartProductWithDescPrice();
                } else {
                    this.initCartProductWithoutDescPrice();
                }
            }

            if (data.results.length === 0) {
                this.product.innerHTML = 'Nothing found';
            }
        });
    }

    public createBlockProducts(): void {
        this.product = document.createElement('div');
        this.product.classList.add('products');
        this.shop.appendChild(this.product);
    }

    // creat filter
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
        this.priceUpInput.classList.add('price-up');
        this.priceUpInput.placeholder = 'Price up, €';
        this.priceDiv.appendChild(this.priceUpInput);

        // creat select body car
        this.selectBodydCarDiv = document.createElement('div');
        this.selectBodydCarDiv.classList.add('filtr-body-car');
        this.filterDiv.appendChild(this.selectBodydCarDiv);

        this.labelBodyCar = document.createElement('label');
        this.labelBodyCar.innerHTML = 'Choose a body type';
        this.selectBodydCarDiv.appendChild(this.labelBodyCar);
        this.selectBodyCar = document.createElement('select');
        this.selectBodyCar.classList.add('body-car');
        this.selectBodyCar.name = 'body-car';
        this.optionSelectBodyCar = document.createElement('option');
        this.optionSelectBodyCar.value = 'All body car';
        this.optionSelectBodyCar.text = 'All body car';
        this.selectBodyCar.appendChild(this.optionSelectBodyCar);
        this.selectBodydCarDiv.appendChild(this.selectBodyCar);

        const dataAllCategories = new Model().getCategories();
        void dataAllCategories.then((data) => {
            data.results.forEach((el) => {
                this.optionSelectBodyCar = document.createElement('option');
                this.optionSelectBodyCar.value = el.description['en-US'];
                this.optionSelectBodyCar.text = el.description['en-US'];
                this.selectBodyCar.appendChild(this.optionSelectBodyCar);
            });
        });

        // creat select brand car
        this.selectBrandCarDiv = document.createElement('div');
        this.selectBrandCarDiv.classList.add('filtr-brand-car');
        this.filterDiv.appendChild(this.selectBrandCarDiv);

        this.labelBrandCar = document.createElement('label');
        this.labelBrandCar.innerHTML = 'Choose a brand';
        this.selectBrandCarDiv.appendChild(this.labelBrandCar);
        this.selectBrandCar = document.createElement('select');
        this.selectBrandCar.classList.add('brand-car');
        this.selectBrandCar.name = 'brand-car';
        this.optionSelectBrandCar = document.createElement('option');
        this.optionSelectBrandCar.value = 'All brand car';
        this.optionSelectBrandCar.text = 'All brand car';
        this.selectBrandCar.appendChild(this.optionSelectBrandCar);
        this.selectBrandCarDiv.appendChild(this.selectBrandCar);

        allBrendName.forEach((el) => {
            this.optionSelectBrandCar = document.createElement('option');
            this.optionSelectBrandCar.value = el;
            this.optionSelectBrandCar.text = el;
            this.selectBrandCar.appendChild(this.optionSelectBrandCar);
        });

        // button
        this.filterButton = document.createElement('button');
        this.filterButton.classList.add('filter-button');
        this.filterButton.innerHTML = 'Show';
        this.filterDiv.appendChild(this.filterButton);
    }

    // creat block search
    public creatBlockSearch(): void {
        this.searchDiv = document.createElement('div');
        this.searchDiv.classList.add('search');
        this.shop.appendChild(this.searchDiv);

        this.searchInput = document.createElement('input');
        this.searchInput.type = 'text';
        this.searchInput.placeholder = 'Enter the car name';
        this.searchInput.classList.add('search-input');
        this.searchDiv.appendChild(this.searchInput);

        this.searchButton = document.createElement('button');
        this.searchButton.classList.add('search-button');
        this.searchButton.innerHTML = 'Search';
        this.searchDiv.appendChild(this.searchButton);
    }

    public creatResultFilterSearch(): void {
        this.resultFilterSearchDiv = document.createElement('div');
        this.resultFilterSearchDiv.classList.add('result-filter-search');
        this.searchDiv.appendChild(this.resultFilterSearchDiv);
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

    public getLayout(): HTMLElement {
        return this.shop;
    }
}
