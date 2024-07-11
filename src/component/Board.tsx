import '../css/Board.css';
import { Menu } from './Menu'
import { PlayerPlus } from './PlayerPlus';
import { Ground } from './Ground';
import { useState } from 'react'
import { PlayerPosition } from './PlayerPosition';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { PlayerProfile } from './PlayerProfile';

export const Board = () => {
    const [players, setPlayers] = useState<PlayerPosition[]>([]);
    const [playerId, setPlayerId] = useState(0);

    const handleAddPlayer = (team: 'red' | 'blue', left: number, top: number) => {
        const newPlayer = {
            id: playerId,
            backNumber: playerId,
            team,
            left,
            top,
        };
        setPlayers([...players, newPlayer]);
        setPlayerId(playerId + 1);
    };

    const movePlayer = (id: number, left: number, top: number) => {
        console.log("move Player = ", id, left, top)
        setPlayers((prevPlayers) =>
            prevPlayers.map((player) =>
                player.id === id ? { ...player, left: left, top: top } : player
            )
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="board-container">
                <div className="board-image">
                    <Ground players={players} movePlayer={movePlayer} />
                </div>
                <div className="board-sidebar">
                    <PlayerProfile />
                    <PlayerPlus onAddPlayer={handleAddPlayer} />
                    <Menu />
                </div>
            </div>
        </DndProvider>
    );
}