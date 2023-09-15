import Andrey from '../../assets/membersPhotos/Andrey.jpg';
// import Denis from '../../assets/membersPhotos/Denis.jpg';
// import Evgeniy from '../../assets/membersPhotos/Evgeniy.jpg';

export default class AboutUsCardGenerator {
    private readonly cardContainer: HTMLElement;

    constructor(name: string, roles: string, biography: string, gitHub: string) {
        this.cardContainer = this.createCard(name, roles, biography, gitHub);
    }

    private createCard(name: string, roles: string, biography: string, gitHub: string): HTMLElement {
        const card = document.createElement('section');
        card.classList.add('card');

        const header = document.createElement('div');
        header.classList.add('card__header');

        const image = document.createElement('img');
        image.classList.add('card__header-img');
        image.src = Andrey;

        const headerName = document.createElement('h1');
        headerName.innerText = `Name: ${name}`;
        headerName.classList.add('card__header-member');

        const rolesMember = document.createElement('h3');
        rolesMember.innerText = `Role: ${roles}`;
        rolesMember.classList.add('card__header-roles');

        const biographyText = document.createElement('span');
        biographyText.innerText = biography;

        const githubLink = document.createElement('a');
        githubLink.setAttribute('href', gitHub);
        githubLink.setAttribute('target', '_blank');
        githubLink.innerText = 'Link to GitHub';

        header.append(image);
        header.append(headerName);
        header.append(rolesMember);
        card.append(header);
        card.append(biographyText);
        card.append(githubLink);

        return card;
    }

    public getContainer(): HTMLDivElement {
        return <HTMLDivElement>this.cardContainer;
    }
}
