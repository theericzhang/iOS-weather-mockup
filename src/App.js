import { React } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard'
// import PhoneFrame from './images/iPhoneFrame.svg'

function App() {

    return (
        <div className="App">
            <WeatherCard url={"https://api.open-meteo.com/v1/forecast?latitude=37.776549&longitude=-122.4964&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles"} />
        </div>
    )
}

export default App;
