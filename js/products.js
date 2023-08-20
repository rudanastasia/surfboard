const mesureWidth = () => {
    return 500;
}

const openItem = item => {
    const hiddenContent = item.find(".products-menu__content");
    const reqWidth = mesureWidth();

    hiddenContent.width(reqWidth);
}

$(".products-menu__title").on("click", e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const this = $this.closest(".products-menu__item");

    openItem(item);
});