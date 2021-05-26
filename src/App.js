import React, {useState, useEffect} from 'react'
import './App.css'
import {Switch, Route} from 'react-router-dom'
import {Header} from "./components/Header"
import {Main} from "./pages/main/Main"
import {Drink} from "./pages/drink/Drink"
import {Sleep} from "./pages/sleep/Sleep"
import {FindPlace} from "./pages/location page/FindPlace"
import {FundQuery} from "./pages/sleep/FundQuery"
import {Alcalculator} from "./pages/drink/alcalculator/Alcalculator"
import {SunsetCounter} from "./components/SunsetCounter";
import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY_WEATHER

function App() {
    const [lat, setLat] = useState(null)
    const [lon, setLon] = useState(null)
    const [latRound, setLatRound] = useState(null)
    const [lonRound, setLonRound] = useState(null)
    const [error, setError] = useState(false)
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        function success(position) {
            if (position.coords.latitude > 0 && position.coords.longitude > 0) {
                setLat(position.coords.latitude)
                setLonRound(Math.round(position.coords.longitude))
                setLon(position.coords.longitude)
                setLatRound(Math.round(position.coords.latitude))
            }
        }
        navigator.geolocation.getCurrentPosition(success)

    }, [])

    async function getWeather() {
        setLoading(true)
        setError(false)
        try {
            const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latRound}&lon=${lonRound}&units=metric&exclude=minutely&appid=${apiKey}`)
            setWeatherData(data)
        } catch (e) {
            console.error(e)
            setError(true)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (lonRound && latRound) {
            getWeather()
        }
    }, [lonRound, latRound])
    return (
        <>
            <Header/>
            {loading ? <p className='loading'>laden</p> : <SunsetCounter weatherData={weatherData} error={error}/>}

            <Switch>
                <Route path='/drinken'>
                    <Drink/>
                </Route>
                <Route path='/slapen'>
                    <Sleep weatherData={weatherData} error={error}/>
                </Route>
                <Route path='/alcocalculator'>
                    <Alcalculator/>
                </Route>
                <Route path='/is-er-geld'>
                    <FundQuery/>
                </Route>
                {/*de Findplace moet iets efficienter gemaakt worden, de queries moeten doorlopen worden, */}
               {/*en de resultaten gesorteerd op locatie weergegeven*/}
                <Route path='/:path'>
                    <FindPlace
                        lon={lon}
                        lat={lat}
                       />
                </Route>
                <Route path='/'>
                    <Main/>
                </Route>
            </Switch>
        </>
    )
}

export default App
