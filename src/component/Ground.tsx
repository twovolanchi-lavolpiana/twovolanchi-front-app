import { Box } from '@mui/material';
import boardImage from '../image/board2.jpeg'
import { PlayerPosition } from './PlayerPosition';
import { useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { DraggablePlayer } from './DraggablePlayer';

interface GroundProps {
    players: PlayerPosition[];
    movePlayer: (id: number, left: number, top: number) => void;
}

export const Ground: React.FC<GroundProps> = ({ players, movePlayer }) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const [, drop] = useDrop({
        accept: ItemTypes.PLAYER,
        drop: (item: PlayerPosition, monitor) => {
            console.log("item = ", item)
            const delta = monitor.getDifferenceFromInitialOffset() as { x: number, y: number };
            const left = Math.round(item.left + delta.x);
            const top = Math.round(item.top + delta.y);
            movePlayer(item.id, left, top);
        },
    });

    useEffect(() => {
        if (imgRef.current) {
          const rect = imgRef.current.getBoundingClientRect();
          console.log(rect);
        }
      }, [imgRef]);

    return (
        <Box
            ref={drop}
            sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}
        >
            <img ref={imgRef} src={boardImage} alt="board" style={{ width: '100%', height: '100%' }} />
            {players.map((player) => (
                <DraggablePlayer key={player.id} id={player.id} team={player.team} left={player.left} top={player.top} />
            ))}
        </Box>
    );
};