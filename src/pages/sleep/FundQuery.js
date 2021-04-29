import React from "react"
import {Link} from "react-router-dom";

export const FundQuery = () => {
    return (
        <>
        <p>Kunt u heden een plaats in het slaaphuis financieren?</p>
        <Link to='/slaaphuis'>
            <button type='button'>ja zeker wel</button>
        </Link>
            <Link to='/platte-pet'>
                <button type='button'>helaas niet</button>
            </Link>
        </>
    )
}