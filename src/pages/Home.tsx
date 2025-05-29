import { useGetPizzasQuery } from "../api/api";
import { Category } from "../components/Category/Category";
import { Pizza } from "../components/Pizza/Pizza";


const Home = () => {
    const {isLoading, isSuccess, data} = useGetPizzasQuery();

    const pizzasItems = data?.map(pizza => <Pizza {...pizza} />)

    return (
        <div className="!pt-8 !pb-24">
            <div className="!mb-9"><Category /></div>
            <h2 className="!text-3xl !font-bold !mb-9">All pizzas</h2>
            <div className="flex flex-wrap gap-x-9 gap-y-16">
                {pizzasItems} 
            </div>
        </div>
    )
};

export default Home;