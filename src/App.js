import { React, useContext, useState } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard';
import Footer from './components/Footer';
import Cities from './components/Cities';
import { IsDayContext } from './components/WeatherCard';
import { useEffect } from '@storybook/addons';
// import PhoneFrame from './images/iPhoneFrame.svg'

function App() {
    const [isDay, setIsDay] = useState(true);
    const [isCitiesVisible, setIsCitiesVisible] = useState(false)

    const [citiesLatLng, setCitiesLatLng] = useState(
        [
            {
                "lat" : 37.776549,
                "long": -122.4964
            },
            {
                "lat" : 34.0522,
                "long": -118.2437
            },
            {
                "lat" : 31.2304,
                "long": 121.4737
            },
            {
                "lat" : 40.7128,
                "long": -74.0060
            }
        ]
    )
    
    const [cardsArrayIsVisible, setCardsArrayIsVisible] = useState(Array(citiesLatLng.length).fill(false))

    const citiesList = citiesLatLng.map((city, index) => {
        return <WeatherCard url={`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.long}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles`}
                     receiveIsDay={receiveIsDay}
                     receiveCardIsVisible={receiveCardIsVisible}
                     index={index}
                     key={index}
        />
    })


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

    function showCities() {
        setIsCitiesVisible(prevIsCitiesVisible => !prevIsCitiesVisible)
    }

    console.log(cardsArrayIsVisible)

    return (
        <div className="App">
            <div className="phone-wrapper">
                <img src={isDay ? require('./images/Sunny-Background.jpeg') : require('./images/Night-Background.png')} alt="" className="weather-background" />
                <ul className="weather-card-carousel">
                    {citiesList}
                    {/* <WeatherCard url={"https://api.open-meteo.com/v1/forecast?latitude=37.776549&longitude=-122.4964&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles"} 
                                 receiveIsDay={receiveIsDay}
                                 receiveCardIsVisible={receiveCardIsVisible}
                                 index={0}
                    />
                    LA             
                    <WeatherCard url={"https://api.open-meteo.com/v1/forecast?latitude=34.0522&longitude=-118.2437&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles"} 
                                 receiveIsDay={receiveIsDay}
                                 receiveCardIsVisible={receiveCardIsVisible}
                                 index={1}
                    />
                    SHANGHAI
                    <WeatherCard url={"https://api.open-meteo.com/v1/forecast?latitude=31.2304&longitude=121.4737&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles"} 
                                 receiveIsDay={receiveIsDay}
                                 receiveCardIsVisible={receiveCardIsVisible}
                                 index={2}
                    /> */}
                </ul>
                <Footer isDay={isDay}
                        cardsArrayIsVisible={cardsArrayIsVisible}
                        showCities={showCities}
                />  
                {isCitiesVisible && <Cities/>}
            </div> 
        </div>
    )
}

export default App;
