export default class InputGenerator {
    private readonly inputContainer: HTMLDivElement;

    private readonly input: HTMLInputElement;

    constructor(type: string, placeholder: string, className: string, id: string) {
        this.inputContainer = this.createInputContainer(className);
        this.input = this.createInput(type, placeholder, id);
        this.inputContainer.appendChild(this.input);
        this.inputContainer.appendChild(document.createElement('span'));
    }

    private createInputContainer(className: string): HTMLDivElement {
        const container = document.createElement('div');
        container.classList.add(className);
        return container;
    }

    private createInput(type: string, placeholder: string, id: string): HTMLInputElement {
        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        input.id = id;
        return input;
    }

    private createButton(id: string, text: string, clickHandler: () => void): HTMLButtonElement {
        const button = document.createElement('button');
        button.id = id;
        button.textContent = text;
        button.classList.add(`${id}`);
        button.addEventListener('click', clickHandler);
        return button;
    }

    public getInputContainer(): HTMLDivElement {
        return this.inputContainer;
    }

    public getButton(id: string, text: string, clickHandler: () => void): HTMLButtonElement {
        return this.createButton(id, text, clickHandler);
    }
}
