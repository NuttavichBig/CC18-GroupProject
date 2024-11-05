import React, { useEffect, useState } from 'react';
// import HotelMapPic from '../../assets/hotel-map.webp';
import { GoogleMap,Marker,useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import NearbyRecommend from '../GoogleApi/NearbyRecommend';

const libraries = ['places']
function HotelDetailMap() {
    const [location, setLocation] = useState({})
    console.log('location:', location);
    const [nearbyPlaces, setNearbyPlaces] = useState([]);
    const [error, setError] = useState(null)

    const {isLoaded, loadError} = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    })

    useEffect(()=>{
        const fetchLocation = async () => {
            try {
                const res = await axios.get('http://localhost:8000/hotel/9')
                console.log('location detail:', res.data)
                setLocation(res.data)
            } catch (error) {
                setError('Error fetching location')
                console.log('Error fetching location:', error)
            }
        }
        fetchLocation()
    },[])

    useEffect(()=>{
        if (isLoaded && location && window.google && window.google.maps){
            const service = new window.google.maps.places.PlacesService(document.createElement('div'))
            const request = {
                location: new window.google.maps.LatLng(location.lat, location.lng),
                radius: 500,
                keyword:['restaurant','cafe','shopping_mall']
            }

            service.nearbySearch(request, (results, status) => {
                if(status === window.google.maps.places.PlacesServiceStatus.OK){
                    setNearbyPlaces(results)
                } else{
                    setError('Error fetching nearby places')
                    console.log('Error fetching nearby places:', status)
                }
            })
        }else if (!isLoaded){
            console.log('Loading Google Maps')
        }else if (!window.google || !window.google.maps){
            console.log('Google Maps not loaded')
        }
    },[isLoaded,location])

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="bg-white rounded-lg p-4 shadow-md h-[550px] overflow-hidden overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Location</h3>

            <div className="bg-gray-200 h-64 w-full flex items-center justify-center rounded-lg overflow-hidden">
                    <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={{lat:location.lat,lng:location.lng}}
                    zoom={15}
                    >
                        {/* Marker Hotel */}
                        {location.lat && location.lng && (
                            <Marker position={{lat:location.lat,lng:location.lng}}/>
                        )}

                        {/* Marker Nearby */}
                        {nearbyPlaces.map((place, index) => (
                        <Marker
                            key={index}
                            position={{
                                lat: place.geometry.location.lat(),
                                lng: place.geometry.location.lng()
                            }}
                            icon={{
                                url:'https://www.svgrepo.com/show/375902/star.svg',
                                scaledSize: new window.google.maps.Size(30, 30), 
                            }}
                        />
                    ))}
                    </GoogleMap>

            </div>

                    <div> <NearbyRecommend places={nearbyPlaces} selectedLocation={location}/> </div>

        </div>
    );
}

export default HotelDetailMap;
