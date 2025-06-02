import { useEffect, useRef } from "react";
import { useGetPizzasQuery } from "../api/api";
import { Category } from "../components/Category/Category";
import { Pizza } from "../components/Pizza/Pizza";
import { SkeletonPizza } from "../components/SkeletonPizza/SkeletonPizza";
import { Sort } from "../components/Sort/Sort";
import { selectHome } from "../redux/home/homeSelectors";
import { setCurrentPage, setFilter, type FilterType } from "../redux/home/homeSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import Pagination from '@mui/material/Pagination';
import { useLocation, useNavigate } from "react-router";
import queryString from 'query-string';

const Home = () => {
    const dispatch =useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isMounted = useRef(false);
    const isQuery = useRef(false);
    const {filter: {activeCategory, activeSort, search, currentPage}, limit, pageCount} = useAppSelector(selectHome);


    const order = activeSort?.name.includes('asc') ? 'asc' : 'desc';
    const sortQuery = activeSort?.sortProperty || '';

    useEffect(() => {
        if(location.search) {
            const parse = queryString.parse(location.search);

            isQuery.current = true;

            const parseFilter:FilterType = {
                activeCategory: Number(parse?.activeCategory),
                activeSort:  parse.activeSort === 'title' ? {name: 'alphabet (asc)', sortProperty: parse?.activeSort as string} : {name: parse?.activeSort as string + '(asc)', sortProperty: parse?.activeSort as string},
                currentPage: Number(parse.currentPage),
                search: parse.search as string ?? ''
            }
            dispatch(setFilter(parseFilter))
        }
    }, [])

    const { isLoading, data } = useGetPizzasQuery({ activeCategory, sortQuery, order, search, limit, currentPage }, {skip: isQuery.current});
            useEffect(() => {
        isQuery.current = false;
    }, [])


    const pizzasItems = data?.map(pizza => <Pizza key={pizza.id} {...pizza} />);
    const skeleton = [...new Array(4)].map((_, index) => <SkeletonPizza key={index} />)


    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setCurrentPage(value))
    };

    type queryType = {activeCategory?: number, activeSort?: string, search?: string, currentPage?: number};
    const query:queryType = {};

    useEffect(() => {
        if (isMounted.current) {
            query.activeCategory = activeCategory;
            query.activeSort = sortQuery;
            query.currentPage = currentPage;
            navigate({
                pathname: '/',
                search: queryString.stringify(query)
            })
        }

        isMounted.current = true;

    }, [activeCategory, sortQuery, search, currentPage])


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


            