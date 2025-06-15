import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

type PropsType = {
    isOpen: boolean
}

export const Preloader = ({isOpen}: PropsType) => {

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={isOpen}
        >
            <CircularProgress className='!w-17 !h-17' color="inherit" />
        </Backdrop>
    )
}