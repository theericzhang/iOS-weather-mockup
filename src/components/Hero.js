import { React } from 'react'

export default function Hero ({region, currenttemp, comment}) {

    return (
        <div className="header-wrapper">
            <h3 className="city-location">{region?.split(",")[0]}</h3>
            <div className="degree-wrapper">
                <h1 className="temperature">{currenttemp === undefined? "--": Math.floor(currenttemp)}</h1>
                <h1 className="temperature-deg-char">{currenttemp === undefined? null : "°"}</h1>
            </div>
            <h4 className="comment">{comment}</h4>
        </div>
    )
}