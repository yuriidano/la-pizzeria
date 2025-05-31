import { useGetPizzasQuery } from "../api/api";
import { Category } from "../components/Category/Category";
import { Pizza } from "../components/Pizza/Pizza";
import { SkeletonPizza } from "../components/SkeletonPizza/SkeletonPizza";
import { Sort } from "../components/Sort/Sort";
import { selectActiveCategory } from "../redux/home/homeSelectors";
import { useAppSelector } from "../redux/store";


const Home = () => {
    const activeCategory = useAppSelector(selectActiveCategory);

    const { isLoading, data } = useGetPizzasQuery({ activeCategory });

    const pizzasItems = data?.map(pizza => <Pizza {...pizza} />);
    const skeleton = [...new Array(10)].map((_, index) => <SkeletonPizza key={index} />)

    return (
        <div className="!pt-8 !pb-24">
            <div className="flex items-center gap-x-94 !mb-9">
                <div><Category /></div>
                <div><Sort /></div>
            </div>
            <h2 className="!text-3xl !font-bold !mb-9">All pizzas</h2>
            {
                isLoading ? 
                            <div className="flex flex-wrap gap-x-16.5 gap-y-16 !pl-5 !pt-3">{skeleton}</div> 
                          :   
                            <div className="flex flex-wrap gap-x-10 gap-y-16">{pizzasItems}</div>
            }
        </div>
    )
};

export default Home;


            