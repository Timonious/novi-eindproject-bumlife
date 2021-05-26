import React, { useState, useContext, useEffect } from 'react'
import { DrunkModeContext } from "../context/DrunkModeContextProvider"

export const DrunkModeSwitch = () => {
    const [checked, toggleChecked] = useState(false)
    const { toggleMode } = useContext(DrunkModeContext)
    useEffect(()=> toggleMode, [checked])
    return (
        <div className='switch-wrapper'>
            <input
            type='checkbox'
            className='switch'
            checked={checked}
            onChange={() => toggleChecked(!checked)}
            />
            <p className='switch-label'>Drunk-mode</p>
        </div>
    )
}