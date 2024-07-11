
import React from 'react';
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

type PlayerProps = {
    id: number,
    team: 'red' | 'blue',
    left: number,
    top: number;
}

export const DraggablePlayer: React.FC<PlayerProps> = ({ id, team, left, top }) => {
    console.log(id, team, left, top)
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.PLAYER,
        item: { id, left, top },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [id, left, top]);

    return (
        <div
            ref={drag}
            style={{
                position: 'absolute',
                left: `${left}px`,
                top: `${top}px`,
                transform: 'translate(-50%, -50%)',
                cursor: 'move',
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            <CircleOutlinedIcon
                sx={{
                    color: team === 'red' ? 'red' : 'blue',
                    fontSize: '2rem',
                }}
            />
        </div>
    );
}