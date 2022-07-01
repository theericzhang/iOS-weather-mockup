import { React } from 'react'
import WeatherDay from './WeatherDay'
import CalendarSvg from '../images/calendar.svg'

export default function Future ({ nextDays, dayNameArray, stringComment, currenttemp }) {
    let day0 = {}
    let day1 = {}
    let day2 = {}
    let day3 = {}
    let day4 = {}
    let day5 = {}
    let day6 = {}
    let reorgNextDays = []

    let lowestFarray = []
    let highestFarray = []
    let tempRange = 0
    let minF = 0;
    let maxF = 0;

    
    if (nextDays!== undefined) {
        day0 = {
            "sunset": nextDays?.sunset[0],
            "apparent_temperature_max": nextDays?.apparent_temperature_max[0],
            "time": nextDays?.time[0],
            "apparent_temperature_min": nextDays?.apparent_temperature_min[0],
            "temperature_2m_max": nextDays?.temperature_2m_max[0],
            "temperature_2m_min": nextDays?.temperature_2m_min[0],
            "sunrise": nextDays?.sunrise[0],
            "weathercode": nextDays?.weathercode[0]
        }
    
        day1 = {
            "sunset": nextDays?.sunset[1],
            "apparent_temperature_max": nextDays?.apparent_temperature_max[1],
            "time": nextDays?.time[1],
            "apparent_temperature_min": nextDays?.apparent_temperature_min[1],
            "temperature_2m_max": nextDays?.temperature_2m_max[1],
            "temperature_2m_min": nextDays?.temperature_2m_min[1],
            "sunrise": nextDays?.sunrise[1],
            "weathercode": nextDays?.weathercode[1]
        }
    
        day2 = {
            "sunset": nextDays?.sunset[2],
            "apparent_temperature_max": nextDays?.apparent_temperature_max[2],
            "time": nextDays?.time[2],
            "apparent_temperature_min": nextDays?.apparent_temperature_min[2],
            "temperature_2m_max": nextDays?.temperature_2m_max[2],
            "temperature_2m_min": nextDays?.temperature_2m_min[2],
            "sunrise": nextDays?.sunrise[2],
            "weathercode": nextDays?.weathercode[2]
        }
    
        day3 = {
            "sunset": nextDays?.sunset[3],
            "apparent_temperature_max": nextDays?.apparent_temperature_max[3],
            "time": nextDays?.time[3],
            "apparent_temperature_min": nextDays?.apparent_temperature_min[3],
            "temperature_2m_max": nextDays?.temperature_2m_max[3],
            "temperature_2m_min": nextDays?.temperature_2m_min[3],
            "sunrise": nextDays?.sunrise[3],
            "weathercode": nextDays?.weathercode[3]
        }
    
        day4 = {
            "sunset": nextDays?.sunset[4],
            "apparent_temperature_max": nextDays?.apparent_temperature_max[4],
            "time": nextDays?.time[4],
            "apparent_temperature_min": nextDays?.apparent_temperature_min[4],
            "temperature_2m_max": nextDays?.temperature_2m_max[4],
            "temperature_2m_min": nextDays?.temperature_2m_min[4],
            "sunrise": nextDays?.sunrise[4],
            "weathercode": nextDays?.weathercode[4]
        }
    
        day5 = {
            "sunset": nextDays?.sunset[5],
            "apparent_temperature_max": nextDays?.apparent_temperature_max[5],
            "time": nextDays?.time[5],
            "apparent_temperature_min": nextDays?.apparent_temperature_min[5],
            "temperature_2m_max": nextDays?.temperature_2m_max[5],
            "temperature_2m_min": nextDays?.temperature_2m_min[5],
            "sunrise": nextDays?.sunrise[5],
            "weathercode": nextDays?.weathercode[5]
        }
    
        day6 = {
            "sunset": nextDays?.sunset[6],
            "apparent_temperature_max": nextDays?.apparent_temperature_max[6],
            "time": nextDays?.time[6],
            "apparent_temperature_min": nextDays?.apparent_temperature_min[6],
            "temperature_2m_max": nextDays?.temperature_2m_max[6],
            "temperature_2m_min": nextDays?.temperature_2m_min[6],
            "sunrise": nextDays?.sunrise[6],
            "weathercode": nextDays?.weathercode[6]
        }
    
        reorgNextDays = [ day0, day1, day2, day3, day4, day5, day6 ]

        lowestFarray = reorgNextDays?.map(temp => {
            return temp?.temperature_2m_min
        })
    
        highestFarray = reorgNextDays?.map(temp => {
            return temp?.temperature_2m_max
        })
    
        lowestFarray ? minF = Math.min(...lowestFarray) : minF = 0
        highestFarray ? maxF = Math.max(...highestFarray) : maxF = 0
        tempRange = maxF - minF
    }

    const weatherDay = reorgNextDays?.map(
        (day, index) => <WeatherDay key={index}
                                    index={index}
                                    day={dayNameArray[index]}
                                    comment={stringComment}
                                    maxF={Math.round(day?.temperature_2m_max)}
                                    minF={Math.round(day?.temperature_2m_min)} 
                                    maxRange={tempRange}
                                    absMin={minF}
                                    absMax={maxF}
                                    currenttemp={currenttemp}
                        />
    )

    if (weatherDay?.length > 0) {
        return (
            <section className="future-wrapper">
                <div className="header-x-day-forecast">
                    <img src={CalendarSvg} alt="calendar icon" className="calendar" />
                    <h6 className="eight-day-forecast">7-DAY FORECAST</h6>
                </div>
                <hr className='forecast-divider'/>
                {weatherDay}
            </section>
        )
    } else {return null}
}