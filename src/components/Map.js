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

export default function Map ({lat, lng}) {

  const mapRef = useRef();
  const onMapLoad = useCallback(map => {
    mapRef.current = map;
  }, []);

  // useEffect(() => console.log(typeof lat + " " + lng), []);
 
  return (

    <>
    <p>{lat}</p>
    <p>{lng}</p>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={8} 
        center={{lat: parseInt(lat), lng: parseInt(lng)}} 
        options={option}
        onLoad={onMapLoad}
      >
        <Marker 
          position={{lat: parseInt(lat), lng: parseInt(lng)}}
          // icon={{
          //   url: mapIcon,
          //   // scaledSize: new window.google.maps.Size(90, 90),
          //   origin: new window.google.maps.Point(0, 0),
          //   anchor: new window.google.maps.Point(15, 15)
          // }}
        />
      </GoogleMap>
    </>

  );
}