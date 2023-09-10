import { Route } from '../../types/interfaces';
import About from '../view/about';
import Contact from '../view/contact';
import Home from '../view/home';
import Login from '../view/login';
import Product from '../view/product';
import Registration from '../view/registration';
import Shop from '../view/shop';
import Account from '../view/account';
import Cart from '../view/cart';

const routes: Route[] = [
    { path: '/', View: Home },
    { path: '/shop', View: Shop },
    { path: '/product/:id', View: Product },
    { path: '/login', View: Login },
    { path: '/account', View: Account },
    { path: '/registration', View: Registration },
    { path: '/about', View: About },
    { path: '/contact', View: Contact },
    { path: '/cart', View: Cart },
];

export default routes;
