import React, {useState, useEffect, useContext} from 'react'
import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'
import axios from "axios"
import {Header} from "./components/Header"
import {Main} from "./pages/main/Main"
import {Drink} from "./pages/drink/Drink"
import {Sleep} from "./pages/sleep/Sleep"
import {FindPlace} from "./pages/location page/FindPlace"
import {FundQuery} from "./pages/sleep/FundQuery"
import {Alcalculator} from "./pages/drink/alcalculator/Alcalculator"
import {SunsetCounter} from "./components/SunsetCounter"
import {AuthenticateDrunkness} from "./pages/AuthenticateDrunkness/AuthenticateDrunkness"
import {DrunkModeContext, DrunkModeContextProvider} from "./context/DrunkModeContextProvider"

const apiKey = process.env.REACT_APP_API_KEY_WEATHER

const App = () => {

    const { isDrunk, mode } = useContext(DrunkModeContext)
    const [lat, setLat] = useState(null)
    const [lon, setLon] = useState(null)
    const [latRound, setLatRound] = useState(null)
    const [lonRound, setLonRound] = useState(null)
    const [error, setError] = useState(false)
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getCoords = (position) => {
            if (position.coords.latitude > 0 && position.coords.longitude > 0) {
                setLat(position.coords.latitude)
                setLonRound(Math.round(position.coords.longitude))
                setLon(position.coords.longitude)
                setLatRound(Math.round(position.coords.latitude))
            }
        }

        navigator.geolocation.getCurrentPosition(getCoords)

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
                    {!isDrunk && mode === 'dm' ? <Redirect to='/is-dit-wel-verstandig'/> : <Drink/>}
                </Route>
                <Route path='/slapen'>
                    <Sleep weatherData={weatherData} error={error}/>
                </Route>
                <Route path='/alcocalculator'>
                    {!isDrunk && mode === 'dm' ? <Redirect to='/is-dit-wel-verstandig'/> : <Alcalculator/>}
                </Route>
                <Route path='/is-er-geld'>
                    <FundQuery/>
                </Route>
                <Route path='/is-dit-wel-verstandig'>
                    <AuthenticateDrunkness/>
                </Route>
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
