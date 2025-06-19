import classNames from "classnames"
import stylles from './Pizza.module.scss'
import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { addPizzaCart } from "../../redux/cart/cartSlice"
import type { CartPizzaType, PizzaType } from "../../@types"
import { calcAllPizzaIdCount } from "../../utils/utils"
import { selectCartPizza } from "../../redux/cart/cartSelectors"
import { Link } from "react-router"
import { changePizzaPriceSize, changePizzaPriceType, setActiveSizePizza } from "../../redux/home/homeSlice"


export const Pizza = ({ id, imageUrl, price, sizes, title, types, currentSize }: PizzaType) => {  
    const [activeSize, setActiveSize] = useState<number | null>(sizes[0])
    const dispatch = useAppDispatch();
    const cartPizzas = useAppSelector(selectCartPizza);
    const typesPizzes = ['thin', 'traditional'];
    const [priceUpdated, setPriceUpdated] = useState(false);
    const isMounted = useRef(false);
    const [activeType, setActiveType] = useState<number | null>(types[0]);
    const countPizza = calcAllPizzaIdCount(cartPizzas, id);

    useEffect(() => {
        if(isMounted.current) {
            setPriceUpdated(true);
            const timer = setTimeout(() => setPriceUpdated(false), 400);
            return () => clearTimeout(timer);
        }

        isMounted.current = true;
    }, [price])

    const addPizza = () => {
        const newPizza: CartPizzaType = {
            count: 1,
            id,
            imageUrl,
            price,
            title
        }
        if (currentSize !== null) newPizza.size = currentSize;
        if (activeType !== null) newPizza.type = typesPizzes[activeType]
        dispatch(addPizzaCart(newPizza))
    }

    const typePizzaHandler = (type: number) => {
        setActiveType(type)
        dispatch(changePizzaPriceType({ id, type }))
    }

    const sizePizzaHandler = (value: number) => {
        setActiveSize(value)
        dispatch(changePizzaPriceSize({ id, size: value }));
        dispatch(setActiveSizePizza({id, size: value}));
    }


    return (
        <div className="grow-1 shrink-1 max-w-80 flex flex-col items-center">
            <Link to={`items/${id}`} className="cursor-pointer !p-3 !pl-7">
                <img className="max-w-full mb-5.5" src={imageUrl} alt="pizza" />
            </Link>
            <Link to={`items/${id}`} className="text-xl font-extrabold cursor-pointer !mb-5.5 hover:text-black/70 duration-300 ">{title}</Link>
            <div className="bg-gray-100 !p-2 rounded-xl !mb-4  min-w-71.5">
                <div className="flex gap-x-1.5 !mb-2  min-w-63">
                    {
                        types.map(type => {
                            return (
                                <button disabled={activeType === type} key={type} onClick={() => typePizzaHandler(type)}
                                    className={classNames("min-h-8 min-w-33 grow-1 rounded-md hover:bg-white duration-300", { 'bg-white !cursor-default ': type === activeType })}>
                                    {typesPizzes[type]}
                                </button>
                            )
                        })
                    }
                </div>

                <div className="flex gap-x-1.5">
                    {
                        sizes.map((size, index) =>
                            <button disabled={size === activeSize} key={index} onClick={() => sizePizzaHandler(size)}
                                className={classNames("min-h-8 grow-1 rounded-md hover:bg-white duration-300", { 'bg-white !cursor-default': size === activeSize })}>
                                {size} sm.</button>)
                    }
                </div>
            </div>
            
            <div className="flex justify-between items-center gap-x-23 !pl-1">
                <div className={classNames(`text-xl font-bold`, {' text-my-orange': priceUpdated})}>{price} $</div>
                <button onClick={addPizza} className={classNames(
                    "flex justify-center items-center gap-x-6 !min-h-10 !border !border-my-orange !px-4 rounded-3xl", stylles.button
                )}>
                    <span className={classNames(stylles.plus)}>+</span>
                    <span>Add</span>
                    {countPizza ?
                        <div className={classNames("!w-5.5 !h-5.5 flex justify-center items-center rounded-full", stylles.countBody)}>
                            <span className={classNames("text-white text-xs hover:text-my-orange duration-300", stylles.count)}>{countPizza}</span>
                        </div>
                        :
                        <div className={classNames("!w-5.5 !h-5.5 flex justify-center items-center rounded-full", stylles.noCountBody)}>
                            <span className={classNames("text-white text-xs hover:text-my-orange duration-300", stylles.count)}></span>
                        </div>
                    }
                </button>
            </div>
        </div>
    )
}