import '../css/Card.css';
import Chip from '@mui/material/Chip';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { setPossibleMoveState } from '../store/PossibleMoveSlice';
import { useEffect } from 'react';
import { PlayerPositionEnum } from './PlayerPositionEnum';

interface PlayerPlusProps {
    onAddPlayer: (team: 'red' | 'blue', x: number, y: number, position: PlayerPositionEnum) => void;
}

export const PlayerPlus: React.FC<PlayerPlusProps> = ({ onAddPlayer }) => {
    const dispatch = useDispatch();
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
    const possibleMoveState = useSelector((state: RootState) => state.possibleMove);

    const handlePlayerMoveNotPossible = () => {
        if (!selectedPlayer || !possibleMoveState) return;
        dispatch(setPossibleMoveState({ playerId: null, isPossible: false }))
    }

    const handleAddPlayer = (team: 'red' | 'blue', position: PlayerPositionEnum) => {
        handlePlayerMoveNotPossible()
        const x = 205; // 임의의 x 좌표
        const y = 298; // 임의의 y 좌표
        onAddPlayer(team, x, y, position);
    };

    useEffect(() => {
    }, [possibleMoveState]);

    return (
        <>
            <Chip
                variant="outlined"
                color="error"
                icon={<AddOutlinedIcon />}
                label="Red Team Player"
                onClick={() => handleAddPlayer('red', PlayerPositionEnum.CM)}
            />
            <Chip
                variant="outlined"
                color="primary"
                icon={<AddOutlinedIcon />}
                label="Blue Team Player"
                onClick={() => handleAddPlayer('blue', PlayerPositionEnum.CM)}
            />
        </>
    )
}