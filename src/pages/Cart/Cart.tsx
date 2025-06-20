import cartImage from '../../assets/icons/basketBlack.svg'
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { selectCartPizza, selectTotalPrice } from '../../redux/cart/cartSelectors';
import { CartPizza } from '../../components/CartPizza/CartPizza';
import { clearCart } from '../../redux/cart/cartSlice';
import { calcTotalCount } from '../../utils/utils';
import { CartEmpty } from '../СartEmpty/СartEmpty';
import Order from '../../components/Order/Order';
import { GoBack } from '../../components/Common/Goback/GoBack';


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
        <div className='!pt-[clamp(50px,11.63px+5.741vw,92px)] !pb-[clamp(20px,-3.704px+7.407vw,100px)] '>
            <div className='max-w-235.5 !mx-auto'>
                <div className='flex items-center justify-between !mb-[clamp(16px,2px+4.375vw,30px)] sm:!mb-22 xl:!mb-7.5'>
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
                <div className='!mb-25 flex flex-col gap-y-7.5 min-h-105 sm:!mb-45  xl:!mb-10'>
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
                <div className='flex flex-col gap-y-4 items-center ss-420:flex-row ss-420:justify-between ' >
                    <GoBack />
                    <div className='min-w-full ss-420:min-w-[clamp(140px,119.259px+6.481vw,210px)]'><Order /></div>
                </div>
            </div>
        </div>
    )
};


export default Cart;

