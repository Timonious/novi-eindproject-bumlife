import React, { useContext } from "react"
import {Link} from "react-router-dom"
import { DrunkModeContext } from "../../context/DrunkModeContextProvider"
import content from "../../data/content.json"

export const Main = () => {
    const { mode } = useContext(DrunkModeContext)
    return (
        <>
            <p>{mode}</p>
            <div className='button-container'>
                <Link to='/drinken'>
                    <button className='drink-button' type='button'>Drinken</button>
                </Link>
                <Link to='/slapen'>
                    <button className='drink-button' type='button'>Slapen</button>
                </Link>
                <Link to='/eten'>
                    <button className='drink-button' type='button'>Eten</button>
                </Link>
            </div>
        </>
    )
}