export default class SuccessRegistration {
    private readonly popupContainer: HTMLDivElement;

    private readonly popup: HTMLDivElement;

    constructor(className: string, textTop: string, textBottom: string) {
        this.popupContainer = this.createInputContainer(className);
        this.popup = this.createPopup(className, textTop, textBottom);
        this.popupContainer.appendChild(this.popup);
    }

    private createPopup(className: string, textTop: string, textBottom: string): HTMLDivElement {
        const popupBox = document.createElement('div');
        const popupTop = document.createElement('div');
        const popupBottom = document.createElement('div');

        popupBox.classList.add(`${className}__content`);

        popupTop.classList.add(`${className}__content_top`);
        popupTop.innerText = textTop;

        popupBottom.classList.add(`${className}__content_bottom`);
        popupBottom.innerText = textBottom;

        popupBox.appendChild(popupTop);
        popupBox.appendChild(popupBottom);

        return popupBox;
    }

    private createInputContainer(className: string): HTMLDivElement {
        const container = document.createElement('div');
        container.classList.add(className);
        return container;
    }

    public getInputContainer(): HTMLDivElement {
        return this.popupContainer;
    }
}
