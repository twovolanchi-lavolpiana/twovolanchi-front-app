import '../App.css';
import { Menu } from './Menu'
import { PlayerPlus } from './PlayerPlus';
import { Ground } from './Ground';
import { useEffect, useState } from 'react'
import { PlayerPosition } from './PlayerPosition';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { PlayerPositionEnum } from './PlayerPositionEnum';
import { Card, CardContent, Grid, Stack } from '@mui/material';
import { ScreenSizeProvider } from '../provider/ScreenSizeProvider';
import SoccerField from './SoccerField';
import { setPlayer } from '../store/PlayersListSlice';
import { PlayerList } from './PlayerList';

export const Board = () => {
    const defaultName = "Messi";
    const dispatch = useDispatch();
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
    const players = useSelector((state: RootState) => state.players.players);
    const [playerId, setPlayerId] = useState(0);

    const handleAddPlayer = (team: 'home' | 'away', left: number, top: number, position: PlayerPositionEnum) => {
        const newPlayer = {
            id: playerId,
            backNumber: playerId,
            name: defaultName,
            position: position,
            team: team,
            left: left,
            top: top,
        };
        dispatch(setPlayer(newPlayer))
        setPlayerId(playerId + 1);
    };

    useEffect(() => {
        console.log(players)
    }, [players]);

    useEffect(() => {
        console.log(selectedPlayer)
    }, [selectedPlayer]);

    return (
        <ScreenSizeProvider>
            <DndProvider backend={HTML5Backend}>
                <div className='board-parent'>
                    <Card>
                        <CardContent>
                            <Stack direction="column" spacing={2}>
                                <PlayerPlus onAddPlayer={handleAddPlayer} />
                                <Menu />
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card className="board-container">
                        <Ground players={players} />
                    </Card>
                    <Card>
                        <CardContent>
                            <PlayerList></PlayerList>
                        </CardContent>
                    </Card>
                </div>
                <div className='simulation-card' >
                    <SoccerField></SoccerField>
                </div>
            </DndProvider>
        </ScreenSizeProvider>
    );
}