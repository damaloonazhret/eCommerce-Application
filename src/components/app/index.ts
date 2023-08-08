import Router from '../router/router';
import routes from '../router/routes';
import Header from '../view/header';
import Main from '../view/main';

export default class App {
    private root: HTMLElement;

    constructor(root: HTMLElement) {
        this.root = root;
    }

    public start(): void {
        const header = new Header();
        const main = new Main();
        const router = new Router(main);
        router.setRoutes(routes);

        this.root.append(header.getLayout());
        this.root.append(main.getLayout());
    }
}
