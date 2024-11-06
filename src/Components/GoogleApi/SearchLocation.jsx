import React, { memo, useEffect, useRef, useState } from 'react';

const SearchLocation = ({ onSelectLocation }) => {
    const inputRef = useRef(null);
    const [isScriptLoaded , setIsScriptLoaded] = useState(false)
    useEffect(()=>{
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&loading=async&libraries=places`;
        script.onload = () => setIsScriptLoaded(true);
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
          };
    },[])
    useEffect(() => {

        const initializeAutocomplete = () => {
            if (inputRef.current && window.google && window.google.maps.places) {
                const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);

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

                return autocomplete;
            }
        };

        let autocompleteInstance = null;

        const loadGoogleMaps = () => {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
            script.async = true;
            script.onload = () => {
                autocompleteInstance = initializeAutocomplete();
            };
            document.body.appendChild(script);
        };

        loadGoogleMaps();

        return () => {
            if (autocompleteInstance) {
                window.google.maps.event.clearInstanceListeners(autocompleteInstance);
            }
        };
    }, [onSelectLocation])
    return ( isScriptLoaded ? 
        <div>
            <input
                type="text"
                ref={inputRef}
                placeholder="Search for a location..."
            />
        </div>
        :
        <div>Loading...</div>
    );
};

export default SearchLocation;
