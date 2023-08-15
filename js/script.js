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

$(".reviews-switcher__link").click(e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-open");
    const  itemToShow = findBlockByAlias(target);
    const curItem = $this.closest(".reviews-switcher__item");

    itemToShow.addClass("active").siblings().removeClass("active");
    curItem.addClass("active").siblings().removeClass("active");
});


////
const openItem = item => {
    const container = item.closest(".team__item");
    const contentBlock = container.find(".team__description");
    const textBlock = contentBlock.find(".team__content");
    const reqHeight = textBlock.height();

    container.addClass("active");
    contentBlock.height(reqHeight);
}

const closeEveryItem = container => {
    const items = container.find('.team__description');
    const itemContainer = container.find(".team__item");

    itemContainer.removeClass("active");
    items.height(0);
}

$('.team__title').click(e => {
    const $this = $(e.currentTarget);
    const container = $this.closest('.team__list');
    const elemContainer = $this.closest(".team__item");

    if (elemContainer.hasClass("active")) {
        closeEveryItem(container);
    } else {
        closeEveryItem(container);
        openItem($this);
    }
});

/////
$(".slider__all").bxSlider({
    pager: false
});

/*const slider = document.querySelector(".slider__all");
const buttons = document.querySelectorAll(".slider__btn");
const items = document.querySelectorAll(".slider__item");*/
