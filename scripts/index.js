import {Section} from "./Section.js";
import {DefaultCard} from "./DefaultCard.js";
import {PopupWithImage} from "./PopupWithImage.js";
import {FormValidation} from "./FormValidation.js";
import {PopupWithForm} from "./PopupWithForm.js";
import {UserInfo} from "./UserInfo.js";
import api from "./Api.js";



const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    aboutSelector: '.profile__info',
    avatarSelector: '.profile__avatar'
});

api.getInitialData()
.then(({user, initialCards}) => {
    userInfo.setUserInfo({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        userId: user._id
    });    
    
    const cardSection = new Section({
        items: initialCards,
        renderer: (item) => {
            const card = new DefaultCard({
                cardTitle: item.name,
                cardImg: item.link,
                cardId: item._id,
                likeVal: item.isLiked,
                ownerId: item.ownerId,
                handleCardClick: () => {
                    const cardPopup = new PopupWithImage(`#popup-${item._id}`);
                    cardPopup.open(item.name, item.link);
                    cardPopup.setEventListeners();
                }
            })
            cardSection.addItem(card.setUpCard());
        }
    }, '.elements__grid');
    
    cardSection.renderer();
});


const popupFormSetUp = (formPopupSelector, submitButtonSelector) => {
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



editButton.addEventListener('click', () => {
    popupFormSetUp(editProfileForm, saveSettingsButton);

    const formPopup = new PopupWithForm(
        `#${editProfileForm.id}`,
        (data) => {
            formPopup.renderLoading(true, 'Guardando...');

            api.updateUserInfo({name: data.userName, about: data.userInfo})
            .then(() => {
                userInfo.setUserInfo({name: data.userName, about: data.userInfo});
                formPopup.close();
            })
            .finally(() => {
                formPopup.renderLoading(false, 'Guardar');
            });
        }
    );

    formPopup.setEventListeners();
    formPopup.open();

    const nameInput = editProfileForm.querySelector('#user-name');
    const aboutInput = editProfileForm.querySelector('#user-info');
    const currentUserInfo = userInfo.getUserInfo();

    nameInput.placeholder = currentUserInfo.name;
    aboutInput.placeholder = currentUserInfo.about;
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