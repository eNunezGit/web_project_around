const saveButton = document.querySelector('#save-settings-button');
const popupForm = document.querySelector('#editProfileForm');
const Input1 = popupForm.querySelector('#input1');
const Input2 = popupForm.querySelector('#input2');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');


import { hidePopup } from './closeButton.js';

saveButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    console.log(Input1);
    console.log(Input2);
    Input1.placeholder = Input1.value;
    Input2.placeholder = Input2.value;
    profileName.textContent = Input1.value;
    profileInfo.textContent = Input2.value;
});
saveButton.addEventListener('click', hidePopup);