import img from '../../assets/images/html.png';

export default class App {
    private root: HTMLElement;

    constructor(root: HTMLElement) {
        this.root = root;
    }

    public start(): void {
        this.root.innerHTML = `<img src="${img}" alt="html" />`;
    }
}
