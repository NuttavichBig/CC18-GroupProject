import React, { useEffect, useRef, useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places']
const SearchLocation = ({ onSelectLocation }) => {
    const inputRef = useRef(null);
    const [google, setGoogle] = useState(null);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    useEffect(() => {
        if (isLoaded) {
            setGoogle(window.google)
        } else if (loadError) {
            console.error('Google Maps Load Error:', loadError);
        }
    }, [isLoaded, loadError]);

    useEffect(() => {
        if (inputRef.current && google) {
            const autocomplete = new google.maps.places.Autocomplete(inputRef.current);

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (place.geometry) {
                    const location = {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                        name: place.name,
                        address: place.formatted_address,
                    };
                    onSelectLocation(location);
                }
            });
        }
    }, [google, onSelectLocation]);

    if (!isLoaded) {
        return <div>Loading Google Maps...</div>;
    }

        return (
        <div>
            <input
                type="text"
                ref={inputRef}
                placeholder="Search for a location..."
            />
        </div>
    );
};

export default SearchLocation;