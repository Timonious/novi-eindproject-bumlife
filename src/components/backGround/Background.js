import React from 'react'
import drinkMobBack from '../../assets/drink-mob.jpg'
import drinkWebBack from '../../assets/drink-web.jpg'
import sleepMobBack from '../../assets/sleep-mob.jpg'
import sleepWebBack from '../../assets/sleep-web.jpg'
import eatMobBack from '../../assets/eat-mob.jpg'
import eatWebBack from '../../assets/eat-web.jpg'
import mobBack from "../../assets/main-mob.jpg";
import webBack from "../../assets/main-web.jpg";
import './background.css'

export const BackGround = ({p}) => {
    const title = () => {
        switch (p) {
            case "slapen":
            case "is-er-geld":
            case "platte-pet":
            case "slaaphuis":
            case "blote-hemel":
            case "overdekt":
                return (
                    <>
                        <img alt='background' className='sleep-background-mob' src={sleepMobBack}/>
                        <img alt='background' className='sleep-background-web' src={sleepWebBack}/>
                    </>
                )
            case "eten":
                return (
                    <>
                        <img alt='background' className='eat-background-mob' src={eatMobBack}/>
                        <img alt='background' className='eat-background-web' src={eatWebBack}/>
                    </>
                )
            case "alcoholocator":
            case "drinken":
            case "alcocalculator":
                return (
                    <>
                        <img alt='background' className='drink-background-mob' src={drinkMobBack}/>
                        <img alt='background' className='drink-background-web' src={drinkWebBack}/>
                    </>
                )
            default:
                return (
                <>
                    <img alt='background' className='main-background-mob' src={mobBack}/>
                    <img alt='background' className='main-background-web' src={webBack}/>
                </>
                )
        }
    }
    return title()
}
