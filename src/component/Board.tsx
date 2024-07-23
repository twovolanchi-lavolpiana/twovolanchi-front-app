import '../App.css';
import '../css/main.css';
import { Menu } from './Menu'
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
import boardImage from "../image/board-background.jpg"

export const Board = () => {
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
                    <CardContent><Description /></CardContent>
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
                        <Ground players={players} /></CardContent>
                </Card>
                <Card
                    className="card card-grid3"
                    style={{
                        backgroundColor: "transparent"
                    }}
                >
                    <CardContent
                        sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
                    ><Menu editKey={null} /></CardContent>
                </Card>
                <Card
                    className="card card-grid4"
                    style={{
                        backgroundColor: "transparent"
                    }}
                >
                    <CardContent
                        sx={{ width: '100%' }}
                    ><PlayerList
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
                    ><PlayerList
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