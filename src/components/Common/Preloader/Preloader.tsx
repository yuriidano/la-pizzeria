import CircularProgress from '@mui/material/CircularProgress';



export const Preloader = () => {

    return (
       <div className='absolute top-[50%] left-1/2' > <CircularProgress className='!w-17 !h-17' color="inherit" /></div>
    )
}