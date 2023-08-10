export default class InputGenerator {
    private readonly input: HTMLInputElement;

    constructor(type: string, placeholder: string, className: string) {
        this.input = this.createInput(type, placeholder, className);
    }

    private createInput(type: string, placeholder: string, className: string): HTMLInputElement {
        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        input.classList.add(className);
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

    public getInput(): HTMLInputElement {
        return this.input;
    }

    public getButton(id: string, text: string, clickHandler: () => void): HTMLButtonElement {
        return this.createButton(id, text, clickHandler);
    }
}

export const loginInput = new InputGenerator('text', 'Enter Email', 'login__email');
export const passwordInput = new InputGenerator('password', 'Enter password', 'login__password');
export const loginForm = document.createElement('form');

const buttonGenerator = new InputGenerator('button', 'Button Text', 'login__button');
const buttonGeneratorReg = new InputGenerator('button', 'Button Text', 'reg__button');

loginForm.appendChild(loginInput.getInput());
loginForm.appendChild(passwordInput.getInput());
loginForm.appendChild(buttonGenerator.getButton('login__button', 'LOGIN', () => {}));

export const emailInputReg = new InputGenerator('email', 'Email', 'registration__input-email');
export const passwordInputReg = new InputGenerator('password', 'Password', 'registration__input-password');
export const firstNameInputReg = new InputGenerator('text', 'First name', 'registration__input-first');
export const lastNameInputReg = new InputGenerator('text', 'Last name', 'registration__input-last');
export const dobInputReg = new InputGenerator('date', 'Date of birth', 'registration__input-dob');
export const streetInputReg = new InputGenerator('text', 'Street', 'registration__input-street');
export const cityInputReg = new InputGenerator('text', 'City', 'registration__input-city');
export const postalCodeInputReg = new InputGenerator('text', 'Postal code', 'registration__input-postal');
export const countryInputReg = new InputGenerator('text', 'Country', 'registration__input-country');

export const registrationInput = document.createElement('form');

registrationInput.appendChild(emailInputReg.getInput());
registrationInput.appendChild(passwordInputReg.getInput());
registrationInput.appendChild(firstNameInputReg.getInput());
registrationInput.appendChild(lastNameInputReg.getInput());
registrationInput.appendChild(dobInputReg.getInput());
registrationInput.appendChild(streetInputReg.getInput());
registrationInput.appendChild(cityInputReg.getInput());
registrationInput.appendChild(postalCodeInputReg.getInput());
registrationInput.appendChild(countryInputReg.getInput());
registrationInput.appendChild(buttonGeneratorReg.getButton('registration__button', 'REGISTRATION', () => {}));
