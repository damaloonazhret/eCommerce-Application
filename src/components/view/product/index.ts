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

    constructor(controller: Controller, navigateTo: (url: string) => void, params: Record<string, string>) {
        this.controller = controller;
        this.navigateTo = navigateTo;
        this.params = params;
        this.init();
    }

    private init(): void {
        this.product = document.createElement('section');
        this.product.classList.add('product-main');

        void new Model().getProduct(this.params.id).then((data) => {
            this.dataProduct = data;
            this.keyProduct = this.dataProduct.key;
            this.nameProduct = this.dataProduct.masterData.current.name['en-US'];
            this.urlImgProduct = this.dataProduct.masterData.current.masterVariant.images[0].url;
            this.arrUrlImgProduct = this.dataProduct.masterData.current.masterVariant.images;
            const arrImg: Array<string> = [];
            const creatSmallImgBlock = (): void => {
                const allSmallImg = document.querySelector('.all-small-img') as HTMLElement;
                for (let i = 0; i < this.arrUrlImgProduct.length; i += 1) {
                    if (i > 0) {
                        allSmallImg.innerHTML += `<div><img class="small-img" data-num-img="${i}" src="${this.arrUrlImgProduct[i].url}"></div>`;
                    }
                    arrImg[i] = this.arrUrlImgProduct[i].url;
                }
            };

            // slider
            const showSlider = (): void => {
                const imgBig = document.querySelector('.big-img') as HTMLElement;
                const slider = document.querySelector('.slider') as HTMLElement;
                const sliderImg = document.querySelector('.slider-img') as HTMLElement;
                const leftArrow = document.querySelector('.left-arrow') as HTMLElement;
                const rightArrow = document.querySelector('.right-arrow') as HTMLElement;
                const smallImg = document.querySelectorAll<HTMLDivElement>('.small-img');
                let coutnClick: number = 0;
                document.addEventListener('click', (e) => {
                    const target = e.target as HTMLElement;
                    if (target.className === 'slider') {
                        slider.style.display = 'none';
                        coutnClick = 0;
                    }
                });

                // click big img
                imgBig.addEventListener('click', () => {
                    slider.style.display = 'flex';
                    rightArrow.addEventListener('click', () => {
                        console.log(coutnClick);
                        coutnClick += 1;
                        if (coutnClick > arrImg.length - 1) {
                            coutnClick = 0;
                        }
                        sliderImg.innerHTML = `<img src="${arrImg[coutnClick]}">`;
                    });
                    leftArrow.addEventListener('click', () => {
                        coutnClick -= 1;
                        if (coutnClick < 0) {
                            coutnClick = arrImg.length - 1;
                        }
                        sliderImg.innerHTML = `<img src="${arrImg[coutnClick]}">`;
                    });
                    sliderImg.innerHTML = `<img src="${arrImg[0]}">`;
                });

                // click small img
                smallImg.forEach((el) => {
                    coutnClick = 0;
                    el.addEventListener('click', () => {
                        const numClickSmallImg = Number(el.getAttribute('data-num-img'));
                        coutnClick = numClickSmallImg;
                        slider.style.display = 'flex';
                        rightArrow.addEventListener('click', () => {
                            coutnClick += 1;
                            if (coutnClick > arrImg.length - 1) {
                                coutnClick = 0;
                            }
                            sliderImg.innerHTML = `<img src="${arrImg[coutnClick]}">`;
                        });
                        leftArrow.addEventListener('click', () => {
                            coutnClick -= 1;
                            if (coutnClick < 0) {
                                coutnClick = arrImg.length - 1;
                            }
                            sliderImg.innerHTML = `<img src="${arrImg[coutnClick]}">`;
                        });
                        sliderImg.innerHTML = `<img src="${arrImg[coutnClick]}">`;
                    });
                });
            };
            setTimeout(creatSmallImgBlock, 0);
            setTimeout(showSlider, 0);

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

            this.product.innerHTML += `<div class="breadcrumbs"> <a href="/" data-route>Home</a> / <a href='/shop' data-route>Shop</a> / <span>${this.nameProduct}</span></div><div class="img-product"><img src="${this.urlImgProduct}" class="big-img" alt="${this.nameProduct}"><div class="all-small-img"></div></div><div class="info-product"><span class="name-product">${this.nameProduct}</span><span class="desc-product">${this.descriptionProduct}</span><ul><li>- Body type: ${this.bodyTypeProductText} </li><li>- Type of drive: ${this.typeDriveProductText} <li>- Transmission: ${this.transmissionProductText}</li><li>- Engine: ${this.engineProductText}</li><li>- Maximum speed: ${this.maxSpeedProductText} km/h</li></ul><span class="price-product">${this.newFormatPriceProduct} €</span></span></div><div class="slider"><div class="left-arrow">❮</div><div class="slider-img"></div><div class="right-arrow">❯</div></div>`;

            if (this.dataProduct.masterData.current.masterVariant.prices[0].discounted) {
                this.newFormatDiscPriceProduct = this.newFormatPrice(
                    this.dataProduct.masterData.current.masterVariant.prices[0].discounted.value.centAmount
                );
                this.showDiscPriceProduct();
            }
        });
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

    /*   public creatBlockSlider(): void {
        const mainDiv = document.querySelector('main');
        const sliderDiv = document.createElement('div');
        sliderDiv.classList.add('slider');
        sliderDiv.innerHTML = 'slider';

        mainDiv?.appendChild(sliderDiv);
    } */

    public getLayout(): HTMLElement {
        return this.product;
    }
}
