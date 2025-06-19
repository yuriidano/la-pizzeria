import { useNavigate } from "react-router";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useAppDispatch } from "../../../redux/store";
import { clearCart } from "../../../redux/cart/cartSlice";


const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '250px',
        sm: '300px',
        md: '350px',
        lg: '350px',
        xl: '400px',
    },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    
};


type PropsChildOrderType = {
    openChild: boolean,
    setOpenChild: (value: boolean) => void
}

export const ChildOrder = ({openChild, setOpenChild}:PropsChildOrderType) => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate()
    const handleClose = (event: React.SyntheticEvent, reason: "backdropClick" | "escapeKeyDown") => {
        if (reason && (reason === 'backdropClick' || reason === 'escapeKeyDown')) {
            return;
        }
        setOpenChild(false);
        navigate('/')
    };

    const myCloseHandler = () => {
        setOpenChild(false);
        navigate('/');
        localStorage.removeItem('formData');
        localStorage.removeItem('step');
        localStorage.removeItem('activeStep');
        dispatch(clearCart())
    }

    return (
        <>
            <Modal
                open={openChild}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, borderRadius: 2 }}>
                    <h2 className=" !text-[clamp(20px,18.815px+0.37vw,24px)] text-center !font-bold !mb-12  xl:!mb-7" id="child-modal-title">
                        Your order has been successfully accepted
                    </h2>
                    <div className="!text-[clamp(16px,14.815px+0.37vw,20px)] indent-3 leading-6 !mb-20 text-justify 
                        xl:!mb-8"  id="child-modal-description">
                        Thank you for your purchase.
                        Our manager will contact you shortly to confirm the details.
                    </div>
                    <div className="flex justify-center items-center ">
                        <button className="text-white !min-h-9.5 !px-10 bg-my-orange rounded-3xl hover:bg-orange-600 duration-300 " onClick={myCloseHandler}>Close</button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}