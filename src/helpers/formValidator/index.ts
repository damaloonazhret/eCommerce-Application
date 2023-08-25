export default class ValidationUtils {
    public static togglePasswordVisibility(passwordInput: HTMLInputElement, passwordSwitch: HTMLButtonElement): void {
        const newInputType = passwordInput.type === 'password' ? 'text' : 'password';
        const temporaryPasswordInput = passwordInput;
        temporaryPasswordInput.type = newInputType;
        passwordSwitch.classList.toggle('hide', newInputType === 'text');
    }

    public static showError(input: HTMLInputElement, messages: Array<string>): void {
        const inputParent = input.parentElement as HTMLElement;
        const errorUl = inputParent.querySelector('.error') as HTMLElement;
        errorUl.innerHTML = '';

        if (messages.length === 0) {
            input.classList.remove('not-valid');
            input.classList.add('valid');
        } else {
            input.classList.remove('valid');
            input.classList.add('not-valid');

            messages.forEach((message) => {
                const li = document.createElement('li');
                li.textContent = message;
                errorUl.append(li);
            });
        }
    }
}
