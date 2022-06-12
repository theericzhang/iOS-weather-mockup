import { React, useContext, useState } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard';
import Footer from './components/Footer';
import { IsDayContext } from './components/WeatherCard';
// import PhoneFrame from './images/iPhoneFrame.svg'

function App() {
    const [isDay, setIsDay] = useState(true);
    const [cardsArrayIsVisible, setCardsArrayIsVisible] = useState( [ false, false, false ] )

    function receiveIsDay(incomingIsDay) {
        setIsDay(incomingIsDay)
    }

    function receiveCardIsVisible(cardIsVisible, index) {
        setCardsArrayIsVisible(prevCardsArrayIsVisible => {
            const tempCardsArrayIsVisible = []
            for (let i = 0; i < prevCardsArrayIsVisible.length; i++) {
                if (i === index) {
                    tempCardsArrayIsVisible.push(cardIsVisible)
                } else {
                    tempCardsArrayIsVisible.push(prevCardsArrayIsVisible[i])
                }
            }
            return tempCardsArrayIsVisible
        })
    }

    console.log(cardsArrayIsVisible)

    return (
        <div className="App">
            <div className="phone-wrapper">
                <img src={isDay ? require('./images/Sunny-Background.jpeg') : require('./images/Night-Background.png')} alt="" className="weather-background" />
                <ul className="weather-card-carousel">
                    <WeatherCard url={"https://api.open-meteo.com/v1/forecast?latitude=37.776549&longitude=-122.4964&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles"} 
                                 receiveIsDay={receiveIsDay}
                                 receiveCardIsVisible={receiveCardIsVisible}
                                 index={0}
                    />
                    {/* LA */}             
                    <WeatherCard url={"https://api.open-meteo.com/v1/forecast?latitude=34.0522&longitude=-118.2437&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles"} 
                                 receiveIsDay={receiveIsDay}
                                 receiveCardIsVisible={receiveCardIsVisible}
                                 index={1}
                    />
                    {/* SHANGHAI */}
                    <WeatherCard url={"https://api.open-meteo.com/v1/forecast?latitude=31.2304&longitude=121.4737&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles"} 
                                 receiveIsDay={receiveIsDay}
                                 receiveCardIsVisible={receiveCardIsVisible}
                                 index={2}
                    />
                </ul>
                <Footer isDay={isDay}
                        cardsArrayIsVisible={cardsArrayIsVisible}
                />  
            </div> 
        </div>
    )
}

export default App;
