const likeButton = document.querySelectorAll('.elements__like-button');

function likeCard(e) {
    console.log(e);
    console.log(e.target);
    const cardLike = e.target.closest('.elements__like-button-img');
    if (cardLike.src.includes('like-button.svg')) {
        cardLike.src = '../images/like-button_full.svg';
    } else if (cardLike.src.includes('like-button_full.svg')) {
        cardLike.src = '../images/like-button.svg';
    }
}


likeButton.forEach(button => {
    button.addEventListener('click', likeCard);
});