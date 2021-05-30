import React, {useContext} from "react"
import {Link} from "react-router-dom"
import { DrunkModeContext } from "../../context/DrunkModeContextProvider"
import content from "../../data/content.json"

export const FundQuery = () => {
    const {mode} = useContext(DrunkModeContext)
    const {[mode]: {
        fundCN: {
            tab,
            questionCn,
            fundButton
        },
        fundTxt: {
            question,
            yes,
            no
        }
    }
    } = content
    return (
        <div className={tab}>
        <p className={questionCn}>{question}</p>
        <Link to='/slaaphuis'>
            <button type='button' className={fundButton}>{yes}</button>
        </Link>
            <Link to='/platte-pet'>
                <button type='button' className={fundButton}>{no}</button>
            </Link>
        </div>
    )
}