export class DefaultCard {
    constructor(cardTitle, cardImg, cardTypeSelector) {
        this.cardTitle = cardTitle;
        this.cardImg = cardImg;
        this.cardTypeSelector = cardTypeSelector;
    }
    
    _setEventListeners(cardElement) {
        
    }

    _buildCard(cardTitle, cardImg, cardTypeSelector) {
    const cardGrid = document.querySelector('.elements__grid');
    const cardTemplate = cardGrid.querySelector(cardTypeSelector);
    const cardElement = cardTemplate.content.cloneNode(true);

    cardElement.querySelector('.elements__img').src = cardImg;
    cardElement.querySelector('.elements__img').alt = cardTitle;
    cardElement.querySelector('.elements__title').textContent = cardTitle;

    cardElement.querySelector('.popup__img').src = cardImg;
    cardElement.querySelector('.popup__img').alt = cardTitle;
    cardElement.querySelector('.popup__img-title').textContent = cardTitle;

    this._setEventListeners(cardElement);

    return cardElement;
    }


    setUpCard() {
        const cardElement = this._buildCard(this.cardTitle, this.cardImg, this.cardTypeSelector);
        return cardElement;
    }
};