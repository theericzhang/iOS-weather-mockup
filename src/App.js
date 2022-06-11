import { React, useContext, useState } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard';
import Footer from './components/Footer';
import { IsDayContext } from './components/WeatherCard';
// import PhoneFrame from './images/iPhoneFrame.svg'

function App() {
    const [isDay, setIsDay] = useState(true);

    function receiveIsDay(incomingIsDay) {
        setIsDay(incomingIsDay)
    }

    return (
        <div className="App">
            <div className="phone-wrapper">
                <img src={isDay ? require('./images/Sunny-Background.jpeg') : require('./images/Night-Background.png')} alt="" className="weather-background" />
                <ul className="weather-card-carousel">
                    <WeatherCard url={"https://api.open-meteo.com/v1/forecast?latitude=37.776549&longitude=-122.4964&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles"} receiveIsDay={receiveIsDay}/>
                    <WeatherCard url={"https://api.open-meteo.com/v1/forecast?latitude=37.776549&longitude=-122.4964&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles"} receiveIsDay={receiveIsDay}/>
                    <WeatherCard url={"https://api.open-meteo.com/v1/forecast?latitude=37.776549&longitude=-122.4964&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles"} receiveIsDay={receiveIsDay}/>
                </ul>
                <Footer isDay={isDay}/>  
            </div> 
        </div>
    )
}

export default App;
