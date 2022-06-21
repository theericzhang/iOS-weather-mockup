import React from "react";

export default function CitiesOverviewTile( { comment, currenttemp, todayTempHigh, todayTempLow, cityName } ) {
    return (
        <div className="c-o-t-wrapper">
            <div className="c-o-t-left">
                <div className="c-o-t-left-top">
                    <h4 className="city-name">{cityName}</h4>
                    <h6 className="time">15:35</h6>
                </div>
                <h6 className="c-o-t-comment">{comment}</h6>
            </div>
            <div className="c-o-t-right">
                <h3 className="c-o-t-temperature">{currenttemp}°</h3>
                <div className="day-h-l">
                    <h5 className="h-l">H: {todayTempHigh}°</h5>
                    <h5 className="h-l">L: {todayTempLow}°</h5>
                </div>
            </div>
        </div>
    )
}