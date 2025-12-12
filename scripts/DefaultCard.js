import {deleteCard, likeCard} from "./utils.js";

export class DefaultCard {
    constructor(cardTitle, cardImg, cardId, handleCardClick) {
        this.cardTitle = cardTitle;
        this.cardImg = cardImg;
        this.cardId = cardId;
        this._handleCardClick = handleCardClick;
    }
    
    _setEventListeners(cardElement) {
        cardElement.querySelector('.elements__img').addEventListener('click', this._handleCardClick);

        cardElement.querySelector('.elements__delete-button-img').addEventListener('click', deleteCard);

        cardElement.querySelector('.elements__like-button-img').addEventListener('click', likeCard);
    }

    _buildCard(cardTitle, cardImg) {
    const cardTemplate = document.querySelector('#cardTemplate');
    const cardElement = cardTemplate.content.cloneNode(true);

    cardElement.querySelector('.elements__card').id = this.cardId;

    cardElement.querySelector('.elements__img').src = cardImg;
    cardElement.querySelector('.elements__img').alt = cardTitle;
    cardElement.querySelector('.elements__title').textContent = cardTitle;

    cardElement.querySelector('.popup').id = `${this.cardId}-popup`;

    this._setEventListeners(cardElement);

    return cardElement;
    }


    setUpCard() {
        const cardElement = this._buildCard(this.cardTitle, this.cardImg);
        return cardElement;
    }
};