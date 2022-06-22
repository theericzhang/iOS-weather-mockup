import React from "react"
import CitiesOverviewTile from "./CitiesOverviewTile"
import { nanoid } from "nanoid"
import { useSpring, animated, easings } from "react-spring"

export default function CitiesOverview({ citiesOverviewData, cityName }) {
    const animation = useSpring({ 
        to: { opacity: 1 }, 
        from: { opacity: 0 },
        config: { 
            easing: easings.easeInOutCirc,
            duration: 20
        }
    })

    const citiesOverviewTiles = citiesOverviewData.map((tile, index) => {
        return <CitiesOverviewTile comment={tile.comment}
                                   currenttemp={tile.currenttemp}
                                   todayTempHigh={tile.todayTempHigh}
                                   todayTempLow={tile.todayTempLow}
                                   cityName={cityName[index]}
                                   key={nanoid()}
                />
    })

    function focusHandler(e) {
        console.log(e);
        // set styles. namely opacity of weather-header and weather-tiles-wrapper to 0.25
    }

    function blurHandler(e) {
        console.log(e);
        // set styles. namely opacity of weather-header and weather-tiles-wrapper to 1
    }

    return (
        <animated.div className="cities-wrapper" style={animation}>
            <form action="" className="city-query">
                <input type="text" 
                       className="cities-search-bar"
                       onFocus={(e) => focusHandler(e)}
                       onBlur={(e) => blurHandler(e)} 
                       placeholder="Search for a city" />
                <button className="search-button">Search</button>
            </form>
            <h2 className="weather-header">Weather</h2>
            <div className="weather-tiles-wrapper">
                {citiesOverviewTiles}
            </div>
        </animated.div>
    )
}
