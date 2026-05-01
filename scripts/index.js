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

const imagePopup = new PopupWithImage('#imagePopup');
imagePopup.setEventListeners();

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
                    imagePopup.open(item.name, item.link);
                }
            })
            cardSection.addItem(card.setUpCard());
        }
    }, '.elements__grid');
    
    cardSection.renderer();
});

let formConfig = {
    fieldsetSelector: '.popup__form-fieldset',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__form-input-error',
    errorClass: 'popup__error-info_visible'
};

const editProfile = document.querySelector('#editProfile');
const editProfileButton = document.querySelector('#editSettingsButton');

const editProfileFormValidator = new FormValidation(formConfig, editProfile.querySelector('.popup__form'));
editProfileFormValidator.enableValidation();

const editProfilePopup = new PopupWithForm(
    `#${editProfile.id}`,
    (data) => {
        editProfilePopup.renderLoading(true, 'Guardando...');

        api.updateUserInfo({name: data.userName, about: data.userInfo})
        .then(() => {
            userInfo.setUserInfo({name: data.userName, about: data.userInfo});
            editProfilePopup.close();
        })
        .catch(err => {
            console.log(`
                User info update failed...
                Error: ${err.status} ${err.statusText}
                `);
        })
        .finally(() => {
            editProfilePopup.renderLoading(false, 'Guardar');
            editProfileFormValidator.resetValidation();
        });
    },
    () => editProfileFormValidator.resetValidation()
);
editProfilePopup.setEventListeners();

editProfileButton.addEventListener('click', () => {
    editProfilePopup.open();

    const nameInput = editProfile.querySelector('#user-name');
    const aboutInput = editProfile.querySelector('#user-info');
    const currentUserInfo = userInfo.getUserInfo();

    nameInput.placeholder = currentUserInfo.name;
    aboutInput.placeholder = currentUserInfo.about;
});



const addCard = document.querySelector('#addCard');
const addCardButton = document.querySelector('#addCardButton');

const addCardFormValidator = new FormValidation(formConfig, addCard.querySelector('.popup__form'));
addCardFormValidator.enableValidation();

const addCardPopup = new PopupWithForm(
    `#${addCard.id}`,
    (data) => {
        addCardPopup.renderLoading(true, 'Creando...');
        api.addCard({name: data.cardTitle, link: data.cardUrl})
        .then(() => {
            const newCard = new DefaultCard({
                cardTitle: data.cardTitle,
                cardImg: data.cardUrl,
                cardId: data._id,
                likeVal: data.isLiked,
                ownerId: data.ownerId,
                handleCardClick: () => {
                    imagePopup.open(data.name, data.link);
                }
            });
            document.querySelector('.elements__grid').prepend(newCard.setUpCard());
            addCardPopup.close();
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            addCardPopup.renderLoading(false, 'Crear');
            addCardFormValidator.resetValidation();
        });
    },
    () => addCardFormValidator.resetValidation()
);
addCardPopup.setEventListeners();

addCardButton.addEventListener('click', () => {
    addCardPopup.open();
});