import InputGenerator from '../inputGenerator';
import validation from '../../services/validation';
import ValidationUtils from '../formValidator';
import { UserInfo } from '../../types/interfaces';
import Controller from '../../components/controller';

export default class PasswordChange {
    private controller!: Controller;

    private form: HTMLElement;

    private readonly popup: HTMLElement;

    private passwordDiv!: HTMLElement;

    private passwordSwitch!: HTMLButtonElement;

    private passwordInput!: HTMLInputElement;

    private passwordDivChange!: HTMLElement;

    private passwordSwitchChange!: HTMLButtonElement;

    private passwordInputChange!: HTMLInputElement;

    private passwordDivChangeRepeat!: HTMLElement;

    private passwordSwitchChangeRepeat!: HTMLButtonElement;

    private passwordInputChangeRepeat!: HTMLInputElement;

    private buttonPasswordSave!: HTMLButtonElement;

    constructor(
        placeholderCurrentPass: string,
        placeholderRepeatPass: string,
        className: string,
        buttonText: string,
        version: number,
        controller: Controller
    ) {
        this.controller = controller;
        this.form = document.createElement('form');
        this.form.classList.add('form-popup');
        this.popup = this.createPopup(placeholderCurrentPass, placeholderRepeatPass, className, buttonText);
    }

    private createPopup(
        placeholderCurrentPass: string,
        placeholderRepeatPass: string,
        className: string,
        buttonText: string
    ): HTMLFormElement {
        this.buttonPasswordSave = document.createElement('button');
        this.buttonPasswordSave.classList.add(`${className}_btn`);
        this.buttonPasswordSave.textContent = buttonText;
        // this.buttonPasswordSave.setAttribute('disabled', 'true');
        this.passwordDiv = new InputGenerator(
            'password',
            placeholderCurrentPass,
            className,
            'password'
        ).getInputContainer();
        this.passwordDivChange = new InputGenerator(
            'password',
            placeholderRepeatPass,
            className,
            'password'
        ).getInputContainer();
        this.passwordDivChangeRepeat = new InputGenerator(
            'password',
            `Confirm ${placeholderRepeatPass}`,
            className,
            'password'
        ).getInputContainer();

        this.passwordInput = this.passwordDiv.querySelector('input') as HTMLInputElement;
        this.passwordSwitch = this.passwordDiv.querySelector('.password-switch') as HTMLButtonElement;
        this.passwordSwitch.addEventListener('click', (e) =>
            this.handlePasswordSwitchClick(e, this.passwordInput, this.passwordSwitch)
        );

        this.passwordInputChange = this.passwordDivChange.querySelector('input') as HTMLInputElement;
        this.passwordSwitchChange = this.passwordDivChange.querySelector('.password-switch') as HTMLButtonElement;
        this.passwordSwitchChange.addEventListener('click', (e) =>
            this.handlePasswordSwitchClick(e, this.passwordInputChange, this.passwordSwitchChange)
        );

        this.passwordSwitchChangeRepeat = this.passwordDivChangeRepeat.querySelector(
            '.password-switch'
        ) as HTMLButtonElement;
        this.passwordSwitchChangeRepeat.addEventListener('click', (e) =>
            this.handlePasswordSwitchClick(e, this.passwordInputChangeRepeat, this.passwordSwitchChangeRepeat)
        );
        this.passwordInputChangeRepeat = this.passwordDivChangeRepeat.querySelector('input') as HTMLInputElement;

        this.form.append(this.passwordDiv);
        this.form.append(this.passwordDivChange);
        this.form.append(this.passwordDivChangeRepeat);
        this.form.append(this.buttonPasswordSave);

        this.buttonPasswordSave.addEventListener('click', async (e) => {
            e.preventDefault();
            let valid = true;

            const inputs = Array.from(this.form.querySelectorAll('input'));
            for (let i = 0; i < inputs.length; i += 1) {
                const errors = validation(inputs[i], this.showError.bind(this));
                if (errors.length > 0) {
                    valid = false;
                }
            }

            if (!valid) {
                console.log('not valid');
                return;
            }

            const storedData = localStorage.getItem('userData');
            if (storedData) {
                let actualVersion;
                const userDataInfo = JSON.parse(storedData) as UserInfo;
                actualVersion = userDataInfo.customer.version;
                const userData = {
                    id: userDataInfo.customer.id,
                    currentPassword: this.passwordInput.value,
                    newPassword: this.passwordInputChange.value,
                };
                const result = await this.controller.changePassword(userData, actualVersion);
                if (result.success) {
                    console.log('Success password change');
                    const resultVersion = await this.controller.getVersion(userDataInfo.customer.id);
                    const updatedUserData = { ...userDataInfo };
                    updatedUserData.customer.version = resultVersion.version;
                    localStorage.setItem('userData', JSON.stringify(updatedUserData));
                    actualVersion = resultVersion.version;
                    this.buttonPasswordSave.innerText = 'Success password change!!!';
                    setTimeout(() => {
                        this.buttonPasswordSave.innerText = 'Save new password';
                    }, 3000);
                } else {
                    this.buttonPasswordSave.innerText = result.message;
                    setTimeout(() => {
                        this.buttonPasswordSave.innerText = 'Save new password';
                    }, 3000);
                }
            }
        });

        this.form.addEventListener('input', (e) => validation(e.target as HTMLInputElement, this.showError.bind(this)));

        return <HTMLFormElement>this.form;
    }

    // private async submit(e: Event): Promise<void> {
    //     e.preventDefault();
    //     let valid = true;
    //
    //     const inputs = Array.from(this.form.querySelectorAll('input'));
    //     for (let i = 0; i < inputs.length; i += 1) {
    //         const errors = validation(inputs[i], this.showError.bind(this));
    //         if (errors.length > 0) {
    //             valid = false;
    //         }
    //     }
    //
    //     const userData = {
    //         id: 'b96dbf08-0537-45f1-804c-39724d53e1b8',
    //         currentPassword: this.passwordInput.value,
    //         newPassword: this.passwordInputChange.value,
    //     };
    //
    //     if (!valid) {
    //         console.log('not valid', userData);
    //         return;
    //     }
    //
    //     console.log('valid', userData);
    // }

    private showError(input: HTMLInputElement, messages: Array<string>): void {
        ValidationUtils.showError(input, messages);
    }

    private handlePasswordSwitchClick(e: Event, input: HTMLInputElement, switchElement: HTMLButtonElement): void {
        e.preventDefault();
        ValidationUtils.togglePasswordVisibility(input, switchElement);
    }

    public getFormContainer(): HTMLFormElement {
        return <HTMLFormElement>this.popup;
    }
}
