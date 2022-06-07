import React from "react";

export default function HourlyTile ({ hour, temperature, wmoCodeImageLink}) {
    console.log(`${wmoCodeImageLink}.png`)
    return (
        <div className="tile">
            <h5 className="hour">{hour}</h5>
            <img src={require(`../images/${wmoCodeImageLink}.png`)} alt="" className="tileForecastLogo" />
            <h4 className="tileTemperature">{Math.floor(temperature)}°</h4>
        </div>
    )
}