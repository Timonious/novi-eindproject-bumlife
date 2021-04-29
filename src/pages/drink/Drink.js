import React from "react"
import {Link} from "react-router-dom";

export const Drink = () => {
    return (
        <>
            <Link to='/alcoholocator'>
                <button type='button'>Alcoholocator</button>
            </Link>
            <p>vind alcoholische versnaperingen</p>
            <Link>
                <button type='button'>Alcocalculator</button>
            </Link>
            <p>en bereken de beste prijs!</p>
        </>
    )
}
