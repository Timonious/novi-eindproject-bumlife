import React, {createContext, useState} from 'react'

export const DrunkModeContext = createContext(null)

export function DrunkModeContextProvider({children}) {
    const [isDrunk, toggleIsDrunk] = useState(false)
    const [mode, setMode] = useState('nm')
    const toggleMode = () => {
        if (isDrunk) {
            toggleIsDrunk(false)
            setMode('nm')
        } else {
            toggleIsDrunk(true)
            setMode('dm')
        }
    }
    return (
        <DrunkModeContext.Provider value={{
            toggleMode,
            mode: mode
        }}>
            {children}
        </DrunkModeContext.Provider>
    )
}
