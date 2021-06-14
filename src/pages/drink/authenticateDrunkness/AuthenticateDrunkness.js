import React, {useContext} from 'react'
import {useHistory, Redirect} from 'react-router-dom'
import {DrunkModeContext} from '../../../context/DrunkModeContextProvider'
import './authenticateDrunkness.css'

export const AuthenticateDrunkness = () => {
    const history = useHistory()
    const {toggleMode, toggleAA, mode} = useContext(DrunkModeContext)
    const isNotSoDrunk = () => {
        toggleMode()
        history.push('/drinken')
    }
    const isDrunkDoesntCare = () => {
        toggleAA()
        history.push('/drinken')
    }
    return (
        <>
            {mode === 'dm' ?
                <div className='tab'>
                    <p className='auth-question'>Misschien niet meer drinken?</p>
                    <button
                        type='button'
                        className='auth-button'
                        onClick={() => {
                            history.push('/')
                        }}
                    >OK
                    </button>
                    <button
                        type='button'
                        onClick={isDrunkDoesntCare}
                        className='auth-button'
                    >Wel!
                    </button>
                    <button
                        type='button'
                        onClick={isNotSoDrunk}
                        className='auth-button'
                        id='auth-not-drunk-button'
                    >Druk hier als u er van overtuigd bent niet in beschonken toestand te verkeren
                    </button>

                </div> : <Redirect to='/drinken'/>}
        </>

    )
}