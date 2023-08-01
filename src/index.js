import App from './components/app';
import './global.scss';

const root = document.querySelector('body');
const app = new App(root);

app.start();
