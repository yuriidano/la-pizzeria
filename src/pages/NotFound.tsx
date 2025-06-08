import smileyImage from '../assets/image/smiley.png'

const NotFound = () => {


    return (
        <div className='text-center !pt-43'>
            <div className='max-w-[clamp(70px,46.889px+7.222vw,148px)] !mx-auto !mb-2'>
                <img className='max-w-full ' src={smileyImage} alt="" />
            </div>
            <h2 className='!text-[clamp(24px,20.444px+1.111vw,36px)] !font-bold !mb-5 '>Not Found 404</h2>
            <div className='text-[clamp(18px,16.222px+0.556vw,24px)] '>Unfortunately, this page is not available in our online store.</div>
        </div>
    )
};


export default NotFound;