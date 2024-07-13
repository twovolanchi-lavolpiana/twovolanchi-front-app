import { Box } from '@mui/material';
import boardImage from '../image/board5.png'
import { PlayerPosition } from './PlayerPosition';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { DraggablePlayer } from './DraggablePlayer';
import { useDispatch, useSelector } from 'react-redux';
import { selectPlayer } from '../store/PlayerSlice';
import { RootState } from '../store/Store';
import { setPlayerMovingSequences } from '../store/SequenceSlice';
import { useScreenSize } from '../provider/ScreenSizeProvider';

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
    const { updateScreenSize } = useScreenSize();

    const [, drop] = useDrop({
        accept: ItemTypes.PLAYER,
        drop: (item: PlayerPosition, monitor) => {
            if (!imgRef.current) return;

            const delta = monitor.getDifferenceFromInitialOffset() as { x: number, y: number };
            const rect = imgRef.current.getBoundingClientRect();

            const realLeft = (item.left / 100) * rect.width;
            const realTop = (item.top / 100) * rect.height;

            const left = Math.round(((realLeft + delta.x) / rect.width) * 100);
            const top = Math.round(((realTop + delta.y) / rect.height) * 100);

            console.log("drop! % = [", left, top, "]")

            movePlayer(item.id, left, top);
            dispatch(selectPlayer({ id: item.id, backNumber: item.backNumber, team: item.team, left, top, position: item.position }));
            dispatch(setPlayerMovingSequences({ id: item.id, left, top, team: item.team, isFirst: true }));
            console.log("drag finish!")
        },
    });

    const handlePlayerClick = (event: React.MouseEvent<HTMLElement>, player: PlayerPosition) => {
        dispatch(selectPlayer(player));
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!imgRef.current || !possibleMoveState || !possibleMoveState.isPossible || !selectedPlayer) return;

        console.log("real event = ", event.clientX, event.clientY);

        const rect = imgRef.current.getBoundingClientRect();

        const clickedLeft = ((event.clientX - rect.left) / rect.width) * 100;
        const clickedTop = ((event.clientY - rect.top) / rect.height) * 100;
        const { id, left, top, team } = selectedPlayer;

        console.log("clicked % = [", clickedLeft, clickedTop, "]")

        dispatch(setPlayerMovingSequences({ id, left: clickedLeft, top: clickedTop, team: team, isFirst: false }));
    }

    useEffect(() => {
        if (imgRef.current) {
            const rect = imgRef.current.getBoundingClientRect();
            console.log("rect = ", rect);
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

    useEffect(() => {
        updateScreenSize();
    }, [updateScreenSize]);


    const getLeftLocation = (left: number, top: number) => {
        if (!imgRef.current) return { x: 0, y: 0 }
        const rect = imgRef.current.getBoundingClientRect();
        const realLeft = (left / 100) * rect.width;
        const realTop = (top / 100) * rect.height;

        const defaultLeft = rect.x;
        const defaultTop = rect.y;

        console.log("move 실제 값: ", defaultLeft + realLeft, defaultTop + realTop)
        console.log("seqeunces", sequences.sequences)

        return {
            x: defaultLeft + realLeft,
            y: defaultTop + realTop,
        }
    }

    return (
        <Box
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 5 }}
        >
            <div style={{ width: '60%', height: '30%', justifyContent: 'center', alignItems: 'center' }}
                ref={drop}
                onClick={handleClick}
            >
                <img ref={imgRef} src={boardImage} alt="board" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                {
                    !simulationOnState.isSimulationOn && <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 200 }}>
                        <defs>
                            <marker
                                id="arrow-home"
                                viewBox="0 0 10 10"
                                refX="5"
                                refY="5"
                                markerWidth="3"
                                markerHeight="3"
                                opacity={0.7}
                                orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill='#3B6FB2' />
                            </marker>
                        </defs>
                        <defs>
                            <marker
                                id="arrow-away"
                                viewBox="0 0 10 10"
                                refX="5"
                                refY="5"
                                markerWidth="3"
                                markerHeight="3"
                                opacity={0.7}
                                orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill='#B23B7F' />
                            </marker>
                        </defs>

                        {sequences.sequences.map(sequence => (
                            sequence.moves.map((move) => (
                                move.sequence.map((location, index) => {
                                    if (index === 0) return null;
                                    const { x: x1, y: y1 } = getLeftLocation(move.sequence[index - 1].left, move.sequence[index - 1].top);
                                    const { x: x2, y: y2 } = getLeftLocation(location.left, location.top);

                                    console.log("x1, x2, y1, y2", x1, x2, y1, y2);
                                    <line
                                        key={`${move.id}-${index}`}
                                        x1={x1}
                                        y1={y1}
                                        x2={x2}
                                        y2={y2}
                                        stroke={location.team}
                                        strokeWidth="5"
                                        strokeOpacity={0.7}
                                        markerEnd={location.team === 'home' ? 'url(#arrow-home)' : 'url(#arrow-away)'}
                                    />
                                })
                            ))
                        ))}
                    </svg>
                }
            </div>

            {players.map((player) => (
                <DraggablePlayer
                    key={player.id}
                    id={player.id}
                    backNumber={player.backNumber}
                    team={player.team}
                    left={player.left}
                    top={player.top}
                    imgRef={imgRef}
                    position={player.position}
                    onClick={handlePlayerClick} />
            ))}
        </Box>
    );
};