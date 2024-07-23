import '../../App.css';
import '../../css/main.css';
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
import boardImage from "../../image/board-background.jpg"

type BoardProps = {
    title: string;
    description: string;
    players: PlayerPosition[];
    tactics: Tactics;
}

export const ShareBoard: React.FC<BoardProps> = ({ title, description, players, tactics }) => {
    const { vw } = useScreenSize(); // width 값 사용

    useEffect(() => {
    }, [players]);

    useEffect(() => {
    }, [vw]);

    return (
        <DndProvider backend={HTML5Backend}>
            <div
                className='container'
                style={{
                    background: `url(${boardImage}) no-repeat center center`,
                    backgroundSize: 'cover'
                }}
            >
                <Card
                    className="card card-grid1"
                    style={{
                        backgroundColor: "transparent"
                    }}
                >
                    <CardContent>
                        <ShareDescription
                            title={title}
                            description={description}
                        />
                    </CardContent>
                </Card>
                <Card
                    className="card card-grid2"
                    style={{
                        backgroundColor: "transparent"
                    }}
                >
                    <CardContent
                        sx={{ width: '100%' }}
                    >
                        <ShareGround players={players} tactics={tactics} />
                    </CardContent>
                </Card>
                <Card
                    className="card card-grid3"
                    style={{
                        backgroundColor: "transparent"
                    }}
                >
                    <CardContent
                        sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
                    ><ShareMenu /></CardContent>
                </Card>
                <Card
                    className="card card-grid4"
                    style={{
                        backgroundColor: "transparent"
                    }}
                >
                    <CardContent
                        sx={{ width: '100%' }}
                    ><SharePlayerList
                            filteredPlayers={
                                players.filter((p) => {
                                    return p.team === 'HOME';
                                })
                            }
                        /></CardContent>
                </Card>
                <Card
                    className="card card-grid5"
                    style={{
                        backgroundColor: "transparent"
                    }}
                >
                    <CardContent
                        sx={{ width: '100%' }}
                    ><SharePlayerList
                            filteredPlayers={
                                players.filter((p) => {
                                    return p.team === 'AWAY';
                                })
                            }
                        /></CardContent>
                </Card>
            </div>
        </DndProvider>
    );
}