import {useState, useContext} from 'react'
import {useForm} from 'react-hook-form'
import drinks from '../../../data/drinks.json'
import {colorCoderAPL} from '../../../helpers/colorCoderAPL'
import {DrunkModeContext} from '../../../context/DrunkModeContextProvider'
import {InlogContext} from '../../../context/InlogContextProvider'
import content from '../../../data/content.json'
import {PageTitle} from '../../../components/pageTitle/PageTitle'
import './alcocalculator.css'
import bottle from '../../../assets/bottles.png'
import mobBack from '../../../assets/drink-mob.jpg'
import webBack from '../../../assets/drink-web.jpg'
import {BackGround} from "../../../components/backGround/Background";

export const Alcocalculator = () => {
    const {name} = useContext(InlogContext)
    const {mode} = useContext(DrunkModeContext)
    const {[mode]: {
            alcocalculatorCN: {
                formLabel,
                option,
                submitButton,
                comparatorTitle,
                comparatorItemName,
                comparatorEuro,
                comparatorItemAplName,
                comparatorItemAplExplain,
                bottles
            }
        }
    } = content
    const [comparator, setComparator] = useState([])
    const [error, setError] = useState('')
    const {register, handleSubmit, watch, reset} = useForm(
        {criteriaMode: 'all', mode: "onSubmit"})
    const selectedBooze = watch('category')
    const selectedSize = watch('size')
    const selectedPercentage = watch('percentage')
    const onSubmit = ({size, percentage, price, category, other, otherSize, otherPercentage}) => {
        setError('')
        if (!category) {
            setError('Geen drank ingevoerd')
            return
        }
        if (otherSize) {
            size = otherSize * 10
        }
        if (!size) {
            setError('Geen inhoudsmaat ingevoerd')
            return
        }
        if (otherPercentage) {
            percentage = otherPercentage
        }
        if (!percentage) {
            setError('Geen alcoholpercentage ingevoerd')
            return
        }
        if (!price) {
            setError('Geen prijs ingevoerd')
            return
        }

        const alcPerLiter = Math.round(price / size * 1000 / percentage * 100)
        setComparator(
            [...comparator,
                <li key={comparator.length} className='calc-comp-item'>
                    {category > drinks.length - 2
                        ?
                        <span className={comparatorItemName}>{other}</span>
                        :
                        <span className={comparatorItemName}>{drinks[category].name}</span>}
                    <span className={comparatorEuro}> € </span>
                <span className={colorCoderAPL(alcPerLiter)}>{alcPerLiter}</span>
                    <span className={comparatorItemAplName}> A.P.L.</span>
                </li>]
        )
        reset({})
    }
    return (
        <>
            {mode === 'nm'&& <BackGround p='alcocalculator'/>}
            <PageTitle params={'alcocalculator'}/>
            <div className='tab'>
                <span className='welcome-back'>Welkom terug {name}</span>
                <div className='comp-calc-wrap'>

                    <form className='calc-form' onSubmit={handleSubmit(onSubmit)}>
                        <label className={formLabel} htmlFor='drink-kind'>Soort drank
                        <select className='calc-selector' id='drink-kind'{...register('category')}>
                            {drinks.map((drink) => {
                                return (
                                    <option className='calc-selector-option' key={drink.id} value={drink.id}>{drink.name}</option>
                                )
                            })}
                        </select></label>
                        {selectedBooze > drinks.length - 2 && (
                            <input autoComplete="off" className='calc-field' type='text' name='other'
                                   placeholder='drank' {...register('other')}/>)}
                        {selectedBooze > 0 && <>
                            <label className={formLabel} htmlFor='volume'>Inhoudsmaat
                            <select className='calc-selector' id='volume' {...register('size')}>
                                <option className='calc-selector-option' value=""/>
                                {drinks[selectedBooze].sizes.map((size) => {
                                    return (
                                        <option className='calc-selector-option' key={size} value={size}>{size / 10}Cl</option>
                                    )
                                })}
                                <option className={option} value="Anders">Anders</option>
                            </select></label>

                            {selectedSize === 'Anders' && (
                                <input type='text' className='calc-field' name='other-size' autoComplete='off'
                                       placeholder='inhoudsmaat (cl)' {...register('otherSize')}/>)}
                            <label className={formLabel} htmlFor='alcohol'>Alcohol
                            <select id='alcohol' className='calc-selector' {...register('percentage',)}>
                                <option value=''/>
                                {drinks[selectedBooze].percentages.map((percentage) => {
                                    return (
                                        <option className='calc-selector-option' key={percentage}
                                                value={percentage}>{percentage}</option>
                                    )
                                })}
                                <option className='calc-selector-option' value='other'>Anders</option>
                            </select></label>
                            {selectedPercentage === 'other' && (
                                <>
                                    <label className={formLabel} htmlFor='custom-alcohol'>
                                    <input type='number'
                                           name='otherPercentage'
                                           className='calc-field'
                                           autoComplete='off'
                                           placeholder='Alcoholpercentage'
                                           {...register(
                                               'otherPercentage',
                                               {
                                                   maxLength: 2,
                                                   minLength: 1
                                               })}/></label>

                                </>)}
                        </>}
                        <label className={formLabel}>Prijs
                            <input type='text'
                                   name='price'
                                   className='calc-field'
                                   autoComplete='off'
                                   {...register(
                                       'price',
                                       {pattern: /^[0-9]+(\.[0-9][0-9]?)?$/i,}
                                   )}/>
                        </label>
                        <button className={submitButton} name='submit' type='submit'>Alcalculeer!</button>
                        {error && <p className='error-message'>{error}</p>}
                    </form>
                    <div className='calc-comp-tab'>
                        <p className={comparatorTitle}>Vergelijker</p>
                        <ul className='calc-comp-list'>
                            {comparator && comparator.map((result) => {
                                return result
                            })}
                        </ul>
                        <p className={comparatorItemAplExplain}>*A.P.L.= Alcohol per Liter</p>
                    </div>
                </div>
                <img alt='flessen' src={bottle} className={bottles}/>
            </div>
        </>
    )
}
