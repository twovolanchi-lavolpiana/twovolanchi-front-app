import '../css/Board.css';
import { Menu } from './Menu'
import { PlayerPlus } from './PlayerPlus';
import { Ground } from './Ground';
import { useEffect, useState } from 'react'
import { PlayerPosition } from './PlayerPosition';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { PlayerPositionEnum } from './PlayerPositionEnum';

export const Board = () => {
    const [players, setPlayers] = useState<PlayerPosition[]>([]);
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
    const [playerId, setPlayerId] = useState(0);

    const handleAddPlayer = (team: 'red' | 'blue', left: number, top: number, position: PlayerPositionEnum) => {
        const newPlayer = {
            id: playerId,
            backNumber: playerId,
            position: position,
            team: team,
            left: left,
            top: top,            
        };
        setPlayers([...players, newPlayer]);
        setPlayerId(playerId + 1);
    };

    const movePlayer = (id: number, left: number, top: number) => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((player) =>
                player.id === id ? { ...player, left: left, top: top } : player
            )
        );
    };

    useEffect(() => {
        console.log(players)
    }, [players]);

    useEffect(() => {
        console.log(selectedPlayer)
    }, [selectedPlayer]);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="board-container">
                <div className="board-image">
                    <Ground players={players} movePlayer={movePlayer} />
                </div>
                <div className="board-sidebar">
                    <div className='cards'>
                        <div className="cards__container">
                            <PlayerPlus onAddPlayer={handleAddPlayer} />
                            <Menu />
                        </div>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
}