import { React } from 'react';

export default function Footer() {
    return (
        <div className="footer-wrapper">
            <div className="footer-inner-wrapper">
                <button className="cities-list-button">
                    <img src={require(`../images/list-button.png`)} alt="" className="cities-list-icon" />
                </button>
            </div>
        </div>
    ) 
}