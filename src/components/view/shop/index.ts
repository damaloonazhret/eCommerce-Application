import './shop.scss';
import Model from '../../model';
import {
    ProductOne,
    CaracteristicProduct,
    CaracteristicProductString,
    CaracteristicProductObject,
} from '../../../types/interfaces';

const allBrendName = ['Audi', 'BMW', 'Mercedes-Benz', 'Toyota', 'Volkswagen', 'FORD'];

export default class Shop {
    private shop!: HTMLElement;

    private filterDiv!: HTMLElement;

    private products!: HTMLElement;

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

    private urlToGetSort: string;

    private bodyTypeProductText!: string;

    private transmissionProductText!: string;

    private engineProductText!: string;

    private maxSpeedProductText!: string;

    constructor() {
        this.init();
        this.urlToGetSort = '';
    }

    public createBlockProducts(): void {
        this.products = document.createElement('div');
        this.products.classList.add('products');
        this.shop.appendChild(this.products);
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

    // creat block sort
    private creatBlockSortProduct(): void {
        const sortProductDiv = document.createElement('div') as HTMLElement;
        sortProductDiv.classList.add('sort');
        sortProductDiv.innerHTML = 'Sort by: ';
        this.shop.appendChild(sortProductDiv);

        const sortByName = document.createElement('span') as HTMLElement;
        sortByName.classList.add('sort-name');
        sortByName.classList.add('asc');
        sortByName.innerHTML = 'Product name▼';
        sortProductDiv.appendChild(sortByName);

        const sortByPrice = document.createElement('span') as HTMLElement;
        sortByPrice.classList.add('sort-price');
        sortByPrice.classList.add('asc');
        sortByPrice.innerHTML = 'Product price▼';
        sortProductDiv.appendChild(sortByPrice);
    }

    private init(): void {
        this.shop = document.createElement('section');
        this.shop.classList.add('shop');
        this.creatBlockfilter();
        this.creatBlockSearch();
        this.creatResultFilterSearch();
        this.creatBlockSortProduct();
        this.createBlockProducts();

        setTimeout(() => {
            this.filterProducts();
            this.searchProducts();
            const sortName = document.querySelector('.sort-name') as HTMLElement;
            sortName.addEventListener('click', () => {
                this.sortNameProducts(this.urlToGetSort);
            });
            const sortPrice = document.querySelector('.sort-price') as HTMLElement;
            sortPrice.addEventListener('click', () => {
                this.sortPriceProducts(this.urlToGetSort);
            });
        }, 0);
    }

    public filterProducts(): void {
        const filterButton = document.querySelector('.filter-button') as HTMLElement;
        const filterPrice = document.querySelector('.filter-price') as HTMLElement;
        const priceFrom = document.querySelector('.price-from') as HTMLInputElement;
        const priceUp = document.querySelector('.price-up') as HTMLInputElement;
        let stringRequestFilter = '';

        this.showProducts('');

        filterButton.addEventListener('click', () => {
            this.resultFilterSearchDiv.innerHTML = '';
            this.products.innerHTML = '';

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
            }, 300);

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
                this.showProducts(stringRequestFilter);
                this.urlToGetSort = stringRequestFilter;
                stringRequestFilter = '';
            }, 300);
        });
    }

    public searchProducts(): void {
        const searchButton = document.querySelector('.search-button') as HTMLElement;
        const dataSearchInput = document.querySelector('.search-input') as HTMLInputElement;
        searchButton.addEventListener('click', () => {
            const stringRequestSearch = `filter=searchKeywords.en-US.text:"${dataSearchInput.value}"`;
            this.resultFilterSearchDiv.innerHTML = '';
            this.products.innerHTML = '';
            this.showProducts(`${stringRequestSearch}&`);
            this.resultFilterSearchDiv.innerHTML = `Search query result - "${dataSearchInput.value}"`;
            this.urlToGetSort = `${stringRequestSearch}&`;
            dataSearchInput.value = '';
        });
    }

    public sortNameProducts(param: string): void {
        const sortName = document.querySelector('.sort-name') as HTMLElement;
        const sortPrice = document.querySelector('.sort-price') as HTMLElement;
        if (sortName.classList.contains('asc')) {
            sortName.innerHTML = 'Product name▲';
            sortName.classList.remove('asc');
            sortName.classList.add('desc');
            if (sortPrice.classList.contains('desc')) {
                sortPrice.innerHTML = 'Product price▼';
                sortPrice.classList.remove('desc');
                sortPrice.classList.add('asc');
            }
            this.showProducts(`${param}sort=name.en-us desc`);
        } else {
            sortName.innerHTML = 'Product name▼';
            sortName.classList.remove('desc');
            sortName.classList.add('asc');
            this.showProducts(`${param}sort=name.en-us asc`);
        }
    }

    public sortPriceProducts(param: string): void {
        const sortName = document.querySelector('.sort-name') as HTMLElement;
        const sortPrice = document.querySelector('.sort-price') as HTMLElement;
        if (sortPrice.classList.contains('asc')) {
            sortPrice.innerHTML = 'Product price▲';
            sortPrice.classList.remove('asc');
            sortPrice.classList.add('desc');
            if (sortName.classList.contains('desc')) {
                sortName.innerHTML = 'Product name▼';
                sortName.classList.remove('desc');
                sortName.classList.add('asc');
            }
            this.showProducts(`${param}sort=price desc`);
        } else {
            sortPrice.innerHTML = 'Product price▼';
            sortPrice.classList.remove('desc');
            sortPrice.classList.add('asc');
            this.showProducts(`${param}sort=price asc`);
        }
    }

    public showProducts(stringRequest: string): void {
        this.products.innerHTML = '';
        void new Model().getSearchProducts(stringRequest).then((data) => {
            for (let i = 0; i < data.results.length; i += 1) {
                this.dataProduct = data.results[i];
                this.keyProduct = this.dataProduct.key;
                this.nameProduct = this.dataProduct.name['en-US'];
                this.urlImgProduct = this.dataProduct.masterVariant.images[0].url;
                this.characteristicProduct = this.dataProduct.masterVariant.attributes;
                this.characteristicProduct.forEach((el: CaracteristicProductString | CaracteristicProductObject) => {
                    if (typeof el.value === 'string') {
                        if (el.name === 'transmission') {
                            this.transmissionProductText = el.value;
                        }
                        if (el.name === 'maximumSpeed') {
                            this.maxSpeedProductText = el.value;
                        }
                    }
                    if (typeof el.value === 'object') {
                        if (el.name === 'bodyCar') {
                            this.bodyTypeProductText = el.value.label;
                        }
                    }
                });
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
                this.products.innerHTML = 'Nothing found';
            }
        });
    }

    public initCartProductWithDescPrice(): void {
        this.products.innerHTML += `<a href="product/${this.keyProduct}" class="product-link" data-route><div class="product" id="${this.keyProduct}"><img src="${this.urlImgProduct}" alt="${this.nameProduct}"><div class="info-product"><span class="name-product">${this.nameProduct}</span><ul><li>Body type: ${this.bodyTypeProductText} <li>Transmission: ${this.transmissionProductText}</li><li>Maximum speed: ${this.maxSpeedProductText} km/h</li></ul><span class="old-price-product">${this.newFormatPriceProduct} €</span></span><span class="disc-price-product">${this.newFormatDiscPriceProduct} €</span></span></div></div></a>`;
    }

    public initCartProductWithoutDescPrice(): void {
        this.products.innerHTML += `<a href="product/${this.keyProduct}" class="product-link" data-route><div class="product" id="${this.keyProduct}"><img src="${this.urlImgProduct}" alt="${this.nameProduct}"><div class="info-product"><span class="name-product">${this.nameProduct}</span><ul><li>Body type: ${this.bodyTypeProductText}<li>Transmission: ${this.transmissionProductText}</li><li>Maximum speed: ${this.maxSpeedProductText} km/h</li></ul><span class="price-product">${this.newFormatPriceProduct} €</span></span></div></div></a>`;
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

    public getLayout(): HTMLElement {
        return this.shop;
    }
}
