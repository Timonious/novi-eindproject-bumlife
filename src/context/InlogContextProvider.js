import React, {createContext, useState} from 'react'

export const InlogContext = createContext(null)

export const InlogContextProvider = ({children}) => {
    const [loggedIn, toggleLoggedIn] = useState(false)
    const [name, setName] = useState('')
    const logToggle = () => {
        if (loggedIn) {
            toggleLoggedIn(false)
            setName('')
        } else {
            toggleLoggedIn(true)
        }
    }
    return (
        <InlogContext.Provider value={{
            logToggle,
            setName,
            loggedIn: loggedIn,
            name: name
        }}>
            {children}
        </InlogContext.Provider>
    )
}
