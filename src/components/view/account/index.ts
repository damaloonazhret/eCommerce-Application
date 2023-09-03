import './account.scss';
import AccountPageInfo from '../../../helpers/accountPageInfo';
import InputGenerator from '../../../helpers/inputGenerator';
import validation from '../../../services/validation';
import ValidationUtils from '../../../helpers/formValidator';
import PasswordChange from '../../../helpers/passwordChange';
import { Address, UserInfo } from '../../../types/interfaces';
import Controller from '../../controller';

export default class Account {
    private controller!: Controller;

    private account!: HTMLElement;

    private accountHeader!: HTMLElement;

    private nameDiv!: HTMLElement;

    private nameInput!: HTMLInputElement;

    private nameSave!: HTMLElement;

    private surNameDiv!: HTMLElement;

    private surNameInput!: HTMLInputElement;

    private emailDiv!: HTMLElement;

    private emailInput!: HTMLInputElement;

    private birthDayDiv!: HTMLElement;

    private birthDayInput!: HTMLInputElement;

    private addressDiv!: HTMLElement;

    private addressInput!: HTMLInputElement;

    private addressBillingDiv!: HTMLElement;

    private addressBillingInput!: HTMLInputElement;

    private buttonBox!: HTMLElement;

    private buttonEdit!: HTMLElement;

    private buttonEditBtn!: HTMLElement;

    private buttonSave!: HTMLElement;

    private buttonSaveBtn!: HTMLElement;

    private buttonPassword!: HTMLElement;

    private buttonAddress!: HTMLElement;

    private buttonSaveNewPassword!: HTMLElement;

    private popupChangePassword!: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        void this.init();
    }

    private async init(): Promise<void> {
        const storedData = sessionStorage.getItem('userData');
        const storedToken = sessionStorage.getItem('token');

        if (storedData && storedToken) {
            const userData = JSON.parse(storedData) as UserInfo;
            console.log(userData.customer.firstName);
            console.log(userData.customer);
            this.updatePageWithData(
                userData,
                userData.customer.firstName,
                userData.customer.lastName,
                userData.customer.email,
                userData.customer.dateOfBirth,
                userData.customer.addresses,
                userData.customer.version,
                userData.customer.id
            );
        }
    }

    private updatePageWithData(
        userData: UserInfo,
        userName: string,
        userSurName: string,
        userEmail: string,
        userBirthday: string,
        userAddresses: Array<Address>,
        userVersion: number,
        userId: string
    ): void {
        let name = userName;
        let surName = userSurName;
        let email = userEmail;
        const datePartsInit = userBirthday.split('-');
        let year;
        let month;
        let day;
        let isDisabled = true;
        let saveCount = 0;
        let actualVersion = userVersion;
        year = parseInt(datePartsInit[0], 10);
        month = parseInt(datePartsInit[1], 10) - 1;
        day = parseInt(datePartsInit[2], 10);
        let birthDay = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const address = `${userAddresses[0].streetName}, ${userAddresses[0].postalCode} ${userAddresses[0].city}, ${userAddresses[0].country}`;
        const addressBilling = `${userAddresses[1].streetName}, ${userAddresses[1].postalCode} ${userAddresses[1].city}, ${userAddresses[1].country}`;

        this.account = document.createElement('form');
        this.account.classList.add('account');

        this.accountHeader = new AccountPageInfo('info', 'Account Information', 'account__header').getContainer();

        this.nameDiv = new InputGenerator('text', name, 'account__name', 'first-name', 'disabled').getInputContainer();
        this.nameInput = this.nameDiv.querySelector('input') as HTMLInputElement;

        this.surNameDiv = new InputGenerator(
            'text',
            surName,
            'account__surname',
            'last-name',
            'disabled'
        ).getInputContainer();
        this.surNameInput = this.surNameDiv.querySelector('input') as HTMLInputElement;

        this.emailDiv = new InputGenerator('text', email, 'account__email', 'email', 'disabled').getInputContainer();
        this.emailInput = this.emailDiv.querySelector('input') as HTMLInputElement;

        this.birthDayDiv = new InputGenerator(
            'date',
            surName,
            'account__birthDay',
            'dob',
            'disabled'
        ).getInputContainer();
        this.birthDayInput = this.birthDayDiv.querySelector('input') as HTMLInputElement;

        this.addressDiv = new AccountPageInfo('Address shipping:', address, 'account__address').getContainer();
        this.addressInput = this.addressDiv.querySelector('input') as HTMLInputElement;

        this.addressBillingDiv = new AccountPageInfo(
            'Address billing:',
            addressBilling,
            'account__address'
        ).getContainer();
        this.addressBillingInput = this.addressBillingDiv.querySelector('input') as HTMLInputElement;

        this.nameSave = new AccountPageInfo('button', '', 'account__btn').getContainer();

        this.buttonBox = new AccountPageInfo('box', 'box', 'account__button_container').getContainer();
        this.buttonEdit = new AccountPageInfo('button', 'Edit Mode', 'account__button-element').getContainer();
        this.buttonEditBtn = this.buttonEdit.querySelector('button') as HTMLButtonElement;
        this.buttonSave = new AccountPageInfo('button', 'Save Data', 'account__button-save').getContainer();
        this.buttonSaveBtn = this.buttonSave.querySelector('button') as HTMLButtonElement;
        this.buttonPassword = new AccountPageInfo(
            'button',
            'Change Password',
            'account__button-password'
        ).getContainer();
        this.buttonAddress = new AccountPageInfo('button', 'Change address', 'account__address-change').getContainer();

        this.buttonSaveNewPassword = new AccountPageInfo(
            'button',
            'Save new password!',
            'account__password-save'
        ).getContainer();

        this.popupChangePassword = new PasswordChange(
            'Current Password',
            'New Password',
            'popup-change',
            'Save new password',
            actualVersion,
            this.controller
        ).getFormContainer();

        this.account.append(this.accountHeader);
        this.account.append(this.nameDiv);
        this.account.append(this.surNameDiv);
        this.account.append(this.emailDiv);
        this.account.append(this.birthDayDiv);
        this.account.append(this.addressDiv);
        this.account.append(this.addressBillingDiv);

        this.buttonBox.append(this.buttonEdit);
        this.buttonBox.append(this.buttonSave);
        this.buttonBox.append(this.buttonPassword);
        this.buttonBox.append(this.buttonAddress);

        this.account.append(this.buttonBox);

        this.birthDayInput.value = birthDay;

        this.buttonSaveBtn.setAttribute('disabled', 'true');

        this.nameInput.placeholder = name;
        this.surNameInput.placeholder = surName;
        this.emailInput.placeholder = email;
        this.birthDayInput.placeholder = birthDay;

        const saveDob = (): void => {
            const dateString = this.birthDayInput.value;
            const dateParts = dateString.split('-');
            year = parseInt(dateParts[0], 10);
            month = parseInt(dateParts[1], 10) - 1;
            day = parseInt(dateParts[2], 10);
            birthDay = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            this.birthDayInput.value = birthDay;
            this.birthDayInput.placeholder = birthDay;
        };
        let isDisabledSave = this.buttonSaveBtn.hasAttribute('disabled');
        const checkCount = (): void => {
            if (saveCount === 4) {
                isDisabled = true;
                isDisabledSave = true;
                this.buttonEditBtn.classList.toggle('active');
                this.buttonSaveBtn.setAttribute('disabled', 'true');
            }
        };

        const saveLocalInputValue = (input: HTMLElement, e: Event): void => {
            e.preventDefault();
            input.setAttribute('disabled', 'true');
            saveCount += 1;
            checkCount();
        };

        this.account.addEventListener('input', (e) =>
            validation(e.target as HTMLInputElement, this.showError.bind(this))
        );

        const updateAllData = async (
            e: Event,
            input: HTMLInputElement,
            inputDiv: HTMLElement,
            action: string,
            setValue: 'lastName' | 'firstName' | 'dateOfBirth' | 'email',
            nameValue?: string
        ): Promise<void> => {
            e.preventDefault();
            const currentElement = inputDiv.querySelector('ul');
            if (currentElement?.childElementCount === 0 && !input.hasAttribute('disabled')) {
                saveLocalInputValue(input, e);
                const resultVersionCurrent = await this.controller.getVersion(userId);
                const result = await this.controller.updateName(
                    input.value,
                    resultVersionCurrent.version,
                    action,
                    setValue,
                    userId
                );
                if (result.success) {
                    switch (nameValue) {
                        case 'name':
                            name = input.value;
                            break;
                        case 'surName':
                            surName = input.value;
                            break;
                        case 'email':
                            email = input.value;
                            break;
                        case 'dob':
                            saveDob();
                            break;
                        default:
                            break;
                    }
                    console.log(`Success ${action} changed`);
                    const resultVersion = await this.controller.getVersion(userId);
                    const updatedUserData = { ...userData };
                    updatedUserData.customer.version = resultVersion.version;
                    updatedUserData.customer[setValue] = input.value;
                    sessionStorage.setItem('userData', JSON.stringify(updatedUserData));
                    actualVersion = resultVersion.version;
                } else {
                    console.log(result.message);
                }
            } else {
                input.focus();
            }
        };

        this.buttonSave.addEventListener('click', async (e) => {
            e.preventDefault();
            // name = this.nameInput.value;
            // surName = this.surNameInput.value;
            // email = this.emailInput.value;
            saveDob();
            await updateAllData(e, this.nameInput, this.nameDiv, 'setFirstName', 'firstName', 'name');
            await updateAllData(e, this.surNameInput, this.surNameDiv, 'setLastName', 'lastName', 'surname');
            await updateAllData(e, this.emailInput, this.emailDiv, 'changeEmail', 'email', 'email');
            await updateAllData(e, this.birthDayInput, this.birthDayDiv, 'setDateOfBirth', 'dateOfBirth', 'dob');
        });

        this.buttonPassword.addEventListener('click', (e) => {
            e.preventDefault();
            const firstName = document.getElementById('first-name');
            if (firstName) {
                this.account.insertBefore(this.popupChangePassword, this.buttonBox);
                this.account.removeChild(this.accountHeader);
                this.account.removeChild(this.nameDiv);
                this.account.removeChild(this.surNameDiv);
                this.account.removeChild(this.emailDiv);
                this.account.removeChild(this.birthDayDiv);
                this.account.removeChild(this.addressDiv);
                this.account.removeChild(this.addressBillingDiv);
                this.buttonBox.removeChild(this.buttonEdit);
                this.buttonBox.removeChild(this.buttonSave);
                this.buttonBox.classList.add('password');
            } else {
                this.account.removeChild(this.popupChangePassword);
                this.account.insertBefore(this.accountHeader, this.buttonBox);
                this.account.insertBefore(this.nameDiv, this.buttonBox);
                this.account.insertBefore(this.surNameDiv, this.buttonBox);
                this.account.insertBefore(this.emailDiv, this.buttonBox);
                this.account.insertBefore(this.birthDayDiv, this.buttonBox);
                this.account.insertBefore(this.addressDiv, this.buttonBox);
                this.account.insertBefore(this.addressBillingDiv, this.buttonBox);
                this.buttonBox.prepend(this.buttonSave);
                this.buttonBox.prepend(this.buttonEdit);
                this.buttonBox.classList.remove('password');
            }
        });

        this.nameInput.addEventListener('keydown', async (e) => {
            if (e.code === 'Enter') {
                await updateAllData(e, this.nameInput, this.nameDiv, 'setFirstName', 'firstName', 'name');
            }
        });

        this.surNameInput.addEventListener('keydown', async (e) => {
            if (e.code === 'Enter') {
                await updateAllData(e, this.surNameInput, this.surNameDiv, 'setLastName', 'lastName', 'surName');
            }
        });

        this.emailInput.addEventListener('keydown', async (e) => {
            if (e.code === 'Enter') {
                await updateAllData(e, this.emailInput, this.emailDiv, 'changeEmail', 'email', 'email');
            }
        });

        this.birthDayInput.addEventListener('keydown', async (e) => {
            if (e.code === 'Enter') {
                await updateAllData(e, this.birthDayInput, this.birthDayDiv, 'setDateOfBirth', 'dateOfBirth', 'dob');
            }
        });

        this.buttonEdit.addEventListener('click', (e) => {
            e.preventDefault();
            saveCount = 0;
            this.buttonEditBtn.classList.toggle('active');

            if (isDisabledSave) {
                this.buttonSaveBtn.removeAttribute('disabled');
            } else {
                this.buttonSaveBtn.setAttribute('disabled', 'true');
            }

            if (isDisabled) {
                this.nameInput.removeAttribute('disabled');
                this.surNameInput.removeAttribute('disabled');
                this.birthDayInput.removeAttribute('disabled');
                this.emailInput.removeAttribute('disabled');
                isDisabled = false;
                isDisabledSave = false;
            } else {
                this.nameInput.setAttribute('disabled', 'true');
                this.surNameInput.setAttribute('disabled', 'true');
                this.birthDayInput.setAttribute('disabled', 'true');
                this.emailInput.setAttribute('disabled', 'true');
                isDisabled = true;
                isDisabledSave = true;
            }

            // this.nameInput.value = !isDisabled ? name : '';
            // this.surNameInput.value = !isDisabled ? surName : '';
            // this.emailInput.value = !isDisabled ? email : '';
            // this.birthDayInput.value = birthDay;
            //
            // this.nameInput.placeholder = !isDisabled ? '' : name;
            // this.surNameInput.placeholder = !isDisabled ? '' : surName;
            // this.emailInput.placeholder = !isDisabled ? '' : email;
            // this.birthDayInput.placeholder = !isDisabled ? '' : birthDay;
            this.nameInput.value = name;
            this.surNameInput.value = surName;
            this.emailInput.value = email;
            this.birthDayInput.value = birthDay;

            this.nameInput.placeholder = name;
            this.surNameInput.placeholder = surName;
            this.emailInput.placeholder = email;
            this.birthDayInput.placeholder = birthDay;
        });
    }

    private showError(input: HTMLInputElement, messages: Array<string>): void {
        ValidationUtils.showError(input, messages);
    }

    public getLayout(): HTMLElement {
        return this.account;
    }
}
