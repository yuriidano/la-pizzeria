import logo from '../../assets/icons/logo.svg'
import basket from '../../assets/icons/basket.svg'
import classNames from 'classnames'
import stylles from './Header.module.scss'
import { HeaderForm } from './HeaderForm/HeaderForm'


export const Header = () => {

    return (
        <header className="!flex !items-center justify-between min-h-38 !border-b  !border-gray-200">
            <div className='flex items-end gap-x-6'>
                <div className='flex gap-x-3 items-center'>
                    <div>
                        <img className='max-w-full' src={logo} alt="logo" />
                    </div>
                    <div>
                        <div className='text-2xl font-extrabold '>REACT PIZZA</div>
                        <div className='text-my-gray-text'>the most delicious pizza in the universe</div>
                    </div>
                </div>
                <HeaderForm />
            </div>
            <div className={classNames('min-h-12.5 bg-my-orange inline-flex gap-x-7 !px-7 rounded-3xl', stylles.button)}>
                    <div className='flex gap-x-2 text-white font-bold items-center'>
                        <span>520</span>
                        <span>$</span>
                    </div>
                    <div className='flex gap-x-2 items-center'>
                        <div>
                            <img src={basket} alt="basket" />
                        </div>
                        <div className='text-white font-bold'>3</div>
                    </div>
            </div>
        </header>
    )
}