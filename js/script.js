//////////////////////////////////////////////////////////// reviews
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


///////////////////////////////////////////////// team
var openItem = (item) => {
    const container = item.closest(".team__item");
    const contentBlock = container.find(".team__description");
    const textBlock = contentBlock.find(".team__content");
    const reqHeight = textBlock.height();

    container.addClass("active");
    contentBlock.height(reqHeight);
};

const closeEveryItem = container => {
    const items = container.find('.team__description');
    const itemContainer = container.find(".team__item");

    itemContainer.removeClass("active");
    items.height(0);
};

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

/////////////////////////////////////////////slider
$(".slider__all").bxSlider({
    pager: false
});

/////////////////////////////////// form validation
const form = document.querySelector('.form');

const validateField = (field) => {
    if (!field.value.trim().length) {
        field.classList.add('input-error')
        return false
    } else {
        field.classList.remove('input-error')
        return true
    }
};

const validateForm = (data) => {
    let isValid = true
    for (const key in data) {
        const element = data[key];
        const valid = validateField(element)

        if (!valid) {
            isValid = false
        }
    }
    return isValid
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
        name: form.elements.name,
        phone: form.elements.phone,
        comment: form.elements.comment,
    }

    if (validateForm(data)) {
        console.log('send')
    } else {
        console.log('not send')
    }
});


///modal
/*const openButton = document.querySelector('submit');
const modal = document.querySelector('.modal');

openButton.addEventListener('click', () => {
    modal.classList.add('modal_opened')

})*/


///////////////////////////////modal window
$('.form').submit(e => {
    e.preventDefault();

    const form = $(e.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");

    $.ajax({
        url: "https://webdev-api.loftschool.com/sendmail",
        method: "post",
        data: {
            name: name.val(),
            phone: phone.val(),
            comment: comment.val(),
            to: to.val(),
        }
    });

    $.fancybox.open({
        src: "#modal",
        type: "inline"
    })
});

$(".app-submit-btn").click(e => {
    e.preventDefault();

    $.fancybox.close();
})

/////////////////////////////////products
/*const mesureWidth = item => {
    let reqItemWidth = 0;

    const screenWidth = $(window).width();
    const container = item.closest(".products-menu");
    const titlesBlocks = container.find(".products-menu__title");
    const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

    const textContainer = item.find(".products-menu__container");
    const paddingLeft = parseInt(textContainer.css("padding-left"));
    const paddingRight = parseInt(textContainer.css("padding-right"));

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
        reqItemWidth = screenWidth - titlesWidth;
    } else {
        reqItemWidth = 500;
    }

    return {
        container: reqItemWidth,
        textContainer: reqItemWidth - paddingRight - paddingLeft
    }
};

const closeEveryItemInContainer = container => {
    const items = container.find(".products-menu__item");
    const content = container.find(".product-menu__content");

    items.removeClass("active");
    content.width(0);
};

var openItem = (item) => {
    const hiddenContent = item.find(".products-menu__content");
    const reqWidth = mesureWidth(item);
    const textBlock = item.find(".products-menu__container");

    item.addClass("active");
    hiddenContent.width(reqWidth.container);
    textBlock.width(reqWidth.textContainer);
};

$(".products-menu__title").on("click", (e) => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const item = $this.closest(".products-menu__item");
    const itemOpened = item.hasClass("active");
    const container = $this.closest(".products-menu");

    if (itemOpened) {
        closeEveryItemInContainer(container)
    } else {
        closeEveryItemInContainer(container)
        openItem(item);
    }
});

$(".products-menu__close").on("click", e => {
    e.preventDefault();

    closeEveryItemInContainer($('products-menu'));
});*/


//////////////////////
/*const list = $('.products-menu');
list.on('click', '.products-menu__item', function (e) {
e.preventDefault()
if (e.target.classList.contains('products-menu__content-text')) return
$(this).siblings('products-menu__item').removeClass('products-menu__item_active')
$(this).toggleClass('products-menu__item_active')
})*/

const lines = document.querySelectorAll('.products-menu__item');

for (let index = 0; index < lines.length; index++) {
  const element = lines[index]
  element.addEventListener('click', (e) => {
    if(e.target.classList.contains('products-menu__content-text')) return
    e.preventDefault()
    for (let i = 0; i < lines.length; i++) {
      if(lines[i] !== element) {
        lines[i].classList.remove('products-menu__item_active')
      }
    }
    element.classList.toggle('products-menu__item_active')
  })
}
