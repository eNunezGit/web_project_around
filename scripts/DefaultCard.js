export class DefaultCard {
    constructor({cardTitle, cardImg, cardId, likeVal, ownerId, handleCardClick, handleDeleteClick, handleLikeClick}) {
        this.cardTitle = cardTitle;
        this.cardImg = cardImg;
        this.cardId = cardId;
        this.isLiked = likeVal;
        this.ownerId = ownerId;

        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }
    
    _setEventListeners(cardElement) {
        cardElement.querySelector('.elements__img').addEventListener('click', this._handleCardClick);

        cardElement.querySelector('.elements__delete-button-img').addEventListener('click', this._handleDeleteClick);

        cardElement.querySelector('.elements__like-button-img').addEventListener('click', this._handleLikeClick);
    }

    _buildCard(cardTitle, cardImg) {
    const cardTemplate = document.querySelector('#cardTemplate');
    const cardElement = cardTemplate.content.cloneNode(true);

    cardElement.querySelector('.elements__card').id = this.cardId;

    cardElement.querySelector('.elements__img').src = cardImg;
    cardElement.querySelector('.elements__img').alt = cardTitle;
    cardElement.querySelector('.elements__title').textContent = cardTitle;

    cardElement.querySelector('.elements__like-button-img').src = this.isLiked
    ? '../images/like-button_full.svg'
    : '../images/like-button.svg';

    this._setEventListeners(cardElement);

    return cardElement;
    }


    setUpCard() {
        const cardElement = this._buildCard(this.cardTitle, this.cardImg);
        return cardElement;
    }
};