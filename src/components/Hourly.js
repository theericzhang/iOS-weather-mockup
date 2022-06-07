import React from "react";
import HourlyTile from "./HourlyTile";
import { nanoid } from "nanoid";

export default function Hourly ({ currentComment, hourlyForecastArray, wmoCodesUrl }) {
    const tiles = hourlyForecastArray.map((hour, index) => {
        if (index === 0) {
            return <HourlyTile hour={"Now"} 
                    temperature={hour.temperature}
                    wmocode={hour.weathercode}
                    key={nanoid()}
                    wmoCodeImageLink={wmoCodesUrl[hourlyForecastArray[index]?.weathercode]}
                    />
        } else {
            return <HourlyTile hour={hour.hour} 
                    temperature={hour.temperature}
                    wmocode={hour.weathercode} 
                    key={nanoid()}
                    wmoCodeImageLink={wmoCodesUrl[hourlyForecastArray[index]?.weathercode]}
            />
        }
        
        
    })
    
    return (
        <section className="hourly-wrapper">
            <h4 className="current-hour-comment">{currentComment}</h4>
            <hr className='forecast-divider'/>
            <div className="hourly-forecast-wrapper">
                {tiles}
            </div>
        </section>
    )
}