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
import { removeBackPlayerMovingSequences, setPlayerMovingSequences } from '../store/SequenceSlice';
import { setPossibleMoveState } from '../store/PossibleMoveSlice';

export const Menu = () => {
    const dispatch = useDispatch();
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
    const sequencesState = useSelector((state: RootState) => state.sequences);
    const possibleMoveState = useSelector((state: RootState) => state.possibleMove);

    const handlePlayerMovePossible = () => {
        if (!selectedPlayer) return;
        const { id, left, top, team } = selectedPlayer;
        dispatch(setPossibleMoveState({ playerId: id, isPossible: true }))
        dispatch(setPlayerMovingSequences({ id, left, top, team, isFirst: true }));
    }

    const handlePlayerMoveNotPossible = () => {
        if (!selectedPlayer || !possibleMoveState || possibleMoveState.isPossible) return;
        dispatch(setPossibleMoveState({ playerId: null, isPossible: false }))
    }

    const handlePlayerRemoveBack = () => {
        if (!selectedPlayer || !possibleMoveState) return;
        dispatch(removeBackPlayerMovingSequences(selectedPlayer.id))
    }

    useEffect(() => {
    }, [possibleMoveState]);

    useEffect(() => {
    }, [sequencesState]);

    return (
        <div className='cards'>
            <div className="cards__container">
                <Stack direction="column" spacing={2}>
                    {selectedPlayer && possibleMoveState.playerId !== selectedPlayer.id && <Chip
                        variant="outlined"
                        color="warning"
                        icon={<SportsSoccerIcon />}
                        label="Move"
                        onClick={handlePlayerMovePossible}
                    />}
                    {selectedPlayer && possibleMoveState.playerId !== selectedPlayer.id && <Chip
                        variant="outlined"
                        color="warning"
                        icon={<ArrowBackIcon />}
                        label="Back"
                        onClick={handlePlayerRemoveBack}
                    />}
                    {selectedPlayer && possibleMoveState.playerId !== null && <Chip
                        variant="outlined"
                        color="warning"
                        icon={<SportsSoccerIcon />}
                        label="Stop"
                        onClick={handlePlayerMoveNotPossible}
                    />}
                    <Chip
                        variant="outlined"
                        color="warning"
                        icon={<SkipNextOutlinedIcon />}
                        label="Simulation"
                        onClick={handlePlayerMoveNotPossible}
                    />
                    <Chip
                        variant="outlined"
                        color="warning"
                        icon={<NavigateNextOutlinedIcon />}
                        label="Save Sequence"
                        onClick={handlePlayerMoveNotPossible}
                    />
                    <Chip
                        variant="outlined"
                        color="warning"
                        icon={<RestartAltIcon />}
                        label="Reset"
                        onClick={handlePlayerMoveNotPossible}
                    />
                </Stack>
            </div>
        </div>
    )
}