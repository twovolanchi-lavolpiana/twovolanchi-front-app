import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { setPossibleMoveState } from '../store/PossibleMoveSlice';
import { useEffect } from 'react';
import { PlayerPositionEnum } from './PlayerPositionEnum';
import { Box, Typography } from '@mui/material';
import { setPlayer } from '../store/PlayersListSlice';
import { selectPlayer } from '../store/PlayerSlice';
import { plusPlayerId } from '../store/PlayerIdSlice';
import { setBall } from '../store/BallSlice';
import { setBallSequences } from '../store/SequenceSlice';

export const PlayerPlus: React.FC = () => {
    const defaultName = "Messi";

    const dispatch = useDispatch();
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
    const possibleMoveState = useSelector((state: RootState) => state.possibleMove);
    const players = useSelector((state: RootState) => state.players.players);
    const playerId = useSelector((state: RootState) => state.playerId.id);
    const ball = useSelector((state: RootState) => state.ball.ball);

    const handlePlayerMoveNotPossible = () => {
        if (!selectedPlayer || !possibleMoveState) return;
        dispatch(setPossibleMoveState({ playerId: null, isPossible: false }))
    }

    const handleAddPlayer = (team: 'home' | 'away', position: PlayerPositionEnum) => {
        handlePlayerMoveNotPossible()
        const left = 50; // 50%
        const top = 50; // 50%

        const newPlayer = {
            id: playerId,
            backNumber: playerId,
            name: defaultName,
            position: position,
            team: team,
            left: left,
            top: top,
        };
        dispatch(setPlayer(newPlayer));
        dispatch(selectPlayer(newPlayer));
        dispatch(plusPlayerId());
    };


    const handleSetBall = () => {
        handlePlayerMoveNotPossible()
        const left = 50; // 50%
        const top = 50; // 50%

        const ball = {
            left: left,
            top: top,
        };
        dispatch(setBall(ball));
        dispatch(setBallSequences({left, top}));
    };

    useEffect(() => {
    }, [possibleMoveState]);

    useEffect(() => {
    }, [players])

    useEffect(() =>{
        console.log("ball  = ", ball)
    }, [ball])

    return (
        <>
            <Box display="flex" alignItems="center" onClick={() => handleAddPlayer('home', PlayerPositionEnum.CM)} sx={{ cursor: 'pointer' }}>
                <AddOutlinedIcon sx={{ color: '#3B6FB2' }} />
                <Typography variant="body1" ml={1}>Home Team Player</Typography>
            </Box>
            <Box display="flex" alignItems="center" onClick={() => handleAddPlayer('away', PlayerPositionEnum.CM)} sx={{ cursor: 'pointer' }}>
                <AddOutlinedIcon sx={{ color: '#B23B7F' }} />
                <Typography variant="body1" ml={1}>Away Team Player</Typography>
            </Box>
            <Box
                display="flex"
                alignItems="center"
                onClick={!ball ? handleSetBall : undefined}
                sx={{
                    cursor: !ball ? 'pointer' : 'not-allowed',
                    opacity: !ball ? 1 : 0.5
                }}>
                <AddOutlinedIcon sx={{ color: 'black' }} />
                <Typography variant="body1" ml={1} color={!ball ? 'black' : 'gray'}>Ball</Typography>
            </Box>
        </>
    )
}