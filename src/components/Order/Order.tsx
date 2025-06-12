import { OrderForm } from "./OrderForm/OrderForm";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { ChildOrder } from "./ChildOrder/ChildOrder";
import CloseIcon from '@mui/icons-material/Close';
import {ProgressMobileStepper} from "./Progress/Progress";
import React, { useEffect, useRef, useState } from 'react';

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 3,
    px: 4,
    pb: 3,
};




const Order = () => {
    const [open, setOpen] = useState(false);
    const [openChild, setOpenChild] = useState(false);
    const [activeStep, setActiveStep] = useState<number>(0);
    const isMount = useRef(false);

    useEffect(() => {
        const activeStepStorage = localStorage.getItem('activeStep');
        if(activeStepStorage) setActiveStep(Number(activeStepStorage));
    }, [])


    useEffect(() => {
       if(isMount.current) {
            localStorage.setItem('activeStep', String(activeStep));
       }
       isMount.current = true;

    }, [activeStep]);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = (event: React.SyntheticEvent, reason: "backdropClick" | "escapeKeyDown" | "closeButton" ) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
            return;
        }
        setOpen(false);
    };

    return (
        <div >
            <button onClick={handleOpen} className='text-white min-h-[clamp(35px,22.889px+2.222vw,54px)] bg-my-orange flex justify-center items-center
                       !px-[clamp(20px,14.074px+1.852vw,40px)] rounded-4xl cursor-pointer duration-300 hover:bg-orange-600 
                        min-w-full ss-420:min-w-[clamp(140px,119.259px+6.481vw,210px)]'>Pay now</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 800, height: 420, borderRadius: 2, }}>
                    <span onClick={(event) => handleClose(event, "closeButton")}><CloseIcon className="absolute top-8 right-8 !text-4xl text-gray-400 cursor-pointer hover:text-gray-500 !transition-colors !duration-300 " /></span>
                    <h2 className="!text-4xl text-center !font-bold !mb-11 ">Placing an order</h2>
                    <div className="!pl-8 !mb-5"><ProgressMobileStepper activeStep={activeStep} /></div>
                    <div>
                        <OrderForm setOpen={(value: boolean) => setOpen(value)} setOpenChild={(value: boolean) => setOpenChild(value)}
                                    setActiveStep={(value: number) => setActiveStep(value)} activeStep={activeStep}  />
                    </div>
                    <ChildOrder openChild={openChild} setOpenChild={(value: boolean) => setOpenChild(value)} />
                       
                </Box>

            </Modal >
        </div>
    );
}


export default Order


