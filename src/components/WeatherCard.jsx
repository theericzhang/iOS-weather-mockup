import { useEffect, useState, createContext, React } from "react";
import Hero from './Hero'
import Future from './Future'
import Hourly from './Hourly'
import Footer from './Footer';
import { useInView } from 'react-intersection-observer'

export const IsDayContext = createContext()
export const WeatherDataContext = createContext()
export const TodaysSunriseHourContext = createContext()

export default function WeatherCard( { url, 
                                       receiveIsDay, 
                                       receiveCardIsVisible, 
                                       index, 
                                       setCitiesOverviewData, 
                                       cityName,
                                       citiesLatLngLength } ) {
    const [weatherData, setWeatherData] = useState({})
    const [isDay, setIsDay] = useState(true)
    // const cardRef = useRef()
    // const [cardIsVisible, setCardIsVisible] = useState()

    const { ref: cardRef, inView: cardIsVisible } = useInView({threshold: 0.5})

    useEffect(() => {
        receiveCardIsVisible(cardIsVisible, index)
    }, [cardIsVisible])

    // console.log("weather card", cardIsVisible)

    useEffect(() => {
        async function getWeatherData() {
            // FETCHING FROM API
            // const res = await fetch("https://weatherdbi.herokuapp.com/data/weather/sanfrancisco")
            // const data = await res.json()
            // setWeatherData(data)

            const res = await fetch(url)
            const data = await res.json()
            setWeatherData(data)

            // FETCHING FROM LOCAL DATA
            // setWeatherData(WeatherData.data)
        }
        getWeatherData()
        // console.log("card element ", cardRef.current)
        // const observer = new IntersectionObserver((entries) => {
        //     const entry = entries[0]
        //     setCardIsVisible(entry.isIntersecting)
        // })
        // observer.observe(cardRef.current)
        // console.log((timeNowInMinutes >= Number(todaysSunriseHour) * 60 + Number(todaysSunriseMinutes)) && (timeNowInMinutes <= Number(todaysSunsetHour) * 60 + Number(todaysSunsetMinutes)))
    }, [])

    // useEffect(() => {
    //     receiveIsDay(isDay)
    // },[isDay])

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
    let minutes = d.getMinutes();
    let nextHour = d.getHours(d.setHours(hours + 1));
    // let dayName = daysOfWeek[d.getDay()]

    let upcomingWeek = [daysOfWeek[(d.getDay()) % 7], daysOfWeek[(d.getDay() + 1) % 7 ], daysOfWeek[(d.getDay()+ 2) % 7 ], daysOfWeek[(d.getDay() + 3) % 7 ], daysOfWeek[(d.getDay() + 4) % 7 ], daysOfWeek[(d.getDay()+ 5)  % 7], daysOfWeek[(d.getDay()+ 6) % 7]]
    let currentComment = wmoCodes[weatherData?.hourly?.weathercode[hours + 1]] + " conditions expected around " + `${nextHour}:00.`


    let theNext24Hours = [];
    for (let i = 0; i < 24; i++) {
        theNext24Hours.push(d.getHours(d.setHours(hours + i)))
    }

    // console.log(hours + ":" + d.getMinutes())
    // console.log(String(hours).padStart(2, '0') + ":" + String(d.getMinutes()).padStart(2, '0'))
    const todaysSunrise = (new Date(weatherData?.daily?.sunrise[0]))
    const todaysSunriseHour = String(todaysSunrise?.getHours()).padStart(2, '0')
    const todaysSunriseMinutes = String(todaysSunrise?.getMinutes()).padStart(2, '0')
    
    const todaysSunset = (new Date(weatherData?.daily?.sunset[0]))
    const todaysSunsetHour = String(todaysSunset?.getHours()).padStart(2, '0')
    const todaysSunsetMinutes = String(todaysSunset?.getMinutes()).padStart(2, '0')
    
    const tmrwsSunrise = (new Date(weatherData?.daily?.sunrise[1]))
    const tmrwsSunriseHour = String(tmrwsSunrise?.getHours()).padStart(2, '0')
    const tmrwsSunriseMinutes = String(tmrwsSunrise?.getMinutes()).padStart(2, '0')
    
    const tmrwsSunset = (new Date(weatherData?.daily?.sunset[1]))
    const tmrwsSunsetHour = String(tmrwsSunset?.getHours()).padStart(2, '0')
    const tmrwsSunsetMinutes = String(tmrwsSunset?.getMinutes()).padStart(2, '0')

    const timeNowInMinutes = hours * 60 + minutes

    // need to get the time in total minutes in a day
    // consider 24hr time
    // multiply hour amount by 60 to get minutes passed
    // add minutes amount to get minute granularity
    // compare timeNowInMinutes with sunrise/sunset in minutes to determine day/night
    // Since we casted Sunset/Sunrise Hour/Minutes to a string, we need to cast it to a number
    // if we want to compare the total minutes elapsed. Otherwise, a comparison between
    // number and NaN will return false

    useEffect(() => {
        setIsDay((timeNowInMinutes >= Number(todaysSunriseHour) * 60 + Number(todaysSunriseMinutes)) && (timeNowInMinutes <= Number(todaysSunsetHour) * 60 + Number(todaysSunsetMinutes)))
        receiveIsDay(isDay)
        //CAUSES RERENDERING!!!!! 
    },[todaysSunriseHour, isDay])
    // let isDay = (timeNowInMinutes >= Number(todaysSunriseHour) * 60 + Number(todaysSunriseMinutes)) && (timeNowInMinutes <= Number(todaysSunsetHour) * 60 + Number(todaysSunsetMinutes))

    // citiesOverviewData set here after fetching weather information from weatherData
    useEffect(() => {
        setCitiesOverviewData(prevCitiesOverviewData => {
            const tempArray = []
            // set upperboundary to citiesLatLngLength, because prevCitiesOverviewData.length does not contain the
            // updated length of the array that holds the cities' latlng objects.
            // citiesLatLngLength (citiesLatLng.length) is state that is dynamically updated based on 
            // the user completing the form in CitiesOverviewForm.jsx
            // Querying a city name in text returns the latlng coordinates as an object,
            // adds it to the citiesLatLng array, which then will update the citiesLatLng.length property.
            // after this, we want to update the citiesOverviewData to include preview information
            // that helps hydrate the "overview" view.
            for (let i = 0; i < citiesLatLngLength; i++) {
                if (i === index) {
                    tempArray.push(
                        {
                            "currenttemp": Math.round(weatherData?.current_weather?.temperature),
                            "comment": wmoCodes[weatherData?.current_weather?.weathercode],
                            "todayTempHigh": Math.round(weatherData?.daily?.temperature_2m_max[0]),
                            "todayTempLow": Math.round(weatherData?.daily?.temperature_2m_min[0])
                        }
                    )
                } else {
                    tempArray.push(prevCitiesOverviewData[i])
                }
            }
            return tempArray
        })
    },[weatherData, citiesLatLngLength])

    while (weatherData === undefined) {
        //loading placeholder
        return (
            <div className="App">
                <div className="phone-wrapper">
                    <img src={require('../images/Sunny-Background.jpeg')} alt="" className="weather-background" />
                    <Hero region={""}
                        currenttemp={"--"} 
                    />
                    <Footer />
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
    const hoursStandardized = weatherData?.hourly?.time.slice(hours, hours+24)

    // console.log(hourlyTemperatures)
    // console.log(hourlyWeatherCodes)

    const wmoCodesUrl = {
        "0": "Clear",
        "1": "Clear",
        "2": "Partly cloudy",
        // "0": isDay ? "Clear" : "Clear night",
        // "1": isDay ? "Clear" : "Clear night",
        // "2": isDay ? "Partly cloudy" : "Cloudy night",
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
                hour: String(theNext24Hours[i]).padStart(2, '0'),
                temperature: hourlyTemperatures[i],
                weathercode: hourlyWeatherCodes[i],
                timeISO8601: new Date(hoursStandardized[i])
            }
        )
    }

    
    return (
        <div className="weather-card-wrapper" ref={cardRef}>
            {/* {todaysSunriseHour !== undefined && weatherData !== undefined && <img src={isDay ? require('../images/Sunny-Background.jpeg') : require('../images/Night-Background.png')} alt="" className="weather-background" />} */}
            <Hero region={weatherData && cityName? cityName : null}
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
                        todaysSunriseHour={todaysSunriseHour}
                        todaysSunsetHour={todaysSunsetHour}
                        todaysSunriseMinutes={todaysSunriseMinutes}
                        todaysSunsetMinutes={todaysSunsetMinutes}
                        todaysSunset={todaysSunset}
                        todaysSunrise={todaysSunrise}
                        tmrwsSunriseHour={tmrwsSunriseHour}
                        tmrwsSunsetHour={tmrwsSunsetHour}
                        tmrwsSunriseMinutes={tmrwsSunriseMinutes}
                        tmrwsSunsetMinutes={tmrwsSunsetMinutes}
                        tmrwsSunset={tmrwsSunset}
                        tmrwsSunrise={tmrwsSunrise}
                />
                <IsDayContext.Provider value={isDay}>
                    <Future nextDays={weatherData?.daily} 
                            dayNameArray={upcomingWeek}
                            stringComment={wmoCodes[weatherData?.current_weather?.weathercode]}
                            currenttemp={weatherData?.current_weather?.temperature}
                    />
                </IsDayContext.Provider>
            </div>
            : null}

                     
        </div>
    )
}