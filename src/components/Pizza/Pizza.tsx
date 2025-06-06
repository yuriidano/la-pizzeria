import classNames from "classnames"
import stylles from './Pizza.module.scss'
import { useState } from "react"
import { useAppDispatch } from "../../redux/store"
import { addPizzaCart } from "../../redux/cart/cartSlice"
import type { CartPizzaType } from "../../@types"


interface Props {
    id: number,
    imageUrl: string,
    title: string,
    types: number[],
    sizes: number[],
    price: number,
    category: number,
    rating: number
}


export const Pizza = ({id, imageUrl, price, sizes, title, types}: Props) => {

    const dispatch = useAppDispatch();

    const [activeSize, setActiveSize] = useState<number | null>(null);
    const typesPizzes = ['thin', 'traditional'];
    const [activeType, setActiveType] = useState<number | null>(null);


    const addPizza = () => {

        const newPizza:CartPizzaType = {
            count: 1,
            id,
            imageUrl,
            price,
            title,
        }
        if(activeSize !== null) newPizza.size = activeSize;
        if(activeType !== null) newPizza.type = typesPizzes[activeType]
        dispatch(addPizzaCart(newPizza))
    }


    return (
        <div className="grow-1 shrink-1 max-w-80 flex flex-col items-center">
            <div className="!p-3 !pl-7">
                <img className="max-w-full mb-5.5" src={imageUrl} alt="pizza" />
            </div>
            <div className="text-xl font-extrabold !mb-5.5">{title}</div>
            <div className="bg-gray-100 !p-2 rounded-xl !mb-4  min-w-71.5">
                <div className="flex gap-x-1.5 !mb-2  min-w-63">
                    {
                    types.map(type => <button key={type} onClick={() => setActiveType(type)} 
                    className={classNames("min-h-8 min-w-33 grow-1 rounded-md hover:bg-white duration-300", {'bg-white': type === activeType})}>
                    {typesPizzes[type]}</button>)
                    }
                </div>

                <div className="flex gap-x-1.5">
                    {
                        sizes.map((size, index) =>
                            <button key={index} onClick={() => setActiveSize(size)}
                                className={classNames("min-h-8 grow-1 rounded-md hover:bg-white duration-300", { 'bg-white': size === activeSize })}>
                                {size} sm.</button>)
                    }
                </div>
            </div>
            <div className="flex justify-between items-center gap-x-23 !pl-1">
                <div className="text-xl font-bold ">{price} $</div>
                <button onClick={addPizza} className={classNames(
                    "flex justify-center items-center gap-x-6 !min-h-10 !border !border-my-orange !px-4 rounded-3xl", stylles.button
                    )}>
                    <span className={classNames(stylles.plus)}>+</span>
                    <span>Add</span>
                    <div className={classNames("!w-5.5 !h-5.5 flex justify-center items-center rounded-full", stylles.countBody)}>
                        <span className={classNames("text-white text-xs hover:text-my-orange duration-300", stylles.count)}>2</span>
                        </div>
                </button>
            </div>
        </div>
    )
}