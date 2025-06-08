import cartImage from '../assets/icons/basketBlack.svg'
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { selectCartPizza, selectTotalPrice } from '../redux/cart/cartSelectors';
import { CartPizza } from '../components/CartPizza/CartPizza';
import { clearCart } from '../redux/cart/cartSlice';
import { calcTotalCount } from '../utils/utils';
import { CartEmpty } from './СartEmpty';



const Cart = () => {
    const cartPizzas = useAppSelector(selectCartPizza);
    const dispatch = useAppDispatch();
    const totalPrice = useAppSelector(selectTotalPrice);
    const totalPizzas = calcTotalCount(cartPizzas);

    const clearCartHandler = () => {
        dispatch(clearCart())
    }

    if(!cartPizzas.length) return <CartEmpty />

    return (
        <div className='!pt-[clamp(50px,11.63px+5.741vw,92px)] !pb-[clamp(20px,-279.574px+29.255vw,130px)] '>
            <div className='max-w-235.5 !mx-auto'>
                <div className='flex items-center justify-between sm:!mb-22 xl:!mb-7.5'>
                    <div className='flex items-center gap-x-3'>
                        <div className='!w-7 !h-7 '>
                            <img className='max-w-full ' src={cartImage} alt="cartImage" />
                        </div>
                        <div className='font-bold text-[clamp(20px,15.259px+1.481vw,36px)] '>Basket</div>
                    </div>

                    <div onClick={clearCartHandler} className='flex items-center gap-x-3 text-gray-300 cursor-pointer hover:text-gray-400 duration-300 '>
                        <div className='hidden sm:block '><DeleteIcon className='!text-4xl' /></div>
                        <div className='text-xl '>Empty Trash</div>
                    </div>
                </div>
                <div className='!mb-25 flex flex-col gap-y-7.5 sm:!mb-45  xl:!mb-10'>
                    {
                        cartPizzas.map(pizza => <CartPizza key={pizza.id} {...pizza} />)
                    }
                </div>

                <div className='flex flex-col items-start gap-y-3.5 justify-between !mb-10 ss-420:flex-row ss-420:items-center '>
                    <div className='flex items-center gap-x-2 '>
                        <span className='text-[clamp(20px,18.815px+0.37vw,24px)]'>Total pizzas:</span>
                        <span className='text-[clamp(20px,18.815px+0.37vw,24px)] font-bold'>{totalPizzas}</span>
                    </div>
                    <div className='flex items-center gap-x-2 '>
                        <span className='text-[clamp(20px,18.815px+0.37vw,24px)]'>Order amount:</span>
                        <span className='text-[clamp(20px,18.815px+0.37vw,24px)] font-bold text-my-orange '>{totalPrice}</span>
                    </div>
                </div>

                <div className='flex flex-col gap-y-4 items-center justify-between ss-420:flex-row' >
                    <Link to={'/'} className='text-gray-300 min-h-[clamp(35px,22.889px+2.222vw,54px)] !border !border-gray-300 flex justify-center items-center
                       !px-[clamp(20px,14.074px+1.852vw,40px)] rounded-4xl cursor-pointer duration-300 hover:text-gray-400 hover:!border-gray-400
                        min-w-full ss-420:min-w-[clamp(140px,119.259px+6.481vw,210px)]
                       '>
                        <ArrowBackIosIcon className='!text-lg -translate-y-0.5 ' />
                        <span>Go back</span>
                    </Link>
                    <button className='text-white min-h-[clamp(35px,22.889px+2.222vw,54px)] bg-my-orange flex justify-center items-center
                       !px-[clamp(20px,14.074px+1.852vw,40px)] rounded-4xl cursor-pointer duration-300 hover:bg-orange-600 
                        min-w-full ss-420:min-w-[clamp(140px,119.259px+6.481vw,210px)]
                       '>Pay now</button>
                </div>
            </div>
        </div>
    )
};


export default Cart;

