import { React } from 'react';

export default function Footer(isDay) {
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