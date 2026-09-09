//////
/////// Переключение элементов в Меню
//////
const lines = document.querySelectorAll('.products-menu__item');

for (let index = 0; index < lines.length; index++) {
  const element = lines[index];
  element.addEventListener('click', (e) => {
    if (e.target.classList.contains('products-menu__content-text')) return;
    e.preventDefault();
    for (let i = 0; i < lines.length; i++) {
      if (lines[i] !== element) {
        lines[i].classList.remove('products-menu__item--active');
      }
    }
    element.classList.toggle('products-menu__item--active');
  });
}
