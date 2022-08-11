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
                    key={index}
                    // we want to appropriately display the weather logo depending if that hour 
                    // falls between nighttime and daytime. nighttime logos have a moon, daytime
                    // logos have a sun. Not all logos have a moon or sun indication, so we need
                    // to create duplicate images with " night" prefix to prevent unfound module errors
                    // from being thrown
                    wmoCodeImageLink={(hour.timeISO8601 > todaysSunrise && hour.timeISO8601 < todaysSunset) 
                                   || (hour.timeISO8601 > tmrwsSunrise && hour.timeISO8601 < tmrwsSunset) 
                                   ? 
                                     wmoCodesUrl[hourlyForecastArray[index]?.weathercode]
                                   : wmoCodesUrl[hourlyForecastArray[index]?.weathercode] + " night"}
                    timeISO8601={hour.timeISO8601}
                    />
        } else {
            return <HourlyTile hour={hour.hour} 
                    temperature={hour.temperature}
                    wmocode={hour.weathercode} 
                    key={index}
                    // we want to appropriately display the weather logo depending if that hour 
                    // falls between nighttime and daytime. nighttime logos have a moon, daytime
                    // logos have a sun. Not all logos have a moon or sun indication, so we need
                    // to create duplicate images with " night" prefix to prevent unfound module errors
                    // from being thrown
                    wmoCodeImageLink={(hour.timeISO8601 > todaysSunrise && hour.timeISO8601 < todaysSunset) 
                                   || (hour.timeISO8601 > tmrwsSunrise && hour.timeISO8601 < tmrwsSunset) 
                                   ? 
                                     wmoCodesUrl[hourlyForecastArray[index]?.weathercode]
                                   : wmoCodesUrl[hourlyForecastArray[index]?.weathercode] + " night"}
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
    // for temperature prop, add "Sunrise/Sunset" text. We will properly
    // perform typecasting on this in HourlyTile.js

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


    // Since we manually injected 4 additional tiles into our tilesWithSunriseset
    // they will be placed out of order (time-wise). The first 24 are placed in increasing hour
    // from tiles. The manually added tiles are then placed after the 24, disrupting the order.
    //
    // Thus, we need to sort the array (keeping immutability in mind). Since each tile has a 
    // timeISO8601 property, we can use that value to sort the array.
    //
    // Note the .slice() function - we do NOT want to make a direct mutation to 
    // the array, so by performing a .slice() operation, we are able to return a shallow copy
    // of tilesWithSunriseset that we can then use the .sort() function.

    
    const tilesSorted = tilesWithSunriseset.slice().sort((a, b) => {
        return new Date(a.props.timeISO8601) - new Date(b.props.timeISO8601)
    })

    // Although the entire array is sorted now, there are a few problems:
    // 1) The current time can be after today's sunrise and sunset
    // 2) It can show tonight's sunset, tomorrow's sunrise AND sunset
    //
    // We need to filter these specific conditions so they don't introduce 
    // confusion. 
    //
    // Since we know that the hourlyForecastArray[0] is the absolute NOW, we can
    // say - IF the timeISO8601 is less than the timeISO8601 from any tile, filter that tile out
    // This removes the case where there are sunset and sunrise tiles appeaaring before 
    // the "Now" tile.

    // By applying this same logic to the last member of the array (hourlyForecastArray[23]),
    // we can filter out any EXTRA sunrise/sunset values.
    // Again, note the .slice() function we're applying here to keep things immutable (We're making a 
    // shallow copy of the array before we act on it using the .filter() function.)

    const tilesComplete = tilesSorted.slice().filter(tile => tile.props.timeISO8601 >= hourlyForecastArray[0].timeISO8601 && tile.props.timeISO8601 <= hourlyForecastArray[23].timeISO8601)

    // let isThisHourDay = false;
    // const tilesRealComplete = []
    // for (let i = 0; i< tilesComplete.length; i++) {
    //     if (tilesComplete[i].temperature === "sunrise")
    // }
    
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