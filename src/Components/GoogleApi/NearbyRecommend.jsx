import { useEffect, useState } from "react"

const NearbyRecommend = ({places,selectedLocation}) => {
    const [distance, setDistance] = useState([])

    useEffect(()=>{
        if(places.length > 0 && selectedLocation){
            const service = new window.google.maps.DistanceMatrixService()
            const destinations = places.map(place => ({
                name : place.name,
                address: place.vicinity,
                location: new window.google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng())
            }))

            service.getDistanceMatrix(
                {
                    origins:[new window.google.maps.LatLng(selectedLocation.lat,selectedLocation.lng)],
                    destinations: destinations.map(des => des.location),
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (response, status) => {
                    if(status === window.google.maps.DistanceMatrixStatus.OK){
                        const distanceResult = response.rows[0].elements.map((element, index) => ({
                            ...destinations[index],
                            distance: element.distance.text,
                            duration: element.duration.text
                        }))
                        setDistance(distanceResult)
                    }
                }
            )
        }
    },[places,selectedLocation])
    
    if (!distance || distance.length === 0) {
        return <div>No nearby places found</div>
    }

    return(
        <div>
            <h2 className="text-lg font-bold my-2 border-b-2">Nearby Recommend : </h2>
            <ul>
                {distance.map((place, index) => (
                    <li key={index} className="mb-4">
                        <p className="font-bold text-base">{place.name}</p>
                        <p className="text-sm">Distance: {place.distance}</p>
                        <p className="text-sm">Duration: {place.duration}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default NearbyRecommend