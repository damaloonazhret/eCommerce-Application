import App from './components/app';
import './global.scss';

const root = document.querySelector('body') as HTMLBodyElement;
const app = new App(root);

app.start();
