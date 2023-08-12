export default class InputGenerator {
    private readonly inputContainer: HTMLDivElement;

    private readonly input: HTMLInputElement;

    constructor(type: string, placeholder: string, className: string, id: string, errorMessage: string) {
        this.inputContainer = this.createInputContainer(className);
        this.input = this.createInput(type, placeholder, id);
        this.inputContainer.appendChild(this.input);

        const errorMessageSpan = document.createElement('span');
        errorMessageSpan.textContent = errorMessage;
        errorMessageSpan.classList.add(`${id}-error`);
        this.inputContainer.appendChild(errorMessageSpan);
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

    public getInputContainer(): HTMLDivElement {
        return this.inputContainer;
    }

    public getButton(id: string, text: string, clickHandler: (e: Event) => void): HTMLButtonElement {
        const button = document.createElement('button');
        button.id = id;
        button.textContent = text;
        button.classList.add(`${id}`);
        button.addEventListener('click', clickHandler);
        return button;
    }
}
