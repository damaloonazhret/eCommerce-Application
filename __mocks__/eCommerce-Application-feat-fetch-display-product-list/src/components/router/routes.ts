import { Route } from '../../types/interfaces';
import About from '../view/about';
import Contact from '../view/contact';
import Home from '../view/home';
import Login from '../view/login';
import Product from '../view/product';
import Registration from '../view/registration';
import Shop from '../view/shop';

const routes: Route[] = [
    { path: '/', View: Home },
    { path: '/shop', View: Shop },
    { path: '/product/:id', View: Product },
    { path: '/login', View: Login },
    { path: '/registration', View: Registration },
    { path: '/about', View: About },
    { path: '/contact', View: Contact },
];

export default routes;
