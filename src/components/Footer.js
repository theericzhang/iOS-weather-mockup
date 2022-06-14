import { React } from 'react';
import { nanoid } from 'nanoid';

export default function Footer({ isDay, cardsArrayIsVisible, showCities }) {
    const light = {
        opacity: 1
    }

    const dark = {
        opacity: 0.55
    }

    const dotsPagination = cardsArrayIsVisible.map((card, index) => {
        if (card === true) {
            return (
                <div className="dot-wrapper"
                     key={index}
                     >
                    <div className="dot" style={light}/>
                </div>
            )
        } else {
            return (
                <div className="dot-wrapper"
                     key={index}
                     >
                    <div className="dot" style={dark}/>
                </div>
            )
        }
    })
    
    return (
        <div className="footer-wrapper" id={isDay? "daytime" : "nighttime"}>
            <div className="footer-inner-wrapper">
                <div className="city-cards-logos">
                    <img src={require(`../images/location.png`)} alt="" className="location-icon" />
                    {dotsPagination}
                </div>
                <button className="cities-list-button" onClick={showCities}>
                    <img src={require(`../images/list-button.png`)} alt="" className="cities-list-icon" />
                </button>
            </div>
        </div>
    ) 
}