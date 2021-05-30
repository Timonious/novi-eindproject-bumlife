import React, {createContext, useState} from 'react'

export const DrunkModeContext = createContext(null)

export function DrunkModeContextProvider({children}) {
    const [admittedDrunk, toggleAdmittedDrunk] = useState(false)
    const [mode, setMode] = useState('nm')
    const toggleMode = () => {
        if (mode === 'dm') {
            setMode('nm')
            if (admittedDrunk) {
                toggleAdmittedDrunk(false)
            }
        } else {
            setMode('dm')
        }
    }
    const toggleAA = () => {
        if (admittedDrunk) {
            toggleAdmittedDrunk(false)
        }
        else {
            toggleAdmittedDrunk(true)
        }
    }
    return (
        <DrunkModeContext.Provider value={{
            toggleMode,
            toggleAA,
            mode: mode,
            isDrunk: admittedDrunk
        }}>
            {children}
        </DrunkModeContext.Provider>
    )
}
