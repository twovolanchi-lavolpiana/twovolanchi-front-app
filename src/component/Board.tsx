import '../App.css';
import '../css/test.css';
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
import { useTranslation } from 'react-i18next';

export const Board = () => {
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
    const players = useSelector((state: RootState) => state.players.players)
    const { vw } = useScreenSize(); // width 값 사용
    const { t } = useTranslation();


    useEffect(() => {
    }, [players]);

    useEffect(() => {
    }, [selectedPlayer]);

    useEffect(() => {
    }, [vw]);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className='board-parent'>
                <div className='container'>
                    <Card className="card card-grid1">
                        <CardContent><Description /></CardContent>
                    </Card>
                    <Card className="card card-grid6">
                        <CardContent><Description /></CardContent>
                    </Card>
                    <Card className="card card-grid2">
                        <CardContent><Ground players={players} /></CardContent>
                    </Card>
                    <Card className="card card-grid3">
                        <CardContent><Menu editKey={null} /></CardContent>
                    </Card>
                    <Card className="card card-grid4">
                        <CardContent><PlayerList width={300} /></CardContent>
                    </Card>
                    <Card className="card card-grid5">
                        <CardContent><PlayerList width={300} /></CardContent>
                    </Card>
                </div>
            </div>
        </DndProvider>
    );
}