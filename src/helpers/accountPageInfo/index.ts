export default class AccountPageInfo {
    private readonly accountInfoContainer: HTMLDivElement;

    constructor(name: string, text: string, className: string) {
        if (name === 'box') {
            this.accountInfoContainer = this.createBox(className);
        } else if (name === 'info') {
            this.accountInfoContainer = this.createHeader(text, className);
        } else if (name === 'button') {
            this.accountInfoContainer = this.createButton(name, text, className);
        } else this.accountInfoContainer = this.createElement(name, text, className);
    }

    private createHeader(text: string, className: string): HTMLDivElement {
        const header = document.createElement('div');
        header.classList.add(`${className}`);

        const headerText = document.createElement('span');
        headerText.innerText = text;

        header.appendChild(headerText);

        return header;
    }

    private createBox(className: string): HTMLDivElement {
        const box = document.createElement('div');
        box.classList.add(className);
        return box;
    }

    private createButton(name: string, text: string, className: string): HTMLDivElement {
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add(`${className}`);

        const buttonText = document.createElement('button');
        buttonText.classList.add(`${className}_btn`);
        buttonText.innerText = text;

        buttonDiv.appendChild(buttonText);

        return buttonDiv;
    }

    private createElement(name: string, text: string, className: string): HTMLDivElement {
        const container = document.createElement('div');
        container.classList.add(`${className}`);

        const spanInfo = document.createElement('span');
        spanInfo.innerText = text;
        spanInfo.classList.add(`${className}_info`);
        spanInfo.setAttribute('disabled', 'true');

        const spanName = document.createElement('span');
        spanName.innerText = name;
        spanName.classList.add(`${className}_name`);

        container.appendChild(spanName);
        container.appendChild(spanInfo);

        return container;
    }

    public getContainer(): HTMLDivElement {
        return this.accountInfoContainer;
    }
}
