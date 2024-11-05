import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import NearbyRecommend from '../GoogleApi/NearbyRecommend';

const libraries = ['places'];

function HotelDetailMap() {
    const [location, setLocation] = useState({ lat: null, lng: null }); 
    const [nearbyPlaces, setNearbyPlaces] = useState([]);
    const [error, setError] = useState(null);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    });

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const res = await axios.get('http://localhost:8000/hotel/9');
                setLocation(res.data);
            } catch (error) {
                setError('Error fetching location');
                console.log('Error fetching location:', error);
            }
        };
        fetchLocation();
    }, []);

    useEffect(() => {
        if (isLoaded && location.lat && location.lng) {
            const service = new window.google.maps.places.PlacesService(document.createElement('div'));
            const request = {
                location: new window.google.maps.LatLng(location.lat, location.lng),
                radius: 500,
                keyword: ['restaurant', 'cafe', 'shopping_mall'],
            };

            service.nearbySearch(request, (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    setNearbyPlaces(results);
                } else {
                    setError('Error fetching nearby places');
                    console.log('Error fetching nearby places:', status);
                }
            });
        }
    }, [isLoaded, location.lat, location.lng]);

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="bg-white rounded-lg p-4 shadow-md h-[550px] overflow-hidden overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Location</h3>

            <div className="bg-gray-200 h-64 w-full flex items-center justify-center rounded-lg overflow-hidden">
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={location.lat && location.lng ? { lat: location.lat, lng: location.lng } : { lat: 0, lng: 0 }} // ตรวจสอบให้แน่ใจว่า center ไม่ใช่ null
                    zoom={15}
                >
                    {location.lat && location.lng && (
                        <Marker position={{ lat: location.lat, lng: location.lng }} />
                    )}

                    {nearbyPlaces.map((place, index) => (
                        <Marker
                            key={index}
                            position={{
                                lat: place.geometry.location.lat(),
                                lng: place.geometry.location.lng(),
                            }}
                            icon={{
                                url: 'https://www.svgrepo.com/show/375902/star.svg',
                                scaledSize: new window.google.maps.Size(30, 30),
                            }}
                        />
                    ))}
                </GoogleMap>
            </div>

            <NearbyRecommend places={nearbyPlaces} selectedLocation={location} />
        </div>
    );
}

export default HotelDetailMap;
