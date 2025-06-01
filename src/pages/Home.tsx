import { useEffect, useMemo } from "react";
import { useGetPizzasQuery } from "../api/api";
import { Category } from "../components/Category/Category";
import { Pizza } from "../components/Pizza/Pizza";
import { SkeletonPizza } from "../components/SkeletonPizza/SkeletonPizza";
import { Sort } from "../components/Sort/Sort";
import { selectHome } from "../redux/home/homeSelectors";
import { setCurrentPage } from "../redux/home/homeSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import Pagination from '@mui/material/Pagination';

const Home = () => {
    const dispatch =useAppDispatch();
    const {activeCategory, activeSort, search, currentPage, limit, pageCount} = useAppSelector(selectHome);

    const order = activeSort?.name.includes('asc') ? 'asc' : 'desc';
    const sortQuery = activeSort?.sortProperty || '';


    const { isLoading, data } = useGetPizzasQuery({ activeCategory, sortQuery, order, search, limit, currentPage });

    const pizzasItems = data?.map(pizza => <Pizza key={pizza.id} {...pizza} />);
    const skeleton = [...new Array(4)].map((_, index) => <SkeletonPizza key={index} />)

const tets = useMemo(() => {
  const length = data?.length ?? 0;

  if (length <= 4) return 1;
  if (length <= 8) return 2;

  return pageCount; // або Math.ceil(totalItems / limit)
}, [data, pageCount]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setCurrentPage(value))
    };

    return (
        <div className="!pt-8 !pb-17">
            <div className="flex items-center justify-between !mb-9">
                <div><Category /></div>
                <div><Sort /></div>
            </div>
            <h2 className="!text-3xl !font-bold !mb-9">All pizzas</h2>
            <div className="!mb-10 min-h-130.5">
                {
                    isLoading ?
                        <div className="flex flex-wrap gap-x-16.5 gap-y-16 !pl-5 !pt-3">{skeleton}</div>
                        :
                        <div className="flex flex-wrap gap-x-10 gap-y-16">{pizzasItems}</div>
                }
            </div>
            <Pagination count={pageCount} page={currentPage} onChange={handleChange} />
        </div>
    )
};

export default Home;


            