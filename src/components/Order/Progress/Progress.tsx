import MobileStepper from '@mui/material/MobileStepper';


type PropsType = {
    activeStep: number
}

export const ProgressMobileStepper = ({activeStep}: PropsType) => {


    return (
        <div className='!w-150 '>
            <MobileStepper
                variant="progress"
                steps={4}
                position="static"
                
                activeStep={activeStep}
                sx={{
                    maxWidth: 695,
                    width: 695,
                    flexGrow: 1,
                    '& .MuiLinearProgress-root': {
                        height: 3, // товщина полоски
                        width: 695,
                        borderRadius: 5,
                        backgroundColor: '#eee',
                    },
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: '#ff5722', // колір заповнення
                    },
                }}

                nextButton={<span style={{ display: 'none' }} />}
                backButton={<span style={{ display: 'none' }} />}
            />
        </div>
    );
}

