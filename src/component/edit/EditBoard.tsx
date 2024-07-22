import '../../App.css';
import { Menu } from '../Menu'
import { Ground } from '../Ground';
import { useEffect } from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { Card, CardContent, Stack } from '@mui/material';
import { useScreenSize } from '../../provider/ScreenSizeProvider';
import { PlayerList } from '../PlayerList';
import { Description } from '../Description';

export type EditProps = {
    editKey: string
}

export const EditBoard: React.FC<EditProps> = ({ editKey }) => {
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
    const players = useSelector((state: RootState) => state.players.players)
    const { vw } = useScreenSize(); // width 값 사용

    useEffect(() => {
    }, [players]);

    useEffect(() => {
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
                                <Menu
                                    editKey={editKey} />
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
                            <PlayerList
                                filteredPlayers={
                                    players.filter((p) => {
                                        return p.team === 'HOME';
                                    })
                                }
                            />
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className='board-parent' style={{ width: '100%', minWidth: 800 }}>
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
                                <Menu
                                    editKey={editKey}
                                />
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card
                        className="player-list"
                        sx={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 800,
                            marginTop: 5,
                        }}>
                        <CardContent
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignContent: 'center',
                                width: '100%',  // CardContent의 너비를 카드 전체 너비로 설정
                                marginTop: 3
                            }}
                        >
                            <PlayerList
                                filteredPlayers={
                                    players.filter((p) => {
                                        return p.team === 'AWAY';
                                    })
                                }
                            ></PlayerList>
                        </CardContent>
                    </Card>
                </div>
            )}
        </DndProvider>
    );
}