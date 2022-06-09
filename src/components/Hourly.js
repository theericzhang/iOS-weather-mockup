import React from "react";
import HourlyTile from "./HourlyTile";
import { nanoid } from "nanoid";

export default function Hourly ({ currentComment, 
                                  hourlyForecastArray, 
                                  wmoCodesUrl, 
                                  todaysSunriseHour, 
                                  todaysSunsetHour, 
                                  todaysSunriseMinutes, 
                                  todaysSunsetMinutes, 
                                  todaysSunset, 
                                  todaysSunrise,
                                  tmrwsSunrise,                                  
                                  tmrwsSunset,
                                  tmrwsSunriseHour,
                                  tmrwsSunsetHour,
                                  tmrwsSunriseMinutes,
                                  tmrwsSunsetMinutes                                  
                                }) 
{
    // Map out every tile using the hourlyForecastArray containing
    // temperature, wmoCode, and timeISO
    // Using these props, render an HourlyTile for every data object
    // Since we want the first item in the hourly forecast 
    // to be "Now" instead of an hour, we manually inject
    // hour={"Now"} prop if the mapping index === 0

    const tiles = hourlyForecastArray.map((hour, index) => {
        if (index === 0) {
            return <HourlyTile hour={"Now"} 
                    temperature={hour.temperature}
                    wmocode={hour.weathercode}
                    key={nanoid()}
                    wmoCodeImageLink={wmoCodesUrl[hourlyForecastArray[index]?.weathercode]}
                    timeISO8601={hour.timeISO8601}
                    />
        } else {
            return <HourlyTile hour={hour.hour} 
                    temperature={hour.temperature}
                    wmocode={hour.weathercode} 
                    key={nanoid()}
                    wmoCodeImageLink={wmoCodesUrl[hourlyForecastArray[index]?.weathercode]}
                    timeISO8601={hour.timeISO8601}
            />
        }      
    })

    // Now, we want the sunset and sunrise to be displayed 
    // in this 24h hourly chart.
    // First, we need to understand that we need to pull in sunset/sunrise
    // values from the not only today, but also the next day
    //
    // e.g. If it's 19:00 at render, and sunset THAT NIGHT is at 20:00
    // you need to pull in sunrise values from the following morning.
    // Consider an edge case where it's 23:00. Sunrise next morning is
    // 08:00 and sunset on the same day is 20:00. 
    //
    // Thus, you need to pull in sunset & sunrise values for the current day and the next day
    // 
    // Implementation-wise, make a shallow copy of the mapped out tiles array we just made
    // Manually add the 4 sunset/sunrise values rendered as HourlyTile:
    // sunrise today, tomorrow
    // sunset today, tomorrow

    const tilesWithSunriseset = [
                                    ...tiles,
                                    <HourlyTile hour={todaysSunriseHour + ":" + todaysSunriseMinutes}
                                                temperature={"Sunrise"}
                                                key={nanoid()}
                                                wmoCodeImageLink={"sunrise"}
                                                timeISO8601={todaysSunrise}
                                    />, 
                                    <HourlyTile hour={todaysSunsetHour + ":" + todaysSunsetMinutes}
                                                temperature={"Sunset"}
                                                key={nanoid()}
                                                wmoCodeImageLink={"sunset"}
                                                timeISO8601={todaysSunset}
                                    />,
                                    <HourlyTile hour={tmrwsSunriseHour + ":" + tmrwsSunriseMinutes}
                                                temperature={"Sunrise"}
                                                key={nanoid()}
                                                wmoCodeImageLink={"sunrise"}
                                                timeISO8601={tmrwsSunrise}
                                    />, 
                                    <HourlyTile hour={tmrwsSunsetHour + ":" + tmrwsSunsetMinutes}
                                                temperature={"Sunset"}
                                                key={nanoid()}
                                                wmoCodeImageLink={"sunset"}
                                                timeISO8601={tmrwsSunset}
                                    />
                                ]

    const tilesSorted = tilesWithSunriseset.slice().sort((a, b) => {
        return new Date(a.props.timeISO8601) - new Date(b.props.timeISO8601)
    })

    const tilesComplete = tilesSorted.slice().filter(tile => tile.props.timeISO8601 > hourlyForecastArray[0].timeISO8601 && tile.props.timeISO8601 < hourlyForecastArray[23].timeISO8601)

    console.log(tilesComplete)
    
    return (
        <section className="hourly-wrapper">
            <h4 className="current-hour-comment">{currentComment}</h4>
            <hr className='forecast-divider'/>
            <div className="hourly-forecast-wrapper">
                {tilesComplete}
            </div>
        </section>
    )
}