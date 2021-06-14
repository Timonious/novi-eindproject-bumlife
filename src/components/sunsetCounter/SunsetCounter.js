import React, {useEffect, useState, useContext} from 'react'
import {secondsToHm} from '../../helpers/secondsToHm'
import {DrunkModeContext} from '../../context/DrunkModeContextProvider'
import content from '../../data/content.json'
import './sunsetCounter.css'
import loadingImg from '../../assets/loading-man.png'

export const SunsetCounter = ({weatherData, error, loading}) => {
    const {mode} = useContext(DrunkModeContext)
    const {
        [mode]: {
            sunCounterCN: {
                wrapper,
                time,
                text
            }
        }
    } = content
    const [sunsetCountdown, setSunsetCountdown] = useState(null)
    const [dawnCountdown, setDawnCountdown] = useState(null)

    const {current: {sunset, sunrise}} = weatherData
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
            {loading && !sunsetCountdown && !dawnCountdown &&
            <div className='sun-load-wrap'>
                <img alt='loading' src={loadingImg} className='loading-img'/>
                <p className='loading'>zon zoom factor checken
                </p>
            </div>
            }
            {sunsetCountdown &&
            <div className={wrapper}>
                <span className={time}>{secondsToHm(sunsetCountdown)}
                </span><span className={text}> tot zonsondergang
            </span>
            </div>
            }
            {dawnCountdown &&
            <div className={wrapper}>
                <span className={time}>{secondsToHm(dawnCountdown)}
                </span>
                <span className={text}> tot zonsopgang
                </span>
            </div>}
            {error &&
            <p className={error}>er is iets misgegaan met het ophalen van de zonne-data
            </p>
            }
        </>
    )
}
