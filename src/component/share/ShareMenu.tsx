import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { useEffect } from 'react';
import { useScreenSize } from "../../provider/ScreenSizeProvider";
import { RootState } from "../../store/Store";
import { endShareSimulation, setShareSimulationOn, startShareSimulation } from "../../store/ShareSimulationOnSlice";


export const ShareMenu = () => {
    const { vw } = useScreenSize(); // width 값 사용
    const dispatch = useDispatch();

    const isSimulationOn = useSelector((state: RootState) => state.shareSimulation.isSimulationOn);
    const isSimulationStart = useSelector((state: RootState) => state.shareSimulation.isSimulationStart);
    
    const handleSimulation = () => {
        dispatch(setShareSimulationOn())
        dispatch(startShareSimulation())
    }

    const handleSimulationEnd = () => {
        dispatch(endShareSimulation())
    }

    useEffect(() => {
    }, [isSimulationOn])

    useEffect(() => {
    }, [isSimulationStart])


    useEffect(() => {
    }, [vw])

    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                onClick={handleSimulation}
                sx={{
                    cursor: 'pointer',
                    opacity: 1,
                    mr: 2
                }}>
                <PlayArrowOutlinedIcon sx={{ color: '#89B2E9' }} />
                <Typography
                    variant="body1"
                    ml={1}
                    color={'auto'}
                >Simulation</Typography>
            </Box>

            <Box
                display="flex"
                alignItems="center"
                onClick={isSimulationStart ? handleSimulationEnd : () => { }}
                sx={{
                    cursor: isSimulationStart ? 'pointer' : 'not-allowed',
                    opacity: isSimulationStart ? 1 : 0.5,
                    mr: 2
                }}>
                <PlayArrowOutlinedIcon sx={{ color: '#89B2E9' }} />
                <Typography
                    variant="body1"
                    ml={1}
                    color={isSimulationStart ? 'auto' : 'gray'}
                >Simulation Reset</Typography>
            </Box>
        </>
    )
}