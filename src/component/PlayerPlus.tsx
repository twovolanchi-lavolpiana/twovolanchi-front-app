import '../css/Card.css';
import { Stack } from "@mui/material";
import Chip from '@mui/material/Chip';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { setPossibleMoveState } from '../store/PossibleMoveSlice';
import { useEffect } from 'react';

interface PlayerPlusProps {
    onAddPlayer: (team: 'red' | 'blue', x: number, y: number) => void;
}

export const PlayerPlus: React.FC<PlayerPlusProps> = ({ onAddPlayer }) => {
    const dispatch = useDispatch();
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
    const possibleMoveState = useSelector((state: RootState) => state.possibleMove);

    const handlePlayerMoveNotPossible = () => {
        if (!selectedPlayer || !possibleMoveState) return;
        dispatch(setPossibleMoveState({ playerId: null, isPossible: false }))
    }

    const handleAddPlayer = (team: 'red' | 'blue') => {
        handlePlayerMoveNotPossible()
        const x = 205; // 임의의 x 좌표
        const y = 298; // 임의의 y 좌표
        onAddPlayer(team, x, y);
    };

    useEffect(() => {
    }, [possibleMoveState]);

    return (
        <div className='cards'>
            <div className="cards__container">
                <Stack direction="column" spacing={2}>
                    <Chip
                        variant="outlined"
                        color="error"
                        icon={<AddCircleOutlineOutlinedIcon />}
                        label="Red Team Player"
                        onClick={() => handleAddPlayer('red')}
                    />
                    <Chip
                        variant="outlined"
                        color="primary"
                        icon={<AddCircleOutlineOutlinedIcon />}
                        label="Blue Team Player"
                        onClick={() => handleAddPlayer('blue')}
                    />
                </Stack>
            </div>
        </div>
    )
}