import { React, useState } from "react"
import CitiesOverviewTile from "./CitiesOverviewTile"
import { nanoid } from "nanoid"
import { useSpring, animated, easings, useTransition, config } from "react-spring"
import CitiesOverviewForm from "./CitiesOverviewForm"

export default function CitiesOverview({ citiesOverviewData, 
                                         cityName, 
                                         setCitiesLatLng,
                                         isCitiesVisible,
                                         setIsCitiesVisible }) 
{

    const citiesOverviewTransition = useTransition(isCitiesVisible, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        delay: 20,
        expires: true,
        config: config.stiff,
        reverse: isCitiesVisible,
    })

    const citiesOverviewTiles = citiesOverviewData.map((tile, index) => {
        return <CitiesOverviewTile comment={tile.comment}
                                   currenttemp={tile.currenttemp}
                                   todayTempHigh={tile.todayTempHigh}
                                   todayTempLow={tile.todayTempLow}
                                   cityName={cityName[index]}
                                   setIsCitiesVisible={setIsCitiesVisible}
                                   key={nanoid()}
                />
    })

    const [isFocusedOnInput, setIsFocusedOnInput] = useState(false)

    function focusHandler() {
        setIsFocusedOnInput(true)
        // set styles. namely opacity of weather-header and weather-tiles-wrapper to 0.25
    }

    function blurHandler() {
        setIsFocusedOnInput(false)
        // set styles. namely opacity of weather-header and weather-tiles-wrapper to 1
    }


    return (
        citiesOverviewTransition((styles, item) => (
            item ? <animated.div className="cities-wrapper" style={styles}>
                        <CitiesOverviewForm focusHandler={focusHandler}
                                            blurHandler={blurHandler}
                                            isFocusedOnInput={isFocusedOnInput}
                                            setCitiesLatLng={setCitiesLatLng} 
                        />
                        <h2 className="weather-header" id={isFocusedOnInput ? "opacity-dark" : "opacity-light"}>Weather</h2>
                        <div className="weather-tiles-wrapper" id={isFocusedOnInput ? "opacity-dark" : "opacity-light"}>
                            {citiesOverviewTiles}
                        </div>
                    </animated.div>
                 : <animated.div style={styles}></animated.div>
        )) 
        
        
    )
}
