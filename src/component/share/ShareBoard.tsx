import '../../App.css';
import { ShareMenu } from './ShareMenu'
import { ShareGround } from './ShareGround';
import { useEffect } from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardContent, Stack } from '@mui/material';
import { useScreenSize } from '../../provider/ScreenSizeProvider';
import { ShareDescription } from './ShareDescription';
import { Tactics } from '../../store/Tactics';
import { SharePlayerList } from './SharePlayerList';
import { PlayerPosition } from '../PlayerPosition';

type BoardProps = {
    title: string;
    description: string;
    players: PlayerPosition[];
    tactics: Tactics;
}

export const ShareBoard: React.FC<BoardProps> = ({ title, description, players, tactics }) => {    
    const { vw } = useScreenSize(); // width 값 사용

    useEffect(() => {
        console.log(players)
    }, [players]);

    useEffect(() => {
    }, [vw]);

    return (
        <DndProvider backend={HTML5Backend}>
            {vw >= 14.96 ? (
                <div className='board-parent'>
                    <Card className="menu-bar" sx={{ width: 250, overflowY: 'auto' }}>
                        <CardContent>
                            <Stack direction="column" spacing={2}>
                                <ShareMenu />
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
                            <ShareDescription 
                                title={title}
                                description={description}
                            />
                            <ShareGround players={players} tactics={tactics} />
                        </Stack>
                    </Card>
                    <Card className="player-list">
                        <CardContent>
                            <SharePlayerList width={300} players={players}/>
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
                            <ShareDescription 
                                title={title}
                                description={description}
                            />
                            <ShareGround players={players} tactics={tactics} />
                        </Stack>
                    </Card>
                    <Card className="menu-bar react-flex" sx={{ flexDirection: 'row', maxWidth: 800, marginTop: 5 }}>
                        <CardContent>
                            <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
                                <ShareMenu />
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
                            <SharePlayerList width={700} players={players}></SharePlayerList>
                        </CardContent>
                    </Card>
                </div>
            )}
        </DndProvider>
    );
}