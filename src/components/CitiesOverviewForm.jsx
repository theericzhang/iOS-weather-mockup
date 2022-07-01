import { React, useState } from "react"

const {VITE_NAME_CITIES_NAME_KEY} = import.meta.env

export default function CitiesOverviewForm({ focusHandler, 
                                             blurHandler,
                                             isFocusedOnInput }) 
{
    const [searchQuery, setSearchQuery] = useState('')
    const [searchQueryLatLong, setSearchQueryLatLong] = useState({})

    // search by turning the ${searchQuery} 
    // into a pair of latitude/longitude coordinates. 

    // With these coordinates, render an instance of WeatherCard.js as the preview
    // before the user commits to adding it to the citiesLatLong array, which handles
    // the rendering of complete array of citiesList (WeatherCard components)

    async function grabCoordinates(searchQuery) {
        const res = await fetch(`http://api.positionstack.com/v1/forward?access_key=${VITE_NAME_CITIES_NAME_KEY}&query=${searchQuery}`)
        const data = await res.json()
        setSearchQueryLatLong(
            {
                "latitude": data.data.latitude,
                "longitude": data.data.longitude
            }
        )
    }

    function handleSearchQuerySubmit(e) {
        e?.preventDefault()
        console.log(`You typed ${searchQuery}`)
        // grabCoordinates(searchQuery)
        // console.log(searchQueryLatLong)
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
            <button className="search-button" 
                    disabled={(isFocusedOnInput || searchQuery !== '')? false: true}
                    type="submit"
                    id={searchQuery === '' ? "greyed-out-button" : "active-button"}
            >
                Search
            </button>
        </form>
    )
}