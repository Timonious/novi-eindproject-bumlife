import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {DrunkModeSwitch} from '../drunkModeSwitch/DrunkModeSwitch'
import {InlogContext} from '../../context/InlogContextProvider'
import logo from '../../assets/bumlife-logo-nobg.png'
import './header.css'

export const Header = () => {
    const {logToggle, loggedIn, name} = useContext(InlogContext)
    const history = useHistory()
    return (
        <div className='header'>
            <div className='back-logo-wrap'>
                <img
                    src={logo}
                    alt='logo'
                    className='logo'
                onClick={() => history.push('/')}/>
                    <NavLink exact to='/' activeClassName='active' className='back-txt'>
                Terug naar hoofd pagina</NavLink>
        </div>
            {loggedIn ? <div className='header-logged-in-name'>{name}
                <button
                    type='button'
                    className='log-off-on'
                    onClick={logToggle}>
                    log uit
                </button>
            </div> :
                <div className='header-logged-in-name'>Gast
                <button
                type='button'
                className='log-off-on'
                onClick={() => history.push('/log-in')}>
                log in
                </button>
                </div>
            }
            <DrunkModeSwitch/>
        </div>
    )
}
