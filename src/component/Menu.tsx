import '../css/Card.css';
import { Stack } from "@mui/material";
import Chip from '@mui/material/Chip';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { useEffect } from 'react';
import { setPlayerMovingSequences } from '../store/SequenceSlice';
import { setPossibleMoveState } from '../store/PossibleMoveSlice';

export const Menu = () => {
    const dispatch = useDispatch();
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
    const sequencesState = useSelector((state: RootState) => state.sequences);
    const possibleMoveState = useSelector((state: RootState) => state.possibleMove);

    useEffect(() => {
        console.log("possibleMoveState = ", possibleMoveState);
      }, [possibleMoveState]);

    useEffect(() => {
        console.log("sequencesState = ", sequencesState);
      }, [sequencesState]);

    const handlePlayerMovePossible = () => {
        if (!selectedPlayer) return;
        const {id, left, top} = selectedPlayer;
        dispatch(setPossibleMoveState({isPossible: true}))
        dispatch(setPlayerMovingSequences({ id, left, top}));
    }

    return (
        <div className='cards'>
            <div className="cards__container">
                <Stack direction="column" spacing={2}>
                    {selectedPlayer && <Chip 
                    variant="outlined" 
                    color="warning" 
                    icon={<SportsSoccerIcon />} 
                    label="Move"
                    onClick={handlePlayerMovePossible}
                    />}
                    {selectedPlayer && <Chip variant="outlined" color="warning" icon={<ArrowBackIcon />} label="Back" />}
                    <Chip variant="outlined" color="warning" icon={<SkipNextOutlinedIcon />} label="Simulation" />
                    <Chip variant="outlined" color="warning" icon={<NavigateNextOutlinedIcon />} label="Save Sequence" />
                    <Chip variant="outlined" color="warning" icon={<RestartAltIcon />} label="Reset" />
                </Stack>
            </div>
        </div>
    )
}