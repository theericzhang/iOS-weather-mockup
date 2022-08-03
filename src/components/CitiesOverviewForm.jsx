import { React, useState, useContext } from "react"
import CircularProgress from '@mui/material/CircularProgress'

const {VITE_NAME_CITIES_NAME_KEY} = import.meta.env

export default function CitiesOverviewForm({ focusHandler, 
                                             blurHandler,
                                             isFocusedOnInput,
                                             setCitiesLatLng }) 
{
    const [searchQuery, setSearchQuery] = useState('')
    const [searchQueryLatLong, setSearchQueryLatLong] = useState({})
    const [isActivelySearching, setIsActivelySearching] = useState(false)

    // search by turning the ${searchQuery} 
    // into a pair of latitude/longitude coordinates. 

    // With these coordinates, render an instance of WeatherCard.js as the preview
    // before the user commits to adding it to the citiesLatLong array, which handles
    // the rendering of complete array of citiesList (WeatherCard components)

    async function grabCoordinates(searchQuery) {
        const res = await fetch(`http://api.positionstack.com/v1/forward?access_key=${VITE_NAME_CITIES_NAME_KEY}&query=${searchQuery}&limit=1`)
        const data = await res.json()
        if (data.data[0]?.latitude && data.data[0]?.longitude) {
            setSearchQueryLatLong(
                {
                       "latitude": data?.data[0]?.latitude,
                       "longitude": data?.data[0]?.longitude
                }
            )
            setIsActivelySearching(false)
            console.log(searchQueryLatLong)
            // add these coordinates to the array of coordinates (app.jsx setCitiesLatLong)
            // can I pass setCitiesLatLong as a function via context?

            setCitiesLatLng(prevCitiesLatLng => [...prevCitiesLatLng, 
                                                {
                                                    "lat": data?.data[0]?.latitude,
                                                    "long": data?.data[0]?.longitude
                                                }
                                                ]
            )
        } else {
            setIsActivelySearching(false)
            alert("City could not be found, please try again")
        }
    }

    function handleSearchQuerySubmit(e) {
        e?.preventDefault()
        console.log(`You typed ${searchQuery}`)
        grabCoordinates(searchQuery)
        setIsActivelySearching(true)
    }

    return (
        <form action="" className="city-query" onSubmit={(e) => handleSearchQuerySubmit(e)}>
            <input type="text" 
                    className="cities-search-bar"
                    onFocus={focusHandler}
                    onBlur={blurHandler} 
                    placeholder="Search for a city" 
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
            />
            <div className="search-progress-wrapper">
                { isActivelySearching && <CircularProgress sx={{color: 'white'}} size={20} /> }
                <button className="search-button" 
                    disabled={(isFocusedOnInput || searchQuery !== '')? false: true}
                    type="submit"
                    id={searchQuery === '' ? "greyed-out-button" : "active-button"}
                >
                    Search
                </button>
            </div>
        </form>
    )
}