import { enableValidation } from "./validation.js";
import { DefaultCard } from "./card.js";

const initialCards = [
    {
        name: "Valle de Yosemite",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
    },
    {
        name: "Lago Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
    },
    {
        name: "Montañas Calvas",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
    },
    {
        name: "Parque Nacional de la Vanoise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
    }
];


initialCards.forEach(card => {
    const newCard = new DefaultCard(card.name, card.link, '#cardTemplate');
    document.querySelector('.elements__grid').appendChild(newCard.setUpCard());
});

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

function hidePopup() {
    const targetPopup = document.querySelectorAll('.popup');
    targetPopup.forEach(popup => {
        if (window.getComputedStyle(popup).display === "block") {
            popup.style.display = 'none';
            popup.querySelector('.popup__form').reset();
            resetFormValidation(popup.querySelector('.popup__form'));
        }
    });
}

function imgDisplay(e) {
    const parent = e.target.parentElement;
    const imgPopup = parent.querySelector('#imgDisplay');
    imgPopup.style.display = 'block';
}

function deleteCard(e) {
    const card = e.target.closest('.elements__card');
    if (card) {
        card.remove();
    }
}

function likeCard(e) {
    const likeButton = e.target.closest('.elements__like-button-img');
    if (likeButton.src.includes('like-button.svg')) {
        likeButton.src = '../images/like-button_full.svg';
    } else if (likeButton.src.includes('like-button_full.svg')) {
        likeButton.src = '../images/like-button.svg';
    }
}

const popupFormSetUp = (formId, submitButtonId) => {
    formId.querySelector('.popup__close-button').addEventListener('click', hidePopup);
    

    formId.style.display = 'block';

    enableValidation({
    formSelector: formId,
    fieldsetSelector: ".popup__form-fieldset",
    inputSelector: ".popup__form-input",
    submitButtonSelector: submitButtonId,
    inactiveButtonClass: "popup__submit-button_disabled",
    inputErrorClass: "popup__form-input-error",
    errorClass: "popup__error-info_visible"
    });
}

document.onkeydown = (e) => {
    if (e.key === "Escape") {
        hidePopup(e);
    }
}

const editProfileForm = document.querySelector('#editProfileForm');
const saveSettingsButton = editProfileForm.querySelector('#saveSettingsButton');
const editButton = document.querySelector('#editSettingsButton');


editButton.addEventListener('click', () => {
    popupFormSetUp(editProfileForm, saveSettingsButton);
});

saveSettingsButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    const nameInput = editProfileForm.querySelector('#user-name');
    const infoInput = editProfileForm.querySelector('#user-info');
    const profileName = document.querySelector('.profile__name');
    const profileInfo = document.querySelector('.profile__info');

    infoInput.placeholder = infoInput.value;
    nameInput.placeholder = nameInput.value;
    profileName.textContent = nameInput.value;
    profileInfo.textContent = infoInput.value;
});
saveSettingsButton.addEventListener('click', hidePopup);

const addCardForm = document.querySelector('#addCardForm');
const createCardButton = addCardForm.querySelector('#createCardButton');
const addCardButton = document.querySelector('#addCardButton');

addCardForm.querySelector('.popup__close-button').addEventListener('click', hidePopup);

addCardButton.addEventListener('click', () => {
    popupFormSetUp(addCardForm, createCardButton);
});

createCardButton.addEventListener('click', hidePopup);
createCardButton.addEventListener('click', (event) => {
    event.preventDefault();

    const cardTitleInput = addCardForm.querySelector('#card-title');
    const cardImageInput = addCardForm.querySelector('#card-url');

    addCardFunc(cardTitleInput.value, cardImageInput.value);
});