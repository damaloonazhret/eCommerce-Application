export default class FormValidator {
    public static handleValidation(inputContainer: HTMLElement, isValid: string[], span: HTMLSpanElement): void {
        if (isValid.length === 0) {
            inputContainer.classList.remove('error');
        } else {
            inputContainer.classList.add('error');
            if ('innerHTML' in span) {
                const [firstIsValid] = isValid;
                const newSpan = document.createElement('span');
                newSpan.innerHTML = firstIsValid;
                span.parentNode?.replaceChild(newSpan, span);
            }
        }
    }
}
