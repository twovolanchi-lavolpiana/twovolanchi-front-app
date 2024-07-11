import '../css/Card.css';
import { Box, IconButton, Stack } from "@mui/material";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import StartOutlinedIcon from '@mui/icons-material/StartOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { RootState } from '../store/Store';
import { useEffect } from 'react';
import { removeBackPlayerMovingSequences, setPlayerMovingSequences } from '../store/SequenceSlice';
import { setPossibleMoveState } from '../store/PossibleMoveSlice';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';

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

    useEffect(() => {
    }, [possibleMoveState]);

    useEffect(() => {
    }, [sequencesState]);

    return (
        <>
            {selectedPlayer && possibleMoveState.playerId !== selectedPlayer.id &&
                <Box sx={{ display: 'inline-block', border: '1px solid orange', borderRadius: '50%', margin: '5px' }}>
                    <IconButton color="warning" onClick={handlePlayerMovePossible}>
                        <TrendingUpOutlinedIcon />
                    </IconButton>
                </Box>
            }
            {selectedPlayer && possibleMoveState &&
                <Box sx={{ display: 'inline-block', border: '1px solid orange', borderRadius: '50%', margin: '5px' }}>
                    <IconButton color="warning" onClick={handlePlayerRemoveBack}>
                        <ArrowBackIcon />
                    </IconButton>
                </Box>
            }
            <Box sx={{ display: 'inline-block', border: '1px solid orange', borderRadius: '50%', margin: '5px' }}>
                <IconButton color="warning" onClick={handlePlayerMoveNotPossible}>
                    <PlayArrowOutlinedIcon />
                </IconButton>
            </Box>
            <Box sx={{ display: 'inline-block', border: '1px solid orange', borderRadius: '50%', margin: '5px' }}>
                <IconButton color="warning" onClick={handlePlayerMoveNotPossible}>
                    <RestartAltIcon />
                </IconButton>
            </Box>
            <Box sx={{ display: 'inline-block', border: '1px solid orange', borderRadius: '50%', margin: '5px' }}>
                <IconButton color="warning" onClick={handlePlayerMoveNotPossible}>
                    <StartOutlinedIcon />
                </IconButton>
            </Box>
        </>
    )
}