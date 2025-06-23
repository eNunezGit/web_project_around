export function deleteCard(e) {
    const card = e.target.closest('.elements__card');
    if (card) {
        card.remove();
    }
}