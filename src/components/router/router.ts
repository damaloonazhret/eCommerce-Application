import { Route } from '../../types/interfaces';
import Controller from '../controller';
import Error404 from '../view/error404';
import Header from '../view/header';
import Main from '../view/main';

export default class Router {
    private routes!: Route[];

    private controller!: Controller;

    private header!: Header;

    private main!: Main;

    constructor(controller: Controller, header: Header, main: Main) {
        this.controller = controller;
        this.header = header;
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

    public getParams(match: { route: Route; result: RegExpMatchArray | null }): Record<string, string> {
        if (match.result === null) {
            return {};
        }

        const values = match.result.slice(1);
        const keys: string[] = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1]);

        return Object.fromEntries(
            keys.map((key: string, i: number) => {
                return [key, values[i]];
            })
        );
    }

    public generatePathRegex(path: string): RegExp {
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
                route: { path: '/404', View: Error404 },
                result: [window.location.pathname],
            };
        }

        
        const view = new match.route.View(this.controller, this.navigateTo.bind(this), this.getParams(match));
        this.main.setContent(view.getLayout());
        this.header.setActiveLink(match.route.path);
    }
}
