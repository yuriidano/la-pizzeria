import MobileStepper from '@mui/material/MobileStepper';


type PropsType = {
    step: number
}

export const ProgressMobileStepper = ({step}: PropsType) => {


    return (
        <div className='!w-72 ss-420:!w-98 ss-600:!w-149 md:!w-185 ss-992:!w-150 '>
            <MobileStepper
                variant="progress"
                steps={4}
                position="static"
                activeStep={step}
                sx={{
                    maxWidth: {
                        xs:'100%',
                        xl:695
                    },
                    width: {
                        xs:'100%',
                        xl:695
                    },
                    marginLeft: {
                        xs:-5,
                        md:-4.3,
                        lg:-3.7,
                        xl:0
                    },
                    flexGrow: 1,
                    '& .MuiLinearProgress-root': {
                        height: 3, // товщина полоски
                        width: '100%',
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

