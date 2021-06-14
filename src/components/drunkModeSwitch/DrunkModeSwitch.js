import React, {useContext} from 'react'
import {DrunkModeContext} from "../../context/DrunkModeContextProvider"
import './drunkModeSwitch.css'

export const DrunkModeSwitch = () => {
    const {toggleMode, mode} = useContext(DrunkModeContext)
    return (
        <div className='switch-wrapper'>
            {mode === 'dm' ?
                <button
                    type='button'
                    className='switch'
                    onClick={toggleMode}
                ><span className='flick'/><span className='onOff'>on</span></button>
                :
                <button
                    type='button'
                    className='switch'
                    onClick={toggleMode}
                ><span className='onOff'>off</span><span className='flick'/></button>
            }
            <span className='switch-text'>
                drunk-mode
            </span>
        </div>
    )
}
