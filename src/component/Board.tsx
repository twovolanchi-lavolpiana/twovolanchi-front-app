import boardImage from '../image/board2.jpeg'
import '../css/Board.css';
import { Card } from './Card'
import { PlayerCard } from './PlayerCard';


export const Board = () => {
    return (
        <div className="board-container">
            <div className="board-sidebar">
                <PlayerCard/>
            </div>
            <div className="board-image">
                <img src={boardImage} alt="board" />
            </div>
            <div className="board-sidebar">
                <Card/>
            </div>
        </div>
    )
}