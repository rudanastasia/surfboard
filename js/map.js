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
