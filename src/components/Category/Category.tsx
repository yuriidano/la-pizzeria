import classNames from "classnames";
import { selectActiveCategory } from "../../redux/home/homeSelectors";
import { setActiveCategory } from "../../redux/home/homeSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";


export const Category = () => {
    const dispatch = useAppDispatch();
    const activeCategory = useAppSelector(selectActiveCategory);
    const categotyItems = ['All', 'Meat', 'Vegetarian', 'Grill', 'Acute', 'Closed'];

    const categoryHandler = (category: number) => {
        dispatch(setActiveCategory(category))
    }

    return (
        <>
            <ul className="flex items-center gap-2.5">
                {
                    categotyItems.map((category, index) => {
                        return (
                            <li onClick={() => categoryHandler(index)} 
                            className={classNames("font-bold !px-9 min-h-11.5 bg-gray-200 rounded-3xl flex justify-center items-center cursor-pointer" +
                            " hover:bg-gray-300 transition duration-300:bg-gray-300", {'!bg-black text-white': index == activeCategory} )} 
                            key={index}>{category}</li>
                        )
                    })
                }
            </ul>
        </>
    )
}