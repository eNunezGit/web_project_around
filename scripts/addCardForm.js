const createCardButton = document.querySelector('#createCardButton');
const popupForm = document.querySelector('#addCardForm');
const Input1 = popupForm.querySelector('#input1');
const Input2 = popupForm.querySelector('#input2');

import { hidePopup } from './closeButton.js';

createCardButton.addEventListener('click', hidePopup);

import { addCardFunc } from './addCardFunc.js';

createCardButton.addEventListener('click', (event) => {
    event.preventDefault();

    if (Input1.value === '' || Input2.value === '') {
        alert('Por favor llene ambos campos: Título y enlace a la imagen.');
        return;
    } else {
        addCardFunc(Input1.value, Input2.value);
    }
});