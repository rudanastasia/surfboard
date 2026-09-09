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

const createPlayer = () => {
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
      rel: 0,
      autoplay: 0,
      modestbranding: 0,
    },
  });
};

window.onYouTubeIframeAPIReady = createPlayer;

const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
document.head.appendChild(tag);

eventsInit();
