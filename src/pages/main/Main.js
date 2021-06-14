import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {DrunkModeContext} from '../../context/DrunkModeContextProvider'
import {BackGround} from '../../components/backGround/Background'
import content from '../../data/content.json'
import './main.css'

export const Main = () => {
    const history = useHistory()
    const {mode} = useContext(DrunkModeContext)
    const {
        [mode]: {
            mainCN: {
                buttonContainer,
                drinkButton,
                sleepButton,
                eatButton
            }
        }
    } = content
    return (
        <>
            {mode === 'nm'&& <BackGround p='main'/>}
        <div className='tab'>
            <div className={buttonContainer}>
                    <button
                        className={drinkButton}
                        type='button'
                        onClick={() => history.push('/drinken')}
                    >Drinken</button>
                    <button
                        className={sleepButton}
                        type='button'
                        onClick={() => history.push('/slapen')}
                    >Slapen</button>
                    <button
                        className={eatButton}
                        type='button'
                        onClick={() => history.push('/eten')}
                    >Eten</button>
            </div>
        </div>
</>
    )
}