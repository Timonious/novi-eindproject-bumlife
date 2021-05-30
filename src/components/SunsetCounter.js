import React, {useEffect, useState, useContext} from "react";
import {secondsToHm} from "../helpers/secondsToHm";
import { DrunkModeContext } from "../context/DrunkModeContextProvider"
import content from "../data/content.json"


export const SunsetCounter = ({weatherData, error}) => {
    const { mode } = useContext(DrunkModeContext)
    const { [mode]: {sunCounterCN: {
        wrapper,
        time,
        text}
    } } = content
    const [sunsetCountdown, setSunsetCountdown] = useState(null)
    const [dawnCountdown, setDawnCountdown] = useState(null)

   const { current: {sunset, sunrise} } = weatherData
    useEffect(() => {
        if (weatherData) {
            setInterval(() => {
                const now = Math.floor(Date.now() / 1000)
                if (now > sunrise) {

                    setDawnCountdown(null)
                    setSunsetCountdown(sunset - now)
                }
                if (now > sunset && now < weatherData.daily[1].sunrise) {

                    setSunsetCountdown(null)
                    setDawnCountdown(weatherData.daily[1].sunrise - now)
                }
                if (now < sunset &&
                    now < sunrise) {

                    setSunsetCountdown(null)
                    setDawnCountdown(sunrise - now)
                }
            }, 1000)
        }
    }, [weatherData])
    return (
        <>
            {!sunsetCountdown && !dawnCountdown &&
            <p className='loading'>laden</p>}
            {sunsetCountdown &&
            <p className={wrapper}>
                <span className='counter'>{secondsToHm(sunsetCountdown)}
                </span><span className={text}> tot zonsondergang</span></p>}
            {dawnCountdown &&
            <p className={wrapper}>
                <span className={time} >{secondsToHm(dawnCountdown)}
                </span><span className={text}> tot zonsopgang</span>
            </p>}
            {error && <p className={error}>er is iets misgegaan met het ophalen van de zonne-data</p>}
        </>
    )
}