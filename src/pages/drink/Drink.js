import React, {useContext} from "react"
import {Link} from "react-router-dom"
import {DrunkModeContext} from "../../context/DrunkModeContextProvider"
import content from "../../data/content.json"

export const Drink = () => {
    const {mode} = useContext(DrunkModeContext)
    const {[mode]: {
            drinkCN: {
                tab,
                drinkButtonContainer,
                alcoholocatorButton,
                alcocalculatorButton,
                findDrinkCn,
                calculateDrinkCn
            },
            drinkTxt: {
                findDrinkTxt,
                calculateDrinkTxt
            }
        }
    } = content

    return (
        <div className={tab}>
            <div className={drinkButtonContainer}>
                <Link to='/alcoholocator'>
                    <button className={alcoholocatorButton} type='button'>Alcoholocator</button>
                </Link>
                <p className={findDrinkCn}>{findDrinkTxt}</p>
                <Link to='alcocalculator'>
                    <button className={alcocalculatorButton} type='button'>Alcocalculator</button>
                </Link>
                <p className={calculateDrinkCn}>{calculateDrinkTxt}</p>
            </div>
        </div>
    )
}
