import {deleteCard, likeCard} from "./utils.js";

export class DefaultCard {
    constructor(cardTitle, cardImg, cardTypeSelector, handleCardClick) {
        this.cardTitle = cardTitle;
        this.cardImg = cardImg;
        this.cardTypeSelector = cardTypeSelector;
        this.handleCardClick = handleCardClick;
    }
    
    _setEventListeners(cardElement) {
        cardElement.querySelector('.elements__img').addEventListener('click', this.handleCardClick);

        cardElement.querySelector('.elements__delete-button-img').addEventListener('click', deleteCard);

        cardElement.querySelector('.elements__like-button-img').addEventListener('click', likeCard);
    }

    _buildCard(cardTitle, cardImg, cardTypeSelector) {
    const cardGrid = document.querySelector('.elements__grid');
    const cardTemplate = cardGrid.querySelector(cardTypeSelector);
    const cardElement = cardTemplate.content.cloneNode(true);

    cardElement.querySelector('.elements__card').id = cardTitle

    cardElement.querySelector('.elements__img').src = cardImg;
    cardElement.querySelector('.elements__img').alt = cardTitle;
    cardElement.querySelector('.elements__title').textContent = cardTitle;

    cardElement.querySelector('.popup').id = cardTitle;

    this._setEventListeners(cardElement);

    return cardElement;
    }


    setUpCard() {
        const cardElement = this._buildCard(this.cardTitle, this.cardImg, this.cardTypeSelector);
        return cardElement;
    }
};