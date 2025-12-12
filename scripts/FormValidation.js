export class FormValidation {
    constructor(config, formElement) {
        this._formElement = formElement;
        this._fieldsetSelector = config.fieldsetSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
    }

    enableValidation() {
        this._formElement.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });

        const fieldsetList = Array.from(this._formElement.querySelectorAll(this._fieldsetSelector));

        fieldsetList.forEach((fieldset) => {
            this._setEventListeners(fieldset);
        });
    }

    _setEventListeners(fieldset) {
        const inputList = Array.from(fieldset.querySelectorAll(this._inputSelector));

        this._toggleButtonState(inputList, this._submitButtonSelector);
        inputList.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkInputValidity(input);
                this._toggleButtonState(inputList, this._submitButtonSelector);
            });
        });
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((input) => {
            return !input.validity.valid;
        });
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    resetValidation() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const errorList = Array.from(this._formElement.querySelectorAll(`.${this._errorClass}`));

        inputList.forEach((inputElement) => {
            inputElement.classList.remove(this._inputErrorClass);
        });
        errorList.forEach((errorElement) => {
            errorElement.classList.remove(this._errorClass);
            errorElement.textContent = "";
        });

        this._formElement.reset();
    }
}