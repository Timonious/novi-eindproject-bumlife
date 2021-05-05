import {useState} from "react"
import {useForm} from "react-hook-form"
import drinks from '../../../data/drinks.json'
import {ColorCoderAPL} from "../../../components/ColorCoderAPL";

export const Alcalculator = () => {
    const [comparator, setComparator] = useState([])
    const [error, setError] = useState('')
    const {register, handleSubmit, watch, reset} = useForm(
        {criteriaMode: 'all', mode: "onSubmit"})
    const selectedBooze = watch('category')
    const selectedSize = watch('size')
    const selectedPercentage = watch('percentage')
    const onSubmit = ({size, percentage, price, category, other, otherSize, otherPercentage}) => {
        setError('')
        if (!category) { setError('Geen drank ingevoerd')
            return }
        if (otherSize) size = otherSize*10
        if (!size) { setError('Geen inhoudsmaat ingevoerd')
            return }
        if (otherPercentage) percentage = otherPercentage
        if (!percentage) { setError('Geen alcoholpercentage ingevoerd')
            return }
        if (!price) { setError('Geen prijs ingevoerd')
            return }
        const alcPerLiter = Math.round(price / size * 1000 / percentage * 100)
            setComparator(
                [...comparator, <li key={comparator.length}>
                    {category > drinks.length-2
                        ?
                        <span className='drink-name'>{other}</span>
                        :
                        <span className='drink-name'>{drinks[category].name}</span>}
                    <span className='euro-teken'> € </span>
                    <span className={ColorCoderAPL(alcPerLiter)}>{alcPerLiter}</span>
                    <span className='apl'> A.P.L.</span>
                </li>]
            )
reset({})
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>soort versnapering <select {...register('category' )}>
                    {drinks.map((drink) => {
                        return (
                            <option key={drink.id} value={drink.id}>{drink.name}</option>
                        )
                    })}
                </select></label>
                {selectedBooze > drinks.length-2 && (
                        <input type='text' name='other' placeholder='drank' {...register('other')}/>
                )}
                {selectedBooze > 0 && <>
                    <label>Inhoudsmaat<select {...register('size')}>
                        <option value=""> </option>
                        {drinks[selectedBooze].sizes.map((size) => {
                            return (
                                <option key={size} value={size}>{size / 10}Cl</option>
                            )
                        })}
                        <option value="Anders">Anders</option>
                    </select>
                    </label>
                    {selectedSize === 'Anders' && (
                        <input type='text' name='other-size' placeholder='inhoudsmaat' {...register('otherSize')}/>)}
                    <label>Alcohol<select {...register('percentage', )}>
                        <option value=""> </option>
                        {drinks[selectedBooze].percentages.map((percentage) => {
                            return (
                                <option key={percentage} value={percentage}>{percentage}%</option>
                            )
                        })}
                        <option value="other">Anders</option>
                    </select></label>
                    {selectedPercentage === 'other' && (
                        <label>
                            Alcohol
                            <input type='number'
                                   name='otherPercentage'
                                   className='custom-percentage'
                                   placeholder='Alcoholpercentage'
                                   {...register(
                                       'otherPercentage',
                                       {
                                           maxLength: 2,
                                           minLength: 1
                                       })}/>
                                   %
                        </label>  )}
                </>}
                <label>€
                    <input type='text'
                           name='price'
                           className='price-input'
                               placeholder='prijs'
                           {...register(
                               'price',
                               {pattern: /^[0-9]+(\.[0-9][0-9]?)?$/i,}
                           )}/>
                </label>
                <button name='submit' type='submit'>Verzend</button>
                {error && <p className='error-message'>{error}</p>}
            </form>
            <h1>VERGELIJKER</h1>
            {comparator && comparator.map((result) => {
                return result
            })}
            <h2>*A.P.L.= Alcohol per Liter</h2>
        </>
    )
}
