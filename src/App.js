import { useEffect, useState, React } from 'react';
import './App.css';
import Hero from './components/Hero'
import Future from './components/Future'
import WeatherData from './WeatherData'

function App() {

    const [weatherData, setWeatherData] = useState({})

    useEffect(() => {
        async function getWeatherData() {
            // FETCHING FROM API
            // const res = await fetch("https://weatherdbi.herokuapp.com/data/weather/sanfrancisco")
            // const data = await res.json()
            // setWeatherData(data)

            const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=37.776549&longitude=-122.4964&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles")
            const data = await res.json()
            setWeatherData(data)

            // FETCHING FROM LOCAL DATA
            // setWeatherData(WeatherData.data)
        }
        getWeatherData()
    }, [])
    
    const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const d = new Date();
    let hours = d.getHours();
    let dayName = daysOfWeek[d.getDay()]

    let upcomingWeek = [daysOfWeek[(d.getDay()) % 7], daysOfWeek[(d.getDay() + 1) % 7 ], daysOfWeek[(d.getDay()+ 2) % 7 ], daysOfWeek[(d.getDay() + 3) % 7 ], daysOfWeek[(d.getDay() + 4) % 7 ], daysOfWeek[(d.getDay()+ 5)  % 7], daysOfWeek[(d.getDay()+ 6) % 7]]

    // let upcomingWeek = [daysOfWeek[]]
    // console.log(upcomingWeek)
    while (weatherData === undefined) {
        //loading placeholder
        return (
            <div className="App">
                <div className="phone-wrapper" id={hours >= 6 && hours <= 20 ? 'sunny' : 'night'}>
                    <Hero region={"San Francisco"}
                        currenttemp={"--"} 
                    />
                </div>
            </div>
        )
    }

    const wmoCodes = {
                          "0": "Clear",
                          "1": "Mostly Clear",
                          "2": "Partly Cloudy",
                          "3": "Mostly Cloudy",
                          "45": "Fog",
                          "48": "Rime Fog",
                          "51": "Light Drizzle",
                          "53": "Moderate Drizzle",
                          "55": "Dense Drizzle",
                          "56": "Light Freezing Drizzle",
                          "57": "Dense Freezing Drizzle",
                          "61": "Slight Rain",
                          "63": "Moderate Rain",
                          "65": "Heavy Rain",
                          "71": "Light Snow",
                          "73": "Moderate Snow",
                          "75": "Heavy Snow",
                          "77": "Snow Grains",
                          "80": "Light Rain Showers",
                          "81": "Moderate Rain Showers",
                          "82": "Heavy Rain Showers",
                          "85": "Light Snow Showers",
                          "87": "Heavy Snow Showers"                   
                     }

    return (
        <div className="App">
            <div className="phone-wrapper" id={hours >= 6 && hours <= 20 ? 'sunny' : 'night'}>
                <Hero region={weatherData? "San Francisco" : null}
                    currenttemp={weatherData?.current_weather?.temperature}
                    comment={wmoCodes[weatherData?.current_weather?.weathercode]}  
                />
                <Future nextDays={weatherData?.daily} 
                        dayNameArray={upcomingWeek}
                        stringComment={wmoCodes[weatherData?.current_weather?.weathercode]}
                />
            </div>
        </div>
    )
}

export default App;
