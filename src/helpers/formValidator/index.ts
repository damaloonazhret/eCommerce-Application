export default class FormValidator {
    public static handleValidation(inputContainer: HTMLElement, isValid: boolean): void {
        if (isValid) {
            inputContainer.classList.remove('error');
        } else {
            inputContainer.classList.add('error');
        }
    }
}
