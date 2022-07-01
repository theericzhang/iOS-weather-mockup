import { React } from 'react'

export default function Hero ({region, currenttemp, comment, todayTempMin, todayTempMax}) {

    return (
        <div className="header-wrapper">
            <h3 className="city-location">{region?.split(",")[0]}</h3>
            <div className="degree-wrapper">
                <h1 className="temperature">{currenttemp === undefined? "--": Math.floor(currenttemp)}</h1>
                <h1 className="temperature-deg-char">{currenttemp === undefined? null : "°"}</h1>
            </div>
            <h4 className="comment">{comment}</h4>
            {todayTempMin !== undefined && 
            <div className="today-temps-min-max">
                <h4 className="temp-min-max">H:{Math.round(todayTempMax)}°</h4>
                <h4 className="temp-min-max">L:{Math.round(todayTempMin)}°</h4>
            </div>}
        </div>
    )
}