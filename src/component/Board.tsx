import '../App.css';
import { Menu } from './Menu'
import { PlayerPlus } from './PlayerPlus';
import { Ground } from './Ground';
import { useEffect } from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { Card, CardContent, Stack } from '@mui/material';
import { useScreenSize } from '../provider/ScreenSizeProvider';
import { PlayerList } from './PlayerList';
import { Description } from './Description';

export const Board = () => {
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
    const players = useSelector((state: RootState) => state.players.players)
    const { vw } = useScreenSize(); // width 값 사용

    console.log("vw ==== ", vw);

    useEffect(() => {
        console.log(players)
    }, [players]);

    useEffect(() => {
        console.log(selectedPlayer)
    }, [selectedPlayer]);

    useEffect(() => {
    }, [vw]);

    return (
        <DndProvider backend={HTML5Backend}>
            {vw >= 14.96 ? (
                <div className='board-parent'>
                    <Card className="menu-bar" sx={{ width: 250, overflowY: 'auto' }}>
                        <CardContent>
                            <Stack direction="column" spacing={2}>
                                <Menu />
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card className="board-container">
                        <Stack
                            direction="column"
                            spacing={2}
                            sx={{
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                                paddingTop: 2,
                            }}>
                            <Description />
                            <Ground players={players} />
                        </Stack>
                    </Card>
                    <Card className="player-list">
                        <CardContent>
                            <PlayerList width={300} />
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className='board-parent' style={{width: '100%', minWidth: 800}}>
                    <Card className="board-container">
                        <Stack
                            direction="column"
                            spacing={2}
                            sx={{
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                                paddingTop: 2,
                            }}>
                            <Description />
                            <Ground players={players} />
                        </Stack>
                    </Card>
                    <Card className="menu-bar react-flex" sx={{ flexDirection: 'row', maxWidth: 800, marginTop: 5 }}>
                        <CardContent>
                            <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
                                <Menu />
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card
                        className="player-list"
                        sx={{
                            flexDirection: 'row',
                            width: 800,
                            marginTop: 5,
                        }}>
                        <CardContent
                            sx={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignContent: 'center',
                            }}
                        >
                            <PlayerList width={700}></PlayerList>
                        </CardContent>
                    </Card>
                </div>
            )}
        </DndProvider>
    );
}