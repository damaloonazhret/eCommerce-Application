import './error404.scss';

export default class Error404 {
    private error404!: HTMLElement;

    private error404Container!: HTMLElement;

    private error404Text!: HTMLElement;

    constructor() {
        this.init();
    }

    private init(): void {
        this.error404 = document.createElement('section');
        this.error404.classList.add('error404');

        this.error404Container = document.createElement('div');
        this.error404Container.classList.add('error404__container');
        this.error404Text = document.createElement('div');
        this.error404Text.classList.add('error404__text');

        this.error404Container.append(this.error404Text);
        this.error404.append(this.error404Container);
        this.error404Text.textContent = 'PAGE NOT FOUND';
    }

    public getLayout(): HTMLElement {
        return this.error404;
    }
}
