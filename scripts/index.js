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

function imgDisplay(e) {
    const parent = e.target.parentElement;
    const imgPopup = parent.querySelector('#imgDisplay');
    imgPopup.style.display = 'block';
}

function hidePopup(e) {
    const targetPopup = e.target.closest('.popup');
    targetPopup.style.display = 'none';
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

export function addCardFunc(cardName, cardLink) {
    const cardGrid = document.querySelector('.elements__grid');
    const cardTemplate = cardGrid.querySelector('#cardTemplate');
    const cardElement = cardTemplate.content.cloneNode(true);

    cardElement.querySelector('.elements__img').addEventListener('click', imgDisplay);
    cardElement.querySelector('.popup__close-button').addEventListener('click', hidePopup);
    cardElement.querySelector('.elements__delete-button').addEventListener('click', deleteCard);
    cardElement.querySelector('.elements__like-button').addEventListener('click', likeCard);

    cardElement.querySelector('.elements__img').src = cardLink;
    cardElement.querySelector('.elements__img').alt = cardName;
    cardElement.querySelector('.elements__title').textContent = cardName;

    cardElement.querySelector('.popup__img').src = cardLink;
    cardElement.querySelector('.popup__img').alt = cardName;
    cardElement.querySelector('.popup__img-title').textContent = cardName;


    cardGrid.appendChild(cardElement);
}

initialCards.forEach(card => addCardFunc(card.name, card.link));

const editProfileForm = document.querySelector('#editProfileForm');
const saveSettingsButton = editProfileForm.querySelector('#saveSettingsButton');
const editButton = document.querySelector('#editSettingsButton');

editProfileForm.querySelector('.popup__close-button').addEventListener('click', hidePopup);

editButton.addEventListener('click', () => {
    editProfileForm.style.display = 'block';
});

saveSettingsButton.addEventListener('click', hidePopup);
saveSettingsButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    const Input1 = editProfileForm.querySelector('#input1');
    const Input2 = editProfileForm.querySelector('#input2');
    const profileName = document.querySelector('.profile__name');
    const profileInfo = document.querySelector('.profile__info');
    
    Input1.placeholder = Input1.value;
    Input2.placeholder = Input2.value;
    profileName.textContent = Input1.value;
    profileInfo.textContent = Input2.value;
});

const addCardForm = document.querySelector('#addCardForm');
const createCardButton = addCardForm.querySelector('#createCardButton');
const addCardButton = document.querySelector('#addCardButton');

addCardForm.querySelector('.popup__close-button').addEventListener('click', hidePopup);

addCardButton.addEventListener('click', () => {
    addCardForm.style.display = 'block';
});

createCardButton.addEventListener('click', hidePopup);
createCardButton.addEventListener('click', (event) => {
    event.preventDefault();

    const Input1 = addCardForm.querySelector('#input1');
    const Input2 = addCardForm.querySelector('#input2');

    addCardFunc(Input1.value, Input2.value);
});