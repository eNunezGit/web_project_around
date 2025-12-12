export class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
        this.isOpen = false;
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.style.display = 'block';
        this.isOpen = true;
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.style.display = 'none';
        this.isOpen = false;
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (e) => {
        if (e.key === "Escape" && this.isOpen) {
        this.close();
        }
    }

    setEventListeners(){
        this._popup.querySelector('.popup__close-button').addEventListener('click', () => this.close());
        this._popup.querySelector('.popup__overlay').addEventListener('dblclick', () => this.close());
    }
}