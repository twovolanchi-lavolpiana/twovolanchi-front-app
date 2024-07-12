import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
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
            {selectedPlayer && possibleMoveState.playerId !== selectedPlayer.id && (
                <Box display="flex" alignItems="center" onClick={handlePlayerMovePossible} sx={{ cursor: 'pointer' }}>
                    <DirectionsRunIcon color="warning" />
                    <Typography variant="body1" color="warning" ml={1}>Move</Typography>
                </Box>
            )}
            {selectedPlayer && possibleMoveState && (
                <Box display="flex" alignItems="center" onClick={handlePlayerRemoveBack} sx={{ cursor: 'pointer' }}>
                    <ArrowBackIcon color="warning" />
                    <Typography variant="body1" color="warning" ml={1}>Move Back</Typography>
                </Box>
            )}
            {selectedPlayer && possibleMoveState && possibleMoveState.isPossible && (
                <Box display="flex" alignItems="center" onClick={handlePlayerMoveNotPossible} sx={{ cursor: 'pointer' }}>
                    <StopIcon color="warning" />
                    <Typography variant="body1" color="warning" ml={1}>Stop</Typography>
                </Box>
            )}
            <Box display="flex" alignItems="center" onClick={handleSimulation} sx={{ cursor: 'pointer' }}>
                <PlayArrowOutlinedIcon color="warning" />
                <Typography variant="body1" color="warning" ml={1}>Simulation</Typography>
            </Box>
            <Box display="flex" alignItems="center" onClick={handlePlayerMoveNotPossible} sx={{ cursor: 'pointer' }}>
                <RestartAltIcon color="warning" />
                <Typography variant="body1" color="warning" ml={1}>Reset</Typography>
            </Box>
            <Box display="flex" alignItems="center" onClick={handlePlayerViewState} sx={{ cursor: 'pointer' }}>
                <SettingsIcon color="success" />
                <Typography variant="body1" color="success" ml={1}>Player Profile</Typography>
            </Box>
            <Box display="flex" alignItems="center" onClick={handlePlayerMoveNotPossible} sx={{ cursor: 'pointer' }}>
                <StartOutlinedIcon color="success" />
                <Typography variant="body1" color="success" ml={1}>Next Slice</Typography>
            </Box>
        </>
    )
}