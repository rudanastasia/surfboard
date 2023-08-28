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
/*const openButton = document.querySelector('.hamburger');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.modal__close');
const body = document.querySelector('body');

openButton.addEventListener('click', () => {
    modal.classList.add('modal')
    body.classList.add('body_closed')
})

closeButton.addEventListener('click', () => {
    modal.classList.remove('modal')
    body.classList.remove('body_closed')
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

    /*$.fancybox.open({
        src: "#modale",
        type: "inline"
    })*/
});

/*$(".app-submit-btn").click(e => {
    e.preventDefault();

    $.fancybox.close();
})*/

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


///////map
let myMap;
const init = () => {
 myMap = new ymaps.Map("map", {
   center: [59.93916998692174, 30.309015096732622],
   zoom: 11,
   controls: [],
 });
 
 let coords = [
     [59.94554327989287, 30.38935262114668],
     [59.91142323563909, 30.50024587065841],
     [59.88693161784606, 30.319658102103713],
     [59.97033574821672, 30.315194906302924],
   ],
   myCollection = new ymaps.GeoObjectCollection({}, {
     draggable: false,
     iconLayout: 'default#image',
     iconImageHref: 'https://rudanastasia.github.io/surfboard/img/icons/marker.png',
     iconImageSize: [46, 57],
     iconImageOffset: [-35, -52]
   });
 
 for (let i = 0; i < coords.length; i++) {
   myCollection.add(new ymaps.Placemark(coords[i]));
 }
 
 myMap.geoObjects.add(myCollection);
 
 myMap.behaviors.disable('scrollZoom');
};
 
ymaps.ready(init);


////mobile-menu
const burger = $('.hamburger');
const closeButton = $('.modal__close');

burger.on('click', (e) => {
    e.preventDefault()
    $('.modal').show()
 });

 closeButton.on('click', (e) => {
    e.preventDefault()
    $('.modal').hide()
 });

///////video
let player;
const playerContainer = $(".player");
 
let eventsInit = () => {
 $(".player__start").click(e => {
   e.preventDefault();
 
   if (playerContainer.hasClass("paused")) {
     player.pauseVideo();
   } else {
     player.playVideo();
   }
 });
 
 $(".player__playback").click(e => {
   const bar = $(e.currentTarget);
   const clickedPosition = e.originalEvent.layerX;
   const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
   const newPlaybackPositionSec =
     (player.getDuration() / 100) * newButtonPositionPercent;
 
   $(".player__playback-button").css({
     left: `${newButtonPositionPercent}%`
   });
 
   player.seekTo(newPlaybackPositionSec);
 });
 
 $(".player__splash").click(e => {
   player.playVideo();
 })
};
 
const formatTime = timeSec => {
 const roundTime = Math.round(timeSec);
 
 const minutes = addZero(Math.floor(roundTime / 60));
 const seconds = addZero(roundTime - minutes * 60);
 
 function addZero(num) {
   return num < 10 ? `0${num}` : num;
 }
 
 return `${minutes} : ${seconds}`;
};
 
const onPlayerReady = () => {
 let interval;
 const durationSec = player.getDuration();
 
 $(".player__duration-estimate").text(formatTime(durationSec));
 
 if (typeof interval !== "undefined") {
   clearInterval(interval);
 }
 
 interval = setInterval(() => {
   const completedSec = player.getCurrentTime();
   const completedPercent = (completedSec / durationSec) * 100;
 
   $(".player__playback-button").css({
     left: `${completedPercent}%`
   });
 
   $(".player__duration-completed").text(formatTime(completedSec));
 }, 1000);
};
 
const onPlayerStateChange = event => {
 /*
   -1 (воспроизведение видео не начато)
   0 (воспроизведение видео завершено)
   1 (воспроизведение)
   2 (пауза)
   3 (буферизация)
   5 (видео подают реплики).
 */
 switch (event.data) {
   case 1:
     playerContainer.addClass("active");
     playerContainer.addClass("paused");
     break;
 
   case 2:
     playerContainer.removeClass("active");
     playerContainer.removeClass("paused");
     break;
 }
};
 
function onYouTubeIframeAPIReady() {
 player = new YT.Player("yt-player", {
   height: "400px",
   width: "100%",
   videoId: "LXb3EKWsInQ",
   events: {
     onReady: onPlayerReady,
     onStateChange: onPlayerStateChange
   },
   playerVars: {
     controls: 0,
     disablekb: 0,
     showinfo: 0,
     rel: 0,
     autoplay: 0,
     modestbranding: 0
   }
 });
}
 
eventsInit();


//////
var modal = document.getElementById('myModal');


var btn = document.getElementById("myBtn");


var span = document.getElementsByClassName("btn");


btn.onclick = function() {
    modal.style.display = "block";
}


span.onclick = function() {
    e.preventDefault();
    modal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


/////param
/*const showParam = $('.slaider__param');
const closeParam = $('.modal__close');

showParam.on('click', (e) => {
    e.preventDefault()
    $('.param-long').show()
 });

 closeParam.on('click', (e) => {
    e.preventDefault()
    $('.modal').hide()
 });*/

 $(".slaider__param").click(function () {
    $(".param-long").toggleClass("hidden");
    });
