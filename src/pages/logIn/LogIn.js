import React, {useContext, useState} from 'react'
import {PageTitle} from '../../components/pageTitle/PageTitle'
import {useForm} from 'react-hook-form'
import {InlogContext} from '../../context/InlogContextProvider'
import {DrunkModeContext} from '../../context/DrunkModeContextProvider'
import userData from '../../data/users.json'
import content from '../../data/content.json'
import './login.css'
import bottle from '../../assets/bottles.png'
import {BackGround} from "../../components/backGround/Background";


export const LogIn = () => {
    const {mode} = useContext(DrunkModeContext)
    const {
        [mode]: {
            inlogCN: {
                formCN,
                labelCN,
                inputCN,
                buttonCN,
                errorMsg,
                bottles
            }
        }
    } = content
    const [error, setError] = useState(' ')
    const {register, handleSubmit} = useForm(
        {criteriaMode: 'all', mode: 'onSubmit'})
    const {logToggle, setName} = useContext(InlogContext)
    const onSubmit = (data) => {
        setError(' ')
        const {userName, password} = data
        const findUser = (uNm) => {
            return uNm.user === userName
        }
        const authenticator = userData.find(findUser)
        if (authenticator) {
            if (authenticator.pass === password) {
                setName(userName)
                logToggle()
            } else {
                setError('helaas is dat wachtwoord fout')
            }
        } else {
            setError('helaas is deze naam niet gevonden')
        }
    }
    return (
        <>
            {mode === 'nm'&& <BackGround p='log-in'/>}
            <PageTitle params={'log-in'}/>
            <div className='tab'>
                <form className={formCN} onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor='username' className={labelCN}>naam
                        <input
                            name='username'
                            type='text'
                            className={inputCN}
                            {...register('userName')}
                        /></label>
                    <label htmlFor='password' className={labelCN}>wachtwoord
                        <input
                            name='password'
                            type='password'
                            className={inputCN}
                            {...register('password')}
                        /></label>
                    <button name='submit' type='submit' className={buttonCN}>
                        login
                    </button>
                    <p className={errorMsg}>{error}</p>
                </form>
                <img alt='flessen' src={bottle} className={bottles}/>
            </div>

        </>
    )
}