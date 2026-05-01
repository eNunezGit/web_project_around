export function deleteCard(cardElement) {
    if (cardElement) {
        cardElement.remove();
    }
}

export function likeCard(cardElement, isLiked) {
    if (isLiked) {
        cardElement.querySelector('.elements__like-button-img').src = '../images/like-button_full.svg';
    } else {
        cardElement.querySelector('.elements__like-button-img').src = '../images/like-button.svg';
    }
}