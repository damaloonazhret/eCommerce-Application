export default class AlreadyRegister {
    private readonly container: HTMLDivElement;

    constructor(className: string, text: string, linkText: string) {
        this.container = this.createContainer(className, text, linkText);
    }

    private createContainer(className: string, text: string, linkText: string): HTMLDivElement {
        const container = document.createElement('div');
        container.classList.add(`${className}__already`);

        const span = document.createElement('span');
        span.innerText = text;
        span.classList.add(`${className}__already_message`);
        container.appendChild(span);

        const link = document.createElement('a');
        if (text === 'Not registered yet?') {
            link.setAttribute('href', '/registration');
        } else {
            link.setAttribute('href', '/login');
        }
        link.innerText = linkText;
        link.classList.add(`${className}__already_link`);
        container.appendChild(link);

        return container;
    }

    public getContainer(): HTMLDivElement {
        return this.container;
    }
}
