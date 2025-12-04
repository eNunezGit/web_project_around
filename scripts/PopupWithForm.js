export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler, resetHandler) { 
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._resetHandler = resetHandler;
    }

    _getInputValues() {
        const inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
        this._data = {};
        inputList.forEach(input => {
            this._data[input.name] = input.value;
        });
        console.log(this._data);
        return this._data;
    }

    setEventListeners(){
        super.setEventListeners();
        this._popup.querySelector('.popup__form').addEventListener('submit', () => {
            this._getInputValues();
            this._submitHandler(this._data);
        });
    }

    close() {
        this._resetHandler();
        super.close();
    }
}