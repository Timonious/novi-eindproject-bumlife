import React, { useState, useContext, useEffect } from 'react'
import { DrunkModeContext } from "../context/DrunkModeContextProvider"

export const DrunkModeSwitch = () => {
    const { toggleMode, mode } = useContext(DrunkModeContext)
    return (
       <span className='switch-wrapper'>
            <button
            type='button'
            className='switch'
            onClick={toggleMode}
            >{mode==='dm' ? 'on' : 'off'}</button>
        Drunk-mode</span>
    )
}