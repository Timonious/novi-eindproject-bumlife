import React from 'react'
import {Link} from 'react-router-dom'

export const GoButton = ({name, street, postal, lon, lat, cN}) => {
    const prepareElements = (e) => {
        e.trim().split(' ').join('+')
    }
    const url = `https://www.google.nl/maps/dir/${lat},${lon}/${prepareElements(name)},${prepareElements(street)},${prepareElements(postal)}/data=!4m2!4m1!3e2`
    return (
        <Link to={{pathname: url}} target="_blank">
            <button className={cN} type='button'>Go!</button>
        </Link>
    )
}
