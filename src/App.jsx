import { React, useState, useEffect } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard';
import Footer from './components/Footer';
import CitiesOverview from './components/CitiesOverview';
import sunnyBackground from './images/Sunny-Background.jpeg'
import nightBackground from './images/Night-Background.png'
import { IsDayContext } from './components/WeatherCard';
// import PhoneFrame from './images/iPhoneFrame.svg'
const {VITE_NAME_CITIES_NAME_KEY} = import.meta.env


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
            // {
            //     "lat" : 31.2304,
            //     "long": 121.4737
            // },
            // {
            //     "lat" : 40.7128,
            //     "long": -74.0060
            // }
        ]
    )

    console.log(citiesLatLng)
    
    const [citiesOverviewData, setCitiesOverviewData] = useState([])
    const [cardsArrayIsVisible, setCardsArrayIsVisible] = useState(Array(citiesLatLng.length).fill(false))

    // const citiesNameDataUrl = citiesLatLng.map(item => {
    //     return `http://api.positionstack.com/v1/reverse?access_key=${VITE_NAME_CITIES_NAME_KEY}&query=${item.lat},${item.long}` 
    // })
    
    // transforming citiesNameDataUrl into a state allows us to add a new URL to the 
    // array to fetch from when we manually add a new city (dependent on the length of the citiesLatLng array)

    const [citiesNameDataUrl, setCitiesNameDataUrl] = useState([])

    useEffect(() => {
        setCitiesNameDataUrl (
            citiesLatLng.map(item => {
                return `http://api.positionstack.com/v1/reverse?access_key=${VITE_NAME_CITIES_NAME_KEY}&query=${item.lat},${item.long}` 
            })
        )
        console.log("the effect i just wrote, ran")
    },[citiesLatLng.length])

    // useEffect(() => {
    //     // somehow i need to update citiesNameArray whenever citiesLatLng changes
    //     // This way, I am able to update the array (citiesNameArray) to rerender
    //     // the list of citiesoverviewtiles.
    // },[citiesLatLng.length])

    console.log(citiesLatLng.length)

    const [citiesNameArray, setCitiesNameArray] = useState(Array(citiesLatLng.length))

    async function getCitiesName(index, url) {
        
        // we need to guard the api fetches, because every time we add a city, the entire list becomes
        // re-rendered. Sometimes when the items are re=rendered, the http requests cannot be caught up with
        // effectively causing a city to be reverted to be undefined

        // for example.... 
        // citiesNameArray returns ['San Francisco', 'Los Angeles']
        // we add a new city, New York
        // we expect ['SF', 'LA', 'NY']
        // but because of http requests being done again for the first two indicies due to a rerender,
        // we may not receive 'SF' or 'LA' again.
        // a realistic output would look like [undefined, 'Los Angeles', 'New York']

        // so we check if each index is undefined. if it is, then we fetch from the api
        // and store that name into the array. 

        // if the index is not undefined, then we don't fetch from the api at all.
        // this way, we save api calls ($$$) and prevent good data from being written over
        // into potentially bad data.
        
        if (citiesNameArray[index] === undefined) {
            const res = await fetch(url)
            const data = await res.json()
            console.log(data)
            setCitiesNameArray(prevCitiesNameArray => {
                const tempArray = []
                for (let i = 0; i < citiesLatLng.length; i++) {
                    if (i === index) {
                        tempArray.push(data?.data[0]?.locality)
                    } else {
                        tempArray.push(prevCitiesNameArray[i])
                    }
                }
                return tempArray
                
            })
        } 
    }

    useEffect(() => {    
        for (let i = 0; i < citiesNameDataUrl.length; i++) {
            getCitiesName(i, citiesNameDataUrl[i])
        }
    }, [citiesNameDataUrl.length])

    console.log(citiesNameDataUrl)

    const citiesList = citiesLatLng.map((city, index) => {
        return <WeatherCard url={`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.long}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles`}
                     receiveIsDay={receiveIsDay}
                     receiveCardIsVisible={receiveCardIsVisible}
                     index={index}
                     key={index}
                     setCitiesOverviewData={setCitiesOverviewData}
                     cityName={citiesNameArray[index]}
                     citiesLatLngLength={citiesLatLng.length}
        />
    })

    function receiveIsDay(incomingIsDay) {
        setIsDay(incomingIsDay)
    }

    function receiveCardIsVisible(cardIsVisible, index) {
        setCardsArrayIsVisible(prevCardsArrayIsVisible => {
            const tempCardsArrayIsVisible = []
            for (let i = 0; i < citiesLatLng.length; i++) {
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

    console.log(citiesNameArray)


    return (
        <div className="App">
            <div className="phone-wrapper">
                <img src={isDay ? sunnyBackground : nightBackground} alt="" className="weather-background" />
                <ul className="weather-card-carousel">
                    {citiesList}
                </ul>
                <Footer isDay={isDay}
                        cardsArrayIsVisible={cardsArrayIsVisible}
                        showCities={showCities}
                />  
                {isCitiesVisible && <CitiesOverview citiesOverviewData={citiesOverviewData}
                                                    cityName={citiesNameArray}
                                                    setCitiesLatLng={setCitiesLatLng} 
                                                    setIsCitiesVisible={setIsCitiesVisible}
                                    />
                }
            </div> 
        </div>
    )
}

export default App;
