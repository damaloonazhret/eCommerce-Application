export default class InputGenerator {
    private readonly inputContainer: HTMLDivElement;

    private readonly input: HTMLInputElement | HTMLSelectElement;

    constructor(type: string, placeholder: string, className: string, id: string) {
        this.inputContainer = this.createInputContainer(className);

        if (type === 'select') {
            this.input = this.createSelect(id);
        } else {
            this.input = this.createInput(type, placeholder, id);
        }

        this.inputContainer.appendChild(this.input);

        if (type === 'password') {
            const passwordSwitchSpan = document.createElement('button');
            // passwordSwitchSpan.setAttribute('disabled', '');
            passwordSwitchSpan.classList.add(`${id}-switch`);
            // this.inputContainer.setAttribute('autocomplete', 'current-password');
            this.inputContainer.appendChild(passwordSwitchSpan);
        }

        const errorMessageSpan = document.createElement('ul');
        errorMessageSpan.classList.add(`error`);
        this.inputContainer.appendChild(errorMessageSpan);
    }

    private createInputContainer(className: string): HTMLDivElement {
        const container = document.createElement('div');
        container.classList.add(className);
        return container;
    }

    private createInput(type: string, placeholder: string, id: string): HTMLInputElement {
        const input = document.createElement('input');
        input.id = id;
        if (type === 'password') {
            input.setAttribute('autocomplete', 'current-password');
        }
        if (type === 'email') {
            input.setAttribute('autocomplete', 'username');
        }
        input.type = type;
        input.placeholder = placeholder;
        return input;
    }

    private createSelect(id: string): HTMLSelectElement {
        const select = document.createElement('select');
        select.classList.add(id);

        const optionUS = document.createElement('option');
        optionUS.value = 'US';
        optionUS.textContent = 'United States';
        select.appendChild(optionUS);

        const optionCA = document.createElement('option');
        optionCA.value = 'CA';
        optionCA.textContent = 'Canada';
        select.appendChild(optionCA);

        select.value = 'US';

        return select;
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
