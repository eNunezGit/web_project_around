import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler, resetHandler = () => {}) { 
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._resetHandler = resetHandler;

        this._form = this._popup.querySelector('.popup__form');
        this._inputs = Array.from(this._popup.querySelectorAll('.popup__form-input'));
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
            this.close();
        });
    }

    close() {
        this._resetHandler();
        super.close();
    }
}