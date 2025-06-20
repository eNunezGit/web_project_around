const closeButtons = document.querySelectorAll('.popup__close-button');

export function hidePopup(e) {
        const targetPopup = e.target.closest('.popup');
        targetPopup.style.display = 'none';
}

closeButtons.forEach(button => button.addEventListener('click', hidePopup));