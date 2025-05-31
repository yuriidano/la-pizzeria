import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { selectActiveSort } from '../../redux/home/homeSelectors';
import type { ActiveSortType } from '../../@types';
import { setActiveSort } from '../../redux/home/homeSlice';
import { useState } from 'react';
import classNames from 'classnames';

export const Sort = () => {
    const dispatch = useAppDispatch();
    const activeSort = useAppSelector(selectActiveSort);
    const [isOpenPopap, setIsOpenPopap] = useState<boolean>(false);

    const activeSortHandler = (sort: ActiveSortType) => {
        dispatch(setActiveSort(sort));
        setIsOpenPopap(false)
    }


    const list = [
        { name: 'alphabet (asc)', sortProperty: 'title' },
        { name: 'alphabet (desc)', sortProperty: 'title' },
        { name: 'price (asc)', sortProperty: 'price' },
        { name: 'price (desc)', sortProperty: 'price' },
        { name: 'rating (asc)', sortProperty: 'rating' },
        { name: 'rating (desc)', sortProperty: 'rating' },
    ]

    return (
        <div className='relative min-w-70'>
            <div className='flex items-center gap-x-1.5'>
                <span><PlayArrowIcon className={classNames('-rotate-90 duration-300', {'rotate-90 duration-300': isOpenPopap})} /></span>
                <div className='flex items-center gap-x-2'>
                    <span className='font-bold'>Sort by:</span>
                    <span onClick={() => setIsOpenPopap(prev => !prev)} className='text-my-orange underline cursor-pointer'>{activeSort?.name}</span>
                </div>
            </div>
            { isOpenPopap &&
                <ul className='inline-block !min-w-44 !pt-3.5 !pb-2.5  absolute right-0 shadow-md bg-white rounded-xl'>
                    {
                        list.map((sortItem, index) => <li key={index} onClick={() => activeSortHandler(sortItem)}
                            className='min-h-10 cursor-pointer flex items-center !pl-3.5 hover:bg-my-orange/5 hover:text-my-orange  duration-100'>
                            {sortItem.name}</li>)
                    }
                </ul>
            }
        </div>
    )
}