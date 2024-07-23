import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { useEffect } from 'react';
import { useScreenSize } from "../../provider/ScreenSizeProvider";
import { RootState } from "../../store/Store";
import { endShareSimulation, setShareSimulationOn, startShareSimulation } from "../../store/ShareSimulationOnSlice";
import { useTranslation } from "react-i18next";
import '../../css/menu.css'


export const ShareMenu = () => {
    const { vw } = useScreenSize(); // width 값 사용
    const { t } = useTranslation();
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
        <div className="menu-container">
            <div className="menu-grid1">
                <Box
                    display="flex"
                    alignItems="center"
                    onClick={handleSimulation}
                    sx={{
                        cursor: 'pointer',
                        opacity: 1,
                        mr: 2
                    }}>
                    <PlayArrowOutlinedIcon sx={{ color: 'white' }} />
                    <Typography
                        variant="body1"
                        ml={1}
                        color={'white'}
                    >{t('Simulation')}</Typography>
                </Box>
            </div>
            <div className="menu-grid2">
                <Box
                    display="flex"
                    alignItems="center"
                    onClick={isSimulationStart ? handleSimulationEnd : () => { }}
                    sx={{
                        cursor: isSimulationStart ? 'pointer' : 'not-allowed',
                        opacity: isSimulationStart ? 1 : 0.5,
                        mr: 2
                    }}>
                    <PlayArrowOutlinedIcon sx={{ color: 'white' }} />
                    <Typography
                        variant="body1"
                        ml={1}
                        color={isSimulationStart ? 'white' : 'gray'}
                    >{t('Simulation Reset')}</Typography>
                </Box>
            </div>
        </div>
    )
}