import Controller from '../controller';
import Model from '../model';
import Router from '../router/router';
import routes from '../router/routes';
import Header from '../view/header';
import Main from '../view/main';
import Logout from '../view/logout';

export default class App {
    private root: HTMLElement;

    private controller: Controller;

    private model: Model;

    constructor(root: HTMLElement) {
        this.root = root;
        this.model = new Model();
        this.controller = new Controller(this.model);
    }

    public start(): void {
        const header = new Header();
        const main = new Main();
        const router = new Router(main, this.controller);
        router.setRoutes(routes);

        this.root.append(header.getLayout());
        this.root.append(main.getLayout());
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        Logout();
    }
}
