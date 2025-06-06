import Skeleton from '@mui/material/Skeleton';

export const SkeletonPizza = () => {
    return (
        <div className='flex flex-col items-center'>
            <div className='!mb-7'>
                <Skeleton variant="circular" width={255} height={244} />
            </div>
            <div className='!mb-5.5'>
                <Skeleton variant="text" width={250} height={25} />
            </div>
            <div  className='!mb-4'>
                <Skeleton variant="rounded" width={250} height={76} />
            </div>
            <div>
                <Skeleton variant="rounded" width={250} height={35} />
            </div>
        </div>
    )
}