import React, {useContext} from "react"
import {useHistory} from "react-router-dom"
import {DrunkModeContext} from "../../context/DrunkModeContextProvider"
import content from "../../data/content.json"
import {PageTitle} from "../../components/pageTitle/PageTitle";
import './drink.css'
import bottle from '../../assets/bottles.png'

export const Drink = () => {
    const history = useHistory()
    const {mode} = useContext(DrunkModeContext)
    const {
        [mode]: {
            drinkCN: {
                drinkButton,
                drinkDescriptionCn,
                bottles
            },
            drinkTxt: {
                findDrinkTxt,
                calculateDrinkTxt
            }
        }
    } = content

    return (
        <>
            <PageTitle params={'drinken'}/>
            <div className='tab'>
                <div className='drink-content-container'>
                <div className='drink-button-container'>
                        <button
                            className={drinkButton}
                            type={bottles}
                            onClick={() => history.push('/alcoholocator')}
                        >Alcoholocator</button>
                    <p className={drinkDescriptionCn}>{findDrinkTxt}</p>
                </div>
                    <div className='drink-button-container'>
                        <button
                            className={drinkButton}
                            type='button'
                            onClick={() => history.push('/alcocalculator')}
                        >Alcocalculator</button>
                    <p className={drinkDescriptionCn}>{calculateDrinkTxt}</p>
                    </div>
                </div>
                <img alt='flessen'
                     src={bottle}
                     className={bottles}/>
            </div>
        </>
    )
}
