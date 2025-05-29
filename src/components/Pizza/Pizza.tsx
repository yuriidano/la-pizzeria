
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


export const Pizza = ({category, id, imageUrl, price, rating, sizes, title, types}: Props) => {


    return (
        <div className="grow-1 shrink-1 max-w-80 flex flex-col items-center">
            <div className="!p-3">
                <img className="max-w-full mb-5.5" src={imageUrl} alt="pizza" />
            </div>
            <div className="text-xl font-extrabold !mb-5.5">{title}</div>
            <div className="bg-gray-200 !p-2 rounded-xl !mb-4">
                <div className="flex gap-x-1.5 !mb-2">
                    <button className="min-h-8 min-w-33 rounded-md hover:bg-white duration-300">thin</button>
                    <button className="min-h-8 min-w-33 rounded-md hover:bg-white duration-300">traditional</button>
                </div>

                <div className="flex gap-x-1.5">
                    <button className="min-h-8 min-w-21.5 rounded-md hover:bg-white duration-300">26 см.</button>
                    <button className="min-h-8 min-w-21.5 rounded-md hover:bg-white duration-300">30 см.</button>
                    <button className="min-h-8 min-w-21.5 rounded-md hover:bg-white duration-300">40 см.</button>
                </div>
            </div>
            <div className="flex justify-between items-center gap-x-28 !pl-1">
                <div className="text-xl font-bold ">{price} $</div>
                <button className="flex justify-center items-center gap-x-4 !min-h-10 !border !border-my-orange !px-6 rounded-3xl ">
                    <span className="text-my-orange text-xl font-medium">+</span>
                    <span className="text-my-orange font-bold">Add</span>
                    <span className="w-2 h-4 bg-my-orange ">2</span>
                </button>
            </div>
        </div>
    )
}