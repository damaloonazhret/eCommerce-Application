export default class ButtonGenerator {
    public createButtonWithCheckbox(className: string, buttonText: string, checkboxText: string): HTMLDivElement {
        const container = document.createElement('div');
        container.classList.add(className);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add(`${className}_btn`);
        const button = document.createElement('button');
        button.textContent = 'Default';
        const buttonSpan = document.createElement('span');
        buttonSpan.textContent = buttonText;

        buttonContainer.appendChild(button);
        buttonContainer.appendChild(buttonSpan);
        if (checkboxText !== 'none') {
            const checkboxContainer = document.createElement('div');
            checkboxContainer.classList.add(`${className}_checkbox`);
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `${className}-checkbox`;
            const checkboxSpan = document.createElement('span');
            checkboxSpan.textContent = checkboxText;

            checkboxContainer.appendChild(checkbox);
            checkboxContainer.appendChild(checkboxSpan);
            container.appendChild(checkboxContainer);
        }
        container.appendChild(buttonContainer);

        return container;
    }
}
