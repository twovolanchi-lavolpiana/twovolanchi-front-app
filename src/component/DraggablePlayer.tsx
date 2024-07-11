import React, { useEffect, useState } from 'react';
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import CircleIcon from '@mui/icons-material/Circle';

import '../css/Card.css';
import { PlayerPosition } from './PlayerPosition';
import { Box } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { setPossibleMoveState } from '../store/PossibleMoveSlice';
import { selectPlayer } from '../store/PlayerSlice';


type PlayerProps = {
    id: number,
    backNumber: number,
    team: 'red' | 'blue',
    left: number,
    top: number
    onClick: (event: React.MouseEvent<HTMLElement>, player: PlayerPosition) => void;
}

export const DraggablePlayer: React.FC<PlayerProps> = ({ id, team, backNumber, left, top, onClick }) => {
    const dispatch = useDispatch();
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
    const possibleMoveState = useSelector((state: RootState) => state.possibleMove);

    const handlePlayerMoveNotPossible = () => {
        if (!selectedPlayer || !possibleMoveState) return;
        dispatch(setPossibleMoveState({ playerId: null, isPossible: false }))
    }
    
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: ItemTypes.PLAYER,
        item: () => {
            handlePlayerMoveNotPossible()
            return { id, left, top };
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [id, left, top]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        handlePlayerMoveNotPossible()
        onClick(event, { id, team, backNumber, left, top });
    };

    useEffect(() => {
        if (!possibleMoveState.isPossible) {
            console.log('possibleMoveState has changed:', possibleMoveState);
        }
    }, [possibleMoveState]);

    return (
        <div
            ref={dragRef}
            onClick={handleClick}
            style={{
                position: 'absolute',
                left: `${left}px`,
                top: `${top}px`,
                transform: 'translate(-50%, -50%)',
                cursor: 'move',
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CircleIcon
                    className="draggable-icon"
                    sx={{
                        color: team === 'red' ? 'red' : 'blue',
                        fontSize: '2rem',
                    }}
                />
                <span
                    style={{
                        position: 'absolute',
                        color: 'white', // 텍스트 색상
                        fontSize: '1rem',
                        fontWeight: 'bold',
                    }}
                >
                    {id}
                </span>
            </Box>
        </div>
    );
}