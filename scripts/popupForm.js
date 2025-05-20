const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');
const submitButton = document.querySelector('.popup__submit-button');
const nameInput = document.querySelector('#profile-name-input');
const infoInput = document.querySelector('#profile-info-input');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');

function hidePopup() {
    popup.style.display = 'none';
}

closeButton.addEventListener('click', hidePopup);

submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    nameInput.placeholder = nameInput.value;
    infoInput.placeholder = infoInput.value;
    profileName.textContent = nameInput.value;
    profileInfo.textContent = infoInput.value;

    hidePopup();
});