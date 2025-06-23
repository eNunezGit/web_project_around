const saveButton = document.querySelector('#saveSettingsButton');
const popupForm = document.querySelector('#editProfileForm');
const Input1 = popupForm.querySelector('#input1');
const Input2 = popupForm.querySelector('#input2');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');


import { hidePopup } from './closeButton.js';

saveButton.addEventListener('click', hidePopup);
saveButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    Input1.placeholder = Input1.value;
    Input2.placeholder = Input2.value;
    profileName.textContent = Input1.value;
    profileInfo.textContent = Input2.value;
});