import Andrey from '../../assets/membersPhotos/Andrey.jpg';
import Denis from '../../assets/membersPhotos/Denis.jpg';
import Eugene from '../../assets/membersPhotos/Evgeniy.jpg';
import RSSSChool from '../../assets/membersPhotos/RSSSchool.png';

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
        image.alt = 'Member team photo';
        image.classList.add('card__header-img');
        switch (name) {
            case 'Eugene':
                image.src = Eugene;
                break;
            case 'Andrey':
                image.src = Andrey;
                break;
            case 'Denis':
                image.src = Denis;
                break;
            default:
                break;
        }

        const headerName = document.createElement('h1');
        headerName.innerText = `Name: ${name}`;
        headerName.classList.add('card__header-member');

        const rolesMember = document.createElement('h3');
        rolesMember.innerText = `Role: ${roles}`;
        rolesMember.classList.add('card__header-roles');

        const biographyText = document.createElement('span');
        biographyText.classList.add('card__text');
        biographyText.innerText = biography;

        const linksContainer = document.createElement('div');
        linksContainer.classList.add('card__link-container');

        const RSSLink = document.createElement('a');
        RSSLink.classList.add('card__link_RSS');
        RSSLink.setAttribute('href', 'https://rs.school/');
        RSSLink.setAttribute('target', '_blank');

        const RSSImage = document.createElement('img');
        RSSImage.src = RSSSChool;
        RSSImage.alt = 'RSS School image link';

        RSSLink.append(RSSImage);

        const githubLink = document.createElement('a');
        githubLink.setAttribute('href', gitHub);
        githubLink.setAttribute('target', '_blank');
        githubLink.innerText = 'Link to GitHub';
        githubLink.classList.add('card__link');

        header.append(image);
        header.append(headerName);
        header.append(rolesMember);
        card.append(header);
        card.append(biographyText);
        linksContainer.append(githubLink);
        linksContainer.append(RSSLink);
        card.append(linksContainer);

        return card;
    }

    public getContainer(): HTMLDivElement {
        return <HTMLDivElement>this.cardContainer;
    }
}
