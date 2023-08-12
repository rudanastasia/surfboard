const openButton = document.querySelector('.open-modal');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.modal__close');

openButton.addEventListener('click', () => {
    modal.classList.add('modal_opened')
})

closeButton.addEventListener('click', () => {
    modal.classList.remove('modal_opened')
})