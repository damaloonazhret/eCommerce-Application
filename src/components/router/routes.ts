import Route from '../../types/interfaces';
import About from '../view/about';
import Contact from '../view/contact';
import Login from '../view/login';
import Registration from '../view/registration';
import Shop from '../view/shop';

const routes: Route[] = [
    { path: '/', View: Shop },
    { path: '/login', View: Login },
    { path: '/registration', View: Registration },
    { path: '/about', View: About },
    { path: '/contact', View: Contact },
];

export default routes;
