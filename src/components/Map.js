import {GoogleMap, Marker} from '@react-google-maps/api';
import { useCallback, useRef } from 'react';
import mapIcon from '../img/icons/mapMarker.svg';

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};
const option = {
  disableDefaultUI: true,
  zoomControl: true
};

const marker = {
  lat: 23,
  lng: 77
}
const center = {
  lat: 23,
  lng: 77
}

export default function Map () {

  const mapRef = useRef();
  const onMapLoad = useCallback(map => {
    mapRef.current = map;
  }, []);
 
  return (

    <>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={8} 
        center={center} 
        options={option}
        onLoad={onMapLoad}
      >
        <Marker 
          position={{lat: marker.lat, lng: marker.lng}}
          icon={{
            url: mapIcon,
            scaledSize: new window.google.maps.Size(90, 90),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15)
          }}
        />
      </GoogleMap>
    </>

  );
}