import type { CartPizzaType } from "../../@types";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useAppDispatch } from "../../redux/store";
import { addCountPizza, removeCountPizza, removePizza } from "../../redux/cart/cartSlice";
import classNames from "classnames";


export const CartPizza = ({count, imageUrl, price, title, size, type, id}: CartPizzaType) => {
    const totalPricePizza = count * price;

    const dispatch = useAppDispatch();

    const removePizzaHandler = () => {
        if (size && type) {
            dispatch(removePizza({ id, size, type }))
        }
    }

    const addPizzaCountHandler = () => {
       if(size && type) {
         dispatch(addCountPizza({id, size, type}))
       }
    }

    const removePizzaCountHandler = () => {
        if (count >= 2 && size && type) {
            dispatch(removeCountPizza({id, size, type}))
        }

    }

    return (
        <div className="flex items-center gap-x-5 justify-between !pt-7.5 !border-t !border-t-gray-200" >
            <div className="basis-[100px] flex flex-col items-center gap-x-4 sm:basis-auto sm:flex-row sm:items-center">
                <div className="max-w-20" >
                    <img className="max-w-full" src={imageUrl} alt="pizzaImage" />
                </div>
                <div className="text-center sm:text-left">
                    <div className="text-xl font-bold !mb-1">{title}</div>
                    <div className="text-[clamp(14px,12.815px+0.37vw,18px)] text-gray-400 flex items-center gap-x-2">
                        {type &&
                            <div>{type},</div>
                        }
                        {size &&
                            <div className="flex gap-x-1 " >
                                <span>size:</span>
                                <span>{size}</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="ss-420:!flex items-center">
                <div className="!mb-3 flex items-center gap-x-3 !grow-0 !shrink-0  !basis-8 ss-420:!mb-0" >
                    <button onClick={removePizzaCountHandler}  className={classNames(
                        "w-8 h-8 rounded-full flex justify-center items-center cursor-pointer text-xl duration-300",
                        "hover:bg-my-orange hover:text-white",
                        count <= 1
                            ? "!text-gray-200 !border-2 !border-gray-100 hover:bg-white"
                            : "!border-2 !border-my-orange text-my-orange"
                    )}>
                        <RemoveIcon />
                    </button>
                    <div className="text-[clamp(16px,14.815px+0.37vw,20px)] font-bold">{count}</div>
                    <div onClick={addPizzaCountHandler} className="w-8 h-8 !border-2 !border-my-orange rounded-full flex justify-center items-center cursor-pointer !text-xl text-my-orange 
                        hover:bg-my-orange hover:text-white duration-300 ">
                        <AddIcon />
                    </div>
                </div>
                <div className="!mb-3 flex items-center justify-center gap-x-1 text-xl font-bold !grow-0 !shrink-0 !basis-[clamp(40px,-31.111px+22.222vw,280px)] ss-420:!mb-0">
                    <span>{totalPricePizza}</span>
                    <span>$</span>
                </div>
                <div className="flex justify-center ss-420:ustify-start">
                    <div onClick={removePizzaHandler} className="w-8 h-8 !grow-0 !shrink-0 !basis-8 !border-2 !border-gray-300 rounded-full
                        flex justify-center items-center cursor-pointer text-3xl text-gray-300 
                        hover:text-gray-400 hover:!border-gray-400 uration-300 ">
                        <AddIcon className="-rotate-45 " />
                    </div>
                </div>
            </div>
        </div>
    )
};
