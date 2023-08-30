import Controller from '../controller';
import Model from '../model';
import Router from '../router/router';
import routes from '../router/routes';
import Header from '../view/header';
import Main from '../view/main';

export default class App {
    private root: HTMLElement;

    private controller: Controller;

    private model: Model;

    private header: Header;

    private main: Main;

    private router: Router;

    constructor(root: HTMLElement) {
        this.root = root;
        this.main = new Main();
        this.header = new Header();
        this.model = new Model(this.header);
        this.controller = new Controller(this.model);
        this.router = new Router(this.controller, this.header, this.main);
    }

    public start(): void {
        this.router.setRoutes(routes);

        this.root.append(this.header.getLayout());
        this.root.append(this.main.getLayout());
    }
}
