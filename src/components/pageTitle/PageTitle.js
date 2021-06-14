import React from 'react'
import './pageTitle.css'

export const PageTitle = ({params}) => {
    const title = () => {
        switch (params) {
            case "slapen":
                return "Slapen"
            case "eten":
                return "Eten"
            case "drinken":
                return "Drinken"
            case "is-er-geld":
            case "platte-pet":
            case "slaaphuis":
                return "Binnen Slapen"
            case "overdekt":
            case "blote-hemel":
                return "Buiten Slapen"
            case "alcoholocator":
                return "Alcoholocator"
            case "alcocalculator":
                return "Alcocalculator"
            case "log-in":
                return "Log In!"
            default:
                return ""
        }
    }
    return (
        <h1 className='page-title'>{title()}</h1>
    )
}


