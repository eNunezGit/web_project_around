import { enableValidation } from "./validation.js";
import { DefaultCard } from "./card.js";
import { popupHandler } from "./utils.js";

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

const popupFormSetUp = (formId, submitButtonId) => {
    formId.style.display = 'block';

    popupHandler(formId, submitButtonId);

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

const addCardForm = document.querySelector('#addCardForm');
const createCardButton = addCardForm.querySelector('#createCardButton');
const addCardButton = document.querySelector('#addCardButton');


addCardButton.addEventListener('click', () => {
    popupFormSetUp(addCardForm, createCardButton);
});

createCardButton.addEventListener('click', (event) => {
    event.preventDefault();

    const cardTitleInput = addCardForm.querySelector('#card-title');
    const cardImageInput = addCardForm.querySelector('#card-url');

    addCardFunc(cardTitleInput.value, cardImageInput.value);
});