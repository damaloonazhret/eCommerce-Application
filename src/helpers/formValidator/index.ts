export default class FormValidator {
    public static handleValidation(inputContainer: HTMLElement, isValid: string[], span: HTMLSpanElement): void {
        const newSpan = document.createElement('span');

        if (isValid.length === 0) {
            inputContainer.classList.remove('error');
        } else {
            inputContainer.classList.add('error');
            if ('innerHTML' in span) {
                const errorList = document.createElement('ul');
                isValid.forEach((errorMessage) => {
                    const errorItem = document.createElement('li');
                    errorItem.textContent = errorMessage;
                    errorList.appendChild(errorItem);
                });

                newSpan.appendChild(errorList);
            }
        }

        span.parentNode?.replaceChild(newSpan, span);
    }
}
