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

export const loginInput = new InputGenerator('text', 'Enter Email', 'login__email', 'email');
export const passwordInput = new InputGenerator('password', 'Enter password', 'login__password', 'password');
export const loginForm = document.createElement('form');

const buttonGenerator = new InputGenerator('button', 'Button Text', 'login__button', 'login-btn');
const buttonGeneratorReg = new InputGenerator('button', 'Button Text', 'reg__button', 'reg-btn');

loginForm.appendChild(loginInput.getInputContainer());
loginForm.appendChild(passwordInput.getInputContainer());
loginForm.appendChild(buttonGenerator.getButton('login__button', 'LOGIN', () => {}));

export const emailInputReg = new InputGenerator('email', 'Email', 'registration__input-email', 'email-reg');
export const passwordInputReg = new InputGenerator(
    'password',
    'Password',
    'registration__input-password',
    'password-reg'
);
export const firstNameInputReg = new InputGenerator('text', 'First name', 'registration__input-first', 'first-name');
export const lastNameInputReg = new InputGenerator('text', 'Last name', 'registration__input-last', 'last-name');
export const dobInputReg = new InputGenerator('date', 'Date of birth', 'registration__input-dob', 'dob');
export const streetInputReg = new InputGenerator('text', 'Street', 'registration__input-street', 'street');
export const cityInputReg = new InputGenerator('text', 'City', 'registration__input-city', 'city');
export const postalCodeInputReg = new InputGenerator('text', 'Postal code', 'registration__input-postal', 'postal');
export const countryInputReg = new InputGenerator('text', 'Country', 'registration__input-country', 'country');

export const registrationInput = document.createElement('form');

registrationInput.appendChild(emailInputReg.getInputContainer());
registrationInput.appendChild(passwordInputReg.getInputContainer());
registrationInput.appendChild(firstNameInputReg.getInputContainer());
registrationInput.appendChild(lastNameInputReg.getInputContainer());
registrationInput.appendChild(dobInputReg.getInputContainer());
registrationInput.appendChild(streetInputReg.getInputContainer());
registrationInput.appendChild(cityInputReg.getInputContainer());
registrationInput.appendChild(postalCodeInputReg.getInputContainer());
registrationInput.appendChild(countryInputReg.getInputContainer());
registrationInput.appendChild(buttonGeneratorReg.getButton('registration__button', 'REGISTRATION', () => {}));
