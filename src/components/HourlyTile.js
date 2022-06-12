import { React } from "react";
// import { IsDayContext } from './App';

export default function HourlyTile ({ hour, temperature, wmoCodeImageLink}) {
    // console.log(`${wmoCodeImageLink}.png`)

    // const isDay = useContext(IsDayContext)
    const temperatureField = (temperature === "Sunset" || temperature === "Sunrise") ? temperature : Math.floor(temperature)+"°" 
    const sunrisesetStyles = {
        padding: "0 14px",
    }

    return (
        <div className="tile" style={(temperature === "Sunset" || temperature === "Sunrise") ? sunrisesetStyles : null}>
            <h5 className="hour">{hour}</h5>
            <div className="tileForecastLogo-container">
                <img src={require(`../images/${wmoCodeImageLink}.png`)} alt="" className="tileForecastLogo" />
            </div>
            <h4 className="tileTemperature">{temperatureField}</h4>
        </div>
    )
}