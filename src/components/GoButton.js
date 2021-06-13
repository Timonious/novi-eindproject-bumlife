import React from 'react'

export const GoButton = ({name, street, postal, lon, lat, cN}) => {

    const prepareElements = (s) => {
        return s.trim().split(' ').join('+')
    }
    const url = `https://www.google.nl/maps/dir/${lat},${lon}/${prepareElements(name)},${prepareElements(street)},${prepareElements(postal)}/data=!4m2!4m1!3e2`
    return (
        <button
            className={cN}
            type='button'
            onClick={() => window.open(url, '_blank')}
        >Go!
        </button>
    )
}
