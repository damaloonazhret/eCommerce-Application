import Controller from '../../controller';
import './product.scss';
import Model from '../../model';
import {
    ProductAll,
    CaracteristicProduct,
    CaracteristicProductString,
    CaracteristicProductObject,
} from '../../../types/interfaces';

type ArrayUrlImg = [
    {
        url: string;
    },
];

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

    private arrUrlImgProduct!: ArrayUrlImg;

    private smallImgDiv!: HTMLElement;

    private descriptionProduct!: string;

    private priceProduct!: string;

    private characteristicProduct!: CaracteristicProduct;

    private newFormatDiscPriceProduct!: string;

    private newFormatPriceProduct!: string;

    private discPriceProductDiv!: HTMLElement;

    private bodyTypeProductText!: string;

    private typeDriveProductText!: string;

    private transmissionProductText!: string;

    private engineProductText!: string;

    private maxSpeedProductText!: string;

    private arrImg!: Array<string>;

    private mainImg!: HTMLElement;

    private sliderEl!: HTMLElement;

    private sliderImg!: HTMLElement;

    private leftArrow!: HTMLElement;

    private rightArrow!: HTMLElement;

    private smallImg!: HTMLDivElement;

    constructor(controller: Controller, navigateTo: (url: string) => void, params: Record<string, string>) {
        this.controller = controller;
        this.navigateTo = navigateTo;
        this.params = params;
        this.arrImg = [];
        this.init();
    }

    private init(): void {
        this.showProduct();
    }

    public showProduct(): void {
        this.product = document.createElement('section');
        this.product.classList.add('product-main');
        void new Model().getProduct(this.params.id).then((data) => {
            this.dataProduct = data;
            this.keyProduct = this.dataProduct.key;
            this.nameProduct = this.dataProduct.masterData.current.name['en-US'];
            this.urlImgProduct = this.dataProduct.masterData.current.masterVariant.images[0].url;
            this.arrUrlImgProduct = this.dataProduct.masterData.current.masterVariant.images;
            const creatSmallImgBlock = (): void => {
                const allSmallImg = document.querySelector('.all-small-img') as HTMLElement;
                for (let i = 0; i < this.arrUrlImgProduct.length; i += 1) {
                    if (i === 0) {
                        allSmallImg.innerHTML += `<div><img class="small-img" data-num-img="${i}" src="${this.arrUrlImgProduct[i].url}"></div>`;
                    } else {
                        allSmallImg.innerHTML += `<div><img class="small-img active-img" data-num-img="${i}" src="${this.arrUrlImgProduct[i].url}"></div>`;
                    }
                    this.arrImg[i] = this.arrUrlImgProduct[i].url;
                }
            };
            setTimeout(creatSmallImgBlock, 0);

            this.slider();

            this.descriptionProduct = this.dataProduct.masterData.current.description['en-US'];
            this.characteristicProduct = this.dataProduct.masterData.current.masterVariant.attributes;
            this.characteristicProduct.forEach((el: CaracteristicProductString | CaracteristicProductObject) => {
                if (typeof el.value === 'string') {
                    if (el.name === 'engine') {
                        this.engineProductText = el.value;
                    }
                    if (el.name === 'transmission') {
                        this.transmissionProductText = el.value;
                    }
                    if (el.name === 'typeOfDrive') {
                        this.typeDriveProductText = el.value;
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
                this.dataProduct.masterData.current.masterVariant.prices[0].value.centAmount
            );

            this.product.innerHTML += `<div class="breadcrumbs"> <a href="/" data-route>Home</a> / <a href='/shop' data-route>Shop</a> / <span>${this.nameProduct}</span></div><div class="img-product"><div class="big-img"><img class="main-img" src="${this.urlImgProduct}" alt="${this.nameProduct}"></div><div class="small-slider"><span class="left-arrow-small">❮</span><div class="all-small-img"></div><span class="right-arrow-small">❯</span></div></div><div class="info-product"><span class="name-product">${this.nameProduct}</span><span class="desc-product">${this.descriptionProduct}</span><ul><li>- Body type: ${this.bodyTypeProductText} </li><li>- Type of drive: ${this.typeDriveProductText} <li>- Transmission: ${this.transmissionProductText}</li><li>- Engine: ${this.engineProductText}</li><li>- Maximum speed: ${this.maxSpeedProductText} km/h</li></ul><span class="price-product">${this.newFormatPriceProduct} €</span></span></div><div class="slider"><span class="left-arrow">❮</span><div class="slider-img"></div><span class="right-arrow">❯</span></div>`;

            if (this.dataProduct.masterData.current.masterVariant.prices[0].discounted) {
                this.newFormatDiscPriceProduct = this.newFormatPrice(
                    this.dataProduct.masterData.current.masterVariant.prices[0].discounted.value.centAmount
                );
                this.showDiscPriceProduct();
            }
        });
    }

    public slider(): void {
        // slider
        const showSlider = (): void => {
            this.sliderEl = document.querySelector('.slider') as HTMLElement;
            this.sliderImg = document.querySelector('.slider-img') as HTMLElement;
            this.leftArrow = document.querySelector('.left-arrow') as HTMLElement;
            this.rightArrow = document.querySelector('.right-arrow') as HTMLElement;
            const smallImg = document.querySelectorAll<HTMLDivElement>('.small-img');
            let coutnClickBig: number = 0;
            let coutnClickSmall: number = 0;
            document.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                if (target.className === 'slider') {
                    document.body.style.overflow = 'visible';
                    this.sliderEl.style.display = 'none';
                    coutnClickBig = 0;
                }
            });

            const showImgClickRigth = (): void => {
                coutnClickBig += 1;
                if (coutnClickBig > this.arrImg.length - 1) {
                    coutnClickBig = 0;
                }
                this.sliderImg.innerHTML = `<img src="${this.arrImg[coutnClickBig]}">`;
            };

            const showImgClickLeft = (): void => {
                coutnClickBig -= 1;
                if (coutnClickBig < 0) {
                    coutnClickBig = this.arrImg.length - 1;
                }
                this.sliderImg.innerHTML = `<img src="${this.arrImg[coutnClickBig]}">`;
            };

            // click big img
            const clickBigImg = (): void => {
                this.mainImg = document.querySelector('.main-img') as HTMLElement;
                this.mainImg.addEventListener('click', () => {
                    this.sliderEl.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                    this.rightArrow.addEventListener('click', showImgClickRigth);
                    this.leftArrow.addEventListener('click', showImgClickLeft);
                    this.sliderImg.innerHTML = `<img src="${this.arrImg[coutnClickSmall]}">`;
                });
            };

            clickBigImg();

            // click small img
            smallImg.forEach((el) => {
                coutnClickBig = 0;
                el.addEventListener('click', () => {
                    const numClickSmallImg = Number(el.getAttribute('data-num-img'));
                    coutnClickBig = numClickSmallImg;
                    this.sliderEl.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                    this.rightArrow.addEventListener('click', showImgClickRigth);
                    this.leftArrow.addEventListener('click', showImgClickLeft);
                    this.sliderImg.innerHTML = `<img src="${this.arrImg[coutnClickBig]}">`;
                });
            });

            const rightArrowSmall = document.querySelector('.right-arrow-small') as HTMLElement;
            const leftArrowSmall = document.querySelector('.left-arrow-small') as HTMLElement;
            const bigImg = document.querySelector('.big-img') as HTMLElement;
            rightArrowSmall.addEventListener('click', () => {
                coutnClickSmall += 1;
                if (coutnClickSmall > this.arrImg.length - 1) {
                    coutnClickSmall = 0;
                }

                smallImg.forEach((el) => {
                    if (el.getAttribute('data-num-img') === String(coutnClickSmall)) {
                        el.classList.remove('active-img');
                    } else {
                        el.classList.add('active-img');
                    }
                });

                bigImg.innerHTML = `<img class="main-img"  src="${this.arrImg[coutnClickSmall]}" alt="${this.nameProduct}">`;
                coutnClickBig = coutnClickSmall;
                clickBigImg();
            });
            leftArrowSmall.addEventListener('click', () => {
                coutnClickSmall -= 1;
                if (coutnClickSmall === -1) {
                    coutnClickSmall = this.arrImg.length - 1;
                }

                smallImg.forEach((el) => {
                    if (el.getAttribute('data-num-img') === String(coutnClickSmall)) {
                        el.classList.remove('active-img');
                    } else {
                        el.classList.add('active-img');
                    }
                });

                bigImg.innerHTML = `<img class="main-img"  src="${this.arrImg[coutnClickSmall]}" alt="${this.nameProduct}">`;
                coutnClickBig = coutnClickSmall;
                clickBigImg();
            });
        };

        setTimeout(showSlider, 0);
    }

    public showDiscPriceProduct(): void {
        const priceProduct = document.querySelector('.price-product') as HTMLElement;
        priceProduct.style.textDecoration = 'line-through';

        const infoProduct = document.querySelector('.info-product') as HTMLElement;
        this.discPriceProductDiv = document.createElement('div');
        this.discPriceProductDiv.classList.add('disc-price-product');
        this.discPriceProductDiv.innerHTML = `${this.newFormatDiscPriceProduct} €`;
        infoProduct.appendChild(this.discPriceProductDiv);
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
