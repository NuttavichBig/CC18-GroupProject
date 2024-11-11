import React, { useEffect, useRef, useState } from "react";
import useGoogleMapsStore, { useLoadGoogleMaps } from "../../stores/googleMap-store"
const AddressMap = ({ lat, lng, onLocationChange }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState({
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  });
  const { isLoaded, loadError } = useLoadGoogleMaps();
  const google = useGoogleMapsStore((state) => state.google);

  const fetchAddress = async (lat, lng) => {
    const geocoder = new google.maps.Geocoder();
    const response = await geocoder.geocode({ location: { lat, lng } });
    if (response.results[0]) {
      return response.results[0].formatted_address;
    }
    return "Unknown location";
  };

  useEffect(() => {
    if (isLoaded && google && mapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: parseFloat(lat), lng: parseFloat(lng) },
        zoom: 15,
      });

      markerRef.current = new google.maps.Marker({
        position: { lat: parseFloat(lat), lng: parseFloat(lng) },
        map,
        draggable: true,
      });

      markerRef.current.addListener("dragend", async () => {
        const newPosition = markerRef.current.getPosition();
        const newLat = newPosition.lat();
        const newLng = newPosition.lng();

        const newAddress = await fetchAddress(newLat, newLng);
        setCurrentLocation({ lat: newLat, lng: newLng });
        onLocationChange({ lat: newLat, lng: newLng, address: newAddress });
      });

      map.addListener("click", async (e) => {
        const clickedLat = e.latLng.lat();
        const clickedLng = e.latLng.lng();

        markerRef.current.setPosition({ lat: clickedLat, lng: clickedLng });

        const clickedAddress = await fetchAddress(clickedLat, clickedLng);
        setCurrentLocation({ lat: clickedLat, lng: clickedLng });
        onLocationChange({ lat: clickedLat, lng: clickedLng, address: clickedAddress });
      });
    }
  }, [isLoaded, google,lat, lng]);

  useEffect(() => {
    if (markerRef.current) {
      const newLat = parseFloat(lat);
      const newLng = parseFloat(lng);

      if (!isNaN(newLat) && !isNaN(newLng)) {
        markerRef.current.setPosition({ lat: newLat, lng: newLng });
      }
    }
  }, [lat, lng]);

  if (loadError) return <div>Error loading map: {loadError.message}</div>;
  if (!isLoaded) return <div>Loading Map...</div>;

  return <div ref={mapRef} style={{ width: "830px", height: "400px" }} />;
};

export default AddressMap;
