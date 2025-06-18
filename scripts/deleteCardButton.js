const deleteCardButton = document.querySelectorAll('.elements__delete-button');

function deleteCard(e) {
    console.log(e);
    console.log(e.target);
    const card = e.target.closest('.elements__card');
    if (card) {
        card.remove();
    }
}

deleteCardButton.forEach(button => {
    button.addEventListener('click', deleteCard);
});