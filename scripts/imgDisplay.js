export function imgDisplay(e) {
        const parent = e.target.parentElement;
        const imgPopup = parent.querySelector('#imgDisplay');
        imgPopup.style.display = 'block';
    }