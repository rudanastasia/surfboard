const openButton = document.querySelector('.open-modal');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.modal__close');

openButton.addEventListener('click', () => {
    modal.classList.add('modal_opened')
})

closeButton.addEventListener('click', () => {
    modal.classList.remove('modal_opened')
})



////
const findBlockByAlias = alias => {
    return $(".reviews__item").filter((ndx, item) => {
        return $(item).attr("data-linked-with") == alias
    });
};

$(".interactive-avatar__link").click(e => {
    e.preventDefault ();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-open");
    const  itemToShow = findBlockByAlias(target);
    const curItem = $this.closest(".reviews__switcher-item interactive-avatar");

    itemToShow.addClass("active").siblings().removeClass("active");
    curItem.addClass("active").siblings().removeClass("active");
});
