import './about.scss';

export default class About {
    private about!: HTMLElement;

    constructor() {
        this.init();
    }

    private init(): void {
        this.about = document.createElement('section');
        this.about.classList.add('about');
        this.about.textContent = 'About Page';
    }

    public getLayout(): HTMLElement {
        return this.about;
    }
}
