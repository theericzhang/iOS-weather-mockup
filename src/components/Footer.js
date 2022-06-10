import { React, useContext } from 'react';
import { IsDayContext } from './WeatherCard';

export default function Footer() {
    const isDay = useContext(IsDayContext)
    return (
        <div className="footer-wrapper" id={isDay? "daytime" : "nighttime"}>
            <div className="footer-inner-wrapper">
                <div className="city-cards-logos">
                    <img src={require(`../images/location.png`)} alt="" className="" />
                </div>
                <button className="cities-list-button">
                    <img src={require(`../images/list-button.png`)} alt="" className="cities-list-icon" />
                </button>
            </div>
        </div>
    ) 
}