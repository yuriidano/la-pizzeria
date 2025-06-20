import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router';

export const GoBack = () => {

    return (
        <Link to={'/'} className='text-gray-300 min-h-[clamp(35px,22.889px+2.222vw,54px)] !border !border-gray-300 flex justify-center items-center
                               !px-[clamp(20px,14.074px+1.852vw,40px)] rounded-4xl cursor-pointer duration-300 hover:text-gray-400 hover:!border-gray-400
                                max-w-50 min-w-full ss-420:min-w-[clamp(140px,119.259px+6.481vw,210px)]
                               '>
            <ArrowBackIosIcon className='!text-lg' />
            <span>Go back</span>
        </Link>
    )
}