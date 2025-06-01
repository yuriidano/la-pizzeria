import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form"
import debounce from 'lodash.debounce'; 
import { useAppDispatch } from "../../../redux/store";
import { setSearch } from "../../../redux/home/homeSlice";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import classNames from "classnames";
import stylles from './HeaderForm.module.scss'

type FormType = {
    search: string
}

export const HeaderForm = () => {
    const dispatch = useAppDispatch();
    const {register, reset, watch} = useForm<FormType>();
    const [activeReset, setActiveReset] = useState(false);

    const searchData = watch('search');

    const searchDataHandler = useCallback(debounce((searchData: string) => {
        dispatch(setSearch(searchData))
    }, 500), []);

    const resetInputHandler = () => {
        reset({
            search: ''
        });
        inputRef.current?.focus();
    }

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        searchDataHandler(searchData);
        if(inputRef.current?.value) {
            setActiveReset(true)
        } else {
            setActiveReset(false)
        }
    }, [searchData])
    
    return (    
        <form className="relative">
            <input {...register('search')} placeholder="search..."
            className="min-h-10 !border !border-gray-200 rounded-md !px-9 min-w-80 text-gray-600"
            ref={(e) => {
                inputRef.current = e;
                register('search').ref(e)
            }} />
            <SearchIcon className="text-gray-400 absolute left-2 top-2.5" />
            {activeReset && <span onClick={resetInputHandler}><CloseIcon 
            className={classNames("absolute right-2 top-2 cursor-pointer", stylles.resetIcon)}/></span>}
        </form>
    )
}
