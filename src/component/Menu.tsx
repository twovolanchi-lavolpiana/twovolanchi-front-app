import '../css/Card.css';
import { Box, Chip, IconButton, Stack } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import StartOutlinedIcon from '@mui/icons-material/StartOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { RootState } from '../store/Store';
import { useEffect } from 'react';
import { removeBackPlayerMovingSequences, setPlayerMovingSequences } from '../store/SequenceSlice';
import { setPossibleMoveState } from '../store/PossibleMoveSlice';
import { setPlayerViewState } from '../store/PlayerViewSlice';
import StopIcon from '@mui/icons-material/Stop';
import { setSimulationOn } from '../store/SimulationOnSlice';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

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
        if (!selectedPlayer || !possibleMoveState) return;
        dispatch(setPossibleMoveState({ playerId: null, isPossible: false }))
    }

    const handlePlayerRemoveBack = () => {
        if (!selectedPlayer || !possibleMoveState) return;
        dispatch(removeBackPlayerMovingSequences(selectedPlayer.id))
    }

    const handleSimulation = () => {
        if (!selectedPlayer || !possibleMoveState) return;
        dispatch(setPossibleMoveState({ playerId: null, isPossible: false }))
        dispatch(setSimulationOn({ isSimulationOn: true }))
    }

    const handlePlayerViewState = () => {
        dispatch(setPlayerViewState({ playerView: 'position' }))
    }

    useEffect(() => {
    }, [possibleMoveState]);

    useEffect(() => {
    }, [sequencesState]);

    return (
        <>
            {selectedPlayer && possibleMoveState.playerId !== selectedPlayer.id &&
                <Chip
                    variant="outlined"
                    color="warning"
                    icon={<DirectionsRunIcon />}
                    label="Move"
                    onClick={handlePlayerMovePossible}
                />
            }
            {selectedPlayer && possibleMoveState &&
                <Chip
                    variant="outlined"
                    color="warning"
                    icon={<ArrowBackIcon />}
                    label="Move Back"
                    onClick={handlePlayerRemoveBack}
                />
            }
            {selectedPlayer && possibleMoveState && possibleMoveState.isPossible &&
                <Chip
                    variant="outlined"
                    color="warning"
                    icon={<StopIcon />}
                    label="Stop"
                    onClick={handlePlayerMoveNotPossible}
                />
            }
            <Chip
                variant="outlined"
                color="warning"
                icon={<PlayArrowOutlinedIcon />}
                label="Simulation"
                onClick={handleSimulation}
            />
            <Chip
                variant="outlined"
                color="warning"
                icon={<RestartAltIcon />}
                label="Reset"
                onClick={handlePlayerMoveNotPossible}
            />
            <Chip
                variant="outlined"
                color="success"
                icon={<SettingsIcon />}
                label="Player View Change"
                onClick={handlePlayerViewState}
            />
            <Chip
                variant="outlined"
                color="success"
                icon={<StartOutlinedIcon />}
                label="Next Sequence"
                onClick={handlePlayerMoveNotPossible}
            />
        </>
    )
}