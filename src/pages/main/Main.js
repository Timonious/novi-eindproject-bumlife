import React, { useContext } from "react"
import {Link} from "react-router-dom"
import { DrunkModeContext } from "../../context/DrunkModeContextProvider"
import content from "../../data/content.json"

export const Main = () => {
    const { mode } = useContext(DrunkModeContext)
    const { [mode]: {mainCN: {
        buttonContainer,
        drinkButton,
        sleepButton,
        eatButton}
        } } = content
    return (
        <>
            <div className={buttonContainer}>
                <Link to='/drinken'>
                    <button className={drinkButton} type='button'>Drinken</button>
                </Link>
                <Link to='/slapen'>
                    <button className={sleepButton} type='button'>Slapen</button>
                </Link>
                <Link to='/eten'>
                    <button className={eatButton} type='button'>Eten</button>
                </Link>
            </div>
        </>
    )
}