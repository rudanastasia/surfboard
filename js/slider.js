//////
////// Работа слайдера
//////
$('.slider__all').bxSlider({
  pager: false,
  touchEnabled: false,
});

$('.slider__btn a').on('click', function (e) {
  e.preventDefault();

  const target = document.querySelector(this.getAttribute('href'));

  if (target) {
    target.scrollIntoView();
  }
});
