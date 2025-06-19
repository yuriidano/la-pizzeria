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
    const { register, reset, watch } = useForm<FormType>();
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
        if (inputRef.current?.value) {
            setActiveReset(true)
        } else {
            setActiveReset(false)
        }
    }, [searchData])

    return (
        <form className="relative">
            <input {...register('search')} placeholder="search..."
                className="min-h-[clamp(25px,17.593px+2.315vw,40px)] !border !border-gray-200 rounded-md !px-9 !max-w-[clamp(140px,-68.421px+26.316vw,300px)] text-gray-600"
                ref={(e) => {
                    inputRef.current = e;
                    register('search').ref(e)
                }} />
            <SearchIcon className="!h-5 !w-5 text-gray-400 absolute left-5 top-1/2 -translate-1/2 ss-390:!w-6 ss-390:!h-6" />
            {activeReset &&
                <span onClick={resetInputHandler}><CloseIcon
                    className={classNames("absolute right-0 top-1/2 -translate-1/2 cursor-pointer", stylles.resetIcon)} /></span>}
        </form>
    )
}
