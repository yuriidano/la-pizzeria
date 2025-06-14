import { useEffect, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppSelector } from "../../../redux/store";
import { selectCartPizza } from "../../../redux/cart/cartSelectors";
import { useAddOrderMutation } from "../../../api/api";
import type { OrderType } from "../../../@types";
import classNames from "classnames";

type PropsType = {
    setOpenChild: (value: boolean) => void,
    setOpen: (value: boolean) => void,
    setStep: (value: number) => void,
    step: number
}

type FormType = {
    firstName: string,
    lastName: string,
    phone: string,
    address: string,
    email: string,
}

export const OrderForm = ({ setOpenChild, setStep, step }: PropsType) => {
    const { register, handleSubmit, setValue, trigger, reset, watch, formState: { errors } } = useForm<FormType>();
    const cartPizzas = useAppSelector(selectCartPizza);
    const [createOrder, { data }] = useAddOrderMutation();
    const isMountFormData = useRef(false);



    useEffect(() => {
        try {
            const formDataStorage = localStorage.getItem('formData');
            if (formDataStorage) {
                const parse = JSON.parse(formDataStorage);
                reset(parse)
            }
        } catch (error) {
            console.log('Error parsing order from localStorage:', error);
            localStorage.removeItem('formData');
        }
    }, []);


    const formDataStorage = watch();
    useEffect(() => {
        if (isMountFormData.current) {
            const formDataString = JSON.stringify(formDataStorage);
            localStorage.setItem('formData', formDataString)
        }
        isMountFormData.current = true;

    }, [formDataStorage]);


    const onSubmit: SubmitHandler<FormType> = async (formData) => {
        const dataObjApi: OrderType = { ...formData };
        dataObjApi.items = cartPizzas;
        try {
            await  createOrder(dataObjApi);
            setOpenChild(true);
            reset()
        } catch (error) {
            console.log(error);
        }
    }

    const prevInputHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setStep(step - 1);
    }

    const nextInputHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const valid = await trigger();

        if (valid) {
            e.preventDefault();
            setStep(step + 1);
        }
    }

    return (
        <form className="!min-h-72 flex flex-col " onSubmit={handleSubmit(onSubmit)} >
            <div className="grow-1 inline-flex flex-col items-center ">
                {step === 0 &&
                    <>
                        <div className="!mb-8 inline-flex flex-col relative md:!mb-11">
                            <label htmlFor="firstName" className="text-gray-400 !mb-2">First name</label>
                            <input id="firstName" {...register('firstName', {
                                maxLength: { value: 10, message: 'max simbols 10' },
                                required: 'first name is required',
                                pattern: {
                                    value: /^[A-Za-z\s'-]+$/,
                                    message: "First name can only contain English letters, spaces, apostrophes, or hyphens",
                                }
                            })} className="text-gray-400 !border !border-gray-400 min-h-[clamp(32px,27.259px+1.481vw,48px)] rounded-xl !px-2.5 min-w-67.5
                            ss-420:min-w-92.5 ss-600:min-w-137.5 md:min-w-160
                    
                    " />
                            {errors.firstName &&
                                <span className="text-red-400 absolute -bottom-5 left-0 ">{errors.firstName.message}</span>
                            }

                        </div>
                        <div className="inline-flex flex-col relative">
                            <label htmlFor="lastName" className="text-gray-400 !mb-2">Last name</label>
                            <input id="lastName" {...register('lastName', {
                                maxLength: { value: 10, message: 'max simbols 10' },
                                required: 'last name is required',
                                pattern: {
                                    value: /^[A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії\s'-]+$/,
                                    message: "lastName name can only contain Ukrainian letters, spaces, apostrophes, or hyphens",
                                }
                            })} className="text-gray-400 !border !border-gray-400 min-h-[clamp(32px,27.259px+1.481vw,48px)] rounded-xl !px-2.5 min-w-67.5
                            ss-420:min-w-92.5 ss-600:min-w-137.5 md:min-w-160" />
                            {errors.lastName &&
                                <span className="text-red-400 absolute -bottom-5 left-0">{errors.lastName.message}</span>
                            }
                        </div>
                    </>
                }
                {step === 1 &&
                    <div className="inline-flex flex-col relative">
                        <label htmlFor="lastName" className="text-gray-400 !mb-2">Phone Number</label>
                        <div className="text-gray-400 !border !border-gray-400 min-h-[clamp(32px,27.259px+1.481vw,48px)] rounded-xl !px-2.5 flex justify-start items-center gap-x-1 min-w-67.5
                            ss-420:min-w-92.5 ss-600:min-w-137.5 md:min-w-160">
                            <span className="!text-[16px]" >+380</span>
                            <input
                                type="tel"
                                {...register('phone', {
                                    required: 'Phone number is required',
                                    minLength: {
                                        value: 9,
                                        message: 'The number must contain 9 digits without a prefix.',
                                    },
                                    maxLength: {
                                        value: 9,
                                        message: 'The number must contain 9 digits without a prefix.',
                                    },
                                    pattern: {
                                        value: /^\d+$/,
                                        message: 'Enter numbers only',
                                    },
                                })}
                                value={watch('phone') || ''}
                                onChange={(e) => {
                                    // очищаємо все, крім цифр
                                    setValue('phone', e.target.value.replace(/\D/g, ''), {
                                        shouldValidate: true, // щоб одразу запускалась валідація
                                    });
                                }}
                            />
                        </div>
                        {/* Показ помилки під інпутом */}
                        {errors.phone && (
                            <p className="text-red-400 absolute -bottom-5 left-0 ">{errors.phone.message}</p>
                        )}
                    </div>
                }
                {step === 2 &&
                    <div className="inline-flex flex-col relative">
                        <label htmlFor="adress" className="text-gray-400 !mb-2">Address</label>
                        <input id="adress" {...register('address', { required: 'adress is required' })}
                            className="text-gray-400 !border !border-gray-400 min-h-[clamp(32px,27.259px+1.481vw,48px)] rounded-xl !px-2.5 min-w-67.5
                            ss-420:min-w-92.5 ss-600:min-w-137.5 md:min-w-160" />
                        {errors.address &&
                            <span className="text-red-400 absolute -bottom-5 left-0">{errors.address.message}</span>
                        }
                    </div>
                }
                {step === 3 &&
                    <div className="inline-flex flex-col relative">
                        <label htmlFor="adress" className="text-gray-400 !mb-2">Email</label>
                        <input id="adress" {...register('email', { required: 'email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: 'please enter a valid email.' } },)}
                            className="text-gray-400 !border !border-gray-400 min-h-[clamp(32px,27.259px+1.481vw,48px)] rounded-xl !px-2.5 min-w-67.5
                            ss-420:min-w-92.5 ss-600:min-w-137.5 md:min-w-160" />
                        {errors.email &&
                            <span className="text-red-400 absolute -bottom-5 left-0">{errors.email.message}</span>
                        }
                    </div>
                }
            </div>
            <div className="grid grid-cols-[repeat(1,_1fr] gap-y-2
                            ss-600:justify-around ss-600:gap-x-60 ss-600:grid-cols-[repeat(2,_minmax(120px,_150px))] md:gap-x-90">
                <div>
                    {step > 0 &&
                        <button onClick={prevInputHandler} className="text-white !min-h-[clamp(32px,28.444px+1.111vw,44px)] min-w-full bg-my-orange rounded-3xl hover:bg-orange-600 duration-300 
                        ss-600:min-w-45
                        ">Prev</button>
                    }
                </div>
                <div>
                    {step <= 2 &&
                        <button onClick={nextInputHandler} className="text-white !min-h-[clamp(32px,28.444px+1.111vw,44px)] min-w-full bg-my-orange rounded-3xl hover:bg-orange-600 duration-300 
                        ss-600:min-w-45"
                        >
                        Next
                        </button>
                    }
                    {step === 3 &&
                        <button className="text-gray-400 !min-h-[clamp(32px,28.444px+1.111vw,44px)] min-w-full !border !border-gray-400 rounded-3xl hover:text-gray-500 hover:!border-gray-500 duration-300 
                        ss-600:min-w-45"
                        >Send</button>
                    }
                </div>
            </div>
        </form>
    )
}