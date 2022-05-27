import React from 'react'
import PartlyCloudy from '../images/Partly cloudy.png'
import Clear from '../images/Clear.png'
import Cloudy from '../images/Cloudy.png'

export default function WeatherDay ({index, day, comment, maxF, minF, maxRange, absMin, absMax}) {
    let imgUrl = ""
    
    switch (comment.toLowerCase()) {
        case "partly cloudy":
            imgUrl = PartlyCloudy
            break;
        case "clear":
            imgUrl = Clear
            break;
        case "mostly sunny":
            imgUrl = Clear
            break;
        case "partly sunny":
        imgUrl = Clear
        break;
        case "sunny":
            imgUrl = Clear
            break;
        case "mostly cloudy":
            imgUrl = PartlyCloudy
            break;
        case "cloudy":
            imgUrl = Cloudy
            break;
        default:
            console.log("no corresponding image found")
    }

    const gradientbarfilled = {
        // width: 95*(maxF - absMin)/(maxRange) + "%",
        // width: 150*(maxF - absMin)/(maxRange) + "px",
        // width: 100*(absMax - absMin)/(maxRange) + "%",
        // left:  100*(minF/absMin) - 100 + "%",
        // right: 100*(maxF/absMax) - 100 + "%",
        // right: 0 + "%"
        marginLeft: 100*((minF - Math.round(absMin))/maxRange) + "%",
        marginRight: 100 * ((absMax - Math.round(maxF))/maxRange) + "%"
    }

    const currentTempDot = {

    }

    return (
        <>
            <div className="day-row" >
                <h5 className="day-of-week"> 
                {
                    //setting today's name to "today" after checking index
                    index === 0 ? "Today" : day.slice(0,3)
                } 
                </h5>
                <div className="comment-image">
                    <img src={imgUrl} alt="" className="weather-icon" />
                </div>

                <span className="weather-day-data-low">{minF}°</span>
                <div className="wrapper-bar">
                    <div className="weather-range-bar">
                        {index == 0 && <div className="currentTempDot" style={currentTempDot}></div>}
                        <div className="weather-range-bar-gradient" style={gradientbarfilled}></div>
                    </div>
                </div>
                <span className="weather-day-data-high">{maxF}° </span>
            </div>
            {index === 6 ? null : <hr className='forecast-divider'/>}
        </>
    )
}