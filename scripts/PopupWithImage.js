import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageElement = this._popup.querySelector('.popup__img');
        this._captionElement = this._popup.querySelector('.popup__img-title');

        console.log(this._imageElement, this._captionElement);
    }

    open(name, link) {
        this._imageElement.src = link;
        this._imageElement.alt = name;
        this._captionElement.textContent = name;
        super.open();
    }

    close() {
        this._imageElement.src = '';
        this._imageElement.alt = '';
        this._captionElement.textContent = '';
        super.close();
    }
}