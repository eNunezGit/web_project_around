export function popupHandler(popup, submitButton, functionToRun = hidePopup) {
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            functionToRun(popup);
        }
    });
    popup.querySelector('.popup__close-button').addEventListener('click', () => functionToRun(popup));
    popup.querySelector('.popup__overlay').addEventListener('dblclick', () => functionToRun(popup));
    if (submitButton) {
        submitButton.addEventListener('click', () => {
            functionToRun(popup);
        });
    }
};

export function hidePopup(popup) {
    if (popup.style.display === 'block') {
        popup.style.display = 'none';
    }
}; 

export function imgDisplay(e) {
    const parent = e.target.parentElement;
    const imgPopup = parent.querySelector('#imgDisplay');
    imgPopup.style.display = 'block';
}

export function deleteCard(e) {
    const card = e.target.closest('.elements__card');
    if (card) {
        card.remove();
    }
}

export function likeCard(e) {
    const likeButton = e.target.closest('.elements__like-button-img');
    if (likeButton.src.includes('like-button.svg')) {
        likeButton.src = '../images/like-button_full.svg';
    } else if (likeButton.src.includes('like-button_full.svg')) {
        likeButton.src = '../images/like-button.svg';
    }
}