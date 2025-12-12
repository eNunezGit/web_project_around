import {Section} from "./Section.js";
import { DefaultCard } from "./Card.js";
import {PopupWithImage} from "./PopupWithImage.js";
import {FormValidation} from "./FormValidation.js";
import {PopupWithForm} from "./PopupWithForm.js";
import {UserInfo} from "./UserInfo.js";

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

const cardId = crypto.randomUUID();

const cardSection = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new DefaultCard(item.name, item.link, cardId, () => {
            const cardPopup = new PopupWithImage(`#${cardId}-popup`);
            cardPopup.open(item.name, item.link);
            cardPopup.setEventListeners();
        });
        cardSection.addItem(card.setUpCard());
    }
}, '.elements__grid');

cardSection.renderer();

const popupFormSetUp = (formPopupSelector, submitButtonSelector, submitLogic) => {
    const formPopup = new PopupWithForm(`#${formPopupSelector.id}`,
        (data) => {
            submitLogic(data);
        },
        () => {
            formValidation.resetValidation();
        });
        formPopup.setEventListeners();
        formPopup.open();
        
        const formSelector = formPopupSelector.querySelector('.popup__form');

        const formValidation = new FormValidation({
            fieldsetSelector: '.popup__form-fieldset',
            inputSelector: '.popup__form-input',
            submitButtonSelector: submitButtonSelector,
            inactiveButtonClass: 'popup__submit-button_disabled',
            inputErrorClass: 'popup__form-input-error',
            errorClass: 'popup__error-info_visible'
        }, formSelector);
        formValidation.enableValidation();
};


const editProfileForm = document.querySelector('#editProfileForm');
const saveSettingsButton = editProfileForm.querySelector('#saveSettingsButton');
const editButton = document.querySelector('#editSettingsButton');

const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    aboutSelector: '.profile__info'
});



editButton.addEventListener('click', () => {
    popupFormSetUp(editProfileForm, saveSettingsButton, (data) => {
        userInfo.setUserInfo({name: data.userName, about: data.userInfo});

        const nameInput = editProfileForm.querySelector('#user-name');
        const aboutInput = editProfileForm.querySelector('#user-info');
        const currentUserInfo = userInfo.getUserInfo();
        console.log(currentUserInfo);

        nameInput.placeholder = currentUserInfo.name;
        aboutInput.placeholder = currentUserInfo.about;
    });
});

const addCardForm = document.querySelector('#addCardForm');
const createCardButton = addCardForm.querySelector('#createCardButton');
const addCardButton = document.querySelector('#addCardButton');


addCardButton.addEventListener('click', () => {
    popupFormSetUp(addCardForm, createCardButton, (data) => {
        const newCard = new DefaultCard(data.cardTitle, data.cardUrl, cardId, () => {
            const cardPopup = new PopupWithImage(`#${cardId}-popup`);
            cardPopup.open(data.cardTitle, data.cardUrl);
            cardPopup.setEventListeners();
        });
        document.querySelector('.elements__grid').prepend(newCard.setUpCard());
    });
});