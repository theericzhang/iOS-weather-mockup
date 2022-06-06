import React from "react";

export default function Hourly ({ currentComment }) {
    return (
        <section className="hourly-wrapper">
            <h4 className="current-hour-comment">{currentComment}</h4>
            <hr className='forecast-divider'/>
            <div className="hourly-forecast-wrapper">
                Something about reusuable objects here
            </div>
        </section>
    )
}