import './main.scss';

export default class Main {
    private main!: HTMLElement;

    constructor() {
        this.init();
    }

    private init(): void {
        this.main = document.createElement('main');
        this.main.classList.add('main');
        this.main.textContent = 'Main Page';
    }

    public getLayout(): HTMLElement {
        return this.main;
    }

    public setContent(element: HTMLElement): void {
        this.main.innerHTML = '';
        this.main.append(element);
    }
}
