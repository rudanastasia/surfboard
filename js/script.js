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

//////
/////// Переключение отзывов jQuery-скрипт
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

//////
/////// Видеоплеер
//////
let player;
let playerInterval;
const playerContainer = $('.player');

const eventsInit = () => {
  $('.player__start').click((e) => {
    e.preventDefault();
    if (!player) return;

    if (playerContainer.hasClass('paused')) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });

  $('.player__playback').click((e) => {
    if (!player) return;

    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
    const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

    $('.player__playback-button').css({
      left: `${newButtonPositionPercent}%`,
    });
    $('.player__playback-progress').css({
      width: `${newButtonPositionPercent}%`,
    });

    player.seekTo(newPlaybackPositionSec);
  });

  $('.player__splash').click(() => {
    if (!player) return;
    player.playVideo();
  });

  let isMuted = false;

  $('.player__mute').click((e) => {
    e.preventDefault();
    if (!player) return;

    if (isMuted) {
      player.unMute();
    } else {
      player.mute();
    }

    isMuted = !isMuted;
  });

  $('.player__volume').click((e) => {
    if (!player) return;

    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newVolumePercent = (clickedPosition / bar.width()) * 100;

    $('.player__volume-button').css({
      left: `${newVolumePercent}%`,
    });
    $('.player__volume-progress').css({
      width: `${newVolumePercent}%`,
    });

    player.setVolume(newVolumePercent);
  });
};

const onPlayerReady = () => {
  const durationSec = player.getDuration();
  const initialVolume = player.getVolume();

  $('.player__volume-button').css({ left: `${initialVolume}%` });
  $('.player__volume-progress').css({ width: `${initialVolume}%` });

  clearInterval(playerInterval);

  playerInterval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPercent = (completedSec / durationSec) * 100;

    $('.player__playback-button').css({
      left: `${completedPercent}%`,
    });
    $('.player__playback-progress').css({
      width: `${completedPercent}%`,
    });
  }, 1000);
};

const onPlayerStateChange = (event) => {
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
      playerContainer.addClass('active');
      playerContainer.addClass('paused');
      break;

    case 2:
      playerContainer.removeClass('active');
      playerContainer.removeClass('paused');
      break;
  }
};

// eslint-disable-next-line no-unused-vars -- вызывается глобально YouTube IFrame API
function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '400px',
    width: '100%',
    videoId: 'LXb3EKWsInQ',
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0,
    },
  });
}

eventsInit();

//////
////// Сообщение отправки формы
//////
const modal = document.getElementById('myModal');

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

$('.modal__action').click((e) => {
  e.preventDefault();
  modal.style.display = 'none';
});

//////
/////// Валидация и отправка формы
//////
const form = document.querySelector('.form');

IMask(form.elements.phone, {
  mask: '+{7} (000) 000-00-00',
});

IMask(form.elements.name, {
  mask: /^[a-zA-Zа-яА-ЯёЁ\s-]*$/,
});

const validateField = (field) => {
  if (!field.value.trim().length) {
    field.classList.add('form__input--error');
    return false;
  } else {
    field.classList.remove('form__input--error');
    return true;
  }
};

const validateForm = (data) => {
  let isValid = true;
  for (const key in data) {
    const element = data[key];
    const valid = validateField(element);

    if (!valid) {
      isValid = false;
    }
  }
  return isValid;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = {
    name: form.elements.name,
    phone: form.elements.phone,
    comment: form.elements.comment,
  };

  if (!validateForm(data)) {
    console.log('not send');
    return;
  }

  $.ajax({
    url: 'https://formspree.io/f/xojgoeee',
    method: 'post',
    dataType: 'json',
    headers: {
      Accept: 'application/json',
    },
    data: {
      name: data.name.value,
      phone: data.phone.value,
      comment: data.comment.value,
    },
  })
    .done(() => {
      modal.style.display = 'block';
      form.reset();
    })
    .fail(() => {
      console.log('send error');
    });
});

//////
/////// Карта Яндекс
//////
const officeCoords = [37.59095, 55.75216]; // Москва, ул. Новый Арбат, д.31/12 (долгота, широта)

async function initMap() {
  const mapElement = document.getElementById('map');
  if (!mapElement) return;

  await ymaps3.ready;

  const map = new ymaps3.YMap(mapElement, {
    location: {
      center: officeCoords,
      zoom: 16,
    },
  });

  map.addChild(new ymaps3.YMapDefaultSchemeLayer());
  map.addChild(new ymaps3.YMapDefaultFeaturesLayer());

  const markerElement = document.createElement('div');
  markerElement.className = 'map-marker';
  markerElement.innerHTML = `
    <img src="img/icons/markup.svg" alt="Метка">
  `;

  map.addChild(
    new ymaps3.YMapMarker(
      {
        coordinates: officeCoords,
      },
      markerElement,
    ),
  );
}

initMap();

//////
////// fixed-menu активный пункт
//////
const fixedMenuItems = document.querySelectorAll('.fixed-menu__item');

fixedMenuItems.forEach((item) => {
  const link = item.querySelector('.fixed-menu__link');

  link.addEventListener('click', () => {
    fixedMenuItems.forEach((menuItem) => menuItem.classList.remove('fixed-menu__item--active'));
    item.classList.add('fixed-menu__item--active');
  });
});

//////
////// fixed-menu переключение цветовых схем
//////
const fixedMenu = document.querySelector('.fixed-menu');
const menuSections = document.querySelectorAll('section[id]');

if (fixedMenu && menuSections.length) {
  const fixedMenuObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fixedMenu.classList.toggle('fixed-menu--dark', entry.target.dataset.bg === 'light');
        }
      });
    },
    { rootMargin: '-23% 0px -76% 0px', threshold: 0 },
  );

  menuSections.forEach((section) => fixedMenuObserver.observe(section));
}

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
