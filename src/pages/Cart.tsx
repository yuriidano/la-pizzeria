import cartImage from '../assets/icons/basketBlack.svg'
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { selectCartPizza, selectTotalPrice } from '../redux/cart/cartSelectors';
import { CartPizza } from '../components/CartPizza/CartPizza';
import { clearCart } from '../redux/cart/cartSlice';
import { calcTotalCount } from '../utils/utils';


const Cart = () => {
    const cartPizzas = useAppSelector(selectCartPizza);
    const dispatch = useAppDispatch();
    const totalPrice = useAppSelector(selectTotalPrice);
    const totalPizzas = calcTotalCount(cartPizzas);

    const clearCartHandler = () => {
        dispatch(clearCart())
    }

    return (
        <div className='!pt-23 !pb-32.5 '>
            <div className='max-w-235.5 !mx-auto'>
                <div className='flex items-center justify-between !mb-7.5'>
                    <div className='flex items-center gap-x-3'>
                        <div className='!w-7 !h-7 '>
                            <img className='max-w-full ' src={cartImage} alt="cartImage" />
                        </div>
                        <div className='font-bold text-4xl '>Basket</div>
                    </div>

                    <div onClick={clearCartHandler} className='flex items-center gap-x-3 text-gray-300 cursor-pointer hover:text-gray-400 duration-300 '>
                        <DeleteIcon className='!text-4xl ' />
                        <div className='text-xl '>Empty Trash</div>
                    </div>
                </div>

                <div className='!mb-10 flex flex-col gap-y-7.5'>
                    {
                        cartPizzas.map(pizza => <CartPizza key={pizza.id} {...pizza} />)
                    }
                </div>

                <div className='flex items-center justify-between !mb-10'>
                    <div className='flex items-center gap-x-2 '>
                        <span className='text-2xl'>Total pizzas:</span>
                        <span className='text-2xl font-bold'>{totalPizzas}</span>
                    </div>
                    <div className='flex items-center gap-x-2 '>
                        <span className='text-2xl'>Order amount:</span>
                        <span className='text-2xl font-bold text-my-orange '>{totalPrice}</span>
                    </div>
                </div>

                <div className='flex items-center justify-between' >
                    <Link to={'/'} className='text-gray-300 min-h-13.5 min-w-52.5 !border !border-gray-300 flex justify-center items-center
                       !px-10 rounded-4xl cursor-pointer duration-300 hover:text-gray-400 hover:!border-gray-400'>
                        <ArrowBackIosIcon className='!text-lg -translate-y-0.5 ' />
                        <span>Go back</span>
                    </Link>
                    <button className='text-white min-h-13.5 min-w-52.5 bg-my-orange flex justify-center items-center
                       !px-10 rounded-4xl cursor-pointer duration-300 hover:bg-orange-600'>Pay now</button>
                </div>
            </div>
        </div>
    )
};


export default Cart;

