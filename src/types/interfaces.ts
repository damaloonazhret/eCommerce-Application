import Error404 from '../components/view/error404';
import Login from '../components/view/login';
import Registration from '../components/view/registration';
import Shop from '../components/view/shop';

export default interface Route {
    path: string;
    View: typeof Shop | typeof Login | typeof Registration | typeof Error404;
}
