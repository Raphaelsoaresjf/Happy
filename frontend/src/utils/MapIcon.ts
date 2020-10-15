
import mapMarkerImg from '../assets/map-mark.svg';
import L from 'leaflet';

const happyMapIcon = L.icon({
    iconUrl: mapMarkerImg,

    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [0, -60]
})

export default happyMapIcon;