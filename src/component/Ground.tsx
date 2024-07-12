import { Box } from '@mui/material';
import boardImage from '../image/board5.png'
import { PlayerPosition } from './PlayerPosition';
import { useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { DraggablePlayer } from './DraggablePlayer';
import { useDispatch, useSelector } from 'react-redux';
import { selectPlayer } from '../store/PlayerSlice';
import { RootState } from '../store/Store';
import { setPlayerMovingSequences } from '../store/SequenceSlice';
import SoccerField from './SoccerField';

interface GroundProps {
    players: PlayerPosition[];
    movePlayer: (id: number, left: number, top: number) => void;
}

export const Ground: React.FC<GroundProps> = ({ players, movePlayer }) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const possibleMoveState = useSelector((state: RootState) => state.possibleMove)
    const selectedPlayer = useSelector((state: RootState) => state.player.selectedPlayer);
    const sequences = useSelector((state: RootState) => state.sequences)
    const simulationOnState = useSelector((state: RootState) => state.simulationOn)
    const dispatch = useDispatch()

    const [, drop] = useDrop({
        accept: ItemTypes.PLAYER,
        drop: (item: PlayerPosition, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset() as { x: number, y: number };
            const left = Math.round(item.left + delta.x);
            const top = Math.round(item.top + delta.y);
            movePlayer(item.id, left, top);
            dispatch(selectPlayer({ id: item.id, backNumber: item.backNumber, team: item.team, left, top, position: item.position }));
            dispatch(setPlayerMovingSequences({ id: item.id, left, top, team: item.team, isFirst: true }));
        },
    });

    const handlePlayerClick = (event: React.MouseEvent<HTMLElement>, player: PlayerPosition) => {
        dispatch(selectPlayer(player));
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!imgRef.current || !possibleMoveState || !possibleMoveState.isPossible || !selectedPlayer) return;

        const rect = imgRef.current.getBoundingClientRect();
        const clickedLeft = event.clientX - rect.left
        const clickedTop = event.clientY - rect.top;
        const { id, left, top, team } = selectedPlayer;

        dispatch(setPlayerMovingSequences({ id, left: clickedLeft, top: clickedTop, team: team, isFirst: false }));
    }

    useEffect(() => {
        if (imgRef.current) {
            const rect = imgRef.current.getBoundingClientRect();
            console.log(rect);
        }
    }, [imgRef]);

    useEffect(() => {
    }, [sequences]);

    useEffect(() => {
    }, [possibleMoveState]);

    useEffect(() => {
    }, [selectedPlayer]);

    useEffect(() => {
    }, [simulationOnState])

    return (
        <Box
            ref={drop}
            onClick={handleClick}
        >
            <SoccerField/>
            {/* <img ref={imgRef} src={boardImage} alt="board" style={{ width: '100%', height: '100%' }} /> */}
            {/* {players.map((player) => (
                <DraggablePlayer
                    key={player.id}
                    id={player.id}
                    backNumber={player.backNumber}
                    team={player.team}
                    left={player.left}
                    top={player.top}
                    position={player.position}
                    onClick={handlePlayerClick} />
            ))}
            {
                !simulationOnState.isSimulationOn && <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 50 }}>
                    <defs>
                        <marker
                            id="arrow-blue"
                            viewBox="0 0 10 10"
                            refX="5"
                            refY="5"
                            markerWidth="3"
                            markerHeight="3"
                            opacity={0.7}
                            orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill='blue' />
                        </marker>
                    </defs>
                    <defs>
                        <marker
                            id="arrow-red"
                            viewBox="0 0 10 10"
                            refX="5"
                            refY="5"
                            markerWidth="3"
                            markerHeight="3"
                            opacity={0.7}
                            orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill='red' />
                        </marker>
                    </defs>

                    {sequences.sequences.map(sequence => (
                        sequence.moves.map((move) => (
                            move.sequence.map((location, index) => (
                                index !== 0 && (
                                    <line
                                        key={`${move.id}-${index}`}
                                        x1={move.sequence[index - 1].left}
                                        y1={move.sequence[index - 1].top}
                                        x2={location.left}
                                        y2={location.top}
                                        stroke={location.team}
                                        strokeWidth="5"
                                        strokeOpacity={0.7}
                                        markerEnd={location.team === 'red' ? 'url(#arrow-red)' : 'url(#arrow-blue)'}
                                    />
                                )
                            ))
                        ))
                    ))}
                </svg>
            } */}
        </Box>
    );
};