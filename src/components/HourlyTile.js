import React from "react";

export default function HourlyTile ({ hour, temperature, wmoCodeImageLink}) {
    console.log(`${wmoCodeImageLink}.png`)
    return (
        <div className="tile">
            <h5 className="hour">{String(hour).padStart(2, '0')}</h5>
            <div className="tileForecastLogo-container">
                <img src={require(`../images/${wmoCodeImageLink}.png`)} alt="" className="tileForecastLogo" />
            </div>
            <h4 className="tileTemperature">{Math.floor(temperature)}°</h4>
        </div>
    )
}