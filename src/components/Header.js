import React from 'react'
import {NavLink} from "react-router-dom";

export const Header = () => {
    return (
        <>

        <h2>logo, back to <NavLink activeClassName="active" exact to='/'>home</NavLink> en drunk mode switch</h2>
        </>
    )
}
