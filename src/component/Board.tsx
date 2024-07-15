import '../App.css';
import { Menu } from './Menu'
import { PlayerPlus } from './PlayerPlus';
import { Ground } from './Ground';
import { useEffect } from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { Card, CardContent, Stack } from '@mui/material';
import { ScreenSizeProvider } from '../provider/ScreenSizeProvider';
import SoccerField from './SoccerField';
import { PlayerList } from './PlayerList';

export const Board = () => {
    const dispatch = useDispatch();
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
    const players = useSelector((state: RootState) => state.players.players)

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
                                <PlayerPlus />
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