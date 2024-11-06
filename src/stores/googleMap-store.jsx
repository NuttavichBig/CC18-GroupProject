import { create } from 'zustand';
import { useJsApiLoader } from '@react-google-maps/api';
import { useEffect } from 'react';

const libraries = ['places'];

const useGoogleMapsStore = create((set) => ({
    isLoaded: false,
    loadError: null,
    google: null,
    setGoogleMapsStatus: ({ isLoaded, loadError, google }) => set({ isLoaded, loadError, google }),
}));

export const useLoadGoogleMaps = () => {
    const { isLoaded, loadError, setGoogleMapsStatus } = useGoogleMapsStore();

    const { isLoaded: apiIsLoaded, loadError: apiLoadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    useEffect(() => {
        if (apiIsLoaded) {
            console.log('Google Maps API Loaded');
            setGoogleMapsStatus({ isLoaded: true, loadError: null, google: window.google });
        } else if (apiLoadError) {
            console.error('Google Maps API Load Error:', apiLoadError);
            setGoogleMapsStatus({ isLoaded: false, loadError: apiLoadError, google: null });
        }
    }, [apiIsLoaded, apiLoadError, setGoogleMapsStatus]);

    return { isLoaded, loadError };
};

export default useGoogleMapsStore;
