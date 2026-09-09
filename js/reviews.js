//////
/////// Переключение отзывов
//////
const findBlockByAlias = (alias) => {
  return $('.reviews__item').filter((ndx, item) => {
    return $(item).attr('data-linked-with') == alias;
  });
};

$('.reviews-switcher__link').click((e) => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr('data-open');
  const itemToShow = findBlockByAlias(target);
  const curItem = $this.closest('.reviews-switcher__item');

  itemToShow.addClass('active').siblings().removeClass('active');
  curItem
    .addClass('reviews-switcher__item--active')
    .siblings()
    .removeClass('reviews-switcher__item--active');
});
