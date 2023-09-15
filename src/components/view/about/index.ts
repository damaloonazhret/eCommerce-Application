import './about.scss';
import AboutUsCardGenerator from '../../../helpers/aboutUsCardGenerator';

export default class About {
    private about!: HTMLElement;

    constructor() {
        this.init();
    }

    private init(): void {
        this.about = document.createElement('section');
        this.about.classList.add('about');
        // this.about.textContent = 'About Page';
        const card = new AboutUsCardGenerator(
            'Andrey',
            'member',
            'I am 24 years old. At the moment I work as an engineer, I am engaged in setting up and debugging radar equipment.\n' +
                '\n' +
                'After graduating, I started working in my specialty and studying programming. The direction of front-end development was chosen. I like to learn, I have always been interested in learning new things.\n' +
                '\n' +
                'For me, programming becomes like a hobby, so I spend all my free time on the front-end, and in the front-end, you can always see the result on the screen of your device, which sometimes motivates me very well. The goals and objectives are simple, constantly learning and evolving.',
            'https://github.com/damaloonazhret'
        ).getContainer();
        this.about.append(card);
    }

    public getLayout(): HTMLElement {
        return this.about;
    }
}
