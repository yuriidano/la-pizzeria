import classNames from "classnames";
import { selectActiveCategory } from "../../redux/home/homeSelectors";
import { setActiveCategory } from "../../redux/home/homeSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

interface Props {
    categotyItems: string[]
}

export const Category = ({categotyItems}: Props) => {
    const dispatch = useAppDispatch();
    const activeCategory = useAppSelector(selectActiveCategory);

    const categoryHandler = (category: number) => {
        dispatch(setActiveCategory(category))
    }

    return (
        <>
            <ul className="flex items-center justify-center gap-2.5 flex-wrap md:justify-start lg:flex-nowrap ">
                {
                    categotyItems.map((category, index) => {
                        return (
                            <li onClick={() => categoryHandler(index)}
                                className={
                                    classNames("font-medium !px-[clamp(15px,8.778px+1.944vw,36px)] min-h-[clamp(25px,18.778px+1.944vw,46px)] text-[clamp(14px,13.407px+0.185vw,16px)]" +
                                       " bg-gray-200 rounded-3xl flex justify-center items-center cursor-pointer" + 
                                       " hover:bg-gray-300 transition duration-300:bg-gray-300 md:font-bold" +
                                        "grow-0 shrink-1 basis-[25%] "
                                       ,

                                        { '!bg-black text-white': index == activeCategory })}
                                key={index}>{category}</li>
                        )
                    })
                }
            </ul>
        </>
    )
}