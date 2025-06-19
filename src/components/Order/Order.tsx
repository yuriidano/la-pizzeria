import { OrderForm } from "./OrderForm/OrderForm";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { ChildOrder } from "./ChildOrder/ChildOrder";
import CloseIcon from '@mui/icons-material/Close';
import { ProgressMobileStepper } from "./Progress/Progress";
import React, { useEffect, useRef, useState } from 'react';


const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: {
        xs: 4,
        lg: 3
    },
    px: 4,
    pb: 3,
    width: {
        xs: '290px',
        sm: '390px',
        md: '570px',
        lg: '700px',
        xl: '800px',
    },
    height: {
        xs: 390,
        md: 420
    },

};


const Order = () => {

    const [open, setOpen] = useState(false);
    const [openChild, setOpenChild] = useState(false);
    const [step, setStep] = useState<number>(0);
    const isMount = useRef(false);

    useEffect(() => {
        const activeStepStorage = localStorage.getItem('step');
        if (activeStepStorage) setStep(Number(activeStepStorage));
    }, [])

    useEffect(() => {
        if (isMount.current) {
            localStorage.setItem('step', String(step));
        }
        isMount.current = true;

    }, [step]);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = ( reason: "backdropClick" | "escapeKeyDown" | "closeButton") => {
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
                <Box sx={{ ...style, borderRadius: 2, }}>
                    <span onClick={() => handleClose( "closeButton")}>
                        <CloseIcon
                            className="absolute top-5 right-4 !text-[clamp(22px,17.852px+1.296vw,36px)] text-gray-400 cursor-pointer hover:text-gray-500 !transition-colors !duration-300 
                            ss-600:top-8 ss-600:right-8"
                        />
                    </span>
                    <h2 className="!text-[clamp(22px,17.852px+1.296vw,36px)] text-center !font-bold !mb-5.5 ss-600:!mb-11 ">Placing an order</h2>
                    <div className="!pl-8 !mb-5"><ProgressMobileStepper step={step} /></div>
                    <div>
                        <OrderForm setOpen={(value: boolean) => setOpen(value)} setOpenChild={(value: boolean) => setOpenChild(value)}
                            setStep={setStep} step={step} />
                    </div>
                    <ChildOrder openChild={openChild} setOpenChild={(value: boolean) => setOpenChild(value)} />
                </Box>
            </Modal >
        </div>
    );
}


export default Order


