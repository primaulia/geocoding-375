import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const buildMap = (markers) => {
  // this turn on the map
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/pdunleav/cjofefl7u3j3e2sp0ylex3cyb'
  });

  // this add the markers to the Map created above
  markers.forEach((marker) => {
    const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);

    new mapboxgl.Marker()
      .setLngLat([ marker.lng, marker.lat ]) // set the marker position
      .setPopup(popup) // set the popup
      .addTo(map);
  });

  return map
}

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();

  // for every markers, will extend the boundary
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));

  // ask the map to fit within the boundary
  map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 3000 });
};

const initMapbox = () => {
  const mapElement = document.getElementById('map');

  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const markers = JSON.parse(mapElement.dataset.markers);
    const builtMapWithMarkers = buildMap(markers);

    fitMapToMarkers(builtMapWithMarkers, markers);
    // adding the search box within your map
    builtMapWithMarkers.addControl(
      new MapboxGeocoder({ 
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl 
      })
    );
  }
};

export { initMapbox };