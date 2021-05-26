import React, {useEffect, useState} from "react";
import {secondsToHm} from "../helpers/secondsToHm";

export const SunsetCounter = ({weatherData, error}) => {
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
                if (now > sunset) {
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
            <p className='string-counter'>
                <span className='counter'>{secondsToHm(sunsetCountdown)}
                </span> tot zonsondergang</p>}
            {dawnCountdown &&
            <p className='string-counter'>
                <span className='counter'>{secondsToHm(dawnCountdown)}
                </span> tot zonsopgang
            </p>}
            {error && <p>error in countdown</p>}
        </>
    )
}