import img from '../../assets/images/html.png';

export default class App {
    constructor(root) {
        this.root = root;
    }

    start() {
        this.root.innerHTML = `<img src="${img}" alt="html" />`;
    }
}
