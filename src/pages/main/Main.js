import React from "react"
import { Link } from "react-router-dom";

export const Main = () => {
    return (
        <>
            <Link exact to='/drinken' >
                <button type='button'>Drinken</button>
            </Link>
            <Link exact to='/slapen'>
                <button type='button'>Slapen</button>
            </Link>
            <Link exact to='/eten'>
                <button type='button'>Eten</button>
            </Link>

        </>
    )
}