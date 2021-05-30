import React from 'react'
import {NavLink} from "react-router-dom";
import {DrunkModeSwitch} from "./DrunkModeSwitch";
import logo from '../assets/logo-bumlife.jpg'


export const Header = () => {
    return (
        <span className='header'><div className='logo-wrapper'>
            <NavLink activeClassName="active" to='/'><img src={logo} alt='logo' className='logo'/>Terug naar hoofdpagina</NavLink></div>
            <DrunkModeSwitch/>
        </span>
    )
}
