import React from 'react'
import {NavLink} from "react-router-dom";
import {DrunkModeSwitch} from "./DrunkModeSwitch";


export const Header = () => {
    return (
        <>

        <h2>logo, back to <NavLink activeClassName="active" to='/'>home</NavLink> en <DrunkModeSwitch/></h2>
        </>
    )
}
