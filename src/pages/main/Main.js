import React from "react"
import { Link } from "react-router-dom";

export const Main = () => {
    return (
        <>

            <Link to='/drinken' >
                <button type='button'>Drinken</button>
            </Link>
            <Link to='/slapen'>
                <button type='button'>Slapen</button>
            </Link>
            <Link to='/eten'>
                <button type='button'>Eten</button>
            </Link>
            <Link to='/sperma'>
                <button type='button'>Test</button>
            </Link>

        </>
    )
}