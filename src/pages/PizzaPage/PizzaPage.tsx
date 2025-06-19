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
        <div className="!pt-[clamp(30px,8.148px+3.704vw,60px)] !pb-8">
            <div className="grow-1 !mb-14">
                {isError ?
                    <div className="!mb-30 ss-420:!mb-5">
                        <ErrorComponent errorData={error} />
                    </div>
                    :
                    <div className=" items-center gap-5 md:flex">
                        <div className={classNames("basis-6/10 flex justify-center", stylles.content)}>
                            <div className="flex justify-center">
                                <img className="max-w-8/10 ss-420:max-w-7/10 ss-550:max-w-6/10 md:max-w-8/10" src={data?.imageUrl} alt="pizzaPage" />
                            </div>
                        </div>
                        <div className="basis-4/10 self-start ">
                            <div className="text-[clamp(24px,20.444px+1.111vw,36px)] font-bold !mb-4 text-center md:text-left ">{data?.title}</div>
                            <div className="!mb-12  md:!mb-30 text-center md:text-left">
                                <Rating className="!text-3xl" name="read-only" value={value} readOnly />
                            </div>
                            <div className="text-2xl font-bold flex gap-x-1.5 !mb-[clamp(24px,15.037px+0.926vw,28px)]">
                                <span>{data?.price}</span>
                                <span>$</span>
                            </div>
                            <div className="text-xl font-bold !mb-[clamp(28px,16.667px+1.667vw,40px)]">{data?.description}</div>
                            <div className="text-xl flex items-start gap-x-5 !mb-[clamp(24px,5.556px+3.889vw,60px)]">
                                <span className="font-bold">Ingredients:</span>
                                <ul>
                                    {
                                        data?.ingredients.map((ingredient, index) => <li key={index} >{ingredient}</li>)
                                    }
                                </ul>
                            </div>
                            <div className="text-xl flex items-center  gap-x-5 !mb-[clamp(28px,16.667px+1.667vw,40px)]">
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
            <div className="flex justify-center md:justify-start ">
                <GoBack />
            </div>
        </div>
    )
};


export default PizzaPage;