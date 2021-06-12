import React, {useContext} from "react"
import {useHistory} from "react-router-dom"
import {DrunkModeContext} from "../../context/DrunkModeContextProvider"
import content from "../../data/content.json"
import {PageTitle} from "../../components/pageTitle/PageTitle";

export const FundQuery = () => {
    const history = useHistory()
    const {mode} = useContext(DrunkModeContext)
    const {
        [mode]: {
            fundQCN: {
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
        <>
            <PageTitle params={'is-er-geld'}/>
            <div className='tab'>
                <p className={questionCn}>{question}</p>
                    <button type='button' className={fundButton} onClick={() => history.push('/slaaphuis')}>{yes}</button>
                    <button type='button' className={fundButton} onClick={() => history.push('/platte-pet')}>{no}</button>
            </div>
        </>
    )
}
