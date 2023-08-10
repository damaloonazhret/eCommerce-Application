import { Route } from '../../types/interfaces';
import Main from '../view/main';

export default class Router {
    private main!: Main;

    private routes!: Route[];

    constructor(main: Main) {
        this.main = main;
        this.bindListeners();
    }

    public setRoutes(newRoutes: Route[]): void {
        this.routes = newRoutes;
    }

    private bindListeners(): void {
        window.addEventListener('popstate', () => this.router());

        document.addEventListener('DOMContentLoaded', () => {
            document.body.addEventListener('click', (e) => {
                const target = e.target as HTMLAnchorElement;
                if (target.matches('[data-route]')) {
                    e.preventDefault();
                    this.navigateTo(target.href);
                }
            });

            this.router();
        });
    }

    private generatePathRegex(path: string): RegExp {
        const escapedPath = path.replace(/\//g, '\\/');
        const dynamicPathRegex = escapedPath.replace(/:\w+/g, '(.+)');
        const regexString = `^${dynamicPathRegex}$`;
        return new RegExp(regexString);
    }

    private navigateTo(url: string): void {
        window.history.pushState(null, '', url);
        this.router();
    }

    private router(): void {
        const potentialMatches = this.routes.map((route) => {
            return {
                route,
                result: window.location.pathname.match(this.generatePathRegex(route.path)),
            };
        });

        let match = potentialMatches.find((potentialMatch) => potentialMatch.result !== null);

        if (!match) {
            match = {
                route: this.routes[0],
                result: [window.location.pathname],
            };
        }

        const view = new match.route.View();
        this.main.setContent(view.getLayout());
    }
}
