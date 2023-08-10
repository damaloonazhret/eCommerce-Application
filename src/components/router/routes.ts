import { Route } from '../../types/interfaces';
import Login from '../view/login';
import Registration from '../view/registration';
import Shop from '../view/shop';

const routes: Route[] = [
    { path: '/', View: Shop },
    { path: '/login', View: Login },
    { path: '/registration', View: Registration },
];

export default routes;
