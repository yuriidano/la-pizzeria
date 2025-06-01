import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { selectActiveSort } from '../../redux/home/homeSelectors';
import type { ActiveSortType } from '../../@types';
import { setActiveSort } from '../../redux/home/homeSlice';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import stylles from './Sort.module.scss'

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

    const popapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function popapCloseListener (e: MouseEvent) {
            if(e.target instanceof Node && popapRef.current && !popapRef.current.contains(e.target)) {
                setIsOpenPopap(false);
            }
        }   
        document.addEventListener('click', popapCloseListener);

        return () => document.removeEventListener('click', popapCloseListener);
    }, [])

    return (
        <div ref={popapRef} className='relative min-w-50'>
            <div className='flex items-center gap-x-1.5'>
                <span><PlayArrowIcon className={classNames(stylles.arrowIcon, {[stylles.arrowIconActive]: isOpenPopap})} /></span>
                <div className='flex items-center gap-x-2'>
                    <span className='font-bold'>Sort by:</span>
                    <span onClick={() => setIsOpenPopap(prev => !prev)} className='text-my-orange underline cursor-pointer'>{activeSort?.name}</span>
                </div>
            </div>
            <ul className={classNames
                ('inline-block !min-w-44 !pt-3.5 !pb-2.5  absolute top-8 right-0 shadow-md bg-white rounded-xl', stylles.popap, { [stylles.popanActive]: isOpenPopap })}>
                {
                    list.map((sortItem, index) => <li key={index} onClick={() => activeSortHandler(sortItem)}
                        className='min-h-10 cursor-pointer flex items-center !pl-3.5 hover:bg-my-orange/5 hover:text-my-orange  duration-100'>
                        {sortItem.name}</li>)
                }
            </ul>
        </div>
    )
}