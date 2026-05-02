import {Section} from "./Section.js";
import {DefaultCard} from "./DefaultCard.js";
import {PopupWithImage} from "./PopupWithImage.js";
import {PopupWithConfirm} from "./PopupWithConfirm.js";
import {FormValidation} from "./FormValidation.js";
import {PopupWithForm} from "./PopupWithForm.js";
import {UserInfo} from "./UserInfo.js";
import {deleteCard, likeCard} from "./utils.js";
import api from "./Api.js";



const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    aboutSelector: '.profile__info',
    avatarSelector: '.profile__avatar'
});

const imagePopup = new PopupWithImage('#imagePopup');
imagePopup.setEventListeners();


const deleteConfirmPopup = new PopupWithConfirm('#deleteConfirmPopup');
deleteConfirmPopup.setEventListeners();

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
                },
                handleDeleteClick: () => {
                    deleteConfirmPopup.open();
                    deleteConfirmPopup.setSubmitAction(() => {
                        deleteConfirmPopup.renderLoading(true, 'Eliminando...');

                        api.deleteCard(item._id)
                        .then(() => {
                            deleteCard(document.getElementById(item._id));
                            deleteConfirmPopup.close();
                            deleteConfirmPopup.renderLoading(false, 'Sí');
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    });
                },
                handleLikeClick: () => {
                    if (!item.isLiked) {
                        api.likeCard(item._id)
                        .then(() => {
                            item.isLiked = true;
                            likeCard(document.getElementById(item._id), item.isLiked);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    } else {
                        api.dislikeCard(item._id)
                        .then(() => {
                            item.isLiked = false;
                            likeCard(document.getElementById(item._id), item.isLiked);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    }
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

const editAvatar = document.querySelector('#editAvatar');
const editAvatarButton = document.querySelector('#editAvatarButton');

const editAvatarFormValidator = new FormValidation(formConfig, editAvatar.querySelector('.popup__form'));
editAvatarFormValidator.enableValidation();

const editAvatarPopup = new PopupWithForm(
    `#${editAvatar.id}`,
    (data) => {
        editAvatarPopup.renderLoading(true, 'Guardando...');
        api.updateUserAvatar({avatar: data.avatarUrl})
        .then(() => {
            userInfo.setUserInfo({avatar: data.avatarUrl});
            editAvatarPopup.close();
        })
        .catch(err => {
            console.log(`
                Avatar update failed...
                Error: ${err.status} ${err.statusText}
            `);
        })
        .finally(() => {
            editAvatarPopup.renderLoading(false, 'Guardar');
            editAvatarFormValidator.resetValidation();
        });
    },
    () => editAvatarFormValidator.resetValidation()
);
editAvatarPopup.setEventListeners();

editAvatarButton.addEventListener('click', () => {
    editAvatarPopup.open();
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
        .then((cardData) => {
            const newCard = new DefaultCard({
                cardTitle: cardData.name,
                cardImg: cardData.link,
                cardId: cardData._id,
                likeVal: cardData.isLiked,
                ownerId: cardData.ownerId,
                handleCardClick: () => {
                    imagePopup.open(cardData.name, cardData.link);
                },
                handleDeleteClick: () => {
                    deleteConfirmPopup.open();
                    deleteConfirmPopup.setSubmitAction(() => {
                        deleteConfirmPopup.renderLoading(true, 'Eliminando...');

                        api.deleteCard(cardData._id)
                        .then(() => {
                            deleteCard(document.getElementById(cardData._id));
                            deleteConfirmPopup.close();
                            deleteConfirmPopup.renderLoading(false, 'Sí');
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    });
                },
                handleLikeClick: () => {
                    if (!cardData.isLiked) {
                        api.likeCard(cardData._id)
                        .then(() => {
                            cardData.isLiked = true;
                            likeCard(document.getElementById(cardData._id), cardData.isLiked);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    } else {
                        api.dislikeCard(cardData._id)
                        .then(() => {
                            cardData.isLiked = false;
                            likeCard(document.getElementById(cardData._id), cardData.isLiked);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    }
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