import {useState, useContext} from "react"
import {useForm} from "react-hook-form"
import drinks from '../../../data/drinks.json'
import {colorCoderAPL} from "../../../helpers/colorCoderAPL";
import { DrunkModeContext } from "../../../context/DrunkModeContextProvider"
import content from "../../../data/content.json"

export const Alcalculator = () => {
    const { mode } = useContext(DrunkModeContext)
    const { [mode]: {alcocalculatorCN: {
        tab,
        calcForm,
        formLabel,
        selector,
        option,
        drinkField,
        sizeField,
        alcoholField,
        priceField,
        submitButton,
        comparatorTitle,
        comparatorTab,
        comparatorList,
        comparatorItem,
        comparatorItemName,
        comparatorEuro,
        comparatorItemApl,
        comparatorItemAplName,
        comparatorItemAplExplain}
    } } = content
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
                <li key={comparator.length} className={comparatorItem}>
                {category > drinks.length - 2
                    ?
                    <span className={comparatorItemName}>{other}</span>
                    :
                    <span className={comparatorItemName}>{drinks[category].name}</span>}
                <span className={comparatorEuro}> € </span>
                <span className={comparatorItemApl}>
                <span className={colorCoderAPL(alcPerLiter)}>{alcPerLiter}</span>
            </span>
                <span className={comparatorItemAplName}> A.P.L.</span>
            </li>]
        )
        reset({})

    }
    return (
        <div className={tab}>
            <form className={calcForm} onSubmit={handleSubmit(onSubmit)}>
                <label className={formLabel} htmlFor='drink-kind'>soort versnapering</label>
                    <select className={selector} id='drink-kind'{...register('category')}>
                    {drinks.map((drink) => {
                        return (
                            <option className={option} key={drink.id} value={drink.id}>{drink.name}</option>
                        )
                    })}
                </select>
                {selectedBooze > drinks.length - 2 && (
                    <input className={drinkField} type='text' name='other' placeholder='drank' {...register('other')}/>
                )}
                {selectedBooze > 0 && <>
                    <label className={formLabel} htmlFor='volume'>Inhoudsmaat</label>
                    <select className={selector} id='volume' {...register('size')}>
                        <option className={option} value=""/>
                        {drinks[selectedBooze].sizes.map((size) => {
                            return (
                                <option className={option} key={size} value={size}>{size / 10}Cl</option>
                            )
                        })}
                        <option className={option} value="Anders">Anders</option>
                    </select>

                    {selectedSize === 'Anders' && (
                        <input type='text' className={sizeField} name='other-size' placeholder='inhoudsmaat (cl)' {...register('otherSize')}/>)}
                    <label className={formLabel} htmlFor='alcohol'>Alcohol</label>
                    <select id='alcohol' className={selector} {...register('percentage',)}>
                        <option value=""/>
                        {drinks[selectedBooze].percentages.map((percentage) => {
                            return (
                                <option className={option} key={percentage} value={percentage}>{percentage}%</option>
                            )
                        })}
                        <option className={option} value="other">Anders</option>
                    </select>
                    {selectedPercentage === 'other' && (
                        <>
                        <label className={formLabel} htmlFor='custom-alcohol'>
                            Alcohol</label>
                            <input type='number'
                                   name='otherPercentage'
                                   className={alcoholField}
                                   id='custom-alcohol'
                                   placeholder='Alcoholpercentage'
                                   {...register(
                                       'otherPercentage',
                                       {
                                           maxLength: 2,
                                           minLength: 1
                                       })}/>
                            %
                        </>)}
                </>}
                <label>€
                    <input type='text'
                           name='price'
                           className={priceField}
                           placeholder='prijs'
                           {...register(
                               'price',
                               {pattern: /^[0-9]+(\.[0-9][0-9]?)?$/i,}
                           )}/>
                </label>
                <button className={submitButton} name='submit' type='submit'>Verzend</button>
                {error && <p className='error-message'>{error}</p>}
            </form>
            <div className={comparatorTab}>
            <h1 className={comparatorTitle}>VERGELIJKER</h1>
            <ul className={comparatorList}>
            {comparator && comparator.map((result) => {
                return result
            })}
        </ul>
            <p className={comparatorItemAplExplain}>*A.P.L.= Alcohol per Liter</p>
        </div>
        </div>
    )
}
