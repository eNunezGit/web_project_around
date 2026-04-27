import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) { 
        super(popupSelector);
        this._submitHandler = submitHandler;

        this._form = this._popup.querySelector('.popup__form');
        this._inputs = Array.from(this._popup.querySelectorAll('.popup__form-input'));
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

    _getInputValues() {
        const inputValues = {};
        this._inputs.forEach(input => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    setEventListeners(){
        super.setEventListeners();
        this._popup.querySelector('.popup__form').addEventListener('submit', (e) => {
            e.preventDefault();
            this._submitHandler(this._getInputValues());
        });
    }
}