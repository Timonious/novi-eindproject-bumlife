import React, {useEffect, useState, useContext} from 'react'
import {useParams, useRouteMatch, Redirect} from 'react-router-dom'
import axios from 'axios'
import {adress} from '../../helpers/adressSplit'
import {GoButton} from '../../components/goButton/GoButton'
import {PageTitle} from '../../components/pageTitle/PageTitle'
import {DrunkModeContext} from '../../context/DrunkModeContextProvider'
import content from '../../data/content.json'
import placesQ from '../../data/placesQuery.json'
import bottle from '../../assets/bottles.png'
import loadingImg from '../../assets/loading-man.png'
import './findPlace.css'
import {BackGround} from "../../components/backGround/Background";

const apiKey = process.env.REACT_APP_API_KEY_MAPS

export const FindPlace = ({lon, lat}) => {
    const {mode, isDrunk} = useContext(DrunkModeContext)
    const {
        [mode]: {
            findCN: {
                findLoading,
                placesList,
                placeName,
                placeStreet,
                placePostal,
                goButton,
                bottles
            }
        }
    } = content

    const {path} = useParams()
    useRouteMatch('/:path')
    const i = placesQ.findIndex(x => x.pathName === path)
    const {[i]: {resultAmount, resultAmountDm, maxDistance, maxDistanceDm, queries}} = placesQ
    const [maxResults, setMaxResults] = useState(0)
    const [maxDist, setMaxDist] = useState(null)
    const [mapError, setMapError] = useState(false)
    const [nothingNearbyError, setNothingNearbyError] = useState(false)
    const [error, setError] = useState(false)
    const [placeResult, setPlaceResult] = useState(null)
    const [placesResultArray, setPlacesResultArray] = useState([])
    const [inRangePlaces, setInRangePlaces] = useState(null)
    const [coordinates, setCoordinates] = useState(null)
    const [map, setMap] = useState(null)
    const [loading, setLoading] = useState(false)

    const getLocation = async (query) => {
        setLoading(true)
        setError(false)
        try {
            const {data: {items}} = await axios.get(`https://discover.search.hereapi.com/v1/discover?in=circle:${lat},${lon};r=${maxDist}&q=${query}&apiKey=${apiKey}`)
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
            const {data} = await axios.get(`https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=${apiKey}&poi=${coordinates}&w=300&h=100&z=17&poithm=1&poifc=red&t=12`,
                {responseType: 'blob'})
            setMap(URL.createObjectURL(data))
        } catch (e) {
            console.error(e)
            setMapError(true)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (mode === 'dm') {
            setMaxResults(resultAmountDm)
            setMaxDist(maxDistanceDm)
        }
        if (mode === 'nm') {
            setMaxResults(resultAmount)
            setMaxDist(maxDistance)
        }
        setPlacesResultArray([])
        setMap(null)
        setNothingNearbyError(false)
    }, [mode])
    useEffect(() => {
        if (lon && lat && maxDist) {
            for (let i = 0; i < queries.length; i++) {
                getLocation(queries[i])
            }
        }
    }, [lon, maxDist])

    useEffect(() => {
        if (placeResult) {
            setPlacesResultArray([...placesResultArray, placeResult])
        }
    }, [placeResult])


    useEffect(() => {
        if (placesResultArray.length === queries.length) {
            let combinedFilteredArray = []
            const map = new Map()
            for (let i = 0; i < placesResultArray.length; i++) {
                for (let j = 0; j < placesResultArray[i].length; j++) {
                    for (const item of placesResultArray[i]) {
                        if (!map.has(item.position.lat && item.position.lng)) {
                            map.set(item.position.lat && item.position.lng, true)
                            combinedFilteredArray.push({
                                data: item.address.label,
                                distance: item.distance,
                                lat: item.position.lat,
                                lon: item.position.lng
                            })
                        }
                    }
                }
            }
            combinedFilteredArray.sort(function (a, b) {
                return a.distance - b.distance;
            })
            const slicedData = combinedFilteredArray.slice(0, maxResults)
            setInRangePlaces(slicedData)
            if (slicedData.length > 0) {
                let CoordinateArray = []
                for (let i = 0; i < slicedData.length; i++) {
                    CoordinateArray.push(slicedData[i].lat, slicedData[i].lon)
                }
                setCoordinates(CoordinateArray)
            } else {
                setNothingNearbyError(true)
            }
        }
    }, [placesResultArray, maxResults])

    useEffect(() => {
        if (coordinates) {
            getMap()
        }
    }, [coordinates])

    return (
        <>
           {mode === 'nm'&& <BackGround p={path}/>}
            <PageTitle params={path}/>
            {path === 'alcoholocator' && mode === 'dm' && !isDrunk ? <Redirect to='/is-dit-wel-verstandig'/> :
                <div className='tab'>
                    {nothingNearbyError &&
                    <p className='find-error'>Helaas is er geen LOCATIE in de buurt gevonden</p>}
                    {mapError &&
                    <p className='find-error'>Er is iets misgegaan bij het ophalen van het kaartje, probeer het later
                        opnieuw</p>}
                    {error &&
                    <p className='find-error'>Er is iets misgegaan met het ophalen van de gegevens, probeer het later
                        opnieuw</p>}
                    {loading && <div><img alt='loading' src={loadingImg} className='loading-img'/><p className={findLoading}>Een moment geduld, gegevens worden opgehaald</p></div>}
                    {map && <img className='find-map' alt='map' src={map}/>}
                    {coordinates && <ul className={placesList}> {
                        inRangePlaces.map((place) => {
                                const {data} = place
                                return (
                                    <li className='find-place-item' key={data}>
                                        <div className='place-text-wrap'>
                                            <span className={placeName}>{adress(data)[0]}</span>
                                            <span className={placeStreet}>{adress(data)[1]}</span>
                                            <span className={placePostal}>{adress(data)[2]}</span>
                                        </div>
                                        <GoButton
                                            cN={goButton}
                                            name={adress(data)[0]}
                                            street={adress(data)[1]}
                                            postal={adress(data)[2]}
                                            lon={lon}
                                            lat={lat}/>
                                    </li>
                                )
                            }
                        )
                    }
                    </ul>
                    }
                    {path === 'alcoholocator' && <img alt='flessen' src={bottle} className={bottles}/>}
                </div>
            }</>
    )
}
