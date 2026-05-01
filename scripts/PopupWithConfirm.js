import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._confirmButton = this._popup.querySelector('.popup__submit-button');
    }

    renderLoading(isLoading, text = 'Guardando...') {
        const button = this._popup.querySelector('.popup__submit-button');

        if (isLoading) {
            button.disabled = true;
            button.textContent = text;
        } else {
            button.disabled = false;
            button.textContent = text;
        }
    }

    setSubmitAction(action) {
        this._handleSubmit = action;
        this._confirmButton.addEventListener('click', this._handleSubmit);
    }

    resetSubmitAction() {
        this._confirmButton.removeEventListener('click', this._handleSubmit);
        this._handleSubmit = null;
    }

    close() {
        super.close();
        this.resetSubmitAction();
    }
}