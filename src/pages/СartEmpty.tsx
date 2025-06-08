import { Link } from 'react-router'
import emptyImage from '../assets/image/empty.jpeg'

export const CartEmpty = () => {

    return (

        <div className='flex flex-col items-center justify-center !pt-40'>
            <div className='flex items-center gap-x-2.5 !mb-8.5 xl:!mb-2.5'>
                <h2 className='!text-[clamp(20px,16.444px+1.111vw,32px)] !font-bold '>The basket is empty</h2>
                <div className=' w-[clamp(20px,16.444px+1.111vw,32px)] h-[clamp(20px,16.444px+1.111vw,32px)] bg-black ss-390:block ' ></div>
            </div>
            <div className='text-lg text-center text-gray-400 !mb-32 lg:!mb-22 xl:!mb-12'>
                <p>Most likely, you haven't ordered pizza yet.
                    To order pizza, go to the main page.</p>
            </div>
            <div className='max-w-[clamp(160px,118.519px+12.963vw,300px)] !mb-38.5 lg:!mb-28.5 xl:!mb-18.5'>
                <img src={emptyImage} alt="" />
            </div>
            <Link to={'/'} className='text-white !min-h-[clamp(35px,31.741px+1.019vw,46px)] !min-w-[clamp(150px,132.222px+5.556vw,210px)] bg-black flex items-center justify-center rounded-3xl 
            hover:bg-black/75 duration-300
             '>Go back</Link>
        </div>
    )
}