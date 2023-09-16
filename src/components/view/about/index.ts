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
        const cardFirst = new AboutUsCardGenerator(
            'Andrey',
            'Team member',
            'Hello everyone, my name is Andrey, I’m 24 years old. In this project, my team and I decided that we would try ourselves in different roles and everyone had the opportunity to express themselves in different directions, I personally was involved in validation, user account and created an “about us” page. Also, if any questions arose, I turned to my teammates for help and we successfully sorted everything out, of course, not everything was done perfectly, but the most important thing is that invaluable experience was gained.',
            'https://github.com/damaloonazhret'
        ).getContainer();
        const cardSecond = new AboutUsCardGenerator(
            'Denis',
            'Team leader',
            'Good day, my name is Denis and in this project I was the team lead, at the very beginning I was involved in setting up the assembly and routings, then I helped with validation and promptly answered all questions that arose, I also created a token for authorization and at the last sprint I was busy with the basket.',
            'https://github.com/denys-bilonozhko'
        ).getContainer();
        const cardThird = new AboutUsCardGenerator(
            'Eugene',
            'Team member',
            'Hello, my name is Evgeniy, in this project I worked on the product page and the page with the selected product and also did filtering and searching. In the last project, I was given the task of continuing to work with product pages, since one thing clings to another and I decided to continue to complete this part of the work, the project taught me a lot and gained experience in teamwork.',
            'https://github.com/p0lluxstar'
        ).getContainer();
        this.about.append(cardSecond);
        this.about.append(cardThird);
        this.about.append(cardFirst);
    }

    public getLayout(): HTMLElement {
        return this.about;
    }
}
