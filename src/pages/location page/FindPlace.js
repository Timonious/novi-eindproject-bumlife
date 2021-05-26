import React, {useEffect, useState} from "react"
import {useParams, useRouteMatch} from 'react-router-dom'
import axios from "axios"
import {adress} from '../../helpers/adressSplit'
import placesQ from '../../data/placesQuery.json'

const apiKey = process.env.REACT_APP_API_KEY_MAPS

export const FindPlace = ({lon, lat}) => {
    const {path} = useParams()
    useRouteMatch('/:path')

    const i = placesQ.findIndex(x => x.path === path)
    const q = placesQ[i].queries
    const queryAmount = q.length
    const resultAmount = placesQ[i].resultAmount
    const maxDistance = placesQ[i].maxDistance

    const [mapError, setMapError] = useState(false)
    const [nothingNearbyError, setNothingNearbyError] = useState(false)
    const [error, setError] = useState(false)
    const [placeResult, setPlaceResult] = useState([])
    const [placesResultArray, setPlacesResultArray] = useState([])
    const [inRangePlaces, setInRangePlaces] = useState(null)
    const [coordinates, setCoordinates] = useState(null)
    const [map, setMap] = useState(null)
    const [loading, setLoading] = useState(false)

    async function getLocation(query) {
        setLoading(true)
        setError(false)
        try {
            console.log('ik haal places op')
            const {data: {items}} = await axios.get(`https://discover.search.hereapi.com/v1/discover?in=circle:${lat},${lon};r=${maxDistance}&q=${query}&apiKey=${apiKey}`)
            setPlaceResult(items)
        } catch (e) {
            console.error(e)
            setError(true)
        }
        setLoading(false)
    }

    async function getMap() {
        setLoading(true)
        setMapError(false)
        try {
            console.log('ik haal de map op')
            const {data} = await axios.get(`https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=${apiKey}&poi=${coordinates}&w=400&h=300&z=15`,
                {responseType: "blob"})
            setMap(URL.createObjectURL(data))
        } catch (e) {
            console.error(e)
            setMapError(true)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (lon && lat) {
            for (let j = 0; j < queryAmount; j++) {
                getLocation(q[j])
            }
        }
    }, [lon])

    useEffect(() => {
        if (placeResult.length > 0) {
            setPlacesResultArray([...placesResultArray, placeResult])
        }
    }, [placeResult])

    useEffect(() => {
        if (placesResultArray.length === queryAmount) {
            let combinedArray = []
            for (let j = 0; j < placesResultArray.length; j++) {
                for (let k = 0; k < placesResultArray[j].length; k++) {
                    combinedArray.push(placesResultArray[j][k])
                }
            }
            const filteredData = []
            const map = new Map()
            for (const item of combinedArray) {
                if (!map.has(item.position.lat && item.position.lng)) {
                    map.set(item.position.lat && item.position.lng, true)
                    filteredData.push({
                        distance: item.distance,
                        data: item.address.label,
                        lat: item.position.lat,
                        lon: item.position.lng
                    })
                }
            }
            filteredData.sort(function (a, b) {
                return a.distance - b.distance;
            })
            const slicedData = filteredData.slice(0, resultAmount)
            setInRangePlaces(slicedData)
            if (slicedData.length > 0) {
                let newArray = []
                for (let i = 0; i < slicedData.length; i++) {
                    newArray.push(slicedData[i].lat, slicedData[i].lon)
                }
                setCoordinates(newArray)
            } else {
                setNothingNearbyError(true)
            }
        }
    }, [placesResultArray])

    useEffect(() => {
        if (coordinates) {
            getMap()
        }
    }, [coordinates])
    return (
        <>
            {nothingNearbyError && <p>Helaas is er geen LOCATIE in de buurt gevonden</p>}
            {mapError && <p>Er is iets misgegaan bij het ophalen van het kaartje, probeer het later opnieuw</p>}
            {error && <p>Er is iets misgegaan met het ophalen van de gegevens, probeer het later opnieuw</p>}
            {loading && <p>laden</p>}
            {map && <img alt='map' src={map}/>}
            {coordinates && <ul className='places-list'> {
                inRangePlaces.map((place) => {
                        return (
                            <li className='place-item' key={place.data}>
                                <span className='place-name'>{adress(place.data)[0]}</span>
                                <span className='place-street'>{adress(place.data)[1]}</span>
                                <span className='place-postal'>{adress(place.data)[2]}</span>
                                <button className='go-button' type='button'>Go!</button>
                            </li>
                        )
                    }
                )
            }
            </ul>
            }
        </>
    )

}