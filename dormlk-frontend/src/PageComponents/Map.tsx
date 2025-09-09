import React, { useEffect, useState } from 'react';
// import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const Map: React.FC<{ location: any }> = ({ location }) => {
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  // });

  // const [center, setCenter] = useState({ lat: -3.745, lng: -38.523 });
  // const [markerPosition, setMarkerPosition] = useState<null | { lat: number; lng: number }>(null);

  // useEffect(() => {
  //   const fetchPlaceDetails = async () => {
  //       if (location && location.value && location.value.place_id) {
  //         const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
  //         const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${location.value.place_id}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
  //         const url = `${corsAnywhereUrl}${apiUrl}`;
      
  //         try {
  //           const response = await fetch(url);
  //           const data = await response.json();
      
  //           if (response.ok) {
  //             if (data.result && data.result.geometry) {
  //               const lat = data.result.geometry.location.lat;
  //               const lng = data.result.geometry.location.lng;
  //               setCenter({ lat, lng });
  //               setMarkerPosition({ lat, lng });
  //             } else {
  //               console.error("Invalid response from Google Places API:", data);
  //             }
  //           } else {
  //             console.error("Error fetching place details:", response.status);
  //           }
  //         } catch (error) {
  //           console.error("Error fetching place details:", error);
  //         }
  //       }
  //     };
      

  //   fetchPlaceDetails();
  // }, [location]);

  // if (loadError) return <div>Error loading maps</div>;
  // if (!isLoaded) return <div>Loading Maps</div>;

  return (
    // <GoogleMap
    //   mapContainerStyle={mapContainerStyle}
    //   zoom={10}
    //   center={center}
    // >
    //   {markerPosition && <Marker position={markerPosition} />}
    // </GoogleMap>

    <div>map</div>
  );
};

export default Map;
