import React from "react"
import { NavLink } from "react-router-dom";

export const Main = () => {
    return (
        <>
            <NavLink exact to='/drinken' >
                <button type='button'>Drinken</button>
            </NavLink>
            <NavLink exact to='/slapen'>
                <button type='button'>Slapen</button>
            </NavLink>
            <NavLink exact to='/eten'>
                <button type='button'>Eten</button>
            </NavLink>

        </>
    )
}