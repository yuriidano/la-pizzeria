import { useEffect, useRef } from "react";
import { useGetPizzasQuery } from "../../api/api";
import { Category } from "../../components/Category/Category";
import { Pizza } from "../../components/Pizza/Pizza";
import { SkeletonPizza } from "../../components/SkeletonPizza/SkeletonPizza";
import { Sort } from "../../components/Sort/Sort";
import { selectHome } from "../../redux/home/homeSelectors";
import { setCurrentPage, setFilter, type FilterType } from "../../redux/home/homeSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import Pagination from '@mui/material/Pagination';
import { useLocation, useNavigate } from "react-router";
import queryString from 'query-string';
import { ErrorComponent } from "../../components/Error/Error";

const Home = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isMounted = useRef(false);
    const isQuery = useRef(false);
    const { filter: { activeCategory, activeSort, search, currentPage }, limit, pageCount } = useAppSelector(selectHome);
    const categotyItems = ['All', 'Meat', 'Vegetarian', 'Grill', 'Acute', 'Closed'];

    const order = activeSort?.name.includes('asc') ? 'asc' : 'desc';
    const sortQuery = activeSort?.sortProperty || '';

    useEffect(() => {
        if (location.search) {
            const parse = queryString.parse(location.search);

            isQuery.current = true;

            const parseFilter: FilterType = {
                activeCategory: Number(parse?.activeCategory),
                activeSort: parse.activeSort === 'title' ? { name: 'alphabet (asc)', sortProperty: parse?.activeSort as string } : { name: parse?.activeSort as string + '(asc)', sortProperty: parse?.activeSort as string },
                currentPage: Number(parse.currentPage),
                search: parse.search as string ?? ''
            }
            dispatch(setFilter(parseFilter))
        }
    }, [])

    const { isLoading, isError, error, data } = useGetPizzasQuery({ activeCategory, sortQuery, order, search, limit, currentPage }, { skip: isQuery.current });
    useEffect(() => {
        isQuery.current = false;
    }, [])

    const pizzasItems = data?.map(pizza => <Pizza key={pizza.id} {...pizza} />);
    const skeleton = [...new Array(4)].map((_, index) => <SkeletonPizza key={index} />)


    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setCurrentPage(value))
    };

    type queryType = { activeCategory?: number, activeSort?: string, search?: string, currentPage?: number };
    const query: queryType = {};

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
        <div className="!pt-[clamp(32px,6.074px+1.852vw,32px)] !pb-[clamp(20px,5.778px+4.444vw,68px)] flex flex-col">
            {isError ?
                        <ErrorComponent errorData={error} />
                    :
                    <>
                        <div className="flex flex-col items-center justify-between gap-y-7 !mb-12 md:!mb-9  md:flex-row md:items-start">
                            <div ><Category categotyItems={categotyItems} /></div>
                            <div className="flex min-w-full md:min-w-auto "><Sort /></div>
                        </div>
                        <h2 className="!text-[clamp(22px,19.63px+0.741vw,30px)] !font-bold !mb-[clamp(15px,21.741px+1.019vw,36px)]">
                        {categotyItems[activeCategory]}</h2>
                        <div className="!mb-10 min-h-130.5">
                            {isLoading ?
                                <div className="flex flex-wrap gap-x-16.5 gap-y-16 !pl-5 !pt-3 justify-center md:justify-around 2xl:justify-start">{skeleton}</div>
                              :
                                <div className="flex flex-wrap justify-center gap-x-10 gap-y-16 md:justify-around 2xl:justify-start">{pizzasItems}</div>
                            }
                        </div>
                        <Pagination count={pageCount} page={currentPage} onChange={handleChange} />
                    </>
            }
        </div>
    )
};

export default Home;


