const resetFormValidation = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__form-input"));
    const errorList = Array.from(formElement.querySelectorAll(".popup__error-info"));
    inputList.forEach((inputElement) => {
        inputElement.classList.remove("popup__form-input-error");
    });
    errorList.forEach((errorElement) => {
    errorElement.classList.remove("popup__error-info_visible");
    errorElement.textContent = "";
    });
}

function hidePopup(popup) {
    if (popup.style.display === 'block') {
        popup.style.display = 'none';
        if (popup.querySelector('.popup__form')) {
            popup.querySelector('.popup__form').reset();
            resetFormValidation(popup.querySelector('.popup__form'));
        }
    }
};

export function popupHandler(popup, submitButton = null) {
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            hidePopup(popup);
        }
    });
    popup.querySelector('.popup__close-button').addEventListener('click', () => hidePopup(popup));
    popup.querySelector('.popup__overlay').addEventListener('dblclick', () => hidePopup(popup));
    if (submitButton) {
        submitButton.addEventListener('click', () => {
            hidePopup(popup);
        });
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