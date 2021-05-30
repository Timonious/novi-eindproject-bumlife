import React, {useEffect, useState, useContext} from "react"
import {Link} from "react-router-dom"
import { DrunkModeContext } from "../../context/DrunkModeContextProvider"
import content from "../../data/content.json"

export const Sleep = ({ weatherData, error }) => {
    const [avgNightTemp, setAvgNightTemp] = useState(null)
    const [nightHours, setNightHours] = useState([])
    const [rain, setRain] = useState(false)

    const { mode } = useContext(DrunkModeContext)
    const { [mode]: {sleepCN: {
        tab,
        weatherSegment,
        buttonContainer,
        button,
        recommend,
        retrieveError}
    } } = content

    useEffect(() => {
        if (weatherData) {
            if (weatherData.current.sunrise < Math.floor(Date.now() / 1000)) {
                setNightHours(weatherData.hourly.filter(hour => hour.dt > weatherData.current.sunset && hour.dt < weatherData.daily[1].sunrise))
            }
            else {
                setNightHours(weatherData.hourly.filter(hour => hour.dt < weatherData.current.sunrise))
            }
        }
    }, [weatherData])

    useEffect(() => {
        if (weatherData && nightHours ) {
            const nightRain = nightHours.filter(hour => hour.rain)
            if (nightRain.length > 0) {
                setRain(true)
            }
            const tempArray = nightHours.map((hour) => {
                return hour.temp
            })
            const sum = tempArray.reduce((a, b) => a + b, 0)
            const avg = (sum / tempArray.length) || 0
            setAvgNightTemp(Math.round(avg))
        }
    }, [nightHours])

    return (
        <div className={tab}>
            {weatherData && <div className={weatherSegment}>
                <p> Vannacht {rain ? <span>gaat het regenen </span> : <span>blijft het droog </span>}</p>
                    <p>en het koelt af tot {avgNightTemp && <span>{avgNightTemp} graden</span>}
                </p>
            </div>}
            {error && <p className={retrieveError}>er is iets fout gegaan met het ophalen van het weer, sorry</p>}
            <div className={buttonContainer}>
            {rain && avgNightTemp > 10 && <Link to='/overdekt'>
                <button className={button} type='button'>Overdekt</button>
            </Link>}


            {avgNightTemp < 10 ?
                <Link to='/overdekt'>
                <button className={button} type='button'>Overdekt</button>
            </Link>

            :  <><Link to='/blote-hemel'>
                <button className={button} type='button'>Buiten</button>
            </Link>
            {!rain && avgNightTemp > 10 && <span className={recommend}>Aanrader!</span>}
            </>}


            <Link to='/is-er-geld'>
                <button className={button} type='button'>Binnen</button>
            </Link>
                {avgNightTemp < 10 && <span className={recommend}>Aanrader!</span>}
            </div>
        </div>
    )
}