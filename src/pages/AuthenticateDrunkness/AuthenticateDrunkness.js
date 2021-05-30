import React, { useContext } from "react"
import {Link, Redirect} from "react-router-dom";
import { DrunkModeContext } from "../../context/DrunkModeContextProvider"

export const AuthenticateDrunkness = () => {
    const { toggleMode, toggleAA, mode } = useContext(DrunkModeContext)
    return (
        <>
        {mode === 'dm' ? <div className='auth-tab'>
            <p className='auth-question'>Misschien niet meer drinken?</p>
            <div className='auth-button-wrapper'>
                <Link to='/'>
                    <button type='button' className='auth-button'>
                        OK</button>
                </Link>
                <Link to='/drinken'>
                    <button type='button' onClick={toggleAA} className='auth-button'>
                        Wel!</button>
                </Link>
                <Link to='/drinken'>
                    <button type='button' onClick={toggleMode} className='auth-button' id='auth-not-drunk-button'>
                        Druk hier als u er van overtuigd bent niet in beschonken toestand te verkeren</button>
                </Link>
            </div>
        </div> : <Redirect to='/drinken'/> }
        </>

    )
}