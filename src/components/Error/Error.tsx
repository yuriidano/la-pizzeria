import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/store";
import { toggleIsError } from "../../redux/home/homeSlice";

type RTKQueryError = FetchBaseQueryError | SerializedError;

type Props = {
    errorData: RTKQueryError
}

export const ErrorComponent = ({ errorData }: Props) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(toggleIsError(true));

        return () => {
            toggleIsError(false)
        }
    }, [])

    return (
        <div className="!min-w-full shrink-1 grow-1 basis-full text-xl text-red-500 text-center !pt-50 !mb-10 flex justify-center items-center">
            <div >
                <span className="text-2xl font-bold inline-block !pr-2">Error:</span> {
                    'data' in errorData && typeof errorData.data === 'string'
                        ? errorData.data
                        : 'error' in errorData
                            ? errorData.error
                            : 'Unknown error'
                }
            </div>
        </div>
    )
};