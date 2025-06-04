import logo from '../../assets/icons/logo.svg'
import basket from '../../assets/icons/basket.svg'
import classNames from 'classnames'
import stylles from './Header.module.scss'
import { HeaderForm } from './HeaderForm/HeaderForm'


export const Header = () => {

    return (
        <header className="!flex !items-center justify-between gap-x-5 min-h-[clamp(70px,45.704px+7.593vw,152px)] !border-b  !border-gray-200 ss-320:!py-3.5 ss-320:items-start">
            <div className='flex items-end gap-x-6  ss-320:flex-col ss-320:items-start ss-320:gap-5 ss-320:justify-end 
             sm:flex-row sm:items-center sm:gap-x-8 '>
                <div className='flex gap-x-3 items-center'>
                    <div className='max-w-[clamp(25px,20.556px+1.389vw,40px)]'>
                        <img className='max-w-[100%]' src={logo} alt="logo" />
                    </div>
                    <div>
                        <div className='text-[clamp(14px,8.444px+1.111vw,24px)] font-extrabold uppercase max-w-20 ss-550:max-w-none'>La pizzeria</div>
                        <div className='text-my-gray-text hidden md:block'>the most delicious pizza in the universe</div>
                    </div>
                </div>
                <HeaderForm />
            </div>
            <div className={classNames('min-h-[clamp(30px,17.593px+2.315vw,40px)] bg-my-orange flex gap-x-5 !px-[clamp(18px,15.037px+0.926vw,28px)] rounded-3xl ss-320:self-start sm:self-center sm:gap-x-7 ', stylles.button)}>
                <div className='grow-0 shrink-0 basis-1/2 flex gap-x-2 text-white font-bold items-center'>
                    <span>520</span>
                    <span>$</span>
                </div>
                <div className='grow-0 shrink-0 basis-1/2 flex gap-x-2 items-center'>
                    <div className='basis-3.5 min-w-3.5'>
                        <img src={basket} alt="basket" />
                    </div>
                    <div className='text-white font-bold'>3</div>
                </div>
            </div>
        </header>
    )
}