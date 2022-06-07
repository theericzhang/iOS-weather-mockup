import { useEffect, useState, React } from 'react';
import './App.css';
import Hero from './components/Hero'
import Future from './components/Future'
import Hourly from './components/Hourly'
import PhoneFrame from './images/iPhoneFrame.svg'

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
    
    const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const d = new Date();
    let hours = d.getHours();
    let nextHour = d.getHours(d.setHours(hours + 1));
    // let dayName = daysOfWeek[d.getDay()]

    let upcomingWeek = [daysOfWeek[(d.getDay()) % 7], daysOfWeek[(d.getDay() + 1) % 7 ], daysOfWeek[(d.getDay()+ 2) % 7 ], daysOfWeek[(d.getDay() + 3) % 7 ], daysOfWeek[(d.getDay() + 4) % 7 ], daysOfWeek[(d.getDay()+ 5)  % 7], daysOfWeek[(d.getDay()+ 6) % 7]]
    let currentComment = wmoCodes[weatherData?.hourly?.weathercode[hours + 1]] + " conditions expected around " + `${nextHour}:00.`


    let theNext24Hours = [];
    for (let i = 0; i < 24; i++) {
        theNext24Hours.push(d.getHours(d.setHours(hours + i)))
    }

    // console.log(theNext24Hours)

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

    // find current hours, find index at which current hour is, then get index at which 24+h is
    // define current date time
    // const currentindex = array.indexof(currentdatetime)
    // weathercodes.slice(currentIndex, currentIndex+23) 
    // temperature_2m.slice(currentIndex, currentIndex+23)
    // console.log(d.toISOString().slice(0, 14) + "00")
    // const currentDateTimeISO = d.toISOString().slice(0, 14) + "00"

    // const currentIndexTime = weatherData?.hourly?.time.indexOf(currentDateTimeISO)
    const hourlyTemperatures = weatherData?.hourly?.temperature_2m.slice(hours, hours+24)
    const hourlyWeatherCodes = weatherData?.hourly?.weathercode.slice(hours, hours+24)

    // console.log(hourlyTemperatures)
    // console.log(hourlyWeatherCodes)

    const wmoCodesUrl = {
        "0": "Clear",
        "1": "Clear",
        "2": "Partly cloudy",
        "3": "Cloudy",
        "45": "Fog",
        "48": "Fog",
        "51": "Drizzle",
        "53": "Drizzle",
        "55": "Drizzle",
        "56": "Heavy snow",
        "57": "Heavy snow",
        "61": "Rain",
        "63": "Rain",
        "65": "Heavy rain",
        "71": "Scattered snow",
        "73": "Snow",
        "75": "Snow",
        "77": "Snow",
        "80": "Rain",
        "81": "Rain",
        "82": "Heavy rain",
        "85": "Scattered snow",
        "87": "Snow"                   
   }

    let hourlyForecastArray = []

    for (let i = 0; i < hourlyTemperatures?.length; i++) {
        hourlyForecastArray.push(
            {
                hour: theNext24Hours[i],
                temperature: hourlyTemperatures[i],
                weathercode: hourlyWeatherCodes[i]
            }
        )
    }

    console.log(hourlyForecastArray)

    return (
        <div className="App">
            
            {/* id={hours >= 6 && hours <= 20 ? 'sunny' : 'night'} */}
            {/* <img src={PhoneFrame} alt="" className="phone-frame" /> */}
            <div className="phone-wrapper">
                
                <img src={require('./images/Sunny-Background.jpeg')} alt="" className="weather-background" />
                <Hero region={weatherData? "San Francisco" : null}
                    currenttemp={weatherData?.current_weather?.temperature}
                    comment={wmoCodes[weatherData?.current_weather?.weathercode]}  
                    todayTempMin={weatherData?.daily?.temperature_2m_min[0]}
                    todayTempMax={weatherData?.daily?.temperature_2m_max[0]}
                />
                {weatherData !== undefined && wmoCodes[weatherData?.hourly?.weathercode[1]] !== undefined
                ? <div className="weather-modules">
                    <Hourly currentComment={currentComment}
                            hourlyForecastArray={hourlyForecastArray}
                            wmoCodesUrl={wmoCodesUrl}
                    />
                    <Future nextDays={weatherData?.daily} 
                            dayNameArray={upcomingWeek}
                            stringComment={wmoCodes[weatherData?.current_weather?.weathercode]}
                    />
                </div>
                : null}

                {/*DUPLICAATION*/}
                <Hero region={weatherData? "San Francisco" : null}
                    currenttemp={weatherData?.current_weather?.temperature}
                    comment={wmoCodes[weatherData?.current_weather?.weathercode]}  
                    todayTempMin={weatherData?.daily?.temperature_2m_min[0]}
                    todayTempMax={weatherData?.daily?.temperature_2m_max[0]}
                />
                {weatherData !== undefined && wmoCodes[weatherData?.hourly?.weathercode[1]] !== undefined
                ? <div className="weather-modules">
                    <Hourly currentComment={currentComment}
                            hourlyForecastArray={hourlyForecastArray}
                            wmoCodesUrl={wmoCodesUrl}
                    />
                    <Future nextDays={weatherData?.daily} 
                            dayNameArray={upcomingWeek}
                            stringComment={wmoCodes[weatherData?.current_weather?.weathercode]}
                    />
                </div>
                : null}
                {/*DUPLICAATION*/}
            </div>
        </div>
    )
}

export default App;
