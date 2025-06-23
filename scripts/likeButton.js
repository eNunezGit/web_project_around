export function likeCard(e) {
    const likeButton = e.target.closest('.elements__like-button-img');
    if (likeButton.src.includes('like-button.svg')) {
        likeButton.src = '../images/like-button_full.svg';
    } else if (likeButton.src.includes('like-button_full.svg')) {
        likeButton.src = '../images/like-button.svg';
    }
}