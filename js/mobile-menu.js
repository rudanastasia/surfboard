//////
////// Мобильное меню
//////
const burger = $('.hamburger');
const closeButton = $('.burger-menu__close');

burger.on('click', (e) => {
  e.preventDefault();
  $('.burger-menu').show();
});

closeButton.on('click', (e) => {
  e.preventDefault();
  $('.burger-menu').hide();
});

$('.burger-menu__link').on('click', () => {
  $('.burger-menu').hide();
});
