import React from "react"
import {Link} from "react-router-dom"

export const Sleep = () => {
    return (
        <>
            <p>weer logica</p>
            <Link to='/blote-hemel'>
                <button type='button'>Buiten</button>
            </Link>
            <p>Conditioneel gerenderde button, met weer als conditie</p>
            <Link to='/overdekt'>
                <button type='button'>Overdekt</button>
            </Link>
            <p>Conditioneel gerenderde button, met weer als conditie</p>
            <Link to='/is-er-geld'>
                <button type='button'>Binnen</button>
            </Link>


        </>
    )
}