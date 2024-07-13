import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { setPossibleMoveState } from '../store/PossibleMoveSlice';
import { useEffect } from 'react';
import { PlayerPositionEnum } from './PlayerPositionEnum';
import { Box, Typography } from '@mui/material';

interface PlayerPlusProps {
    onAddPlayer: (team: 'home' | 'away', x: number, y: number, position: PlayerPositionEnum) => void;
}

export const PlayerPlus: React.FC<PlayerPlusProps> = ({ onAddPlayer }) => {
    const dispatch = useDispatch();
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
    const possibleMoveState = useSelector((state: RootState) => state.possibleMove);

    const handlePlayerMoveNotPossible = () => {
        if (!selectedPlayer || !possibleMoveState) return;
        dispatch(setPossibleMoveState({ playerId: null, isPossible: false }))
    }

    const handleAddPlayer = (team: 'home' | 'away', position: PlayerPositionEnum) => {
        handlePlayerMoveNotPossible()
        const left = 50; // 50%
        const top = 50; // 50%
        onAddPlayer(team, left, top, position);
    };

    useEffect(() => {
    }, [possibleMoveState]);

    return (
        <>
            <Box display="flex" alignItems="center" onClick={() => handleAddPlayer('home', PlayerPositionEnum.CM)} sx={{ cursor: 'pointer' }}>
                <AddOutlinedIcon sx={{ color: '#3B6FB2'}} />
                <Typography variant="body1" ml={1}>Home Team Player</Typography>
            </Box>
            <Box display="flex" alignItems="center" onClick={() => handleAddPlayer('away', PlayerPositionEnum.CM)} sx={{ cursor: 'pointer' }}>
                <AddOutlinedIcon sx={{ color: '#B23B7F'}} />
                <Typography variant="body1" ml={1}>Away Team Player</Typography>
            </Box>
        </>
    )
}