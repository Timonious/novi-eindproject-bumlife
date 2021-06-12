import React, {useState, useEffect, useContext} from 'react'
import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'
import axios from "axios"
import {Header} from "./components/header/Header"
import {Main} from "./pages/main/Main"
import {Drink} from "./pages/drink/Drink"
import {Sleep} from "./pages/sleep/Sleep"
import {FindPlace} from "./pages/location page/FindPlace"
import {FundQuery} from "./pages/sleep/FundQuery"
import {Alcocalculator} from "./pages/drink/alcocalculator/Alcocalculator"
import {SunsetCounter} from "./components/sunsetCounter/SunsetCounter"
import {AuthenticateDrunkness} from "./pages/drink/AuthenticateDrunkness"
import {DrunkModeContext} from "./context/DrunkModeContextProvider"
import {InlogContext} from "./context/InlogContextProvider";
import {LogIn} from "./pages/logIn/LogIn";
import content from "./data/content.json"

const apiKey = process.env.REACT_APP_API_KEY_WEATHER

const App = () => {
    const {loggedIn} = useContext(InlogContext)
    const {isDrunk, mode} = useContext(DrunkModeContext)
    const [lat, setLat] = useState(null)
    const [lon, setLon] = useState(null)
    const [latRound, setLatRound] = useState(null)
    const [lonRound, setLonRound] = useState(null)
    const [error, setError] = useState(false)
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(true)
const {[mode]: {sunCounterCN:{midSection}}} = content

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

    const getWeather = async () => {
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
            <div className='curve-counter'>
            <div id='curved-corner'/>
            {loading ? <p className='loading'>laden</p> : <SunsetCounter weatherData={weatherData} error={error}/>}
        </div>
            <Switch>
                <Route path='/drinken'>
                    {!isDrunk && mode === 'dm' ? <Redirect to='/is-dit-wel-verstandig'/> : <Drink/>}
                </Route>
                <Route path='/slapen'>
                    <Sleep weatherData={weatherData} error={error}/>
                </Route>
                <Route path='/alcocalculator'>
                    {loggedIn ?
                        !isDrunk && mode === 'dm' ? <Redirect to='/is-dit-wel-verstandig'/> : <Alcocalculator/>
                        : <LogIn/>}
                </Route>
                <Route path='/is-er-geld'>
                    <FundQuery/>
                </Route>
                <Route path='/log-in'>
                    {loggedIn ? <Redirect to='/'/> : <LogIn/>}
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
