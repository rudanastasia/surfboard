//////
/////// Переключение между участниками команды
//////
$('.team__title').click((e) => {
  const $this = $(e.currentTarget);
  const container = $this.closest('.team__list');
  const elemContainer = $this.closest('.team__item');
  const wasActive = elemContainer.hasClass('active');

  container.find('.team__item').removeClass('active');

  if (!wasActive) {
    elemContainer.addClass('active');
  }
});
