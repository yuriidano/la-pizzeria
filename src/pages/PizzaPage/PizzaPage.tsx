import { useParams } from "react-router";
import { useGetPizzaQuery } from "../../api/api";
import Rating from '@mui/material/Rating';
import { useEffect, useState } from "react";
import { GoBack } from "../../components/Common/Goback/GoBack";
import { Preloader } from "../../components/Common/Preloader/Preloader";
import { ErrorComponent } from "../../components/Error/Error";
import stylles from './PizzaPage.module.scss'
import classNames from "classnames";


type ParamsType = {
    pizzaId: string
}

const PizzaPage = () => {
    const { pizzaId } = useParams<ParamsType>();
    const { isLoading, isError, error, data } = useGetPizzaQuery(pizzaId ?? '1');

    const [value, setValue] = useState<number | null>(0);
    useEffect(() => {
        setValue(data?.rating ?? 0)
    }, [data?.rating]);

    const typesPizzes = ['thin', 'traditional'];


    if (isLoading) return <Preloader />

    return (
        <div className="!pt-15">
            <div className="grow-1">
                {isError ?
                    <div className="!mb-60">
                        <ErrorComponent errorData={error} />
                    </div>
                    :
                    <div className="flex items-center gap-5">
                        <div className={classNames("basis-6/10 flex justify-center", stylles.content)}>
                            <div className="">
                                <img className="max-w-full" src={data?.imageUrl} alt="pizzaPage" />
                            </div>
                        </div>
                        <div className="basis-4/10 self-start ">
                            <div className="text-4xl font-bold !mb-4 ">{data?.title}</div>
                            <div className="!mb-30 ">
                                <Rating className="!text-3xl" name="read-only" value={value} readOnly />
                            </div>
                            <div className="text-2xl font-bold flex gap-x-1.5 !mb-7">
                                <span>{data?.price}</span>
                                <span>$</span>
                            </div>
                            <div className="text-xl font-bold !mb-10">{data?.description}</div>
                            <div className="text-xl flex items-start gap-x-5 !mb-15">
                                <span className="font-bold">Ingredients:</span>
                                <ul>
                                    {
                                        data?.ingredients.map((ingredient, index) => <li key={index} >{ingredient}</li>)
                                    }
                                </ul>
                            </div>
                            <div className="text-xl flex items-center  gap-x-5 !mb-10">
                                <span className="font-bold">Sizes:</span>
                                <div className="flex items-center gap-x-3.5">
                                    {
                                        data?.sizes.map((size, index) => {
                                            return (
                                                <div key={index} className="flex items-center gap-x-1">
                                                    <span>{size}</span>
                                                    <span>sm.</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="text-xl flex items-center  gap-x-5">
                                <span className="font-bold">Types:</span>
                                <div className="flex items-center gap-x-3.5">
                                    {
                                        data?.types.map((type, index) => {
                                            return (
                                                <span key={index}>{typesPizzes[type]}</span>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div>
                <GoBack />
            </div>
        </div>
    )
};


export default PizzaPage;