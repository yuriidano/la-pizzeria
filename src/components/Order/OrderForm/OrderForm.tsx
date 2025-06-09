import { useForm, type SubmitHandler } from "react-hook-form";

type FormType = {
    firstName: string,
    lastName: string,
    phone: string,
    address: string,
}

export const OrderForm = () => {
    const { register, handleSubmit, reset, setValue, watch, formState: {errors} } = useForm<FormType>();

    const onSubmit:SubmitHandler<FormType>= (data) => {

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <div>
                <label htmlFor="firstName">first name</label>
                <input id="firstName" {...register('firstName', { 
                    maxLength: { value: 10, message: 'max simbols 10' }, 
                    required: 'first name is required',
                    pattern: {
                        value: /^[A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії\s'-]+$/,
                        message: "first name can only contain Ukrainian letters, spaces, apostrophes, or hyphens",
                    }})}/>
                {errors.firstName &&
                    <span className="text-red-400 ">{errors.firstName.message}</span>
                }
            </div>

            <div>
                <label htmlFor="lastName">last name</label>
                <input id="lastName" {...register('lastName', { 
                    maxLength: { value: 10, message: 'max simbols 10' }, 
                    required: 'last name is required',
                    pattern: {
                        value: /^[A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії\s'-]+$/,
                        message: "lastName name can only contain Ukrainian letters, spaces, apostrophes, or hyphens",
                    }
                })} />
                {errors.lastName &&
                    <span className="text-red-400 ">{errors.lastName.message}</span>
                }
            </div>

            <div>
                <span>+380</span>
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
                {/* Показ помилки під інпутом */}
                {errors.phone && (
                    <p style={{ color: 'red' }}>{errors.phone.message}</p>
                )}
            </div>

            <div>
                <input {...register('address', { required: 'this field is required' })} placeholder="address..." />
                {errors.address &&
                    <span className="text-red-400 ">{errors.address.message}</span>
                }
            </div>

            <button>send</button>
        </form>
    )
}